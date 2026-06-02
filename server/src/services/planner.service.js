const DailyPlan = require("../models/DailyPlan.model");
const Topic = require("../models/Topic.model");
const StudySession = require("../models/StudySession.model");
const CompletedTask = require("../models/CompletedTask.model");
const User = require("../models/User.model");
const priorityService = require("./priority.service");
const { getStartOfDay, getEndOfDay } = require("../utils/date-utils");
const { AppError } = require("../utils/error-handler");

const getOrCreateDailyPlan = async (userId, dateStr) => {
  const date = getStartOfDay(dateStr ? new Date(dateStr) : new Date());
  
  let plan = await DailyPlan.findOne({
    userId,
    date: { $gte: getStartOfDay(date), $lte: getEndOfDay(date) }
  }).populate("tasks.topicId");

  if (!plan) {
    // Generate new plan using Priority Engine
    const prioritizedTopics = await priorityService.getPrioritizedTopics(userId);
    
    // Pick top 3 pending prioritized topics
    const pendingTopics = prioritizedTopics.slice(0, 3);
    
    const tasks = pendingTopics.map((topic, index) => {
      // High priority topics get 60 mins, others get 45 mins
      const duration = topic.priority === "high" ? 60 : 45;
      return {
        topicId: topic._id,
        status: "pending",
        duration,
        priority: topic.priority || "medium",
        type: index === 2 ? "revision" : "study" // schedule last one as revision
      };
    });

    plan = await DailyPlan.create({
      userId,
      date,
      tasks,
      isGeneratedByAI: true
    });

    plan = await DailyPlan.findById(plan._id).populate("tasks.topicId");
  }

  return plan;
};

const updateTaskStatus = async (userId, dateStr, taskId, status) => {
  const date = getStartOfDay(dateStr ? new Date(dateStr) : new Date());
  const plan = await DailyPlan.findOne({
    userId,
    date: { $gte: getStartOfDay(date), $lte: getEndOfDay(date) }
  });

  if (!plan) {
    throw new AppError("No plan found for this date", 404);
  }

  const task = plan.tasks.id(taskId);
  if (!task) {
    throw new AppError("Task not found in plan", 404);
  }

  task.status = status;
  await plan.save();

  if (status === "completed") {
    // Register as completed task
    await CompletedTask.create({
      userId,
      topicId: task.topicId,
      actualDuration: task.duration,
      date: new Date()
    });

    // Mark topic status as completed if all tasks for it are done, or simply update topic priority/status
    await Topic.findByIdAndUpdate(task.topicId, { status: "completed" });

    // Update streak and consistency for user
    const user = await User.findById(userId);
    if (user) {
      user.currentStreak += 1;
      // Add consistency points
      user.consistencyScore = Math.min(user.consistencyScore + 5, 100);
      await user.save();
    }
  }

  return plan;
};

const logStudySession = async (userId, topicId, duration, focusScore = 80) => {
  const startTime = new Date(Date.now() - duration * 60 * 1000);
  const endTime = new Date();

  const session = await StudySession.create({
    userId,
    topicId,
    duration,
    focusScore,
    startTime,
    endTime
  });

  // Increment study streak and focus score
  const user = await User.findById(userId);
  if (user) {
    user.currentStreak = (user.currentStreak || 0) + 1;
    user.consistencyScore = Math.min((user.consistencyScore || 100) + 2, 100);
    await user.save();
  }

  return session;
};

const getStudySessions = async (userId) => {
  return StudySession.find({ userId }).populate("topicId").sort({ startTime: -1 });
};

module.exports = {
  getOrCreateDailyPlan,
  updateTaskStatus,
  logStudySession,
  getStudySessions
};
