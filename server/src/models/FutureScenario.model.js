const mongoose = require("mongoose");

const FutureScenarioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    gpaTarget: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    targetStudyHoursPerDay: {
      type: Number,
      required: true,
      min: 0,
      max: 24
    },
    predictedGpa: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    impactOfConsistency: {
      type: String, // dynamic feedback description
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("FutureScenario", FutureScenarioSchema);
