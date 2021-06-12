import React, { useState } from 'react';
import FeatureItem from '../common/FeatureItem';
import featuresmain from '../../assets/images/featuresmain.svg';
import information from '../../assets/images/information.svg';
import staff from '../../assets/images/staff.svg';
import video from '../../assets/images/video.svg';
import book from '../../assets/images/book.svg';
import ScrollAnimation from 'react-animate-on-scroll';

const Features = () => {
  const [hoverIndex, setHoverIndex] = useState(1);

  return (
    <div className="d-flex features">
      <div className="features_left">
        <ScrollAnimation animateIn="fadeIn" delay={100}>
          <h1 className="section_header">Our Features</h1>
          <h6>Here's what we offer</h6>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInLeft" delay={100}>
          <img src={featuresmain} alt="featuresmain" />
        </ScrollAnimation>
      </div>

      <div className="features_right">
        <FeatureItem
          dataSrc={information}
          title="Daily Information"
          subtitle="Stay up to date with onsale lists, presale codes, verified fan signups, price ranges, and all other information needed to succeed."
          delay={0}
          id={1}
          isHover={hoverIndex}
          setIsHover={setHoverIndex}
        />
        <FeatureItem
          dataSrc={staff}
          className="mt-4"
          title="Reponsive Staff"
          subtitle="No matter the issue, our dedicated staff members are eager to assist in a timely matter. We pride ourselves in fast support, especially when it matters most."
          delay={200}
          id={2}
          isHover={hoverIndex}
          setIsHover={setHoverIndex}
        />
        <FeatureItem
          dataSrc={video}
          className="mt-4"
          title="Video Tutorials"
          subtitle="No matter the issue, our dedicated staff members are eager to assist in a timely matter. We pride ourselves in fast support, especially when it matters most."
          delay={300}
          id={3}
          isHover={hoverIndex}
          setIsHover={setHoverIndex}
        />
        <FeatureItem
          dataSrc={book}
          className="mt-4"
          title="Best Practices"
          subtitle="No matter the issue, our dedicated staff members are eager to assist in a timely matter. We pride ourselves in fast support, especially when it matters most."
          delay={400}
          id={4}
          isHover={hoverIndex}
          setIsHover={setHoverIndex}
        />
      </div>
    </div>
  );
};

export default Features;
