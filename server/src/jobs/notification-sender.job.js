const User = require("../models/User.model");
const Notification = require("../models/Notification.model");
const logger = require("../utils/logger");

const startNotificationSenderJob = () => {
  logger.info("Initializing Notification Sender Background Job...");

  const runJob = async () => {
    try {
      logger.info("Running Notification Sender Job...");
      const students = await User.find({ role: "student" });

      for (const student of students) {
        if (student.currentStreak > 0 && student.currentStreak % 5 === 0) {
          // Send streak achievement notification
          await Notification.create({
            userId: student._id,
            title: "Streak Milestone! 🔥",
            message: `Congratulations! You have maintained a ${student.currentStreak}-day study consistency streak. Keep it up!`,
            type: "system"
          });
        }
      }
      logger.info(`Notification Sender Job complete.`);
    } catch (error) {
      logger.error("Error running Notification Sender Job:", error);
    }
  };

  // Run every 12 hours
  setInterval(runJob, 12 * 60 * 60 * 1000);
  setTimeout(runJob, 18000);
};

module.exports = {
  startNotificationSenderJob
};
