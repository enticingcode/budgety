import React from "react";
import { auth } from "./FirebaseAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import "../styles/Login.css";

const SignUp = () => {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  function submitSignup(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        //
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    setCredentials((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  return (
    <div className="login-page">
      <section className="login-design">
        <div>
          <h2>Welcome to Budgety</h2>
          <p>Your personal budgeting resource</p>
        </div>
      </section>

      <section className="credentials-wrapper">
        <h3>Sign up for Budgety</h3>

        <form className="form-container">
          <label htmlFor="email"></label>
          <input
            className="credentials"
            placeholder="Email"
            onChange={handleChange}
            id="email"
            name="email"
            type="email"
          ></input>

          <label htmlFor="password"></label>
          <input
            className="credentials"
            placeholder="Password"
            onChange={handleChange}
            id="password"
            name="password"
            type="password"
          ></input>
          <label htmlFor="confirmPassword"></label>
          <input
            className="credentials"
            placeholder="Confirm Password"
            onChange={handleChange}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
          ></input>
          <button className="loginbtn btn" onClick={submitSignup}>
            Sign Up
          </button>
        </form>

        <div>
          <p>
            Already a member?
            <Link to="/login"> Login here</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
