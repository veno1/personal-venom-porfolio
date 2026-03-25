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
                Hello! I'm <strong>Kadji Sonny (Venom)</strong>, a passionate Front End Developer with experience in building modern, responsive web applications using React, JavaScript, and Bootstrap. <br /><br />
                I love creating beautiful Graphics as i also perform Graphic Designing, and I'm always eager to learn new technologies and improve my skills.
              </p>
              <ul className="about-list">
                <li>🌐 React, JavaScript, HTML, CSS</li>
                <li>⚡ Graphic Designer</li>
                <li>🚀 Fast Learner & Team Player</li>
                <li>Bootstrap</li>
              </ul>
              
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}