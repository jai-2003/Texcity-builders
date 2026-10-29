import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Icon from './Icon';
import logo from '../assets/logo.webp';
import { company, navLinks, services } from '../data/content';

const year = new Date().getFullYear();

// Three columns (brand + social, services, contact) over a bottom bar with the copyright and
// the page links. Styles: "Footer" block in index.css.
const Footer = () => {
  const contact = [
    { icon: 'phone', content: <a href={company.phoneHref}>{company.phone}</a> },
    { icon: 'mail', content: <a href={`mailto:${company.email}`}>{company.email}</a> },
    { icon: 'map', content: company.address },
  ];

  return (
    <footer className="footer">
      {/* The grid and bottom bar sit inside .container rather than on it: .container sets its
          own padding, which would otherwise override their spacing on phones and stretch the
          bottom bar's divider into the side gutters. */}
      <div className="container">
        <div className="footer-grid">
          <Reveal className="footer-brand">
            <div className="footer-logo-wrap">
              <img src={logo} alt={company.name} width="395" height="96" loading="lazy" decoding="async" />
            </div>
            <p>Premium residential, villa and commercial construction in Coimbatore — planned, approved and built by one trusted team.</p>
            <div className="footer-social">
              {company.social.map((s) => (
                <a
                  href={s.href}
                  key={s.label}
                  className={`social-${s.icon}`}
                  aria-label={`Texcity Builders on ${s.label}`}
                  title={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100} className="footer-col">
            <h4>Our Services</h4>
            <ul className="footer-links">
              {services.map((srv) => (
                <li key={srv.slug}>
                  <Link to={`/services#${srv.slug}`}>
                    <Icon name="arrow-right" size={14} strokeWidth={2.2} />
                    {srv.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200} className="footer-col">
            <h4>Get in Touch</h4>
            <ul className="footer-contact">
              {contact.map((item) => (
                <li key={item.icon}>
                  <span className="footer-contact-icon"><Icon name={item.icon} size={16} /></span>
                  <span>{item.content}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="footer-bottom">
          <span>&copy; {year} {company.name}. All rights reserved.</span>
          <nav className="footer-nav" aria-label="Footer">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>{link.label}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
