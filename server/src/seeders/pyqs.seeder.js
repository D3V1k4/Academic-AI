const PYQ = require("../models/PYQ.model");
const Topic = require("../models/Topic.model");
const logger = require("../utils/logger");

const seedPyqsForSubjects = async (userId, subjects) => {
  logger.info(`Seeding PYQs for user subjects...`);

  for (const subject of subjects) {
    // Clear old PYQs
    await PYQ.deleteMany({ subjectId: subject._id });

    const topics = await Topic.find({ subjectId: subject._id });
    if (topics.length === 0) continue;

    // Seed PYQ for year 2024
    const questions = topics.map((t, index) => ({
      questionText: `Solve the following problem regarding ${t.name} with suitable diagrams/equations.`,
      marks: t.difficulty === "hard" ? 10 : 5,
      topicId: t._id,
      frequency: Math.floor(Math.random() * 3) + 1
    }));

    await PYQ.create({
      subjectId: subject._id,
      year: 2024,
      questionPaperPdfUrl: `https://storage.academicai.com/pyqs/2024_${subject.code || "CS"}.pdf`,
      questions
    });
  }

  logger.info("Successfully seeded past year questions.");
};

module.exports = {
  seedPyqsForSubjects
};
