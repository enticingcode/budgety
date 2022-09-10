import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.css";
import BudgetLogo from "../assets/images/budgety.png";
import { useAuth } from "./auth";
import signoutSVG from "../assets/images/logout.svg";

const Header = () => {
  const localAuth = useAuth();

  function logout(e) {
    e.preventDefault();
    localStorage.removeItem("user");
    localAuth.setUser(null);
  }

  return (
    <header>
      <img alt="budgety logo" className="header-logo" src={BudgetLogo}></img>
      <nav className="nav">
        <ul>
          <li className="nav-link">
            <NavLink to="/">Home</NavLink>
          </li>
          {!localAuth.user && (
            <>
              <li className="nav-link">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </>
          )}

          {localAuth.user && (
            <li>
              <button className="logoutbtn" onClick={logout}>
                <img src={signoutSVG} />
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
