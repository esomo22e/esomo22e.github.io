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
import expressive_movement from "../image/portfolio/expressive-movement.png";
import nail_process from "../image/portfolio/nail-process.png";
import beanpot from "../image/portfolio/beanpot.jpg";
import emotion from "../image/portfolio/emotion.png";
import graffiti from "../image/portfolio/graffiti.png";
import growth from "../image/portfolio/growth.jpg";
import virus from "../image/portfolio/virus.png";
import ell from "../image/portfolio/ell.jpg";
import apple_picking from "../image/portfolio/applepicking.jpg";
import boston_globe from "../image/portfolio/boston-globe.png";
import enhancer from "../image/portfolio/enhancer.jpg";
import science_gender from "../image/portfolio/science-gender.jpg";
import water from "../image/portfolio/water.jpg";
import mappingNortheastern from "../image/portfolio/mappingNortheastern.jpg";
import banned_books from "../image/portfolio/banned-books.png";
import svelte_templates from "../image/portfolio/svelte-templates.png";
import fresh_truck from "../image/portfolio/fresh-truck.jpg";

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
    expressive_movement,
    nail_process,
    beanpot,
    svelte_templates,
    mappingNortheastern,
    fresh_truck,
    water,
    banned_books,
    science_gender,
    enhancer,
    boston_globe,
    apple_picking,
    mass_shooting,
    ell,
    virus,
    growth,
    emotion,
    graffiti,
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
