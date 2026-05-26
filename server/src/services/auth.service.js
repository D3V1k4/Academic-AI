const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const jwtConfig = require("../config/jwt");
const { AppError } = require("../utils/error-handler");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, jwtConfig.SECRET, {
    expiresIn: jwtConfig.EXPIRES_IN
  });
};

const register = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email is already registered", 400);
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      onboardingCompleted: user.onboardingCompleted
    },
    token
  };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      onboardingCompleted: user.onboardingCompleted,
      targetGpa: user.targetGpa,
      currentStreak: user.currentStreak,
      consistencyScore: user.consistencyScore
    },
    token
  };
};

const completeOnboarding = async (userId, targetGpa, weeklyStudyTargetHours) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.targetGpa = targetGpa;
  user.weeklyStudyTargetHours = weeklyStudyTargetHours;
  user.onboardingCompleted = true;
  await user.save();

  return user;
};

module.exports = {
  register,
  login,
  completeOnboarding
};
