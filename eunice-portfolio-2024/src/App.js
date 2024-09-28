import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from 'react-router-dom';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Home from './components/Home';
import Portfolio from './components/Contact';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <div>
          <ul>
            <li>
              <NavLink 
                exact to="/" 
                activeClassName="selected">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                activeClassName="selected">
                Contact
              </NavLink>
            </li>
              <li>
              <NavLink 
                to="/resume" 
                activeClassName="selected">
                Resume
              </NavLink>
            </li>
               <li>
              <NavLink 
                to="/portfolio" 
                activeClassName="selected">
                Portfolio
              </NavLink>
            </li>
          </ul>
          </div>
          <div>
            <a href="https://www.linkedin.com/in/eesomonu/">
               <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
             <a href="https://github.com/esomo22e">
               <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
            <a href="https://www.instagram.com/eesomonu/">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </div>      
        </nav>  
        
        <Routes>
          <Route path="/portfolio" element={<Portfolio />}/>
          <Route path="/resume" element={<Resume />}/>
          <Route path="/about" element={<Contact />}/>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;