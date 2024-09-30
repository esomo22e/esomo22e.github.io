import styled from "styled-components";

// Home Component
export const ContentWrapper = styled.div`
    padding: 20px 80px;
    margin: 0 auto;
    /* color: #264653; */
    /* color: #083D77; */
    color: #085077;
`
export const  Intro = styled.div`
    font-size: 45px;
    font-weight: 600;
    padding: 25px 0;

`
export const TextCont = styled.div`
    font-size: 32px;
    font-weight: 400;
    margin: 20px auto;
`

export const LinkText = styled.a`
    font-weight: 600;
    text-decoration: none;
    color: #cd3800;;



    &:hover {
        transition: text-decoration 0.3s ease;
        text-decoration: underline;
    }
`

// Contact Component 

export const ContactWrapper = styled.div`
    padding: 10px 100px;
    margin: 10px auto;
    color: #085077;
    

`

export const ContactTitle = styled.h2`
    font-size: 54px;
`

export const ContactHeader = styled.div`
    font-size: 20px;
    font-weight: 650;
    margin: 10px 0;
`

export const ContactLink = styled.a`
    text-decoration: none;
    font-weight: 675;
    font-size: 32px;
    color: #cd3800;
;

`

export const SocialCont = styled.div`
    display: flex;
    gap: 20px;
`

export const ContactCont = styled.div`
    margin: 20px 0;
`

// Resume

// Portfolio Component
export const PortfolioWrapper = styled.div`
    display: flex;
    justify-content: center;
    /* align-items: center; */
    margin: 40px 60px;
    /* height: 100vh; */
`

export const PortfolioGrid = styled.div`
   display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
    max-width: 1200px;

     @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    }
`
export const PortfolioSquare = styled.div`
    position: relative;
    background-color: lightgray;
    border-radius: 20px;
    cursor: pointer;
    /* padding: 20px; */
    text-align: center;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    max-height: 215px;
    overflow: hidden; /* Ensure the content doesn't overflow */


    &:hover {
        transform: scale(1.02);
    }
`;

export const SquareImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
`;

export const SquareTitle = styled.h3`
    margin-top: 10px;
    font-size: 18px;
`;


export const CloseBtn = styled.button`
    align-self: flex-end;
    background-color: #cd3800;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        background-color: #b52e00;
    }
`;

// Portfolio PopUp

export const PortfolioPopUp = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const PortfolioContent = styled.div`
    background: white;
    /* padding: 200px; */
    margin: 20px;
    width: 1000px;
    height: 600px;
    border-radius: 10px;
    position: relative;
`
export const CloseButton = styled.button`
     position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`

export const PortfolioCont = styled.div`
    margin: 20px;
`

export const GridImage = styled.img`
    width: 100%;
    height: auto;
    max-height: 350px;
    object-fit: cover;
    object-position: center;
    border-radius: 20px;
`

export const GridTitle = styled.h3`
    color: rgb(237,246,249); /* Dark background for better readability */
   
    background: rgba(204, 74, 18,0.75);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: left;
    text-align: left;
    padding: 5px 20px;
    font-size: 16px;
    border-radius: 5px;
  
`

export const DetailContainer = styled.div`
    position: absolute;  /* Position relative to the PortfolioSquare */
    top: 10%;  /* Center vertically */
    left: 15%; /* Center horizontally */
    transform: translate(-20%, -15%);
    overflow: hidden;
    width: 300px;
`
