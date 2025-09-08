import React, { useState } from "react";
import "../css/flashCard.css";

const FlashCard = ({ question, definition, showDelete = true, onDelete }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(!flipped);

  return (
    <div
      className={`flashCard ${flipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="front">
        <p>{question}</p>
      </div>
      <div className="back">
        <p>{definition}</p>
      </div>

      {showDelete && onDelete && (
        <button
          className="deleteBtn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default FlashCard;
