import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import logo from '../assets/logo.webp';
import { company, navLinks, services } from '../data/content';

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <Reveal className="footer-brand">
          <div className="footer-logo-wrap">
            <img src={logo} alt={company.name} width="543" height="132" loading="lazy" decoding="async" />
          </div>
          <p>Premium residential, villa and commercial construction in Coimbatore — planned, approved and built by one trusted team.</p>
        </Reveal>
        <Reveal delay={100}>
          <h4>Quick Links</h4>
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={200}>
          <h4>Services</h4>
          <ul>
            {services.map((srv) => (
              <li key={srv.slug}><Link to={`/services#${srv.slug}`}>{srv.title}</Link></li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={300}>
          <h4>Get in Touch</h4>
          <ul>
            <li><a href={company.phoneHref}>{company.phone}</a></li>
            <li><a href={`mailto:${company.email}`}>{company.email}</a></li>
            <li>{company.address}</li>
            <li>{company.hours}</li>
          </ul>
        </Reveal>
      </div>
      <div className="container">
        <div className="footer-bottom">
          <span>&copy; {year} {company.name}. All rights reserved.</span>
          <div className="footer-social">
            {company.social.map((s) => (
              <a
                href={s.href}
                key={s.label}
                aria-label={`Texcity Builders on ${s.label}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
