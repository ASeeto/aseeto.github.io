import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const pillars = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'No Agency Overhead',
    body: 'You work directly with me, not a rotating team of juniors. That means faster communication, consistent quality, and a point of contact who actually knows your project.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Built to Perform',
    body: 'Fast load times, clean code, and mobile-first layouts aren\'t optional extras — they\'re how I build every site by default.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'You Own Everything',
    body: 'When we\'re done, you own your domain, your hosting, and your code. No lock-in, no subscriptions to me unless you want ongoing support.',
  },
];

const WhyWorkWithMe: React.FC = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-20 sm:py-28"
      style={{ backgroundColor: 'var(--color-bg)' }}
      aria-labelledby="why-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <p className="section-subtitle mb-3">Why Choose Me</p>
          <h2 id="why-heading" className="section-title">What You Can Expect</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className={`reveal reveal-delay-${idx + 1} rounded-2xl p-7 border transition-all duration-300`}
              style={{
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.72)',
                boxShadow: '0 4px 24px rgba(34,34,59,0.06)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 36px rgba(34,34,59,0.1)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(34,34,59,0.06)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: 'var(--color-bg-alt)', color: 'var(--color-text)' }}
              >
                {pillar.icon}
              </div>
              <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--color-text)' }}>
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-3)' }}>
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithMe;
