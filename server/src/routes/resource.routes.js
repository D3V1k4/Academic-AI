const express = require("express");
const resourceController = require("../controllers/resource.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", resourceController.getResources);
router.get("/recommend", resourceController.recommendResources);
router.post("/", resourceController.addResource);

module.exports = router;
