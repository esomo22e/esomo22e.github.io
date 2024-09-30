import React from 'react';
import { ContentWrapper, Intro, TextCont, LinkText } from './styles';
import { Link } from 'react-router-dom';

function Home() {

    return (
      <ContentWrapper className="Home">
        <Intro>Hey, I am a data and visual journalist, artist, and technologist.</Intro>
        <TextCont>I am interested in using the intersection of data, design, and technology to  build engagement tools, produce 
          strategies for digital projects, and to create accessible, engaging visual storytelling. 
        </TextCont>
        <TextCont>
          Currently, I work at the <LinkText href="https://apnews.com/">Associated Press</LinkText> as a Data Visualization Developer. I previously worked at <LinkText href="https://news.northeastern.edu/author/eesomonu/">News @ Notheastern</LinkText>, 
          <LinkText href="https://www.bostonglobe.com/">The Boston Globe</LinkText>, <LinkText href = "https://hms.harvard.edu/">Harvard Medical School</LinkText>, and <LinkText href="https://www.npr.org/">NPR</LinkText>.
          </TextCont>
        <TextCont>In the meantime in-between time, I like to cook/bake, crochet, and reading romance novels.</TextCont>
        <TextCont>Want to know more? <Link to="/contact" style={{ textDecoration: 'underline', fontWeight: "600", color: "#cd3800" }}>
  Let's chat</Link></TextCont>
      </ContentWrapper>
    )
  
}

export default Home;