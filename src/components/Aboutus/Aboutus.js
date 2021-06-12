import React from 'react';
import logo from '../../assets/images/union1.svg';
import ScrollAnimation from 'react-animate-on-scroll';
const Aboutus = () => {
  return (
    <ScrollAnimation animateIn="fadeInDown" delay={20}>
      <div className="text-center aboutus">
        <img src={logo} alt="logo" />
        <h1 className="section_header mt-1">About Us</h1>
        <h5 className="aboutus_content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In etiam
          maecenas arcu sem adipiscing odio amet, bibendum. Lectus sodales amet
          mattis sed proin turpis purus vitae. Vitae in cras vivamus nunc
          condimentum amet magna lacinia. Elementum consequat ornare sed morbi.
          Condimentum non, aliquet libero nunc, lorem adipiscing. Viverra
          adipiscing diam nunc vitae vulputate.
        </h5>
      </div>
    </ScrollAnimation>
  );
};

export default Aboutus;
