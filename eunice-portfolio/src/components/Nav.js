import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #333;
  padding: 10px;
  color: white;
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

function Navigation({ onPageChange }) {
    return (  
        <Nav>
            <NavLink onClick={() => onPageChange("home")}>Home</NavLink>
            <NavLink onClick={() => onPageChange("about")}>About</NavLink>
            <NavLink onClick={() => onPageChange("resume")}>Resume</NavLink>
            <NavLink onClick={() => onPageChange("portfolio")}>Portfolio</NavLink>
            {/* Add more navigation links for other pages */}
       </Nav>
      );
}

export default Navigation