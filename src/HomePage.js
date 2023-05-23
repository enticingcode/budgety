import React from "react";
import { Link } from "react-router-dom";
import "./styles/landingPage.css"

function LandingPage() {
  return (
    <div className="landing-pg">
      {/* Main Page */}
      <div className="main-pg">
        <h1 className="heading">Budgety</h1>
        <div className="landingLinks">
          <Link to="/login">Login</Link>
          <Link to="signup">Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
