import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/useInView';

// Shifts its element vertically as the page scrolls, by `speed` times its distance from the
// viewport centre. Positive speed lags behind the page (reads as further away), negative speed
// runs ahead of it (closer). `max` clamps the shift in pixels so images never show their edges.
const Parallax = ({ as: Tag = 'div', speed = 0.1, max = Infinity, className = '', style, children, ...rest }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;
    let frame = 0;
    let current = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // Subtract the shift already applied so the measurement is the element's natural position.
      const centre = rect.top - current + rect.height / 2 - window.innerHeight / 2;
      current = Math.max(-max, Math.min(max, -centre * speed));
      el.style.translate = `0 ${current.toFixed(1)}px`;
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
