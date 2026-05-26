const mongoose = require("mongoose");

const PlanTaskSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  },
  duration: {
    type: Number, // duration in minutes
    required: true,
    default: 45
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },
  type: {
    type: String,
    enum: ["study", "revision"],
    default: "study"
  }
});

const DailyPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    tasks: [PlanTaskSchema],
    isGeneratedByAI: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Compound index for user and date
DailyPlanSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DailyPlan", DailyPlanSchema);
