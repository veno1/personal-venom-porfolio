import { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import './Projects.css';

const LOCAL_STORAGE_KEY = 'portfolio_projects';
const MAX_TOTAL_STORAGE_BYTES = 4.2 * 1024 * 1024;

function getLocalStorageUsage() {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    if (value) {
      total += key.length + value.length;
    }
  }
  return total;
}

export default function Projects() {
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    images: [], // ✅ MULTIPLE IMAGES
    type: "",
    tags: ""
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('portfolio_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const saveProjects = (updatedProjects) => {
    try {
      const dataString = JSON.stringify(updatedProjects);
      const dataSize = new Blob([dataString]).size;
      const existingUsage = getLocalStorageUsage();
      const currentSaved = localStorage.getItem(LOCAL_STORAGE_KEY);
      const currentSavedSize = currentSaved ? new Blob([currentSaved]).size : 0;
      const requiredTotal = existingUsage - currentSavedSize + dataSize;

      if (requiredTotal > MAX_TOTAL_STORAGE_BYTES) {
        alert('Storage limit exceeded. Reduce image sizes.');
        return;
      }

      setProjects(updatedProjects);
      localStorage.setItem(LOCAL_STORAGE_KEY, dataString);
    } catch (error) {
      alert('Error saving projects');
    }
  };

  // ✅ IMAGE UPLOAD (MULTIPLE)
  const handleImageUpload = (files) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files).slice(0, 4); // max 4
    let loadedImages = [];

    fileArray.forEach((file) => {
      if (file.size > MAX_TOTAL_STORAGE_BYTES) {
        alert(`File ${file.name} is too large.`);
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        loadedImages.push(e.target.result);

        if (loadedImages.length === fileArray.length) {
          setNewProject(prev => ({
            ...prev,
            images: loadedImages
          }));
        }
      };

      reader.readAsDataURL(file);
    });
  };

  // ✅ FILE UPLOAD (UNCHANGED)
  const uploadFile = (projectIndex, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const updated = [...projects];
      const target = { ...updated[projectIndex] };
      const existingFiles = target.files || [];
      target.files = [...existingFiles, { name: file.name, data: e.target.result }];
      updated[projectIndex] = target;
      saveProjects(updated);
    };
    reader.readAsDataURL(file);
  };

  const addProject = (e) => {
    e.preventDefault();

    const tags = newProject.tags.split(',').map(t => t.trim()).filter(Boolean);

    const item = {
      ...newProject,
      tags,
      images: newProject.images.slice(0, 4), // ✅ LIMIT TO 4
      files: []
    };

    const updated = [...projects, item];
    saveProjects(updated);

    setNewProject({
      title: "",
      description: "",
      images: [],
      type: "",
      tags: ""
    });
  };

  const deleteProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    saveProjects(updated);
  };

  const removeFile = (projectIndex, fileIndex) => {
    const updated = [...projects];
    const item = { ...updated[projectIndex] };
    item.files = item.files.filter((_, i) => i !== fileIndex);
    updated[projectIndex] = item;
    saveProjects(updated);
  };

  return (
    <section className="projects-section" id="projects">
      <Container>

        <Row>
          <Col>
            <h2 className="heading-1">Portfolio</h2>
          </Col>
        </Row>

        {/* ADD PROJECT */}
        <Row className="mb-4">
          <Col>
            <Card className="p-3">
              <h5>Add New Project</h5>

              <form onSubmit={addProject}>
                <input
                  className="form-control mb-2"
                  placeholder="Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                  required
                />

                <textarea
                  className="form-control mb-2"
                  placeholder="Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  required
                />

                {/* ✅ MULTIPLE IMAGE INPUT */}
                <input
                  className="form-control mb-2"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e.target.files)}
                />

                <input
                  className="form-control mb-2"
                  placeholder="Type"
                  value={newProject.type}
                  onChange={(e) => setNewProject(prev => ({ ...prev, type: e.target.value }))}
                />

                <input
                  className="form-control mb-2"
                  placeholder="Tags"
                  value={newProject.tags}
                  onChange={(e) => setNewProject(prev => ({ ...prev, tags: e.target.value }))}
                />

                <button className="btn btn-success btn-sm">
                  Add Project
                </button>
              </form>
            </Card>
          </Col>
        </Row>

        {/* DISPLAY PROJECTS */}
        <Row>
          {projects.map((project, idx) => (
            <Col md={6} lg={4} xl={3} key={idx} className="mb-4">

              <Card className="h-100">

                {/* ✅ MULTIPLE IMAGES GRID */}
                {project.images && project.images.length > 0 && (
                  <div className="project-images-grid">
                    {project.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="project"
                        className="project-multi-image"
                      />
                    ))}
                  </div>
                )}

                <Card.Body>
                  <Card.Title>
                    {project.title}
                    <Badge bg="info" className="ms-2">
                      {project.type}
                    </Badge>
                  </Card.Title>

                  <Card.Text>{project.description}</Card.Text>

                  {project.tags.map((tag, i) => (
                    <Badge key={i} bg="secondary" className="me-1">
                      {tag}
                    </Badge>
                  ))}
                </Card.Body>

                <Card.Footer>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteProject(idx)}
                  >
                    Delete
                  </Button>
                </Card.Footer>

              </Card>
            </Col>
          ))}
        </Row>

      </Container>
    </section>
  );
}
