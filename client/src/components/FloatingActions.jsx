import React, { useEffect, useState } from 'react';
import Icon from './Icon';
import { company } from '../data/content';
import { scrollTo } from '../lib/smoothScroll';
import onFrame from '../lib/frameLoop';

// Call and back-to-top buttons that slide in once the visitor has scrolled past the hero intro.
const FloatingActions = () => {
  const [show, setShow] = useState(false);

  // Checked once per frame in the shared scroll loop (not on every raw scroll event), and
  // React only re-renders when the value actually flips.
  useEffect(() => onFrame(
    () => window.scrollY > window.innerHeight * 1.5,
    (next) => setShow((prev) => (prev === next ? prev : next)),
  ), []);

  return (
    <div className={`fab-group${show ? ' show' : ''}`}>
      <a href={company.phoneHref} className="fab fab-call" aria-label={`Call ${company.phone}`}>
        <Icon name="phone" size={20} />
      </a>
      <button type="button" className="fab fab-top" aria-label="Back to top" onClick={() => scrollTo(0)}>
        <Icon name="arrow-up" size={20} />
      </button>
    </div>
  );
};

export default FloatingActions;
