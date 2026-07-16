function getChange(payload) {
  return payload?.entry?.[0]?.changes?.[0] || null;
}

function getValue(payload) {
  return getChange(payload)?.value || null;
}

function isWhatsAppMessageEvent(payload) {
  const value = getValue(payload);
  return Boolean(value?.messages?.length);
}

function isWhatsAppStatusEvent(payload) {
  const value = getValue(payload);
  return Boolean(value?.statuses?.length);
}

function getTextFromMessage(message) {
  if (message?.type === "text") {
    return message.text?.body || "";
  }

  if (message?.type === "button") {
    return message.button?.text || "";
  }

  if (message?.type === "interactive") {
    return (
      message.interactive?.button_reply?.title ||
      message.interactive?.list_reply?.title ||
      ""
    );
  }

  return "";
}

function normalizeWhatsAppPayload(payload) {
  const value = getValue(payload);
  const message = value?.messages?.[0] || null;
  const contact = value?.contacts?.[0] || null;

  if (!message) {
    return {
      ignored: true,
      reason: isWhatsAppStatusEvent(payload) ? "status_event" : "no_message"
    };
  }

  return {
    event_id: message.id || null,
    channel: "whatsapp",
    external_user_id: message.from || null,
    customer_name: contact?.profile?.name || null,
    message_type: message.type || "unknown",
    message_text: getTextFromMessage(message),
    timestamp: message.timestamp
      ? new Date(Number(message.timestamp) * 1000).toISOString()
      : new Date().toISOString(),
    raw: payload
  };
}

module.exports = {
  isWhatsAppMessageEvent,
  isWhatsAppStatusEvent,
  normalizeWhatsAppPayload
};
