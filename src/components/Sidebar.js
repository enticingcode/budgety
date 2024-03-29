import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BudgetLogo from "../assets/images/budgety.png";
import "../styles/sidebar.css"
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";


const Sidebar = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  function logout(e) {
    e.preventDefault();
    signOut(auth).then(() => {
      //sign-out
      console.log('signout successful');
      navigate("/");
    }).catch((error) => {
      // error
      console.log(error);
    })
  };

  return (
      
        <nav className="sidebar navbar navbar-expand-lg align-items-start">
          <div className="container-fluid flex-column sidebar-nav">
            <a className="navbar-brand" to="/">
              <img
                alt="budgety logo"
                width="50px"
                src={BudgetLogo}
              ></img>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-dark navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav nav-list flex-column">
                <li className="nav-item">
                  <NavLink className="nav-link fs-4" to="/">
                    <span data-bs-toggle="collapse" data-bs-target="#navbarToggler">
                      Dashboard
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link fs-4" to="/satistics">
                    <span data-bs-toggle="collapse" data-bs-target="#navbarToggler">
                      Statistics
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link fs-4" to="/news">
                    <span
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarToggler"
                    >
                      News
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item">
                    <span
                    onClick={logout}
                    className="nav-link logout-btn"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarToggler"
                    >
                      Logout
                    </span>
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