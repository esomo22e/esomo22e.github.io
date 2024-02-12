import React from "react";
import styled from "styled-components";
import portfolioItems from "../data/portfolioData.json"; // Import your portfolio data
import GridItem from "../components/GridItem";
import ames from "../components/ames.jpg";
import mass_shooting from "../image/portfolio/mass-shooting.png";
import missing_children from "../image/portfolio/missing-children.png";
import election_2022 from "../image/portfolio/election-2022.jpg";
import b_2_d from "../image/portfolio/birth-to-death.png";
import embedded_ap from "../image/portfolio/embedded-ap.png";

const PortfolioTitle = styled.div`
  font-size: 30px;
  font-weight: 900;
  padding: 30px 50px 10px;
  text-align: center;
  background-color: #f0eefe;

  @media (max-width: 600px) {
    font-size: 20px;
    text-align: left;
    padding: 30px 25px 10px;
  }
`;
const PortfolioWrapper = styled.div`
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
function PortfolioPage() {
  const imageUrls = [
    missing_children,
    election_2022,
    b_2_d,
    embedded_ap,
    ames,
    mass_shooting,
  ];

  return (
    <>
      <PortfolioWrapper>
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
      </PortfolioWrapper>
    </>
  );
}

export default PortfolioPage;
