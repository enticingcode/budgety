import React from "react";
import { Link } from "react-router-dom";
import icon from "./assets/images/budgeticon.png";
import budge1 from "./assets/images/budge1.png";

function HomePage() {
  return (
    <div className=" text-black">
      <div className=" container-fluid d-flex bg-tan m-0 p-4 align-items-center justify-content-evenly">
        <div>
          <img className="img-fluid" alt="budgeting clipart" src={budge1}></img>
        </div>
        <span className="text-center">
          <h1 className="">Feeling Budgety?</h1>
          <Link className="" to="/testSession">
            Try a Preview!
          </Link>
        </span>
      </div>

      <section className="d-flex flex-column py-5 text-center align-items-center container-fluid bg-white">
        <h2>Start Budgeting today with Budgety!</h2>
        <p>Your solution to every day budgeting needs!</p>
        <p>
          Ditch those old pen and paper methods, or don't we also provide an PDF
          capabilities.
        </p>
      </section>

      <div className="container-fluid d-flex p-5 align-items-center px3 bg-bluey justify-content-evenly">
        <div className="me-1">
          <img className="img-fluid mw-25" alt="budget icon" src={icon}></img>
        </div>
        <h2>Coming soon to iOS</h2>
      </div>
    </div>
  );
}

export default HomePage;
