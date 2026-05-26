const analyticsService = require("../services/analytics.service");

const getPerformanceMetrics = async (req, res, next) => {
  try {
    const metrics = await analyticsService.getPerformanceMetrics(req.user._id);
    res.status(200).json({
      success: true,
      data: metrics
    });
  } catch (error) {
    next(error);
  }
};

const getSubjectAnalysis = async (req, res, next) => {
  try {
    const analysis = await analyticsService.getSubjectAnalysis(req.user._id);
    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    next(error);
  }
};

const getProductivityTrends = async (req, res, next) => {
  try {
    const trends = await analyticsService.getProductivityTrends(req.user._id);
    res.status(200).json({
      success: true,
      data: trends
    });
  } catch (error) {
    next(error);
  }
};

const getWeakTopicAnalysis = async (req, res, next) => {
  try {
    const weakTopics = await analyticsService.getWeakTopicAnalysis(req.user._id);
    res.status(200).json({
      success: true,
      data: weakTopics
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPerformanceMetrics,
  getSubjectAnalysis,
  getProductivityTrends,
  getWeakTopicAnalysis
};
