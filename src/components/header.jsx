import React, { useState } from 'react';
import '../styles/Header.css';

const Header = ({ items, onSelect, selectedItem }) => {
    return (
        <header className="header-nav">
            <div className='logo'>Logo</div>
            <nav className='nav'>
                {items.map((item, index) => (
                    <HeaderItem
                        key={item.key}
                        onClick={() => onSelect(item.headerItem.toLowerCase())}
                        className={selectedItem === item.headerItem.toLowerCase() ? "active" : ""}
                    >
                        {item.headerItem}
                    </HeaderItem>
                ))}
            </nav>
        </header>
    );
}

export default Header;

const HeaderItem = ({ children, onClick, className }) => {
    const [isHovered, setIsHovered] = useState();
    return (
        <div className={`header-item ${isHovered ? 'hovered' : ''} ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}

        >
            {children}
        </div>
    );
}