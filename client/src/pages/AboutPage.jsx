import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Parallax from '../components/Parallax';
import Icon from '../components/Icon';
import StatsRow from '../components/StatsRow';
import Pillars from '../components/Pillars';
import Journey from '../components/Journey';
import Seo from '../components/Seo';
import { ProcessBlock } from '../components/WhyChooseUs';
import CallToAction from '../components/CallToAction';
import heroHouse from '../assets/hero-house-about.webp';
import heroHouseSmall from '../assets/hero-house-about-sm.webp';
import buildingExcellenceImg from '../assets/building-excellence.webp';
import { about, stats } from '../data/content';

const AboutPage = () => (
  <>
    <Seo
      title="About Us — Coimbatore Construction Company Since 2015"
      description="Meet Texcity Builders: architects, structural engineers and site teams in Coimbatore who plan, approve and build homes and commercial spaces under one roof since 2015."
    />
    <PageHero
      word="About"
      title={<>Built on trust.<em>Grown through craft.</em></>}
      description="A Coimbatore construction and real estate company that plans, approves and builds under one roof — so you deal with one accountable team from the first sketch to the keys."
      ctaLabel="Our Story"
      ctaHref="#story"
      stats={[stats[0], stats[2]]}
      house={heroHouse}
      houseSmall={heroHouseSmall}
      houseAlt="A single-storey bungalow lit up at dusk, built by Texcity Builders"
      houseRatio={0.4543}
      houseScale={1.3125}
      houseOffsetX={5}
    />

    {/* Our story */}
    <section className="section-padding bg-white has-blueprint" id="story">
      <Parallax speed={0.12} className="blueprint" aria-hidden="true" />
      <div className="container">
        <div className="about-layout">
          <Reveal variant="left" className="about-image">
            <div className="about-media">
              <Parallax as="img" speed={0.07} max={36} src={buildingExcellenceImg} alt="Building Legacies Since 2015 - 8+ Years of Building Excellence" className="rounded-img" />
            </div>
            <Parallax speed={-0.1} max={30} className="experience-badge">
              <h3>10+</h3>
              <p>Years of Excellence</p>
            </Parallax>
          </Reveal>
          <Reveal variant="right" delay={150} className="about-content">
            <h2 className="section-title left-align">{about.story.title}</h2>
            {about.story.paragraphs.map((text) => (
              <p className="about-text-content" key={text}>{text}</p>
            ))}
            <ul className="highlight-list">
              {about.highlights.map((item, i) => (
                <Reveal as="li" variant="up" delay={200 + i * 90} key={item}>{item}</Reveal>
              ))}
            </ul>
          </Reveal>
        </div>

        <StatsRow />
        <Pillars />
      </div>
    </section>

    {/* Milestones */}
    <section className="section-padding bg-light">
      <div className="container">
        <Reveal className="section-heading center">
          <h2 className="section-title">Our Journey So Far</h2>
          <p className="section-lead">From a single villa project to a full-service construction company — the moments that shaped how we build today.</p>
        </Reveal>
        <Journey items={about.milestones} />
      </div>
    </section>

    {/* How we work */}
    <section className="section-padding bg-navy">
      <div className="container">
        <Reveal className="section-heading center">
          <h2 className="section-title">Five Steps From Idea to Handover</h2>
          <p className="section-lead">A clear, repeatable process keeps every project predictable — for you and for our site teams.</p>
        </Reveal>
        <ProcessBlock />
      </div>
    </section>

    {/* Approvals & assurance: heading on the left, certificate-style cards on the right */}
    <section className="section-padding bg-light assurance">
      <div className="container assurance-layout">
        <Reveal variant="left" className="assurance-intro">
          <h2 className="section-title left-align">Built by the <em>Book</em></h2>
          <p className="section-lead">Every project is planned to comply with local regulations and backed by documentation you can verify.</p>
          <Link to="/contact" className="assurance-link">
            Ask to see the documents <Icon name="arrow-right" size={16} />
          </Link>
        </Reveal>

        <div className="assurance-grid">
          {about.approvals.map((item, i) => (
            <Reveal variant="up" delay={i * 100} className="cert" key={item.title}>
              <div className="cert-top">
                <span className="cert-seal">
                  <Icon name={item.icon} size={22} />
                </span>
                <span className="cert-no">No. {String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <CallToAction />
  </>
);

export default AboutPage;
