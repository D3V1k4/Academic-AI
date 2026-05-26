const getEmbedding = async (text) => {
  // Return mock vector of 1536 dimensions
  const vector = Array.from({ length: 1536 }, () => Math.random() - 0.5);
  // Normalize vector
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return vector.map((val) => val / magnitude);
};

module.exports = {
  getEmbedding
};
