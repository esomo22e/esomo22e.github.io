import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.a`
  color: #00008B;
  background-color: lavender;
`;
const ButtonContent = styled.div`
    font-size: 25px;
    font-weight: 700;
    padding:  0 0 20px;
    text-decoration:underline;
`;

function Button({ onPageChange }) {
  return (
    <ButtonWrapper onClick={() => onPageChange("portfolio")}>
      <ButtonContent>View Work</ButtonContent>
    </ButtonWrapper>
  );
}
export default Button;
