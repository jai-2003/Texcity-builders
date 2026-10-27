import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '../data/content';

const BRAND = 'Texcity Builders';

// Finds the <meta>/<link> matching `selector` in <head> (creating it from `attrs` if missing)
// and sets one attribute on it.
const setTag = (tag, selector, attrs, key, value) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute(key, value);
};
const setMeta = (name, content) => setTag('meta', `meta[name="${name}"]`, { name }, 'content', content);
const setProperty = (property, content) => setTag('meta', `meta[property="${property}"]`, { property }, 'content', content);

// Per-page search and social metadata. index.html carries the home-page defaults for crawlers
// that don't run JavaScript; this keeps <head> in step as the visitor moves between routes.
// `title` is the page name (the brand is appended), `image` a site path or absolute URL,
// `noindex` keeps a page (e.g. 404) out of search results, `jsonLd` adds page-specific
// structured data.
const Seo = ({ title, description, image = site.image, type = 'website', noindex = false, jsonLd }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | ${BRAND}` : `${BRAND} | Construction & Real Estate in Coimbatore`;
    const url = `${site.url}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;
    const imageUrl = image.startsWith('http') ? image : `${site.url}${image}`;

    document.title = fullTitle;
    setMeta('description', description);
    setMeta('robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    setTag('link', 'link[rel="canonical"]', { rel: 'canonical' }, 'href', url);

    setProperty('og:type', type);
    setProperty('og:title', fullTitle);
    setProperty('og:description', description);
    setProperty('og:url', url);
    setProperty('og:image', imageUrl);
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', imageUrl);

    let script = document.getElementById('page-jsonld');
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'page-jsonld';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, image, type, noindex, jsonLd, pathname]);

  return null;
};

export default Seo;
