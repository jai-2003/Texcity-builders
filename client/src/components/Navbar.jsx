import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/logo.webp';
import Icon from './Icon';
import { company, navLinks } from '../data/content';

const Navbar = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);

  // The bar is a floating white "island" that tightens up and gains a stronger shadow once
  // the visitor starts scrolling. The thin green line along the top shows how far down the
  // page the visitor is.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  // Close the mobile menu whenever the route changes (e.g. browser back/forward).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  const close = () => setMenuOpen(false);

  return (
    <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={close} aria-label="Texcity Builders Home">
          <img src={logo} alt="Texcity Builders" width="226" height="55" />
        </Link>

        <ul id="primary-menu" className={`nav-links${menuOpen ? ' open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')} onClick={close}>
                {link.label}
                <Icon name="arrow-right" size={18} className="nav-link-arrow" />
              </NavLink>
            </li>
          ))}
          <li className="nav-mobile-cta">
            <a href={company.phoneHref} className="nav-phone">
              <span className="nav-phone-icon"><Icon name="phone" size={16} /></span>
              <span><small>Call us</small>{company.phone}</span>
            </a>
            <Link to="/contact" className="btn nav-cta" onClick={close}>
              Get a Quote <Icon name="arrow-right" size={16} />
            </Link>
          </li>
        </ul>

        <div className="nav-action">
          <a href={company.phoneHref} className="nav-phone">
            <span className="nav-phone-icon"><Icon name="phone" size={16} /></span>
            <span><small>Call us</small>{company.phone}</span>
          </a>
          <Link to="/contact" className="btn nav-cta">
            Get a Quote <Icon name="arrow-right" size={16} />
          </Link>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
