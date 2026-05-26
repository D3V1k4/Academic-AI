const openaiClient = require("../ai/llm/openai-client");
const futureSimulationService = require("../services/future-simulation.service");
const analyticsService = require("../services/analytics.service");
const assistantPrompts = require("../ai/prompts/assistant-prompts");

const chatWithAssistant = async (req, res, next) => {
  try {
    const { message, context } = req.body;
    
    // Build smart system prompt matching student context
    const studentMetrics = await analyticsService.getPerformanceMetrics(req.user._id);
    const weakTopics = await analyticsService.getWeakTopicAnalysis(req.user._id);

    const systemPrompt = `${assistantPrompts.ASSISTANT_SYSTEM}
    Currently logged-in student: ${req.user.name}.
    Current Study Streak: ${studentMetrics.currentStreak} days.
    Consistency Score: ${studentMetrics.consistencyScore}/100.
    Weak/Pending Topics to address: ${weakTopics.map((t) => `${t.name} (${t.difficulty})`).join(", ") || "None currently flagged"}.
    Provide customized learning guidance matching this context!`;

    const userPrompt = assistantPrompts.ASSISTANT_USER(message);

    const responseText = await openaiClient.generateChatCompletion(systemPrompt, userPrompt);

    res.status(200).json({
      success: true,
      data: {
        response: responseText
      }
    });
  } catch (error) {
    next(error);
  }
};

const getContextPanel = async (req, res, next) => {
  try {
    const metrics = await analyticsService.getPerformanceMetrics(req.user._id);
    const weakTopics = await analyticsService.getWeakTopicAnalysis(req.user._id);

    res.status(200).json({
      success: true,
      data: {
        studentName: req.user.name,
        streakDays: metrics.currentStreak,
        consistencyScore: metrics.consistencyScore,
        weakTopics
      }
    });
  } catch (error) {
    next(error);
  }
};

const gpaSimulation = async (req, res, next) => {
  try {
    const { gpaTarget, targetStudyHoursPerDay } = req.body;
    const scenario = await futureSimulationService.runGpaSimulation(
      req.user._id,
      gpaTarget || 8.0,
      targetStudyHoursPerDay || 3
    );

    res.status(200).json({
      success: true,
      message: "GPA simulation computed and logged successfully",
      data: scenario
    });
  } catch (error) {
    next(error);
  }
};

const getFutureScenarios = async (req, res, next) => {
  try {
    const scenarios = await futureSimulationService.getSimulations(req.user._id);
    res.status(200).json({
      success: true,
      data: scenarios
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  chatWithAssistant,
  getContextPanel,
  gpaSimulation,
  getFutureScenarios
};
