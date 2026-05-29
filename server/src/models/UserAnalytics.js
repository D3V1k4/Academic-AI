const mongoose = require("mongoose");

const userAnalyticsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    consistencyScore: {
      type: Number,
      default: 0
    },

    productivityScore: {
      type: Number,
      default: 0
    },

    burnoutRisk: {
      type: String,
      default: "LOW"
    },

    totalStudyHours: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model(
    "UserAnalytics",
    userAnalyticsSchema
  );