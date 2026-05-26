const mongoose = require("mongoose");

const RecommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      enum: ["weak_topic", "revision", "burnout_alert"],
      default: "weak_topic"
    },
    message: {
      type: String,
      required: true
    },
    resources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource"
      }
    ],
    actionTaken: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Recommendation", RecommendationSchema);
