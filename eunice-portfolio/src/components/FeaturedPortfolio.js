import React from "react";
import styled from "styled-components";
import GridItem from "./GridItem";
import portfolioItems from "../data/featuredPortfolioData.json"; // Import your portfolio data
import ames from "./ames.jpg";

const FeaturedWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 50px;
  position: relative;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 25px;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const FeaturedTitle = styled.div``;
function FeaturedPortfolio() {
  const imageUrls = [ames];

  return (
    <>
      <FeaturedTitle>Featured Projects</FeaturedTitle>
      <FeaturedWrapper>
        {portfolioItems.map((item, index) => (
          <GridItem
            key={index}
            title={item.title}
            description={item.description}
            // imgUrl={imageUrls[index]}
            imgUrl={ames}
          />
        ))}
      </FeaturedWrapper>
    </>
  );
}

export default FeaturedPortfolio;
