import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

const Projects = () => {
    const [projects, setProjects] = useState([
        { id: 1, name: "Djima's Grill", image: '/images/djimas-grill.jpg' },
        { id: 2, name: "Degeners Hair Salon", image: '/images/degeners-hair-salon.jpg' },
        { id: 3, name: "Onam's Design Liquid Yogurt", image: '/images/onams-yogurt.jpg' }
    ]);

    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem('projects'));
        if (storedProjects) {
            setProjects(storedProjects);
        }
    }, []);

    const addProject = (newProject) => {
        setProjects([...projects, newProject]);
        localStorage.setItem('projects', JSON.stringify([...projects, newProject]));
    };

    const deleteProject = (id) => {
        const updatedProjects = projects.filter(project => project.id !== id);
        setProjects(updatedProjects);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
    };

    return (
        <div>
            <h1>Projects</h1>
            <div className="project-list">{projects.map(project => (
                <ProjectCard key={project.id} project={project} onDelete={deleteProject} />
            ))}</div>
            <button onClick={() => addProject({ id: Date.now(), name: 'New Project', image: '/images/new-project.jpg' })}>Add Project</button>
        </div>
    );
};

export default Projects;