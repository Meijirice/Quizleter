const QA = require("../models/QA");
const Subject = require("../models/subject");

exports.createQA = async (req, res) => {
  try {
    const { question, definition, subjectId } = req.body;

    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ error: "Subject not found" });

    const qa = new QA({ question, definition, subject: subjectId });
    await qa.save();

    subject.questions.push(qa._id);
    await subject.save();

    res.status(201).json(qa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getQABySubject = async (req, res) => {
  try {
    const qas = await QA.find({ subject: req.params.subjectId });
    res.json(qas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQAById = async (req, res) => {
  try {
    const qa = await QA.findById(req.params.id).populate("subject");
    if (!qa) return res.status(404).json({ error: "QA not found" });
    res.json(qa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteQA = async (req, res) => {
  try {
    const { id } = req.params;

    const qa = await QA.findById(id);
    if (!qa) return res.status(404).json({ error: "QA not found" });

    // Remove the QA ID from the parent subject's questions array
    await Subject.findByIdAndUpdate(qa.subject, {
      $pull: { questions: qa._id },
    });

    // Delete the QA document
    await QA.findByIdAndDelete(id);

    res.json({ message: "Flashcard deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
