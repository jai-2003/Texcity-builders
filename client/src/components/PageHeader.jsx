import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Parallax from './Parallax';

// Banner at the top of every inner page: breadcrumb, title, lead and a dimmed photo.
const PageHeader = ({ title, lead, image, crumbs = [] }) => (
  <header className="page-header">
    <Parallax speed={0.25} max={120} className="page-header-bg" style={image ? { backgroundImage: `url(${image})` } : undefined} aria-hidden="true" />
    <div className="container">
      <Reveal variant="up">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumbs.map((crumb) => (
            <React.Fragment key={crumb.label}>
              <span aria-hidden="true">/</span>
              {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span>{crumb.label}</span>}
            </React.Fragment>
          ))}
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>
        <h1 className="page-title">{title}</h1>
        {lead && <p className="page-lead">{lead}</p>}
      </Reveal>
    </div>
  </header>
);

export default PageHeader;
