import React from "react";
import styled from "styled-components";
import portfolioPhoto from "../image/about/portfolio_photo.jpg";

const AboutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  width: 90%;
`;
const AboutTitle = styled.div``;

const AboutDesc = styled.div``;

const AboutContent = styled.div`
  padding: 20px;
  width: 50%;
  text-align: left;
`;
const AboutImage = styled.img`
  max-width: 40%;
  height: 500px;
  border-radius: 50%;
`;

function About() {
  return (
    <AboutWrapper>
      <AboutContent>
        <AboutTitle>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          aliquet eros id magna egestas molestie. In urna sapien, auctor nec
          lacus eu, fermentum ornare justo.{" "}
        </AboutTitle>
        <AboutDesc>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          aliquet eros id magna egestas molestie. In urna sapien, auctor nec
          lacus eu, fermentum ornare justo. Phasellus vitae convallis purus.
          Donec rhoncus libero interdum nibh blandit, et commodo sem ornare.
          Integer odio ipsum, eleifend a lorem id, varius varius lacus. Donec
          vestibulum, enim quis convallis rutrum, ante eros malesuada orci, id
          volutpat ex elit vitae magna. Orci varius natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus. Maecenas dui metus,
          luctus vitae felis ut, hendrerit tempus turpis. Quisque blandit
          laoreet tortor ut placerat. Suspendisse pulvinar eu felis sit amet
          laoreet. In feugiat tincidunt molestie. Vestibulum mauris mauris,
          suscipit eget maximus sit amet, dignissim id mi. Integer pellentesque
          tortor massa, eu blandit odio varius id.
        </AboutDesc>
      </AboutContent>
      <AboutImage src={portfolioPhoto} alt="Portfolio" />{" "}
    </AboutWrapper>
  );
}

export default About;
