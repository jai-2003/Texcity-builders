import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import ScrollManager from './components/ScrollManager';
import Home from './pages/Home';
import { initSmoothScroll } from './lib/smoothScroll';

// Inner pages are split into their own chunks so the first visit only downloads the page
// being viewed. They are prefetched once the browser is idle, so later navigation is instant.
const pageLoaders = {
  about: () => import('./pages/AboutPage'),
  services: () => import('./pages/ServicesPage'),
  packages: () => import('./pages/PackagesPage'),
  contact: () => import('./pages/ContactPage'),
  notFound: () => import('./pages/NotFound'),
};
const AboutPage = lazy(pageLoaders.about);
const ServicesPage = lazy(pageLoaders.services);
const PackagesPage = lazy(pageLoaders.packages);
const ContactPage = lazy(pageLoaders.contact);
const NotFound = lazy(pageLoaders.notFound);

function App() {
  // Inertial smooth scrolling for every page (lib/smoothScroll.js).
  useEffect(() => initSmoothScroll(), []);

  return (
    <div className="App">
      <ScrollManager />
      <Navbar />
      <main>
        <Suspense fallback={<div className="route-loading" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export default App;
