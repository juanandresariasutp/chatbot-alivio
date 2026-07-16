const { handleNormalizedMessage } = require("./message-handler");
const { normalizeWhatsAppPayload } = require("./whatsapp-normalizer");
const { normalizeInstagramPayload } = require("./instagram-normalizer");
const { D1ConversationStore } = require("./d1-conversation-store");

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}

function textResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}

function getVerifyToken(env = {}) {
  return env.WEBHOOK_VERIFY_TOKEN || "local_verify_token";
}

function verifyWebhook(requestUrl, env) {
  const mode = requestUrl.searchParams.get("hub.mode");
  const token = requestUrl.searchParams.get("hub.verify_token");
  const challenge = requestUrl.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === getVerifyToken(env) && challenge) {
    return textResponse(challenge);
  }

  return jsonResponse({ error: "Webhook verification failed" }, 403);
}

async function readJson(request) {
  try {
    return await request.json();
  } catch (error) {
    throw new Error(`Invalid JSON payload: ${error.message}`);
  }
}

function getStore(env = {}) {
  return env.DB ? new D1ConversationStore(env.DB) : undefined;
}

async function handleTestMessage(request, env) {
  const payload = await readJson(request);
  const result = await handleNormalizedMessage(payload, { store: getStore(env) });

  return jsonResponse({
    ...result,
    reply: result.reply
      ? {
          ...result.reply,
          sent: false
        }
      : null
  });
}

async function handleWhatsAppMessage(request, env) {
  const payload = await readJson(request);
  const normalized = normalizeWhatsAppPayload(payload);
  const result = await handleNormalizedMessage(normalized, { store: getStore(env) });

  if (result.ignored) {
    return jsonResponse(result);
  }

  return jsonResponse({
    ...result,
    reply: {
      ...result.reply,
      sent: false
    }
  });
}

async function handleInstagramMessage(request, env) {
  const payload = await readJson(request);
  const normalized = normalizeInstagramPayload(payload);
  const result = await handleNormalizedMessage(normalized, { store: getStore(env) });

  if (result.ignored) {
    return jsonResponse(result);
  }

  return jsonResponse({
    ...result,
    reply: {
      ...result.reply,
      sent: false
    }
  });
}

async function handleWorkerRequest(request, env = {}) {
  const url = new URL(request.url);

  if (request.method === "GET" && url.pathname === "/health") {
    return jsonResponse({
      ok: true,
      service: "chatbot-alivio-worker"
    });
  }

  if (request.method === "GET" && url.pathname === "/webhook/whatsapp") {
    return verifyWebhook(url, env);
  }

  if (request.method === "GET" && url.pathname === "/webhook/instagram") {
    return verifyWebhook(url, env);
  }

  if (request.method === "POST" && url.pathname === "/webhook/test-message") {
    return handleTestMessage(request, env);
  }

  if (request.method === "POST" && url.pathname === "/webhook/whatsapp") {
    return handleWhatsAppMessage(request, env);
  }

  if (request.method === "POST" && url.pathname === "/webhook/instagram") {
    return handleInstagramMessage(request, env);
  }

  return jsonResponse(
    {
      error: "Not found",
      available_routes: [
        "GET /health",
        "POST /webhook/test-message",
        "GET /webhook/whatsapp",
        "POST /webhook/whatsapp",
        "GET /webhook/instagram",
        "POST /webhook/instagram"
      ]
    },
    404
  );
}

async function fetch(request, env) {
  return handleWorkerRequest(request, env);
}

module.exports = {
  fetch,
  default: {
    fetch
  },
  handleWorkerRequest
};
