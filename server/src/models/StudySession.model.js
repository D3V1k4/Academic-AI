const mongoose = require("mongoose");

const StudySessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true
    },
    duration: {
      type: Number, // in minutes
      required: true
    },
    focusScore: {
      type: Number, // 0 to 100
      default: 80,
      min: 0,
      max: 100
    },
    startTime: {
      type: Date,
      required: true,
      default: Date.now
    },
    endTime: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("StudySession", StudySessionSchema);
