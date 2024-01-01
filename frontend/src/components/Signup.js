import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    if (password === cpassword) {
      const response = await fetch(
        "https://quizapp-backend-ayush.onrender.com/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showalert(" you logged in successfully", "success");
      } else {
        props.showalert("email is already registered", "danger");
        navigate("/login");
      }
    } else {
      props.showalert("Password are not same", "danger");
      navigate("/signup");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h5>
              <label htmlFor="name" className="form-label">
                Name
              </label>
            </h5>
            <input
              type="name"
              className="form-control"
              id="name"
              name="name"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <h5>
              <label htmlFor="Email" className="form-label">
                email address
              </label>
            </h5>
            <input
              type="email"
              className="form-control"
              id="Email"
              name="email"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <h5>
              {" "}
              <label htmlFor="password" className="form-label">
                Password
              </label>
            </h5>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <h5>
              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>
            </h5>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
