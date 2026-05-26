const Topic = require("../models/Topic.model");
const priorityEngine = require("../ai/engines/priority-engine");

const getPrioritizedTopics = async (userId, subjectId = null) => {
  const query = { userId };
  if (subjectId) {
    query.subjectId = subjectId;
  }

  const topics = await Topic.find(query).populate("subjectId");
  return priorityEngine.rankTopics(topics);
};

module.exports = {
  getPrioritizedTopics
};
