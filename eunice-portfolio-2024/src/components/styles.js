import styled from "styled-components";

export const ContentWrapper = styled.div`
    padding: 20px 80px;
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
    font-size: 35px;
    font-weight: 400;
    margin: 20px 0;
`

export const LinkText = styled.a`
    font-weight: 600;
    text-decoration: none;
    color: #a23e17;



    &:hover {
        transition: text-decoration 0.3s ease;
        text-decoration: underline;
    }
`