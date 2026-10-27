import React from 'react';
import PageHero from '../components/PageHero';
import Contact from '../components/Contact';
import Reveal from '../components/Reveal';
import Faq from '../components/Faq';
import Seo from '../components/Seo';
import heroHouse from '../assets/hero-house-contact.webp';
import { company, faqs, stats } from '../data/content';

const ContactPage = () => (
  <>
    <Seo
      title="Contact Us — Free Site Visit & Consultation"
      description={`Call ${company.phone}, email ${company.email} or visit our office on Avinashi Road, Coimbatore. Site visits and consultations are free; we reply within one working day.`}
    />
    <PageHero
      word="Contact"
      title={<>Let's start<em>the conversation.</em></>}
      description="Call, email or send the form below. Site visits and consultations are free, and we usually reply within one working day."
      ctaLabel="Send a Message"
      ctaHref="#contact"
      stats={[stats[0], stats[1]]}
      house={heroHouse}
      houseAlt="A single-storey stone and stucco home with a lit patio fire pit, built by Texcity Builders"
      houseRatio={0.5}
      houseScale={1.35}
    />

    <Contact />

    <Faq items={faqs} title="Before You Get in Touch" lead="Answers to the practical questions most clients ask first." />
  </>
);

export default ContactPage;
