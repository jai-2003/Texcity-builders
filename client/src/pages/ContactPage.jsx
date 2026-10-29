import React from 'react';
import ContactHero from '../components/ContactHero';
import Contact from '../components/Contact';
import Faq from '../components/Faq';
import Seo from '../components/Seo';
import { company, faqs } from '../data/content';

const ContactPage = () => (
  <>
    <Seo
      title="Contact Us — Free Site Visit & Consultation"
      description={`Call ${company.phone}, email ${company.email} or visit our office in Saravanampatti, Coimbatore. Site visits and consultations are free; we reply within one working day.`}
    />
    <ContactHero />

    <Contact />

    <Faq items={faqs} title="Before You Get in Touch" lead="Answers to the practical questions most clients ask first." />
  </>
);

export default ContactPage;
