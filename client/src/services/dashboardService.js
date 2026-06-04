import api from "@/api/axios.config";
import ENDPOINTS from "@/api/endpoints";

const dashboardService = {
  getOverview: () => {
    return api.get(
      ENDPOINTS.DASHBOARD.OVERVIEW
    );
  },
};

export default dashboardService;
