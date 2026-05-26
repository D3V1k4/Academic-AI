const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ["pdf", "video", "article"],
      default: "pdf"
    },
    url: {
      type: String,
      required: true,
      trim: true
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    difficultyLevel: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Resource", ResourceSchema);
