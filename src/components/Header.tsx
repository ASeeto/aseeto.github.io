import React, { useEffect, useRef, useState } from 'react';

export type TabId = 'about' | 'work';

interface HeaderProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work With Me' },
];

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Detect scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update sliding indicator position
  useEffect(() => {
    const updateIndicator = () => {
      const activeBtn = activeTabRef.current;
      const tabsContainer = tabsRef.current;
      if (!activeBtn || !tabsContainer) return;

      const btnRect = activeBtn.getBoundingClientRect();
      const containerRect = tabsContainer.getBoundingClientRect();

      setIndicatorStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      });
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm transition-shadow duration-300 ${
        isScrolled ? 'shadow-sm border-b border-gray-100' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <button
            onClick={() => onTabChange('about')}
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Go to homepage"
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)' }}
            >
              AS
            </span>
            <span className="font-semibold text-gray-900 text-sm sm:text-base tracking-tight group-hover:text-blue-600 transition-colors duration-200">
              Alex Seeto
            </span>
          </button>

          {/* Tab Navigation */}
          <nav
            ref={tabsRef}
            className="relative flex items-end gap-1 h-16"
            role="tablist"
            aria-label="Site navigation"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                ref={activeTab === tab.id ? activeTabRef : null}
                onClick={() => onTabChange(tab.id)}
                className={`relative px-4 py-2 mb-0 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 rounded-t-lg whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                style={{ marginBottom: 0, paddingBottom: '1.1rem' }}
              >
                {tab.label}
              </button>
            ))}

            {/* Sliding indicator */}
            <span
              className="tab-indicator"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
              aria-hidden="true"
            />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
