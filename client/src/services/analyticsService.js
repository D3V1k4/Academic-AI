import api from "@/api/axios.config";
import ENDPOINTS from "@/api/endpoints";

const analyticsService = {
  getSummary: () => api.get(ENDPOINTS.ANALYTICS.SUMMARY),
  getTrends: () => api.get(ENDPOINTS.ANALYTICS.TRENDS),
  getWeakTopics: () => api.get(ENDPOINTS.ANALYTICS.WEAK_TOPICS),
};

export default analyticsService;
