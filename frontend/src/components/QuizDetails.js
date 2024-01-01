import React, { useState, useEffect } from "react";
import Specific_quiz from "./Specific_quiz";

const QuizDetail = ({ Quiz }) => {
  const [isShown, setIsShown] = useState(false);
  const [Link, setLink] = useState("");

  const handleClick = () => {
    setIsShown((current) => !current);
    console.log(Quiz);
  };

  const handleShareQuiz = async (quizId) => {
    try {
      const response = await fetch(
        `https://quizapp-backend-ayush.onrender.com/api/auth/${quizId}/share`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const link = await response.json();
      setLink(link);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{Quiz.title}</h2>
      <p>{Quiz.description}</p>
      <div>
        <button
          onClick={handleClick}
          style={{
            padding: "3px 23px",
            "background-color": "#4caf50",
            color: "#fff",
            border: "none",
            "border-radius": "4px",
            cursor: "pointer",
            "font-family": "ui-serif",
            "font-size": "medium",
          }}
        >
          view
        </button>
        <div>
          {/* <button>
        <span>{isCopied ? 'Copied!' : 'Copy'}</span>
      </button> */}
        </div>
        <button onClick={() => handleShareQuiz(Quiz._id)}>Share</button>
        <input type="text" value={Link} />
        <div style={{ display: isShown ? "block" : "none" }}>
          <Specific_quiz Quiz={Quiz} />
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;
