const mongoose = require("mongoose");

const CompletedTaskSchema = new mongoose.Schema(
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
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    actualDuration: {
      type: Number, // in minutes
      required: true
    },
    completionTime: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("CompletedTask", CompletedTaskSchema);
