import React from 'react';

const ProjectCard = ({ project, onDelete }) => {
    const handleDelete = () => {
        onDelete(project.id);
    };

    return (
        <div className="project-card">
            {project.image && (
                <img
                    className="project-image"
                    src={project.image}
                    alt={project.name}
                />
            )}
            <div className="project-card-content">
                <h2 className="project-title">{project.name}</h2>
                <p>{project.description || 'No description provided.'}</p>
                <button className="delete-button" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default ProjectCard;