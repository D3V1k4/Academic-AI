const PYQ = require("../models/PYQ.model");
const Topic = require("../models/Topic.model");
const pdfParser = require("../utils/pdf-parser");
const { AppError } = require("../utils/error-handler");

const uploadAndAnalyzePyq = async (subjectId, year, fileBuffer, fileName) => {
  if (!subjectId) {
    throw new AppError("Subject ID is required", 400);
  }

  // Parse questions from PDF buffer
  const questions = await pdfParser.parsePdf(fileBuffer, fileName);

  // Match each question to a topic under the subject
  const topics = await Topic.find({ subjectId });

  const analyzedQuestions = questions.map((q) => {
    // Basic lexical keyword matching
    const qTextLower = q.questionText.toLowerCase();
    const matchedTopic = topics.find((t) =>
      qTextLower.includes(t.name.toLowerCase())
    );

    return {
      questionText: q.questionText,
      marks: q.marks || 5,
      frequency: q.frequency || 1,
      topicId: matchedTopic ? matchedTopic._id : null
    };
  });

  const pyqRecord = await PYQ.create({
    subjectId,
    year,
    questionPaperPdfUrl: `https://storage.academicai.com/pyqs/${Date.now()}_${fileName}`,
    questions: analyzedQuestions
  });

  return pyqRecord;
};

const getWeightageChart = async (subjectId) => {
  const pyqs = await PYQ.find({ subjectId }).populate("questions.topicId");
  const topics = await Topic.find({ subjectId });
  
  const weightage = topics.map((t) => {
    // Count occurrences of this topic across all uploaded PYQs
    let frequencySum = 0;
    let marksSum = 0;

    pyqs.forEach((p) => {
      p.questions.forEach((q) => {
        if (q.topicId && q.topicId._id.toString() === t._id.toString()) {
          frequencySum += q.frequency || 1;
          marksSum += q.marks || 5;
        }
      });
    });

    return {
      topicId: t._id,
      name: t.name,
      frequency: frequencySum,
      weightage: marksSum || t.weightage || 5
    };
  });

  return weightage.sort((a, b) => b.weightage - a.weightage);
};

module.exports = {
  uploadAndAnalyzePyq,
  getWeightageChart
};
