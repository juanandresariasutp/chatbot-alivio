class MockD1Statement {
  constructor(db, sql) {
    this.db = db;
    this.sql = sql;
    this.values = [];
  }

  bind(...values) {
    this.values = values;
    return this;
  }

  async first() {
    return this.db.executeFirst(this.sql, this.values);
  }

  async all() {
    return {
      results: this.db.executeAll(this.sql, this.values)
    };
  }

  async run() {
    this.db.executeRun(this.sql, this.values);
    return {
      success: true
    };
  }
}

class MockD1Database {
  constructor() {
    this.conversations = new Map();
    this.messages = [];
    this.processedEvents = new Map();
    this.errors = [];
  }

  prepare(sql) {
    return new MockD1Statement(this, sql);
  }

  executeFirst(sql, values) {
    if (sql.includes("FROM processed_events")) {
      const eventId = values[0];
      return this.processedEvents.get(eventId) || null;
    }

    if (sql.includes("FROM conversations")) {
      const conversationId = values[0];
      return this.conversations.get(conversationId) || null;
    }

    return null;
  }

  executeAll(sql, values) {
    if (sql.includes("FROM messages")) {
      const conversationId = values[0];
      return this.messages
        .filter((message) => message.conversation_id === conversationId)
        .map(({ conversation_id, id, ...message }) => message);
    }

    if (sql.includes("FROM conversations")) {
      return Array.from(this.conversations.values()).map(({ conversation_id }) => ({
        conversation_id
      }));
    }

    return [];
  }

  executeRun(sql, values) {
    if (sql.includes("INSERT OR IGNORE INTO processed_events")) {
      const [event_id, channel, conversation_id, created_at] = values;
      if (!this.processedEvents.has(event_id)) {
        this.processedEvents.set(event_id, {
          event_id,
          channel,
          conversation_id,
          created_at
        });
      }
      return;
    }

    if (sql.includes("INSERT INTO conversations")) {
      const [
        conversation_id,
        channel,
        external_user_id,
        customer_name,
        status,
        intent,
        requires_human,
        created_at,
        updated_at
      ] = values;
      this.conversations.set(conversation_id, {
        conversation_id,
        channel,
        external_user_id,
        customer_name,
        status,
        intent,
        requires_human,
        created_at,
        updated_at
      });
      return;
    }

    if (sql.includes("INSERT INTO messages")) {
      const [
        conversation_id,
        event_id,
        direction,
        message_type,
        message_text,
        intent,
        created_at
      ] = values;
      this.messages.push({
        id: this.messages.length + 1,
        conversation_id,
        event_id,
        direction,
        message_type,
        message_text,
        intent,
        created_at
      });
      return;
    }

    if (sql.includes("UPDATE conversations")) {
      if (sql.includes("SET intent")) {
        const [intent, requires_human, updated_at, conversation_id] = values;
        const conversation = this.conversations.get(conversation_id);
        Object.assign(conversation, { intent, requires_human, updated_at });
        return;
      }

      if (sql.includes("SET status")) {
        const [status, updated_at, conversation_id] = values;
        const conversation = this.conversations.get(conversation_id);
        Object.assign(conversation, { status, updated_at });
        return;
      }

      const [updated_at, conversation_id] = values;
      const conversation = this.conversations.get(conversation_id);
      Object.assign(conversation, { updated_at });
      return;
    }

    if (sql.includes("INSERT INTO errors")) {
      this.errors.push(values);
    }
  }
}

module.exports = {
  MockD1Database
};
