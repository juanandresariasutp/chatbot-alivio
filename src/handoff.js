const { STATUSES } = require("./conversation-store");

function shouldHandoff(classification) {
  return Boolean(classification?.requires_human);
}

function getNextStatus(classification) {
  if (!classification) {
    return STATUSES.ERROR;
  }

  if (classification.intent === "agendamiento") {
    return STATUSES.WAITING_CUSTOMER;
  }

  if (classification.requires_human) {
    return STATUSES.WAITING_ADVISOR;
  }

  return STATUSES.BOT_ACTIVE;
}

function buildAdvisorSummary(conversation) {
  const lastInbound = [...conversation.messages]
    .reverse()
    .find((message) => message.direction === "inbound");

  return {
    conversation_id: conversation.conversation_id,
    channel: conversation.channel,
    external_user_id: conversation.external_user_id,
    customer_name: conversation.customer_name,
    intent: conversation.intent,
    status: conversation.status,
    requires_human: conversation.requires_human,
    last_message: lastInbound?.message_text || null,
    appointment: conversation.appointment,
    updated_at: conversation.updated_at
  };
}

module.exports = {
  buildAdvisorSummary,
  getNextStatus,
  shouldHandoff
};
