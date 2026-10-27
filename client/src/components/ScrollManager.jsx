import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollTo } from '../lib/smoothScroll';

// On every route change: jump to the top of the new page, or glide to the
// element named in the URL hash (e.g. /services#villa-projects).
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    scrollTo(0, { immediate: true });
    if (!hash) return undefined;
    // Pages load lazily, so the target may not exist yet: retry for up to ~1.5s.
    let tries = 0;
    let timer = 0;
    const seek = () => {
      const target = document.querySelector(hash);
      if (target) scrollTo(target);
      else if (tries++ < 12) timer = setTimeout(seek, 120);
    };
    timer = setTimeout(seek, 120);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollManager;
