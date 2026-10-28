import React from 'react';
import Reveal from './Reveal';
import Icon from './Icon';
import { about } from '../data/content';

// Vision / Mission / Values. Vision and Mission read as statements (serif, with a large faint
// number); Values is a dark card listing each value on its own line. A pillar with a `values`
// array gets the list layout. Styles: "Pillars" block in index.css.
const Pillars = () => (
  <div className="pillars">
    <Reveal className="pillars-head">
      <h3>The purpose behind every project</h3>
    </Reveal>

    <div className="pillars-grid">
      {about.pillars.map((pillar, i) => {
        const isList = Array.isArray(pillar.values);
        return (
          <Reveal
            variant="up"
            delay={i * 120}
            className={`pillar${isList ? ' pillar-values' : ' pillar-statement'}`}
            key={pillar.title}
          >
            <div className="pillar-top">
              <span className="pillar-icon">
                <Icon name={pillar.icon} size={22} />
              </span>
              <span className="pillar-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            </div>

            <h4 className="pillar-label">{pillar.title}</h4>

            {isList ? (
              <ul className="pillar-list">
                {pillar.values.map((value) => (
                  <li key={value}>
                    <span className="pillar-check" aria-hidden="true">
                      <Icon name="check" size={13} strokeWidth={2.6} />
                    </span>
                    {value}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="pillar-text">{pillar.text}</p>
            )}
          </Reveal>
        );
      })}
    </div>
  </div>
);

export default Pillars;
