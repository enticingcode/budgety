import React from "react";
import { auth } from "./FirebaseAuth";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState({ value: "" });
  const [emailSent, setEmailSent] = React.useState(false);

  function handleChange(e) {
    let emailValue = e.target.value;
    setEmail((prev) => {
      return {
        ...prev,
        value: emailValue,
      };
    });
  }

  function handlePasswordReset(e) {
    e.preventDefault();
    sendPasswordResetEmail(auth, email.value)
      .then(() => {
        //password email sent
        setEmailSent(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div className="d-flex justify-content-center flex-column align-items-center h-75">
      {emailSent && (
        <p className="text-success text-center">
          Reset link sent. <br /> Please check junk folder if not in inbox.
        </p>
      )}
      <form className="d-flex justify-content-center align-items-center flex-column pw-reset h-50">
        <label htmlFor="email">Reset your password</label>
        <input type="email" onChange={handleChange} placeholder="Email"></input>
        <button
          id="email"
          name="email"
          onClick={handlePasswordReset}
          className="btn btn-success"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
