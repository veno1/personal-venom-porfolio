// Updated Projects.js
import React, { useState, useEffect } from 'react';

const Projects = () => {
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (file) reader.readAsDataURL(file);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setImagePreview(null);
        }, 5000); // Image preview will disappear after 5 seconds

        return () => clearTimeout(timer);
    }, [imagePreview]);

    return (
        <div>
            <input type="file" onChange={handleImageUpload} />
            {imagePreview && <img src={imagePreview} alt="Preview" />}
        </div>
    );
};

export default Projects;