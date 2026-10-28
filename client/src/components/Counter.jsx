import React, { useEffect, useState } from 'react';
import useInView, { prefersReducedMotion } from '../hooks/useInView';

const parse = (value) => String(value).match(/^([^\d]*)([\d.]+)(.*)$/);

// Counts up to a figure such as "120+" or "2.5M" the first time it scrolls into view.
const Counter = ({ value, duration = 1600 }) => {
  const [ref, inView] = useInView(0.5);
  // Always starts at zero so the pre-rendered HTML matches the first render (hydration);
  // reduced-motion visitors jump straight to the final figure in the effect below.
  const [display, setDisplay] = useState(() => {
    const parts = parse(value);
    return parts ? `${parts[1]}0${parts[3]}` : value;
  });

  useEffect(() => {
    const parts = parse(value);
    if (!inView || !parts) return undefined;
    if (prefersReducedMotion()) {
      setDisplay(value);
      return undefined;
    }
    const [, prefix, number, suffix] = parts;
    const target = parseFloat(number);
    const decimals = (number.split('.')[1] || '').length;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return <span ref={ref}>{display}</span>;
};

export default Counter;
