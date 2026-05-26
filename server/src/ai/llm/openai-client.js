const aiConfig = require("../../config/ai.config");

const generateChatCompletion = async (systemPrompt, userPrompt) => {
  if (!aiConfig.OPENAI.API_KEY || aiConfig.USE_SIMULATION) {
    // Elegant simulation fallback
    console.log("[OpenAI Client] Simulation active. Generating simulated response.");
    return `Simulated AI Response: Based on your request, I recommend focusing on core architectural concepts, maintaining a consistent study schedule, and allocating 45 minutes to high-weightage topics. Let me know if you need specific advice on any subject!`;
  }

  try {
    // If user provides a key, they can run live OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${aiConfig.OPENAI.API_KEY}`
      },
      body: JSON.stringify({
        model: aiConfig.OPENAI.MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      })
    });

    const data = await response.json();
    if (data.choices && data.choices[0]) {
      return data.choices[0].message.content;
    }
    throw new Error(data.error?.message || "Invalid OpenAI response format");
  } catch (error) {
    console.error("OpenAI Client Error (using fallback):", error);
    return `[Fallback AI Response]: I encountered a network issue, but here is a study tip: Ensure you prioritize subjects like Database Management Systems and Data Structures & Algorithms, as they are essential for your engineering foundation.`;
  }
};

module.exports = {
  generateChatCompletion
};
