import React from 'react';

// Lottie-style animated line icons for the Why Choose Us section. Each icon's strokes draw in
// (`.draw`, staggered by --d) whenever it starts playing, then one or two parts keep a small
// looping motion (`.loop-*`). `playing` toggles the animation; when false the icon renders
// fully drawn and still. Styles: "Animated icons" block in index.css.
const icons = {
  // Quality Materials: a cut gem that floats, with twinkling sparkles.
  gem: (
    <>
      <g className="loop-float">
        <path className="draw" style={{ '--d': 0 }} d="M18 14 H46 L56 28 L32 54 L8 28 Z" />
        <path className="draw" style={{ '--d': 2 }} d="M8 28 H56" />
        <path className="draw" style={{ '--d': 3 }} d="M24 14 L20 28 L32 54 L44 28 L40 14" />
      </g>
      <path className="loop-twinkle" style={{ '--t': 0 }} d="M54 4 V12 M50 8 H58" />
      <path className="loop-twinkle" style={{ '--t': 1 }} d="M8 44 V50 M5 47 H11" />
    </>
  ),
  // On-Time Delivery: a calendar whose tick redraws on a loop.
  calendar: (
    <>
      <rect className="draw" style={{ '--d': 0 }} x="10" y="14" width="44" height="40" rx="6" />
      <path className="draw" style={{ '--d': 2 }} d="M10 26 H54" />
      <path className="draw loop-bob" style={{ '--d': 1 }} d="M22 8 V18 M42 8 V18" />
      <path className="draw loop-redraw" style={{ '--d': 4 }} d="M22 40 L29 47 L43 33" />
    </>
  ),
  // Transparent Pricing: an itemised receipt with a coin that keeps dropping in.
  receipt: (
    <>
      <path className="draw" style={{ '--d': 0 }} d="M14 8 H44 V56 L39 52 L34 56 L29 52 L24 56 L19 52 L14 56 Z" />
      <path className="draw" style={{ '--d': 2 }} d="M21 20 H37" />
      <path className="draw" style={{ '--d': 3 }} d="M21 28 H37" />
      <path className="draw" style={{ '--d': 4 }} d="M21 36 H31" />
      <g className="loop-drop">
        <circle className="draw" style={{ '--d': 5 }} cx="48" cy="44" r="9" />
        <path className="draw" style={{ '--d': 6 }} d="M44.5 39.5 H51.5 M44.5 43 H51.5 M47 39.5 C51 39.5 51 46.5 46.5 46.5 H45.5 L51 50.5" />
      </g>
    </>
  ),
  // Experienced Team: three people; the two at the sides pop up in turn.
  users: (
    <>
      <circle className="draw" style={{ '--d': 0 }} cx="32" cy="22" r="7" />
      <path className="draw" style={{ '--d': 1 }} d="M20 50 C20 40 25 34 32 34 C39 34 44 40 44 50" />
      <g className="loop-pop" style={{ '--t': 0 }}>
        <circle className="draw" style={{ '--d': 2 }} cx="14" cy="27" r="5" />
        <path className="draw" style={{ '--d': 3 }} d="M4 48 C4 40 8 36 14 36 C16 36 18 37 19 38" />
      </g>
      <g className="loop-pop" style={{ '--t': 1 }}>
        <circle className="draw" style={{ '--d': 2 }} cx="50" cy="27" r="5" />
        <path className="draw" style={{ '--d': 3 }} d="M60 48 C60 40 56 36 50 36 C48 36 46 37 45 38" />
      </g>
    </>
  ),
  // Legal Clarity: a balance whose beam gently rocks.
  scale: (
    <>
      <path className="draw" style={{ '--d': 0 }} d="M32 10 V54 M22 56 H42" />
      <g className="loop-rock">
        <path className="draw" style={{ '--d': 1 }} d="M10 18 H54" />
        <path className="draw" style={{ '--d': 2 }} d="M10 18 L4 34 M10 18 L16 34 M3 34 Q10 42 17 34 Z" />
        <path className="draw" style={{ '--d': 3 }} d="M54 18 L48 34 M54 18 L60 34 M47 34 Q54 42 61 34 Z" />
      </g>
      <circle className="draw" style={{ '--d': 1 }} cx="32" cy="10" r="2.5" />
    </>
  ),
  // After-Sales Support: a headset with pulsing sound waves.
  headset: (
    <>
      <path className="draw" style={{ '--d': 0 }} d="M14 36 V30 A18 18 0 0 1 50 30 V36" />
      <rect className="draw" style={{ '--d': 1 }} x="10" y="32" width="9" height="15" rx="3" />
      <rect className="draw" style={{ '--d': 1 }} x="45" y="32" width="9" height="15" rx="3" />
      <path className="draw" style={{ '--d': 2 }} d="M50 47 Q50 55 38 55" />
      <circle className="draw" style={{ '--d': 3 }} cx="35" cy="55" r="2.5" />
      <path className="loop-pulse" style={{ '--t': 0 }} d="M5 35 Q1 39.5 5 44 M59 35 Q63 39.5 59 44" />
    </>
  ),
  // Consultation: two speech bubbles, with typing dots bouncing in the front one.
  chat: (
    <>
      <path className="draw" style={{ '--d': 0 }} d="M14 12 H40 A6 6 0 0 1 46 18 V34 A6 6 0 0 1 40 40 H24 L14 48 V40 A6 6 0 0 1 8 34 V18 A6 6 0 0 1 14 12 Z" />
      <path className="draw" style={{ '--d': 2 }} d="M50 22 A6 6 0 0 1 56 28 V42 A6 6 0 0 1 50 48 V55 L42 48 H32 A6 6 0 0 1 27 45" />
      <circle className="loop-typing" style={{ '--t': 0 }} cx="18" cy="26" r="1.6" />
      <circle className="loop-typing" style={{ '--t': 1 }} cx="27" cy="26" r="1.6" />
      <circle className="loop-typing" style={{ '--t': 2 }} cx="36" cy="26" r="1.6" />
    </>
  ),
  // Design & Planning: a pencil sketching a line that keeps redrawing beneath it.
  pencil: (
    <>
      <g className="loop-sketch">
        <path className="draw" style={{ '--d': 0 }} d="M42 6 L52 16 L26 42 L13 46 L17 33 Z" />
        <path className="draw" style={{ '--d': 1 }} d="M17 33 L26 42 M37 11 L47 21" />
      </g>
      <path className="loop-redraw" style={{ '--t': 0 }} d="M8 56 Q15 50 22 56 T36 56 T50 56 T58 54" />
    </>
  ),
  // Approvals: a clipboard whose checklist ticks itself off.
  clipboard: (
    <>
      <rect className="draw" style={{ '--d': 0 }} x="13" y="12" width="38" height="46" rx="5" />
      <rect className="draw loop-bob" style={{ '--d': 1 }} x="24" y="7" width="16" height="9" rx="3" />
      <path className="loop-redraw" style={{ '--t': 0 }} d="M20 29 L24 33 L30 26" />
      <path className="draw" style={{ '--d': 2 }} d="M35 30 H44" />
      <path className="loop-redraw" style={{ '--t': 1 }} d="M20 43 L24 47 L30 40" />
      <path className="draw" style={{ '--d': 3 }} d="M35 44 H44" />
    </>
  ),
  // Construction: a hard hat that bobs, with sparks above it.
  hardhat: (
    <>
      <g className="loop-float">
        <path className="draw" style={{ '--d': 0 }} d="M12 44 V40 A20 20 0 0 1 52 40 V44" />
        <rect className="draw" style={{ '--d': 1 }} x="6" y="44" width="52" height="7" rx="3.5" />
        <path className="draw" style={{ '--d': 2 }} d="M26 22 V34 M38 22 V34" />
      </g>
      <path className="loop-twinkle" style={{ '--t': 0 }} d="M54 8 V16 M50 12 H58" />
      <path className="loop-twinkle" style={{ '--t': 1 }} d="M10 10 V16 M7 13 H13" />
    </>
  ),
  // Handover: a key that turns, with a sparkle as the door opens.
  key: (
    <>
      <g className="loop-turn">
        <circle className="draw" style={{ '--d': 0 }} cx="20" cy="32" r="11" />
        <circle className="draw" style={{ '--d': 1 }} cx="20" cy="32" r="3.5" />
        <path className="draw" style={{ '--d': 2 }} d="M31 32 H57 M49 32 V41 M56 32 V39" />
      </g>
      <path className="loop-twinkle" style={{ '--t': 0 }} d="M50 12 V20 M46 16 H54" />
    </>
  ),
};

// `style` can set --icon-delay to hold the whole draw-in back (e.g. to stagger a row of icons).
const AnimatedIcon = ({ name, size = 48, playing = true, className = '', style }) => (
  <svg
    style={style}
    className={`anim-icon${playing ? ' is-playing' : ''}${className ? ` ${className}` : ''}`}
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {icons[name]}
  </svg>
);

export default AnimatedIcon;
