function getEntry(payload) {
  return payload?.entry?.[0] || null;
}

function getMessagingEvent(payload) {
  return getEntry(payload)?.messaging?.[0] || null;
}

function isInstagramMessageEvent(payload) {
  const event = getMessagingEvent(payload);
  return Boolean(event?.message);
}

function isInstagramEchoEvent(payload) {
  const event = getMessagingEvent(payload);
  return Boolean(event?.message?.is_echo);
}

function normalizeInstagramPayload(payload) {
  const entry = getEntry(payload);
  const event = getMessagingEvent(payload);
  const message = event?.message || null;

  if (!message) {
    return {
      ignored: true,
      reason: "no_message"
    };
  }

  if (message.is_echo) {
    return {
      ignored: true,
      reason: "echo_event"
    };
  }

  return {
    event_id: message.mid || `${entry?.id || "instagram"}_${event.timestamp || Date.now()}`,
    channel: "instagram",
    external_user_id: event.sender?.id || null,
    customer_name: null,
    message_type: message.text ? "text" : "unknown",
    message_text: message.text || "",
    timestamp: event.timestamp
      ? new Date(Number(event.timestamp)).toISOString()
      : new Date().toISOString(),
    raw: payload
  };
}

module.exports = {
  isInstagramMessageEvent,
  isInstagramEchoEvent,
  normalizeInstagramPayload
};
