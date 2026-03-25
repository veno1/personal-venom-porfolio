import { Container, Row, Col } from "react-bootstrap";
import './Banner.css';

export const Banner = () => {
  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={7}>
            <div className="banner-content">
              <h1>
                Hi, I am <span className="highlight">Kadji Sonny</span>
                <br />
                <span className="wrap">Front End Developer</span>
                <p> <span className="wrap">Graphic Designer</span></p>
              </h1>
              <p>
                This is a Porfolio showcasing Kadji's work.<br />
                Explore the skills and projects sections to learn more.
              </p>
              <a  href="projects" className="banner-btn">
                Let's Connect
              </a>
            </div>
        
          </Col>
          
        </Row>
      </Container>
    </section>
  );
}