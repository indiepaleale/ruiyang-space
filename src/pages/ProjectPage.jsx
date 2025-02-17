import React from "react";
import PanelAnimatedBox from "../components/PanelAnimatedBox";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";
import { useLocation } from "react-router-dom";
import "../styles/ProjectPage.css";

const ProjectPage = () => {
    const location = useLocation();
    return (
        <PanelAnimatedBox>
            <div className="project-page">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.index}
                        path={project.path}
                        title={project.title}
                        description={project.description} 
                        expanded={location.pathname === project.path}
                        />
                ))}

            </div>
        </PanelAnimatedBox>
    );
};

export default ProjectPage;