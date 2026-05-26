const plannerService = require("../services/planner.service");

const getDailyPlan = async (req, res, next) => {
  try {
    const { date } = req.query;
    const plan = await plannerService.getOrCreateDailyPlan(req.user._id, date);
    res.status(200).json({
      success: true,
      data: plan
    });
  } catch (error) {
    next(error);
  }
};

const updateTaskStatus = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { status, date } = req.body;
    const plan = await plannerService.updateTaskStatus(req.user._id, date, taskId, status);
    res.status(200).json({
      success: true,
      message: `Task status updated to ${status}`,
      data: plan
    });
  } catch (error) {
    next(error);
  }
};

const logStudySession = async (req, res, next) => {
  try {
    const { topicId, duration, focusScore } = req.body;
    const session = await plannerService.logStudySession(req.user._id, topicId, duration, focusScore);
    res.status(201).json({
      success: true,
      message: "Study session logged successfully",
      data: session
    });
  } catch (error) {
    next(error);
  }
};

const getStudySessions = async (req, res, next) => {
  try {
    const sessions = await plannerService.getStudySessions(req.user._id);
    res.status(200).json({
      success: true,
      data: sessions
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDailyPlan,
  updateTaskStatus,
  logStudySession,
  getStudySessions
};
