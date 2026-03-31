import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import './Projects.css';
import grillImage from './grill.png';
import salonImage from './salon hair.png';
import yogurtImage from './mlky.png';

const Projects = () => {
    const [projects, setProjects] = useState([
        { id: 1, name: "Djima's Grill", description: 'Restaurant branding covering food-first style.', image: grillImage },
        { id: 2, name: "Degeners Hair Salon", description: 'Beauty brand design for a high-end salon.', image: salonImage },
        { id: 3, name: "Onam's Design Liquid Yogurt", description: 'Creative drink packaging design.', image: yogurtImage }
    ]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageData, setImageData] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem('projects'));
        if (storedProjects) {
            setProjects(storedProjects);
        }
    }, []);

    const saveProjects = (updatedProjects) => {
        setProjects(updatedProjects);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
    };

    const addProject = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setErrorMessage('Project name is required.');
            return;
        }

        const image = imageData || yogurtImage;

        const newProject = {
            id: Date.now(),
            name: name.trim(),
            description: description.trim() || 'No description provided yet.',
            image,
        };

        const updatedProjects = [...projects, newProject];
        saveProjects(updatedProjects);

        setName('');
        setDescription('');
        setImageData('');
        setErrorMessage('');
    };

    const deleteProject = (id) => {
        const updatedProjects = projects.filter(project => project.id !== id);
        saveProjects(updatedProjects);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setImageData('');
            return;
        }

        if (!file.type.startsWith('image/')) {
            setErrorMessage('Please upload a valid image file.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImageData(reader.result);
            setErrorMessage('');
        };
        reader.readAsDataURL(file);
    };

    return (
        <section className="projects-section" id="projects">
            <h1 className="heading-1">Projects</h1>

            <form className="project-form" onSubmit={addProject}>
                <div className="form-group">
                    <label htmlFor="name">Project Name</label>
                    <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter project title"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Short project description"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Project Image</label>
                    <input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
                </div>

                {imageData && (
                    <div className="preview-wrapper">
                        <span>Preview</span>
                        <img className="project-image" src={imageData} alt="Preview" />
                    </div>
                )}

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button className="add-button" type="submit">Add Project</button>
            </form>

            <div className="project-list">
                {projects.length === 0 ? (
                    <p>No projects yet. Add one with the form above.</p>
                ) : projects.map(project => (
                    <ProjectCard key={project.id} project={project} onDelete={deleteProject} />
                ))}
            </div>
        </section>
    );
};

export default Projects;