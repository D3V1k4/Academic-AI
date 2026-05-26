const mongoose = require("mongoose");

const PYQQuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    default: 5
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic"
  },
  frequency: {
    type: Number,
    default: 1
  }
});

const PYQSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    questionPaperPdfUrl: {
      type: String,
      default: ""
    },
    questions: [PYQQuestionSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("PYQ", PYQSchema);
