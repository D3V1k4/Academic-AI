const authService = require("../services/auth.service");

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.register(name, email, password);
    res.status(201).json({
      success: true,
      message: "Signup successful",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (error) {
    next(error);
  }
};

const completeOnboarding = async (req, res, next) => {
  try {
    const { targetGpa, weeklyStudyTargetHours } = req.body;
    const user = await authService.completeOnboarding(
      req.user._id,
      targetGpa,
      weeklyStudyTargetHours
    );
    res.status(200).json({
      success: true,
      message: "Onboarding completed successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  getMe,
  completeOnboarding
};
