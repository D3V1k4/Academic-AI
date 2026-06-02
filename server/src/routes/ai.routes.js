const express = require("express");

const aiController = require("../controllers/ai.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Protected AI Routes
|--------------------------------------------------------------------------
*/
 router.use(authMiddleware);

/*
|--------------------------------------------------------------------------
| AI Assistant Chat
|--------------------------------------------------------------------------
*/
router.post(
  "/chat",
  aiController.chatWithAssistant
);

/*
|--------------------------------------------------------------------------
| AI Context Panel
|--------------------------------------------------------------------------
*/
router.get(
  "/context",
  aiController.getContextPanel
);

/*
|--------------------------------------------------------------------------
| GPA Simulation
|--------------------------------------------------------------------------
*/
router.post(
  "/simulate",
  aiController.gpaSimulation
);

router.get(
  "/simulate",
  aiController.getFutureScenarios
);

/*
|--------------------------------------------------------------------------
| AI Priority Engine
|--------------------------------------------------------------------------
*/
router.post(
  "/priority",
  aiController.calculatePriority
);

/*
|--------------------------------------------------------------------------
| Adaptive Daily Planner
|--------------------------------------------------------------------------
*/
router.post(
  "/planner",
  aiController.generateDailyPlan
);

/*
|--------------------------------------------------------------------------
| Burnout Prevention System
|--------------------------------------------------------------------------
*/
router.post(
  "/burnout",
  aiController.detectBurnout
);

/*
|--------------------------------------------------------------------------
| Revision Scheduling System
|--------------------------------------------------------------------------
*/
router.post(
  "/revision",
  aiController.scheduleRevision
);

/*
|--------------------------------------------------------------------------
| Recommendation Engine
|--------------------------------------------------------------------------
*/
router.post(
  "/recommendations",
  aiController.getRecommendations
);

module.exports = router;