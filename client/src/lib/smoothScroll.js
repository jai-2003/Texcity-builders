import Lenis from 'lenis';

let lenis = null;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Phones and tablets scroll natively (Lenis leaves touch alone anyway), so skipping Lenis there
// avoids a requestAnimationFrame loop that would run for the whole visit for no benefit.
const isTouchOnly = () => window.matchMedia('(hover: none) and (pointer: coarse)').matches;

// Space left for the fixed navbar, taken from `scroll-padding-top` on <html> in index.css so
// native anchor jumps, Lenis (which honours it by itself) and the fallback all agree.
const navOffset = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;

// Starts inertial smooth scrolling for the whole site (wheel and keyboard; touch stays native)
// and routes same-page links (href="#...") through it. Returns a cleanup function.
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion() || isTouchOnly()) return () => {};

  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
  let frame = requestAnimationFrame(function raf(time) {
    lenis.raf(time);
    frame = requestAnimationFrame(raf);
  });

  const onClick = (event) => {
    const link = event.target.closest && event.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (hash.length < 2) return;
    const target = document.querySelector(hash);
    if (!target) return;
    event.preventDefault();
    scrollTo(target);
    window.history.replaceState(null, '', hash);
  };
  document.addEventListener('click', onClick);

  return () => {
    document.removeEventListener('click', onClick);
    cancelAnimationFrame(frame);
    lenis.destroy();
    lenis = null;
  };
}

// Scrolls to an element, selector or pixel position. `immediate: true` jumps without easing.
// Falls back to native scrolling when Lenis is not running (reduced motion, touch devices).
export function scrollTo(target, options = {}) {
  if (lenis) {
    lenis.scrollTo(target, options);
    return;
  }
  let top = 0;
  if (typeof target === 'number') {
    top = target;
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) top = el.getBoundingClientRect().top + window.scrollY - navOffset();
  }
  window.scrollTo({ top: Math.max(0, top), behavior: options.immediate ? 'instant' : 'smooth' });
}
