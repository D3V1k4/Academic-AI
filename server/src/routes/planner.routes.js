const express = require("express");
const plannerController = require("../controllers/planner.controller");
const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const { logSessionSchema, updateTaskSchema } = require("../validators/planner.validator");

const router = express.Router();

router.use(authMiddleware);

router.get("/daily", plannerController.getDailyPlan);
router.patch("/task/:taskId", validate(updateTaskSchema), plannerController.updateTaskStatus);
router.post("/session", validate(logSessionSchema), plannerController.logStudySession);
router.get("/session", plannerController.getStudySessions);

module.exports = router;
