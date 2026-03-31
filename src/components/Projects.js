import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
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
    en: {
        title: "Projects",
        add: "Add Project",
        update: "Update Project",
        name: "Project Name",
        desc: "Description",
        upload: "Project Image",
        drag: "Drag & Drop Image Here",
        preview: "Preview"
    },
    fr: {
        title: "Projets",
        add: "Ajouter un projet",
        update: "Modifier le projet",
        name: "Nom du projet",
        desc: "Description",
        upload: "Image du projet",
        drag: "Glissez-déposez une image ici",
        preview: "Aperçu"
    }
};

const Projects = () => {

    const [lang, setLang] = useState("en");
    const t = translations[lang];

    const [isAdmin, setIsAdmin] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        if (window.location.hash === "#admin") {
            setIsAdmin(true);
        }
    }, []);

    const [projects, setProjects] = useState(DEFAULT_PROJECTS);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageData, setImageData] = useState('');

    const [lightbox, setLightbox] = useState(null);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('projects'));
        if (stored) setProjects(stored);
    }, []);

    const saveProjects = (data) => {
        setProjects(data);
        localStorage.setItem('projects', JSON.stringify(data));
    };

    const handleUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => setImageData(reader.result);
        reader.readAsDataURL(file);
    };

    const submit = (e) => {
        e.preventDefault();

        const image = imageData || yogurtImage;

        if (editingId) {
            saveProjects(projects.map(p =>
                p.id === editingId ? { ...p, name, description, image } : p
            ));
        } else {
            saveProjects([
                ...projects,
                { id: Date.now(), name, description, image }
            ]);
        }

        setName('');
        setDescription('');
        setImageData('');
        setEditingId(null);
    };

    const edit = (p) => {
        setName(p.name);
        setDescription(p.description);
        setImageData(p.image);
        setEditingId(p.id);
    };

    const move = (i, dir) => {
        const arr = [...projects];
        const j = i + dir;
        if (j < 0 || j >= arr.length) return;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        saveProjects(arr);
    };

    return (
        <section className="projects-section">

            {/* 🌍 LANGUAGE SWITCH */}
            <div className="lang-switch">
                <button onClick={() => setLang("en")}>EN</button>
                <button onClick={() => setLang("fr")}>FR</button>
            </div>

            <h1 className="heading-1">{t.title}</h1>

            {/* ADMIN FORM */}
            {isAdmin && (
                <form className="project-form" onSubmit={submit}>

                    <input
                        placeholder={t.name}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        placeholder={t.desc}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div
                        className="upload-box"
                        onDrop={(e) => {
                            e.preventDefault();
                            handleUpload(e.dataTransfer.files[0]);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        {t.drag}
                    </div>

                    <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />

                    {imageData && (
                        <img src={imageData} className="preview-img" />
                    )}

                    <button>{editingId ? t.update : t.add}</button>

                </form>
            )}

            {/* PROJECT GRID */}
            <div className="project-grid">
                {projects.map((p, i) => (
                    <div key={p.id} className="project-card fade-in">

                        <img src={p.image} onClick={() => setLightbox(p.image)} />

                        <h3>{p.name}</h3>
                        <p>{p.description}</p>

                        {isAdmin && (
                            <div className="admin-controls">
                                <button onClick={() => edit(p)}>✏️</button>
                                <button onClick={() => move(i, -1)}>↑</button>
                                <button onClick={() => move(i, 1)}>↓</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* 🔍 LIGHTBOX */}
            {lightbox && (
                <div className="lightbox" onClick={() => setLightbox(null)}>
                    <img src={lightbox} />
                </div>
            )}

        </section>
    );
};

export default Projects;
