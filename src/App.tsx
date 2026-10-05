import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { Projects } from './components/Projects/Projects';
import { Skills } from './components/Skills/Skills';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { CinematicCursor } from './components/common/CinematicCursor';
import { CommandPalette } from './components/common/CommandPalette';

export const App: React.FC = () => {
  // Single-trigger IntersectionObserver for subtle scroll reveals (respects prefers-reduced-motion)
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-item').forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-item');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-200 overflow-x-hidden">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      {/* Desktop Lightweight Cinematic Cursor */}
      <CinematicCursor />

      {/* Global Command Palette (Ctrl+K / Cmd+K) */}
      <CommandPalette />

      {/* Restrained 3D Ambient Depth Layer (CSS/SVG only, 0 JS overhead) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="ambient-shape ambient-shape-1" />
        <div className="ambient-shape ambient-shape-2" />
        <div className="ambient-shape ambient-shape-3" />
        <div className="ambient-grid" />
      </div>

      {/* Header & Navigation */}
      <Navbar />

      {/* Main Semantic Content Stream */}
      <main id="main-content" className="relative z-10 focus:outline-none">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
