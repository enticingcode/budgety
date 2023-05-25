import React from "react";
import { Link } from "react-router-dom";
import "./styles/landingPage.css"

function LandingPage() {
  return (
    <div className="landing-pg">
      {/* Main Page */}
      <div className="main-pg">
        <h1 className="heading">Budgety</h1>
        <div className="login-txt-div text-white">
          <p>Your personal budgeting resource</p>
        </div>
        <div className="landingLinks">
          <Link className="home-links" to="/login">Login</Link>
          <Link className="home-links" to="signup">Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
