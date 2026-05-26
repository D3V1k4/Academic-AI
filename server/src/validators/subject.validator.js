const createSubjectSchema = {
  name: {
    required: true,
    type: "string"
  },
  credits: {
    required: true,
    type: "number",
    min: 1
  },
  code: {
    required: false,
    type: "string"
  }
};

const createTopicSchema = {
  subjectId: {
    required: true,
    type: "string"
  },
  name: {
    required: true,
    type: "string"
  },
  weightage: {
    required: false,
    type: "number",
    min: 1,
    max: 10
  },
  difficulty: {
    required: false,
    type: "string",
    enum: ["easy", "medium", "hard"]
  }
};

module.exports = {
  createSubjectSchema,
  createTopicSchema
};
