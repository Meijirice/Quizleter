import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Flashcard from "../components/Flashcard";
import api from "../services/api"; // Axios instance
import "../css/subjectPage.css";

const SubjectPage = () => {
  const { subjectId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
  const [definition, setDefinition] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchFlashcards = async () => {
    try {
      const res = await api.get(`/qa/subject/${subjectId}`);
      setFlashcards(res.data);
    } catch (err) {
      console.error("Error fetching flashcards:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, [subjectId]);

  const handleAddQa = async (e) => {
    e.preventDefault();
    if (!question || !definition) return;

    try {
      const res = await api.post("/qa", {
        subjectId,
        question,
        definition,
      });
      setFlashcards([...flashcards, res.data]);
      setQuestion("");
      setDefinition("");
    } catch (err) {
      console.error("Error adding flashcard:", err);
    }
  };

  const handleDelete = async (qaId) => {
    if (!window.confirm("Are you sure you want to delete this flashcard?"))
      return;

    try {
      await api.delete(`/qa/${qaId}`);
      setFlashcards(flashcards.filter((card) => card._id !== qaId));
    } catch (err) {
      console.error("Error deleting flashcard:", err);
    }
  };

  if (isLoading) return <p>Loading flashcards...</p>;

  return (
    <div className="subjectPage">
      <h2>Flashcards</h2>

      <form className="addQaForm" onSubmit={handleAddQa}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Definition"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
        />
        <button type="submit">Add Flashcard</button>
      </form>

      <div className="flashcardsGrid">
        {flashcards.map((card) => (
          <Flashcard
            key={card._id}
            question={card.question}
            definition={card.definition}
            showDelete={true} // <-- enable delete button
            onDelete={() => handleDelete(card._id)} // <-- delete callback
          />
        ))}
      </div>
    </div>
  );
};

export default SubjectPage;
