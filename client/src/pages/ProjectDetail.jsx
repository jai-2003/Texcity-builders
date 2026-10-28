import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Parallax from '../components/Parallax';
import Icon from '../components/Icon';
import Projects from '../components/Projects';
import CallToAction from '../components/CallToAction';
import Seo from '../components/Seo';
import NotFound from './NotFound';
import { prefersReducedMotion } from '../hooks/useInView';
import { projects, site } from '../data/content';

// Writes the element's scroll progress (0 → 1) into its --p custom property, without
// re-rendering. Progress = (a·vh − top) / (h·height + b·vh), clamped: `a` sets where it starts
// (fraction of the viewport the element's top must reach), `h` and `b` how far it travels.
const useScrollVar = (a, h, b) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (prefersReducedMotion()) {
      el.style.setProperty('--p', '1');
      return undefined;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const box = el.getBoundingClientRect();
      const p = (a * vh - box.top) / (h * box.height + b * vh);
      el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [a, h, b]);
  return ref;
};

// Project detail page: cinematic hero, spec strip, scroll-lit overview, a photo that widens
// as it scrolls in, amenity tiles, and previous/next project links. Styles: "Project detail"
// block in index.css.
const ProjectDetail = () => {
  const { slug } = useParams();
  const wordsRef = useScrollVar(0.85, 1, 0.4);
  const showcaseRef = useScrollVar(1, 0.5, 0.5);
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return <NotFound />;

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const ongoing = project.status === 'Ongoing';
  const [intro, ...rest] = project.description;
  const words = intro.split(' ');

  const specs = [
    { icon: 'calendar', label: ongoing ? 'Expected completion' : 'Completed', value: project.year },
    { icon: 'home', label: 'Units', value: project.units },
    { icon: 'building', label: 'Built-up area', value: project.area },
    { icon: 'key', label: 'Category', value: project.category },
  ];

  return (
    <>
      <Seo
        title={`${project.title} — ${project.category} in ${project.location.split(',')[0]}`}
        description={`${intro} ${project.details}. ${project.status === 'Ongoing' ? `Expected completion ${project.year}` : `Completed ${project.year}`}.`}
        image={project.cover}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: `${site.url}/projects` },
            { '@type': 'ListItem', position: 3, name: project.title, item: `${site.url}/projects/${project.slug}` },
          ],
        }}
      />
      {/* key: replay the entrance animation when moving between projects */}
      <header className="pd-hero" key={project.slug}>
        <Parallax speed={0.3} max={180} className="pd-hero-media" aria-hidden="true">
          <img src={project.cover} alt="" />
        </Parallax>
        <div className="container pd-hero-inner">
          <div className="pd-hero-tags">
            <span className={`pd-status${ongoing ? ' is-ongoing' : ''}`}>{project.status}</span>
            <span className="pd-tag">{project.category}</span>
          </div>
          <h1 className="pd-title">
            {project.title.split(' ').map((word, i) => (
              <span className="pd-word" key={word + i}>
                <span style={{ '--i': i }}>{word}</span>
              </span>
            ))}
          </h1>
          <p className="pd-location"><Icon name="map" size={18} /> {project.location}</p>
        </div>
        <span className="pd-hero-year" aria-hidden="true">{project.year}</span>
      </header>

      <div className="container">
        <dl className="pd-specs">
          {specs.map((spec, i) => (
            <Reveal variant="up" delay={i * 110} className="pd-spec" key={spec.label}>
              <span className="pd-spec-icon"><Icon name={spec.icon} size={20} /></span>
              <div>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>

      <section className="section-padding bg-white" id="overview">
        <div className="container pd-overview">
          <Reveal variant="left" className="pd-overview-head">
            <h2 className="section-title left-align">About {project.title}</h2>
          </Reveal>
          <div className="pd-overview-body">
            {/* Each word brightens in turn as the paragraph scrolls through the screen. */}
            <p className="pd-lit" ref={wordsRef} style={{ '--n': words.length }}>
              {words.map((word, i) => (
                <span style={{ '--i': i }} key={word + i}>{word} </span>
              ))}
            </p>
            {rest.map((text) => (
              <Reveal as="p" variant="up" className="pd-text" key={text}>{text}</Reveal>
            ))}
            <Reveal variant="up" className="pd-actions">
              <Link to="/contact" className="btn btn-primary btn-icon">Enquire About This Project <Icon name="arrow-right" size={18} /></Link>
              <Link to="/projects" className="section-link">Back to all projects</Link>
            </Reveal>
          </div>
        </div>

        {/* The frame starts inset and narrow, and opens to full width as it reaches mid-screen. */}
        <div className="container">
          <figure className="pd-showcase" ref={showcaseRef}>
            <img src={project.cover} alt={project.title} loading="lazy" />
            <figcaption>
              <strong>{project.title}</strong>
              <span>{project.details}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section-padding bg-navy pd-amenities">
        <div className="container">
          <Reveal className="section-heading center">
            <h2 className="section-title">Everything Included at {project.title}</h2>
          </Reveal>
          <ul className="pd-amenity-grid">
            {project.amenities.map((item, i) => (
              <Reveal as="li" variant="zoom" delay={i * 90} className="pd-amenity" key={item}>
                <span className="pd-amenity-num">{String(i + 1).padStart(2, '0')}</span>
                <svg className="pd-check" viewBox="0 0 32 32" aria-hidden="true">
                  <circle cx="16" cy="16" r="14" />
                  <path d="M10 16.5 L14.5 21 L22.5 12" />
                </svg>
                <span className="pd-amenity-text">{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <nav className="pd-pager" aria-label="More projects">
        {[{ dir: 'Previous project', p: prev }, { dir: 'Next project', p: next }].map(({ dir, p }) => (
          <Link to={`/projects/${p.slug}`} className={`pd-pager-link${dir.startsWith('Next') ? ' is-next' : ''}`} key={dir}>
            <img src={p.img} alt="" loading="lazy" />
            <span className="pd-pager-text">
              <small>{dir}</small>
              <strong>{p.title}</strong>
              <span>{p.location}</span>
            </span>
            <span className="pd-pager-arrow"><Icon name="arrow-right" size={20} /></span>
          </Link>
        ))}
      </nav>

      <Projects limit={3} filters={false} exclude={project.slug} heading="More Projects" lead="Other developments you may like to explore." />
      <CallToAction />
    </>
  );
};

export default ProjectDetail;
