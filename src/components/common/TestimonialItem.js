import React from 'react';
import { Media } from 'reactstrap';

const TestimonialItem = ({ dataSrc, title, subtitle }) => {
  return (
    <div className="testimonialItem">
      <Media>
        <Media left>
          <Media
            src={dataSrc}
            alt="placeholder image"
            className="testimonialItem_image"
          />
        </Media>
        <Media body>
          <Media heading className="testimonialItem_title ml-4">
            {title}
          </Media>
          <p className="testimonialItem_subtitle ml-4">{subtitle}</p>
        </Media>
      </Media>
    </div>
  );
};

export default TestimonialItem;
