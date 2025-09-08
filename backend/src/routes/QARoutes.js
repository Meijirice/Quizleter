const express = require("express");
const {
  createQA,
  getQABySubject,
  getQAById,
  deleteQA,
} = require("../controllers/QAController");

const router = express.Router();

router.post("/", createQA);
router.get("/subject/:subjectId", getQABySubject);
router.get("/:id", getQAById);
router.delete("/:id", deleteQA);

module.exports = router;
