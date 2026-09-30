import React, { Component, lazy, Suspense, useEffect, useState } from 'react';
import { AtmosphericBackground } from './components/Background/AtmosphericBackground';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { Projects } from './components/Projects/Projects';
import { Skills } from './components/Skills/Skills';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { ElevationHud } from './components/common/ElevationHud';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { experienceConfig } from './config/experienceConfig';
import { IntroLoader, ExperienceCursor } from './components/World/ExperienceOverlays';

const ExperienceCanvas = lazy(() => import('./components/World/ExperienceCanvas'));

class ExperienceBoundary extends Component<React.PropsWithChildren, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export const App: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [sceneReady, setSceneReady] = useState(false);
  const [liteMode, setLiteMode] = useState(false);

  useEffect(() => {
    const handleLite = (e: Event) => {
      const isLite = (e as CustomEvent<boolean>).detail;
      setLiteMode(isLite);
    };
    window.addEventListener('aurora-lite-mode-change', handleLite);
    return () => window.removeEventListener('aurora-lite-mode-change', handleLite);
  }, []);

  useEffect(() => {
    const device = navigator as Navigator & { deviceMemory?: number };
    const veryWeak = (navigator.hardwareConcurrency || 8) <= 2 || (device.deviceMemory || 8) <= 2;
    if (prefersReducedMotion || veryWeak || !('WebGLRenderingContext' in window)) return;
    const timeout = window.setTimeout(() => setSceneReady(true), 300);
    return () => window.clearTimeout(timeout);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!('IntersectionObserver' in window) || prefersReducedMotion) return;
    const targets = document.querySelectorAll<HTMLElement>(
      '#projects .project-card, #skills .skill-category, #about .about-panel, #contact .contact-panel',
    );
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('depth-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    targets.forEach((target, index) => {
      target.classList.add('depth-enter');
      target.style.setProperty('--reveal-duration', `${experienceConfig.motion.revealDuration}ms`);
      target.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-accent-aqua/25 selection:text-text">
      <a className="skip-link" href="#main-content">Skip to content</a>
      {/* Cinematic Atmospheric Glow & Particle Canvas */}
      <AtmosphericBackground />
      {sceneReady && !liteMode && <ExperienceBoundary>
          <Suspense fallback={null}>
            <ExperienceCanvas />
          </Suspense>
        </ExperienceBoundary>}
      <IntroLoader />
      <ExperienceCursor />
      <ElevationHud />

      {/* Sticky Editorial Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="relative z-10">
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
