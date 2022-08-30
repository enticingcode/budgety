import React from 'react';
import './styles/reset.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Header from './components/Header';
import About from './components/About';
import Login from './components/Login';
import TestSession from './components/TestSession';

const RouteSwitch = () => {
    return (
        <>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/testSession' element={<TestSession />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default RouteSwitch;