import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.css";
import BudgetLogo from "../assets/images/budgety.png";

const Header = () => {
  return (
    <header>
      <img alt="budgety logo" className="header-logo" src={BudgetLogo}></img>
      <nav className="nav">
        <ul>
          <li className="nav-link">
            <NavLink to="/">Home</NavLink>
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
