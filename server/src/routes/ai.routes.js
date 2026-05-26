const express = require("express");
const aiController = require("../controllers/ai.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/chat", aiController.chatWithAssistant);
router.get("/context", aiController.getContextPanel);
router.post("/simulate", aiController.gpaSimulation);
router.get("/simulate", aiController.getFutureScenarios);

module.exports = router;
