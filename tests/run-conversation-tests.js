const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { classifyMessage, processPayload } = require("../src/chatbot-rules");
const { getResponse } = require("../src/responses");

const cases = [
  ["Hola", "saludo"],
  ["Que servicios ofrecen", "servicios"],
  ["Cuanto cuesta la consulta", "tarifas"],
  ["Que horarios manejan", "horarios"],
  ["Donde estan ubicados", "ubicacion"],
  ["Reciben Nequi", "pagos"],
  ["Quiero una cita", "agendamiento"],
  ["Me duele la espalda", "dolor_lesion"],
  ["Tengo una hernia, que tratamiento necesito", "limite_clinico"],
  ["Quiero hablar con una persona", "asesor"],
  ["Es una urgencia, no puedo caminar", "urgencia"],
  ["asdf contenido raro", "fallback"]
];

for (const [message, expectedIntent] of cases) {
  assert.equal(classifyMessage(message), expectedIntent, message);
}

const payloadPath = path.join(
  __dirname,
  "..",
  "workflows",
  "test-payloads",
  "message-agendamiento.json"
);
const payload = JSON.parse(fs.readFileSync(payloadPath, "utf8"));
const result = processPayload(payload);

assert.equal(result.classification.intent, "agendamiento");
assert.equal(result.classification.response_id, "RESP-008");
assert.equal(result.classification.requires_human, true);
assert.equal(result.classification.next_status, "WAITING_CUSTOMER");
assert.match(getResponse(result.classification.response_id), /solicitar una cita/);

console.log("Conversation rule tests passed");
