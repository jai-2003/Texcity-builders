import React from 'react';
import Reveal from './Reveal';

// Accordion built on <details>, so it works without JavaScript and animates open in modern browsers.
const Faq = ({ items, title = 'Frequently asked questions', lead }) => (
  <section className="section-padding bg-light">
    <div className="container faq-layout">
      <Reveal variant="left" className="faq-intro">
        <h2 className="section-title left-align">{title}</h2>
        {lead && <p className="section-lead">{lead}</p>}
      </Reveal>
      <div className="faq-list">
        {items.map((item, i) => (
          <Reveal as="details" variant="up" delay={i * 60} className="faq-item" name="faq" key={item.q}>
            <summary>
              {item.q}
              <span className="faq-icon" aria-hidden="true" />
            </summary>
            <div className="faq-answer"><p>{item.a}</p></div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Faq;
