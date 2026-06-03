import api from "@/api/axios.config";
import ENDPOINTS from "@/api/endpoints";

const pyqService = {
  uploadPYQ: (formData) =>
    api.post(ENDPOINTS.PYQ.UPLOAD, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getAnalysis: (id) => api.get(ENDPOINTS.PYQ.ANALYSIS(id)),
  getImportantQuestions: () => api.get(ENDPOINTS.PYQ.IMPORTANT_QUESTIONS),
};

export default pyqService;
