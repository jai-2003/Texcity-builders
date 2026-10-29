# Texcity Builders website

React + Vite site, pre-rendered to static HTML at build time.

```sh
npm install
npm run dev       # local development server
npm run build     # production build: client bundle, SSR render, then scripts/prerender.mjs
npm run preview   # serve the production build from dist/
npm run lint      # oxlint
```

- Site copy, contact details and services: `src/data/content.js`
- Pages: `src/pages`, sections: `src/components`, styles: `src/index.css`
- Scroll-driven hero frames: `public/hero-frames` (loaded by `src/lib/heroFrames.js`)
