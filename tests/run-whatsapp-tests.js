const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  isWhatsAppMessageEvent,
  isWhatsAppStatusEvent,
  normalizeWhatsAppPayload
} = require("../src/whatsapp-normalizer");
const { buildWhatsAppTextMessage } = require("../src/whatsapp-client");
const { processPayload } = require("../src/chatbot-rules");

function readPayload(fileName) {
  return JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "..", "workflows", "test-payloads", fileName),
      "utf8"
    )
  );
}

const messagePayload = readPayload("whatsapp-message-text.json");
const statusPayload = readPayload("whatsapp-status-event.json");

assert.equal(isWhatsAppMessageEvent(messagePayload), true);
assert.equal(isWhatsAppStatusEvent(messagePayload), false);
assert.equal(isWhatsAppMessageEvent(statusPayload), false);
assert.equal(isWhatsAppStatusEvent(statusPayload), true);

const normalized = normalizeWhatsAppPayload(messagePayload);
assert.equal(normalized.channel, "whatsapp");
assert.equal(normalized.event_id, "wamid.test.001");
assert.equal(normalized.external_user_id, "573009998877");
assert.equal(normalized.customer_name, "Usuario de prueba");
assert.equal(normalized.message_type, "text");
assert.equal(normalized.message_text, "Hola, quiero una cita");

const result = processPayload(normalized);
assert.equal(result.classification.intent, "agendamiento");
assert.equal(result.classification.response_id, "RESP-008");
assert.equal(result.classification.requires_human, true);

const ignored = normalizeWhatsAppPayload(statusPayload);
assert.equal(ignored.ignored, true);
assert.equal(ignored.reason, "status_event");

const outbound = buildWhatsAppTextMessage({
  to: "573009998877",
  text: "Mensaje de prueba"
});

assert.equal(outbound.messaging_product, "whatsapp");
assert.equal(outbound.to, "573009998877");
assert.equal(outbound.type, "text");
assert.equal(outbound.text.body, "Mensaje de prueba");

console.log("WhatsApp normalizer tests passed");
