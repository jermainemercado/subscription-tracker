import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import QuestionItem from '../common/QuestionItem';

const Questions = () => {
  const [hoverIndex, setHoverIndex] = React.useState(1);
  return (
    <div className="questions">
      <ScrollAnimation animateIn="fadeIn" delay={100}>
        <h1 className="section_header">Frequently Asked Questions</h1>
        <h6>Find your answers here</h6>
      </ScrollAnimation>
      <div className="mt-5">
        <QuestionItem
          title="What makes TicketKings unique?"
          content="Proven success, top notch information, valuable tools, and a supportive community. These four elements define who we are, and separate us from the rest."
          active
          delay={100}
          id={1}
          isHover={hoverIndex}
          setIsHover={setHoverIndex}
        />
        <QuestionItem
          title="What do I need to resell tickets?"
          content="Other than a computer, all you need is capital! Everyone starts from somewhere, but we recommend starting with around $1,000 in purchasing power."
          delay={200}
          id={2}
          isHover={hoverIndex}
          setIsHover={setHoverIndex}
        />
        <QuestionItem
          title="How much profit should I expect?"
          content="Profit depends on a few things, but with just a little bit of experience, members can turn thousands each month – and often more. Check out our success to see for yourself!"
          delay={300}
          id={3}
          isHover={hoverIndex}
          setIsHover={setHoverIndex}
        />
        <QuestionItem
          title="What does TicketKings have to offer for experienced brokers?"
          content="Stop paying for multiple different services! We are an “All-In-One” server offering lists, presale codes, signups, experienced chats, software, and more."
          delay={400}
          id={4}
          isHover={hoverIndex}
          setIsHover={setHoverIndex}
        />
      </div>
    </div>
  );
};

export default Questions;
