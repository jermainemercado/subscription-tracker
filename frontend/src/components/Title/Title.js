import React from 'react';
import Button from '../common/Button';
import arrow from '../../assets/images/arrow.svg';
import ScrollAnimation from 'react-animate-on-scroll';
const Title = () => {
  return (
    <div className="title">
      <ScrollAnimation animateIn="fadeIn" duration={3}>
        <h1>
          We Are The <span className="title_gradient">Kings</span>
          <br /> Of Ticket Reselling
        </h1>
        <h5 className="mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          <br /> Et nunc, non nulla in turpis sed.
        </h5>
      </ScrollAnimation>
      <div className="title_btnBox">
        <ScrollAnimation animateIn="fadeInDown">
          <Button
            label="Buy Membership"
            className="title_gradientBtn"
            bg="gradient"
          />
          <Button
            label="Learn More"
            className="title_gradientBorderBtn ml-4"
            border="gradient"
            icon={arrow}
            iconClassName="title_gradientBorderBtn-icon ml-3"
          />
        </ScrollAnimation>
      </div>
      <div className="title_checkbox mt-1">
        <label className="checkboxContainer">
          I have read and agree to the Terms & Conditions
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
};

export default Title;
