const signupSchema = {
  name: {
    required: true,
    type: "string"
  },
  email: {
    required: true,
    type: "string"
  },
  password: {
    required: true,
    type: "string"
  }
};

const loginSchema = {
  email: {
    required: true,
    type: "string"
  },
  password: {
    required: true,
    type: "string"
  }
};

const onboardingSchema = {
  targetGpa: {
    required: true,
    type: "number",
    min: 0,
    max: 10
  },
  weeklyStudyTargetHours: {
    required: true,
    type: "number",
    min: 1
  }
};

module.exports = {
  signupSchema,
  loginSchema,
  onboardingSchema
};
