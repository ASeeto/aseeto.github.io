import React, { useState } from 'react';
import './App.css';
import Header, { TabId } from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WorkWithMe from './pages/WorkWithMe';
import BackToTop from './components/BackToTop';
import homeData from './data/home.json';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('about');

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    // Smooth scroll to top on tab switch
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      <main id="main-content" className="flex-1" role="main">
        {activeTab === 'about' ? (
          <Home onWorkWithMeClick={() => handleTabChange('work')} />
        ) : (
          <WorkWithMe />
        )}
      </main>

      <Footer contact={homeData.contact} />
      <BackToTop />
    </div>
  );
}

export default App;
