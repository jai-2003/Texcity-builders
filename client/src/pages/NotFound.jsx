import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Seo from '../components/Seo';

const quickLinks = [
  { to: '/services', label: 'Services' },
  { to: '/packages', label: 'Packages' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const tape = Array.from({ length: 6 }, () => 'Page not found · 404 · Under construction · ').join('');

// 404 as a building site: the two 4s rise out of the ground, a tower crane draws itself in and
// lowers the missing 0 into the gap, where it keeps swinging on its cable. Styles: "404 page"
// block in index.css.
const NotFound = () => (
  <section className="nf">
    <Seo title="Page Not Found" description="The page you are looking for has moved or never existed." noindex />

    <svg className="nf-scene" viewBox="0 0 800 430" role="img" aria-label="404">
      {/* Tower crane */}
      <g className="nf-crane">
        <path className="nf-draw" style={{ '--d': 0 }} d="M742 400 V40 M766 400 V40 M742 400 L766 360 L742 320 L766 280 L742 240 L766 200 L742 160 L766 120 L742 80 L766 40" />
        <path className="nf-draw" style={{ '--d': 1 }} d="M290 40 H800 M290 62 H742 M290 40 L312 62 L334 40 L356 62 L378 40 L400 62 L422 40 L444 62 L466 40 L488 62 L510 40 L532 62 L554 40 L576 62 L598 40 L620 62 L642 40 L664 62 L686 40 L708 62 L730 40" />
        <path className="nf-draw" style={{ '--d': 2 }} d="M754 40 L754 6 M754 6 L300 40 M754 6 L800 40" />
        <rect className="nf-draw" style={{ '--d': 2 }} x="728" y="62" width="40" height="30" rx="4" />
        <rect className="nf-weight" x="776" y="44" width="22" height="26" rx="2" />
        <path className="nf-ground" d="M0 400 H800" />
      </g>

      {/* The two 4s rise out of the ground (clipped at ground level) */}
      <clipPath id="nf-above-ground">
        <rect x="0" y="-200" width="800" height="600" />
      </clipPath>
      <g className="nf-digits" clipPath="url(#nf-above-ground)">
        <text className="nf-four" x="190" y="398" textAnchor="middle">4</text>
        <text className="nf-four nf-four-2" x="610" y="398" textAnchor="middle">4</text>
      </g>

      {/* The 0: the trolley drives out along the jib, the cable pays out to lower the 0 into
          the gap, then it is left swinging on the hook. */}
      <g className="nf-travel">
        <rect className="nf-trolley" x="386" y="60" width="28" height="12" rx="3" />
        <g className="nf-swing">
          <path className="nf-cable" d="M400 72 V138" />
          <g className="nf-load">
            <path className="nf-hook" d="M400 138 V148 M393 148 H407 M400 148 V156 Q400 166 392 164" />
            <path className="nf-sling" d="M400 160 L352 196 M400 160 L448 196" />
            <text className="nf-zero" x="400" y="388" textAnchor="middle">0</text>
          </g>
        </g>
      </g>
    </svg>

    <div className="nf-copy">
      <h1>This page is still <em>under construction.</em></h1>
      <p className="section-lead">The page you are looking for has moved or was never built. Let's get you back on site.</p>
      <div className="nf-actions">
        <Link to="/" className="btn btn-primary btn-icon">Back to Home <Icon name="arrow-right" size={18} /></Link>
        <Link to="/contact" className="section-link">Report a broken link</Link>
      </div>
      <nav className="nf-links" aria-label="Popular pages">
        {quickLinks.map((link) => (
          <Link to={link.to} key={link.to}>{link.label}</Link>
        ))}
      </nav>
    </div>

    <div className="nf-tape" aria-hidden="true">
      <div className="nf-tape-track"><span>{tape}</span><span>{tape}</span></div>
    </div>
  </section>
);

export default NotFound;
