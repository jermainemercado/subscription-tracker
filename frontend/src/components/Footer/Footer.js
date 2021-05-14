import React from 'react';

import Button from '../common/Button';
import subtract from '../../assets/images/subtract.svg';

const Footer = () => {
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
        <button className="footer_membershipBtn">
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
