import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Flashcard from "../components/Flashcard";
import api from "../services/api"; // Axios instance
import "../css/deckView.css";

const DeckView = () => {
  const { subjectId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    if (subjectId) fetchFlashcards();
  }, [subjectId]);

  // Circular next
  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  }, [flashcards.length]);

  // Circular previous
  const goPrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length
    );
  }, [flashcards.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  if (isLoading) return <p>Loading flashcards...</p>;
  if (flashcards.length === 0)
    return <p>No flashcards found for this subject.</p>;

  const currentCard = flashcards[currentIndex];

  return (
    <div className="deckView">
      <div className="flashcardContainer">
        <Flashcard
          key={currentCard._id}
          question={currentCard.question}
          definition={currentCard.definition}
        />
      </div>

      <div className="navigationButtons">
        <button onClick={goPrev}>&larr; Previous</button>
        <span>
          {currentIndex + 1} / {flashcards.length}
        </span>
        <button onClick={goNext}>Next &rarr;</button>
      </div>
    </div>
  );
};

export default DeckView;
