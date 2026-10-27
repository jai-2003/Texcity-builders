import React, { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import Icon from './Icon';
import AnimatedIcon from './AnimatedIcon';
import useInView, { prefersReducedMotion } from '../hooks/useInView';
import { reasons, process } from '../data/content';

const pad = (n) => String(n).padStart(2, '0');

// The five-step process as a build-progress track; used inside WhyChooseUs and on its own on
// the About page. Scrolling fills the track (horizontal on wide screens, vertical on narrow
// ones) and a "% built" marker rides its leading edge; each step lights up and plays its icon
// once the fill reaches its node. Styles: "Process track" block in index.css.
export const ProcessBlock = () => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(() => (prefersReducedMotion() ? 1 : 0));
  const [reached, setReached] = useState(() => (prefersReducedMotion() ? process.length : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const box = el.getBoundingClientRect();
      const vertical = window.matchMedia('(max-width: 900px)').matches;
      // Wide: fill while the track's top moves from 80% to 30% of the screen.
      // Narrow: fill as the list scrolls past the 60% line, so the edge follows the reader.
      const p = vertical ? (vh * 0.6 - box.top) / box.height : (vh * 0.8 - box.top) / (vh * 0.5);
      const clamped = Math.min(1, Math.max(0, p));
      setProgress(clamped);
      // A step is reached once the fill's leading edge passes the centre of its node.
      const track = el.querySelector('.ptrack-line').getBoundingClientRect();
      const edge = vertical ? track.top + clamped * track.height : track.left + clamped * track.width;
      let count = 0;
      el.querySelectorAll('.ptrack-node').forEach((node) => {
        const r = node.getBoundingClientRect();
        if ((vertical ? r.top + r.height / 2 : r.left + r.width / 2) <= edge + 1) count += 1;
      });
      setReached(count);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="process-block">
      <Reveal as="h3" variant="blur" className="process-title">Our Process</Reveal>
      <div className="ptrack" ref={ref} style={{ '--p': progress }}>
        <div className="ptrack-line" aria-hidden="true">
          <span className="ptrack-fill" />
          <span className="ptrack-marker">
            <Icon name="hardhat" size={14} /> {Math.round(progress * 100)}% built
          </span>
        </div>
        <ol className="ptrack-steps">
          {process.map((step, i) => (
            <li className={`ptrack-step${i < reached ? ' is-reached' : ''}`} key={step.title}>
              <span className="ptrack-node">
                <AnimatedIcon name={step.icon} size={40} playing={i < reached} />
              </span>
              <div className="ptrack-body">
                <span className="process-index">Step {pad(i + 1)}</span>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

const CYCLE_MS = 4500;

// Reasons showcase: a feature panel shows one reason at a time and auto-advances while the
// section is on screen; the list beside it selects a reason on hover/click (which pauses the
// cycle). Styles: "Why Choose Us" block in index.css.
const WhyChooseUs = ({ showProcess = true }) => {
  const [ref, inView] = useInView(0.3);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoplay = inView && !paused && !prefersReducedMotion();

  useEffect(() => {
    if (!autoplay) return undefined;
    const timer = setTimeout(() => setActive((a) => (a + 1) % reasons.length), CYCLE_MS);
    return () => clearTimeout(timer);
  }, [autoplay, active]);

  const current = reasons[active];

  return (
    <section className="section-padding bg-navy" id="why-us">
      <div className="container">
        <Reveal className="section-heading center">
          <span className="badge badge-dark">Why Choose Us</span>
          <h2 className="section-title">Built on Trust, Delivered With Care</h2>
          <p className="section-lead">Every project we take on is backed by clear communication, proven engineering and a commitment to the timeline we promise.</p>
        </Reveal>

        <div
          className={`why-layout${showProcess ? '' : ' no-process'}${inView ? ' is-visible' : ''}`}
          ref={ref}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="why-feature" aria-live="polite">
            <span className="why-feature-bg" key={`bg-${active}`} aria-hidden="true"><AnimatedIcon name={current.icon} size={280} playing={false} /></span>
            <div className="why-feature-body" key={active}>
              <span className="why-feature-count">{pad(active + 1)} <i>/ {pad(reasons.length)}</i></span>
              <span className="why-feature-icon"><AnimatedIcon name={current.icon} size={64} playing={inView} /></span>
              <h3>{current.title}</h3>
              <p>{current.text}</p>
            </div>
          </div>

          <ol className="why-list">
            {reasons.map((reason, i) => (
              <li style={{ '--i': i }} key={reason.title}>
                <button
                  type="button"
                  className={`why-item${i === active ? ' is-active' : ''}`}
                  aria-pressed={i === active}
                  onMouseEnter={() => { setActive(i); setPaused(true); }}
                  onFocus={() => { setActive(i); setPaused(true); }}
                  onClick={() => { setActive(i); setPaused(true); }}
                >
                  <span className="why-item-num">{pad(i + 1)}</span>
                  <span className="why-item-icon"><AnimatedIcon name={reason.icon} size={28} playing={i === active && inView} /></span>
                  <span className="why-item-title">{reason.title}</span>
                  <Icon name="arrow-right" size={18} />
                  {i === active && autoplay && <span className="why-item-timer" style={{ '--cycle': `${CYCLE_MS}ms` }} aria-hidden="true" />}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {showProcess && <ProcessBlock />}
      </div>
    </section>
  );
};

export default WhyChooseUs;
