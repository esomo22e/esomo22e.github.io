import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 250px;
  border: 1px solid #ccc;
`;

const GridImage = styled.image`
  width: 100%;
  height: auto;
  max-height: 100%;
`;

const DetailsContainer = styled.div`
  padding: 10px;
`;
const GridTitle = styled.h3``;

const GridDesc = styled.div``;

function GridItem({ title, description, imgUrl }) {
  return (
    <GridContainer>
      <GridImage src={imgUrl} alt={title} className={title} />
      <DetailsContainer>
        <GridTitle>{title}</GridTitle>
        <GridDesc>{description}</GridDesc>
      </DetailsContainer>
    </GridContainer>
  );
}

export default GridItem;
