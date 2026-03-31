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
                <span className="wrap">Graphic Designer</span>
                <p> <span className="wrap">& Front-End Developer</span></p>
                <p> <span className="wrap">& Community Manager</span></p>
              </h1>
              <p>
                Crafting visually stunning designs that tell stories and captivate audiences.<br />
                Explore my portfolio of branding, digital art, and creative projects.
              </p>
              <a  href="#projects" className="banner-btn">
                View My Work
              </a>
            </div>
        
          </Col>
          
        </Row>
      </Container>
    </section>
  );
}