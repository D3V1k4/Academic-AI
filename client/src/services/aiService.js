import api from "@/api/axios.config";
import ENDPOINTS from "@/api/endpoints";

const aiService = {
  chat: (history, includeContext = true) => api.post(ENDPOINTS.AI.CHAT, { history, includeContext }),
  suggest: (payload) => api.post(ENDPOINTS.AI.SUGGEST, payload),
  getRoadmap: () => api.get(ENDPOINTS.AI.ROADMAP),
};

export default aiService;
