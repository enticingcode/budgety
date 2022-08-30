import React from 'react'
import '../styles/Header.css'
import BudgetLogo from '../assets/images/budgety.png';

const Header = () => {
    return (
        <header>
            <img alt='budgety logo' className='header-logo' src={BudgetLogo}></img>
            <nav className='nav'>
                <ul>
                    <li className='nav-link'><a href='/'>Home</a></li>
                    <li className='nav-link'><a href='/about'>About</a></li>
                    <li className='nav-link'><a href='/login'>Login</a></li>
                    <li className='nav-link'><a href='/testSession'>Test Run</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header