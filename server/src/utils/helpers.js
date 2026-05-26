const roundTo = (num, decimals = 2) => {
  return Math.round((num + Number.EPSILON) * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

const formatResponse = (success, message, data = null) => {
  return {
    success,
    message,
    data
  };
};

module.exports = {
  roundTo,
  formatResponse
};
