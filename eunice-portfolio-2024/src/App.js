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
import Portfolio from './components/Portfolio';
import { TotalWrapper, NavContainer, PageNav, IconCont, NameTitle, NavTitle, IconLink } from './styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import './App.css';

function App() {
  return (
    <TotalWrapper className="App">
      <Router>
          <div>
               <NavLink 
                exact to="/" 
                activeClassName="selected"
                style={{ textDecoration: 'none' }}
                >
                <NameTitle>
                    Eunice Esomonu
                </NameTitle>
              </NavLink>
          </div>
        <NavContainer>
        
          <PageNav>
          <ul>
            
              <li>
              <NavLink 
                to="/resume" 
                activeClassName="selected"
                style={{ textDecoration: 'none' }}
                >
                <NavTitle>
                   Resume
                </NavTitle>
              </NavLink>
            </li>
               <li>
              <NavLink 
                to="/portfolio" 
                activeClassName="selected"
                style={{ textDecoration: 'none' }}
                >
              <NavTitle>
                 Portfolio
              </NavTitle>
              </NavLink>
            </li>
                <li>
              <NavLink 
                to="/about" 
                activeClassName="selected"
                style={{ textDecoration: 'none' }}
                >
                <NavTitle>
                   Contact
                </NavTitle>
              </NavLink>
            </li>
          </ul>
          </PageNav>

          <IconCont>
            <IconLink href="https://www.linkedin.com/in/eesomonu/" >
               <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </IconLink>
             <IconLink href="https://github.com/esomo22e">
               <FontAwesomeIcon icon={faGithub} size="lg" />
            </IconLink>
            <IconLink href="https://www.instagram.com/eesomonu/">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </IconLink>
          </IconCont>    

        </NavContainer>  
        
        <Routes>
          <Route path="/portfolio" element={<Portfolio />}/>
          <Route path="/resume" element={<Resume />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </TotalWrapper>
  );
}

export default App;