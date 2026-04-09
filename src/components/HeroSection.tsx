import React, { useEffect, useState } from 'react';

interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  avatarInitials: string;
}

interface HeroSectionProps {
  hero: HeroData;
  onWorkWithMeClick: () => void;
}

const AirplaneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────
   Workspace illustration — walnut desk + laptop (showing portfolio
   site on screen) + coffee mug + notebook. Mirrors the visual style
   of the portfolio card thumbnails (walnut wood grain, warm tones).
   All IDs are prefixed "hw-" to avoid clashing with card SVG filters.
   ───────────────────────────────────────────────────────────────────── */
const WorkspaceIllustration: React.FC = () => (
  <svg
    viewBox="0 0 540 420"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full block"
    style={{ borderRadius: '1rem' }}
    aria-hidden="true"
  >
    <defs>
      {/* Wood grain — matches portfolio card approach */}
      <filter id="hw-grain" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="linearRGB">
        <feTurbulence type="turbulence" baseFrequency="0.016 0.004" numOctaves="4" seed="23" result="noise"/>
        <feColorMatrix type="matrix"
          values="0.32 0.19 0.05 0 0.36
                  0.17 0.11 0.03 0 0.21
                  0.05 0.03 0.01 0 0.09
                  0    0    0    1 0"
          in="noise" result="coloredNoise"/>
        <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" result="blended"/>
        <feComponentTransfer in="blended">
          <feFuncR type="linear" slope="1.16" intercept="-0.05"/>
          <feFuncG type="linear" slope="1.10" intercept="-0.04"/>
          <feFuncB type="linear" slope="1.02" intercept="-0.02"/>
        </feComponentTransfer>
      </filter>

      <radialGradient id="hw-vignette" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="transparent"/>
        <stop offset="100%" stopColor="#180E06" stopOpacity="0.52"/>
      </radialGradient>

      {/* Warm top-centre catch-light */}
      <radialGradient id="hw-ambient" cx="52%" cy="18%" r="62%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.11"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>

      {/* Screen interior gradient */}
      <linearGradient id="hw-screen" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0f1124"/>
        <stop offset="100%" stopColor="#1a1c2e"/>
      </linearGradient>

      <filter id="hw-shadow" x="-8%" y="-8%" width="116%" height="132%">
        <feDropShadow dx="0" dy="14" stdDeviation="22" floodColor="#000000" floodOpacity="0.48"/>
      </filter>
    </defs>

    {/* ── Walnut desk surface ── */}
    <rect width="540" height="420" fill="#7B5534"/>
    <rect width="540" height="420" fill="#7B5534" filter="url(#hw-grain)"/>
    <rect width="540" height="420" fill="url(#hw-vignette)"/>

    {/* ── Notebook + pencil (bottom-left, partially cropped) ── */}
    <g transform="translate(-18, 316) rotate(7)">
      {/* Page stack */}
      <rect x="4" y="-6" width="97" height="122" rx="3" fill="#faf6f2" opacity="0.45"/>
      <rect x="2" y="-3" width="101" height="122" rx="4" fill="#ffffff" opacity="0.55"/>
      {/* Cover */}
      <rect x="0" y="0" width="105" height="122" rx="5" fill="#f4ede0"/>
      {/* Spiral binding holes */}
      {[0,14,28,42,56,70,84,98,112].map((y, i) => (
        <circle key={i} cx="10" cy={y + 8} r="4.5" fill="none" stroke="#c9ada7" strokeWidth="2"/>
      ))}
      {/* Ruled lines */}
      <line x1="22" y1="20" x2="88" y2="20" stroke="#c9ada7" strokeWidth="1" opacity="0.6"/>
      <line x1="22" y1="32" x2="88" y2="32" stroke="#c9ada7" strokeWidth="1" opacity="0.6"/>
      <line x1="22" y1="44" x2="78" y2="44" stroke="#c9ada7" strokeWidth="1" opacity="0.55"/>
      <line x1="22" y1="56" x2="84" y2="56" stroke="#c9ada7" strokeWidth="1" opacity="0.5"/>
      <line x1="22" y1="68" x2="70" y2="68" stroke="#c9ada7" strokeWidth="1" opacity="0.45"/>
    </g>
    {/* Pencil */}
    <g transform="translate(82, 370) rotate(-32)">
      <rect x="-4" y="-4" width="8" height="86" rx="4" fill="#F5D36A"/>
      <rect x="-4" y="74" width="8" height="12" fill="#F0A090"/>
      <polygon points="-4,86 4,86 0,100" fill="#8B6B14"/>
    </g>

    {/* ── Coffee mug (right side) ── */}
    <g transform="translate(428, 256)">
      {/* Saucer shadow */}
      <ellipse cx="30" cy="68" rx="38" ry="9" fill="#3D2010" opacity="0.38"/>
      {/* Saucer */}
      <ellipse cx="30" cy="64" rx="34" ry="7" fill="#D4A870"/>
      <ellipse cx="30" cy="64" rx="28" ry="5" fill="#C8956C"/>
      {/* Mug body */}
      <path d="M6 16 Q6 12 10 12 L50 12 Q54 12 54 16 L54 60 Q54 64 50 64 L10 64 Q6 64 6 60 Z" fill="#F5EDE3"/>
      {/* Mug rim */}
      <ellipse cx="30" cy="12" rx="24" ry="5.5" fill="#E8E0D5"/>
      {/* Coffee surface */}
      <ellipse cx="30" cy="12" rx="20" ry="4" fill="#7A5233"/>
      {/* Handle */}
      <path d="M54 24 Q74 24 74 38 Q74 52 54 52" fill="none" stroke="#c9ada7" strokeWidth="5" strokeLinecap="round"/>
      {/* Steam */}
      <path d="M18 6 Q22 -3 18 -13" stroke="#f4ede0" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.65"/>
      <path d="M30 3 Q34 -7 30 -17" stroke="#f4ede0" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.65"/>
      <path d="M42 6 Q46 -3 42 -13" stroke="#f4ede0" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.65"/>
    </g>

    {/* ── Laptop ── */}
    <g transform="translate(68, 36)" filter="url(#hw-shadow)">

      {/* ── Screen lid ── */}
      <rect x="8" y="0" width="384" height="238" rx="12" fill="#22223b"/>
      {/* Bezel */}
      <rect x="18" y="10" width="364" height="218" rx="8" fill="#0c0e1c"/>
      {/* Display */}
      <rect x="20" y="12" width="360" height="214" rx="7" fill="url(#hw-screen)"/>
      {/* Camera dot */}
      <circle cx="200" cy="16" r="3" fill="#1a1c2e"/>

      {/* ── On-screen portfolio mockup ── */}

      {/* Header bar */}
      <rect x="20" y="12" width="360" height="30" rx="7" fill="#22223b"/>
      <rect x="20" y="30" width="360" height="12" fill="#22223b"/>
      {/* AS badge */}
      <rect x="30" y="17" width="20" height="16" rx="4" fill="#4a4e69"/>
      <rect x="34" y="21" width="12" height="8" rx="1.5" fill="#f4ede0" opacity="0.85"/>
      {/* Nav tab (active) */}
      <rect x="62" y="20" width="36" height="9" rx="2" fill="#f4ede0" opacity="0.88"/>
      <rect x="62" y="29" width="36" height="2" rx="1" fill="#f4ede0" opacity="0.8"/>
      {/* Nav tabs (inactive) */}
      <rect x="106" y="20" width="40" height="9" rx="2" fill="#9a8c98" opacity="0.4"/>
      <rect x="154" y="20" width="48" height="9" rx="2" fill="#9a8c98" opacity="0.4"/>

      {/* Hero section preview */}
      <rect x="20" y="42" width="360" height="118" fill="#1d1f30"/>
      {/* Left: text stubs */}
      <rect x="32" y="54" width="46" height="6" rx="2" fill="#9a8c98" opacity="0.5"/>
      <rect x="32" y="64" width="128" height="11" rx="2.5" fill="#f4ede0" opacity="0.85"/>
      <rect x="32" y="79" width="110" height="11" rx="2.5" fill="#f4ede0" opacity="0.75"/>
      <rect x="32" y="94" width="118" height="7" rx="2" fill="#c9ada7" opacity="0.52"/>
      <rect x="32" y="105" width="100" height="6" rx="2" fill="#c9ada7" opacity="0.42"/>
      {/* CTA buttons */}
      <rect x="32" y="116" width="56" height="16" rx="4" fill="#22223b"/>
      <rect x="96" y="116" width="64" height="16" rx="4" fill="none" stroke="#c9ada7" strokeWidth="1.2"/>
      {/* Right: avatar preview rings + circle */}
      <circle cx="298" cy="98" r="46" fill="#4a4e69" opacity="0.18"/>
      <circle cx="298" cy="98" r="36" fill="#4a4e69" opacity="0.28"/>
      <circle cx="298" cy="98" r="28" fill="#4a4e69" opacity="0.6"/>
      {/* AS initials on avatar */}
      <rect x="286" y="93" width="24" height="10" rx="2" fill="#f4ede0" opacity="0.8"/>

      {/* Skills section preview */}
      <rect x="20" y="160" width="360" height="66" fill="#1a1c2c"/>
      {/* 3 cards */}
      {[28, 143, 258].map((x, i) => (
        <g key={i}>
          <rect x={x} y="168" width="105" height="50" rx="5" fill="#222436" stroke="#2e3050" strokeWidth="1"/>
          <rect x={x + 8} y="176" width="58" height="5" rx="1.5" fill="#9a8c98" opacity="0.5"/>
          <rect x={x + 8} y="185" width="40" height="4" rx="1.5" fill="#c9ada7" opacity="0.38"/>
          <rect x={x + 52} y="185" width="32" height="4" rx="1.5" fill="#c9ada7" opacity="0.28"/>
          <rect x={x + 8} y="193" width="46" height="4" rx="1.5" fill="#c9ada7" opacity="0.33"/>
          <rect x={x + 58} y="193" width="26" height="4" rx="1.5" fill="#c9ada7" opacity="0.22"/>
        </g>
      ))}

      {/* Bottom bar */}
      <rect x="20" y="214" width="360" height="12" rx="5" fill="#0c0e1c" opacity="0.55"/>

      {/* ── Hinge ── */}
      <rect x="8" y="236" width="384" height="9" rx="3" fill="#1a1c2e"/>

      {/* ── Keyboard deck (perspective trapezoid) ── */}
      <path d="M0 245 L400 245 L387 324 L13 324 Z" fill="#22223b"/>

      {/* Keyboard recess */}
      <rect x="16" y="254" width="344" height="58" rx="5" fill="#1c1e30"/>

      {/* Key rows */}
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={`r1-${i}`} x={22 + i * 24} y={258} width={20} height={11} rx="2.5" fill="#252840"/>
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <rect key={`r2-${i}`} x={24 + i * 24} y={273} width={20} height={11} rx="2.5" fill="#252840"/>
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <rect key={`r3-${i}`} x={26 + i * 24} y={288} width={20} height={11} rx="2.5" fill="#252840"/>
      ))}
      {/* Spacebar row */}
      <rect x="38"  y="303" width="24" height="11" rx="2.5" fill="#252840"/>
      <rect x="66"  y="303" width="24" height="11" rx="2.5" fill="#252840"/>
      <rect x="94"  y="303" width="134" height="11" rx="2.5" fill="#252840"/>
      <rect x="232" y="303" width="24" height="11" rx="2.5" fill="#252840"/>
      <rect x="260" y="303" width="24" height="11" rx="2.5" fill="#252840"/>
      <rect x="288" y="303" width="24" height="11" rx="2.5" fill="#252840"/>
      <rect x="316" y="303" width="24" height="11" rx="2.5" fill="#252840"/>

      {/* Trackpad */}
      <rect x="160" y="260" width="80" height="56" rx="7" fill="#1a1c2e" stroke="#252840" strokeWidth="1.5"/>

      {/* Base bottom edge */}
      <path d="M13 324 L387 324 L382 330 L18 330 Z" fill="#1a1c2e"/>
    </g>

    {/* Warm ambient catch-light on top */}
    <rect width="540" height="420" fill="url(#hw-ambient)"/>
  </svg>
);

