import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './fonts.css'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Pages are pre-rendered to HTML at build time (scripts/prerender.mjs), marked with the route
// they were rendered for. If this HTML is for the current URL, React attaches to it (hydrate);
// otherwise (e.g. an unknown URL served the home page's file) it renders from scratch.
// Hydration waits until the pre-rendered page has painted once, so React's start-up work
// never sits in front of the first paint.
const path = location.pathname.replace(/\/+$/, '') || '/'
if (root.dataset.route === path) requestAnimationFrame(() => setTimeout(() => hydrateRoot(root, app)))
else createRoot(root).render(app)
