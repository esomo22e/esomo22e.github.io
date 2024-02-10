import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  height: 50vh;
  background: pink;
  height: 50vh;
  background: pink;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center content vertically */
  text-align: center; /* Center content horizontally */
`;

const HeaderContent = styled.div`
  font-size: 45px;
  font-weight: 900;
`;

const Arrow = styled.div`
  width: 30px;
  height: 30px;
  border: solid black;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
  margin-bottom: 20px;
  margin: 0 auto; /* Center the arrow horizontally */
`;

const ScrollText = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const ArrowContainer = styled.div`
  padding: 20px 0;
`;

function Header({ onPageChange }) {
  return (
    <HeaderWrapper>
      <HeaderContent>
        Hello, my name is Eunice Esomonu. I am a designer, developer, and
        journalist.
      </HeaderContent>
      <ArrowContainer>
        <ScrollText>Scroll down to look at my work</ScrollText>
        <Arrow />
      </ArrowContainer>
    </HeaderWrapper>
  );
}

export default Header;
