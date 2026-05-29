const detectBurnoutRisk = (data) => {
  const {
    studyHoursPerDay,
    skippedTasks,
    completionRate,
    continuousHeavyDays,
    consistencyScore
  } = data;

  /*
  |--------------------------------------------------------------------------
  | Burnout Score Calculation
  |--------------------------------------------------------------------------
  */
  let burnoutScore = 0;

  // Excessive study hours
  if (studyHoursPerDay >= 8) {
    burnoutScore += 30;
  } else if (studyHoursPerDay >= 6) {
    burnoutScore += 20;
  }

  // Skipped tasks
  burnoutScore += skippedTasks * 5;

  // Low completion rate
  if (completionRate < 50) {
    burnoutScore += 25;
  } else if (completionRate < 70) {
    burnoutScore += 15;
  }

  // Continuous heavy schedule
  burnoutScore += continuousHeavyDays * 5;

  // Low consistency
  if (consistencyScore < 40) {
    burnoutScore += 20;
  }

  /*
  |--------------------------------------------------------------------------
  | Burnout Level
  |--------------------------------------------------------------------------
  */
  let riskLevel = "LOW";

  if (burnoutScore >= 70) {
    riskLevel = "HIGH";
  } else if (burnoutScore >= 40) {
    riskLevel = "MEDIUM";
  }

  /*
  |--------------------------------------------------------------------------
  | AI Recommendations
  |--------------------------------------------------------------------------
  */
  const recommendations = [];

  if (riskLevel === "HIGH") {
    recommendations.push(
      "Reduce workload for next 2 days"
    );

    recommendations.push(
      "Focus only on revision and PYQs"
    );

    recommendations.push(
      "Take longer breaks between sessions"
    );

    recommendations.push(
      "Avoid difficult subjects temporarily"
    );
  }

  if (riskLevel === "MEDIUM") {
    recommendations.push(
      "Add short breaks between study blocks"
    );

    recommendations.push(
      "Balance difficult and easy subjects"
    );
  }

  if (riskLevel === "LOW") {
    recommendations.push(
      "Current study pattern is sustainable"
    );
  }

  return {
    burnoutScore,
    riskLevel,
    recommendations
  };
};

module.exports = {
  detectBurnoutRisk
};