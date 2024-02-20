import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import PortfolioPage from "../pages/PortfolioPage";

const ButtonWrapper = styled(Link)`
  color: #00008B;
  background-color: lavender;
`;
const ButtonContent = styled.div`
    font-size: 25px;
    font-weight: 700;
    padding:  0 0 20px;
    text-decoration:underline;
`;

function Button({ to }) {
  return (
    <ButtonWrapper to={to}> 
      <ButtonContent>View Work</ButtonContent>
    </ButtonWrapper>
  );
}
export default Button;
