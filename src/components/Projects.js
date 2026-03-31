import React, { useState, useEffect } from 'react';
import './Projects.css';
import grillImage from './grill.png';
import salonImage from './salon hair.png';
import yogurtImage from './mlky.png';

const DEFAULT_PROJECTS = [
    { id: 1, name: "Djima's Grill", description: 'Restaurant branding covering food-first style.', image: grillImage },
    { id: 2, name: "Degeners Hair Salon", description: 'Luxury beauty brand identity.', image: salonImage },
    { id: 3, name: "Onam Yogurt Design", description: 'Creative drink packaging design.', image: yogurtImage }
];

const translations = {
    en: { title: "Projects", add: "Add Project", update: "Update Project", name: "Project Name", desc: "Description", drag: "Drag & Drop Image Here" },
    fr: { title: "Projets", add: "Ajouter un projet", update: "Modifier", name: "Nom du projet", desc: "Description", drag: "Glissez l'image ici" }
};

const Projects = () => {
    const [lang, setLang] = useState("en");
    const t = translations[lang];
    const [isAdmin, setIsAdmin] = useState(false);
    const [projects, setProjects] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // Form States
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageData, setImageData] = useState('');
    const [lightbox, setLightbox] = useState(null);

    useEffect(() => {
        setIsAdmin(window.location.hash === "#admin");
        const stored = JSON.parse(localStorage.getItem('projects'));
        setProjects(stored || DEFAULT_PROJECTS);
    }, []);

    const saveAndSet = (newList) => {
        setProjects(newList);
        localStorage.setItem('projects', JSON.stringify(newList));
    };

    const handleUpload = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setImageData(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProject = { 
            id: editingId || Date.now(), 
            name, 
            description, 
            image: imageData || yogurtImage 
        };

        if (editingId) {
            saveAndSet(projects.map(p => p.id === editingId ? newProject : p));
        } else {
            saveAndSet([...projects, newProject]);
        }
        
        // Reset form
        setName(''); setDescription(''); setImageData(''); setEditingId(null);
    };

    return (
        <section className="projects-section">
            <div className="lang-switch">
                <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang("en")}>EN</button>
                <button className={lang === 'fr' ? 'active' : ''} onClick={() => setLang("fr")}>FR</button>
            </div>

            <h1 className="heading-1">{t.title}</h1>

            {isAdmin && (
                <form className="project-form" onSubmit={handleSubmit}>
                    <input required placeholder={t.name} value={name} onChange={(e) => setName(e.target.value)} />
                    <input required placeholder={t.desc} value={description} onChange={(e) => setDescription(e.target.value)} />
                    <div className="upload-box" 
                         onDrop={(e) => { e.preventDefault(); handleUpload(e.dataTransfer.files[0]); }} 
                         onDragOver={(e) => e.preventDefault()}>
                        {t.drag}
                    </div>
                    <input type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files[0])} />
                    {imageData && <img src={imageData} className="preview-img" alt="preview" />}
                    <button className="add-button" type="submit">{editingId ? t.update : t.add}</button>
                </form>
            )}

            <div className="project-grid">
                {projects.map((p, i) => (
                    <div key={p.id} className="project-card">
                        <img src={p.image} alt={p.name} onClick={() => setLightbox(p.image)} />
                        <div className="project-card-content">
                            <h3>{p.name}</h3>
                            <p>{p.description}</p>
                        </div>
                        {isAdmin && (
                            <div className="admin-controls">
                                <button onClick={() => {
                                    setName(p.name);
                                    setDescription(p.description);
                                    setImageData(p.image);
                                    setEditingId(p.id);
                                    window.scrollTo(0,0);
                                }}>✏️</button>
                                <button onClick={() => {
                                    const arr = [...projects];
                                    if (i > 0) {
                                        [arr[i], arr[i-1]] = [arr[i-1], arr[i]];
                                        saveAndSet(arr);
                                    }
                                }}>↑</button>
                                <button onClick={() => {
                                    const arr = [...projects];
                                    if (i < arr.length - 1) {
                                        [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
                                        saveAndSet(arr);
                                    }
                                }}>↓</button>
                                <button className="delete-btn" onClick={() => {
                                    if(window.confirm("Delete?")) saveAndSet(projects.filter(proj => proj.id !== p.id));
                                }}>🗑️</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {lightbox && (
                <div className="lightbox" onClick={() => setLightbox(null)}>
                    <img src={lightbox} alt="Enlarged" />
                </div>
            )}
        </section>
    );
};

export default Projects;
