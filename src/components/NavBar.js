import { Navbar, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export function NavBar() {
  const [activeLink, onUpdateActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      variant="dark"
      fixed="top"
      style={{
        backgroundColor: '#000',
        transition: 'background-color 0.3s',
        boxShadow: scrolled ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
      }}
      className={scrolled ? 'scrolled' : ''}
    >
      <Navbar.Brand href="#home" style={{ color: '#fff', fontWeight: 'bold' }}>
        Kadji Tsanang Sonny Ayrton&apos;s Portfolio
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link
            href="#home"
            className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'}
            onClick={() => onUpdateActiveLink('home')}
            style={{ color: '#fff' }}
          >
            Home
          </Nav.Link>
          <Nav.Link
            href="#skills"
            className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'}
            onClick={() => onUpdateActiveLink('skills')}
            style={{ color: '#fff' }}
          >
            Skills
          </Nav.Link>
          <Nav.Link
            href="#about"
            className={activeLink === 'about' ? 'active navbar-link' : 'navbar-link'}
            onClick={() => onUpdateActiveLink('about')}
            style={{ color: '#fff' }}
          >
            About
          </Nav.Link>
          <Nav.Link
            href="#projects"
            className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'}
            onClick={() => onUpdateActiveLink('projects')}
            style={{ color: '#fff' }}
          >
            Projects
          </Nav.Link>
        </Nav>
        <span className="navbar-text" style={{ display: 'flex', alignItems: 'center' }}>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: '10px' }}
            aria-label="GitHub"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub"
              style={{ width: '28px', height: '28px', filter: 'invert(1)' }}
            />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: '10px' }}
            aria-label="LinkedIn"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
              alt="LinkedIn"
              style={{ width: '28px', height: '28px', filter: 'invert(1)' }}
            />
          </a>
          <button
            className="vvd"
            style={{
              background: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: '20px',
              padding: '6px 18px',
              cursor: 'pointer',
              fontWeight: 'bold',
              letterSpacing: '1px',
              marginLeft: '10px'
            }}
            onClick={() => window.location.href = "#contact"}
          >
            <span>let&apos;s connect</span>
          </button>
        </span>
      </Navbar.Collapse>
    </Navbar>
  );
}