import React from 'react';
import Icon from './Icon';
// Served from public/heroes with fixed names so index.html can start loading the right one
// before this code arrives (see the preload script there).
const banner = '/heroes/contact-banner.webp';
const bannerMd = '/heroes/contact-banner-md.webp';
const bannerMobile = '/heroes/contact-banner-mobile.webp';
import { company } from '../data/content';

// Contact page hero built on the supplied banner artwork: a rounded teal-blue card with a
// modern building rising above its top edge. On wider screens the artwork is shown whole and
// the copy sits in its empty left area (inside the thin frame line); on phones a building
// crop sits on top and the copy follows in a matching teal card. Styles: "Contact hero" in
// index.css.
const whatsappHref = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Hi ${company.name}, I'd like to discuss a project.`)}`;

const channels = [
  { icon: 'phone', label: company.phone, href: company.phoneHref },
  { icon: 'whatsapp', label: 'WhatsApp us', href: whatsappHref, external: true },
  { icon: 'mail', label: company.email, href: `mailto:${company.email}` },
];

const ContactHero = () => (
  <section className="ct-hero">
    <div className="ct-hero-wrap">
      <div className="ct-banner">
        <picture>
          <source media="(max-width: 760px)" srcSet={bannerMobile} />
          <img
            src={banner}
            srcSet={`${bannerMd} 1240w, ${banner} 2065w`}
            sizes="(max-width: 1290px) 100vw, 1290px"
            alt="A modern glass-and-stone apartment building rising above a blue banner"
            className="ct-banner-art"
            width="2065"
            height="762"
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        <div className="ct-banner-copy">
          <span className="ct-eyebrow hero-anim" style={{ '--d': '0.05s' }}>
            Free site visits &amp; consultations
          </span>
          <h1 className="hero-anim" style={{ '--d': '0.15s' }}>
            Let&apos;s start building <em>your dream home</em> together
          </h1>
          <p className="hero-anim" style={{ '--d': '0.25s' }}>
            Call, message or send the form below — we usually reply within one working day.
          </p>

          <ul className="ct-channels hero-anim" style={{ '--d': '0.35s' }}>
            {channels.map((ch) => (
              <li key={ch.icon}>
                <a href={ch.href} {...(ch.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <Icon name={ch.icon} size={15} /> {ch.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default ContactHero;
