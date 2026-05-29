const calculatePriority = (data) => {
  const {
    topic,
    examUrgency,
    weakness,
    pyqFrequency,
    difficulty,
    backlogRisk
  } = data;

  /*
  |--------------------------------------------------------------------------
  | Priority Formula
  |--------------------------------------------------------------------------
  */
  const score =
    (examUrgency * 0.35) +
    (weakness * 0.25) +
    (pyqFrequency * 0.20) +
    (difficulty * 0.10) +
    (backlogRisk * 0.10);

  /*
  |--------------------------------------------------------------------------
  | Priority Label
  |--------------------------------------------------------------------------
  */
  let label = "LOW";

  if (score >= 8) {
    label = "HIGH";
  } else if (score >= 5) {
    label = "MEDIUM";
  }

  /*
  |--------------------------------------------------------------------------
  | Recommended Duration
  |--------------------------------------------------------------------------
  */
  let recommendedDuration = "1 hour";

  if (score >= 8) {
    recommendedDuration = "2.5 hours";
  } else if (score >= 5) {
    recommendedDuration = "2 hours";
  }

  /*
  |--------------------------------------------------------------------------
  | Study Type Logic
  |--------------------------------------------------------------------------
  */
  const studyType =
    weakness >= 7
      ? "Concept + Practice"
      : "Revision + PYQ";

  return {
    topic,
    priorityScore: Number(score.toFixed(2)),
    label,
    recommendedDuration,
    studyType
  };
};

module.exports = {
  calculatePriority
};