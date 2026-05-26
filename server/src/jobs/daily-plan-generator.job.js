const User = require("../models/User.model");
const plannerService = require("../services/planner.service");
const logger = require("../utils/logger");

const startDailyPlanGeneratorJob = () => {
  logger.info("Initializing Daily Plan Generator Background Job...");

  // Run immediately on startup, then every 24 hours
  const runJob = async () => {
    try {
      logger.info("Running Daily Plan Generator Job...");
      const students = await User.find({ role: "student", onboardingCompleted: true });
      
      for (const student of students) {
        // Pre-create/generate plan for tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        await plannerService.getOrCreateDailyPlan(student._id, tomorrow);
      }
      logger.info(`Daily Plan Generator Job complete. Pre-generated plans for ${students.length} students.`);
    } catch (error) {
      logger.error("Error running Daily Plan Generator Job:", error);
    }
  };

  // Run job every 24 hours
  setInterval(runJob, 24 * 60 * 60 * 1000);
  
  // Also run in the background after boot
  setTimeout(runJob, 10000);
};

module.exports = {
  startDailyPlanGeneratorJob
};
