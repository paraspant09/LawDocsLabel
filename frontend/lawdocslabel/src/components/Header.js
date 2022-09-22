import React from 'react'
import { NavLink } from 'react-router-dom';
import './Header.css'

function Header() {
  return (
    <header>
        <div className='navbar'>
            <div className='logo'>
                <NavLink to="/"> Law-Docs-Label </NavLink>
            </div>
            <div>
                <NavLink className='header-link' to="/dashboard">  Dashboard </NavLink>
                <NavLink className='header-link' to="/about">  About </NavLink>
                <NavLink className='header-link' to="/contact"> Contact Us </NavLink>
                <NavLink className='header-link' to="/signin"> Sign In </NavLink>
            </div>
        </div>
    </header>
  )
}

export default Header