const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/profile", userController.getProfile);
router.put("/profile", userController.updateProfile);
router.get("/dashboard", userController.getDashboardStats);

module.exports = router;
