const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/signup",
    LOGOUT: "/auth/logout",
  },
  USER: {
    PROFILE: "/user/profile",
  },
  PLANNER: {
    DAILY: (date) => `/planner/daily?date=${date}`,
    WEEK: "/planner/week",
    COMPLETE_TASK: "/planner/complete-task",
    LOG_SESSION: "/planner/log-session",
  },
  SUBJECTS: {
    LIST: "/subjects",
    DETAIL: (id) => `/subjects/${id}`,
    TOPICS: (id) => `/subjects/${id}/topics`,
  },
  ANALYTICS: {
    SUMMARY: "/analytics/summary",
    TRENDS: "/analytics/trends",
    WEAK_TOPICS: "/analytics/weak-topics",
  },
  RESOURCES: {
    LIST: (params = "") => `/resources${params}`,
    WATCHED: "/resources/watched",
    RECOMMENDATIONS: "/resources/recommendations",
  },
  PYQ: {
    UPLOAD: "/pyq/upload",
    ANALYSIS: (id) => `/pyq/analysis/${id}`,
    IMPORTANT_QUESTIONS: "/pyq/important-questions",
  },
  AI: {
    CHAT: "/ai/chat",
    SUGGEST: "/ai/suggest",
    ROADMAP: "/ai/roadmap",
  },
  FUTURE: {
    SCENARIOS: "/future/scenarios",
    SIMULATE: "/future/simulate",
  },
  NOTIFICATIONS: {
    LIST: "/notifications",
    READ: (id) => `/notifications/${id}/read`,
  },
};

export default ENDPOINTS;
