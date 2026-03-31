import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import './Skills.css';
const skills = [
  { name: "Adobe Photoshop", level: 90 },
  { name: "Adobe Illustrator", level: 85 },
  { name: "Adobe InDesign", level: 75 },
  { name: "Figma", level: 80 },
  { name: "React", level: 75 },
  { name: "HTML/CSS", level: 85 },
  { name: "JavaScript", level: 70 },
  { name: "Front-End Development", level: 80 },
  { name: "Brand Identity", level: 85 },
  { name: "Typography", level: 80 },
  { name: "Color Theory", level: 85 },
  { name: "UI/UX Design", level: 70 },
];

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <Container>
        <Row>
          <Col>
            <h2 className="skills-title">Design Skills</h2>
            <div className="skills-list">
              {skills.map((skill) => (
                <div className="skill-item" key={skill.name}>
                  <div className="skill-label">
                    <span>{skill.name}</span>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                  <ProgressBar now={skill.level} variant="info" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}