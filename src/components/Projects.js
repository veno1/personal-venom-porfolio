import React, { useState, useEffect } from 'react';
import './Projects.css';
import grillImage from './grill.png';
import salonImage from './salon hair.png';
import yogurtImage from './mlky.png';

const Projects = () => {
    const [projects] = useState([
        { 
            id: 1, 
            name: "Djima's Grill", 
            description: 'Restaurant branding covering food-first style with bold, appetizing visuals.', 
            image: grillImage 
        },
        { 
            id: 2, 
            name: "Degeners Hair Salon", 
            description: 'Beauty brand design for a high-end salon featuring elegant styling.', 
            image: salonImage 
        },
        { 
            id: 3, 
            name: "Onam's Design Liquid Yogurt", 
            description: 'Creative drink packaging design with modern, refreshing aesthetics.', 
            image: yogurtImage 
        }
    ]);

    return (
        <section className="projects-section" id="projects">
            <div className="section-header">
                <h1 className="heading-1">Projects</h1>
                <div className="header-accent"></div>
            </div>

            <div className="project-grid">
                {projects.map(project => (
                    <div key={project.id} className="project-card">
                        <div className="project-image-wrapper">
                            <img 
                                src={project.image} 
                                alt={project.name}
                                className="project-image"
                                loading="lazy"
                            />
                        </div>
                        <div className="project-content">
                            <h3 className="project-title">{project.name}</h3>
                            <p className="project-description">{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
