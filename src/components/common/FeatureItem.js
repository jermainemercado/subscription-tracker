import React from 'react';
import { Media } from 'reactstrap';
import ScrollAnimation from 'react-animate-on-scroll';
const FeatureItem = ({
  dataSrc,
  title,
  subtitle,
  id,
  isHover,
  delay,
  setIsHover,
}) => {
  return (
    <ScrollAnimation animateIn="fadeIn" delay={delay}>
      <div
        className={` featureItem ${isHover === id && 'featureItem_hover'} `}
        onMouseEnter={() => setIsHover(id)}
        onMouseLeave={() => setIsHover(id)}
      >
        <Media>
          <Media left>
            <Media
              src={dataSrc}
              alt="placeholder image"
              className="featureItem_image"
            />
          </Media>
          <Media body>
            <Media heading className="featureItem_title ml-4">
              {title}
            </Media>
            <p className="featureItem_subtitle ml-4">{subtitle}</p>
          </Media>
        </Media>
      </div>
    </ScrollAnimation>
  );
};

export default FeatureItem;
