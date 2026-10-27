import React from 'react';
import { marqueeItems } from '../data/content';

// Credentials ticker under the hero. The list is rendered twice so the loop is seamless.
const Marquee = () => (
  <div className="marquee" aria-label="Our credentials">
    <div className="marquee-track">
      {[...marqueeItems, ...marqueeItems].map((item, i) => (
        <span className="marquee-item" key={`${item}-${i}`} aria-hidden={i >= marqueeItems.length}>
          <i className="marquee-dot" />
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;
