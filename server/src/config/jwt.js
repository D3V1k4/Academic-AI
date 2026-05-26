module.exports = {
  SECRET: process.env.JWT_SECRET || "default_jwt_secret_key_for_academic_ai_platform",
  EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d"
};
