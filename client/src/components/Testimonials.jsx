import React from 'react';
import Reveal from './Reveal';
import Icon from './Icon';
import { testimonials } from '../data/content';

const initials = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

// Testimonials scroll continuously right to left, pausing on hover so a card is easy to
// finish reading. The list is rendered twice back to back (same technique as the credentials
// Marquee) so the loop has no visible seam.
const Testimonials = () => {
  return (
    <section className="section-padding bg-light" id="testimonials">
      <div className="container">
        <Reveal className="section-heading center">
          <span className="badge">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
        </Reveal>
      </div>

      <div className="testimonials-marquee" aria-label="What our clients say">
        <div className="testimonials-track">
          {[...testimonials, ...testimonials].map((t, i) => (
            <figure className="testimonial-card" key={`${t.role}-${i}`} aria-hidden={i >= testimonials.length}>
              <span className="testimonial-quote"><Icon name="quote" size={30} /></span>
              <div>
                <div className="stars" role="img" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, s) => (
                    <span className={s < t.rating ? '' : 'dim'} key={s}>
                      <Icon name="star" size={16} strokeWidth={1.5} />
                    </span>
                  ))}
                </div>
                <blockquote>{t.quote}</blockquote>
              </div>
              <figcaption>
                <span className="avatar" aria-hidden="true">{initials(t.name)}</span>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
