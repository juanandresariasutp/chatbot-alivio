const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { spawn } = require("node:child_process");

const PORT = 3100;
const serverPath = path.join(__dirname, "..", "src", "mock-webhook-server.js");
const payloadPath = path.join(
  __dirname,
  "..",
  "workflows",
  "test-payloads",
  "message-agendamiento.json"
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
              body: JSON.parse(data)
            });
          } catch (error) {
            reject(error);
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

        if (response.statusCode === 200 && response.body.ok) {
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
      PORT: String(PORT)
    },
    stdio: "ignore"
  });

  try {
    await waitForServer();

    const payload = JSON.parse(fs.readFileSync(payloadPath, "utf8"));
    const response = await requestJson({
      method: "POST",
      requestPath: "/webhook/test-message",
      body: payload
    });

    assert.equal(response.statusCode, 200);
    assert.equal(response.body.classification.intent, "agendamiento");
    assert.equal(response.body.classification.response_id, "RESP-008");
    assert.equal(response.body.classification.requires_human, true);
    assert.match(response.body.reply.text, /solicitar una cita/);

    console.log("Mock webhook HTTP test passed");
  } finally {
    child.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
