const Recommendation = require("../models/Recommendation.model");
const Resource = require("../models/Resource.model");
const Topic = require("../models/Topic.model");
const User = require("../models/User.model");
const recommendationEngine = require("../ai/engines/recommendation-engine");
const analyticsService = require("./analytics.service");

const getRecommendations = async (userId) => {
  // Try finding existing recommendations
  let recs = await Recommendation.find({ userId }).populate("resources");

  if (recs.length === 0) {
    // Generate fresh recommendations
    const user = await User.findById(userId);
    const weakTopics = await analyticsService.getWeakTopicAnalysis(userId);
    const consistencyScore = user ? user.consistencyScore : 100;
    const streakDays = user ? user.currentStreak : 0;

    const suggestions = recommendationEngine.generateStudySuggestions(
      weakTopics,
      consistencyScore,
      streakDays
    );

    for (const sug of suggestions) {
      // Find matching resources for the weak topic if applicable
      let resources = [];
      if (sug.type === "weak_topic" && weakTopics.length > 0) {
        resources = await Resource.find({ topicId: weakTopics[0].topicId }).limit(2);
      }

      await Recommendation.create({
        userId,
        type: sug.type,
        message: sug.message,
        resources: resources.map((r) => r._id)
      });
    }

    recs = await Recommendation.find({ userId }).populate("resources");
  }

  return recs;
};

const markRecommendationActed = async (recommendationId) => {
  return Recommendation.findByIdAndUpdate(
    recommendationId,
    { actionTaken: true },
    { new: true }
  );
};

module.exports = {
  getRecommendations,
  markRecommendationActed
};
