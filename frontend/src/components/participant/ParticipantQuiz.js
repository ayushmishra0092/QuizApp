import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Specific_quiz from "../Specific_quiz";

const ParticipantQuiz = () => {
  // Extract the quizId from the URL
  const { quizId } = useParams();
  const [quiz, setquiz] = useState(null);

  // const quizId = useParams.getItem('quizId');
  //   const quizId=parameter[0];
  useEffect(() => {
    const getQuiz = async (req, res) => {
      // console.log(quizId)
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/quiz/${quizId}`,
          {
            method: "GET",
          }
        );
        const quiz = await response.json();
        setquiz(quiz);
        // console.log(quiz.title)
      } catch (error) {
        console.error(error);
      }
    };
    getQuiz();
  }, [quizId]);

  if (!quiz) {
    <p>Loading...!</p>;
  } else {
    return (
      <>
        <div id="title" style={{ backgroundColor: "red" }}>
          {quiz.title}
        </div>
        <div id="description" style={{ backgroundColor: "green" }}>
          {quiz.description}
        </div>

        <Specific_quiz Quiz={quiz} />
      </>
    );
  }
};

export default ParticipantQuiz;
