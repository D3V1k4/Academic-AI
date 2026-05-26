const Topic = require("../models/Topic.model");
const Resource = require("../models/Resource.model");
const logger = require("../utils/logger");

const seedTopicsForSubjects = async (userId, subjects) => {
  logger.info(`Seeding topics for user ${userId} across ${subjects.length} subjects.`);

  // Clear old topics
  const subjectIds = subjects.map((s) => s._id);
  await Topic.deleteMany({ userId, subjectId: { $in: subjectIds } });
  await Resource.deleteMany({ subjectId: { $in: subjectIds } });

  const topicsData = {
    "Database Management Systems": [
      { name: "Relational Data Model & SQL", weightage: 8, difficulty: "easy" },
      { name: "Database Normalization (1NF, 2NF, 3NF, BCNF)", weightage: 9, difficulty: "hard" },
      { name: "Transaction Management & ACID properties", weightage: 7, difficulty: "medium" },
      { name: "Indexing and Hashing (B-Trees & B+ Trees)", weightage: 8, difficulty: "hard" }
    ],
    "Design and Analysis of Algorithms": [
      { name: "Asymptotic Notations & Time Complexity", weightage: 7, difficulty: "easy" },
      { name: "Divide and Conquer (Merge & Quick Sort)", weightage: 8, difficulty: "medium" },
      { name: "Dynamic Programming (Knapsack & LCS)", weightage: 10, difficulty: "hard" },
      { name: "Graph Algorithms (Dijkstra & Prim's)", weightage: 9, difficulty: "hard" }
    ],
    "Software Engineering": [
      { name: "Software Development Life Cycle Models", weightage: 6, difficulty: "easy" },
      { name: "Requirements Engineering & SRS documentation", weightage: 7, difficulty: "medium" },
      { name: "Software Testing Techniques (White & Black Box)", weightage: 8, difficulty: "medium" }
    ],
    "Artificial Intelligence": [
      { name: "Uninformed and Informed Search (A* & DFS)", weightage: 8, difficulty: "medium" },
      { name: "Knowledge Representation & Propositional Logic", weightage: 7, difficulty: "medium" },
      { name: "Introduction to Machine Learning & Neural Networks", weightage: 9, difficulty: "hard" }
    ]
  };

  for (const subject of subjects) {
    const subjectTopics = topicsData[subject.name] || [];
    for (const t of subjectTopics) {
      const topic = await Topic.create({
        userId,
        subjectId: subject._id,
        name: t.name,
        weightage: t.weightage,
        difficulty: t.difficulty,
        status: "pending"
      });

      // Add a couple of realistic study resources under this topic
      await Resource.create([
        {
          title: `${t.name} - In-Depth Lecture Video`,
          type: "video",
          url: "https://www.youtube.com/watch?v=academicai_lecture",
          subjectId: subject._id,
          topicId: topic._id,
          difficultyLevel: t.difficulty
        },
        {
          title: `${t.name} - Essential Revision PDF Notes`,
          type: "pdf",
          url: "https://notes.academicai.com/files/lecture_notes.pdf",
          subjectId: subject._id,
          topicId: topic._id,
          difficultyLevel: t.difficulty
        }
      ]);
    }
  }

  logger.info("Successfully seeded topics and mock learning resources.");
};

module.exports = {
  seedTopicsForSubjects
};
