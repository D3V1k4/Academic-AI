const FutureScenario = require("../models/FutureScenario.model");
const gpaSimulator = require("../ai/engines/gpa-simulator");
const User = require("../models/User.model");

const runGpaSimulation = async (userId, targetGpa, studyHoursPerDay) => {
  const user = await User.findById(userId);
  const consistencyScore = user ? user.consistencyScore : 100;

  const result = gpaSimulator.simulateGpa(targetGpa, studyHoursPerDay, consistencyScore);

  const scenario = await FutureScenario.create({
    userId,
    gpaTarget: targetGpa,
    targetStudyHoursPerDay: studyHoursPerDay,
    predictedGpa: result.predictedGpa,
    impactOfConsistency: result.impactOfConsistency
  });

  return scenario;
};

const getSimulations = async (userId) => {
  return FutureScenario.find({ userId }).sort({ createdAt: -1 });
};

module.exports = {
  runGpaSimulation,
  getSimulations
};
