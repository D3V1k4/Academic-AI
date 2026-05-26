module.exports = {
  OPENAI: {
    API_KEY: process.env.OPENAI_API_KEY || "",
    MODEL: process.env.OPENAI_MODEL || "gpt-4-turbo"
  },
  ANTHROPIC: {
    API_KEY: process.env.ANTHROPIC_API_KEY || "",
    MODEL: process.env.ANTHROPIC_MODEL || "claude-3-opus-20240229"
  },
  USE_SIMULATION: process.env.AI_USE_SIMULATION !== "false" // default to true if keys are missing
};
