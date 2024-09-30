import React from 'react';
import {  ContactHeader, ContactLink, ContactTitle, ContactWrapper, SocialCont, ContactCont } from './styles';


function About() {

    return (
      <ContactWrapper className="Contact">
        <ContactTitle>Hit me up!</ContactTitle>
        
        <ContactCont>
            <ContactHeader>Reach out about the AP?</ContactHeader>
            <ContactLink href="mailto:eesomonu@ap.com">eesomonu@ap.com</ContactLink>
        </ContactCont>
        <ContactCont>
            <ContactHeader>Or want to know more about me?</ContactHeader>
            <ContactLink href="mailto:eesomonu@gmail.com">eesomonu@gmail.com</ContactLink>
        </ContactCont>
        <ContactCont>
            <ContactHeader>On social media?</ContactHeader>
            <SocialCont>
              <ContactLink href="https://www.linkedin.com/in/eesomonu/">LinkedIn</ContactLink>
              <ContactLink href="https://www.instagram.com/eesomonu/">Instagram</ContactLink>
              <ContactLink href="https://app.thestorygraph.com/profile/euni_reads">StoryGraph</ContactLink>
            </SocialCont>
        </ContactCont>
        <ContactCont>
          <ContactHeader>Check out my Code</ContactHeader>
            <ContactLink href="https://github.com/esomo22e">Github</ContactLink>
          </ContactCont>

      </ContactWrapper>
    )

}

export default About;