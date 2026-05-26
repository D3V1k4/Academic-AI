const calculateConsistencyScore = (completedHours, targetHours, streakDays) => {
  if (targetHours <= 0) return 100;
  
  const completionRatio = Math.min(completedHours / targetHours, 1);
  const streakBonus = Math.min(streakDays * 5, 20); // max 20% bonus for streak
  
  const baseScore = completionRatio * 80; // max 80% for completion
  return Math.min(Math.round(baseScore + streakBonus), 100);
};

module.exports = {
  calculateConsistencyScore
};
