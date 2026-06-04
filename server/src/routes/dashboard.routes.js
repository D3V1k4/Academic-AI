const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const {
  getOverview,
} = require("../controllers/dashboard.controller");

const router = express.Router();

router.get(
  "/overview",
  authMiddleware,
  getOverview
);

module.exports = router;
