const DEFAULT_GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION || "v20.0";

function buildWhatsAppTextMessage({ to, text }) {
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "text",
    text: {
      preview_url: false,
      body: text
    }
  };
}

async function sendWhatsAppTextMessage({
  to,
  text,
  accessToken = process.env.WHATSAPP_ACCESS_TOKEN,
  phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID,
  graphApiVersion = DEFAULT_GRAPH_API_VERSION,
  fetchImpl = globalThis.fetch
}) {
  if (!accessToken) {
    throw new Error("Missing WHATSAPP_ACCESS_TOKEN");
  }

  if (!phoneNumberId) {
    throw new Error("Missing WHATSAPP_PHONE_NUMBER_ID");
  }

  if (!to) {
    throw new Error("Missing WhatsApp recipient");
  }

  if (!text) {
    throw new Error("Missing WhatsApp message text");
  }

  const url = `https://graph.facebook.com/${graphApiVersion}/${phoneNumberId}/messages`;
  const body = buildWhatsAppTextMessage({ to, text });

  const response = await fetchImpl(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const responseBody = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = responseBody?.error?.message || "WhatsApp API request failed";
    throw new Error(message);
  }

  return responseBody;
}

module.exports = {
  buildWhatsAppTextMessage,
  sendWhatsAppTextMessage
};
