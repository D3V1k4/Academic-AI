const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject"
    },

    name: {
      type: String,
      required: true
    },

    difficulty: {
      type: Number,
      default: 5
    },

    pyqFrequency: {
      type: Number,
      default: 1
    },

    completionStatus: {
      type: Boolean,
      default: false
    },

    weaknessLevel: {
      type: Number,
      default: 5
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model("Topic", topicSchema);