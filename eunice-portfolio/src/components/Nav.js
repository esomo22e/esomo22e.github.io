import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const Nav = styled.nav`
  background-color: #333;
  padding: 10px;
  color: white;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

const NavLink = styled.a`
  color: white;
  margin-right: 15px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const LinkContainer = styled.div``;
const NameContainer = styled.div`
  font-weight: 900;
`;
const SocialContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SocialLink = styled.a`
  color: white;
  margin-right: 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

function Navigation({ onPageChange }) {
  return (
    <Nav>
      <LinkContainer>
        <NavLink onClick={() => onPageChange("home")}>Home</NavLink>
        <NavLink onClick={() => onPageChange("about")}>About</NavLink>
        <NavLink onClick={() => onPageChange("resume")}>Resume</NavLink>
        <NavLink onClick={() => onPageChange("portfolio")}>Portfolio</NavLink>
        {/* Add more navigation links for other pages */}
      </LinkContainer>
      <NameContainer>Eunice Esomonu</NameContainer>
      <SocialContainer>
        <SocialLink href="https://www.linkedin.com/in/eesomonu/">
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </SocialLink>
        <SocialLink href="https://github.com/esomo22e">
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </SocialLink>
      </SocialContainer>
    </Nav>
  );
}

export default Navigation;
