import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar, Alert } from "react-bootstrap";
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage';
import './Projects.css';

export default function Projects() {
  // Firebase config (get from Firebase Console > Project Settings)
  const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const [projects, setProjects] = useState([
    {
      title: "Portfolio Website",
      description: "A personal portfolio website to showcase my skills and projects.",
      image: "/images/portfolio-preview.jpg",
      type: "website",
      links: [{ label: "Live Site", url: "https://myportfolio.com", download: true }],
      tags: ["React", "Bootstrap", "Responsive"]
    },
    {
      title: "Brand Identity Design",
      description: "Complete Photoshop branding kit including logo, business cards, and mockups.",
      image: "/images/brand-identity-preview.jpg",
      type: "photoshop",
      links: [{ label: "Download Files", url: "", download: true, uploading: false, progress: 0 }],
      tags: ["Photoshop", "Branding", "Print Design"]
    }
  ]);

  const [uploading, setUploading] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

  // Upload file to Firebase Storage
  const uploadFile = async (projectIndex, file) => {
    if (!file) return;

    const projectRef = ref(storage, `portfolio/${projects[projectIndex].title}/${file.name}`);
    
    setUploading(prev => ({ ...prev, [projectIndex]: true }));
    setUploadProgress(prev => ({ ...prev, [projectIndex]: 0 }));

    const uploadTask = uploadBytesResumable(projectRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(prev => ({ ...prev, [projectIndex]: progress }));
      },
      (error) => {
        console.error('Upload failed:', error);
        setUploading(prev => ({ ...prev, [projectIndex]: false }));
        alert('Upload failed!');
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        
        // Update project with download URL
        setProjects(prev => {
          const updated = [...prev];
          updated[projectIndex].links[0].url = downloadURL;
          updated[projectIndex].links[0].filename = file.name;
          return updated;
        });

        setUploading(prev => ({ ...prev, [projectIndex]: false }));
        setUploadProgress(prev => ({ ...prev, [projectIndex]: 100 }));
        
        // Reset progress after 2 seconds
        setTimeout(() => {
          setUploadProgress(prev => ({ ...prev, [projectIndex]: 0 }));
        }, 2000);
      }
    );
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
        <Row>
          {projects.map((project, idx) => {
            const link = project.links[0];
            const isUploading = uploading[idx];
            const progress = uploadProgress[idx] || 0;
            const hasFile = link.url && !isUploading;

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
                  </Card.Body>
                  
                  <Card.Footer className="bg-transparent border-0 pt-0">
                    <div className="d-flex flex-column gap-2">
                      {/* Upload Button / File Input */}
                      <Button
                        as="label"
                        variant={hasFile ? "outline-success" : "success"}
                        className="w-100"
                        disabled={isUploading}
                      >
                        {isUploading 
                          ? `Uploading... ${Math.round(progress)}%` 
                          : hasFile 
                            ? `✅ ${link.filename || 'File Ready'}` 
                            : '📁 Upload Files'
                        }
                        <input
                          type="file"
                          hidden
                          multiple
                          accept=".zip,.rar,.pdf,image/*"
                          onChange={(e) => uploadFile(idx, e.target.files[0])}
                          disabled={isUploading}
                        />
                      </Button>

                      {/* Progress Bar */}
                      {isUploading && (
                        <ProgressBar 
                          now={progress} 
                          className="w-100" 
                          variant="success"
                          label={`${Math.round(progress)}%`}
                        />
                      )}

                      {/* Download Button */}
                      {hasFile && (
                        <Button
                          variant="info"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="sm"
                          className="w-100"
                        >
                          ⬇️ Download {link.filename || 'Files'}
                        </Button>
                      )}
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