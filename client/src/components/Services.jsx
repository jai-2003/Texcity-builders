import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Icon from './Icon';
import { prefersReducedMotion, useOnScreen } from '../hooks/useInView';
import { services } from '../data/content';

const AUTOPLAY_MS = 3500;

// Services page: a slider of tall photo cards that moves right to left on its own. The centre
// card is full size and the side cards are zoomed out and dimmed. The list is rendered three
// times so it can keep sliding the same way: once it drifts into the first or last copy it
// jumps (without a transition) to the same card in the middle copy.
// `limit` shows only the first few services. Styles: "Services — card slider" in index.css.
const Services = ({ limit }) => {
  const shown = limit ? services.slice(0, limit) : services;
  const n = shown.length;
  const slides = [...shown, ...shown, ...shown];

  const [index, setIndex] = useState(n);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [touchX, setTouchX] = useState(null);
  // Autoplay only while the slider is on screen, so it costs nothing elsewhere on the page.
  // Photos are requested only once it comes near, so they never compete with the hero image
  // (the browser's own lazy loading starts them while the page is still loading).
  const [sliderRef, inView, near] = useOnScreen();

  // Rapid clicks can outrun the jump back to the middle copy, so never step past the copies.
  const go = (step) => setIndex((i) => Math.min(3 * n - 1, Math.max(0, i + step)));

  useEffect(() => {
    if (paused || !inView || prefersReducedMotion()) return undefined;
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((i) => Math.min(3 * n - 1, i + 1));
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, inView, n]);

  // After a no-transition jump, turn the transition back on once the new position has painted.
  useEffect(() => {
    if (animate) return undefined;
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(frame);
  }, [animate]);

  const handleTransitionEnd = (e) => {
    // Card zoom transitions bubble up here too; only the track's own slide counts.
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
    if (index >= 2 * n || index < n) {
      setAnimate(false);
      setIndex(n + (((index - n) % n) + n) % n);
    }
  };

  const handleTouchEnd = (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    setTouchX(null);
  };

  return (
    <section className="section-padding bg-light" id="services">
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
      </div>

      <div
        className="svc-slider"
        ref={sliderRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={(e) => { setPaused(true); setTouchX(e.touches[0].clientX); }}
        onTouchEnd={handleTouchEnd}
        aria-roledescription="carousel"
      >
        <div
          className={`svc-track${animate ? '' : ' no-anim'}`}
          style={{ '--index': index }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((srv, k) => {
            const i = k % n;
            const active = k === index;
            return (
              <article
                className={`svc-card${active ? ' is-active' : ''}`}
                key={`${srv.slug}-${k}`}
                inert={!active}
                aria-hidden={!active}
                onClick={active ? undefined : () => setIndex(k)}
              >
                {near && <img className="svc-photo" src={srv.cover} alt="" loading="lazy" decoding="async" />}

                <div className="svc-top">
                  <span className="svc-icon"><Icon name={srv.icon} size={22} /></span>
                  <span className="svc-num">{String(i + 1).padStart(2, '0')}</span>
                </div>

                <div className="svc-body">
                  <h3>{srv.title}</h3>
                  <p>{srv.desc}</p>
                  <ul className="svc-points">
                    {srv.points.map((point) => (
                      <li key={point}><Icon name="check" size={14} strokeWidth={2.6} /> {point}</li>
                    ))}
                  </ul>
                  <div className="svc-meta">
                    <span><Icon name="clock" size={14} /> {srv.duration}</span>
                    <span><Icon name="users" size={14} /> {srv.idealFor}</span>
                  </div>
                  <div className="svc-actions">
                    <a href={`#${srv.slug}`} className="svc-more">
                      See what&apos;s included <Icon name="arrow-right" size={15} />
                    </a>
                    <Link to="/contact" className="svc-enquire">Enquire</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="container svc-controls">
        <button type="button" className="svc-arrow" onClick={() => go(-1)} aria-label="Previous service">
          <Icon name="arrow-left" size={18} />
        </button>
        <div className="svc-dots">
          {shown.map((srv, i) => (
            <button
              type="button"
              key={srv.slug}
              className={`svc-dot${index % n === i ? ' is-active' : ''}`}
              onClick={() => setIndex(n + i)}
              aria-label={`Show ${srv.title}`}
            />
          ))}
        </div>
        <button type="button" className="svc-arrow" onClick={() => go(1)} aria-label="Next service">
          <Icon name="arrow-right" size={18} />
        </button>
      </div>
    </section>
  );
};

export default Services;