const HeroSection: React.FC<HeroSectionProps> = ({ hero, onWorkWithMeClick }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const scrollToSkills = () => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-bg min-h-[calc(100vh-4rem)] flex items-center" aria-labelledby="hero-name">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Text content */}
          <div className="order-2 lg:order-1">
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
              }}
            >
              <p className="section-subtitle mb-4">Portfolio</p>

              <h1
                id="hero-name"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none mb-3"
                style={{ color: 'var(--color-text)' }}
              >
                {hero.name}
              </h1>

              <div className="mb-1">
                <span className="text-lg sm:text-xl font-semibold" style={{ color: 'var(--color-text-2)' }}>
                  {hero.title}
                </span>
              </div>
              <div className="mb-3">
                <span className="text-sm sm:text-base font-medium" style={{ color: 'var(--color-text-3)' }}>
                  {hero.subtitle}
                </span>
              </div>

              {/* Travel location strip */}
              <div className="flex items-center gap-1.5 mb-5 text-sm" style={{ color: 'var(--color-text-3)' }}>
                <AirplaneIcon />
                <span>MA</span>
                <span style={{ color: 'var(--color-border)' }}>→</span>
                <span>NY</span>
                <span style={{ color: 'var(--color-border)' }}>→</span>
                <span>VA</span>
              </div>

              <p
                className="text-lg sm:text-xl italic font-light leading-relaxed mb-6 border-l-2 pl-4"
                style={{ color: 'var(--color-text-2)', borderColor: 'var(--color-border)' }}
              >
                "{hero.tagline}"
              </p>

              <p className="leading-relaxed text-base sm:text-lg mb-10 max-w-xl" style={{ color: 'var(--color-text-2)' }}>
                {hero.bio}
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <button onClick={scrollToSkills} className="btn-primary btn-ripple">
                  View My Skills
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </button>
                <button onClick={onWorkWithMeClick} className="btn-secondary btn-ripple">
                  Work With Me
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Marquee tech strip */}
              <div className="marquee-track overflow-hidden" aria-hidden="true">
                <div className="marquee-inner">
                  {['React', 'TypeScript', 'Node.js', 'Figma', 'Stripe', 'Tailwind', 'Sanity', 'GitHub Actions',
                    'React', 'TypeScript', 'Node.js', 'Figma', 'Stripe', 'Tailwind', 'Sanity', 'GitHub Actions'].map((tech, i) => (
                    <span key={i} className="marquee-item">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Workspace illustration */}
          <div
            className="order-1 lg:order-2 flex justify-center lg:justify-end transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.94)',
              transitionDelay: '0.15s',
            }}
          >
            <div className="relative w-full max-w-lg">
              <WorkspaceIllustration />

              {/* Available badge — floats over bottom of illustration */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 shadow-md rounded-full px-4 py-1.5 flex items-center gap-2 whitespace-nowrap border"
                style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                <span className="text-xs font-medium" style={{ color: 'var(--color-text-2)' }}>Available for projects</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
