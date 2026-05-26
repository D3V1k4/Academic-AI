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
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/academic_ai";

// 1. Establish MongoDB Connection
const connectDB = async () => {
  try {
    logger.info("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    logger.info("MongoDB Connected Successfully!");
  } catch (error) {
    logger.error("MongoDB Connection Failed! Make sure MongoDB is running.", error);
  }
};

const bootServer = async () => {
  // Connect DB
  await connectDB();

  // Connect Redis
  await redisClient.connect();

  // Initialize Background Jobs
  startDailyPlanGeneratorJob();
  startRevisionSchedulerJob();
  startAnalyticsAggregatorJob();
  startNotificationSenderJob();

  // Start Express Server
  app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
    logger.info(`API Healthcheck: http://localhost:${PORT}/health`);
  });
};

bootServer();
