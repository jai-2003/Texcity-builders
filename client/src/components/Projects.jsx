import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Parallax from './Parallax';
import Icon from './Icon';
import { projects, projectFilters } from '../data/content';

const matches = (project, filter) => {
  if (filter === 'All') return true;
  if (filter === 'Ongoing') return project.status === 'Ongoing';
  return project.category === filter;
};

// Project cards. `limit` shows a featured few (home page), `filters` toggles the category buttons,
// `exclude` hides one project (used under a project's own page), `heading` can swap the title.
const Projects = ({ limit, filters = true, exclude, heading = 'Spaces That Inspire Better Living', lead }) => {
  const [filter, setFilter] = useState('All');
  let visible = projects.filter((p) => matches(p, filter) && p.slug !== exclude);
  if (limit) visible = visible.slice(0, limit);

  return (
    <section className="section-padding bg-white" id="projects">
      <div className="container">
        <div className="projects-header">
          <Reveal variant="left">
            <h2 className="section-title left-align">{heading}</h2>
            <p className="section-lead">{lead || 'Explore our completed and ongoing projects that reflect our commitment to quality, innovation and customer satisfaction.'}</p>
          </Reveal>
          {filters && (
            <Reveal variant="right" delay={150} className="filters" role="group" aria-label="Filter projects">
              {projectFilters.map((name) => (
                <button
                  type="button"
                  key={name}
                  className={`filter-btn${filter === name ? ' active' : ''}`}
                  aria-pressed={filter === name}
                  onClick={() => setFilter(name)}
                >
                  {name}
                </button>
              ))}
            </Reveal>
          )}
        </div>

        {/* Keyed on the filter so the cards re-mount and animate in again after every change. */}
        <div className={`projects-grid${limit ? ' featured' : ''}`} key={filter}>
          {visible.map((proj, i) => (
            <Reveal as="article" variant="zoom" delay={(i % 3) * 100} className="project-card" key={proj.slug}>
              <div className="project-media">
                <Parallax as="img" speed={0.06} max={14} src={proj.img} alt={proj.title} loading="lazy" />
                <Link to={`/projects/${proj.slug}`} className="project-overlay" aria-label={`View ${proj.title}`}>
                  <span>View project <Icon name="arrow-right" size={16} /></span>
                </Link>
                <span className={`project-status ${proj.status === 'Ongoing' ? 'ongoing' : 'completed'}`}>{proj.status}</span>
              </div>
              <div className="project-info">
                <span className="project-category">{proj.category}</span>
                <h4><Link to={`/projects/${proj.slug}`}>{proj.title}</Link></h4>
                <p className="project-location"><Icon name="map" size={14} /> {proj.location}</p>
                <p className="project-details">{proj.details}</p>
                <Link to={`/projects/${proj.slug}`} className="card-link">View Project Details</Link>
              </div>
            </Reveal>
          ))}
        </div>

        {limit && (
          <Reveal className="section-footer">
            <Link to="/projects" className="btn btn-primary btn-lg">View All Projects <Icon name="arrow-right" size={18} /></Link>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default Projects;
