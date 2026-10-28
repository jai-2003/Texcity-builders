import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Icon from './Icon';
import { prefersReducedMotion } from '../hooks/useInView';
import onFrame from '../lib/frameLoop';
import { services } from '../data/content';

// Services page: stacking scroll cards. Each service is a large card (photo + details) that
// pins near the top of the screen (position: sticky); the next card slides up over it, and the
// covered cards shrink and dim slightly so the stack reads like a deck. The shrink/dim is
// driven by one scroll handler below. `limit` shows only the first few services.
// Styles: "Services — stacking cards" in index.css.
const Services = ({ limit }) => {
  const shown = limit ? services.slice(0, limit) : services;
  const stackRef = useRef(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack || prefersReducedMotion()) return undefined;
    const cards = [...stack.querySelectorAll('.stack-card')];

    // Read every card's position first, then write every transform (lib/frameLoop.js):
    // writing a card's transform before measuring the next one would force a re-layout.
    return onFrame(
      () => cards.map((card, i) => {
        const next = cards[i + 1];
        if (!next) return 0;
        // How far the next card has slid over this one (0 = not yet, 1 = fully covering).
        const top = card.getBoundingClientRect().top;
        return Math.min(1, Math.max(0, 1 - (next.getBoundingClientRect().top - top) / card.offsetHeight));
      }),
      (progress) => progress.forEach((p, i) => {
        const inner = cards[i].firstElementChild;
        inner.style.transform = p ? `scale(${(1 - p * 0.06).toFixed(4)})` : '';
        inner.style.filter = p ? `brightness(${(1 - p * 0.18).toFixed(3)})` : '';
      }),
    );
  }, []);

  return (
    <section className="section-padding bg-light stack-section" id="services">
      <div className="container">
        <div className="services-header">
          <Reveal variant="left" className="services-title-area">
            <h2 className="section-title left-align">Complete Real Estate &amp; Construction Solutions</h2>
            <p className="section-lead">We offer end-to-end real estate and construction services tailored to your needs, with a focus on quality, innovation and timely delivery.</p>
          </Reveal>
          <Reveal variant="right" delay={150} className="services-slogan">
            <h3>From concept <em>to completion</em></h3>
          </Reveal>
        </div>

        <div className="stack" ref={stackRef}>
          {shown.map((srv, i) => (
            <article className="stack-card" style={{ '--i': i }} key={srv.slug}>
              <div className={`stack-card-inner${i % 2 ? ' is-dark' : ''}`}>
                <div className="stack-media">
                  {/* Phones show this photo as a short 170px strip, so 600px is plenty */}
                  <picture>
                    <source media="(max-width: 760px)" srcSet={srv.cover.replace('w=1000', 'w=600')} />
                    <img src={srv.cover} alt="" loading="lazy" decoding="async" />
                  </picture>
                  <span className="stack-num">
                    {String(i + 1).padStart(2, '0')} <i>/ {String(shown.length).padStart(2, '0')}</i>
                  </span>
                </div>

                <div className="stack-body">
                  <span className="stack-icon"><Icon name={srv.icon} size={24} /></span>
                  <h3>{srv.title}</h3>
                  <p>{srv.desc}</p>
                  <ul className="stack-points">
                    {srv.points.map((point) => (
                      <li key={point}><Icon name="check" size={14} strokeWidth={2.4} /> {point}</li>
                    ))}
                  </ul>
                  <div className="stack-meta">
                    <span><Icon name="clock" size={15} /> {srv.duration}</span>
                    <span><Icon name="users" size={15} /> {srv.idealFor}</span>
                  </div>
                  <div className="stack-actions">
                    <a href={`#${srv.slug}`} className="stack-more">
                      See what&apos;s included <Icon name="arrow-right" size={16} />
                    </a>
                    <Link to="/contact" className="stack-enquire">Enquire</Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
