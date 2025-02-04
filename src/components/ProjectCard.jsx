import React, { useState } from "react";
import "./ProjectCard.css";

const ProjectCard = ({ title, description }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className={`project-card ${isHovered ? "expanded" : ""}`}
            onMouseEnter={() => { setIsHovered(true); console.log("hovered") }}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`hover-content ${isHovered ? "fade-out" : "fade-in"}`}>
                <h3>{title}</h3>
            </div>
            <div className={`card-content ${isHovered ? "fade-in" : "fade-out"}`}>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default ProjectCard;