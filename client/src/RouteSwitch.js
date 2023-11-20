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

  // Auth appears null, then renders dashboard, then fills in user and re-renders dashboard.
  // Auth.user not being taken in as props on dashboard for some reason.
  
  const user = useAuth().user;

  const isModalActive = useSelector((state) => state.modal);
  // console.log(isModalActive);

  // Since I have two instances of dashboard route, it causes a bug where I'm,
  // rendering one or the other, need to delete one/consolidate
  
  return (
    <>
       {user && <Sidebar />}
       {/* INCOME-EXPENSE MODULE */}
      {isModalActive.isActive && (<InputModal category={isModalActive.category} />)}
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard auth={user}/> : <Login />}
          />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/password-reset" element={<ForgotPassword />} />

          {/* Auth required paths */}
          {/* <Route
            path="/dashboard"
            element={
              <ReqAuth>
                <Dashboard auth={user} />
              </ReqAuth>
            }
          /> */}
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
