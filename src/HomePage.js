import "./App.css";
import React from "react";
import { Link } from "react-router-dom";
import icon from "./assets/images/budgeticon.png";
import budge1 from "./assets/images/budge1.png";

function HomePage() {
  return (
    <div className="home-container parallax-wrapper">
      <div className="parallax">
        <img alt="budget style icon" src={budge1}></img>
        <div className="background bg-1test"></div>
        <span className="title-container">
          <h1 className="title">Feeling Budgety?</h1>
          <Link className="preview-link" to="/testSession">
            Try a Preview!
          </Link>
        </span>
      </div>

      <section className="bg-divider">
        <h2>Start Budgeting today with Budgety!</h2>
        <hr />
        <p>Your solution to every day budgeting needs!</p>
        <hr />
        <p>
          Ditch those old pen and paper methods, or don't we also provide an PDF
          capabilities.
        </p>
      </section>

      <div className="background bg-2">
        <img className="hp-icon1" alt="budget icon" src={icon}></img>
        <h2 className="hp-icon1-text">Coming soon to iOS</h2>

        <section className="hp-footer">
          <p>Copyright @ MT</p>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
