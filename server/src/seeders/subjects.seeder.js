const Subject = require("../models/Subject.model");
const Semester = require("../models/Semester.model");
const logger = require("../utils/logger");

const seedSubjectsForUser = async (userId) => {
  logger.info(`Seeding academic subjects for user: ${userId}`);

  // 1. Create or Find Active Semester
  let semester = await Semester.findOne({ userId, isActive: true });
  if (!semester) {
    semester = await Semester.create({
      userId,
      name: "Semester 5",
      startDate: new Date(),
      endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      isActive: true
    });
  }

  // 2. Clear old subjects for this semester
  await Subject.deleteMany({ userId, semesterId: semester._id });

  // 3. Create default subjects
  const defaultSubjects = [
    {
      userId,
      semesterId: semester._id,
      name: "Database Management Systems",
      code: "CS501",
      credits: 4,
      color: "#3B82F6" // blue
    },
    {
      userId,
      semesterId: semester._id,
      name: "Design and Analysis of Algorithms",
      code: "CS502",
      credits: 4,
      color: "#10B981" // green
    },
    {
      userId,
      semesterId: semester._id,
      name: "Software Engineering",
      code: "CS503",
      credits: 3,
      color: "#EC4899" // pink
    },
    {
      userId,
      semesterId: semester._id,
      name: "Artificial Intelligence",
      code: "CS504",
      credits: 3,
      color: "#8B5CF6" // purple
    }
  ];

  const subjects = await Subject.create(defaultSubjects);
  logger.info(`Successfully seeded ${subjects.length} subjects.`);
  return subjects;
};

module.exports = {
  seedSubjectsForUser
};
