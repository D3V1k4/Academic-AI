const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    semesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    code: {
      type: String,
      trim: true,
      default: ""
    },
    credits: {
      type: Number,
      required: true,
      default: 3
    },
    color: {
      type: String,
      default: "#4F46E5" // color hex for UI
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Subject", SubjectSchema);
