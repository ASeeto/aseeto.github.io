import React, { useEffect, useState } from 'react';
import PortfolioGrid from '../components/PortfolioGrid';
import ContactForm from '../components/ContactForm';
import ProcessSection from '../components/ProcessSection';
import WhyWorkWithMe from '../components/WhyWorkWithMe';
import FAQSection from '../components/FAQSection';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import workData from '../data/work_with_me.json';
import homeData from '../data/home.json';

const WorkWithMe: React.FC = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const servicesRef = useScrollAnimation();
  const integrationsRef = useScrollAnimation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      {/* ─── Hero / Intro ────────────────────────────────────────────── */}
      <section className="hero-bg py-20 sm:py-28" aria-labelledby="wwm-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div
              className="transition-all duration-700 ease-out"
              style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(28px)' }}
            >
              <p className="section-subtitle mb-4">{workData.intro.subheading}</p>
              <h1
                id="wwm-heading"
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none mb-6"
                style={{ color: 'var(--color-text)' }}
              >
                {workData.intro.heading}
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed max-w-2xl" style={{ color: 'var(--color-text-2)' }}>
                {workData.intro.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services ────────────────────────────────────────────────── */}
      <section
        ref={servicesRef as React.RefObject<HTMLElement>}
        className="py-20 sm:py-28"
        style={{ backgroundColor: 'var(--color-bg)' }}
        aria-labelledby="services-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <p className="section-subtitle mb-3">What I Offer</p>
            <h2 id="services-heading" className="section-title">Services</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workData.services.map((service, idx) => (
              <div
                key={service.title}
                className={`reveal reveal-delay-${Math.min(idx + 1, 6)} service-card`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4"
                  style={{ background: 'linear-gradient(135deg, var(--color-bg), var(--color-bg-alt))' }}
                  aria-hidden="true"
                >
                  {service.icon}
                </div>
                <h3 className="font-semibold mb-2 text-sm" style={{ color: 'var(--color-text)' }}>{service.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-3)' }}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Portfolio Grid ──────────────────────────────────────────── */}
      <PortfolioGrid portfolio={workData.portfolio} sectionLabel="Example Projects" />

      {/* ─── Process ─────────────────────────────────────────────────── */}
      <ProcessSection />

      {/* ─── Why Work With Me ────────────────────────────────────────── */}
      <WhyWorkWithMe />

      {/* ─── FAQ ─────────────────────────────────────────────────────── */}
      <FAQSection />

      {/* ─── Integrations & Back-End ────────────────────────────────── */}
      <section
        ref={integrationsRef as React.RefObject<HTMLElement>}
        className="py-20 sm:py-28"
        style={{ backgroundColor: 'var(--color-bg-alt)' }}
        aria-labelledby="integrations-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <p className="section-subtitle mb-3">Technical Stack</p>
            <h2 id="integrations-heading" className="section-title">Integrations &amp; Tools</h2>
            <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base" style={{ color: 'var(--color-text-3)' }}>
              Every project is paired with the right tools for your goals — from forms and
              payments to CMS, analytics, and deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workData.integrations.map((group, idx) => (
              <div
                key={group.category}
                className={`reveal reveal-delay-${Math.min(idx + 1, 6)} bg-white rounded-2xl p-6 border transition-all duration-300`}
                style={{ borderColor: 'var(--color-border)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-strong)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px 0 rgba(34,34,59,0.07)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <h3 className="font-semibold text-sm mb-3 pb-2 border-b" style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)' }}>
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="tag-badge">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Schedule CTA ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="section-subtitle mb-3">Ready to Start?</p>
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
            style={{ color: 'var(--color-text)' }}
          >
            {workData.cta.heading}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: 'var(--color-text-2)' }}>
            {workData.cta.body}
          </p>
          <a
            href={`mailto:${workData.cta.email.replace('@', '+business@')}`}
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base"
          >
            {workData.cta.buttonText}
          </a>
        </div>
      </section>

      {/* ─── CTA + Contact ──────────────────────────────────────────── */}
      <ContactForm contact={homeData.contact} heading="Or Drop Me a Message" subheading="Prefer to write? Fill in the form and I'll get back to you within a day." />
    </div>
  );
};

export default WorkWithMe;
