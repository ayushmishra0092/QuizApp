import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizDetails from "./QuizDetails.js";
import Specific_quiz from "./Specific_quiz.js";
export default function Home() {
  const notesInitial = [];
  const [Quizes, setQuizes] = useState(notesInitial);
  const history = useNavigate();
  const getQuizes = async () => {
    // API Call
    const response = await fetch(
      `http://localhost:5000/api/auth/fetchallquiz`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    // console.log(json)
    setQuizes(json);
  };
  // Delete a quiz
  const deleteQuiz = async (id) => {
    // API Call
    const response = await fetch(
      `http://localhost:5000/api/auth/deletequiz/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    // const json = response.json();
    const newQuiz = Quizes.filter((Quiz) => {
      return Quiz._id !== id;
    });
    setQuizes(newQuiz);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getQuizes();
      // console.log("hy");
    } else {
      history("/login");
    }
  }, []);

  return (
    <>
      <div className="row my-3">
        <h2 style={{ backgroundColor: "rgb(204 153 255)" }}>
          Your all Quizes:Share with Participents
        </h2>
        <div className="container mx-2">
          {Quizes.length === 0 && "NO Quiz to display!!!"}
        </div>
        {Quizes.map((Quiz) => {
          return (
            <>
              <div
                style={{
                  backgroundColor: "rgb(153,204,255)",
                  padding: "23px 23px 23px 23px",
                }}
              >
                <QuizDetails Quiz={Quiz} />

                <button
                  onClick={() => {
                    deleteQuiz(Quiz._id);
                  }}
                  style={{
                    padding: "2px 14px",
                    "background-color": "#f12d2d",
                    color: "#fff",
                    border: "none",
                    "border-radius": "4px",
                    cursor: "pointer",
                    "font-family": "ui-serif",
                    "font-size": "medium",
                  }}
                >
                  remove
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
