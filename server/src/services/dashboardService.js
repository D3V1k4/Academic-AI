import api from "@/api/axios.config";
import ENDPOINTS from "@/api/endpoints";

const dashboardService = {
  getOverview: () =>
    api.get(ENDPOINTS.DASHBOARD.OVERVIEW),
};

export default dashboardService;
