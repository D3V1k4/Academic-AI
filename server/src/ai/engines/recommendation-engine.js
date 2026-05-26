const generateStudySuggestions = (weakTopics, consistencyScore, streakDays) => {
  const suggestions = [];

  if (consistencyScore < 60) {
    suggestions.push({
      type: "revision",
      message: "Your study consistency has fallen. Try planning smaller 25-minute Pomodoro sessions daily to rebuild your study streak!"
    });
  }

  if (weakTopics && weakTopics.length > 0) {
    const topWeak = weakTopics.slice(0, 2);
    topWeak.forEach((topic) => {
      suggestions.push({
        type: "weak_topic",
        message: `You have pending tasks in high-weightage topic "${topic.name}". We recommend watching an explanatory video resource and attempting at least 2 PYQs on this topic today.`
      });
    });
  }

  if (streakDays >= 7) {
    suggestions.push({
      type: "revision",
      message: `Incredible work! You are on a ${streakDays}-day streak. Take some time today to quickly review topics from earlier this week to cement your learning.`
    });
  }

  // Fallback default
  if (suggestions.length === 0) {
    suggestions.push({
      type: "revision",
      message: "You are doing great! Keep up the balanced schedule. Today is a great day to read a short article or summarize your notes."
    });
  }

  return suggestions;
};

module.exports = {
  generateStudySuggestions
};
