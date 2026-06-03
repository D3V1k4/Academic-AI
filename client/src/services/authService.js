import api from "@/api/axios.config";
import ENDPOINTS from "@/api/endpoints";

const authService = {
  login: (credentials) => api.post(ENDPOINTS.AUTH.LOGIN, credentials),
  signup: (data) => api.post(ENDPOINTS.AUTH.REGISTER, data),
  logout: () => api.post(ENDPOINTS.AUTH.LOGOUT),
  getProfile: () => api.get(ENDPOINTS.USER.PROFILE),
  updateProfile: (data) => api.put(ENDPOINTS.USER.PROFILE, data),
};

export default authService;
