import React from "react";
import styled from "styled-components";
import portfolioPhoto from "../image/about/portfolio_photo.jpg";

const AboutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  // width: 90%;
  overflow:hidden;
  overflow-x: hidden;
  color: #000080;
  font-weight: 500;

  @media (max-width: 600px) {
      width: 80%;
      flex-flow: column-reverse
      padding: 20px;
      overflow:hidden;
      overflow-x: hidden;
      margin: 0;
      

  }
`;
const AboutTitle = styled.div``;

const AboutDesc = styled.div`
font-size: 20px;
@media (max-width: 640px) {
  widht: 100%;
}
`;

const AboutContent = styled.div`
  padding: 20px;
  width: 50%;
  text-align: left;
  // text-align: left;
  // align-items: center;
  // justify-content: center;

  @media (max-width: 640px) {
      widht: 100%;
  }
`;
const AboutImage = styled.img`
  // max-width: 40%;
  height: 400px;
  border-radius: 50%;
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width:600px) {
    height: 200px;

      ]X
`;

function About() {
  return (
    <AboutWrapper>
      <AboutContent>
        {/* <AboutTitle>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          aliquet eros id magna egestas molestie. In urna sapien, auctor nec
          lacus eu, fermentum ornare justo.{" "}
        </AboutTitle> */}
              <AboutImage src={portfolioPhoto} alt="Portfolio" />{" "}

        <AboutDesc>
        Hi, I’m Eunice Esomonu and thanks for coming to my page. I am a data designer, artist and a visual journalist, depending on the projects. I use design, art, front-end development, and data to tell effective stories and to make complex information accessible. My goal for my work is to develop various avenues that allow me to create human-centered storytelling that centers the marginalized communities.
        </AboutDesc>
      </AboutContent>
    </AboutWrapper>
  );
}

export default About;
