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

const HeroSection: React.FC<HeroSectionProps> = ({ hero, onWorkWithMeClick }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay so the animation fires after mount
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
              {/* Label */}
              <p className="section-subtitle mb-4">Portfolio</p>

              {/* Name */}
              <h1
                id="hero-name"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-none mb-3"
              >
                {hero.name}
              </h1>

              {/* Title */}
              <div className="mb-2">
                <span className="text-lg sm:text-xl font-semibold text-blue-600">
                  {hero.title}
                </span>
              </div>
              <div className="mb-6">
                <span className="text-sm sm:text-base font-medium text-gray-500">
                  {hero.subtitle}
                </span>
              </div>

              {/* Tagline */}
              <p className="text-lg sm:text-xl text-gray-600 italic font-light leading-relaxed mb-6 border-l-2 border-blue-300 pl-4">
                "{hero.tagline}"
              </p>

              {/* Bio */}
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-10 max-w-xl">
                {hero.bio}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={scrollToSkills}
                  className="btn-primary btn-ripple"
                >
                  View My Skills
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={onWorkWithMeClick}
                  className="btn-secondary btn-ripple"
                >
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
              <div className="absolute inset-0 rounded-full border-2 border-blue-200 scale-110 opacity-60" aria-hidden="true" />
              <div className="absolute inset-0 rounded-full border border-blue-100 scale-125 opacity-40" aria-hidden="true" />

              {/* Avatar */}
              <div
                className="avatar-placeholder w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full flex items-center justify-center shadow-2xl relative z-10"
                role="img"
                aria-label={`${hero.name} — avatar`}
              >
                {hero.avatarUrl ? (
                  <img
                    src={hero.avatarUrl}
                    alt={hero.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white text-5xl sm:text-6xl font-bold select-none">
                    {hero.avatarInitials}
                  </span>
                )}
              </div>

              {/* Status badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 bg-white border border-gray-100 shadow-md rounded-full px-4 py-1.5 flex items-center gap-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                <span className="text-xs font-medium text-gray-700">Available for projects</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
