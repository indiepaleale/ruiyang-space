import React, { useState } from "react";
import "../styles/ProjectCard.css";

const ProjectCard = ({ title, description }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="project-card">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )
}

export default ProjectCard;