import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, browserLocalPersistence, setPersistence } from "firebase/auth";
import { auth } from "../authFiles/FirebaseAuth";
import "../styles/landingPage.css";

const Login = () => {
  const navigate = useNavigate();

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

    // signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    //   .then((userCredential) => {
    //     const user = userCredential.user.uid;
    //     // auth.setUser(user);
    //     navigate("/dashboard");
    //     return user;
    //     // Signed in
    //   })
    //   .then((user) => {
    //     let name = getPersonName(user);
    //     return name;
    //   })
    //   .then((name) => {
    //     localStorage.setItem("username", name);
    //     console.log(auth.currentUser);

    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     alert(errorCode, errorMessage);
    //     console.log(errorCode, errorMessage);
    //   });
  }

  return (
    <div className="login-page">
      <section className="info-banner">
        <div>
        <h1>Budgety</h1>
        <p><span style={{color: "#31b099"}}>Personalized budgeting application</span> to track all your financial needs.</p>
        </div>
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
            <input
              className="login-input my-2"
              placeholder="*****"
              onChange={handleChange}
              id="password"
              name="password"
              type="password"
            ></input>
            <div className="login-options">
            <span>
            <label htmlFor="remember-me">Remember me</label>
            <input name="remember-me" type="checkbox"></input>
            </span>
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
