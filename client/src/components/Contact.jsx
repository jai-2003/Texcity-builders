import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Reveal from './Reveal';
import Icon from './Icon';
import { company, enquiryOptions } from '../data/content';

const emptyForm = { name: '', email: '', phone: '', interest: '', message: '' };

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const pkg = searchParams.get('package');
    const service = searchParams.get('service');
    if (pkg) {
      setForm((prev) => ({
        ...prev,
        interest: pkg,
        message: prev.message || `Hello Texcity Builders, I am interested in the ${pkg} construction package for my plot in Coimbatore. Please share more details and arrange a consultation.`,
      }));
    } else if (service) {
      setForm((prev) => ({
        ...prev,
        interest: service,
      }));
    }
  }, [searchParams]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // No backend yet: open the visitor's email app with the enquiry filled in.
  const submit = (e) => {
    e.preventDefault();
    const subject = `Enquiry: ${form.interest || 'General'} — ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Interested in: ${form.interest || 'Not specified'}`,
      '',
      form.message,
    ].join('\n');
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const details = [
    { icon: 'phone', label: 'Call Us', value: <a href={company.phoneHref}>{company.phone}</a> },
    { icon: 'mail', label: 'Email Us', value: <a href={`mailto:${company.email}`}>{company.email}</a> },
    { icon: 'map', label: 'Visit Our Office', value: company.address },
    { icon: 'clock', label: 'Office Hours', value: company.hours },
  ];

  return (
    <section className="section-padding bg-white" id="contact">
      <div className="container contact-layout">
        <Reveal variant="left" className="contact-info">
          <span className="badge">Contact</span>
          <h2 className="section-title left-align">Let's Build Your Dream Together</h2>
          <p className="section-lead">Get in touch with our team for project enquiries, site visits, consultations or any other information. We usually respond within one working day.</p>

          <div className="contact-details">
            {details.map((item, i) => (
              <Reveal variant="up" delay={200 + i * 90} className="contact-item" key={item.label}>
                <span className="contact-icon"><Icon name={item.icon} size={20} /></span>
                <div>
                  <p>{item.label}</p>
                  <h4>{item.value}</h4>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="social-links mt-4">
            <span>Follow Us:</span>
            {company.social.map((s) => (
              <a href={s.href} key={s.label}>{s.label}</a>
            ))}
          </div>
        </Reveal>

        <Reveal variant="right" delay={150} className="contact-form-container">
          <h3>Send Us a Message</h3>
          <form className="contact-form" onSubmit={submit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cf-name">Name</label>
                <input id="cf-name" name="name" type="text" autoComplete="name" placeholder="Your name" required value={form.name} onChange={update} />
              </div>
              <div className="form-group">
                <label htmlFor="cf-email">Email</label>
                <input id="cf-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required value={form.email} onChange={update} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cf-phone">Phone Number</label>
                <input id="cf-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91" value={form.phone} onChange={update} />
              </div>
              <div className="form-group">
                <label htmlFor="cf-interest">Interested In</label>
                <select id="cf-interest" name="interest" value={form.interest} onChange={update}>
                  <option value="">Select an option</option>
                  {enquiryOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="cf-message">Message</label>
              <textarea id="cf-message" name="message" placeholder="Tell us about your project, location and budget" rows="4" data-lenis-prevent required value={form.message} onChange={update}></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-icon w-100">
              Send Message <Icon name="send" size={18} />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
