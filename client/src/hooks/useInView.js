import { useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const canObserve = () => typeof window !== 'undefined' && 'IntersectionObserver' in window;

// Reports when an element first scrolls into view. Becomes "visible" straight away when
// IntersectionObserver is unavailable or the visitor prefers reduced motion. Always starts
// false so the pre-rendered HTML and the browser's first render match (hydration).
export default function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return undefined;
    if (!canObserve() || prefersReducedMotion()) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, inView]);

  return [ref, inView];
}

// Tracks whether an element is on screen right now (unlike useInView, which fires only once),
// and whether it has ever come within `nearMargin` of the screen. Used to pause autoplay
// while a section is scrolled away and to start loading its images just before it arrives.
export function useOnScreen(nearMargin = '600px 0px') {
  const ref = useRef(null);
  const [onScreen, setOnScreen] = useState(false);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canObserve()) {
      setOnScreen(true);
      setNear(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    const nearIo = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setNear(true);
      nearIo.disconnect();
    }, { rootMargin: nearMargin });
    io.observe(el);
    nearIo.observe(el);
    return () => {
      io.disconnect();
      nearIo.disconnect();
    };
  }, [nearMargin]);

  return [ref, onScreen, near];
}
