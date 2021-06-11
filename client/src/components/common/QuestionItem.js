import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
const QuestionItem = ({ title, content, isHover, id, setIsHover, delay }) => {
  return (
    <ScrollAnimation animateIn="fadeIn" delay={delay}>
      <div
        className={`d-inline-flex questionItem mt-4 ${
          isHover === id && 'questionItem-hover'
        }`}
        onMouseEnter={() => setIsHover(id)}
        onMouseLeave={() => setIsHover(id)}
      >
        <div className={`questionItem_titleBox`}>{title}</div>
        <div className="questionItem_contentBox">{content}</div>
      </div>
    </ScrollAnimation>
  );
};

export default QuestionItem;
