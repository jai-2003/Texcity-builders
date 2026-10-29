import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import About from '../components/About';
import HomeServices from '../components/HomeServices';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import Seo from '../components/Seo';

const Home = () => (
  <>
    <Seo description="Texcity Builders designs, approves and builds premium villas, apartments and commercial buildings in Coimbatore, Tamil Nadu — one accountable team from plan to handover." />
    <Hero />
    <Marquee />
    <About />
    <HomeServices />
    <WhyChooseUs />
    <Testimonials />
    <CallToAction />
  </>
);

export default Home;
