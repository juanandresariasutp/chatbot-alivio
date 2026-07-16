import workerModule from "./worker.js";

export default {
  async fetch(request, env, ctx) {
    return workerModule.handleWorkerRequest(request, env, ctx);
  }
};
