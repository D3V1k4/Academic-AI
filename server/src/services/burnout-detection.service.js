const StudySession = require("../models/StudySession.model");
const Notification = require("../models/Notification.model");
const burnoutPredictor = require("../ai/engines/burnout-predictor");

const detectUserBurnout = async (userId) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const sessions = await StudySession.find({
    userId,
    startTime: { $gte: sevenDaysAgo }
  });

  const totalHours = sessions.reduce((sum, s) => sum + (s.duration / 60), 0);
  const avgFocus = sessions.length > 0
    ? sessions.reduce((sum, s) => sum + s.focusScore, 0) / sessions.length
    : 85;

  const result = burnoutPredictor.predictBurnout(totalHours, avgFocus);

  if (result.burnoutRisk === "high" || result.burnoutRisk === "medium") {
    // Generate notification alert
    await Notification.create({
      userId,
      title: "AI Burnout Alert",
      message: result.message,
      type: "alert"
    });
  }

  return result;
};

module.exports = {
  detectUserBurnout
};
