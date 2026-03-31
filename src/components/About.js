import { Container, Row, Col } from "react-bootstrap";
import './About.css';

export default function About() {
  return (
    <section className="about-section" id="about">
      <Container>
        <Row>
          <Col>
        
             <div className="home-content">
                <br></br>
         
<span>

  <strong>
    <h1 className="highlight-orange">About Me</h1>
  </strong>
</span>
              <p>
                Hello! I'm <strong>Kadji Sonny (Venom)</strong>, a passionate Graphic Designer, Front-End Developer, and Community Manager with a keen eye for aesthetics and a love for creating compelling visual narratives. With expertise in Adobe Creative Suite, modern design principles, and web technologies, I bring ideas to life through stunning visuals and interactive experiences.<br /><br />
                My work spans branding, digital art, print design, UI/UX, responsive web development, and community growth—always aiming to create designs and applications that not only look beautiful but also communicate effectively and provide excellent user experiences.
              </p>
              <ul className="about-list">
                <li>🎨 Adobe Creative Suite (Photoshop, Illustrator, InDesign)</li>
                <li>🌐 React, HTML, CSS, JavaScript</li>
                <li>⚡ Brand Identity & Logo Design</li>
                <li>🚀 Digital & Print Design Specialist</li>
                <li>👥 Community Management & Collaboration</li>
                <li>💡 Full-Stack Creative Professional</li>
              </ul>
              
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}