import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/useInView';
import onFrame from '../lib/frameLoop';

// Shifts its element vertically as the page scrolls, by `speed` times its distance from the
// viewport centre. Positive speed lags behind the page (reads as further away), negative speed
// runs ahead of it (closer). `max` clamps the shift in pixels so images never show their edges.
const Parallax = ({ as: Tag = 'div', speed = 0.1, max = Infinity, className = '', style, children, ...rest }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;
    let current = 0;
    // Only measure while the element is on or near the screen; off-screen ones keep their last
    // offset and cost nothing per frame.
    let visible = true;
    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: '200px 0px' })
      : null;
    if (io) io.observe(el);

    // Measure in the shared loop's read phase, move in its write phase (lib/frameLoop.js), so
    // all parallax elements on the page share one layout per frame.
    const stop = onFrame(
      () => {
        if (!visible) return current;
        const rect = el.getBoundingClientRect();
        // Subtract the shift already applied so the measurement is the element's natural position.
        const centre = rect.top - current + rect.height / 2 - window.innerHeight / 2;
        return Math.max(-max, Math.min(max, -centre * speed));
      },
      (next) => {
        if (next === current) return;
        current = next;
        el.style.translate = `0 ${current.toFixed(1)}px`;
      },
    );
    return () => {
      stop();
      if (io) io.disconnect();
      el.style.translate = '';
    };
  }, [speed, max]);

  const classes = ['parallax', className].filter(Boolean).join(' ');
  return (
    <Tag ref={ref} className={classes} style={style} {...rest}>
      {children}
    </Tag>
  );
};

export default Parallax;
