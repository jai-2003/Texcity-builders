import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../hooks/useInView';
import onFrame from '../lib/frameLoop';

// "Our Journey So Far" on the About page. A sticky panel on the left shows the current
// milestone's year (it swaps as you scroll); on the right a rail fills with accent colour as
// the visitor scrolls through the list, and each milestone lights up once it reaches the middle
// of the screen. Styles: "Journey" block in index.css.
const Journey = ({ items }) => {
  const listRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    // Reduced motion: show the finished state (set here, not in the initial state, so the
    // pre-rendered HTML matches the first render).
    if (prefersReducedMotion()) {
      list.style.setProperty('--progress', '1');
      setActive(items.length - 1);
      return undefined;
    }
    // Measured in the shared scroll loop's read phase (lib/frameLoop.js).
    return onFrame(
      () => {
        const mid = window.innerHeight * 0.55;
        const box = list.getBoundingClientRect();
        let current = 0;
        [...list.children].forEach((li, i) => {
          if (li.getBoundingClientRect().top < mid) current = i;
        });
        return { progress: Math.min(1, Math.max(0, (mid - box.top) / box.height)), current };
      },
      // The rail fill changes every frame, so it is written straight to the CSS variable;
      // React only re-renders when the current milestone changes.
      ({ progress: p, current }) => {
        list.style.setProperty('--progress', p.toFixed(4));
        setActive((prev) => (prev === current ? prev : current));
      },
    );
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

      <ol className="journey-list" ref={listRef} style={{ '--progress': 0 }}>
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
