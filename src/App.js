import React from 'react';
import { NavBar } from './components/NavBar';

import {Banner} from './components/Banner';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import './App.css';


function App() {
  return (
    <div className="App">
    <NavBar />
<Banner />      {/* id="home" */}
<Skills />      {/* id="skills" */}
<About />       {/* id="about" */}
<Projects />    {/* id="projects" */}
    </div>
  );
}
export default App;
