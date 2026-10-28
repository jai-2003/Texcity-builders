import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
// Served from public/heroes with fixed names so index.html can start loading the right one
// before this code arrives (see the preload script there).
const heroBg = '/heroes/services-hero-bg.webp';
const heroBgSmall = '/heroes/services-hero-bg-sm.webp';
import { services, stats } from '../data/content';

// Services page hero: full-bleed photo (engineer overlooking the city) with a dark blue fade
// from the left. Everything sits in one left-aligned column (headline, intro, CTAs, glass
// stats strip) so the right half stays clear for the photo. Styles: "Services hero (photo)"
// in index.css.
const ServicesHero = () => (
  <section className="sv-hero">
    {/* Phones always get the 800px version: high-density screens would otherwise pick the
        full-size file, and the photo sits under a dark overlay where the extra detail is lost. */}
    <picture>
      <source media="(max-width: 760px)" srcSet={heroBgSmall} />
      <img
        src={heroBg}
        srcSet={`${heroBgSmall} 800w, ${heroBg} 1641w`}
        sizes="100vw"
        alt=""
        className="sv-hero-bg"
        fetchPriority="high"
        decoding="async"
      />
    </picture>
    <div className="sv-hero-shade" aria-hidden="true" />

    <div className="container">
      <div className="sv-hero-copy">
        <h1 className="hero-anim" style={{ '--d': '0.1s' }}>
          Designing spaces.
          <em>Building legacies.</em>
        </h1>
        <p className="hero-anim" style={{ '--d': '0.2s' }}>
          Approvals, architectural and structural design, interiors and layout development —
          one team from concept to completion.
        </p>

        <div className="sv-hero-actions hero-anim" style={{ '--d': '0.3s' }}>
          <a href="#services" className="btn btn-primary btn-icon">
            Explore Services <Icon name="arrow-right" size={18} />
          </a>
          <Link to="/contact" className="btn btn-outline-light btn-icon">
            <Icon name="phone" size={16} /> Free Consultation
          </Link>
        </div>

        <ul className="sv-hero-stats hero-anim" style={{ '--d': '0.4s' }}>
          {stats.slice(0, 2).map((stat) => (
            <li key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </li>
          ))}
          <li>
            <strong>{services.length}</strong>
            <span>Services, one team</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default ServicesHero;
