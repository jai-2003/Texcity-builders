import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Icon from './Icon';
import useInView from '../hooks/useInView';
import { services } from '../data/content';

// Service panels: tall photo strips side by side, one open at a time (hover, focus or tap to
// open another). Becomes a vertical accordion on narrow screens. `limit` shows the first few
// (home page) with a link to the full list. Styles: "Services" block in index.css.
const Services = ({ limit }) => {
  const shown = limit ? services.slice(0, limit) : services;
  const [ref, inView] = useInView(0.2);
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding bg-light" id="services">
      <div className="container">
        <div className="services-header">
          <Reveal variant="left" className="services-title-area">
            <span className="badge">Our Services</span>
            <h2 className="section-title left-align">Complete Real Estate &amp; Construction Solutions</h2>
            <p className="section-lead">We offer end-to-end real estate and construction services tailored to your needs, with a focus on quality, innovation and timely delivery.</p>
          </Reveal>
          <Reveal variant="right" delay={150} className="services-slogan">
            <h3>From concept <em>to completion</em></h3>
          </Reveal>
        </div>

        <div className={`svc-panels${inView ? ' is-visible' : ''}`} ref={ref}>
          {shown.map((srv, i) => {
            const open = i === active;
            return (
              <article
                className={`svc-panel${open ? ' is-open' : ''}`}
                style={{ '--i': i }}
                onMouseEnter={() => setActive(i)}
                key={srv.slug}
              >
                <img src={srv.img} alt="" className="svc-panel-img" loading="lazy" />
                <span className="svc-panel-num">{String(i + 1).padStart(2, '0')}</span>

                {/* Collapsed state: a vertical label that opens the panel on click/focus. */}
                <button type="button" className="svc-panel-tab" aria-expanded={open} onClick={() => setActive(i)} onFocus={() => setActive(i)}>
                  <span className="svc-panel-tab-icon"><Icon name={srv.icon} size={20} /></span>
                  <span className="svc-panel-tab-title">{srv.title}</span>
                </button>

                <div className="svc-panel-body" inert={!open}>
                  <span className="svc-panel-icon"><Icon name={srv.icon} size={24} /></span>
                  <h3>{srv.title}</h3>
                  <p>{srv.desc}</p>
                  <ul className="svc-panel-points">
                    {srv.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <Link to={`/services#${srv.slug}`} className="svc-panel-link">Learn More <Icon name="arrow-right" size={16} /></Link>
                </div>
              </article>
            );
          })}
        </div>

        {limit && (
          <Reveal className="section-footer">
            <Link to="/services" className="btn btn-primary btn-lg">View All Services <Icon name="arrow-right" size={18} /></Link>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default Services;
