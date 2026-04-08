import React, { useEffect, useState } from 'react';
import PortfolioGrid from '../components/PortfolioGrid';
import ContactForm from '../components/ContactForm';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import workData from '../data/work_with_me.json';
import homeData from '../data/home.json';

const WorkWithMe: React.FC = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const servicesRef = useScrollAnimation();
  const integrationsRef = useScrollAnimation();

  useEffect(() => {
    // Scroll to top when tab switches
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
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(28px)',
              }}
            >
              <p className="section-subtitle mb-4">{workData.intro.subheading}</p>
              <h1
                id="wwm-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-none mb-6"
              >
                {workData.intro.heading}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                {workData.intro.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services ────────────────────────────────────────────────── */}
      <section
        ref={servicesRef as React.RefObject<HTMLElement>}
        className="py-20 sm:py-28 bg-white"
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
                  style={{ background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)' }}
                  aria-hidden="true"
                >
                  {service.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Portfolio Grid ──────────────────────────────────────────── */}
      <PortfolioGrid
        portfolio={workData.portfolio}
        sectionLabel="Example Projects"
      />

      {/* ─── Integrations & Back-End ────────────────────────────────── */}
      <section
        ref={integrationsRef as React.RefObject<HTMLElement>}
        className="py-20 sm:py-28 bg-gray-50"
        aria-labelledby="integrations-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <p className="section-subtitle mb-3">Technical Stack</p>
            <h2 id="integrations-heading" className="section-title">
              Integrations &amp; Tools
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              Every project is paired with the right tools for your goals — from forms and
              payments to CMS, analytics, and deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workData.integrations.map((group, idx) => (
              <div
                key={group.category}
                className={`reveal reveal-delay-${Math.min(idx + 1, 6)} bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300`}
              >
                <h3 className="font-semibold text-gray-900 text-sm mb-3 pb-2 border-b border-gray-100">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
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

      {/* ─── CTA + Contact ──────────────────────────────────────────── */}
      <ContactForm
        contact={homeData.contact}
        heading={workData.cta.heading}
        subheading={workData.cta.body}
      />
    </div>
  );
};

export default WorkWithMe;
