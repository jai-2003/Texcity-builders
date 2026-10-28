import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';
import { seoServer } from './components/Seo.jsx';

// Build-time renderer used by scripts/prerender.mjs: turns one route into HTML (waiting for
// its lazily loaded page) plus the page's title/description collected by <Seo>.
export async function render(url) {
  seoServer.current = null;
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  let html = '';
  for await (const chunk of prelude) html += chunk;
  return { html, seo: seoServer.current };
}
