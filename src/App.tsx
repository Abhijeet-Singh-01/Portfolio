import React from 'react';
import { AtmosphericBackground } from './components/Background/AtmosphericBackground';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { Projects } from './components/Projects/Projects';
import { Skills } from './components/Skills/Skills';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#08090b] text-[#f4f1ea] selection:bg-[#d4af37]/25 selection:text-[#fbf8f2]">
      {/* Cinematic Atmospheric Glow & Particle Canvas */}
      <AtmosphericBackground />

      {/* Sticky Editorial Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
};

export default App;
