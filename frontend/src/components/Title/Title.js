import React from 'react';
import Button from '../common/Button';
import arrow from '../../assets/images/arrow.svg';
import ScrollAnimation from 'react-animate-on-scroll';

import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_yntCy3sFi63sgvtAxK7344Il')

const Title = () => {
  
  const clickHandler = async (event) => {
    console.log("Button clicked")
    // fetch stripe promise
    const stripe = await stripePromise;
    // fetch our response from the BE endpoint, session  json
    const response = await fetch('/payment/createCheckoutSession', { method: 'POST' });
    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error)
    }
  };

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
            role="link"
            handleClick={clickHandler}
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
