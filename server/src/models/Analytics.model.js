const mongoose = require("mongoose");

const AnalyticsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    weeklyStudyHours: {
      type: Number,
      default: 0
    },
    averageFocusScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    taskCompletionRate: {
      type: Number, // percentage, e.g., 85
      default: 0,
      min: 0,
      max: 100
    },
    activeStreak: {
      type: Number,
      default: 0
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Analytics", AnalyticsSchema);
