import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { packagesData } from '../data/packagesData';

// Packages-page hero: headline and CTAs on the left, a live "rate card" on the right that
// lists every tier straight from packagesData (so prices never drift from the cards below).
// Each rate row jumps to its own pricing card. Styles: "Packages hero" block in index.css.
const trustPoints = ['Fixed-rate contracts', 'Milestone-linked payments', 'Up to 10-year structural warranty'];

const PackagesHero = ({ stats = [] }) => (
  <section className="pkg-hero">
    <div className="pkg-hero-grid-bg" aria-hidden="true" />
    <div className="pkg-hero-glow" aria-hidden="true" />

    <div className="container pkg-hero-inner">
      <div className="pkg-hero-copy">
        <span className="badge badge-dark hero-anim" style={{ '--d': '0.05s' }}>
          Construction Packages · Coimbatore
        </span>
        <h1 className="hero-anim" style={{ '--d': '0.15s' }}>
          Clear pricing.
          <em>Uncompromised quality.</em>
        </h1>
        <p className="hero-anim" style={{ '--d': '0.25s' }}>
          Choose from our Standard, Premium and Ultra Luxury packages — all-inclusive per-sqft
          rates for independent villas, duplexes and custom homes, with zero hidden costs.
        </p>

        <div className="pkg-hero-actions hero-anim" style={{ '--d': '0.35s' }}>
          <a href="#packages" className="btn btn-primary btn-icon">
            Compare Packages <Icon name="arrow-right" size={18} />
          </a>
          <Link to="/contact" className="btn btn-outline-light btn-icon">
            <Icon name="phone" size={16} /> Get a Free Quote
          </Link>
        </div>

        <ul className="pkg-hero-trust hero-anim" style={{ '--d': '0.45s' }}>
          {trustPoints.map((point) => (
            <li key={point}>
              <Icon name="check" size={14} /> {point}
            </li>
          ))}
        </ul>
      </div>

      <aside className="pkg-hero-rates hero-anim" style={{ '--d': '0.3s' }} aria-label="Package rates">
        <div className="pkg-hero-rates-head">
          <span>Rate card</span>
          <em>per sq. ft.</em>
        </div>

        <ol className="pkg-hero-rate-list">
          {packagesData.map((pkg, i) => (
            <li key={pkg.id}>
              <a href={`#pkg-${pkg.id}`} className={`pkg-hero-rate${pkg.popular ? ' is-popular' : ''}`}>
                <span className="pkg-hero-rate-tier">0{i + 1}</span>
                <span className="pkg-hero-rate-info">
                  <strong>
                    {pkg.name.replace(' Package', '')}
                    {pkg.popular && <small>Popular</small>}
                  </strong>
                  <span>{pkg.tagline}</span>
                </span>
                <span className="pkg-hero-rate-price">
                  <sup>₹</sup>
                  {pkg.priceNumber}
                  <small style={{ fontSize: '0.45em', fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', marginLeft: '4px' }}>
                    per/sqft
                  </small>
                </span>
              </a>
            </li>
          ))}
        </ol>

        {stats.length > 0 && (
          <ul className="pkg-hero-stats">
            {stats.map((stat) => (
              <li key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  </section>
);

export default PackagesHero;
