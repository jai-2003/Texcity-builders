import React, { useEffect, useRef } from 'react';
import Icon from './Icon';
import { prefersReducedMotion } from '../hooks/useInView';
import onFrame from '../lib/frameLoop';

// Shared "big word behind the house" hero, used at the top of Services, About, Projects and
// Contact. A giant word sits behind a cut-out villa; on arrival the house appears first, then
// the word rises from behind the roof. As the visitor scrolls, the word travels up faster
// than the house. Each page passes its own `house` image so the four pages show four
// different villas. Styles: "Services hero" block in index.css (class names kept as svc-hero*
// since this started as the Services-only hero before being generalised to every inner page).
//
// `fullBleed`: the house image fills the entire hero instead of sitting as a smaller cut-out
// column. The word stays visible (near the top, solid white with a heavy shadow instead of its
// usual light-sky gradient fill — see the .svc-hero-photo rules in index.css) since it needs to
// read against whatever part of the photo sits behind it, not a plain sky.
//
// `houseRatio`: the house image's true height/width ratio (e.g. 845/1860). Used only to
// position the word, which assumes a ~0.663 ratio by default (see --house-h in index.css) —
// pass the real one whenever a house photo's own shape is noticeably different, or the word
// ends up floating above the roof instead of tucked behind it.
//
// `houseScale`: multiplies the house's default width (1 = normal size). Use it to make one
// page's house bigger or smaller than the others without touching the shared --house-w formula.
//
// `houseOffsetX`: nudges the house sideways in px from its default position (positive = left,
// negative = right), per page.
const PageHero = ({ word, title, description, ctaLabel, ctaHref, stats, house, houseSmall, houseAlt, fullBleed = false, houseRatio, houseScale, houseOffsetX }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;
    const layers = {
      word: el.querySelector('.svc-hero-word'),
      house: el.querySelector('.svc-hero-house'),
      copy: el.querySelector('.svc-hero-copy'),
      stats: el.querySelector('.svc-hero-stats'),
    };
    // The word's resting position leaves room for the real navbar height, not a guess — this
    // keeps letters from rendering under the navbar on short/wide windows. Measured and applied
    // in the shared scroll loop (lib/frameLoop.js): read sizes first, then write styles.
    let navH = -1;
    return onFrame(
      () => {
        const nav = document.querySelector('nav.navbar');
        const h = el.offsetHeight;
        return { navH: nav ? nav.offsetHeight : -1, p: Math.min(1, Math.max(0, window.scrollY / h)), vh: h / 100 };
      },
      (m) => {
        if (m.navH !== navH && m.navH >= 0) {
          navH = m.navH;
          el.style.setProperty('--nav-h', `${navH}px`);
        }
        const { p, vh } = m;
        layers.word.style.transform = `translateY(${(-p * 60 * vh).toFixed(1)}px)`;
        layers.word.style.opacity = (1 - Math.max(0, p - 0.3) * 1.6).toFixed(3);
        layers.house.style.transform = `translateY(${(-p * 14 * vh).toFixed(1)}px) scale(${(1 + p * 0.06).toFixed(3)})`;
        layers.copy.style.transform = `translateY(${(-p * 26 * vh).toFixed(1)}px)`;
        layers.copy.style.opacity = (1 - p * 1.5).toFixed(3);
        layers.stats.style.transform = `translateY(${(-p * 34 * vh).toFixed(1)}px)`;
        layers.stats.style.opacity = (1 - p * 1.5).toFixed(3);
      },
    );
  }, []);

  const vars = {};
  if (houseRatio) vars['--house-ratio'] = houseRatio;
  if (houseScale) vars['--house-scale'] = houseScale;
  if (houseOffsetX) vars['--house-offset-x'] = `${houseOffsetX}px`;

  return (
    <section
      className={`svc-hero${fullBleed ? ' svc-hero-photo' : ''}`}
      style={Object.keys(vars).length ? vars : undefined}
      ref={ref}
    >
      <div className="svc-hero-sky" aria-hidden="true" />

      {/* Layer 1: the word, behind the house (hidden in the fullBleed variant — see note above) */}
      <div className="svc-hero-word" aria-hidden="true">
        <span>{word}</span>
      </div>

      {/* Layer 2: the villa, in front */}
      <div className="svc-hero-house">
        <picture>
          {/* `houseSmall`: a lighter version for phones, where the full-size file is wasted bandwidth */}
          {houseSmall && <source media="(max-width: 760px)" srcSet={houseSmall} />}
          <img src={house} alt={houseAlt} className="svc-hero-img" fetchPriority="high" decoding="async" />
        </picture>
      </div>

      <div className="svc-hero-fade" aria-hidden="true" />

      <div className="container svc-hero-inner">
        <div className="svc-hero-copy">
          <h1>{title}</h1>
          <p>{description}</p>
          <a href={ctaHref} className="btn btn-primary btn-icon">{ctaLabel} <Icon name="arrow-right" size={18} /></a>
        </div>
        <ul className="svc-hero-stats">
          {stats.map((stat) => (
            <li key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PageHero;
