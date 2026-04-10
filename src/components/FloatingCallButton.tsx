import React, { useEffect, useState } from 'react';

interface Props {
  email: string;
  activeTab: string;
}

const FloatingCallButton: React.FC<Props> = ({ email, activeTab }) => {
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const mailtoHref = `mailto:${email.replace('@', '+business@')}`;

  useEffect(() => {
    const check = () => {
      setBackToTopVisible(window.scrollY > 400);
      const contact = document.getElementById('contact');
      if (contact) {
        const rect = contact.getBoundingClientRect();
        setContactVisible(rect.top < window.innerHeight * 0.85 && rect.bottom > 0);
      } else {
        setContactVisible(false);
      }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [activeTab]);

  if (contactVisible) return null;

  // BackToTop: right-6 (24px) + w-10 (40px) + 8px gap = 72px from right
  const rightPx = backToTopVisible ? 72 : 24;

  return (
    <a
      href={mailtoHref}
      className="floating-call-btn fixed bottom-6 z-50 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg"
      style={{
        right: `${rightPx}px`,
        backgroundColor: 'var(--color-text)',
        color: 'var(--color-bg)',
        transition: 'right 0.3s ease',
        whiteSpace: 'nowrap',
      }}
      aria-label="Schedule a free call"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.08-1.08a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
      Schedule a Free Call
    </a>
  );
};

export default FloatingCallButton;
