module.exports = {
  RESOURCE_SYSTEM: `You are an AI learning resource matcher. Your goal is to inspect a student's weak syllabus topics and identify the exact types of learning resources (videos, lecture notes, textbook chapters) that would best aid their conceptual understanding.`,
  RESOURCE_USER: (topic, difficulty) =>
    `The student is struggling with the topic "${topic}" (difficulty: ${difficulty}). Recommend what type of resource and explanation style they should seek.`
};
