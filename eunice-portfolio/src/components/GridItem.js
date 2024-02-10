import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  position: relative;
  border: 1px solid #ccc;
  height: 300px;

  @media (max-width: 600px) {
    height: 200px;
  }
`;

const GridImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: cover;
`;

const DetailsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(
    255,
    255,
    255,
    0.8
  ); /* Adjust the background color and opacity as needed */
  z-index: 1;
`;
const GridTitle = styled.h3``;

const GridDesc = styled.div``;

function GridItem({ title, description, imgUrl }) {
  return (
    <GridContainer>
      <DetailsContainer>
        <GridTitle>{title}</GridTitle>
        <GridDesc>{description}</GridDesc>
      </DetailsContainer>
      <GridImage src={imgUrl} alt={title} className={title} />
    </GridContainer>
  );
}

export default GridItem;
