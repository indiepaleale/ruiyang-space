import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ location }) => {
    return (
        <header className="header-nav">
            <div className='logo'>Logo</div>
            <nav className='header-nav'>
                <HeaderItem
                    path="/"
                    currentPath={location.pathname}
                >
                    Home
                </HeaderItem>
                <HeaderItem
                    path="/projects"
                    currentPath={location.pathname}
                >
                    Project
                </HeaderItem>
                <HeaderItem
                    path="/about"
                    currentPath={location.pathname}
                >
                    About
                </HeaderItem>

            </nav>
        </header>
    );
}

export default Header;

const HeaderItem = ({ children, path }) => {
    const [isHovered, setIsHovered] = useState();
    return (
        <NavLink
            to={path}
            className={`header-item ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </NavLink>
    );
}