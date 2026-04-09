import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    body: 'Free 30-minute call. We talk about your goals, your audience, and what success looks like for you.',
  },
  {
    number: '02',
    title: 'Design',
    body: 'I show you a working concept — a real, clickable demo of what your site could look like. You give feedback before we commit to anything.',
  },
  {
    number: '03',
    title: 'Build',
    body: 'Once approved, I build out the full site with all agreed content, integrations, and mobile layouts.',
  },
  {
    number: '04',
    title: 'Launch',
    body: 'I handle deployment, do final QA across devices, and make sure everything is live and working on your domain.',
  },
];

const ProcessSection: React.FC = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-20 sm:py-28"
      style={{ backgroundColor: 'var(--color-bg-alt)' }}
      aria-labelledby="process-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <p className="section-subtitle mb-3">How It Works</p>
          <h2 id="process-heading" className="section-title">From First Call to Live Site</h2>
        </div>

        {/* Desktop: horizontal stepper */}
        <div className="hidden sm:grid sm:grid-cols-4 gap-0 relative">
          {/* Connector line */}
          <div
            className="absolute top-8 left-[12.5%] right-[12.5%] h-px"
            style={{ backgroundColor: 'var(--color-border)' }}
            aria-hidden="true"
          />

          {steps.map((step, idx) => (
            <div
              key={step.number}
              className={`reveal reveal-delay-${idx + 1} flex flex-col items-center text-center px-4`}
            >
              {/* Number badge */}
              <div
                className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-5 font-bold text-sm tracking-widest"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1.5px solid var(--color-border-strong)',
                  color: 'var(--color-text)',
                  boxShadow: '0 2px 12px rgba(34,34,59,0.07)',
                }}
              >
                {step.number}
              </div>
              <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--color-text)' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-3)' }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="sm:hidden flex flex-col gap-0">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className={`reveal reveal-delay-${idx + 1} flex gap-5 pb-8`}
            >
              {/* Left: number + vertical line */}
              <div className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs tracking-widest shrink-0"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    border: '1.5px solid var(--color-border-strong)',
                    color: 'var(--color-text)',
                    boxShadow: '0 2px 12px rgba(34,34,59,0.07)',
                  }}
                >
                  {step.number}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className="w-px flex-1 mt-3"
                    style={{ backgroundColor: 'var(--color-border)', minHeight: '2rem' }}
                    aria-hidden="true"
                  />
                )}
              </div>
              {/* Right: content */}
              <div className="pt-2">
                <h3 className="font-semibold text-base mb-1" style={{ color: 'var(--color-text)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-3)' }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
