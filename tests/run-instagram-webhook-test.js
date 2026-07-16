const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { spawn } = require("node:child_process");

const PORT = 3300;
const VERIFY_TOKEN = "test_verify_token";
const serverPath = path.join(__dirname, "..", "src", "mock-webhook-server.js");
const messagePayloadPath = path.join(
  __dirname,
  "..",
  "workflows",
  "test-payloads",
  "instagram-message-text.json"
);
const echoPayloadPath = path.join(
  __dirname,
  "..",
  "workflows",
  "test-payloads",
  "instagram-echo-event.json"
);

function requestJson({ method, requestPath, body }) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : "";
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port: PORT,
        path: requestPath,
        method,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload)
        }
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            resolve({
              statusCode: res.statusCode,
              body: data ? JSON.parse(data) : null,
              text: data
            });
          } catch {
            resolve({
              statusCode: res.statusCode,
              body: null,
              text: data
            });
          }
        });
      }
    );

    req.on("error", reject);
    req.end(payload);
  });
}

function waitForServer() {
  return new Promise((resolve, reject) => {
    const startedAt = Date.now();

    const check = async () => {
      try {
        const response = await requestJson({
          method: "GET",
          requestPath: "/health"
        });

        if (response.statusCode === 200 && response.body?.ok) {
          resolve();
          return;
        }
      } catch {
        // Retry until timeout.
      }

      if (Date.now() - startedAt > 5000) {
        reject(new Error("Mock webhook server did not start"));
        return;
      }

      setTimeout(check, 100);
    };

    check();
  });
}

async function main() {
  const child = spawn(process.execPath, [serverPath], {
    env: {
      ...process.env,
      PORT: String(PORT),
      WEBHOOK_VERIFY_TOKEN: VERIFY_TOKEN
    },
    stdio: "ignore"
  });

  try {
    await waitForServer();

    const verifyResponse = await requestJson({
      method: "GET",
      requestPath:
        "/webhook/instagram?hub.mode=subscribe&hub.verify_token=test_verify_token&hub.challenge=challenge_ig"
    });
    assert.equal(verifyResponse.statusCode, 200);
    assert.equal(verifyResponse.text, "challenge_ig");

    const invalidVerifyResponse = await requestJson({
      method: "GET",
      requestPath:
        "/webhook/instagram?hub.mode=subscribe&hub.verify_token=wrong_token&hub.challenge=challenge_ig"
    });
    assert.equal(invalidVerifyResponse.statusCode, 403);
    assert.equal(invalidVerifyResponse.body.error, "Webhook verification failed");

    const messagePayload = JSON.parse(fs.readFileSync(messagePayloadPath, "utf8"));
    const messageResponse = await requestJson({
      method: "POST",
      requestPath: "/webhook/instagram",
      body: messagePayload
    });
    assert.equal(messageResponse.statusCode, 200);
    assert.equal(messageResponse.body.classification.intent, "servicios");
    assert.equal(messageResponse.body.reply.channel, "instagram");
    assert.equal(messageResponse.body.reply.sent, false);

    const echoPayload = JSON.parse(fs.readFileSync(echoPayloadPath, "utf8"));
    const echoResponse = await requestJson({
      method: "POST",
      requestPath: "/webhook/instagram",
      body: echoPayload
    });
    assert.equal(echoResponse.statusCode, 200);
    assert.equal(echoResponse.body.ignored, true);
    assert.equal(echoResponse.body.reason, "echo_event");

    console.log("Instagram webhook HTTP test passed");
  } finally {
    child.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
