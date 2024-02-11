import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.a`
  color: purple;
  background-color: lavender;
`;
const ButtonContent = styled.div``;

function Button({ onPageChange }) {
  return (
    <ButtonWrapper onClick={() => onPageChange("portfolio")}>
      <ButtonContent>View Work</ButtonContent>
    </ButtonWrapper>
  );
}
export default Button;
