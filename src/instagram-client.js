function getProcessEnv(name) {
  return typeof process !== "undefined" ? process.env?.[name] : undefined;
}

const DEFAULT_GRAPH_API_VERSION = getProcessEnv("META_GRAPH_API_VERSION") || "v20.0";

function buildInstagramTextMessage({ recipientId, text }) {
  return {
    recipient: {
      id: recipientId
    },
    message: {
      text
    }
  };
}

async function sendInstagramTextMessage({
  recipientId,
  text,
  accessToken = getProcessEnv("INSTAGRAM_ACCESS_TOKEN"),
  graphApiVersion = DEFAULT_GRAPH_API_VERSION,
  fetchImpl = globalThis.fetch
}) {
  if (!accessToken) {
    throw new Error("Missing INSTAGRAM_ACCESS_TOKEN");
  }

  if (!recipientId) {
    throw new Error("Missing Instagram recipient");
  }

  if (!text) {
    throw new Error("Missing Instagram message text");
  }

  const url = `https://graph.facebook.com/${graphApiVersion}/me/messages?access_token=${encodeURIComponent(accessToken)}`;
  const body = buildInstagramTextMessage({ recipientId, text });

  const response = await fetchImpl(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const responseBody = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = responseBody?.error?.message || "Instagram API request failed";
    throw new Error(message);
  }

  return responseBody;
}

module.exports = {
  buildInstagramTextMessage,
  sendInstagramTextMessage
};
