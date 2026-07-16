-- Cloudflare D1 schema for ALIVIO 360 chatbot.
-- Do not store secrets in this database.

CREATE TABLE IF NOT EXISTS conversations (
  conversation_id TEXT PRIMARY KEY,
  channel TEXT NOT NULL,
  external_user_id TEXT NOT NULL,
  customer_name TEXT,
  status TEXT NOT NULL DEFAULT 'BOT_ACTIVE',
  intent TEXT,
  requires_human INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id TEXT NOT NULL,
  event_id TEXT,
  direction TEXT NOT NULL,
  message_type TEXT NOT NULL,
  message_text TEXT,
  intent TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id)
);

CREATE TABLE IF NOT EXISTS processed_events (
  event_id TEXT PRIMARY KEY,
  channel TEXT NOT NULL,
  conversation_id TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS handoffs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id TEXT NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'WAITING_ADVISOR',
  summary_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  resolved_at TEXT,
  FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id)
);

CREATE TABLE IF NOT EXISTS errors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id TEXT,
  event_id TEXT,
  channel TEXT,
  error_type TEXT NOT NULL,
  safe_message TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_conversations_channel_user
  ON conversations(channel, external_user_id);

CREATE INDEX IF NOT EXISTS idx_messages_conversation
  ON messages(conversation_id, created_at);

CREATE INDEX IF NOT EXISTS idx_handoffs_conversation
  ON handoffs(conversation_id, created_at);
