import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 250px;
  border: 1px solid #ccc;

  @media (max-width: 600px) {
    height: 200px;
  }
`;

const GridImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 100%;
`;

const DetailsContainer = styled.div`
  position: absolute;
  width: 300px;
  height: 250px;
  /* position: absolute;
  text-align: center; */
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
