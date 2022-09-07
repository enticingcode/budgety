import React from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

const SignUp = () => {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

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

  function handleLogin(e) {
    e.preventDefault();
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
          <button className="loginbtn btn" onClick={handleLogin}>
            Sign Up
          </button>
        </form>

        <div>
          <p>
            New Here?
            <Link to="/signup"> Sign up for an account today!</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
