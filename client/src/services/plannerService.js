import api from "@/api/axios.config";
import ENDPOINTS from "@/api/endpoints";

const plannerService = {
  getDailyPlan: (date) => api.get(ENDPOINTS.PLANNER.DAILY(date)),
  getWeekPlan: () => api.get(ENDPOINTS.PLANNER.WEEK),
  completeTask: (taskId) => api.post(ENDPOINTS.PLANNER.COMPLETE_TASK, { taskId }),
  logSession: (payload) => api.post(ENDPOINTS.PLANNER.LOG_SESSION, payload),
};

export default plannerService;
