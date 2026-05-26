const predictBurnout = (weeklyHours, avgFocusScore) => {
  // If a student studies > 35 hours a week and their focus score falls below 70, burnout is highly likely
  let burnoutRisk = "low";
  let message = "Your study schedule is well-balanced. Keep up the good work!";

  if (weeklyHours > 45) {
    if (avgFocusScore < 70) {
      burnoutRisk = "high";
      message = "Critical: You are studying excessively while your focus and retention are dropping. We highly recommend taking a full rest day.";
    } else {
      burnoutRisk = "medium";
      message = "Warning: Your study hours are very high. Ensure you are taking adequate breaks between sessions to maintain long-term consistency.";
    }
  } else if (weeklyHours > 30 && avgFocusScore < 60) {
    burnoutRisk = "medium";
    message = "Notice: Your focus scores are declining. Try reducing your daily sessions by 15% and getting more sleep.";
  }

  return {
    burnoutRisk,
    weeklyHours,
    avgFocusScore,
    message
  };
};

module.exports = {
  predictBurnout
};
