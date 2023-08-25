import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, browserLocalPersistence, setPersistence } from "firebase/auth";
import { auth } from "../authFiles/FirebaseAuth";
import "../styles/landingPage.css";
import budgetyLogo from "../assets/images/budgety.png";
import visibilityOff from "../assets/images/visibility-off.png";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const [isPWVisible, setIsPWVisible] = React.useState(false);


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


  function handlePasswordVis() {
    // e.preventDefault();
    setIsPWVisible(prev => !prev);
  }

  function handleLogin(e) {
    e.preventDefault();
    setPersistence(auth, browserLocalPersistence).then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    }).then(() => {
      navigate("/");
    })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <div className="login-page">
      <section className="info-banner">
          <div className="web-title">
            <img width="50" height="50" src={budgetyLogo}></img>
            <h1>Budgety</h1>
        </div>
        <h2><span style={{ color: "#31b099" }}>Personalized budgeting application</span> to track all your financial needs.</h2>
      </section>
      <section className="login-section">
        <div className="form-container">
          <h3>Login to Begin Budgeting</h3>
          <form>
            <label htmlFor="email">Email</label>
            <input
              className="login-input my-2"
              placeholder="savings@budgety.com"
              onChange={handleChange}
              id="email"
              name="email"
              type="email"
            ></input>
            <label htmlFor="password">Password</label>
            <div className="pw-field">
            <input
              className="login-input my-2"
              placeholder="*****"
              onChange={handleChange}
              id="password"
              name="password"
              type={`${!isPWVisible ? "password": "text"}`}
            ></input>
            <i className={`${isPWVisible ? "bi bi-eye-slash": "bi-eye"} visible-toggle`} id="togglePassword" onClick={handlePasswordVis}></i>
            </div>
            
            <div className="login-options">
              {/* <span>
                <label htmlFor="remember-me">Remember me</label>
                <input name="remember-me" type="checkbox"></input>
              </span> */}
              <Link to="/password-reset">Forgot your password?</Link></div>


            <button className="landingpage-btn" onClick={handleLogin}>
              Login
            </button>
          </form>
          <div className="text-center">
            <p className="mt-4 mb-1">New Here?<br /><Link to="/signup">Sign up for an account today!</Link></p>
          </div>
        </div>
      </section>



    </div>
  );
};

export default Login;
