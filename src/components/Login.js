import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseAuth";
import { getPersonName } from "./FirebaseAuth";
import { AuthContext } from "./auth";

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
        localAuth.setPersonName(name);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div className="login-page  d-flex">
      <section className="login-design  d-flex flex-column  container">
        <div>
          <h2>Welcome to Budgety</h2>
          <p>Your personal budgeting resource</p>
        </div>
      </section>

      <section className="credentials-wrapper d-flex flex-column container">
        <h3>Login to Budgety</h3>
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
          <button className="loginbtn btn" onClick={handleLogin}>
            Login
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

export default Login;
