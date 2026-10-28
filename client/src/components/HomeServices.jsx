import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Icon from './Icon';
import { services } from '../data/content';

// Home page "Our Services" as a bento grid: every service gets a tile, two of them large
// photo tiles (the first service big, the fourth wide), the rest compact icon tiles, plus a
// green "view all" tile to finish the grid. Tile placement is set by grid areas a–h in
// index.css ("Home services"). The full Services page keeps its own layout (Services.jsx).
const AREAS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const PHOTO_TILES = new Set(['a', 'd']);

const HomeServices = () => {
  const tiles = services.slice(0, AREAS.length);

  return (
    <section className="section-padding bg-light home-svc" id="services">
      <div className="container">
        <div className="home-svc-head">
          <Reveal variant="left">
            <h2 className="section-title left-align">
              Complete Real Estate &amp; <em>Construction Solutions</em>
            </h2>
          </Reveal>
          <Reveal variant="right" delay={120} className="home-svc-intro">
            <p>
              End-to-end services tailored to your needs — from approvals and design to
              structure and handover, with a focus on quality and timely delivery.
            </p>
          </Reveal>
        </div>

        <div className="bento">
          {tiles.map((srv, i) => {
            const area = AREAS[i];
            const photo = PHOTO_TILES.has(area);
            return (
              <Reveal
                variant="up"
                delay={i * 70}
                className={`bento-tile bento-${area}${photo ? ' bento-photo' : ''}`}
                key={srv.slug}
              >
                <Link to={`/services#${srv.slug}`} className="bento-link">
                  {photo && <img src={srv.img} alt="" className="bento-img" loading="lazy" decoding="async" />}
                  <div className="bento-top">
                    <span className="bento-icon">
                      <Icon name={srv.icon} size={photo ? 22 : 20} />
                    </span>
                    <span className="bento-num">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="bento-content">
                    <h3>{srv.title}</h3>
                    <p>{srv.desc}</p>
                    {area === 'a' && (
                      <ul className="bento-tags">
                        {srv.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <span className="bento-arrow" aria-hidden="true">
                    <Icon name="arrow-right" size={18} />
                  </span>
                </Link>
              </Reveal>
            );
          })}

          <Reveal variant="up" delay={tiles.length * 70} className="bento-tile bento-h bento-cta">
            <Link to="/services" className="bento-link">
              <span className="bento-cta-count">{services.length}</span>
              <div className="bento-content">
                <h3>View all services</h3>
                <p>Timelines, what&apos;s included and who each service is for.</p>
              </div>
              <span className="bento-arrow" aria-hidden="true">
                <Icon name="arrow-right" size={18} />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default HomeServices;
