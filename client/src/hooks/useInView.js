import { useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const canObserve = () => typeof window !== 'undefined' && 'IntersectionObserver' in window;

// Reports when an element first scrolls into view. Starts out "visible" when
// IntersectionObserver is unavailable or the visitor prefers reduced motion.
export default function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(() => !canObserve() || prefersReducedMotion());

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return undefined;
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
