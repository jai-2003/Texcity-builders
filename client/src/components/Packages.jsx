import React, { useState } from 'react';
import Icon from './Icon';
import Reveal from './Reveal';
import { packagesData } from '../data/packagesData';
import { company } from '../data/content';

const sectionIcons = {
  design: 'pencil',
  'project-management': 'clipboard',
  structure: 'hardhat',
  'bathroom-plumbing': 'gem',
  flooring: 'layout',
  'kitchen-dining': 'home',
  'door-windows-railing': 'shield',
  painting: 'paintbrush',
  electrical: 'sparkles',
  'whats-not-included': 'info',
};

// Opens WhatsApp chat with the company, pre-filled with the chosen package's details.
const whatsappLink = (pkg) => {
  const message = [
    `Hi ${company.name}, I'm interested in the ${pkg.name}.`,
    `Rate: ${pkg.priceDisplay} ${pkg.unit} (${pkg.tagline})`,
    'Please share more details and a quote for my plot.',
  ].join('\n');
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
};

// Rough total for a typical plot, shown under each rate so visitors can picture the budget.
const EXAMPLE_SQFT = 1500;
const estimateLakh = (pkg) => {
  const rate = Number(pkg.priceNumber.replace(/,/g, ''));
  return `₹${((rate * EXAMPLE_SQFT) / 100000).toFixed(2)} Lakh`;
};

