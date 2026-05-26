const rankTopics = (topics) => {
  // Sorts and scores topics based on exam weightage (50%) and difficulty (50%)
  const getDifficultyScore = (diff) => {
    switch (diff) {
      case "hard": return 10;
      case "medium": return 6;
      case "easy": return 3;
      default: return 5;
    }
  };

  return topics
    .map((topic) => {
      const difficultyScore = getDifficultyScore(topic.difficulty);
      const weightageScore = topic.weightage || 5;
      
      // Calculate composite priority score
      const priorityScore = (weightageScore * 0.6) + (difficultyScore * 0.4);
      
      let priority = "medium";
      if (priorityScore >= 7.5) {
        priority = "high";
      } else if (priorityScore <= 4.5) {
        priority = "low";
      }

      return {
        ...topic.toObject ? topic.toObject() : topic,
        priorityScore,
        priority
      };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);
};

module.exports = {
  rankTopics
};
