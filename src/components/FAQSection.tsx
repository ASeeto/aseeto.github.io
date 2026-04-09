import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const faqs = [
  {
    question: 'How long does a project take?',
    answer:
      'A clean, static brochure site typically takes 1–2 weeks from approval to launch. Projects with CMS integrations or e-commerce usually take 3–5 weeks depending on scope. I\'ll give you a realistic timeline upfront — no surprises.',
  },
  {
    question: 'Do you work with clients outside your area?',
    answer:
      'Yes, fully remote works well for web projects. We\'ll communicate over email and video calls — most clients find it just as smooth as in-person.',
  },
  {
    question: 'What do you need from me to get started?',
    answer:
      'Not much to begin with. It helps to have: a rough idea of what your business does and who it\'s for, 2–3 websites you like the look of, and any existing branding like a logo or colors. If you don\'t have those yet, that\'s fine — we\'ll sort it out together on our first call.',
  },
  {
    question: 'Do you offer support after launch?',
    answer:
      'Yes. I offer a monthly maintenance plan that covers content updates, security patches, and minor tweaks. Pricing varies by scope — we can discuss what makes sense for your site.',
  },
  {
    question: 'What does it cost?',
    answer:
      'It depends on what you need. A simple landing page costs less than a multi-page site with a CMS and payment integration. I price per project, not per hour, so you\'ll always know the total upfront. Reach out and I\'ll give you a straight answer after a quick conversation.',
  },
];

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onToggle: () => void; index: number }> = ({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}) => (
  <div
    className={`reveal reveal-delay-${Math.min(index + 1, 5)} border-b`}
    style={{ borderColor: 'var(--color-border)' }}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-5 text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{ color: 'var(--color-text)' }}
      aria-expanded={isOpen}
    >
      <span className="font-semibold text-sm sm:text-base">{question}</span>
      <span
        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
        style={{
          backgroundColor: isOpen ? 'var(--color-text)' : 'var(--color-bg-alt)',
          color: isOpen ? 'var(--color-bg)' : 'var(--color-text-3)',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
        aria-hidden="true"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </span>
    </button>
    <div
      style={{
        maxHeight: isOpen ? '400px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <p
        className="text-sm leading-relaxed pb-5"
        style={{ color: 'var(--color-text-3)' }}
      >
        {answer}
      </p>
    </div>
  </div>
);

const FAQSection: React.FC = () => {
  const sectionRef = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-20 sm:py-28"
      style={{ backgroundColor: 'var(--color-bg)' }}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <p className="section-subtitle mb-3">Questions</p>
          <h2 id="faq-heading" className="section-title">Common Questions</h2>
        </div>

        <div className="max-w-2xl mx-auto border-t" style={{ borderColor: 'var(--color-border)' }}>
          {faqs.map((faq, idx) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