const Packages = ({ showHeader = true, compact = false }) => {
  // Store open sections as an object: { `${pkgId}-${sectionId}`: boolean }
  // All collapsed by default: each card's key-spec table already shows the main specs, and
  // equal-height closed cards keep the three prices lined up for comparison.
  const [openSections, setOpenSections] = useState({});

  // Selected package for detailed specification modal
  const [modalPkg, setModalPkg] = useState(null);

  const toggleSection = (pkgId, secId) => {
    const key = `${pkgId}-${secId}`;
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleAllForPackage = (pkg, expand) => {
    setOpenSections((prev) => {
      const next = { ...prev };
      pkg.sections.forEach((sec) => {
        next[`${pkg.id}-${sec.id}`] = expand;
      });
      return next;
    });
  };

  const areAllExpanded = (pkg) => {
    return pkg.sections.every((sec) => openSections[`${pkg.id}-${sec.id}`]);
  };

  return (
    <section className="packages-section section-padding bg-light" id="packages">
      <div className="container">
        {showHeader && (
          <div className="section-heading center">
            <Reveal>
              <span className="badge">Transparent Pricing</span>
              <h2 className="section-title">Home Construction Packages</h2>
              <p className="section-lead">
                Fixed-rate, all-inclusive construction packages designed for Coimbatore. Compare specifications,
                material brands, and architectural deliverables with zero hidden costs.
              </p>
            </Reveal>
          </div>
        )}

        <div className="packages-grid">
          {packagesData.map((pkg, idx) => {
            const allOpen = areAllExpanded(pkg);
            return (
              <Reveal
                as="article"
                variant="up"
                delay={idx * 120}
                className={`pkg-card ${pkg.popular ? 'pkg-featured' : ''}`}
                id={`pkg-${pkg.id}`}
                key={pkg.id}
              >
                {pkg.popular && (
                  <span className="pkg-ribbon">
                    <Icon name="star" size={13} /> Most Popular
                  </span>
                )}

                <header className="pkg-header">
                  <div className="pkg-header-top">
                    <span className="pkg-tier">Tier 0{idx + 1}</span>
                    {!pkg.popular && pkg.badge && <span className="pkg-badge">{pkg.badge}</span>}
                  </div>
                  <h3 className="pkg-name">{pkg.name}</h3>
                  {pkg.bestFor && (
                    <p className="pkg-best-for">
                      <Icon name="home" size={14} /> Best for: <strong>{pkg.bestFor}</strong>
                    </p>
                  )}

                  <div className="pkg-price-box">
                    <div className="pkg-pricing">
                      <span className="pkg-currency">₹</span>
                      <strong className="pkg-rate">{pkg.priceNumber}</strong>
                      <span className="pkg-unit">per/sqft</span>
                    </div>
                    <p className="pkg-estimate">
                      ≈ <strong>{estimateLakh(pkg)}</strong> for a {EXAMPLE_SQFT.toLocaleString('en-IN')} sqft home
                    </p>
                  </div>
                </header>

                {pkg.keySpecs && (
                  <dl className="pkg-key-specs">
                    {pkg.keySpecs.map((spec) => (
                      <div className="pkg-key-spec" key={spec.label}>
                        <dt>
                          <Icon name={spec.icon} size={15} /> {spec.label}
                        </dt>
                        <dd>{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                <div className="pkg-actions">
                  <a
                    href={whatsappLink(pkg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-block ${pkg.popular ? 'btn-primary' : 'pkg-btn-dark'}`}
                  >
                    <Icon name="whatsapp" size={17} /> Choose {pkg.name.replace(' Package', '')}
                  </a>
                  <button
                    type="button"
                    className="pkg-spec-btn"
                    onClick={() => setModalPkg(pkg)}
                    aria-label={`Get detailed specification for ${pkg.name}`}
                  >
                    <Icon name="filetext" size={15} /> View detailed specification
                  </button>
                </div>

                <div className="pkg-card-body">
                  <div className="pkg-card-top-bar">
                    <span className="pkg-section-count">
                      <Icon name="layers" size={14} /> What&apos;s included · {pkg.sections.length} sections
                    </span>
                    <button
                      type="button"
                      className="pkg-toggle-all-btn"
                      onClick={() => toggleAllForPackage(pkg, !allOpen)}
                    >
                      {allOpen ? 'Collapse all' : 'Expand all'}
                    </button>
                  </div>

                  {/* Accordion Sections */}
                  <div className="pkg-accordions">
                    {pkg.sections.map((sec) => {
                      const key = `${pkg.id}-${sec.id}`;
                      const isOpen = !!openSections[key];
                      const isExclusion = sec.id === 'whats-not-included';

                      return (
                        <div
                          className={`pkg-accordion-item ${isOpen ? 'is-open' : ''} ${isExclusion ? 'is-exclusion' : ''}`}
                          key={sec.id}
                        >
                          <button
                            type="button"
                            className="pkg-accordion-header"
                            onClick={() => toggleSection(pkg.id, sec.id)}
                            aria-expanded={isOpen}
                          >
                            <span className="pkg-acc-title-group">
                              <span className="pkg-acc-icon">
                                <Icon name={sectionIcons[sec.id] || 'check'} size={15} />
                              </span>
                              <span className="pkg-acc-title">{sec.title}</span>
                            </span>
                            <span className="pkg-acc-meta">
                              <span className="pkg-acc-count">{sec.items.length}</span>
                              <span className="pkg-acc-arrow">
                                <Icon name={isOpen ? 'minus' : 'plus'} size={15} strokeWidth={2.4} />
                              </span>
                            </span>
                          </button>

                          {isOpen && (
                            <div className="pkg-accordion-content">
                              <ul className="pkg-items-list">
                                {sec.items.map((item, i) => (
                                  <li key={i} className={isExclusion ? 'item-exclusion' : 'item-inclusion'}>
                                    <span className="pkg-item-bullet" aria-hidden="true">
                                      {isExclusion ? (
                                        <Icon name="x" size={12} strokeWidth={2.6} />
                                      ) : (
                                        <Icon name="check" size={12} strokeWidth={2.6} />
                                      )}
                                    </span>
                                    <span className="pkg-item-text">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Detailed Specification Modal */}
      {modalPkg && (
        <div className="pkg-modal-backdrop" onClick={() => setModalPkg(null)} role="dialog" aria-modal="true">
          <div className="pkg-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="pkg-modal-header">
              <div className="pkg-modal-header-info">
                <span className="badge">Detailed Specification Sheet</span>
                <h2>{modalPkg.name}</h2>
                <div className="pkg-modal-rate-strip">
                  <strong>{modalPkg.priceDisplay}</strong>
                  <span>per/sqft</span>
                  <em>• {modalPkg.tagline}</em>
                </div>
              </div>
              <button
                type="button"
                className="pkg-modal-close-btn"
                onClick={() => setModalPkg(null)}
                aria-label="Close specification modal"
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            <div className="pkg-modal-body">
              <p className="pkg-modal-summary">{modalPkg.summary}</p>

              <div className="pkg-modal-spec-grid">
                {modalPkg.sections.map((sec) => (
                  <div
                    className={`pkg-modal-sec-box ${sec.id === 'whats-not-included' ? 'is-not-included' : ''}`}
                    key={sec.id}
                  >
                    <h4>
                      <Icon name={sectionIcons[sec.id] || 'check'} size={16} />
                      <span>{sec.title}</span>
                    </h4>
                    <ul>
                      {sec.items.map((item, idx) => (
                        <li key={idx}>
                          <Icon name={sec.id === 'whats-not-included' ? 'x' : 'check'} size={14} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="pkg-modal-footer">
              <button
                type="button"
                className="btn pkg-btn-dark btn-icon"
                onClick={() => window.print()}
              >
                <Icon name="download" size={16} /> Print / Save PDF
              </button>
              <a
                href={whatsappLink(modalPkg)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-icon"
                onClick={() => setModalPkg(null)}
              >
                <Icon name="whatsapp" size={17} /> Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Packages;
