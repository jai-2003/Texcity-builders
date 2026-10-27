import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Parallax from './Parallax';
import Icon from './Icon';
import StatsRow from './StatsRow';
import useInView from '../hooks/useInView';
import { about } from '../data/content';

// Short "who we are" section used on the home page; the full story (and the full copy —
// this trims the intro paragraph and highlight list to roughly half) lives on /about.
const About = () => {
  // The walkthrough video only starts downloading once this frame is about to scroll into
  // view — it's a 15MB file, so visitors who never reach this section never fetch it.
  const [mediaRef, mediaInView] = useInView(0.2);

  return (
    <section className="section-padding about-compact bg-white has-blueprint" id="about">
      <Parallax speed={0.12} className="blueprint" aria-hidden="true" />
      <div className="container">
        <div className="about-layout">
          <Reveal variant="left" className="about-content">
            <span className="badge">Who We Are</span>
            <h2 className="section-title left-align">{about.title}</h2>
            {about.paragraphs.slice(0, 1).map((text) => (
              <p className="about-text-content" key={text}>{text}</p>
            ))}
            <ul className="highlight-list">
              {about.highlights.slice(0, 2).map((item, i) => (
                <Reveal as="li" variant="up" delay={200 + i * 90} key={item}>{item}</Reveal>
              ))}
            </ul>
            <div className="about-actions">
              <Link to="/about" className="btn btn-primary">More About Us</Link>
              <Link to="/contact" className="section-link">Talk to our team <Icon name="arrow-right" size={18} /></Link>
            </div>
          </Reveal>
          <Reveal variant="right" delay={150} className="about-image">
            {/* The video drifts slower than the page and the badge faster, for depth. */}
            <div className="about-media" ref={mediaRef}>
              <Parallax
                as="video"
                speed={0.07}
                max={36}
                className="rounded-img"
                src={mediaInView ? '/about-video.mp4' : undefined}
                poster="/about-video-poster.webp"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                aria-label="A walkthrough of a home built by Texcity Builders"
              />
            </div>
            <Parallax speed={-0.1} max={30} className="experience-badge">
              <h3>10+</h3>
              <p>Years of Excellence</p>
            </Parallax>
          </Reveal>
        </div>

        <StatsRow />
      </div>
    </section>
  );
};

export default About;
