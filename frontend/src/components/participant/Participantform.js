import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ParticipantForm = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://quizapp-backend-ayush.onrender.com/api/Participent/createParticipant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );
      const json = await response.json();
      // console.log(json);
      if (json) {
        navigate(`quiz`);
      } else {
        console.log("error");
        // const id=req.params.quizId;
        // navigate(`/participant/${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Participant Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            style={{
              width: "100%",
              padding: "5px",
              border: "1px solid #ccc",
              "border-radius": "6px",
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ParticipantForm;
