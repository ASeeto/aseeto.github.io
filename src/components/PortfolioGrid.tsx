import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface PortfolioItem {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  gradient: string;
  linkUrl?: string;
}

interface PortfolioGridProps {
  portfolio: PortfolioItem[];
  sectionLabel?: string;
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  portfolio,
  sectionLabel = 'Example Projects',
}) => {
  const sectionRef = useScrollAnimation();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-20 sm:py-28"
      style={{ backgroundColor: '#fff' }}
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14 reveal">
          <p className="section-subtitle mb-3">Portfolio</p>
          <h2 id="portfolio-heading" className="section-title">
            {sectionLabel}
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base" style={{ color: '#9a8c98' }}>
            A sample of recent projects — from landing pages to multi-page sites,
            each built with attention to detail and mobile-first principles.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {portfolio.map((item, idx) => {
            const cardClass = `reveal reveal-delay-${Math.min(idx + 1, 4)} group rounded-2xl overflow-hidden border card-hover block`;
            const cardStyle = { borderColor: '#c9ada7', backgroundColor: '#fff' };

            const inner = (
              <>
                {/* Thumbnail */}
                <div className={`relative h-48 bg-gradient-to-br ${item.gradient} overflow-hidden`}>
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10" aria-hidden="true" />
                      <div className="absolute bottom-4 left-4 w-14 h-14 rounded-lg bg-white/10 rotate-12" aria-hidden="true" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/5 border border-white/20" aria-hidden="true" />
                      <span className="relative z-10 text-white/90 font-semibold text-center text-sm leading-snug">
                        {item.title}
                      </span>
                    </div>
                  )}
                  {/* Hover overlay with "View Site" chip */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center" aria-hidden="true">
                    {item.linkUrl && (
                      <span
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full flex items-center gap-1.5"
                        style={{ background: 'rgba(34,34,59,0.75)', backdropFilter: 'blur(4px)' }}
                      >
                        View Site
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M7 7h10v10" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="font-semibold text-base mb-2 transition-colors duration-200"
                    style={{ color: '#22223b' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#9a8c98' }}>
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag-badge-gray">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            );

            return item.linkUrl ? (
              <a
                key={item.title}
                href={item.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${item.title} example site`}
                className={cardClass}
                style={cardStyle}
              >
                {inner}
              </a>
            ) : (
              <article key={item.title} className={cardClass} style={cardStyle}>
                {inner}
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PortfolioGrid;
