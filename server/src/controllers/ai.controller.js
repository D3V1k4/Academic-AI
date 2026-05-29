const openaiClient = require("../ai/llm/openai-client");

const futureSimulationService = require("../services/future-simulation.service");

const analyticsService = require("../services/analytics.service");

const assistantPrompts = require("../ai/prompts/assistant-prompts");

const priorityEngine = require("../services/ai/priorityEngine");

const plannerEngine = require("../services/ai/plannerEngine");

const revisionEngine = require("../services/ai/revisionEngine");

const recommendationEngine = require("../services/ai/recommendationEngine");

const burnoutLogic = require("../services/ai/burnoutLogic");

/*
|--------------------------------------------------------------------------
| AI Assistant Chat
|--------------------------------------------------------------------------
*/
const chatWithAssistant = async (req, res, next) => {
  try {
    const { message } = req.body;

    const studentMetrics =
      await analyticsService.getPerformanceMetrics(req.user._id);

    const weakTopics =
      await analyticsService.getWeakTopicAnalysis(req.user._id);

    const systemPrompt = `
${assistantPrompts.ASSISTANT_SYSTEM}

Currently logged-in student: ${req.user.name}

Current Study Streak: ${studentMetrics.currentStreak} days

Consistency Score: ${studentMetrics.consistencyScore}/100

Weak Topics:
${weakTopics.map((t) => `${t.name} (${t.difficulty})`).join(", ")}
`;

    const userPrompt =
      assistantPrompts.ASSISTANT_USER(message);

    const responseText =
      await openaiClient.generateChatCompletion(
        systemPrompt,
        userPrompt
      );

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

/*
|--------------------------------------------------------------------------
| Context Panel
|--------------------------------------------------------------------------
*/
const getContextPanel = async (req, res, next) => {
  try {
    const metrics =
      await analyticsService.getPerformanceMetrics(req.user._id);

    const weakTopics =
      await analyticsService.getWeakTopicAnalysis(req.user._id);

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

/*
|--------------------------------------------------------------------------
| GPA Simulation
|--------------------------------------------------------------------------
*/
const gpaSimulation = async (req, res, next) => {
  try {
    const {
      gpaTarget,
      targetStudyHoursPerDay
    } = req.body;

    const scenario =
      await futureSimulationService.runGpaSimulation(
        req.user._id,
        gpaTarget || 8.0,
        targetStudyHoursPerDay || 3
      );

    res.status(200).json({
      success: true,
      message: "GPA simulation computed successfully",
      data: scenario
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Future Scenarios
|--------------------------------------------------------------------------
*/
const getFutureScenarios = async (req, res, next) => {
  try {
    const scenarios =
      await futureSimulationService.getSimulations(
        req.user._id
      );

    res.status(200).json({
      success: true,
      data: scenarios
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Priority Engine
|--------------------------------------------------------------------------
*/
const calculatePriority = async (req, res, next) => {
  try {
    const result =
      priorityEngine.calculatePriority(req.body);

    res.status(200).json({
      success: true,
      message: "Priority calculated successfully",
      data: result
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Adaptive Daily Planner
|--------------------------------------------------------------------------
*/
const generateDailyPlan = async (req, res, next) => {
  try {
    const result =
      plannerEngine.generateDailyPlan(req.body);

    res.status(200).json({
      success: true,
      message: "Daily plan generated successfully",
      data: result
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Burnout Detection
|--------------------------------------------------------------------------
*/
const detectBurnout = async (req, res, next) => {
  try {
    const result =
      burnoutLogic.detectBurnoutRisk(req.body);

    res.status(200).json({
      success: true,
      message: "Burnout analysis completed",
      data: result
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Revision Scheduling
|--------------------------------------------------------------------------
*/
const scheduleRevision = async (req, res, next) => {
  try {
    const result =
      revisionEngine.scheduleRevision(req.body);

    res.status(200).json({
      success: true,
      message: "Revision schedule generated successfully",
      data: result
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Recommendation Engine
|--------------------------------------------------------------------------
*/
const getRecommendations = async (req, res, next) => {
  try {
    const { topic } = req.body;

    const result =
      recommendationEngine.getRecommendations(topic);

    res.status(200).json({
      success: true,
      message: "Recommendations fetched successfully",
      data: result
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  chatWithAssistant,
  getContextPanel,
  gpaSimulation,
  getFutureScenarios,
  calculatePriority,
  generateDailyPlan,
  detectBurnout,
  scheduleRevision,
  getRecommendations
};