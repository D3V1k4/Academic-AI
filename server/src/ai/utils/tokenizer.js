const tokenize = (text = "") => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 2);
};

const countKeywords = (tokens = []) => {
  const counts = {};
  tokens.forEach((token) => {
    counts[token] = (counts[token] || 0) + 1;
  });
  return counts;
};

module.exports = {
  tokenize,
  countKeywords
};
