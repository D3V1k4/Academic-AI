const express = require("express");
const analyticsController = require("../controllers/analytics.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/metrics", analyticsController.getPerformanceMetrics);
router.get("/subject", analyticsController.getSubjectAnalysis);
router.get("/trends", analyticsController.getProductivityTrends);
router.get("/weak", analyticsController.getWeakTopicAnalysis);

module.exports = router;
