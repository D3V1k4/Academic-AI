const generateDailyPlan = (data) => {
  const {
    availableHours,
    topics
  } = data;

  /*
  |--------------------------------------------------------------------------
  | Sort Topics By Priority
  |--------------------------------------------------------------------------
  */
  const sortedTopics = topics.sort(
    (a, b) => b.priority - a.priority
  );

  /*
  |--------------------------------------------------------------------------
  | Plan Generation
  |--------------------------------------------------------------------------
  */
  let remainingHours = availableHours;

  const plan = [];

  for (const topic of sortedTopics) {
    if (remainingHours <= 0) {
      break;
    }

    /*
    |--------------------------------------------------------------------------
    | Adaptive Duration Logic
    |--------------------------------------------------------------------------
    */
    let sessionDuration = 1;

    if (topic.priority >= 8) {
      sessionDuration = 2;
    } else if (topic.priority >= 5) {
      sessionDuration = 1.5;
    }

    /*
    |--------------------------------------------------------------------------
    | Prevent Over Allocation
    |--------------------------------------------------------------------------
    */
    if (sessionDuration > remainingHours) {
      sessionDuration = remainingHours;
    }

    /*
    |--------------------------------------------------------------------------
    | Study Type Logic
    |--------------------------------------------------------------------------
    */
    const studyType =
      topic.weakness >= 7
        ? "Concept Learning + Practice"
        : "Revision + PYQs";

    /*
    |--------------------------------------------------------------------------
    | Add Study Session
    |--------------------------------------------------------------------------
    */
    plan.push({
      topic: topic.topic,
      duration: `${sessionDuration} hour(s)`,
      studyType,
      priority: topic.priority,
      breakAfter: "15 mins"
    });

    /*
    |--------------------------------------------------------------------------
    | Auto Revision Block
    |--------------------------------------------------------------------------
    */
    if (topic.priority >= 8) {
      plan.push({
        topic: `${topic.topic} Revision`,
        duration: "30 mins",
        studyType: "Quick Revision",
        priority: topic.priority,
        breakAfter: "10 mins"
      });
    }

    remainingHours -= sessionDuration;
  }

  /*
  |--------------------------------------------------------------------------
  | Burnout Prevention
  |--------------------------------------------------------------------------
  */
  if (availableHours >= 6) {
    plan.push({
      topic: "Relaxation / Recovery",
      duration: "30 mins",
      studyType: "Break / Light Activity",
      priority: 0,
      breakAfter: "-"
    });
  }

  return {
    totalStudyHours: availableHours,
    scheduledSessions: plan.length,
    remainingHours,
    plan
  };
};

module.exports = {
  generateDailyPlan
};