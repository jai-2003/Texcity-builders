import React from 'react';
import { Link } from 'react-router-dom';
import ServicesHero from '../components/ServicesHero';
import Services from '../components/Services';
import Reveal from '../components/Reveal';
import Parallax from '../components/Parallax';
import Icon from '../components/Icon';
import Faq from '../components/Faq';
import CallToAction from '../components/CallToAction';
import Seo from '../components/Seo';
import { services, serviceFaqs } from '../data/content';

const ServicesPage = () => (
  <>
    <Seo
      title="Services — Approvals, Architecture, Structural & Interior Design"
      description="Building approvals, residential and commercial projects, architectural and structural design, equipment services, interior design and layout development in Coimbatore."
    />
    <ServicesHero />

    <Services />

    {/* One detailed section per service, linked from the cards above and the footer. */}
    <section className="section-padding bg-white">
      <div className="container">
        <Reveal className="section-heading center">
          <h2 className="section-title">What Each Service Includes</h2>
          <p className="section-lead">Clear scope, realistic timelines and a single point of contact for every service we offer.</p>
        </Reveal>

        {services.map((srv, i) => (
          <article className="service-detail" id={srv.slug} key={srv.slug}>
            <Reveal variant={i % 2 ? 'right' : 'left'} className="service-detail-media">
              <div className="media-frame">
                {/* max stays under the photo's spare 6% (scale 1.12) even in the short phone frame */}
                <Parallax as="img" speed={0.07} max={20} src={srv.cover} alt={srv.title} loading="lazy" />
              </div>
            </Reveal>
            <Reveal variant={i % 2 ? 'left' : 'right'} delay={120} className="service-detail-body">
              <span className="service-detail-icon"><Icon name={srv.icon} /></span>
              <h2>{srv.title}</h2>
              {srv.longDesc.map((text) => (
                <p key={text}>{text}</p>
              ))}
              <div className="service-meta">
                <span><Icon name="clock" size={16} /> {srv.duration}</span>
                <span><Icon name="users" size={16} /> {srv.idealFor}</span>
              </div>
              <h3>What's included</h3>
              <ul className="includes-list">
                {srv.includes.map((item) => (
                  <li key={item}><Icon name="shield" size={18} /> {item}</li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-primary btn-icon">Enquire About {srv.title} <Icon name="arrow-right" size={18} /></Link>
            </Reveal>
          </article>
        ))}
      </div>
    </section>

    <Faq items={serviceFaqs} title="Questions About Our Services" lead="Straight answers to the questions we hear most often before a project starts." />
    <CallToAction />
  </>
);

export default ServicesPage;
