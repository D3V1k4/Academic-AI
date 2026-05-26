const CompletedTask = require("../models/CompletedTask.model");
const DailyPlan = require("../models/DailyPlan.model");
const logger = require("../utils/logger");

const startRevisionSchedulerJob = () => {
  logger.info("Initializing Spaced Repetition Revision Scheduler Background Job...");

  const runJob = async () => {
    try {
      logger.info("Running Revision Scheduler Job...");
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);

      // Find tasks completed exactly 1 day ago to schedule for revision today
      const tasks = await CompletedTask.find({
        createdAt: {
          $gte: new Date(oneDayAgo.setHours(0,0,0,0)),
          $lte: new Date(oneDayAgo.setHours(23,59,59,999))
        }
      });

      for (const t of tasks) {
        const today = new Date();
        const plan = await DailyPlan.findOne({
          userId: t.userId,
          date: {
            $gte: new Date(today.setHours(0,0,0,0)),
            $lte: new Date(today.setHours(23,59,59,999))
          }
        });

        if (plan) {
          // Check if topic is already scheduled today
          const exists = plan.tasks.some((task) => task.topicId.toString() === t.topicId.toString());
          if (!exists) {
            plan.tasks.push({
              topicId: t.topicId,
              status: "pending",
              duration: 20, // quick 20 mins revision
              priority: "medium",
              type: "revision"
            });
            await plan.save();
          }
        }
      }
      logger.info(`Revision Scheduler Job complete. Scheduled revisions for ${tasks.length} tasks.`);
    } catch (error) {
      logger.error("Error running Revision Scheduler Job:", error);
    }
  };

  // Run every 12 hours
  setInterval(runJob, 12 * 60 * 60 * 1000);
  setTimeout(runJob, 12000);
};

module.exports = {
  startRevisionSchedulerJob
};
