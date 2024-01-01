import React, { useState } from "react";
import style from "../css_files/Quizform.css";
import { useNavigate } from "react-router-dom";

const QuizCreationForm = (props) => {
  const navigate = useNavigate();
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const initial = [];
  const [questions, setQuestions] = useState([
    { questionText: "", options: [""], correctAnswerIndices: initial },
  ]);

  const handleQuizTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleQuizDescriptionChange = (e) => {
    setQuizDescription(e.target.value);
  };

  const handleQuestionTextChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionTextChange = (e, questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (e, questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    const selectedCorrectAnswers =
      updatedQuestions[questionIndex].correctAnswerIndices;
    const isChecked = e.target.checked;

    if (isChecked) {
      selectedCorrectAnswers.push(optionIndex);
    } else {
      const index = selectedCorrectAnswers.indexOf(optionIndex);
      if (index > -1) {
        selectedCorrectAnswers.splice(index, 1);
      }
    }

    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: [""], correctAnswerIndices: [] },
    ]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };
  const add_quiz = async (title, description, questions) => {
    // console.log(quizData.title);
    const response = await fetch(`http://localhost:5000/api/auth/newquiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, questions }),
    });

    const quiz = await response.json();
    props.showalert("Quiz created successfully", "success");
    // console.log(quiz);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the quiz data to send to the backend
    const quizData = {
      title: quizTitle,
      description: quizDescription,
      questions: questions.map((question) => ({
        questionText: question.questionText,
        options: question.options,
        correctAnswerIndices: question.correctAnswerIndices,
      })),
      // console.log(question.correctAnswerIndices)
    };

    // Send the quizData to the backend API endpoint to save it in the database
    // You can use a library like Axios to make HTTP requests

    add_quiz(quizData.title, quizData.description, quizData.questions);
    setQuestions("", [""], []);
    setQuizDescription("");
    setQuizTitle("");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="quizTitle">Quiz Title:</label>
        <input
          type="text"
          id="quizTitle"
          value={quizTitle}
          onChange={handleQuizTitleChange}
          minLength={3}
          required
        />
      </div>
      <div>
        <label htmlFor="quizDescription">Quiz Description:</label>
        <textarea
          id="quizDescription"
          value={quizDescription}
          onChange={handleQuizDescriptionChange}
          minLength={5}
          required
        />
      </div>

      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <h3>Question {questionIndex + 1}:</h3>
          <div>
            <label htmlFor={`questionText-${questionIndex}`}>Question:</label>
            <input
              type="text"
              id={`questionText-${questionIndex}`}
              value={question.questionText}
              onChange={(e) => handleQuestionTextChange(e, questionIndex)}
              minLength={5}
              required
            />
          </div>

          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <label htmlFor={`option-${questionIndex}-${optionIndex}`}>
                Option {optionIndex + 1}:
              </label>
              <input
                type="text"
                id={`option-${questionIndex}-${optionIndex}`}
                value={option}
                onChange={(e) =>
                  handleOptionTextChange(e, questionIndex, optionIndex)
                }
                minLength={5}
                required
              />
              <input
                type="checkbox"
                id={`correctAnswer-${questionIndex}-${optionIndex}`}
                checked={question.correctAnswerIndices.includes(optionIndex)}
                onChange={(e) =>
                  handleCorrectAnswerChange(e, questionIndex, optionIndex)
                }
              />
              <label htmlFor={`correctAnswer-${questionIndex}-${optionIndex}`}>
                Correct Answer
              </label>
              {optionIndex > 0 && (
                <button
                  type="button"
                  onClick={() => removeOption(questionIndex, optionIndex)}
                >
                  Remove Option
                </button>
              )}
            </div>
          ))}

          <div>
            <button
              type="button "
              id="add_button"
              onClick={() => addOption(questionIndex)}
            >
              Add Option
            </button>
            <button
              type="button "
              id="remove_button"
              onClick={() => removeQuestion(questionIndex)}
            >
              Remove Question
            </button>
          </div>
        </div>
      ))}

      <div>
        <button type="button" id="question_button" onClick={addQuestion}>
          Add Question
        </button>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default QuizCreationForm;
