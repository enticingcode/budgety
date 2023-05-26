import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseAuth";
import { getPersonName } from "./FirebaseAuth";
import { AuthContext } from "./auth";
import "../styles/landingPage.css";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const localAuth = useContext(AuthContext);

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
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user.uid;
        localAuth.setUser(user);
        navigate("/dashboard");
        return user;
        // Signed in
      })
      .then((user) => {
        JSON.stringify(localStorage.setItem("user", user));
        let name = getPersonName(user);
        return name;
      })
      .then((name) => {
        localStorage.setItem("username", name);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div className="login-page">
      <div className="login-bg-blur"></div>
      <div className="form-container">
        <h3>Login to Budgety</h3>
        <form>
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
          <Link to="/password-reset">Forgot your password?</Link>

          <button className="btn" onClick={handleLogin}>
            Login
          </button>
        </form>
        <div className="text-center">
          <p className="mt-4 mb-1">New Here?<br /><Link to="/signup">Sign up for an account today!</Link></p>
        </div>
      </div>


    </div>
  );
};

export default Login;
