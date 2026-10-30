import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Icon from './Icon';
import { cta, company } from '../data/content';

// Closing call-to-action above the footer: a dark rounded card with a soft green glow and a
// faint grid, the headline on the left, two pill buttons on the right and a contact line
// under a divider. Styles: "Call-to-action card" block in index.css.
const CallToAction = () => (
  <section className="cta-band" id="cta">
    <div className="container">
      <Reveal variant="up" className="cta-card">
        <div className="cta-main">
          <div className="cta-copy">
            <h2>{cta.title}</h2>
            <p>{cta.text}</p>
          </div>
          <div className="cta-actions">
            <Link to={cta.primary.to} className="cta-btn cta-btn-primary">
              {cta.primary.label}
              <Icon name="arrow-right" size={17} />
            </Link>
            <Link to="/services" className="cta-btn cta-btn-ghost">View our services</Link>
          </div>
        </div>

        <p className="cta-foot">
          <span>Prefer to talk first?</span>
          <a href={company.phoneHref} className="cta-foot-phone">
            <Icon name="phone" size={15} />
            {company.phone}
          </a>
          <span className="cta-foot-dot" aria-hidden="true">·</span>
          <span>Based in Coimbatore, building homes and workplaces across the city.</span>
        </p>
      </Reveal>
    </div>
  </section>
);

export default CallToAction;
