import React from "react";
import { auth } from "./FirebaseAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { connectUserNameAcc } from "./FirebaseAuth";

const SignUp = () => {
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
        user = userCredential.user.uid;
        console.log(user);
        connectUserNameAcc(credentials.name, user);
        //
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
  console.log(credentials);

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
        <div>
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
