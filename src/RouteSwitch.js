import React from 'react';
import './styles/reset.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Header from './components/Header';
import About from './components/About';
import Login from './components/Login';
import TestSession from './components/TestSession';
import SignUp from './components/SignUp';

import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import ReqAuth from './components/ReqAuth';

const RouteSwitch = () => {
    return (
        <>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/login' element={
                        <ReqAuth>
                            <Login />
                        </ReqAuth>} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/testSession' element={<TestSession />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>

            </BrowserRouter>
        </>
    );
};

export default RouteSwitch;