const express = require("express");
const subjectController = require("../controllers/subject.controller");
const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const { createSubjectSchema, createTopicSchema } = require("../validators/subject.validator");

const router = express.Router();

router.use(authMiddleware);

router.get("/", subjectController.getSubjects);
router.post("/", validate(createSubjectSchema), subjectController.createSubject);
router.get("/topics", subjectController.getTopics);
router.post("/topics", validate(createTopicSchema), subjectController.createTopic);
router.get("/:subjectId/co", subjectController.getCourseOutcomes);

module.exports = router;
