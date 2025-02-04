import React from 'react';
import ProjectCard from '../components/ProjectCard';

const projects = [
  {
    title: 'Project 1',
    description: 'Description for project 1',
  },
  {
    title: 'Project 2',
    description: 'Description for project 2',
  },
  // Add more projects as needed
];

export default function LandingPage (){
  return (
    <div className="landing-page">
      <div className="projects">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
          />
        ))}
      </div>
    </div>
  );
};
