import React from "react";
import { NavLink } from "react-router-dom";
import BudgetLogo from "../assets/images/budgety.png";
import { useAuth } from "./auth";

const Sidebar = () => {
  const localAuth = useAuth();

  function logout(e) {
    e.preventDefault();
    localStorage.removeItem("user");
    localAuth.setUser(null);
  }

  return (
      
        <nav className="sidebar navbar navbar-expand-lg align-items-start">
          <div className="container-fluid flex-column px-4">
            <NavLink className="navbar-brand" to="/">
              <img
                alt="budgety logo"
                width="50px"
                className=""
                src={BudgetLogo}
              ></img>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav flex-column">
                <li className="nav-item">
                  <NavLink className="nav-link fs-4" to="/">
                    <span data-bs-toggle="collapse" data-bs-target="#navbarToggler">
                      Dashboard
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link fs-4" to="/weekly-forecasts">
                    <span
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarToggler"
                    >
                      News
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link bg-transparent border-0  fs-4"
                    onClick={logout}
                  >
                    <span
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarToggler"
                    >
                      Logout
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  );
};

export default Sidebar;



// {!localAuth.user && (
//   <>
//     <li className="nav-item">
//       <NavLink className="nav-link fs-4" to="/login">
//         <span
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarToggler"
//         >
//           Login
//         </span>
//       </NavLink>
//     </li>
//     <li className="nav-item">
//       <NavLink className="nav-link fs-4" to="/signup">
//         <span
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarToggler"
//         >
//           Signup
//         </span>
//       </NavLink>
//     </li>
//   </>
// )}