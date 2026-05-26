const Subject = require("../models/Subject.model");
const Topic = require("../models/Topic.model");
const Semester = require("../models/Semester.model");
const CourseOutcome = require("../models/CourseOutcome.model");

const getSubjects = async (req, res, next) => {
  try {
    // Ensure active semester exists, otherwise create a mock Semester 1
    let activeSem = await Semester.findOne({ userId: req.user._id, isActive: true });
    if (!activeSem) {
      activeSem = await Semester.create({
        userId: req.user._id,
        name: "Semester 1",
        startDate: new Date(),
        endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months
        isActive: true
      });
    }

    const subjects = await Subject.find({ userId: req.user._id, semesterId: activeSem._id });
    res.status(200).json({
      success: true,
      data: subjects
    });
  } catch (error) {
    next(error);
  }
};

const createSubject = async (req, res, next) => {
  try {
    const { name, code, credits, color } = req.body;
    let activeSem = await Semester.findOne({ userId: req.user._id, isActive: true });
    if (!activeSem) {
      activeSem = await Semester.create({
        userId: req.user._id,
        name: "Semester 1",
        startDate: new Date(),
        endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
        isActive: true
      });
    }

    const subject = await Subject.create({
      userId: req.user._id,
      semesterId: activeSem._id,
      name,
      code: code || "",
      credits: credits || 3,
      color: color || "#4F46E5"
    });

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: subject
    });
  } catch (error) {
    next(error);
  }
};

const getTopics = async (req, res, next) => {
  try {
    const { subjectId } = req.query;
    const query = { userId: req.user._id };
    if (subjectId) query.subjectId = subjectId;

    const topics = await Topic.find(query).populate("subjectId");
    res.status(200).json({
      success: true,
      data: topics
    });
  } catch (error) {
    next(error);
  }
};

const createTopic = async (req, res, next) => {
  try {
    const { subjectId, name, weightage, difficulty } = req.body;
    const topic = await Topic.create({
      userId: req.user._id,
      subjectId,
      name,
      weightage: weightage || 5,
      difficulty: difficulty || "medium"
    });
    res.status(201).json({
      success: true,
      message: "Topic created successfully",
      data: topic
    });
  } catch (error) {
    next(error);
  }
};

const getCourseOutcomes = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    let outcomes = await CourseOutcome.find({ subjectId });

    if (outcomes.length === 0) {
      // Seed default course outcomes
      outcomes = await CourseOutcome.create([
        { subjectId, coCode: "CO1", description: "Remember and understand basic terminologies and fundamental concepts.", targetAttainment: 80, actualAttainment: 72 },
        { subjectId, coCode: "CO2", description: "Analyze and apply key design schemas to practical system layouts.", targetAttainment: 75, actualAttainment: 68 },
        { subjectId, coCode: "CO3", description: "Evaluate and solve complex engineering equations and theoretical cases.", targetAttainment: 70, actualAttainment: 60 }
      ]);
    }

    res.status(200).json({
      success: true,
      data: outcomes
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSubjects,
  createSubject,
  getTopics,
  createTopic,
  getCourseOutcomes
};
