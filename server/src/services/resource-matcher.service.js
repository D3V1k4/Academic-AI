const Resource = require("../models/Resource.model");

const getResourcesByTopic = async (topicId) => {
  return Resource.find({ topicId });
};

const getResourcesBySubject = async (subjectId) => {
  return Resource.find({ subjectId }).populate("topicId");
};

const addResource = async (title, type, url, subjectId, topicId, difficultyLevel = "medium") => {
  return Resource.create({
    title,
    type,
    url,
    subjectId,
    topicId,
    difficultyLevel
  });
};

module.exports = {
  getResourcesByTopic,
  getResourcesBySubject,
  addResource
};
