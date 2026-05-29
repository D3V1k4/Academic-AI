const mongoose = require("mongoose");

const studySessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject"
    },

    topic: {
      type: String
    },

    studyHours: {
      type: Number
    },

    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model("StudySession", studySessionSchema);