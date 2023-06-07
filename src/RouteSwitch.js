import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import ReqAuth from "./authFiles/ReqAuth";
import MonthlyTracker from "./components/MonthlyTracker";
import ForgotPassword from "./components/ForgotPassword";
import WeeklyForecasts from "./components/WeeklyForecasts";
import Sidebar from "./components/Sidebar";
import ViewAll from "./ViewAll";
import { useSelector } from "react-redux";
import InputModal from "./components/InputModal";
import { useAuth } from "./authFiles/auth";


const RouteSwitch = () => {
  const user = useAuth().user;
  console.log(user);
  
  const isModalActive = useSelector((state) => state.modal.isActive);
  // const isModalActive = false;

  return (
    <>
       {user && <Sidebar />}
       {/* INCOME-EXPENSE MODULE */}
      {isModalActive && (<InputModal />)}
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard /> : <Login />}
          />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/password-reset" element={<ForgotPassword />} />

          {/* Auth required paths */}
          <Route
            path="/dashboard"
            element={
              <ReqAuth>
                <Dashboard />
              </ReqAuth>
            }
          />
          <Route
            path="/monthly-tracker"
            element={
              <ReqAuth>
                <MonthlyTracker />
              </ReqAuth>
            }
          />
          <Route path="/viewall/:type" element={<ViewAll />}/>
          <Route path="/weekly-forecasts" element={<WeeklyForecasts />} />

          {/* 404 PATH */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
};

export default RouteSwitch;
