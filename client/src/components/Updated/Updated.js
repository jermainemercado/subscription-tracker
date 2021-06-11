import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import updatedmain from '../../assets/images/updatedmain.svg';

const Updated = () => {
  return (
    <ScrollAnimation animateIn="fadeIn" delay={200}>
      <div className="text-center">
        <div className="d-inline-flex updated">
          <div className="updated_left">
            <img src={updatedmain} alt="updatedmain" />
            <p>Follow Us On Twitter</p>
          </div>
          <div className="updated_right">
            <h1 className="section_header">Stay Updated</h1>
            <h5>
              Follow Us on Twitter to stay updated on new giveaways and updates
              to Ticket Kings!
            </h5>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default Updated;
