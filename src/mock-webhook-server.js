const http = require("node:http");
const { defaultStore, handleNormalizedMessage } = require("./message-handler");
const { normalizeWhatsAppPayload } = require("./whatsapp-normalizer");
const { sendWhatsAppTextMessage } = require("./whatsapp-client");
const { normalizeInstagramPayload } = require("./instagram-normalizer");
const { sendInstagramTextMessage } = require("./instagram-client");

const PORT = Number(process.env.PORT || 3000);
const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN || "local_verify_token";
const SEND_WHATSAPP_REPLIES = process.env.SEND_WHATSAPP_REPLIES === "true";
const SEND_INSTAGRAM_REPLIES = process.env.SEND_INSTAGRAM_REPLIES === "true";

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  res.end(JSON.stringify(body, null, 2));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (req.method === "GET" && req.url === "/health") {
    sendJson(res, 200, { ok: true, service: "chatbot-alivio-mock-webhook" });
    return;
  }

  if (req.method === "GET" && url.pathname === "/conversations") {
    sendJson(res, 200, {
      conversations: defaultStore.listConversations()
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/webhook/whatsapp") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN && challenge) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(challenge);
      return;
    }

    sendJson(res, 403, { error: "Webhook verification failed" });
    return;
  }

  if (req.method === "GET" && url.pathname === "/webhook/instagram") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN && challenge) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(challenge);
      return;
    }

    sendJson(res, 403, { error: "Webhook verification failed" });
    return;
  }

  if (req.method === "POST" && url.pathname === "/webhook/whatsapp") {
    try {
      const payload = await readBody(req);
      const normalized = normalizeWhatsAppPayload(payload);

      if (normalized.ignored) {
        sendJson(res, 200, {
          ok: true,
          ignored: true,
          reason: normalized.reason
        });
        return;
      }

      const result = await handleNormalizedMessage(normalized);

      if (result.ignored) {
        sendJson(res, 200, result);
        return;
      }

      const reply = {
        channel: "whatsapp",
        external_user_id: result.reply.external_user_id,
        text: result.reply.text,
        sent: false
      };

      if (SEND_WHATSAPP_REPLIES) {
        await sendWhatsAppTextMessage({
          to: result.reply.external_user_id,
          text: result.reply.text
        });
        reply.sent = true;
      }

      sendJson(res, 200, {
        ...result,
        reply
      });
    } catch (error) {
      sendJson(res, 400, {
        error: "Invalid WhatsApp webhook payload",
        details: error.message
      });
    }
    return;
  }

  if (req.method === "POST" && url.pathname === "/webhook/instagram") {
    try {
      const payload = await readBody(req);
      const normalized = normalizeInstagramPayload(payload);

      if (normalized.ignored) {
        sendJson(res, 200, {
          ok: true,
          ignored: true,
          reason: normalized.reason
        });
        return;
      }

      const result = await handleNormalizedMessage(normalized);

      if (result.ignored) {
        sendJson(res, 200, result);
        return;
      }

      const reply = {
        channel: "instagram",
        external_user_id: result.reply.external_user_id,
        text: result.reply.text,
        sent: false
      };

      if (SEND_INSTAGRAM_REPLIES) {
        await sendInstagramTextMessage({
          recipientId: result.reply.external_user_id,
          text: result.reply.text
        });
        reply.sent = true;
      }

      sendJson(res, 200, {
        ...result,
        reply
      });
    } catch (error) {
      sendJson(res, 400, {
        error: "Invalid Instagram webhook payload",
        details: error.message
      });
    }
    return;
  }

  if (req.method !== "POST" || url.pathname !== "/webhook/test-message") {
    sendJson(res, 404, {
      error: "Not found",
      available_routes: [
        "GET /health",
        "GET /conversations",
        "POST /webhook/test-message",
        "GET /webhook/whatsapp",
        "POST /webhook/whatsapp",
        "GET /webhook/instagram",
        "POST /webhook/instagram"
      ]
    });
    return;
  }

  try {
    const payload = await readBody(req);
    const result = await handleNormalizedMessage(payload);

    sendJson(res, 200, {
      ...result,
      reply: {
        ...result.reply,
        sent: false
      }
    });
  } catch (error) {
    sendJson(res, 400, {
      error: "Invalid JSON payload",
      details: error.message
    });
  }
});

server.listen(PORT, () => {
  console.log(`Mock webhook server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Conversations: http://localhost:${PORT}/conversations`);
  console.log(`Test webhook: POST http://localhost:${PORT}/webhook/test-message`);
  console.log(`WhatsApp verify: GET http://localhost:${PORT}/webhook/whatsapp`);
  console.log(`WhatsApp webhook: POST http://localhost:${PORT}/webhook/whatsapp`);
  console.log(`Instagram verify: GET http://localhost:${PORT}/webhook/instagram`);
  console.log(`Instagram webhook: POST http://localhost:${PORT}/webhook/instagram`);
});
