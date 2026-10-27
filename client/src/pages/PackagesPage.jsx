import React from 'react';
import PackagesHero from '../components/PackagesHero';
import Packages from '../components/Packages';
import Faq from '../components/Faq';
import CallToAction from '../components/CallToAction';
import Seo from '../components/Seo';
import { stats } from '../data/content';
import { packageFaqs } from '../data/packagesData';

const PackagesPage = () => {
  return (
    <>
      <Seo
        title="Home Construction Packages & Pricing — Standard, Premium & Ultra Luxury | Texcity Builders"
        description="Transparent home construction packages in Coimbatore starting at ₹2,199/sqft. Standard, Premium, and Ultra Luxury specifications with 2D/3D design, structural engineering, and branded materials."
      />

      <PackagesHero stats={[stats[0], stats[1]]} />

      {/* Main Packages Section with 3 Pricing Cards & Accordions */}
      <Packages />

      {/* Frequently Asked Questions */}
      <Faq
        items={packageFaqs}
        title="Questions About Construction Packages"
        lead="Straightforward answers about pricing, payment milestones, customisation, and handover warranties."
      />

      {/* Final Call to Action */}
      <CallToAction />
    </>
  );
};

export default PackagesPage;
