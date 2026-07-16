const assert = require("node:assert/strict");
const { D1ConversationStore } = require("../src/d1-conversation-store");
const { handleNormalizedMessage } = require("../src/message-handler");
const { MockD1Database } = require("./mock-d1");

async function main() {
  const db = new MockD1Database();
  const store = new D1ConversationStore(db);

  const payload = {
    event_id: "evt_d1_001",
    channel: "whatsapp",
    external_user_id: "573009998877",
    customer_name: "Usuario D1",
    message_type: "text",
    message_text: "Quiero una cita",
    timestamp: "2026-07-16T09:00:00-05:00",
    raw: {}
  };

  const result = await handleNormalizedMessage(payload, { store });
  assert.equal(result.classification.intent, "agendamiento");
  assert.equal(result.conversation.status, "WAITING_CUSTOMER");
  assert.equal(result.conversation.messages.length, 2);
  assert.equal(await store.hasProcessedEvent("evt_d1_001"), true);

  const duplicate = await handleNormalizedMessage(payload, { store });
  assert.equal(duplicate.ignored, true);
  assert.equal(duplicate.reason, "duplicate_event");

  const conversations = await store.listConversations();
  assert.equal(conversations.length, 1);
  assert.equal(conversations[0].conversation_id, "whatsapp:573009998877");

  console.log("D1 conversation store tests passed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
