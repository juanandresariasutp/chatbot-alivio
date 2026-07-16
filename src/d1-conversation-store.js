const { STATUSES } = require("./conversation-store");

function toBoolean(value) {
  return Boolean(Number(value));
}

function createAppointment(customerName = null) {
  return {
    customer_name: customerName,
    appointment_reason: null,
    preferred_day: null,
    preferred_time: null
  };
}

class D1ConversationStore {
  constructor(db) {
    if (!db) {
      throw new Error("D1ConversationStore requires a D1 binding");
    }

    this.db = db;
  }

  getConversationId({ channel, external_user_id }) {
    return `${channel}:${external_user_id}`;
  }

  async hasProcessedEvent(eventId) {
    if (!eventId) {
      return false;
    }

    const row = await this.db
      .prepare("SELECT event_id FROM processed_events WHERE event_id = ? LIMIT 1")
      .bind(eventId)
      .first();

    return Boolean(row);
  }

  async markProcessedEvent(eventId, normalized = {}) {
    if (!eventId) {
      return;
    }

    const conversationId = normalized.channel && normalized.external_user_id
      ? this.getConversationId(normalized)
      : null;

    await this.db
      .prepare(
        `INSERT OR IGNORE INTO processed_events (event_id, channel, conversation_id, created_at)
         VALUES (?, ?, ?, ?)`
      )
      .bind(
        eventId,
        normalized.channel || "unknown",
        conversationId,
        new Date().toISOString()
      )
      .run();
  }

  async getOrCreateConversation(normalized) {
    const conversationId = this.getConversationId(normalized);
    const existing = await this.getConversation(conversationId);

    if (existing) {
      return existing;
    }

    const timestamp = normalized.timestamp || new Date().toISOString();

    await this.db
      .prepare(
        `INSERT INTO conversations (
          conversation_id,
          channel,
          external_user_id,
          customer_name,
          status,
          intent,
          requires_human,
          created_at,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        conversationId,
        normalized.channel,
        normalized.external_user_id,
        normalized.customer_name || null,
        STATUSES.BOT_ACTIVE,
        null,
        0,
        timestamp,
        timestamp
      )
      .run();

    return this.getConversation(conversationId);
  }

  async getConversation(conversationId) {
    const row = await this.db
      .prepare("SELECT * FROM conversations WHERE conversation_id = ? LIMIT 1")
      .bind(conversationId)
      .first();

    if (!row) {
      return null;
    }

    const messages = await this.db
      .prepare(
        `SELECT event_id, direction, message_type, message_text, intent, created_at
         FROM messages
         WHERE conversation_id = ?
         ORDER BY created_at ASC, id ASC`
      )
      .bind(conversationId)
      .all();

    return {
      conversation_id: row.conversation_id,
      channel: row.channel,
      external_user_id: row.external_user_id,
      customer_name: row.customer_name,
      status: row.status,
      intent: row.intent,
      requires_human: toBoolean(row.requires_human),
      appointment: createAppointment(row.customer_name),
      messages: messages.results || [],
      errors: [],
      created_at: row.created_at,
      updated_at: row.updated_at
    };
  }

  async addMessage(normalized, classification) {
    const conversation = await this.getOrCreateConversation(normalized);
    const timestamp = normalized.timestamp || new Date().toISOString();

    await this.db
      .prepare(
        `INSERT INTO messages (
          conversation_id,
          event_id,
          direction,
          message_type,
          message_text,
          intent,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        conversation.conversation_id,
        normalized.event_id || null,
        "inbound",
        normalized.message_type,
        normalized.message_text,
        classification?.intent || null,
        timestamp
      )
      .run();

    await this.db
      .prepare(
        `UPDATE conversations
         SET intent = ?, requires_human = ?, updated_at = ?
         WHERE conversation_id = ?`
      )
      .bind(
        classification?.intent || conversation.intent,
        classification?.requires_human ? 1 : 0,
        timestamp,
        conversation.conversation_id
      )
      .run();

    return this.getConversation(conversation.conversation_id);
  }

  async addReply(normalized, text) {
    const conversation = await this.getOrCreateConversation(normalized);
    const timestamp = new Date().toISOString();

    await this.db
      .prepare(
        `INSERT INTO messages (
          conversation_id,
          event_id,
          direction,
          message_type,
          message_text,
          intent,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        conversation.conversation_id,
        null,
        "outbound",
        "text",
        text,
        conversation.intent,
        timestamp
      )
      .run();

    await this.db
      .prepare("UPDATE conversations SET updated_at = ? WHERE conversation_id = ?")
      .bind(timestamp, conversation.conversation_id)
      .run();

    return this.getConversation(conversation.conversation_id);
  }

  async setStatus(normalized, status) {
    const conversation = await this.getOrCreateConversation(normalized);

    await this.db
      .prepare("UPDATE conversations SET status = ?, updated_at = ? WHERE conversation_id = ?")
      .bind(status, new Date().toISOString(), conversation.conversation_id)
      .run();

    return this.getConversation(conversation.conversation_id);
  }

  async addError(normalized, error) {
    const conversation = await this.getOrCreateConversation(normalized);

    await this.db
      .prepare(
        `INSERT INTO errors (conversation_id, event_id, channel, error_type, safe_message, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .bind(
        conversation.conversation_id,
        normalized.event_id || null,
        normalized.channel,
        "runtime_error",
        error.message || String(error),
        new Date().toISOString()
      )
      .run();

    await this.setStatus(normalized, STATUSES.ERROR);
    return this.getConversation(conversation.conversation_id);
  }

  async listConversations() {
    const rows = await this.db
      .prepare("SELECT conversation_id FROM conversations ORDER BY updated_at DESC LIMIT 50")
      .all();

    const conversations = [];

    for (const row of rows.results || []) {
      conversations.push(await this.getConversation(row.conversation_id));
    }

    return conversations;
  }
}

module.exports = {
  D1ConversationStore
};
