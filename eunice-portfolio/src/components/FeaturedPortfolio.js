import React, { useState } from "react";
import styled from "styled-components";
import GridItem from "./GridItem";
import portfolioItems from "../data/featuredPortfolioData.json"; // Import your portfolio data
import ames from "./ames.jpg";
import Button from "./Button";
import PortfolioPage from "../pages/PortfolioPage";
import Header from "./Header"; // Import Header component

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

const FeaturedTitle = styled.div`
  font-size: 30px;
  font-weight: 900;
  padding: 30px 50px 10px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 20px;
    text-align: left;
    padding: 30px 25px 10px;
  }
`;
function FeaturedPortfolio() {
  const imageUrls = [ames];
  const [portfolioPage, setPortfolioPage] = useState("home");
  const [isVisible, setIsVisible] = useState(true);

  const handleChangePortfolio = (page) => {
    setPortfolioPage(page);
    setIsVisible(false); // Set isVisible to false when changing the page
  };

  return (
    <>
      {isVisible && (
        <>
          <Header />
          <FeaturedTitle>Featured Projects</FeaturedTitle>

          <FeaturedWrapper>
            {portfolioItems.map((item, index) => (
              <GridItem
                key={index}
                title={item.title}
                description={item.description}
                imgUrl={imageUrls[index]}
                // imgUrl={ames}
                externalLink={item.externalLink}
              />
            ))}
          </FeaturedWrapper>

          <Button onPageChange={handleChangePortfolio} />
        </>
      )}
      {/* Conditionally render based on portfolioPage */}
      {portfolioPage === "portfolio" && <PortfolioPage />}
      {/* Conditionally render based on isVisible */}
    </>
  );
}

export default FeaturedPortfolio;
