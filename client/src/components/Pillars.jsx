import React from 'react';
import Reveal from './Reveal';
import Icon from './Icon';
import { about } from '../data/content';

// Vision / Mission / Values. Vision and Mission are stacked statement cards on the left; the
// pillar with a `values` array becomes the tall dark Values card on the right, with each value
// as a tile. Styles: "Pillars" block in index.css.
const Pillars = () => {
  const statements = about.pillars.filter((p) => !Array.isArray(p.values));
  const values = about.pillars.find((p) => Array.isArray(p.values));

  return (
    <div className="pillars">
      <Reveal className="pillars-head">
        <h3>The purpose behind every project</h3>
      </Reveal>

      <div className="pillars-grid">
        {statements.map((pillar, i) => (
          <Reveal variant="left" delay={i * 120} className="pillar-statement" key={pillar.title}>
            <span className="pillar-icon">
              <Icon name={pillar.icon} size={22} />
            </span>
            <div>
              <h4 className="pillar-label">{pillar.title}</h4>
              <p className="pillar-text">{pillar.text}</p>
            </div>
          </Reveal>
        ))}

        {values && (
          <Reveal variant="right" delay={120} className="pillar-values">
            <div className="pillar-values-head">
              <span className="pillar-icon">
                <Icon name={values.icon} size={22} />
              </span>
              <h4 className="pillar-label">{values.title}</h4>
            </div>
            <p className="pillar-values-intro">{values.text}</p>
            <ul className="pillar-list">
              {values.values.map((value) => (
                <li key={value}>
                  <span className="pillar-check" aria-hidden="true">
                    <Icon name="check" size={13} strokeWidth={2.6} />
                  </span>
                  {value}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </div>
  );
};

export default Pillars;
