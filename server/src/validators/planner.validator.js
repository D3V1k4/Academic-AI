const logSessionSchema = {
  topicId: {
    required: true,
    type: "string"
  },
  duration: {
    required: true,
    type: "number",
    min: 1
  },
  focusScore: {
    required: false,
    type: "number",
    min: 0,
    max: 100
  }
};

const updateTaskSchema = {
  status: {
    required: true,
    type: "string",
    enum: ["pending", "completed"]
  }
};

module.exports = {
  logSessionSchema,
  updateTaskSchema
};
