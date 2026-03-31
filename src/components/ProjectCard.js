import React from 'react';

const ProjectCard = ({ project, onDelete }) => {
    const handleDelete = () => {
        onDelete(project.id);
    };

    return (
        <div className="project-card">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default ProjectCard;