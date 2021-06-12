import React, { useState } from 'react';
import TestimonialItem from '../common/TestimonialItem';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import ScrollAnimation from 'react-animate-on-scroll';
import car from '../../assets/images/car.svg';

const Testimonials = () => {
  return (
    <div className="d-flex testimonials">
      <div className="testimonials_left">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="tkmembersuccess"
          options={{ height: 600, width: 430 }}
        />
      </div>
      <div className="testimonials_right">
        <ScrollAnimation animateIn="fadeIn" delay={100}>
          <h1 className="section_header">Testimonials</h1>
          <h6>& Success</h6>
          <h5>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nunc,
            non nulla in turpis sed.
          </h5>
        </ScrollAnimation>
        <div className="testimonials_scrollbox customscroll">
          <TestimonialItem
            dataSrc={car}
            title="“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum sit amet, enim, ut id. In enim vel arcu, adipiscing in consectetur turpis interdum.”"
            subtitle="- Lucas#5678"
          />
          <TestimonialItem
            dataSrc={car}
            title="“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum sit amet, enim, ut id. In enim vel arcu, adipiscing in consectetur turpis interdum.”"
            subtitle="- Lucas#5678"
          />
          <TestimonialItem
            dataSrc={car}
            title="“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum sit amet, enim, ut id. In enim vel arcu, adipiscing in consectetur turpis interdum.”"
            subtitle="- Lucas#5678"
          />
          <TestimonialItem
            dataSrc={car}
            title="“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum sit amet, enim, ut id. In enim vel arcu, adipiscing in consectetur turpis interdum.”"
            subtitle="- Lucas#5678"
          />
          <TestimonialItem
            dataSrc={car}
            title="“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum sit amet, enim, ut id. In enim vel arcu, adipiscing in consectetur turpis interdum.”"
            subtitle="- Lucas#5678"
          />
          <TestimonialItem
            dataSrc={car}
            title="“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum sit amet, enim, ut id. In enim vel arcu, adipiscing in consectetur turpis interdum.”"
            subtitle="- Lucas#5678"
          />
          <TestimonialItem
            dataSrc={car}
            title="“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum sit amet, enim, ut id. In enim vel arcu, adipiscing in consectetur turpis interdum.”"
            subtitle="- Lucas#5678"
          />
          <TestimonialItem
            dataSrc={car}
            title="“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum sit amet, enim, ut id. In enim vel arcu, adipiscing in consectetur turpis interdum.”"
            subtitle="- Lucas#5678"
          />
          <TestimonialItem
            dataSrc={car}
            title="“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum sit amet, enim, ut id. In enim vel arcu, adipiscing in consectetur turpis interdum.”"
            subtitle="- Lucas#5678"
          />
          <TestimonialItem
            dataSrc={car}
            title="“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum sit amet, enim, ut id. In enim vel arcu, adipiscing in consectetur turpis interdum.”"
            subtitle="- Lucas#5678"
          />
          <TestimonialItem
            dataSrc={car}
            title="“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum sit amet, enim, ut id. In enim vel arcu, adipiscing in consectetur turpis interdum.”"
            subtitle="- Lucas#5678"
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
