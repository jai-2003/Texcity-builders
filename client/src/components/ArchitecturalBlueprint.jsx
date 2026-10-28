import React, { useState, useEffect } from 'react';
import useInView from '../hooks/useInView';

/**
 * ArchitecturalBlueprint
 * Clean animated blueprint drawing and live construction system
 * over the user's architectural illustration without cluttering badges/UI.
 * 
 * Features:
 * 1. Self-drawing animation: Blueprint compass arcs, building frames,
 *    and tower cranes draw themselves when scrolled into view.
 * 2. Active working construction:
 *    - Main crane trolley travels smoothly along the horizontal jib.
 *    - Hoist cable & hook gently sway and hoist.
 *    - Secondary crane hook hoists.
 *    - Wind turbine blades spin continuously.
 *    - Compass drafting arcs revolve with blueprint motion.
 */
const ArchitecturalBlueprint = ({ imageSrc, alt = 'Texcity Builders Architecture' }) => {
  const [containerRef, inView] = useInView(0.15);
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsDrawn(true);
    }
  }, [inView]);

  return (
    <div
      ref={containerRef}
      className={`blueprint-canvas-wrap ${isDrawn ? 'is-drawn' : ''}`}
    >
      {/* Base Image */}
      <img
        src={imageSrc}
        alt={alt}
        className="blueprint-base-img"
        loading="lazy"
      />

      {/* Blueprint Construction Vector Overlay (viewBox matches image aspect 646 x 697) */}
      <svg
        className="blueprint-svg-overlay"
        viewBox="0 0 646 697"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          {/* Luminous Blueprint Stroke Gradients */}
          <linearGradient id="bpCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="bpGreenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8cc63f" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.75" />
          </linearGradient>

          {/* Glow Filter */}
          <filter id="bpGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* =========================================================
            LAYER 1: COMPASS DRAFTING ARCS & RADIAL GUIDELINES
            ========================================================= */}
        <g className="compass-drawing-group">
          {/* Outer Compass Arc r=285 */}
          <path
            d="M 65,330 A 285,285 0 0,1 625,330"
            className="bp-stroke bp-arc outer-arc"
            stroke="url(#bpCyanGrad)"
            strokeWidth="1.4"
            fill="none"
            strokeDasharray="900"
            strokeDashoffset={isDrawn ? '0' : '900'}
          />

          {/* Middle Compass Arc r=225 with dashed ticks */}
          <path
            d="M 120,330 A 225,225 0 0,1 570,330"
            className="bp-stroke bp-arc middle-arc"
            stroke="#0284c7"
            strokeWidth="1.2"
            strokeDasharray="6,4"
            fill="none"
          />

          {/* Inner Compass Arc r=170 */}
          <path
            d="M 175,330 A 170,170 0 0,1 515,330"
            className="bp-stroke bp-arc inner-arc"
            stroke="url(#bpGreenGrad)"
            strokeWidth="1"
            strokeDasharray="4,6"
            fill="none"
          />

          {/* Radial Drafting Angles (radiating from compass center 345, 330) */}
          <line x1="345" y1="330" x2="145" y2="130" className="bp-stroke bp-guide" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3,3" />
          <line x1="345" y1="330" x2="345" y2="45" className="bp-stroke bp-guide" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3,3" />
          <line x1="345" y1="330" x2="545" y2="130" className="bp-stroke bp-guide" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3,3" />

          {/* Compass Angle Ticks */}
          <circle cx="345" cy="45" r="3" fill="#00e5ff" className="bp-pulse-dot" />
          <circle cx="145" cy="130" r="2.5" fill="#8cc63f" className="bp-pulse-dot" />
          <circle cx="545" cy="130" r="2.5" fill="#00e5ff" className="bp-pulse-dot" />
        </g>

        {/* =========================================================
            LAYER 2: BACKGROUND SKYSCRAPERS STRUCTURAL GRID
            ========================================================= */}
        <g className="building-wireframes">
          {/* Building Center-Left (x=278 to 338, y=238 to 360) */}
          <g className="building-grid building-1">
            <rect x="278" y="238" width="60" height="120" fill="none" stroke="#0f3a5d" strokeWidth="1.2" strokeDasharray="400" strokeDashoffset={isDrawn ? '0' : '400'} className="bp-stroke" />
            {/* Columns */}
            <line x1="298" y1="238" x2="298" y2="358" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="318" y1="238" x2="318" y2="358" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
            {/* Floor Slabs */}
            <line x1="278" y1="258" x2="338" y2="258" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="278" y1="278" x2="338" y2="278" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="278" y1="298" x2="338" y2="298" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="278" y1="318" x2="338" y2="318" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
          </g>

          {/* Building Center-Right (x=372 to 420, y=285 to 380) */}
          <g className="building-grid building-2">
            <rect x="372" y="285" width="48" height="95" fill="none" stroke="#0f3a5d" strokeWidth="1.2" strokeDasharray="300" strokeDashoffset={isDrawn ? '0' : '300'} className="bp-stroke" />
            <line x1="396" y1="285" x2="396" y2="380" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="372" y1="305" x2="420" y2="305" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="372" y1="325" x2="420" y2="325" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="372" y1="345" x2="420" y2="345" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
          </g>

          {/* Building Right-Tower (x=435 to 495, y=230 to 380) */}
          <g className="building-grid building-3">
            <rect x="435" y="230" width="60" height="150" fill="none" stroke="#0f3a5d" strokeWidth="1.2" strokeDasharray="450" strokeDashoffset={isDrawn ? '0' : '450'} className="bp-stroke" />
            <line x1="455" y1="230" x2="455" y2="380" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="475" y1="230" x2="475" y2="380" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="435" y1="260" x2="495" y2="260" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="435" y1="290" x2="495" y2="290" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="435" y1="320" x2="495" y2="320" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="435" y1="350" x2="495" y2="350" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.7" />
          </g>
        </g>

        {/* =========================================================
            LAYER 3: ANIMATED WIND TURBINE (x=222, y=230)
            ========================================================= */}
        <g className="turbine-group">
          {/* Turbine Mast */}
          <line x1="222" y1="230" x2="222" y2="310" stroke="#0f3a5d" strokeWidth="2" className="bp-stroke" />
          <line x1="220" y1="310" x2="224" y2="310" stroke="#0f3a5d" strokeWidth="2.5" />
          {/* Rotating Blades */}
          <g className="rotating-turbine-rotor" style={{ transformOrigin: '222px 230px' }}>
            <circle cx="222" cy="230" r="3" fill="#0f3a5d" />
            <line x1="222" y1="230" x2="222" y2="190" stroke="#0f3a5d" strokeWidth="2" strokeLinecap="round" />
            <line x1="222" y1="230" x2="257" y2="250" stroke="#0f3a5d" strokeWidth="2" strokeLinecap="round" />
            <line x1="222" y1="230" x2="187" y2="250" stroke="#0f3a5d" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>

        {/* =========================================================
            LAYER 4: MAIN TOWER CRANE (CENTER)
            ========================================================= */}
        <g className="center-crane-group">
          {/* Vertical Lattice Mast (x=349 to 361, y=95 to 300) */}
          <g className="crane-mast">
            <line x1="349" y1="95" x2="349" y2="300" stroke="#0f3a5d" strokeWidth="1.8" className="bp-stroke" />
            <line x1="361" y1="95" x2="361" y2="300" stroke="#0f3a5d" strokeWidth="1.8" className="bp-stroke" />
            {/* Cross Bracing */}
            {[105, 125, 145, 165, 185, 205, 225, 245, 265, 285].map((y) => (
              <React.Fragment key={y}>
                <line x1="349" y1={y} x2="361" y2={y + 15} stroke="#0f3a5d" strokeWidth="1" strokeOpacity="0.8" />
                <line x1="361" y1={y} x2="349" y2={y + 15} stroke="#0f3a5d" strokeWidth="1" strokeOpacity="0.8" />
                <line x1="349" y1={y} x2="361" y2={y} stroke="#0f3a5d" strokeWidth="1" strokeOpacity="0.6" />
              </React.Fragment>
            ))}
          </g>

          {/* Crane Apex / Tower Head (pyramid top) */}
          <polygon points="349,95 355,58 361,95" fill="none" stroke="#0f3a5d" strokeWidth="1.8" className="bp-stroke" />
          <line x1="355" y1="58" x2="355" y2="95" stroke="#00e5ff" strokeWidth="1.2" strokeOpacity="0.8" />

          {/* Jib Tie Cables from Apex */}
          <line x1="355" y1="58" x2="260" y2="116" stroke="#0284c7" strokeWidth="1.4" strokeDasharray="300" strokeDashoffset={isDrawn ? '0' : '300'} className="bp-stroke" />
          <line x1="355" y1="58" x2="190" y2="116" stroke="#0284c7" strokeWidth="1.4" strokeDasharray="300" strokeDashoffset={isDrawn ? '0' : '300'} className="bp-stroke" />
          <line x1="355" y1="58" x2="445" y2="116" stroke="#0284c7" strokeWidth="1.4" strokeDasharray="300" strokeDashoffset={isDrawn ? '0' : '300'} className="bp-stroke" />

          {/* Main Horizontal Jib (extends left x=145 to 355 at y=116-124) */}
          <g className="crane-main-jib">
            <line x1="145" y1="116" x2="355" y2="116" stroke="#0f3a5d" strokeWidth="2" className="bp-stroke" />
            <line x1="145" y1="124" x2="355" y2="124" stroke="#0f3a5d" strokeWidth="1.8" className="bp-stroke" />
            {/* Jib Webbing */}
            {[160, 185, 210, 235, 260, 285, 310, 335].map((x) => (
              <React.Fragment key={x}>
                <line x1={x} y1="116" x2={x + 12} y2="124" stroke="#0f3a5d" strokeWidth="1" strokeOpacity="0.7" />
                <line x1={x + 12} y1="124" x2={x + 24} y2="116" stroke="#0f3a5d" strokeWidth="1" strokeOpacity="0.7" />
              </React.Fragment>
            ))}
          </g>

          {/* Counter-Jib (extends right x=355 to 455 at y=118) */}
          <g className="crane-counter-jib">
            <line x1="355" y1="118" x2="455" y2="118" stroke="#0f3a5d" strokeWidth="2" className="bp-stroke" />
            <line x1="355" y1="124" x2="455" y2="124" stroke="#0f3a5d" strokeWidth="1.8" className="bp-stroke" />
            {/* Counter-weight Block */}
            <rect x="432" y="112" width="22" height="18" fill="#0f3a5d" rx="2" />
          </g>

          {/* Operator Cabin */}
          <rect x="345" y="98" width="16" height="15" fill="#ffffff" stroke="#0f3a5d" strokeWidth="1.5" rx="1" />
          <line x1="347" y1="104" x2="359" y2="104" stroke="#00e5ff" strokeWidth="1" />

          {/* ACTIVE WORKING CRANE TROLLEY & HOOK (Moves along jib!) */}
          <g className="active-working-trolley">
            {/* Trolley Frame */}
            <rect x="-7" y="122" width="14" height="6" fill="#00e5ff" rx="1.5" />
            {/* Hoist Cable (pulses up and down) */}
            <line x1="0" y1="128" x2="0" y2="178" stroke="#0f3a5d" strokeWidth="1.4" strokeDasharray="2,2" className="hoist-cable" />
            {/* Hook Block & Hook */}
            <g className="crane-hook-block">
              <rect x="-4" y="178" width="8" height="9" fill="#0f3a5d" rx="1" />
              {/* Hook Curve */}
              <path d="M 0,187 Q -4,193 0,197 Q 4,195 2,190" fill="none" stroke="#00e5ff" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          </g>
        </g>

        {/* =========================================================
            LAYER 5: SECONDARY TOWER CRANE (RIGHT)
            ========================================================= */}
        <g className="right-crane-group">
          {/* Mast (x=436 to 446, y=215 to 370) */}
          <line x1="437" y1="215" x2="437" y2="370" stroke="#0f3a5d" strokeWidth="1.6" className="bp-stroke" />
          <line x1="447" y1="215" x2="447" y2="370" stroke="#0f3a5d" strokeWidth="1.6" className="bp-stroke" />
          {/* Apex */}
          <polygon points="437,215 442,185 447,215" fill="none" stroke="#0f3a5d" strokeWidth="1.6" className="bp-stroke" />
          {/* Jib (x=410 to 575 at y=224) */}
          <line x1="410" y1="224" x2="575" y2="224" stroke="#0f3a5d" strokeWidth="2" className="bp-stroke" />
          <line x1="442" y1="185" x2="515" y2="224" stroke="#0284c7" strokeWidth="1.2" className="bp-stroke" />
          {/* Secondary Crane Hoist */}
          <g className="secondary-crane-hoist">
            <rect x="502" y="222" width="10" height="5" fill="#0f3a5d" />
            <line x1="507" y1="227" x2="507" y2="270" stroke="#0f3a5d" strokeWidth="1.2" className="sec-hoist-line" />
            <circle cx="507" cy="272" r="3" fill="#8cc63f" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default ArchitecturalBlueprint;
