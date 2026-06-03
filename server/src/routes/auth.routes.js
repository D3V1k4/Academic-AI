const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const { signupSchema, loginSchema, onboardingSchema } = require("../validators/auth.validator");

const router = express.Router();

router.post("/signup", validate(signupSchema), authController.signup);
router.post("/register", validate(signupSchema), authController.signup);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware, authController.getMe);
router.post(
  "/onboarding",
  authMiddleware,
  validate(onboardingSchema),
  authController.completeOnboarding
);

module.exports = router;
