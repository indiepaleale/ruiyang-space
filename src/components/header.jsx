import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ location }) => {
    return (
        <header className="header-nav">

            <nav className='nav'>
                <div className='logo'>Logo</div>
                <HeaderItem
                    path="/"
                    currentPath={location.pathname}
                >
                    Home
                </HeaderItem>
                <HeaderItem
                    path="/Project"
                    currentPath={location.pathname}
                >
                    Project
                </HeaderItem>
                <HeaderItem
                    path="/About"
                    currentPath={location.pathname}
                >
                    About
                </HeaderItem>

            </nav>
        </header>
    );
}

export default Header;

const HeaderItem = ({ children, currentPath, path }) => {
    const [isHovered, setIsHovered] = useState();
    return (
        <Link to={path} className={`header-item ${isHovered ? 'hovered' : ''} ${currentPath === path ? 'active' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </Link>
    );
}