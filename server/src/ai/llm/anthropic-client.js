const aiConfig = require("../../config/ai.config");

const generateClaudeCompletion = async (systemPrompt, userPrompt) => {
  if (!aiConfig.ANTHROPIC.API_KEY || aiConfig.USE_SIMULATION) {
    console.log("[Anthropic Client] Simulation active. Generating simulated response.");
    return `Simulated Claude AI Response: Let's break down this concept logically. First, identify your main subject constraints, then map each topic difficulty to a set time limit, and finally schedule periodic active recall sessions.`;
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": aiConfig.ANTHROPIC.API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: aiConfig.ANTHROPIC.MODEL,
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }]
      })
    });

    const data = await response.json();
    if (data.content && data.content[0]) {
      return data.content[0].text;
    }
    throw new Error(data.error?.message || "Invalid Anthropic response format");
  } catch (error) {
    console.error("Anthropic Client Error (using fallback):", error);
    return `[Fallback Claude Response]: Let's tackle this concept. Use spaced repetition for formulas and flashcards for quick definitions to boost your exam readiness!`;
  }
};

module.exports = {
  generateClaudeCompletion
};
