import React from 'react';

import Button from '../common/Button';
import subtract from '../../assets/images/subtract.svg';

import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_yntCy3sFi63sgvtAxK7344Il')

const Footer = () => {
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
    <div className="footer d-flex justify-content-between">
      <div className="text-center footer_centerSmBlock">
        <img src={subtract} alt="subtract" />
        <div className="mt-4 footer_center">
          <p>
            © TicketKings 2021, All Rights Reserved.{' '}
            <span>| Designed by LK Design Solutions</span>
          </p>
        </div>
      </div>
      <div className="footer_btnBlock">
        <button className="footer_membershipBtn" onClick={clickHandler}>
          <p>Buy Membership</p>
        </button>
        <Button
          label="Contact Us"
          className="button-border-white footer_contactBtn"
        />
      </div>
      <div className="text-center footer_centerBlock">
        <img src={subtract} alt="subtract" />
        <div className="mt-4 footer_center">
          <p>
            © TicketKings 2021, All Rights Reserved.{' '}
            <span>| Designed by LK Design Solutions</span>
          </p>
        </div>
      </div>
      <div className="footer_linkBlock">
        <p className="mt-1">Important Links</p>
        <a href="#" className="mt-2">
          Terms & Conditions
        </a>
        <a href="#" className="mt-3">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default Footer;
