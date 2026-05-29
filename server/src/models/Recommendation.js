const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    topic: {
      type: String
    },

    resourceType: {
      type: String
    },

    url: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model("Recommendation", recommendationSchema);