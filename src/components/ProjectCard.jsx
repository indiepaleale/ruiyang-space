import React, { useState, useRef } from "react";
import { Link, Routes, Route, useRoutes } from "react-router-dom";
import { motion } from "motion/react";
import "../styles/ProjectCard.css";

const ProjectCard = ({ title, description, path, expanded }) => {
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
            <Link to={path} className="project-header">
                <div className={`project-title-bar ${isHovered ? "collapsed" : ""}`}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                <div className={`project-title-bar link ${!isHovered ? "collapsed" : ""}`}>
                    <h2>Read More</h2>
                </div>
            </Link>


            <motion.div
                className={`project-content ${isHovered ? "hovered" : ""} ${expanded ? "expanded" : ""}`}
            >
                
            </motion.div>

        </div>
    )
}

export default ProjectCard;