import React from "react";
import styled from "styled-components";
import GridItem from "./GridItem";

const FeaturedWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const portfolioItems = [
  {
    title: "Item 1",
    description: "Description 1",
    imgUrl: "url1.jpg",
  },
  {
    title: "Item 2",
    description: "Description 2",
    imgUrl: "url2.jpg",
  },
  {
    title: "Item 1",
    description: "Description 1",
    imgUrl: "url3.jpg",
  },
  {
    title: "Item 2",
    description: "Description 2",
    imgUrl: "url4.jpg",
  },

  {
    title: "Item 1",
    description: "Description 1",
    imgUrl: "url5.jpg",
  },
  {
    title: "Item 2",
    description: "Description 2",
    imgUrl: "url6.jpg",
  },
];

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
