const express = require("express");
const cors = require("cors");
const loggingMiddleware = require("./middleware/logging.middleware");
const errorMiddleware = require("./middleware/error.middleware");
const apiRoutes = require("./routes");
const { seedSubjectsForUser } = require("./seeders/subjects.seeder");
const { seedTopicsForSubjects } = require("./seeders/topics.seeder");
const { seedPyqsForSubjects } = require("./seeders/pyqs.seeder");

const app = express();

// Middleware
app.use(cors({ origin: "*" })); // support all origins for development and monorepo connectivity
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggingMiddleware);

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Academic AI Backend Server is Healthy and Running!",
    timestamp: new Date().toISOString()
  });
});

// Automatic seeding helper endpoint (for fast testing!)
app.post("/api/v1/auth/seed", async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required for seeding" });
    }
    const subjects = await seedSubjectsForUser(userId);
    await seedTopicsForSubjects(userId, subjects);
    await seedPyqsForSubjects(userId, subjects);

    res.status(200).json({
      success: true,
      message: "Academic AI Database Seeded Successfully with database subjects, topics, learning links, and exam frequencies!"
    });
  } catch (error) {
    next(error);
  }
});

// Main routes mounting
app.use("/api/v1", apiRoutes);

// Unhandled route fallback
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API Endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Global centralized error handler
app.use(errorMiddleware);

module.exports = app;
