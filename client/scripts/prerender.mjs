// Pre-renders each route to static HTML after `vite build` (see the "build" script).
// Visitors then see the page as soon as the HTML arrives instead of waiting for JavaScript;
// React attaches to the existing markup afterwards (src/main.jsx). Each page also gets its
// own <title>, description, canonical URL and social tags. (No modulepreload hints: on slow
// connections they compete with the stylesheet and delay the first paint.)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const routes = ['/', '/about', '/services', '/packages', '/contact'];

const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const setAttr = (html, selector, attr, value) => html.replace(
  new RegExp(`(<${selector}[^>]*\\s${attr}=")[^"]*(")`),
  (_, a, b) => `${a}${esc(value)}${b}`,
);

// The page is already visible from the HTML, so the JavaScript that makes it interactive is
// fetched at low priority: the stylesheet, hero image and fonts get the bandwidth first.
const lowPriority = (html) => html
  .replace(/<script type="module" crossorigin/g, '<script type="module" fetchpriority="low" crossorigin')
  .replace(/<link rel="modulepreload" crossorigin/g, '<link rel="modulepreload" fetchpriority="low" crossorigin');

for (const route of routes) {
  const { html: body, seo } = await render(route);
  let page = lowPriority(template).replace('<div id="root"></div>', `<div id="root" data-route="${route}">${body}</div>`);

  if (seo) {
    page = page.replace(/<title>[^<]*<\/title>/, `<title>${esc(seo.title)}</title>`);
    page = setAttr(page, 'meta name="description"', 'content', seo.description);
    page = setAttr(page, 'link rel="canonical"', 'href', seo.url);
    page = setAttr(page, 'meta property="og:title"', 'content', seo.title);
    page = setAttr(page, 'meta property="og:description"', 'content', seo.description);
    page = setAttr(page, 'meta property="og:url"', 'content', seo.url);
    page = setAttr(page, 'meta name="twitter:title"', 'content', seo.title);
    page = setAttr(page, 'meta name="twitter:description"', 'content', seo.description);
    if (seo.noindex) page = setAttr(page, 'meta name="robots"', 'content', 'noindex, follow');
  }

  // Written as both about/index.html and about.html: static hosts differ in which one they
  // serve for "/about" (vite preview uses about.html), and each page's canonical URL is set.
  const outs = route === '/'
    ? [path.join(dist, 'index.html')]
    : [path.join(dist, route.slice(1), 'index.html'), path.join(dist, `${route.slice(1)}.html`)];
  for (const out of outs) {
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, page);
  }
  console.log(`prerendered ${route.padEnd(10)} ${(Buffer.byteLength(page) / 1024).toFixed(1)} KB  ${seo ? seo.title : ''}`);
}

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
