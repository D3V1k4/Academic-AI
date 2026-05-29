const scheduleRevision = (data) => {
  const {
    topic,
    completedDate
  } = data;

  const baseDate = new Date(completedDate);

  /*
  |--------------------------------------------------------------------------
  | Revision Dates
  |--------------------------------------------------------------------------
  */
  const revision1 = new Date(baseDate);
  revision1.setDate(revision1.getDate() + 1);

  const revision2 = new Date(baseDate);
  revision2.setDate(revision2.getDate() + 3);

  const revision3 = new Date(baseDate);
  revision3.setDate(revision3.getDate() + 7);

  /*
  |--------------------------------------------------------------------------
  | AI Revision Plan
  |--------------------------------------------------------------------------
  */
  return {
    topic,
    completedDate: baseDate,
    revisions: [
      {
        revisionNumber: 1,
        revisionDate: revision1,
        focus: "Quick concept revision"
      },
      {
        revisionNumber: 2,
        revisionDate: revision2,
        focus: "Practice PYQs and weak areas"
      },
      {
        revisionNumber: 3,
        revisionDate: revision3,
        focus: "Final reinforcement revision"
      }
    ]
  };
};

module.exports = {
  scheduleRevision
};