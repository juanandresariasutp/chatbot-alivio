const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  isInstagramEchoEvent,
  isInstagramMessageEvent,
  normalizeInstagramPayload
} = require("../src/instagram-normalizer");
const { buildInstagramTextMessage } = require("../src/instagram-client");
const { processPayload } = require("../src/chatbot-rules");

function readPayload(fileName) {
  return JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "..", "workflows", "test-payloads", fileName),
      "utf8"
    )
  );
}

const messagePayload = readPayload("instagram-message-text.json");
const echoPayload = readPayload("instagram-echo-event.json");

assert.equal(isInstagramMessageEvent(messagePayload), true);
assert.equal(isInstagramEchoEvent(messagePayload), false);
assert.equal(isInstagramMessageEvent(echoPayload), true);
assert.equal(isInstagramEchoEvent(echoPayload), true);

const normalized = normalizeInstagramPayload(messagePayload);
assert.equal(normalized.channel, "instagram");
assert.equal(normalized.event_id, "m_test_instagram_001");
assert.equal(normalized.external_user_id, "123456789");
assert.equal(normalized.message_type, "text");
assert.equal(normalized.message_text, "Hola, quiero saber los servicios");

const result = processPayload(normalized);
assert.equal(result.classification.intent, "servicios");
assert.equal(result.classification.response_id, "RESP-002");

const ignored = normalizeInstagramPayload(echoPayload);
assert.equal(ignored.ignored, true);
assert.equal(ignored.reason, "echo_event");

const outbound = buildInstagramTextMessage({
  recipientId: "123456789",
  text: "Mensaje de prueba"
});

assert.equal(outbound.recipient.id, "123456789");
assert.equal(outbound.message.text, "Mensaje de prueba");

console.log("Instagram normalizer tests passed");
