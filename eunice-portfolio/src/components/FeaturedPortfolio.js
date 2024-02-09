import React from "react";
import styled from "styled-components";
import GridItem from "./GridItem";
import portfolioItems from "../data/featuredPortfolioData.json"; // Import your portfolio data
import ames from "./ames.jpg";
const FeaturedWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  position: relative;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

function FeaturedPortfolio() {
  return (
    <FeaturedWrapper>
      {portfolioItems.map((item, index) => (
        <GridItem
          key={index}
          title={item.title}
          description={item.description}
          imgUrl={ames}
          //   imgUrl={item.imgUrl}
        />
      ))}
    </FeaturedWrapper>
  );
}

export default FeaturedPortfolio;
