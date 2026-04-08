import React from 'react';
import HeroSection from '../components/HeroSection';
import SkillsSection from '../components/SkillsSection';
import ContactForm from '../components/ContactForm';
import homeData from '../data/home.json';

interface HomeProps {
  onWorkWithMeClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onWorkWithMeClick }) => {
  return (
    <div>
      <HeroSection
        hero={homeData.hero}
        onWorkWithMeClick={onWorkWithMeClick}
      />
      <SkillsSection skills={homeData.skills} />
      <ContactForm
        contact={homeData.contact}
        heading="Get In Touch"
        subheading="Have a project in mind or just want to connect? I'd love to hear from you."
      />
    </div>
  );
};

export default Home;
