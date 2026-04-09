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

              <div className="flex flex-wrap gap-3">
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
            </div>
          </div>

          {/* Right: Avatar */}
          <div
            className="order-1 lg:order-2 flex justify-center lg:justify-end transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.92)',
              transitionDelay: '0.15s',
            }}
          >
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border-2 scale-110 opacity-50" style={{ borderColor: 'var(--color-border)' }} aria-hidden="true" />
              <div className="absolute inset-0 rounded-full border scale-125 opacity-30" style={{ borderColor: 'var(--color-border)' }} aria-hidden="true" />

              {/* Avatar */}
              <div
                className="avatar-placeholder w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full flex items-center justify-center shadow-2xl relative z-10"
                role="img"
                aria-label={`${hero.name} — avatar`}
              >
                {hero.avatarUrl ? (
                  <img src={hero.avatarUrl} alt={hero.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-white text-5xl sm:text-6xl font-bold select-none">
                    {hero.avatarInitials}
                  </span>
                )}
              </div>

              {/* Status badge */}
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 shadow-md rounded-full px-4 py-1.5 flex items-center gap-2 whitespace-nowrap border"
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
