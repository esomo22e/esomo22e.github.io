import React, { useState } from 'react';
import { PortfolioGrid, PortfolioSquare, PortfolioWrapper, PortfolioPopUp, PortfolioContent, CloseButton, PortfolioCont, GridImage, GridTitle, DetailContainer} from './styles';
import portfolioItems from "../data/portfolioData-2024.json"; 
import advance_vote from "../image/portfolio/advance-vote.png";
import missing_children from "../image/portfolio/missing-children.png";
import olympics_medal_tracker from "../image/portfolio/olympic-medal-tracker.png";
import election_2022 from "../image/portfolio/election-2022.jpg";
import b_2_d from "../image/portfolio/birth-to-death.png";
import covid_tracker from "../image/portfolio/covid-tracker.png";
import banned_books from "../image/portfolio/banned-books.png";
import water from "../image/portfolio/water.jpg";
import enhancer from "../image/portfolio/enhancer.jpg";
import nail_process from "../image/portfolio/nail-process.png";
import trump_quotes from "../image/portfolio/trump-quotes.png";
import expressive_movement from "../image/portfolio/expressive-movement.png";

// import mass_shooting from "../image/portfolio/mass-shooting.png";
// import embedded_ap from "../image/portfolio/embedded-ap.png";
// import beanpot from "../image/portfolio/beanpot.jpg";
// import emotion from "../image/portfolio/emotion.png";
// import graffiti from "../image/portfolio/graffiti.png";
// import growth from "../image/portfolio/growth.jpg";
// import virus from "../image/portfolio/virus.png";
// import ell from "../image/portfolio/ell.jpg";
// import apple_picking from "../image/portfolio/applepicking.jpg";
// import boston_globe from "../image/portfolio/boston-globe.png";
// import science_gender from "../image/portfolio/science-gender.jpg";
// import water from "../image/portfolio/water.jpg";
// import mappingNortheastern from "../image/portfolio/mappingNortheastern.jpg";
// import svelte_templates from "../image/portfolio/svelte-templates.png";
// import fresh_truck from "../image/portfolio/fresh-truck.jpg";

function Portfolio() {
    const [activeSquare, setActiveSquare] = useState(null);

    const handleSquareClick = (index) => {
        setActiveSquare(index);
    };

    const handleClosePopup = () => {
        setActiveSquare(null);
    };

    const imageUrls = [
        advance_vote,
        olympics_medal_tracker,
        missing_children,
        election_2022,
        b_2_d,
        covid_tracker,
        banned_books,
        water,
        enhancer,
        nail_process,
        trump_quotes,
        expressive_movement
    ]

//       const imageUrls = [
//     missing_children,
//     election_2022,
//     b_2_d,
//     embedded_ap,
//     expressive_movement,
//     nail_process,
//     beanpot,
//     svelte_templates,
//     mappingNortheastern,
//     fresh_truck,
//     water,
//     banned_books,
//     science_gender,
//     enhancer,
//     boston_globe,
//     apple_picking,
//     mass_shooting,
//     ell,
//     virus,
//     growth,
//     emotion,
//     graffiti,
//   ];

    return (
        <PortfolioWrapper className="portfolio-container">
            <PortfolioGrid className="portfolio-grid">
                {portfolioItems.map((item, index) => (
                     <a 
                        key={index} 
                        href={item.externalLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                    <PortfolioSquare 
                        key={index} 
                        className="portfolio-square" 
                        onClick={() => handleSquareClick(index)}
                    >
                        <DetailContainer>
                            <GridTitle>{item.title}</GridTitle>
                        </DetailContainer>
                        <GridImage src={imageUrls[index]} alt={item.title} />


                    </PortfolioSquare>
                    </a>
                ))}
            </PortfolioGrid>

            {/* {activeSquare !== null && (
                <PortfolioPopUp className="portfolio-popup">
                    <PortfolioContent className="popup-content">
                        <CloseButton className="close-btn" onClick={handleClosePopup}>x</CloseButton>
                        
                        <PortfolioCont>
                            <h2>{portfolioItems[activeSquare].title}</h2>
                            <p>{portfolioItems[activeSquare].description}</p>
                            <a href={portfolioItems[activeSquare].externalLink} target="_blank" rel="noopener noreferrer">Read more</a>
                        </PortfolioCont>

                    </PortfolioContent>
                </PortfolioPopUp>
            )} */}
        </PortfolioWrapper>
    );
}

export default Portfolio;
