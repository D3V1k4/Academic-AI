const User = require("../models/User.model");
const analyticsService = require("../services/analytics.service");

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, targetGpa, weeklyStudyTargetHours } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (targetGpa !== undefined) user.targetGpa = targetGpa;
    if (weeklyStudyTargetHours !== undefined) user.weeklyStudyTargetHours = weeklyStudyTargetHours;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const metrics = await analyticsService.getPerformanceMetrics(req.user._id);
    const subjectAnalysis = await analyticsService.getSubjectAnalysis(req.user._id);

    res.status(200).json({
      success: true,
      data: {
        metrics,
        subjectAnalysis
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getDashboardStats
};
