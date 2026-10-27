import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Parallax from './Parallax';
import Icon from './Icon';
import { cta, company } from '../data/content';

const CallToAction = () => (
  <section className="cta-band" id="cta">
    {/* Rings float on their own and also drift at different speeds as the page scrolls. */}
    <div className="cta-deco" aria-hidden="true">
      <Parallax as="span" speed={0.18} max={90} />
      <Parallax as="span" speed={-0.12} max={70} />
      <Parallax as="span" speed={0.3} max={110} />
    </div>
    <div className="container cta-inner">
      <Reveal variant="left" className="cta-copy">
        <span className="badge badge-dark">Let's Talk</span>
        <h2>{cta.title}</h2>
        <p>{cta.text}</p>
      </Reveal>
      <Reveal variant="right" delay={150} className="cta-actions">
        <Link to={cta.primary.to} className="btn btn-primary btn-lg">
          {cta.primary.label}
          <Icon name="arrow-right" size={18} />
        </Link>
        <a href={company.phoneHref} className="cta-phone">
          <Icon name="phone" size={18} />
          {company.phone}
        </a>
      </Reveal>
    </div>
  </section>
);

export default CallToAction;
