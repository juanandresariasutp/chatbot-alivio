const assert = require("node:assert/strict");
const { ConversationStore, STATUSES } = require("../src/conversation-store");
const { handleNormalizedMessage } = require("../src/message-handler");

async function main() {
const store = new ConversationStore();

const appointmentPayload = {
  event_id: "evt_store_001",
  channel: "test",
  external_user_id: "user_store_001",
  customer_name: "Usuario de prueba",
  message_type: "text",
  message_text: "Quiero una cita",
  timestamp: "2026-07-16T09:00:00-05:00",
  raw: {}
};

const firstResult = await handleNormalizedMessage(appointmentPayload, { store });
assert.equal(firstResult.classification.intent, "agendamiento");
assert.equal(firstResult.handoff.intent, "agendamiento");
assert.equal(firstResult.conversation.status, STATUSES.WAITING_CUSTOMER);
assert.equal(firstResult.conversation.messages.length, 2);

const duplicateResult = await handleNormalizedMessage(appointmentPayload, { store });
assert.equal(duplicateResult.ignored, true);
assert.equal(duplicateResult.reason, "duplicate_event");

await store.setStatus(appointmentPayload, STATUSES.HUMAN_ACTIVE);

const humanActivePayload = {
  ...appointmentPayload,
  event_id: "evt_store_002",
  message_text: "Sigo esperando respuesta"
};

const humanActiveResult = await handleNormalizedMessage(humanActivePayload, { store });
assert.equal(humanActiveResult.ignored, true);
assert.equal(humanActiveResult.reason, "human_active");

const conversations = await store.listConversations();
assert.equal(conversations.length, 1);
assert.equal(conversations[0].status, STATUSES.HUMAN_ACTIVE);

console.log("Conversation store tests passed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
