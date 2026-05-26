const User = require("../models/User.model");
const StudySession = require("../models/StudySession.model");
const Analytics = require("../models/Analytics.model");
const Topic = require("../models/Topic.model");
const logger = require("../utils/logger");

const startAnalyticsAggregatorJob = () => {
  logger.info("Initializing Analytics Aggregator Background Job...");

  const runJob = async () => {
    try {
      logger.info("Running Analytics Aggregator Job...");
      const students = await User.find({ role: "student" });
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      for (const student of students) {
        const sessions = await StudySession.find({
          userId: student._id,
          startTime: { $gte: sevenDaysAgo }
        });

        const weeklyHours = sessions.reduce((sum, s) => sum + (s.duration / 60), 0);
        const avgFocus = sessions.length > 0
          ? sessions.reduce((sum, s) => sum + s.focusScore, 0) / sessions.length
          : 80;

        const totalTopics = await Topic.countDocuments({ userId: student._id });
        const completedTopics = await Topic.countDocuments({ userId: student._id, status: "completed" });
        const completionRate = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

        await Analytics.create({
          userId: student._id,
          weeklyStudyHours: Math.round(weeklyHours * 100) / 100,
          averageFocusScore: Math.round(avgFocus),
          taskCompletionRate: Math.round(completionRate),
          activeStreak: student.currentStreak || 0,
          date: new Date()
        });
      }
      logger.info(`Analytics Aggregator Job complete for ${students.length} students.`);
    } catch (error) {
      logger.error("Error running Analytics Aggregator Job:", error);
    }
  };

  // Run every 24 hours
  setInterval(runJob, 24 * 60 * 60 * 1000);
  setTimeout(runJob, 15000);
};

module.exports = {
  startAnalyticsAggregatorJob
};
