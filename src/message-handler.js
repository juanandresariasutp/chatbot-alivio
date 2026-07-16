const { processPayload } = require("./chatbot-rules");
const { getResponse } = require("./responses");
const { ConversationStore, STATUSES } = require("./conversation-store");
const { buildAdvisorSummary, getNextStatus, shouldHandoff } = require("./handoff");

const defaultStore = new ConversationStore();

async function handleNormalizedMessage(normalized, { store = defaultStore } = {}) {
  if (normalized.ignored) {
    return {
      ok: true,
      ignored: true,
      reason: normalized.reason
    };
  }

  if (await store.hasProcessedEvent(normalized.event_id)) {
    return {
      ok: true,
      ignored: true,
      reason: "duplicate_event"
    };
  }

  const existingConversation = await store.getOrCreateConversation(normalized);

  if (existingConversation.status === STATUSES.HUMAN_ACTIVE) {
    await store.markProcessedEvent(normalized.event_id, normalized);
    return {
      ok: true,
      ignored: true,
      reason: "human_active",
      conversation: existingConversation
    };
  }

  const result = processPayload(normalized);
  const responseText = getResponse(result.classification.response_id);
  await store.addMessage(result.normalized, result.classification);
  await store.setStatus(result.normalized, getNextStatus(result.classification));
  await store.markProcessedEvent(result.normalized.event_id, result.normalized);

  if (result.classification.next_status !== STATUSES.ERROR) {
    await store.addReply(result.normalized, responseText);
  }

  const updatedConversation = await store.getOrCreateConversation(result.normalized);

  return {
    ...result,
    conversation: updatedConversation,
    handoff: shouldHandoff(result.classification)
      ? buildAdvisorSummary(updatedConversation)
      : null,
    reply: {
      channel: result.normalized.channel,
      external_user_id: result.normalized.external_user_id,
      text: responseText
    }
  };
}

module.exports = {
  defaultStore,
  handleNormalizedMessage
};
