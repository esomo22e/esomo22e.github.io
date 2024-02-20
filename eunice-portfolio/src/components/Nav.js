import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";

const Nav = styled.nav`
  background-color: #333;
  padding: 10px;
  color: white;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;

  @media (max-width: 600px) {
    display: flex;
    flex-flow: column-reverse;
  }
`;

const PDFLink = styled.a`
  color: white;
  margin: 0 20px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const NavLinkStyled = styled(NavLink)`
  color: white;
  margin: 0 20px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`


const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NameContainer = styled.a`
  font-weight: 900;
  color: white;
  cursor: pointer;
  font-size: 25px;

  @media (max-width: 600px) {
    /* display: none; */
  }
`;
const SocialContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    display: none;
  }
`;

const SocialLink = styled.a`
  color: white;
  margin-right: 30px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const MobileNavColumn = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    display: ${(props) => (props.open ? "flex" : "none")};
  }
`;

function Navigation({ onPageChange }) {
  return (
    <Nav>
      <LinkContainer>
        {/* <PDFLink onClick={() => onPageChange("about")} target="_blank">About</PDFLink>
        <PDFLink
          href="https://eesomonu.com/EuniceEsomonu-Resume.pdf"
          target="_blank"
        >
          Resume
        </PDFLink>{" "}
        <PDFLink onClick={() => onPageChange("portfolio")}>Portfolio</PDFLink> */}
       <NavLinkStyled to="../pages/about">About</NavLinkStyled>
       <PDFLink
          href="https://eesomonu.com/EuniceEsomonu-Resume.pdf"
          target="_blank"
        >
          Resume
        </PDFLink>
        <NavLinkStyled to="/portfolio">Portfolio</NavLinkStyled>
        {/* Add more navigation links for other pages */}
      </LinkContainer>
      <NavLinkStyled to="/" style={{fontWeight: "bold", fontSize: "30px"}}>

        Eunice Esomonu
      </NavLinkStyled>
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
