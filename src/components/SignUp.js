import React, { useContext } from "react";
import { auth } from "./FirebaseAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { connectUserNameAcc } from "./FirebaseAuth";
import { getPersonName } from "./FirebaseAuth";
import { AuthContext } from "./auth";

const SignUp = () => {
  const navigate = useNavigate();
  const localAuth = useContext(AuthContext);
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

        localAuth.setUser(user);
        let userName = getPersonName(user);
        return userName;
      })
      .then((name) => {
        // then redirect to dash
        localAuth.setPersonName(name);
        localStorage.setItem("username", name);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
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
    <div className="login-page h-100 d-flex">
      <section className="login-design d-flex justify-content-center align-items-center flex-column container bg-greenery">
        <div className="login-txt-div">
          <h2>Welcome to Budgety</h2>
          <p>Your personal budgeting resource</p>
        </div>
      </section>

      <section className="credentials-wrapper d-flex flex-column justify-content-center align-items-center container">
        <h3>Sign up for Budgety</h3>

        <form className="form-container d-flex flex-column m-1">
          <label htmlFor="name"></label>
          <input
            className="my-2"
            placeholder="Name"
            onChange={handleChange}
            id="name"
            name="name"
            type="text"
          ></input>

          <label htmlFor="email"></label>
          <input
            className="my-2"
            placeholder="Email"
            onChange={handleChange}
            id="email"
            name="email"
            type="email"
          ></input>

          <label htmlFor="password"></label>
          <input
            className="my-2"
            placeholder="Password"
            onChange={handleChange}
            id="password"
            name="password"
            type="password"
          ></input>
          <label htmlFor="confirmPassword"></label>
          <input
            className="my-2"
            placeholder="Confirm Password"
            onChange={handleChange}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
          ></input>
          <button className="btn btn-success" onClick={submitSignup}>
            Sign Up
          </button>
        </form>

        <div className="login-white">
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
