import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  position: relative;
  border: 1px solid #ccc;
  height: 300px;
  overflow: hidden; /* Ensure overflow is hidden to hide DetailsContainer overflow */
  cursor: pointer; /* Add pointer cursor */

  &:hover .details-container {
    background: rgba(255, 255, 255, 0.8); /* Change background on hover */
  }

  /* Hide GridTitle and GridDesc by default */
  .details-container {
    .grid-title,
    .grid-desc {
      visibility: hidden;
    }
  }

  /* Show GridTitle and GridDesc on hover */
  &:hover .details-container {
    .grid-title,
    .grid-desc {
      visibility: visible;
    }
  }

  @media (max-width: 640px) {
    height: 250px;
    text-align: left;
    .details-container {
      .grid-title,
      .grid-desc {
        visibility: visible;
      }
    }
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0, 1); /* Initial background */
  transition: background 0.3s ease; /* Add smooth transition */
  z-index: 1;
  display: flex;

  @media (max-width: 640px) {
    text-align: left;
    justify-content: start;
    align-items: start;
    padding: 20px;
    top: 150px;
  }
`;
const GridTitle = styled.h3`
  @media (max-width: 640px) {
    margin: 0;
  }
`;

const GridDesc = styled.div``;

function GridItem({ title, description, imgUrl }) {
  console.log(imgUrl);
  return (
    <GridContainer>
      <DetailsContainer className="details-container">
        <GridTitle className="grid-title">{title}</GridTitle>
        <GridDesc className="grid-desc">{description}</GridDesc>
      </DetailsContainer>
      <GridImage src={imgUrl} alt={title} className={title} />
    </GridContainer>
  );
}

export default GridItem;
