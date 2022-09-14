import React from "react";
import { Link } from "react-router-dom";
import icon from "./assets/images/budgeticon.png";
import budge1 from "./assets/images/budge1.png";

function HomePage() {
  return (
    <div className="container-fluid p-0  text-black">
      <div className="container-fluid d-flex bg-tan p-0 m-0 align-items-center">
        <img alt="budgeting clipart" src={budge1}></img>
        <span className="ms-5">
          <h1 className="">Feeling Budgety?</h1>
          <Link className="" to="/testSession">
            Try a Preview!
          </Link>
        </span>
      </div>

      <section className="container-fluid bg-white">
        <h2>Start Budgeting today with Budgety!</h2>
        <hr />
        <p>Your solution to every day budgeting needs!</p>
        <hr />
        <p>
          Ditch those old pen and paper methods, or don't we also provide an PDF
          capabilities.
        </p>
      </section>

      <div className="container-fluid p-0 bg-primary">
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
