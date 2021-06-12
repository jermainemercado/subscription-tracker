import React from 'react';
import {
  ScrollingProvider,
  useScrollSection,
  Section,
} from 'react-scroll-section';
import Header from 'components/Header';
import Title from 'components/Title';
import Aboutus from 'components/Aboutus';
import Features from 'components/Features';
import Testimonials from 'components/Testimonials';
import Questions from 'components/Questions';
import Updated from 'components/Updated';
import Footer from 'components/Footer';

const Main = () => {
  const aboutusSection = useScrollSection('aboutus');
  return (
    <ScrollingProvider>
      <div className="main">
        <Header clickAboutus={aboutusSection.onClick} />
        <Title />
        <Section id="aboutus">
          <Aboutus />
        </Section>
        <Section id="features">
          <Features />
        </Section>
        <Section id="success">
          <Testimonials />
        </Section>
        <Section id="FAQ">
          <Questions />
        </Section>
        <Updated />
        <Footer />
      </div>
    </ScrollingProvider>
  );
};

export default Main;
