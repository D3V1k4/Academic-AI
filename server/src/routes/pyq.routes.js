const express = require("express");
const pyqController = require("../controllers/pyq.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

let upload = {
  single: () => (req, res, next) => next() // no-op fallback
};

try {
  const multer = require("multer");
  upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // limit 10MB
  });
} catch (e) {
  console.log("Multer optional import: Using JSON base64 fallback for uploads.");
}

router.use(authMiddleware);

router.post("/upload", upload.single("file"), pyqController.uploadPYQ);
router.get("/:subjectId/weightage", pyqController.getWeightageChart);
router.get("/:subjectId/important", pyqController.getImportantQuestions);

module.exports = router;
