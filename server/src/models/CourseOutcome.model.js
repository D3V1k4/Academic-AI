const mongoose = require("mongoose");

const CourseOutcomeSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },
    coCode: {
      type: String,
      required: true, // e.g., "CO1", "CO2"
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    targetAttainment: {
      type: Number, // percentage, e.g., 75
      default: 70,
      min: 0,
      max: 100
    },
    actualAttainment: {
      type: Number, // percentage, e.g., 68
      default: 0,
      min: 0,
      max: 100
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("CourseOutcome", CourseOutcomeSchema);
