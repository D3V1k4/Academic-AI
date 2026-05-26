const simulateGpa = (targetGpa, hoursPerDay, consistencyScore) => {
  // Let's implement an elegant projection formula
  // Base projected GPA is affected by daily study hours and study consistency
  const maxGpa = 10.0;
  
  // Hours factor: 4 hours a day is optimal (100% capacity)
  const hoursFactor = Math.min(hoursPerDay / 4, 1.2);
  const consistencyFactor = consistencyScore / 100;
  
  // Calculate simulated projection
  const baseMultiplier = 0.7 * hoursFactor + 0.3 * consistencyFactor;
  let predictedGpa = targetGpa * baseMultiplier;
  
  // Constrain predicted GPA between 4.0 and 10.0
  predictedGpa = Math.max(4.0, Math.min(predictedGpa, maxGpa));
  predictedGpa = Math.round(predictedGpa * 100) / 100;

  let impactOfConsistency = "";
  if (consistencyScore >= 85) {
    impactOfConsistency = "Excellent consistency! Maintaining this pace will help you exceed your target GPA with minimal stress.";
  } else if (consistencyScore >= 65) {
    impactOfConsistency = "Good consistency. Increasing your daily study focus by 15 minutes will fully secure your target GPA.";
  } else {
    impactOfConsistency = "High Risk: Your consistency is too low. Even if you study long hours on single days, lack of daily habit will cause an estimated drop in exams.";
  }

  return {
    predictedGpa,
    impactOfConsistency
  };
};

module.exports = {
  simulateGpa
};
