const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    weightage: {
      type: Number, // Exam weightage/frequency
      default: 5,
      min: 1,
      max: 10
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium"
    },
    notes: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Topic", TopicSchema);
