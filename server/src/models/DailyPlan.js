const mongoose = require("mongoose");

const dailyPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    date: {
      type: Date,
      default: Date.now
    },

    tasks: [
      {
        topic: String,
        duration: String,
        priority: String,
        studyType: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model("DailyPlan", dailyPlanSchema);