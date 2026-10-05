import React, { useRef } from 'react';
import { ArrowDown, Download, Mail, ArrowUpRight } from 'lucide-react';
import { siteLinks } from '../../data/socialLinks';
import profilePhoto from '../../assets/images/profile.webp';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from '../common/BrandIcons';

export const Hero: React.FC = () => {
  const cardSceneRef = useRef<HTMLDivElement>(null);

  const scrollToProjects = () => {
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!cardSceneRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Controlled, tactile 3D card tilt (max ~6 degrees)
    const rx = (-y * 11).toFixed(2);
    const ry = (x * 11).toFixed(2);
    cardSceneRef.current.style.setProperty('--hero-rx', `${rx}deg`);
    cardSceneRef.current.style.setProperty('--hero-ry', `${ry}deg`);
  };

  const handlePointerLeave = () => {
    if (!cardSceneRef.current) return;
    cardSceneRef.current.style.setProperty('--hero-rx', '0deg');
    cardSceneRef.current.style.setProperty('--hero-ry', '0deg');
  };

  return (
    <section
      id="home"
      className="hero-section relative min-h-[calc(100svh-4rem)] lg:min-h-screen flex flex-col justify-between pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Layer 1: Ambient Background Illumination (CSS radial gradients, 0 JS) */}
      <div
        className="pointer-events-none absolute -top-16 -right-16 w-[340px] sm:w-[500px] lg:w-[680px] h-[340px] sm:h-[500px] lg:h-[680px] bg-[radial-gradient(circle,rgba(99,102,241,0.14)_0%,rgba(20,184,166,0.06)_50%,transparent_70%)] blur-3xl opacity-80"
        aria-hidden="true"
      />

      {/* Layer 2: Subtle Architectural Grid Background Plane */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-40"
        aria-hidden="true"
      />

      {/* Top Architectural System Header */}
      <header className="hero-in-1 w-full flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-4 mb-6 sm:mb-8 text-[11px] font-mono text-[var(--text-2)] z-10">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--surface-2)]/80 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/25 animate-pulse" aria-hidden="true" />
            <span className="text-[var(--text)] font-semibold tracking-wide">AVAILABLE FOR OPPORTUNITIES</span>
          </div>
          <span className="tracking-widest text-[var(--accent-secondary)] uppercase hidden sm:inline">
            01 / INTRO // 2026
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px] text-[var(--text-2)]" aria-hidden="true">
          <span>PSIT · CS '28</span>
          <span className="hidden md:inline">LAT 26.85°N / LONG 80.95°E</span>
          <span>LUCKNOW, IN</span>
        </div>
      </header>

      {/* Unified Spatial Canvas Stage */}
      <div className="hero-spatial-canvas relative w-full my-auto flex flex-col z-10">
        {/* Massive Editorial Headline — Dominates the Viewport */}
        <div className="hero-in-2 w-full mb-6 sm:mb-8">
          <span className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-[var(--text-2)] mb-2 block">
            HEY, I'M
          </span>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[clamp(4.75rem,9vw,8rem)] xl:text-[clamp(5.5rem,10vw,9.5rem)] font-black tracking-tight uppercase leading-[0.92] text-[var(--text)] select-none">
            ABHIJEET
            <span className="text-[var(--accent-secondary)] font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-[clamp(4.5rem,8vw,7.5rem)] ml-1">
              .
            </span>
          </h1>
        </div>

        {/* Spatial Composition Body: Asymmetric Stage Integrating Role, Narrative, CTAs and Floating 3D Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left/Center Text & CTAs Flow (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Technical Role Line */}
            <p className="hero-in-3 text-base sm:text-lg lg:text-xl font-bold font-mono tracking-tight text-[var(--accent-primary)] mb-4">
              SOFTWARE DEVELOPER // AI &amp; FULL-STACK
            </p>

            {/* Grounded & Truthful Summary */}
            <p className="hero-in-4 text-sm sm:text-base text-[var(--text-2)] max-w-xl leading-relaxed mb-6 sm:mb-8">
              Computer Science undergraduate at PSIT (2024–2028). Focused on building scalable backend
              APIs, database-driven applications, and AI-powered solutions while strengthening DSA and
              modern software engineering.
            </p>

            {/* Action CTAs */}
            <div className="hero-in-5 flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-6">
              <button
                type="button"
                onClick={scrollToProjects}
                className="btn-primary w-full sm:w-auto"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <a
                href={siteLinks.resume.url}
                download={siteLinks.resume.download}
                className="btn-secondary w-full sm:w-auto"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Direct Connect Links */}
            <div className="hero-in-6 flex items-center gap-2.5 pt-4 border-t border-[var(--border-subtle)] w-full max-w-md">
              <span className="text-xs font-mono text-[var(--text-2)] mr-1">Direct:</span>

              <a
                href={siteLinks.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] p-2.5 rounded-lg text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                aria-label={siteLinks.github.accessibilityLabel}
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={siteLinks.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] p-2.5 rounded-lg text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                aria-label={siteLinks.linkedin.accessibilityLabel}
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={siteLinks.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] p-2.5 rounded-lg text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                aria-label={siteLinks.leetcode.accessibilityLabel}
              >
                <LeetcodeIcon className="w-4 h-4" />
              </a>

              <a
                href={siteLinks.email.url}
                className="min-h-[44px] min-w-[44px] p-2.5 rounded-lg text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                aria-label={siteLinks.email.accessibilityLabel}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Floating 3D Portrait Object (5 cols on desktop, centered on mobile) */}
          <div
            className="lg:col-span-5 flex justify-center lg:justify-end relative select-none w-full"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <div className="hero-in-core hero-3d-scene w-full max-w-[270px] sm:max-w-[300px] xl:max-w-[320px] min-h-[360px] sm:min-h-[400px]">
              <div ref={cardSceneRef} className="hero-3d-wrap relative flex items-center justify-center">
                {/* Back Layer: Ambient Radial Illumination Plane (-35px) */}
                <div
                  className="hero-plane-glow absolute -inset-6 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.22)_0%,rgba(20,184,166,0.08)_50%,transparent_70%)] blur-xl pointer-events-none"
                  aria-hidden="true"
                />

                {/* Back Layer: Thin Architectural Wireframe Guides (-15px) */}
                <div
                  className="hero-plane-wire absolute -inset-3 rounded-2xl border border-[var(--border-subtle)] pointer-events-none"
                  aria-hidden="true"
                >
                  <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-[var(--accent-secondary)]" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-[var(--accent-secondary)]" />
                  <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-[var(--accent-secondary)]" />
                  <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-[var(--accent-secondary)]" />
                </div>

                {/* Middle Layer: The Physical Portrait Card (+32px) */}
                <div className="hero-portrait-card relative w-full rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.65)] overflow-hidden">
                  {/* Physical Card Node Header */}
                  <div className="px-3.5 py-2.5 bg-[var(--surface-2)]/90 border-b border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-2)]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-[var(--text)]">AS // PORTRAIT NODE</span>
                    </div>
                    <span>PSIT · 2024–28</span>
                  </div>

                  {/* Real Untouched Photo with Subtle Framing */}
                  <div className="relative aspect-[4/5] bg-[var(--surface-2)] overflow-hidden">
                    <img
                      src={profilePhoto}
                      alt="Portrait of Abhijeet Singh"
                      width={800}
                      height={800}
                      loading="eager"
                      fetchPriority="high"
                      className="w-full h-full object-cover select-none"
                    />
                    {/* Subtle Inner Glass Reflection */}
                    <div
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none opacity-60"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Physical Card Footer */}
                  <div className="p-3 bg-[var(--surface)] border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[var(--text)] block leading-tight">
                        Abhijeet Singh
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-2)]">
                        Software Developer · AI/ML
                      </span>
                    </div>

                    <a
                      href={siteLinks.linkedin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-md hover:bg-[var(--surface-2)] text-[var(--text-2)] hover:text-[var(--accent-secondary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                      aria-label="Abhijeet Singh LinkedIn profile"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Front Layer: Floating System Metadata Badge (+52px) */}
                <div
                  className="hero-portrait-badge absolute -bottom-3 -right-2 px-3 py-1.5 rounded-full bg-[var(--surface)]/95 backdrop-blur-md border border-[var(--border)] shadow-xl flex items-center gap-2 pointer-events-none text-[10px] font-mono text-[var(--text)]"
                  aria-hidden="true"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] animate-pulse" />
                  <span>CS // LUCKNOW · CGPA 7.54</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Editorial Footer: System Triad & Minimal Scroll Indicator */}
      <footer className="hero-in-7 w-full pt-6 mt-auto border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-2)] z-10">
        {/* System Triad */}
        <div className="flex items-center gap-6" aria-hidden="true">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent-secondary)] font-bold">01</span>
            <span>SYSTEM</span>
          </div>
          <span className="text-[var(--text-2)]/60">/</span>
          <div className="flex items-center gap-2">
            <span className="text-indigo-400 font-bold">02</span>
            <span>BUILD</span>
          </div>
          <span className="text-[var(--text-2)]/60">/</span>
          <div className="flex items-center gap-2">
            <span className="text-[var(--text)] font-bold">03</span>
            <span>SHIP</span>
          </div>
        </div>

        {/* Minimal Scroll Indicator */}
        <button
          type="button"
          aria-label="Scroll to explore projects"
          className="scroll-indicator-pulse min-h-[44px] inline-flex items-center gap-2 text-[11px] uppercase tracking-wider text-[var(--text)] hover:text-[var(--accent-secondary)] transition-colors cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] rounded-md px-3 py-2"
          onClick={scrollToProjects}
        >
          <span className="font-mono font-medium">SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 text-[var(--accent-secondary)]" aria-hidden="true" />
        </button>
      </footer>
    </section>
  );
};
