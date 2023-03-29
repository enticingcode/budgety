import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./components/Login";
import TestSession from "./components/TestSession";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import ReqAuth from "./components/ReqAuth";
import { useAuth } from "./components/auth";
import MonthlyTracker from "./components/MonthlyTracker";
import ForgotPassword from "./components/ForgotPassword";
import WeeklyForecasts from "./components/WeeklyForecasts";
import Sidebar from "./components/Sidebar";

const RouteSwitch = () => {
  const localAuth = useAuth();
  return (
    <>
       {localAuth.user && <Sidebar />}
      <main className="dashboard">
        <Routes>
          <Route
            path="/"
            element={localAuth.user ? <Dashboard /> : <HomePage />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/testSession" element={<TestSession />} />
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
          <Route path="/weekly-forecasts" element={<WeeklyForecasts />} />

          {/* 404 PATH */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default RouteSwitch;
