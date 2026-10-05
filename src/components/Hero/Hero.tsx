import React, { useRef, useEffect, useState } from 'react';
import { ArrowDown, Download, Mail, ArrowUpRight } from 'lucide-react';
import { siteLinks } from '../../data/socialLinks';
import profilePhoto from '../../assets/images/profile.webp';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from '../common/BrandIcons';

export const Hero: React.FC = () => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const [coreMode, setCoreMode] = useState<'lens' | 'gimbal' | 'telemetry'>('lens');

  const scrollToProjects = () => {
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pointer movement: modulates the resting 3D angle and drives multi-plane parallax
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!heroSectionRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    heroSectionRef.current.style.setProperty('--mx', x.toFixed(3));
    heroSectionRef.current.style.setProperty('--my', y.toFixed(3));
  };

  const handlePointerLeave = () => {
    if (!heroSectionRef.current) return;
    heroSectionRef.current.style.setProperty('--mx', '0');
    heroSectionRef.current.style.setProperty('--my', '0');
  };

  // IntersectionObserver: drives camera scroll dolly-out without continuous scroll event listeners
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const section = heroSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const scrollProgress = Math.max(0, Math.min(1, 1 - entry.intersectionRatio));
        section.style.setProperty('--hero-scroll-progress', scrollProgress.toFixed(3));
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroSectionRef}
      id="home"
      className="hero-section relative min-h-[calc(100svh-4rem)] lg:min-h-screen flex flex-col justify-between pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden select-none"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Static CSS Lighting System: Key Light (Top-Left Violet) */}
      <div
        className="pointer-events-none absolute -top-24 -left-20 w-[380px] sm:w-[540px] lg:w-[680px] h-[380px] sm:h-[540px] lg:h-[680px] bg-[radial-gradient(circle,rgba(99,102,241,0.18)_0%,rgba(99,102,241,0.04)_50%,transparent_70%)] blur-3xl opacity-80"
        aria-hidden="true"
      />

      {/* Static CSS Lighting System: Rim Light (Bottom-Right Teal) */}
      <div
        className="pointer-events-none absolute -bottom-20 -right-16 w-[360px] sm:w-[500px] lg:w-[620px] h-[360px] sm:h-[500px] lg:h-[620px] bg-[radial-gradient(circle,rgba(20,184,166,0.14)_0%,rgba(20,184,166,0.03)_50%,transparent_70%)] blur-3xl opacity-75"
        aria-hidden="true"
      />

      {/* Architectural Spatial Grid Background Plane */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-35"
        aria-hidden="true"
      />

      {/* Top Architectural System Header */}
      <header className="hero-in-1 w-full flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-4 mb-6 sm:mb-8 text-[11px] font-mono text-[var(--text-2)] z-10">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--surface-2)]/80 backdrop-blur-sm shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/25 animate-pulse" aria-hidden="true" />
            <span className="text-[var(--text)] font-semibold tracking-wide">AVAILABLE FOR OPPORTUNITIES</span>
          </div>
          <span className="tracking-widest text-[var(--accent-secondary)] uppercase hidden sm:inline">
            01 / IDENTITY SYSTEM // 2026
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
        {/* Editorial Headline with Subtle 3D Typography Depth Layer */}
        <div className="hero-in-2 w-full mb-6 sm:mb-8">
          <span className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-[var(--text-2)] mb-2 block">
            HEY, I'M
          </span>

          <div className="relative inline-block" style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
            {/* 3D Depth Shadow/Duplicate Text Layer (-15px Z) */}
            <h1
              aria-hidden="true"
              className="hero-text-shadow absolute inset-0 text-6xl sm:text-7xl md:text-8xl lg:text-[clamp(4.75rem,9vw,8rem)] xl:text-[clamp(5.5rem,10vw,9.5rem)] font-black tracking-tight uppercase leading-[0.92] select-none text-[var(--accent-primary)]/15 pointer-events-none blur-[2px]"
            >
              ABHIJEET
              <span className="font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-[clamp(4.5rem,8vw,7.5rem)] ml-1">
                .
              </span>
            </h1>

            {/* Front Typography Layer (+24px Z) */}
            <h1 className="hero-text-front relative text-6xl sm:text-7xl md:text-8xl lg:text-[clamp(4.75rem,9vw,8rem)] xl:text-[clamp(5.5rem,10vw,9.5rem)] font-black tracking-tight uppercase leading-[0.92] text-[var(--text)] select-none">
              ABHIJEET
              <span className="text-[var(--accent-secondary)] font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-[clamp(4.5rem,8vw,7.5rem)] ml-1">
                .
              </span>
            </h1>
          </div>
        </div>

        {/* Spatial Composition Body: Asymmetric Stage Integrating Narrative & Central 3D Core */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
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

          {/* =================================================================
              CENTRAL 3D DIGITAL IDENTITY CORE SCENE (5 cols on desktop)
              Visibly Dimensional at Rest with Layering, Lens, Orbits, Objects
             ================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative w-full pt-4 pb-4">
            <div className="hero-in-core hero-3d-stage w-full max-w-[340px] sm:max-w-[380px] xl:max-w-[400px] min-h-[380px] sm:min-h-[420px]">
              
              {/* Core 3D Rig: Holds resting asymmetric angle & multi-layer assembly */}
              <div className="hero-core-rig relative w-[clamp(250px,72vw,310px)] h-[clamp(310px,88vw,390px)] flex items-center justify-center">

                {/* -------------------------------------------------------------
                    3D ORBITAL SYSTEMS: Passed behind & in front for true occlusion
                   ------------------------------------------------------------- */}

                {/* Orbit A (Equatorial Plane) - Back Arc (-52px Z) */}
                <div className="hero-orbit-a-back absolute pointer-events-none" aria-hidden="true">
                  <svg className="w-[clamp(280px,82vw,400px)] h-[clamp(280px,82vw,400px)] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 absolute" viewBox="0 0 400 400" fill="none">
                    <path
                      d="M 40 200 A 160 160 0 0 1 360 200"
                      stroke="var(--accent-primary)"
                      strokeWidth="1.2"
                      strokeDasharray="4 8"
                      strokeOpacity="0.32"
                    />
                  </svg>
                </div>

                {/* Orbit B (Meridian Plane) - Back Arc (-62px Z) */}
                <div className="hero-orbit-b-back absolute pointer-events-none" aria-hidden="true">
                  <svg className="w-[clamp(250px,74vw,360px)] h-[clamp(250px,74vw,360px)] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 absolute" viewBox="0 0 360 360" fill="none">
                    <path
                      d="M 180 30 A 150 150 0 0 0 180 330"
                      stroke="var(--accent-secondary)"
                      strokeWidth="1"
                      strokeDasharray="2 6"
                      strokeOpacity="0.3"
                    />
                  </svg>
                </div>

                {/* Orbit C (Celestial Diagonal Ring) (+15px Z, slow continuous loop) */}
                <div className="hero-orbit-c absolute pointer-events-none" aria-hidden="true">
                  <svg className="w-[clamp(290px,84vw,420px)] h-[clamp(290px,84vw,420px)] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 absolute" viewBox="0 0 420 420" fill="none">
                    <ellipse
                      cx="210"
                      cy="210"
                      rx="195"
                      ry="195"
                      stroke="var(--border)"
                      strokeWidth="1"
                      strokeDasharray="1 10"
                      strokeOpacity="0.45"
                    />
                    <circle cx="390" cy="210" r="3" fill="var(--accent-secondary)" />
                  </svg>
                </div>

                {/* -------------------------------------------------------------
                    FLOATING 3D TECHNICAL OBJECT 1: Deep Spatial Plate (-80px Z)
                   ------------------------------------------------------------- */}
                <div
                  className="hero-obj-plate absolute -left-2 sm:-left-8 -top-6 px-2.5 py-1.5 rounded-lg bg-[var(--surface)]/90 border border-[var(--border)] shadow-lg pointer-events-none select-none text-[9px] font-mono text-[var(--text-2)]"
                  aria-hidden="true"
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="w-1 h-1 rounded-full bg-[var(--accent-primary)]" />
                    <span className="text-[var(--text)] font-semibold">GRID REF</span>
                  </div>
                  <span>LAT 26.85°N / LONG 80.95°E</span>
                </div>

                {/* -------------------------------------------------------------
                    CENTRAL 3D CORE PHYSICAL LAYERS
                   ------------------------------------------------------------- */}

                {/* Layer 0: Deep Directional Cast Shadow Plane (-95px Z) */}
                <div
                  className="hero-shadow-plane absolute -inset-6 rounded-[3rem] pointer-events-none"
                  style={{
                    boxShadow: '24px 36px 70px -8px rgba(0, 0, 0, 0.85), 10px 18px 30px rgba(11, 11, 26, 0.95)',
                  }}
                  aria-hidden="true"
                />

                {/* Layer 1: Back Structural Chassis & Standoffs (-55px Z) */}
                <div
                  className="hero-back-chassis absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-[#181635] via-[#100F24] to-[#0A0918] border border-[var(--border)] pointer-events-none shadow-[inset_0_0_24px_rgba(0,0,0,0.85)]"
                  aria-hidden="true"
                >
                  {/* Mechanical Standoff Corner Pins */}
                  <span className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full border border-[var(--accent-primary)]/60 bg-[var(--surface)]" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full border border-[var(--accent-primary)]/60 bg-[var(--surface)]" />
                  <span className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full border border-[var(--accent-secondary)]/60 bg-[var(--surface)]" />
                  <span className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full border border-[var(--accent-secondary)]/60 bg-[var(--surface)]" />

                  {/* Chassis Label */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border-subtle)] text-[8px] font-mono text-[var(--text-2)] whitespace-nowrap">
                    CHASSIS // AS-CORE-MK4
                  </div>
                </div>

                {/* Layer 2: Stepped Depth Casing / Side Extrusion (-15px Z) */}
                <div
                  className="hero-depth-casing absolute -inset-1 rounded-[2.25rem] bg-[var(--surface-2)] border-r-2 border-b-2 border-r-[var(--accent-primary)]/40 border-b-[var(--accent-secondary)]/30 pointer-events-none shadow-[8px_14px_24px_rgba(0,0,0,0.55)]"
                  aria-hidden="true"
                />

                {/* Layer 3: Recessed Photo Plane & Physical Portrait Core (+6px Z) */}
                <div className="hero-photo-plane relative w-full h-full rounded-[2rem] bg-[var(--surface)] border border-[var(--border)] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col justify-between">
                  {/* Top Bezel Header */}
                  <div className="px-3.5 py-2.5 bg-[var(--surface-2)]/90 border-b border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-2)]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-[var(--text)]">AS // PORTRAIT CORE</span>
                    </div>
                    <span>PSIT · 2024–28</span>
                  </div>

                  {/* Recessed Photo Housing */}
                  <div className="relative flex-1 bg-[var(--surface-2)] overflow-hidden shadow-[inset_0_0_24px_rgba(0,0,0,0.85)]">
                    <img
                      src={profilePhoto}
                      alt="Portrait of Abhijeet Singh"
                      width={800}
                      height={800}
                      loading="eager"
                      fetchPriority="high"
                      className="w-full h-full object-cover select-none"
                    />

                    {/* Subtle Inner Lens Vignette */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/80 via-transparent to-black/20 pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Core Baseplate Footer */}
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

                {/* Layer 4: 3D Optical Glass Lens (+40px Z) */}
                <div
                  className="hero-glass-lens absolute inset-2 rounded-[1.85rem] pointer-events-none overflow-hidden"
                  aria-hidden="true"
                >
                  {/* High-grade optical lens body & specular edge highlight */}
                  <div className="absolute inset-0 rounded-[1.85rem] border border-white/25 border-t-white/60 border-l-white/40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_12px_28px_rgba(0,0,0,0.35)] bg-gradient-to-br from-white/10 via-transparent to-[var(--accent-secondary)]/5" />

                  {/* Diagonal Specular Reflection Sweep */}
                  <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/12 to-transparent rotate-45 pointer-events-none" />

                  {/* Radial Optical Flare in Upper-Left Quadrant */}
                  <div className="absolute top-2 left-2 w-28 h-28 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_65%)] pointer-events-none" />

                  {/* Micro Optical Indicator */}
                  <div className="absolute bottom-2.5 right-3 text-[8px] font-mono tracking-widest text-white/50">
                    LENS // OPTIC 38MM
                  </div>
                </div>

                {/* Layer 5: Front Titanium Bezel & Reticle Markers (+62px Z) */}
                <div
                  className="hero-front-bezel absolute -inset-2 rounded-[2.35rem] border border-[var(--border)] pointer-events-none"
                  aria-hidden="true"
                >
                  {/* Front Titanium Corner Brackets */}
                  <span className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-white/70" />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[var(--accent-secondary)]" />
                  <span className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[var(--accent-primary)]" />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-white/70" />
                </div>

                {/* -------------------------------------------------------------
                    3D ORBITAL SYSTEMS: Front Arcs passing IN FRONT of lens
                   ------------------------------------------------------------- */}

                {/* Orbit A (Equatorial Plane) - Front Arc (+72px Z) with Glowing Node */}
                <div className="hero-orbit-a-front absolute pointer-events-none" aria-hidden="true">
                  <svg className="w-[clamp(280px,82vw,400px)] h-[clamp(280px,82vw,400px)] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 absolute" viewBox="0 0 400 400" fill="none">
                    <defs>
                      <linearGradient id="orbit-a-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--accent-primary)" />
                        <stop offset="50%" stopColor="var(--accent-secondary)" />
                        <stop offset="100%" stopColor="var(--accent-primary)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 360 200 A 160 160 0 0 1 40 200"
                      stroke="url(#orbit-a-grad)"
                      strokeWidth="1.75"
                      strokeOpacity="0.95"
                    />
                    {/* Glowing Satellite Node */}
                    <circle cx="200" cy="360" r="5" fill="var(--accent-secondary)" />
                    <circle cx="200" cy="360" r="10" fill="var(--accent-secondary)" fillOpacity="0.3" className="animate-pulse" />
                  </svg>
                </div>

                {/* Orbit B (Meridian Plane) - Front Arc (+82px Z) */}
                <div className="hero-orbit-b-front absolute pointer-events-none" aria-hidden="true">
                  <svg className="w-[clamp(250px,74vw,360px)] h-[clamp(250px,74vw,360px)] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 absolute" viewBox="0 0 360 360" fill="none">
                    <path
                      d="M 180 330 A 150 150 0 0 0 180 30"
                      stroke="var(--accent-secondary)"
                      strokeWidth="1.5"
                      strokeOpacity="0.85"
                    />
                    <circle cx="330" cy="180" r="4" fill="var(--accent-primary)" />
                  </svg>
                </div>

                {/* -------------------------------------------------------------
                    FLOATING 3D TECHNICAL OBJECTS (At Distinct Z-Depths)
                   ------------------------------------------------------------- */}

                {/* Floating Object 2: 3D Isometric Mini-Cube / Technical Voxel (+95px Z) */}
                <div
                  className="hero-obj-voxel absolute -top-8 -right-2 sm:-right-8 pointer-events-none select-none flex flex-col items-center"
                  aria-hidden="true"
                >
                  <div
                    className="w-5 h-5 relative"
                    style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-24deg) rotateY(36deg)' }}
                  >
                    {/* Front Face */}
                    <div
                      className="absolute inset-0 bg-[var(--surface-2)]/95 border border-[var(--accent-primary)]/60 rounded-xs"
                      style={{ transform: 'translateZ(10px)' }}
                    />
                    {/* Top Face (Key Light Catch) */}
                    <div
                      className="absolute inset-0 bg-indigo-400/50 border border-white/70 rounded-xs"
                      style={{ transform: 'rotateX(90deg) translateZ(10px)' }}
                    />
                    {/* Right Face (Rim Light Catch) */}
                    <div
                      className="absolute inset-0 bg-[var(--accent-secondary)]/35 border border-[var(--accent-secondary)]/70 rounded-xs"
                      style={{ transform: 'rotateY(90deg) translateZ(10px)' }}
                    />
                  </div>
                  <span className="text-[7px] font-mono text-[var(--accent-secondary)] tracking-wider block mt-1">
                    VOXEL.01
                  </span>
                </div>

                {/* Floating Object 3: Foreground Spatial Reticle & Sensor Node (+130px Z) */}
                <div
                  className="hero-obj-reticle absolute -left-3 sm:-left-10 -bottom-6 px-3 py-1.5 rounded-full bg-[var(--surface)]/95 backdrop-blur-md border border-[var(--border)] shadow-2xl flex items-center gap-2 pointer-events-none select-none text-[9px] font-mono text-[var(--text)]"
                  aria-hidden="true"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] animate-pulse" />
                  <span>DEPTH // Z:+130</span>
                </div>

                {/* Floating Object 4: Vertical Z-Datum Line (+45px Z, Desktop) */}
                <div
                  className="hero-obj-gauge absolute -right-8 top-1/3 hidden sm:flex flex-col items-center gap-1 pointer-events-none select-none text-[8px] font-mono text-[var(--text-2)]"
                  aria-hidden="true"
                >
                  <span className="text-[7px] text-[var(--accent-secondary)]">Z:+45</span>
                  <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-[var(--border)] to-transparent flex flex-col justify-between py-1">
                    <span className="w-1.5 h-[1px] bg-[var(--accent-primary)] -ml-0.5" />
                    <span className="w-1 h-[1px] bg-[var(--border)] -ml-0.5" />
                    <span className="w-1.5 h-[1px] bg-[var(--accent-secondary)] -ml-0.5" />
                  </div>
                </div>

                {/* Floating Object 5: Optical Sensor Node (-35px Z, Desktop) */}
                <div
                  className="hero-obj-sensor absolute -right-6 -bottom-8 hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-[var(--surface-2)]/90 border border-[var(--border-subtle)] pointer-events-none select-none text-[8px] font-mono text-[var(--text-2)]"
                  aria-hidden="true"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>CORE // STABLE</span>
                </div>

                {/* Floating Object 6: Tethered Top Telemetry Tag (+75px Z) */}
                <div
                  className="hero-obj-tag absolute -top-11 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[var(--surface-2)]/90 border border-[var(--border-subtle)] pointer-events-none select-none text-[8px] font-mono text-[var(--text)] shadow-sm whitespace-nowrap flex items-center gap-1.5"
                  aria-hidden="true"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--accent-primary)]" />
                  <span>IDENTITY CORE // 01</span>
                </div>

              </div>
            </div>

            {/* Interactive 3D Core Mode Switcher */}
            <div className="mt-3 flex items-center justify-center gap-1 p-1 rounded-full bg-[var(--surface-2)]/90 backdrop-blur-md border border-[var(--border)] shadow-md select-none z-20">
              {(['lens', 'gimbal', 'telemetry'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setCoreMode(mode)}
                  aria-pressed={coreMode === mode}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold transition-all cursor-pointer ${
                    coreMode === mode
                      ? 'bg-[var(--accent-secondary)] text-[var(--bg)] shadow-xs scale-105'
                      : 'text-[var(--text-2)] hover:text-[var(--text)]'
                  }`}
                >
                  {mode === 'lens' ? '01 // Lens' : mode === 'gimbal' ? '02 // Gimbal' : '03 // Telemetry'}
                </button>
              ))}
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
