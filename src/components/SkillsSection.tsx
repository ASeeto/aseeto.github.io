import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Skill {
  category: string;
  icon: string;
  items: string[];
}

interface SkillsSectionProps {
  skills: Skill[];
}

// Background icons for each skill category — 2D SVG, low-opacity watermark style
const SkillBackgroundIcon: React.FC<{ category: string }> = ({ category }) => {
  const props = { width: 72, height: 72, fill: 'none', stroke: '#22223b', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  if (category === 'Front-End') {
    return (
      <svg viewBox="0 0 72 72" {...props}>
        {/* < / > code brackets */}
        <path d="M22 24L8 36l14 12" />
        <path d="M50 24l14 12-14 12" />
        <path d="M42 18L30 54" />
      </svg>
    );
  }
  if (category === 'Back-End & Systems') {
    return (
      <svg viewBox="0 0 72 72" {...props}>
        {/* Triangle node graph */}
        <circle cx="36" cy="14" r="5" />
        <circle cx="14" cy="52" r="5" />
        <circle cx="58" cy="52" r="5" />
        <line x1="36" y1="19" x2="14" y2="47" />
        <line x1="36" y1="19" x2="58" y2="47" />
        <line x1="19" y1="52" x2="53" y2="52" />
      </svg>
    );
  }
  if (category === 'CI/CD & Deployment') {
    return (
      <svg viewBox="0 0 72 72" {...props}>
        {/* Circular pipeline arrows */}
        <path d="M36 12a24 24 0 0 1 20.8 12" strokeLinecap="round" />
        <path d="M56.8 24a24 24 0 0 1-4 22.4" strokeLinecap="round" />
        <path d="M52.8 46.4a24 24 0 0 1-33.6 0" strokeLinecap="round" />
        <path d="M19.2 46.4a24 24 0 0 1-4-22.4" strokeLinecap="round" />
        <path d="M15.2 24A24 24 0 0 1 36 12" strokeLinecap="round" />
        {/* Arrowheads on the cycle */}
        <polyline points="54,18 57,24 63,22" />
        <polyline points="16,44 12,50 18,52" />
        <polyline points="42,60 36,58 36,64" />
      </svg>
    );
  }
  if (category === 'Design & UX') {
    return (
      <svg viewBox="0 0 72 72" {...props}>
        {/* Pen nib / bezier anchor handles */}
        <path d="M36 58L18 36 36 14l18 22-18 22z" />
        <line x1="36" y1="14" x2="36" y2="6" />
        <line x1="18" y1="36" x2="6" y2="36" />
        <line x1="54" y1="36" x2="66" y2="36" />
        <circle cx="36" cy="6" r="2.5" fill="#22223b" />
        <circle cx="6" cy="36" r="2.5" fill="#22223b" />
        <circle cx="66" cy="36" r="2.5" fill="#22223b" />
        <circle cx="36" cy="38" r="3" fill="#22223b" />
      </svg>
    );
  }
  // Leadership — org chart
  return (
    <svg viewBox="0 0 72 72" {...props}>
      <rect x="27" y="8" width="18" height="12" rx="3" />
      <line x1="36" y1="20" x2="36" y2="32" />
      <line x1="16" y1="32" x2="56" y2="32" />
      <line x1="16" y1="32" x2="16" y2="44" />
      <line x1="36" y1="32" x2="36" y2="44" />
      <line x1="56" y1="32" x2="56" y2="44" />
      <rect x="7" y="44" width="18" height="12" rx="3" />
      <rect x="27" y="44" width="18" height="12" rx="3" />
      <rect x="47" y="44" width="18" height="12" rx="3" />
    </svg>
  );
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const sectionRef = useScrollAnimation();

  return (
    <section
      id="skills"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-20 sm:py-28"
      style={{ backgroundColor: '#f2e9e4' }}
      aria-labelledby="skills-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14 reveal">
          <p className="section-subtitle mb-3">What I Bring</p>
          <h2 id="skills-heading" className="section-title">
            Skills &amp; Expertise
          </h2>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <div
              key={skill.category}
              className={`reveal reveal-delay-${Math.min(idx + 1, 6)} relative overflow-hidden rounded-2xl p-6 border transition-all duration-300`}
              style={{
                backgroundColor: 'white',
                borderColor: '#c9ada7',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#9a8c98'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px 0 rgba(34,34,59,0.08)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#c9ada7'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              {/* Background icon watermark */}
              <div
                className="absolute top-2 right-2 pointer-events-none select-none"
                style={{ opacity: 0.07 }}
                aria-hidden="true"
              >
                <SkillBackgroundIcon category={skill.category} />
              </div>

              {/* Category header */}
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #22223b, #4a4e69)' }}
                  aria-hidden="true"
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="font-semibold text-sm" style={{ color: '#22223b' }}>{skill.category}</h3>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 relative z-10">
                {skill.items.map((item) => (
                  <span key={item} className="tag-badge">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
