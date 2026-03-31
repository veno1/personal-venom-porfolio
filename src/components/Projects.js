import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import './Projects.css';
import grillImage from './grill.png';
import salonImage from './salon hair.png';
import yogurtImage from './mlky.png';

const Projects = () => {
    const [projects, setProjects] = useState([
        { 
            id: 1, 
            name: "Djima's Grill", 
            description: 'Restaurant branding covering food-first style.', 
            image: grillImage 
        },
        { 
            id: 2, 
            name: "Degeners Hair Salon", 
            description: 'Beauty brand design for a high-end salon.', 
            image: salonImage 
        },
        { 
            id: 3, 
            name: "Onam's Design Liquid Yogurt", 
            description: 'Creative drink packaging design.', 
            image: yogurtImage 
        }
    ]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageData, setImageData] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [showForm, setShowForm] = useState(false); // Toggle form

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

        const image = imageData || yogurtImage; // Default image if none uploaded

        const newProject = {
            id: Date.now(),
            name: name.trim(),
            description: description.trim() || 'No description provided yet.',
            image,
        };

        const updatedProjects = [...projects, newProject];
        saveProjects(updatedProjects);

        // Reset form
        setName('');
        setDescription('');
        setImageData('');
        setPreviewImage('');
        setErrorMessage('');
        setShowForm(false); // Hide form after adding
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setImageData('');
            setPreviewImage('');
            return;
        }

        if (!file.type.startsWith('image/')) {
            setErrorMessage('Please upload a valid image file.');
            return;
        }

        // Resize image for better performance (optional but recommended)
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 400; // Fixed width for consistency
                canvas.height = (img.height * 400) / img.width;
                
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
                
                setImageData(resizedDataUrl);
                setPreviewImage(resizedDataUrl);
                setErrorMessage('');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    return (
        <section className="projects-section" id="projects">
            <div className="section-header">
                <h1 className="heading-1">Projects</h1>
                <button 
                    className="toggle-form-btn"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? '✕ Hide Form' : '➕ Add New Project'}
                </button>
            </div>

            {showForm && (
                <form className="project-form" onSubmit={addProject}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Project Name *</label>
                            <input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter project title"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Short project description"
                                rows="3"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Project Image</label>
                        <input 
                            id="image" 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                        />
                        {previewImage && (
                            <div className="preview-wrapper">
                                <small>📸 Preview (Click to remove)</small>
                                <img 
                                    className="preview-image" 
                                    src={previewImage} 
                                    alt="Preview"
                                    onClick={() => {
                                        setPreviewImage('');
                                        setImageData('');
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {errorMessage && (
                        <div className="error-message">
                            ⚠️ {errorMessage}
                        </div>
                    )}

                    <div className="form-actions">
                        <button className="add-button" type="submit">
                            ✅ Add Project
                        </button>
                        <button 
                            type="button" 
                            className="cancel-button"
                            onClick={() => {
                                setShowForm(false);
                                setName('');
                                setDescription('');
                                setImageData('');
                                setPreviewImage('');
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="project-grid">
                {projects.length === 0 ? (
                    <div className="empty-state">
                        <p>🎨 No projects yet. Click "Add New Project" to get started!</p>
                    </div>
                ) : (
                    projects.map(project => (
                        <ProjectCard 
                            key={project.id} 
                            project={project} 
                            // onDelete removed - no delete functionality
                        />
                    ))
                )}
            </div>
        </section>
    );
};

export default Projects;
