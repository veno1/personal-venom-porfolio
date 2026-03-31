import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import './Projects.css';

const LOCAL_STORAGE_KEY = 'portfolio_projects';

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  setProjects(updated);
};
export default function Projects() {

  // 🔐 ADMIN MODE (hidden via URL)
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#admin") {
      setIsAdmin(true);
    }
  }, []);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    images: [],
    type: "",
    tags: ""
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const saveProjects = (updated) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    setProjects(updated);
  };

  // ✅ IMAGE UPLOAD (ONLY ADMIN USES IT)
  const handleImageUpload = (files) => {
    const fileArray = Array.from(files).slice(0, 4);
    let images = [];

    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        images.push(e.target.result);
        if (images.length === fileArray.length) {
          setNewProject(prev => ({ ...prev, images }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const addProject = (e) => {
    e.preventDefault();

    const tags = newProject.tags.split(',').map(t => t.trim()).filter(Boolean);

    const item = {
      ...newProject,
      tags,
      images: newProject.images,
      files: []
    };

    saveProjects([...projects, item]);

    setNewProject({
      title: "",
      description: "",
      images: [],
      type: "",
      tags: ""
    });
  };

  const deleteProject = (index) => {
    saveProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <section className="projects-section" id="projects">
      <Container>

        <Row>
          <Col>
            <h2 className="heading-1">Portfolio</h2>
          </Col>
        </Row>

        {/* 🔐 ADMIN PANEL (HIDDEN FROM RECRUITERS) */}
        {isAdmin && (
          <Row className="mb-4">
            <Col>
              <Card className="p-3 shadow-sm">
                <h5>➕ Add Project</h5>

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

                  <input
                    type="file"
                    className="form-control mb-2"
                    multiple
                    accept="image/*"
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

                  <Button type="submit" size="sm" variant="success">
                    Add Project
                  </Button>
                </form>
              </Card>
            </Col>
          </Row>
        )}

        {/* PROJECTS DISPLAY */}
        <Row>
          {projects.length === 0 && (
            <Col>
              <p className="text-center text-muted">No projects yet.</p>
            </Col>
          )}

          {projects.map((project, idx) => (
            <Col md={6} lg={4} xl={3} key={idx} className="mb-4">

              <Card className="h-100 shadow-sm hover-lift">

                {/* IMAGES */}
                {project.images && (
                  <div className="project-images-grid">
                    {project.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        className="project-multi-image"
                      />
                    ))}
                  </div>
                )}

                <Card.Body>
                  <Card.Title>
                    {project.title}
                    {project.type && (
                      <Badge bg="info" className="ms-2">
                        {project.type}
                      </Badge>
                    )}
                  </Card.Title>

                  <Card.Text>{project.description}</Card.Text>

                  {project.tags && project.tags.map((tag, i) => (
                    <Badge key={i} bg="secondary" className="me-1">
                      {tag}
                    </Badge>
                  ))}
                </Card.Body>

                {/* 🔐 DELETE ONLY IN ADMIN MODE */}
                {isAdmin && (
                  <Card.Footer>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => deleteProject(idx)}
                    >
                      Delete
                    </Button>
                  </Card.Footer>
                )}

              </Card>
            </Col>
          ))}
        </Row>

      </Container>
    </section>
  );
}
