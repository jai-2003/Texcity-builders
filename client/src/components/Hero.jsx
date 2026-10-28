import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { heroStages } from '../data/content';
import initHeroFrames from '../lib/heroFrames';

// Splits a phrase into words so each one can animate in on its own (see .hero-title .word).
const Words = ({ text, offset = 0 }) =>
  text.split(' ').map((word, i) => (
    <React.Fragment key={`${word}-${i}`}>
      {i > 0 && ' '}
      <span className="word" style={{ '--i': offset + i }}>{word}</span>
    </React.Fragment>
  ));

const Hero = () => {
  // Scroll-driven frame video (lib/heroFrames.js). Frames are fetched once and cached, so
  // re-mounting after navigating back to the home page is instant.
  useEffect(() => initHeroFrames(), []);

  return (
    <section className="track" id="track">
      <div className="hero-container stage">
        <canvas id="c" aria-label="Video frames that advance as you scroll" role="img" className="hero-canvas"></canvas>
        <div className="hero-overlay"></div>

        {/* .cap elements are shown by lib/heroFrames.js while scroll progress is between data-from and data-to */}
        <div className="hero-content cap on" data-from="0" data-to="0.08">
          <h1 className="hero-title">
            <Words text="Building spaces that" />
            <em><Words text="last for generations" offset={3} /></em>
          </h1>
          <p className="hero-subtitle hero-anim" style={{ '--d': '0.85s' }}>
            Premium villas, apartments and commercial projects — planned, approved and built by one trusted team.
          </p>
          <div className="hero-buttons hero-anim" style={{ '--d': '1s' }}>
            {/* <Link to="/projects" className="btn btn-primary">View Our Projects</Link> */}
            <Link to="/services" className="btn btn-primary">Our Services</Link>
            <Link to="/contact" className="btn btn-outline-light">Book a Consultation</Link>
          </div>
        </div>

        {heroStages.map((stage) => (
          <div className="hero-stage cap" data-from={stage.from} data-to={stage.to} key={stage.step}>
            <span className="hero-stage-step">Stage {stage.step}</span>
            <h2>{stage.title}</h2>
            <p>{stage.text}</p>
          </div>
        ))}

        <div className="hero-progress" aria-hidden="true"><i id="fill"></i></div>

      </div>
    </section>
  );
};

export default Hero;
