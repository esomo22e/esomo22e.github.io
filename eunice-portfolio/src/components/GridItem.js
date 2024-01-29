import React from "react";
import styled from "styled-components";

const GridContainer = styled.div``;

const GridImage = styled.image``;

const DetailsContainer = styled.div``;
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
