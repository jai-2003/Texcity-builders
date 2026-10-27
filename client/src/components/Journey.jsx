import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../hooks/useInView';

// "Our Journey So Far" on the About page. A sticky panel on the left shows the current
// milestone's year (it swaps as you scroll); on the right a rail fills with accent colour as
// the visitor scrolls through the list, and each milestone lights up once it reaches the middle
// of the screen. Styles: "Journey" block in index.css.
const Journey = ({ items }) => {
  const listRef = useRef(null);
  const [active, setActive] = useState(() => (prefersReducedMotion() ? items.length - 1 : 0));
  const [progress, setProgress] = useState(() => (prefersReducedMotion() ? 1 : 0));

  useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return undefined;
    let frame = 0;

    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.55;
      const box = list.getBoundingClientRect();
      setProgress(Math.min(1, Math.max(0, (mid - box.top) / box.height)));
      let current = 0;
      [...list.children].forEach((li, i) => {
        if (li.getBoundingClientRect().top < mid) current = i;
      });
      setActive(current);
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

  const current = items[active];

  return (
    <div className="journey">
      <aside className="journey-panel" aria-hidden="true">
        <span className="journey-count">
          {String(active + 1).padStart(2, '0')} <i>/ {String(items.length).padStart(2, '0')}</i>
        </span>
        <span className="journey-year" key={current.year}>{current.year}</span>
        <span className="journey-title" key={current.title}>{current.title}</span>
        <span className="journey-bar"><i style={{ transform: `scaleX(${(active + 1) / items.length})` }} /></span>
      </aside>

      <ol className="journey-list" ref={listRef} style={{ '--progress': progress }}>
        {items.map((m, i) => (
          <li className={`journey-item${i <= active ? ' is-reached' : ''}${i === active ? ' is-current' : ''}`} key={m.year + m.title}>
            <span className="journey-dot" aria-hidden="true" />
            <span className="journey-item-year">{m.year}</span>
            <h3>{m.title}</h3>
            <p>{m.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Journey;
