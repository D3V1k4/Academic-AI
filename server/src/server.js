require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const redisClient = require("./config/redis");
const logger = require("./utils/logger");

// Background jobs imports
const { startDailyPlanGeneratorJob } = require("./jobs/daily-plan-generator.job");
const { startRevisionSchedulerJob } = require("./jobs/revision-scheduler.job");
const { startAnalyticsAggregatorJob } = require("./jobs/analytics-aggregator.job");
const { startNotificationSenderJob } = require("./jobs/notification-sender.job");

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/academic_ai";

/*
|--------------------------------------------------------------------------
| MongoDB Connection
|--------------------------------------------------------------------------
*/
const connectDB = async () => {
  try {
    logger.info("Connecting to MongoDB...");

    
    await mongoose.connect(MONGO_URI);

    logger.info("MongoDB Connected Successfully!");
    return true;
  } catch (error) {
    logger.error("MongoDB Connection Failed!", error);
    return false;
  }
};

/*
|--------------------------------------------------------------------------
| Start Background Jobs Safely
|--------------------------------------------------------------------------
*/
const startJobs = () => {
  try {
    logger.info("Starting Background Jobs...");

    startDailyPlanGeneratorJob();
    startRevisionSchedulerJob();
    startAnalyticsAggregatorJob();
    startNotificationSenderJob();

    logger.info("All Background Jobs Started Successfully");
  } catch (error) {
    logger.error("Error starting background jobs:", error);
  }
};

/*
|--------------------------------------------------------------------------
| Boot Server
|--------------------------------------------------------------------------
*/
const bootServer = async () => {
  const dbConnected = await connectDB();

  // STOP SERVER IF DB FAILS
  if (!dbConnected) {
    logger.error("Server not started due to DB failure");
    process.exit(1);
  }

  // Redis (safe fallback)
  try {
    await redisClient.connect();
    logger.info("Redis Connected Successfully");
  } catch (err) {
    logger.warn("Redis connection failed (continuing anyway)");
  }

  // Delay jobs to ensure DB fully ready
  setTimeout(() => {
    startJobs();
  }, 2000);

  // Start server
  app.listen(PORT, () => {
    logger.info(
      `Server running in ${
        process.env.NODE_ENV || "development"
      } mode on port ${PORT}`
    );

    logger.info(`API Healthcheck: http://localhost:${PORT}/health`);
  });
};

bootServer();