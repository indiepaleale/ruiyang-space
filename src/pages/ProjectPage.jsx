import React from "react";
import PanelAnimatedBox from "../components/PanelAnimatedBox";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";
import "../styles/ProjectPage.css";

console.log('projects', projects);

const ProjectPage = () => {
    return (
        <div className="project-page">
            {projects.map((project) => (
                <ProjectCard key={project.index} title={project.title} description={project.description} />
            ))}
        </div>
    );
};

export default ProjectPage;