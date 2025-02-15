import React, { useState, useRef } from "react";
import "../styles/ProjectCard.css";

const ProjectCard = ({ title, description }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverTimeout = useRef(null);

    const handleMouseEnter = () => {
        hoverTimeout.current = setTimeout(() => {
            setIsHovered(true);
        }, 12);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout.current);
        setIsHovered(false);
    };

    return (
        <div className="project-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={`project-title-bar ${isHovered ? "collapsed" : ""}`}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>

            <div className={`project-content ${isHovered ? "expanded" : ""}`}>
            </div>

        </div>
    )
}

export default ProjectCard;