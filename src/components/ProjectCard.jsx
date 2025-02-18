import React, { useState, useRef, useEffect } from "react";
import { Link, useParams, Outlet, useOutletContext } from "react-router-dom";
import { motion } from "motion/react";
import "../styles/ProjectCard.css";

const ProjectCard = ({ project, expanded }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverTimeout = useRef(null);
    const previewRef = useRef(null);

    const handleMouseEnter = () => {
        hoverTimeout.current = setTimeout(() => {
            setIsHovered(true);
        }, 12);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout.current);
        setIsHovered(false);
    };

    useEffect(() => {
        if (expanded) {
            handleMouseLeave();
        }
    }, [expanded]);

    return (
        <div className="project-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link to={project.projectID} className="project-header">
                <div className={`project-title-bar ${isHovered ? "collapsed" : ""}`}>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                </div>
                <div className={`project-title-bar link ${!isHovered ? "collapsed" : ""}`}>
                    <h2>Read More</h2>
                </div>
            </Link>

            <motion.div
                className={`project-preview ${isHovered ? "hovered" : ""}`}
                ref={previewRef}
            >
            </motion.div>
            {expanded && <Outlet context={{ bounds: previewRef.current?.getBoundingClientRect() }} />}
        </div>
    )
}

const ProjectOverlay = () => {
    const { project } = useParams();
    const { bounds } = useOutletContext();
    console.log(bounds);

    return (
        <motion.div
            initial={bounds ?
                { left: bounds.left, right: bounds.right, width: bounds.right - bounds.left } :
                { left: "-3px", right: 0, width: "100vw" }}
            animate={{ left: "-3px", right: 0, width: "100vw" }}
            transition={{ duration: 0.3 }}
            className="project-overlay"
        >
            {project}
        </motion.div>
    )
};

export { ProjectCard, ProjectOverlay };