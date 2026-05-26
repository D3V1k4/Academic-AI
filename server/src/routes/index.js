const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const plannerRoutes = require("./planner.routes");
const subjectRoutes = require("./subject.routes");
const analyticsRoutes = require("./analytics.routes");
const resourceRoutes = require("./resource.routes");
const pyqRoutes = require("./pyq.routes");
const aiRoutes = require("./ai.routes");
const notificationRoutes = require("./notification.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/planner", plannerRoutes);
router.use("/subjects", subjectRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/resources", resourceRoutes);
router.use("/pyq", pyqRoutes);
router.use("/ai", aiRoutes);
router.use("/notifications", notificationRoutes);

module.exports = router;
