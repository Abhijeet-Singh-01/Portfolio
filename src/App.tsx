import React, { Suspense, lazy, useEffect } from 'react';
import { AtmosphericBackground } from './components/Background/AtmosphericBackground';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { Projects } from './components/Projects/Projects';
import { Skills } from './components/Skills/Skills';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { ElevationHud } from './components/common/ElevationHud';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { experienceConfig } from './config/experienceConfig';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pointerStore } from './lib/pointerStore';
import { ExperienceIntro } from './components/common/ExperienceIntro';

const NeuralLandscape = lazy(() => import('./components/Background/NeuralLandscape').then((module) => ({ default: module.NeuralLandscape })));
gsap.registerPlugin(ScrollTrigger);

const ScrollEngine: React.FC<{ reduced: boolean }> = ({ reduced }) => {
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: experienceConfig.motion.scrollDuration, smoothWheel: true, touchMultiplier: 1.2 });
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const context=gsap.context(()=>{
      const timeline=gsap.timeline({scrollTrigger:{trigger:'#home',start:'top top',end:'bottom top',scrub:.8,onUpdate:(self)=>{pointerStore.heroProgress=self.progress;}}});
      timeline.to('.hero-copy',{y:experienceConfig.motion.heroExitY,opacity:experienceConfig.motion.heroExitOpacity,ease:'none'},0);
    });
    return () => { gsap.ticker.remove(tick); lenis.destroy(); context.revert(); pointerStore.heroProgress=0; };
  }, [reduced]);
  return null;
};

export const App: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

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
    <div className="relative min-h-screen bg-[var(--ascent-background)] text-[var(--ascent-text)] selection:bg-[#70e5f2]/25 selection:text-white">
      {/* Cinematic Atmospheric Glow & Particle Canvas */}
      <AtmosphericBackground />
      <Suspense fallback={null}><NeuralLandscape /></Suspense>
      <CustomCursor />
      <ElevationHud />
      <ExperienceIntro />
      <ScrollEngine reduced={prefersReducedMotion} />

      {/* Sticky Editorial Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
};

export default App;
