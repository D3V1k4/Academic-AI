const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    name: {
      type: String,
      required: true
    },

    code: {
      type: String
    },

    examDate: {
      type: Date
    },

    difficulty: {
      type: Number,
      default: 5
    },

    completionPercentage: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model("Subject", subjectSchema);