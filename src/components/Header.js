import React from "react";
import { NavLink } from "react-router-dom";
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
    <header className="d-flex container-fluid justify-content-between align-items-center p-3 shadow">
      <div className="mw-25">
        <img
          alt="budgety logo"
          width="50px"
          className=""
          src={BudgetLogo}
        ></img>
      </div>

      <nav className="navbar navbar-expand-lg">
        <ul className="navbar-nav align-items-center">
          <li className="nav-item">
            <NavLink className="nav-link fs-4" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fs-4" to="/tracker">
              Tracker
            </NavLink>
          </li>
          {!localAuth.user && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link fs-4" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fs-4" to="/signup">
                  Signup
                </NavLink>
              </li>
            </>
          )}

          {localAuth.user && (
            <li>
              <button className="bg-transparent border-0" onClick={logout}>
                <img width="40px" alt="logout button" src={signoutSVG} />
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
