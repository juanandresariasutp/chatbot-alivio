const { handleNormalizedMessage } = require("./message-handler");
const { normalizeWhatsAppPayload } = require("./whatsapp-normalizer");
const { normalizeInstagramPayload } = require("./instagram-normalizer");
const { D1ConversationStore } = require("./d1-conversation-store");
const { sendWhatsAppTextMessage } = require("./whatsapp-client");
const { sendInstagramTextMessage } = require("./instagram-client");

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

function getBearerToken(request) {
  const authorization = request.headers.get("Authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}

async function handleAdminConversations(request, env) {
  if (!env.ADMIN_API_TOKEN) {
    return jsonResponse({ error: "Admin API is not configured" }, 503);
  }

  if (getBearerToken(request) !== env.ADMIN_API_TOKEN) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  const store = getStore(env);

  if (!store || typeof store.listConversations !== "function") {
    return jsonResponse({ error: "Conversation store is not configured" }, 503);
  }

  const conversations = await store.listConversations();

  return jsonResponse({
    ok: true,
    count: conversations.length,
    conversations
  });
}

function isEnabled(value) {
  return value === true || value === "true" || value === "1";
}

function getGraphApiVersion(env = {}) {
  return env.META_GRAPH_API_VERSION || "v20.0";
}

async function sendReplyIfEnabled({ env = {}, normalized, reply, store }) {
  if (!reply || !normalized || !normalized.external_user_id) {
    return {
      sent: false,
      reason: "missing_reply"
    };
  }

  try {
    if (normalized.channel === "whatsapp") {
      if (!isEnabled(env.SEND_WHATSAPP_REPLIES)) {
        return {
          sent: false,
          reason: "whatsapp_replies_disabled"
        };
      }

      const apiResponse = await sendWhatsAppTextMessage({
        to: normalized.external_user_id,
        text: reply.text,
        accessToken: env.WHATSAPP_ACCESS_TOKEN,
        phoneNumberId: env.WHATSAPP_PHONE_NUMBER_ID,
        graphApiVersion: getGraphApiVersion(env)
      });

      return {
        sent: true,
        provider: "whatsapp",
        provider_response: apiResponse
      };
    }

    if (normalized.channel === "instagram") {
      if (!isEnabled(env.SEND_INSTAGRAM_REPLIES)) {
        return {
          sent: false,
          reason: "instagram_replies_disabled"
        };
      }

      const apiResponse = await sendInstagramTextMessage({
        recipientId: normalized.external_user_id,
        text: reply.text,
        accessToken: env.INSTAGRAM_ACCESS_TOKEN,
        graphApiVersion: getGraphApiVersion(env)
      });

      return {
        sent: true,
        provider: "instagram",
        provider_response: apiResponse
      };
    }

    return {
      sent: false,
      reason: "unsupported_channel"
    };
  } catch (error) {
    if (store && typeof store.addError === "function") {
      await store.addError(normalized, error);
    }

    return {
      sent: false,
      error: error.message || String(error)
    };
  }
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
  const store = getStore(env);
  const result = await handleNormalizedMessage(normalized, { store });

  if (result.ignored) {
    return jsonResponse(result);
  }

  const delivery = await sendReplyIfEnabled({
    env,
    normalized,
    reply: result.reply,
    store
  });

  return jsonResponse({
    ...result,
    reply: {
      ...result.reply,
      ...delivery
    }
  });
}

async function handleInstagramMessage(request, env) {
  const payload = await readJson(request);
  const normalized = normalizeInstagramPayload(payload);
  const store = getStore(env);
  const result = await handleNormalizedMessage(normalized, { store });

  if (result.ignored) {
    return jsonResponse(result);
  }

  const delivery = await sendReplyIfEnabled({
    env,
    normalized,
    reply: result.reply,
    store
  });

  return jsonResponse({
    ...result,
    reply: {
      ...result.reply,
      ...delivery
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

  if (request.method === "GET" && url.pathname === "/admin/conversations") {
    return handleAdminConversations(request, env);
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
        "GET /admin/conversations",
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
  handleWorkerRequest,
  sendReplyIfEnabled
};
