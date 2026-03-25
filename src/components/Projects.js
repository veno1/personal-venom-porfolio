import { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import './Projects.css';

export default function Projects() {
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "",
    type: "",
    tags: ""
  });

  const [projects, setProjects] = useState([
    {
      title: "Portfolio Website",
      description: "A personal portfolio website to showcase my skills and projects.",
      image: "/images/portfolio-preview.jpg",
      type: "website",
      files: [],
      tags: ["React", "Bootstrap", "Responsive"]
    },
    {
      title: "Brand Identity Design",
      description: "Complete Photoshop branding kit including logo, business cards, and mockups.",
      image: "/images/brand-identity-preview.jpg",
      type: "photoshop",
      files: [],
      tags: ["Photoshop", "Branding", "Print Design"]
    }
  ]);

  // Upload file locally using object URL (no backend)
  const uploadFile = (projectIndex, file) => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);

    setProjects(prev => {
      const updated = [...prev];
      const target = { ...updated[projectIndex] };
      const existingFiles = target.files || [];
      target.files = [...existingFiles, { name: file.name, url: objectUrl, local: true }];
      updated[projectIndex] = target;
      return updated;
    });
  };

  const addProject = (e) => {
    e.preventDefault();
    const tags = newProject.tags.split(',').map(t => t.trim()).filter(Boolean);
    const item = { ...newProject, tags, files: [] };

    setProjects(prev => [...prev, item]);
    setNewProject({ title: "", description: "", image: "", type: "", tags: "" });
  };

  const deleteProject = (index) => {
    setProjects(prev => prev.filter((_, i) => i !== index));
  };

  const removeFile = (projectIndex, fileIndex) => {
    setProjects(prev => {
      const updated = [...prev];
      const item = { ...updated[projectIndex] };
      item.files = item.files.filter((_, i) => i !== fileIndex);
      updated[projectIndex] = item;
      return updated;
    });
  };

  return (
    <section className="projects-section" id="projects">
      <Container>
        <Row>
          <Col>
            <h2 className="heading-1">Projects</h2>
            <p>
              <span className="highlight">Venom</span> has worked on various projects, showcasing skills in front-end development, 
              Photoshop design, and digital assets.
            </p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card className="p-3 mb-3">
              <h5>Add New Project</h5>
              <form onSubmit={addProject}>
                <div className="mb-2">
                  <input
                    className="form-control"
                    placeholder="Title"
                    value={newProject.title}
                    onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="mb-2">
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    className="form-control"
                    placeholder="Image URL"
                    value={newProject.image}
                    onChange={(e) => setNewProject(prev => ({ ...prev, image: e.target.value }))}
                  />
                </div>
                <div className="mb-2">
                  <input
                    className="form-control"
                    placeholder="Type (e.g: photoshop, website)"
                    value={newProject.type}
                    onChange={(e) => setNewProject(prev => ({ ...prev, type: e.target.value }))}
                  />
                </div>
                <div className="mb-2">
                  <input
                    className="form-control"
                    placeholder="Tags (comma-separated)"
                    value={newProject.tags}
                    onChange={(e) => setNewProject(prev => ({ ...prev, tags: e.target.value }))}
                  />
                </div>
                <button type="submit" className="btn btn-success btn-sm">Add Project</button>
              </form>
            </Card>
          </Col>
        </Row>

        <Row>
          {projects.map((project, idx) => {
            const files = project.files || [];

            return (
              <Col md={6} lg={4} xl={3} sm={6} xs={12} key={idx} className="mb-4">
                <Card className="project-card h-100 shadow-sm hover-lift">
                  {project.image && (
                    <Card.Img 
                      variant="top" 
                      src={project.image} 
                      alt={project.title}
                      className="project-image"
                    />
                  )}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="project-title">
                      {project.title}
                      <Badge bg="info" className="ms-2">
                        {project.type.toUpperCase()}
                      </Badge>
                    </Card.Title>
                    <Card.Text className="flex-grow-1">{project.description}</Card.Text>
                    
                    {project.tags && (
                      <div className="mb-3">
                        {project.tags.map((tag, tagIdx) => (
                          <Badge key={tagIdx} bg="secondary" className="me-1 mb-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {files.length > 0 && (
                      <div className="mb-2">
                        <small className="text-muted">Uploaded files:</small>
                        <ul className="ps-3 mb-0">
                          {files.map((f, fileIdx) => (
                            <li key={fileIdx} className="d-flex justify-content-between align-items-center">
                              <a href={f.url} target="_blank" rel="noopener noreferrer">
                                {f.name}
                              </a>
                              <button
                                className="btn btn-sm btn-outline-danger ms-2"
                                onClick={() => removeFile(idx, fileIdx)}
                                type="button"
                              >
                                Delete
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Card.Body>
                  
                  <Card.Footer className="bg-transparent border-0 pt-0">
                    <div className="d-flex flex-column gap-2">
                      <Button
                        as="label"
                        variant={files.length > 0 ? "outline-success" : "success"}
                        className="w-100"
                      >
                        📁 Upload File
                        <input
                          type="file"
                          hidden
                          multiple
                          accept=".psd,.ai,.eps,.zip,.rar,.pdf,image/*"
                          onChange={(e) => {
                            if (e.target.files.length > 0) uploadFile(idx, e.target.files[0]);
                          }}
                        />
                      </Button>

                      {files.length > 0 && (
                        <Button
                          variant="info"
                          className="w-100"
                          onClick={() => window.open(files[files.length - 1].url, '_blank', 'noopener')}
                          size="sm"
                        >
                          ⬇️ View Latest ({files[files.length - 1].name})
                        </Button>
                      )}

                      <Button
                        variant="danger"
                        className="w-100"
                        size="sm"
                        onClick={() => deleteProject(idx)}
                      >
                        Delete Project
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}