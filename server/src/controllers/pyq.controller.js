const pyqAnalysisService = require("../services/pyq-analysis.service");
const PYQ = require("../models/PYQ.model");

const uploadPYQ = async (req, res, next) => {
  try {
    const { subjectId, year } = req.body;
    let fileName = "pyq_paper.pdf";
    let fileBuffer = Buffer.from([]);

    // Check if multer file exists
    if (req.file) {
      fileName = req.file.originalname;
      fileBuffer = req.file.buffer;
    } else if (req.body.fileName && req.body.fileBase64) {
      // JSON/Base64 upload support
      fileName = req.body.fileName;
      fileBuffer = Buffer.from(req.body.fileBase64, "base64");
    }

    const pyq = await pyqAnalysisService.uploadAndAnalyzePyq(
      subjectId,
      year || new Date().getFullYear(),
      fileBuffer,
      fileName
    );

    res.status(201).json({
      success: true,
      message: "PYQ paper parsed and analyzed successfully",
      data: pyq
    });
  } catch (error) {
    next(error);
  }
};

const getWeightageChart = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const chart = await pyqAnalysisService.getWeightageChart(subjectId);
    res.status(200).json({
      success: true,
      data: chart
    });
  } catch (error) {
    next(error);
  }
};

const getImportantQuestions = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const pyqs = await PYQ.find({ subjectId });
    
    // Flatten and extract questions with frequency >= 2
    let allQuestions = [];
    pyqs.forEach((p) => {
      p.questions.forEach((q) => {
        allQuestions.push({
          questionText: q.questionText,
          marks: q.marks,
          frequency: q.frequency,
          year: p.year
        });
      });
    });

    // Sort by frequency (highest first)
    allQuestions.sort((a, b) => b.frequency - a.frequency);

    res.status(200).json({
      success: true,
      data: allQuestions.slice(0, 10) // top 10 important questions
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadPYQ,
  getWeightageChart,
  getImportantQuestions
};
