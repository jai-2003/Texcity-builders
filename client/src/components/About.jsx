import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Parallax from './Parallax';
import Icon from './Icon';
import StatsRow from './StatsRow';
import { about } from '../data/content';
import whoWeAreImg from '../assets/who-we-are.webp';
import ArchitecturalBlueprint from './ArchitecturalBlueprint';

// Short "who we are" section used on the home page; the full story lives on /about.
const About = () => {
  return (
    <section className="section-padding about-compact bg-white has-blueprint" id="about">
      <Parallax speed={0.12} className="blueprint" aria-hidden="true" />
      <div className="container">
        <div className="about-layout">
          <Reveal variant="left" className="about-content">
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
            <div className="about-media">
              <ArchitecturalBlueprint
                imageSrc={whoWeAreImg}
                alt="Building communities with purpose - Sustainable architecture and engineering by Texcity Builders"
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
