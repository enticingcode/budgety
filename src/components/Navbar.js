// import React from "react";
// import { NavLink } from "react-router-dom";
// import BudgetLogo from "../assets/images/budgety.png";
// import { useAuth } from "./auth";

// const Header = () => {
//   const localAuth = useAuth();

//   function logout(e) {
//     e.preventDefault();
//     localStorage.removeItem("user");
//     localAuth.setUser(null);
//   }

//   console.log('hi');

//   return (
//     <div>
//     {localAuth.user && (
//         <nav className="navbar navbar-expand-lg shadow">
//           <div className="container-fluid">

//             <NavLink className="navbar-brand" to="/">
//               <img
//                 alt="budgety logo"
//                 width="50px"
//                 className=""
//                 src={BudgetLogo}
//               ></img>
//             </NavLink>
            
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarSupportedContent"
//               aria-controls="navbarSupportedContent"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>

//             <div className="collapse navbar-collapse" id="navbarSupportedContent">

//               <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center align-items-center ">

//                 <li className="nav-item">
//                   <NavLink className="nav-link fs-4" to="/">
//                     <span data-bs-toggle="collapse" data-bs-target="#navbarToggler">
//                       Home
//                     </span>
//                   </NavLink>
//                 </li>

//                 <li className="nav-item">
//                   <NavLink className="nav-link fs-4" to="/weekly-forecasts">
//                     <span
//                       data-bs-toggle="collapse"
//                       data-bs-target="#navbarToggler"
//                     >
//                       News
//                     </span>
//                   </NavLink>
//                 </li>

//                 <li className="nav-item">
//                   <button
//                     className="nav-link bg-transparent border-0  fs-4"
//                     onClick={logout}
//                   >
//                     <span
//                       data-bs-toggle="collapse"
//                       data-bs-target="#navbarToggler"
//                     >
//                       Logout
//                     </span>
//                   </button>
//                 </li>

//               </ul>
//             </div>
//           </div>
//         </nav>
//       )}
//       </div>
//   )
// }

// export default Header;


// {/* {!localAuth.user && (
//               <>
//                 <li className="nav-item">
//                   <NavLink className="nav-link fs-4" to="/login">
//                     <span
//                       data-bs-toggle="collapse"
//                       data-bs-target="#navbarToggler"
//                     >
//                       Login
//                     </span>
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link fs-4" to="/signup">
//                     <span
//                       data-bs-toggle="collapse"
//                       data-bs-target="#navbarToggler"
//                     >
//                       Signup
//                     </span>
//                   </NavLink>
//                 </li>
//               </>
//             )} */}