import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import './Skills.css';
const skills = [
  { name: "React", level: 70 },
  { name: "JavaScript", level: 65 },
  { name: "HTML", level: 85 },
  { name: "CSS", level: 80 },
  { name: "Bootstrap", level: 70 },
  { name: "Git & GitHub", level: 55 },
   { name: "Illustrator", level: 80 },
  { name: "Photoshop", level: 50 },
];

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <Container>
        <Row>
          <Col>
            <h2 className="skills-title">Skills</h2>
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