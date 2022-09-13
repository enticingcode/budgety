import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import Header from "./components/Header";
import About from "./components/About";
import Login from "./components/Login";
import TestSession from "./components/TestSession";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import ReqAuth from "./components/ReqAuth";
import { useAuth } from "./components/auth";

const RouteSwitch = () => {
  const localAuth = useAuth();
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={localAuth.user ? <Dashboard /> : <HomePage />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/testSession" element={<TestSession />} />

          {/* Auth required paths */}
          <Route
            path="/dashboard"
            element={
              <ReqAuth>
                <Dashboard />
              </ReqAuth>
            }
          />

          {/* 404 PATH */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteSwitch;
