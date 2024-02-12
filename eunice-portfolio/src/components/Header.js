import React from "react";
import styled, { keyframes } from "styled-components";

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const HeaderWrapper = styled.div`
  height: 50vh;
  background: pink;
  height: 50vh;
  background: linear-gradient(
    -45deg,
    #00008B,
    #C06832,
    #814663,
    #412395,
    #0200C6
  
  );
  background-size: 200% 200%;
  animation: ${gradientAnimation} 10s ease infinite;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center content vertically */
  align-items: center;
  padding: 20px;
  color: #fffafa;
`;

const HeaderContent = styled.div`
  font-size: 45px;
  font-weight: 900;
  padding: 100px;

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const Arrow = styled.div`
  width: 25px;
  height: 25px;
  border: solid #fffafa;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
  margin-bottom=: 20px;
  margin: 0 auto; /* Center the arrow horizontally */
`;

const ScrollText = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const ArrowContainer = styled.div`
  padding: 40px 0;
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
