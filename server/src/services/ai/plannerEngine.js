const generateDailyPlan = (data = {}) => {
  const availableHours = Number(data.availableHours ?? data.hoursAvailable ?? 0);
  const topics = Array.isArray(data.topics) ? data.topics : [];

  const sortedTopics = [...topics].sort(
    (a, b) => (b.priority || 0) - (a.priority || 0)
  );

  let remainingHours = availableHours;
  const plan = [];

  for (const topic of sortedTopics) {
    if (remainingHours <= 0) break;

    let sessionDuration = 1;

    if ((topic.priority || 0) >= 8) {
      sessionDuration = 2;
    } else if ((topic.priority || 0) >= 5) {
      sessionDuration = 1.5;
    }

    if (sessionDuration > remainingHours) {
      sessionDuration = remainingHours;
    }

    const studyType =
      (topic.weakness || 0) >= 7
        ? "Concept Learning + Practice"
        : "Revision + PYQs";

    plan.push({
      topic: topic.topic || topic.name || "Untitled Topic",
      duration: `${sessionDuration} hour(s)`,
      studyType,
      priority: topic.priority || 0,
      breakAfter: "15 mins"
    });

    if ((topic.priority || 0) >= 8) {
      plan.push({
        topic: `${topic.topic || topic.name || "Untitled Topic"} Revision`,
        duration: "30 mins",
        studyType: "Quick Revision",
        priority: topic.priority || 0,
        breakAfter: "10 mins"
      });
    }

    remainingHours -= sessionDuration;
  }

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