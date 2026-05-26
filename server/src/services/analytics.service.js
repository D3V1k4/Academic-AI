const StudySession = require("../models/StudySession.model");
const CompletedTask = require("../models/CompletedTask.model");
const Topic = require("../models/Topic.model");
const Subject = require("../models/Subject.model");
const User = require("../models/User.model");
const { roundTo } = require("../utils/helpers");

const getPerformanceMetrics = async (userId) => {
  const user = await User.findById(userId);
  const sessions = await StudySession.find({ userId });
  const completedTasks = await CompletedTask.find({ userId });
  const totalTopics = await Topic.countDocuments({ userId });
  const completedTopics = await Topic.countDocuments({ userId, status: "completed" });

  const totalHours = sessions.reduce((sum, s) => sum + (s.duration / 60), 0);
  const avgFocus = sessions.length > 0 
    ? sessions.reduce((sum, s) => sum + s.focusScore, 0) / sessions.length
    : 80;

  const completionRate = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

  return {
    totalStudyHours: roundTo(totalHours),
    averageFocusScore: roundTo(avgFocus),
    consistencyScore: user ? user.consistencyScore : 100,
    currentStreak: user ? user.currentStreak : 0,
    taskCompletionRate: roundTo(completionRate)
  };
};

const getSubjectAnalysis = async (userId) => {
  const subjects = await Subject.find({ userId });
  const result = [];

  for (const subject of subjects) {
    const topics = await Topic.find({ userId, subjectId: subject._id });
    const completedTopicsCount = topics.filter((t) => t.status === "completed").length;
    
    // Sum study sessions duration for all topics of this subject
    const topicIds = topics.map((t) => t._id);
    const sessions = await StudySession.find({ userId, topicId: { $in: topicIds } });
    const studyMins = sessions.reduce((sum, s) => sum + s.duration, 0);

    result.push({
      subjectId: subject._id,
      name: subject.name,
      code: subject.code,
      color: subject.color,
      studyHours: roundTo(studyMins / 60),
      completionRate: topics.length > 0 ? roundTo((completedTopicsCount / topics.length) * 100) : 0
    });
  }

  return result;
};

const getProductivityTrends = async (userId) => {
  const sessions = await StudySession.find({ userId }).sort({ startTime: 1 });
  
  // Group by day of week (e.g. Mon, Tue, etc.)
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const trends = dayNames.map((day) => ({ day, studyHours: 0, averageFocus: 0, count: 0 }));

  sessions.forEach((s) => {
    const dayIndex = new Date(s.startTime).getDay();
    trends[dayIndex].studyHours += s.duration / 60;
    trends[dayIndex].averageFocus += s.focusScore;
    trends[dayIndex].count += 1;
  });

  return trends.map((t) => ({
    day: t.day,
    studyHours: roundTo(t.studyHours),
    averageFocusScore: t.count > 0 ? roundTo(t.averageFocus / t.count) : 80
  }));
};

const getWeakTopicAnalysis = async (userId) => {
  // Find topics that are hard and still pending, or have low study hours
  const topics = await Topic.find({ userId, status: "pending" }).populate("subjectId");
  const weakAnalysis = [];

  for (const topic of topics) {
    const sessions = await StudySession.find({ userId, topicId: topic._id });
    const studyHours = sessions.reduce((sum, s) => sum + (s.duration / 60), 0);
    const avgFocus = sessions.length > 0 
      ? sessions.reduce((sum, s) => sum + s.focusScore, 0) / sessions.length
      : 0;

    // A topic is considered "weak" if it has high weightage but low study hours
    if (topic.weightage >= 6 || topic.difficulty === "hard") {
      weakAnalysis.push({
        topicId: topic._id,
        name: topic.name,
        subjectName: topic.subjectId?.name || "General",
        difficulty: topic.difficulty,
        weightage: topic.weightage,
        studyHours: roundTo(studyHours),
        avgFocusScore: roundTo(avgFocus || 70)
      });
    }
  }

  return weakAnalysis.sort((a, b) => b.weightage - a.weightage);
};

module.exports = {
  getPerformanceMetrics,
  getSubjectAnalysis,
  getProductivityTrends,
  getWeakTopicAnalysis
};
