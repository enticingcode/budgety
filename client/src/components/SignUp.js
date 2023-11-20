import React, { useContext } from "react";
import { auth } from "../authFiles/FirebaseAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { connectUserNameAcc } from "../authFiles/FirebaseAuth";
import { getPersonName } from "../authFiles/FirebaseAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = React.useState({
    name: "",
    email: "",
    password: "",
  });


  function submitSignup(e) {
    e.preventDefault();
    let user;
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then((userCredential) => {
        // Signed in
        // get userID and also upload name to firestore
        user = userCredential.user.uid;
        connectUserNameAcc(credentials.name, user);
        // set active user, get name to display on dash

        let userName = getPersonName(user);
        return userName;
      })
      .then((name) => {
        // then redirect to dash
        localStorage.setItem("name", name);
        navigate("/");
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
      <div className="login-bg-blur"></div>
      <div className="form-container">
      <h3>Sign up for Budgety</h3>

        <form>
          <label htmlFor="name"></label>
          <input
            className="login-input my-2"
            placeholder="Name"
            onChange={handleChange}
            id="name"
            name="name"
            type="text"
          ></input>

          <label htmlFor="email"></label>
          <input
            className="login-input my-2"
            placeholder="Email"
            onChange={handleChange}
            id="email"
            name="email"
            type="email"
          ></input>

          <label htmlFor="password"></label>
          <input
            className="login-input my-2"
            placeholder="Password"
            onChange={handleChange}
            id="password"
            name="password"
            type="password"
          ></input>
          <label htmlFor="confirmPassword"></label>
          <input
            className="login-input my-2"
            placeholder="Confirm Password"
            onChange={handleChange}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
          ></input>
          <button className="landingpage-btn" onClick={submitSignup}>
            Sign Up
          </button>
        </form>
        <div className="text-center mt-3">
          <p>Already a member? <br/><Link to="/">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
