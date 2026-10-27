import React from 'react';
import useInView from '../hooks/useInView';

// Scroll-reveal wrapper. variant: up | left | right | zoom | flip | blur | none.
// delay (ms) staggers siblings. Styles live under "Motion & extra elements" in index.css.
const Reveal = ({ as: Tag = 'div', variant = 'up', delay = 0, className = '', style, children, ...rest }) => {
  const [ref, inView] = useInView();
  const classes = ['reveal', `reveal-${variant}`, inView ? 'is-visible' : '', className].filter(Boolean).join(' ');
  return (
    <Tag ref={ref} className={classes} style={{ '--delay': `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
