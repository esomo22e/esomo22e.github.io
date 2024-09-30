import styled from "styled-components";

export const TotalWrapper = styled.div`
    padding: 0;
`;  

export const NavContainer = styled.nav`
    /* width: 100%; */
    /* display: flex; */
    display: grid;
    grid-template-columns: repeat(2,1fr);
    text-decoration: none;
    align-items: center;
    margin: 10px 60px;
    background-color: #085077;
    border-radius: 15px;

    @media (max-width: 768px) {
        margin: 10px;
    }
   
`

export const PageNav = styled.div`

   ul{
            display: flex;
            gap: 50px;
            list-style-type: none;
            text-decoration: none;
            font-weight: 500;

    }

    @media (max-width: 768px) {

        ul{
            align-items: center;
            justify-content: space-between;
        }

    }

    
  
`

export const IconCont = styled.div`
    /* justify-content: center; */
    /* background-color: pink; */
    display: flex;
    justify-content: right;
    margin: 0 50px;

    @media (max-width: 768px) {
        display: none;
    }
    
`

export const IconLink = styled.a`
    /* color: #e4d6e4; */
    color: #fff;
    font-size: 20px;
    margin: 0 20px;
`

export const NameTitle = styled.div`
    text-decoration: none;
    font-weight: 800;
    font-size: 40px;
    padding: 20px 40px 20px;
    margin: 20px 35px 10px;
    color: #085077;
    width: 325px;

     @media (max-width: 768px) {
        font-size: 30px;
        padding: 0;
        margin: 20px 10px 10px
    }

`

export const NavTitle = styled.div`
    font-size: 20px;
    /* color: #e4d6e4; */
    color: #fff;

        &:hover {
            font-weight: 500;
            color: #fff;
        }

             @media (max-width: 768px) {
                font-size: 14px;
             }
`

export const PDFLink = styled.a`
    text-decoration: none;
`