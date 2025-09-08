const express = require("express");
const {
  createSubject,
  getSubjects,
  getSubjectById,
} = require("../controllers/subjectController");

const router = express.Router();

router.post("/", createSubject); // POST /api/subjects
router.get("/", getSubjects); // GET /api/subjects
router.get("/:id", getSubjectById); // GET /api/subjects/:id

module.exports = router;
