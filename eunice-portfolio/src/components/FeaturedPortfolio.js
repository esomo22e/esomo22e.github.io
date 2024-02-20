import React, { useState } from "react";
import styled from "styled-components";
import GridItem from "./GridItem";
import portfolioItems from "../data/featuredPortfolioData.json"; // Import your portfolio data
import ames from "./ames.jpg";
import Button from "./Button";
import PortfolioPage from "../pages/PortfolioPage";
import Header from "./Header"; // Import Header component
import missing_children from "../image/portfolio/missing-children.png";
import election_2022 from "../image/portfolio/election-2022.jpg";
import banned_books from "../image/portfolio/banned-books.png";
import b_2_d from "../image/portfolio/birth-to-death.png";
import mappingNortheastern from "../image/portfolio/mappingNortheastern.jpg";
import nail_process from "../image/portfolio/nail-process.png";
import enhancer from "../image/portfolio/enhancer.jpg";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import GoogleFontLoader from 'react-google-font-loader';

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
  font-size: 35px;
  font-weight: 900;
  padding: 30px 50px 10px;
  text-align: center;
  color: #00008B;

  @media (max-width: 600px) {
    font-size: 20px;
    text-align: left;
    padding: 30px 25px 10px;
  }
`;
function FeaturedPortfolio() {
  const imageUrls = [missing_children, election_2022,banned_books, mappingNortheastern,nail_process, enhancer ];

  const navigate = useNavigate(); // Initialize useHistory hook
  const [portfolioPage, setPortfolioPage] = useState("home");
  const [isVisible, setIsVisible] = useState(true);

  const handleChangePortfolio = (page) => {
    setPortfolioPage(page);
    setIsVisible(false); // Set isVisible to false when changing the page
  };

  const handlePortfolioClick = () => {
    navigate.push("/portfolio"); // Navigate to PortfolioPage
  };


  return (
    <>
          <GoogleFontLoader fonts={[{ font: 'Roboto', weights: [400, '700'] }]} />
      {isVisible && (
        <>
          <Header />
          <FeaturedTitle style={{ fontFamily: 'Roboto, sans-serif' }}>Featured Projects</FeaturedTitle>

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

          {/* {/* <Button onPageChange={handleChangePortfolio} /> */}

          {/* <Button onClick={handlePortfolioClick}>Go to Portfolio</Button>  */}
          <Button to="/portfolio" />
        </>
      )}
      {/* Conditionally render based on portfolioPage */}
      {/* {portfolioPage === "portfolio" && <PortfolioPage />} */}
      {/* Conditionally render based on isVisible */}
    </>
  );
}

export default FeaturedPortfolio;
