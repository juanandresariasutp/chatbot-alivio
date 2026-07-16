const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { handleWorkerRequest } = require("../src/worker");
const { MockD1Database } = require("./mock-d1");

function readPayload(fileName) {
  return JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "..", "workflows", "test-payloads", fileName),
      "utf8"
    )
  );
}

async function readJsonResponse(response) {
  return JSON.parse(await response.text());
}

async function main() {
  const env = {
    WEBHOOK_VERIFY_TOKEN: "worker_test_token",
    DB: new MockD1Database()
  };

  const healthResponse = await handleWorkerRequest(
    new Request("https://chatbot-alivio.example/health"),
    env
  );
  assert.equal(healthResponse.status, 200);
  const healthBody = await readJsonResponse(healthResponse);
  assert.equal(healthBody.ok, true);

  const verifyResponse = await handleWorkerRequest(
    new Request(
      "https://chatbot-alivio.example/webhook/whatsapp?hub.mode=subscribe&hub.verify_token=worker_test_token&hub.challenge=abc123"
    ),
    env
  );
  assert.equal(verifyResponse.status, 200);
  assert.equal(await verifyResponse.text(), "abc123");

  const invalidVerifyResponse = await handleWorkerRequest(
    new Request(
      "https://chatbot-alivio.example/webhook/instagram?hub.mode=subscribe&hub.verify_token=wrong&hub.challenge=abc123"
    ),
    env
  );
  assert.equal(invalidVerifyResponse.status, 403);

  const whatsappPayload = readPayload("whatsapp-message-text.json");
  const whatsappResponse = await handleWorkerRequest(
    new Request("https://chatbot-alivio.example/webhook/whatsapp", {
      method: "POST",
      body: JSON.stringify(whatsappPayload),
      headers: {
        "Content-Type": "application/json"
      }
    }),
    env
  );
  assert.equal(whatsappResponse.status, 200);
  const whatsappBody = await readJsonResponse(whatsappResponse);
  assert.equal(whatsappBody.classification.intent, "agendamiento");
  assert.equal(whatsappBody.reply.channel, "whatsapp");
  assert.equal(whatsappBody.reply.sent, false);
  assert.equal(whatsappBody.conversation.messages.length, 2);

  const instagramPayload = readPayload("instagram-message-text.json");
  const instagramResponse = await handleWorkerRequest(
    new Request("https://chatbot-alivio.example/webhook/instagram", {
      method: "POST",
      body: JSON.stringify(instagramPayload),
      headers: {
        "Content-Type": "application/json"
      }
    }),
    env
  );
  assert.equal(instagramResponse.status, 200);
  const instagramBody = await readJsonResponse(instagramResponse);
  assert.equal(instagramBody.classification.intent, "servicios");
  assert.equal(instagramBody.reply.channel, "instagram");
  assert.equal(instagramBody.reply.sent, false);
  assert.equal(instagramBody.conversation.messages.length, 2);

  console.log("Worker handler tests passed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
