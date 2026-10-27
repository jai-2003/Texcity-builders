import React from 'react';
import PageHero from '../components/PageHero';
import Projects from '../components/Projects';
import CallToAction from '../components/CallToAction';
import Seo from '../components/Seo';
import heroHouse from '../assets/hero-house-projects.webp';
import { stats } from '../data/content';

const ProjectsPage = () => (
  <>
    <Seo
      title="Projects — Villas, Apartments & Commercial Buildings"
      description="Browse completed and ongoing Texcity Builders projects across Coimbatore: gated villa communities, RERA-registered apartments, offices and IT parks."
    />
    <PageHero
      word="Projects"
      title={<>Spaces we've<em>already built.</em></>}
      description="Completed and ongoing villas, apartments and commercial developments across Coimbatore — filter by type, or open any project for its full details."
      ctaLabel="View Projects"
      ctaHref="#projects"
      stats={[stats[1], stats[3]]}
      house={heroHouse}
      houseAlt="A two-storey modern villa with a balcony built by Texcity Builders"
      houseRatio={0.6457}
    />
    <Projects heading="Every Project, Completed and Ongoing" lead="Filter by category or status. Each project page lists the specifications, amenities and location." />
    <CallToAction />
  </>
);

export default ProjectsPage;
