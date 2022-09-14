import React from "react";
import { Link } from "react-router-dom";
import icon from "./assets/images/budgeticon.png";
import budge1 from "./assets/images/budge1.png";

function HomePage() {
  return (
    <div className="container bg-tan text-white">
      <div className="container d-flex align-items-center">
        <img alt="budgeting clipart" src={budge1}></img>
        <span className="ms-5">
          <h1 className="">Feeling Budgety?</h1>
          <Link className="" to="/testSession">
            Try a Preview!
          </Link>
        </span>
      </div>

      <section className="">
        <h2>Start Budgeting today with Budgety!</h2>
        <hr />
        <p>Your solution to every day budgeting needs!</p>
        <hr />
        <p>
          Ditch those old pen and paper methods, or don't we also provide an PDF
          capabilities.
        </p>
      </section>

      <div className=" ">
        <img className="" alt="budget icon" src={icon}></img>
        <h2 className="">Coming soon to iOS</h2>

        <section className="">
          <p>Copyright @ MT</p>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
