import React from "react";
import PanelAnimatedBox from "../components/PanelAnimatedBox";
import { ProjectCard } from "../components/ProjectCard";
import projects from "../data/projects";
import { Outlet, useLocation } from "react-router-dom";
import "../styles/ProjectPage.css";

const ProjectPage = () => {
    const location = useLocation();
    return (
        <div className="project-page">
            <PanelAnimatedBox>
                {projects.map((project) => (
                    <ProjectCard
                        key={project.projectID}
                        project={project}
                        expanded={project.projectID === location.pathname.split("/")[2]}
                    />
                ))}
            </PanelAnimatedBox>
            
        </div>
    );
};

export default ProjectPage;