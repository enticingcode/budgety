import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import BudgetLogo from "../assets/images/budgety.png";

const Header = () => {
  return (
    <header>
      <img alt="budgety logo" className="header-logo" src={BudgetLogo}></img>
      <nav className="nav">
        <ul>
          <li className="nav-link">
<<<<<<< HEAD
            <NavLink to="/">Home</NavLink>
=======
            <Link to="/">Home</Link>
            {/* <a href="/">Home</a> */}
>>>>>>> 263fe51 (commit for merge)
          </li>
          {/* <li className="nav-link">
            <a href="/about">About</a>
          </li> */}
          <li className="nav-link">
            <NavLink to="/login">Login</NavLink>
          </li>
          <li className="nav-link">
            <NavLink to="/signup">Signup</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
