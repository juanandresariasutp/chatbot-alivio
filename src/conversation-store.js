const STATUSES = {
  BOT_ACTIVE: "BOT_ACTIVE",
  WAITING_CUSTOMER: "WAITING_CUSTOMER",
  WAITING_ADVISOR: "WAITING_ADVISOR",
  HUMAN_ACTIVE: "HUMAN_ACTIVE",
  RESOLVED: "RESOLVED",
  ERROR: "ERROR"
};

class ConversationStore {
  constructor() {
    this.conversations = new Map();
    this.processedEvents = new Set();
  }

  getConversationId({ channel, external_user_id }) {
    return `${channel}:${external_user_id}`;
  }

  hasProcessedEvent(eventId) {
    if (!eventId) {
      return false;
    }

    return this.processedEvents.has(eventId);
  }

  markProcessedEvent(eventId) {
    if (eventId) {
      this.processedEvents.add(eventId);
    }
  }

  getOrCreateConversation(normalized) {
    const conversationId = this.getConversationId(normalized);

    if (!this.conversations.has(conversationId)) {
      this.conversations.set(conversationId, {
        conversation_id: conversationId,
        channel: normalized.channel,
        external_user_id: normalized.external_user_id,
        customer_name: normalized.customer_name || null,
        status: STATUSES.BOT_ACTIVE,
        requires_human: false,
        intent: null,
        appointment: {
          customer_name: normalized.customer_name || null,
          appointment_reason: null,
          preferred_day: null,
          preferred_time: null
        },
        messages: [],
        errors: [],
        created_at: normalized.timestamp || new Date().toISOString(),
        updated_at: normalized.timestamp || new Date().toISOString()
      });
    }

    return this.conversations.get(conversationId);
  }

  addMessage(normalized, classification) {
    const conversation = this.getOrCreateConversation(normalized);
    const timestamp = normalized.timestamp || new Date().toISOString();

    conversation.messages.push({
      event_id: normalized.event_id,
      direction: "inbound",
      message_type: normalized.message_type,
      message_text: normalized.message_text,
      intent: classification?.intent || null,
      created_at: timestamp
    });
    conversation.intent = classification?.intent || conversation.intent;
    conversation.requires_human = Boolean(classification?.requires_human);
    conversation.updated_at = timestamp;

    return conversation;
  }

  addReply(normalized, text) {
    const conversation = this.getOrCreateConversation(normalized);
    const timestamp = new Date().toISOString();

    conversation.messages.push({
      event_id: null,
      direction: "outbound",
      message_type: "text",
      message_text: text,
      intent: conversation.intent,
      created_at: timestamp
    });
    conversation.updated_at = timestamp;

    return conversation;
  }

  setStatus(normalized, status) {
    const conversation = this.getOrCreateConversation(normalized);
    conversation.status = status;
    conversation.updated_at = new Date().toISOString();
    return conversation;
  }

  addError(normalized, error) {
    const conversation = this.getOrCreateConversation(normalized);
    conversation.errors.push({
      message: error.message || String(error),
      created_at: new Date().toISOString()
    });
    conversation.status = STATUSES.ERROR;
    conversation.updated_at = new Date().toISOString();
    return conversation;
  }

  listConversations() {
    return Array.from(this.conversations.values());
  }

  reset() {
    this.conversations.clear();
    this.processedEvents.clear();
  }
}

module.exports = {
  ConversationStore,
  STATUSES
};
