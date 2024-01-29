import React from "react";
import styled from "styled-components";
import GridItem from "./GridItem";
import portfolioItems from "../data/portfolioData.json"; // Import your portfolio data

const FeaturedWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
`;

function FeaturedPortfolio() {
  return (
    <FeaturedWrapper>
      {portfolioItems.map((item, index) => (
        <GridItem
          key={index}
          title={item.title}
          description={item.description}
          imgUrl={item.imgUrl}
        />
      ))}
    </FeaturedWrapper>
  );
}

export default FeaturedPortfolio;
