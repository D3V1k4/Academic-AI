const resourceMatcherService = require("../services/resource-matcher.service");
const recommendationService = require("../services/recommendation.service");

const getResources = async (req, res, next) => {
  try {
    const { subjectId, topicId } = req.query;
    let resources = [];
    if (topicId) {
      resources = await resourceMatcherService.getResourcesByTopic(topicId);
    } else if (subjectId) {
      resources = await resourceMatcherService.getResourcesBySubject(subjectId);
    }
    res.status(200).json({
      success: true,
      data: resources
    });
  } catch (error) {
    next(error);
  }
};

const recommendResources = async (req, res, next) => {
  try {
    const recommendations = await recommendationService.getRecommendations(req.user._id);
    res.status(200).json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    next(error);
  }
};

const addResource = async (req, res, next) => {
  try {
    const { title, type, url, subjectId, topicId, difficultyLevel } = req.body;
    const resource = await resourceMatcherService.addResource(
      title,
      type,
      url,
      subjectId,
      topicId,
      difficultyLevel
    );
    res.status(201).json({
      success: true,
      message: "Resource added successfully",
      data: resource
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getResources,
  recommendResources,
  addResource
};
