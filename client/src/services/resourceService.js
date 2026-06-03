import api from "@/api/axios.config";
import ENDPOINTS from "@/api/endpoints";

const resourceService = {
  getResources: ({ topic = "", subject = "", type = "", difficulty = "", duration = "" } = {}) => {
    const params = new URLSearchParams();
    if (topic) params.set("topic", topic);
    if (subject) params.set("subject", subject);
    if (type) params.set("type", type);
    if (difficulty) params.set("difficulty", difficulty);
    if (duration) params.set("duration", duration);
    const query = params.toString();
    return api.get(ENDPOINTS.RESOURCES.LIST(query ? `?${query}` : ""));
  },
  markWatched: (payload) => api.post(ENDPOINTS.RESOURCES.WATCHED, payload),
  getRecommendations: () => api.get(ENDPOINTS.RESOURCES.RECOMMENDATIONS),
};

export default resourceService;
