import React, { useRef } from 'react';
import { ArrowDown, Download, Mail } from 'lucide-react';
import { siteLinks } from '../../data/socialLinks';
import profilePhoto from '../../assets/images/profile.webp';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from '../common/BrandIcons';

export const Hero: React.FC = () => {
  const coreRef = useRef<HTMLDivElement>(null);

  const scrollToProjects = () => {
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!coreRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Controlled, restrained physical tilt (max ~5 degrees)
    const rx = (-y * 9).toFixed(2);
    const ry = (x * 9).toFixed(2);
    coreRef.current.style.setProperty('--hero-rx', `${rx}deg`);
    coreRef.current.style.setProperty('--hero-ry', `${ry}deg`);
  };

  const handlePointerLeave = () => {
    if (!coreRef.current) return;
    coreRef.current.style.setProperty('--hero-rx', '0deg');
    coreRef.current.style.setProperty('--hero-ry', '0deg');
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100svh-4rem)] flex items-center justify-center pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Background Visual Bridge: Soft Ambient Radiance extending between typography & 3D core */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] lg:w-[680px] h-[340px] sm:h-[500px] lg:h-[680px] bg-[radial-gradient(circle,rgba(99,102,241,0.13)_0%,rgba(20,184,166,0.06)_45%,transparent_70%)] blur-3xl opacity-80"
        aria-hidden="true"
      />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center relative z-10">
        {/* Left Column: Typography, Role, Proposition & Actions (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Item 1: Subtle Premium Status Badge */}
          <div className="hero-in-1 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-2)]/80 backdrop-blur-sm text-[11px] font-mono tracking-wider uppercase text-[var(--text-2)] mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" aria-hidden="true" />
            <span>Available for opportunities</span>
          </div>

          {/* Item 2: Editorial Micro-Label */}
          <div className="hero-in-2 flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[var(--accent-secondary)] uppercase">
              // PSIT '28 · LUCKNOW, IN
            </span>
          </div>

          {/* Item 3: Commanding Display Heading with Selective Accent */}
          <div className="hero-in-3 mb-2">
            <span className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-[var(--text-2)] mb-1 block">
              HEY, I'M
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[clamp(3.25rem,6.5vw,5.5rem)] font-black tracking-tight uppercase leading-[0.95] text-[var(--text)] select-none">
              ABHIJEET
              <span className="text-[var(--accent-secondary)] font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl ml-1">
                .
              </span>
            </h1>
          </div>

          {/* Item 4: Role Line (Visually Stronger than paragraph, smaller than name) */}
          <p className="hero-in-4 text-base sm:text-lg lg:text-xl font-bold font-mono tracking-tight text-[var(--accent-primary)] mb-4">
            Software Developer | AI/ML | Full-Stack
          </p>

          {/* Mobile-Only 3D Centerpiece Placement (Embedded seamlessly before description) */}
          <div
            className="w-full flex lg:hidden justify-center my-6 py-2"
            aria-hidden="true"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center select-none pointer-events-none">
              {/* Ambient Glow */}
              <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.22)_0%,rgba(20,184,166,0.1)_50%,transparent_70%)] blur-lg" />

              {/* Orbital Ring SVG */}
              <svg className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] opacity-35" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="92" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 8" fill="none" />
                <circle cx="100" cy="100" r="82" stroke="var(--accent-secondary)" strokeWidth="1.2" strokeDasharray="2 12" fill="none" />
                <path d="M 100 2 L 100 8 M 100 192 L 100 198 M 2 100 L 8 100 M 192 100 L 198 100" stroke="var(--accent-secondary)" strokeWidth="1.5" />
              </svg>

              {/* Photo */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-[var(--border)] shadow-2xl bg-[var(--surface-2)]">
                <img
                  src={profilePhoto}
                  alt=""
                  width={800}
                  height={800}
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Metadata Badge */}
              <div className="absolute -bottom-1 -right-1 px-3 py-1 rounded-full bg-[var(--surface)]/95 border border-[var(--border)] shadow-lg flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-mono text-[var(--text)]">CS @ PSIT '28</span>
              </div>
            </div>
          </div>

          {/* Item 5: Short Value Proposition (Grounded & Truthful) */}
          <p className="hero-in-5 text-sm sm:text-base text-[var(--text-2)] max-w-xl leading-relaxed mb-7">
            Computer Science undergraduate at PSIT (2024–2028). Focused on building scalable backend
            APIs, database-driven applications, and AI-powered solutions while strengthening DSA and
            modern software engineering.
          </p>

          {/* Item 6: Primary & Secondary Actions */}
          <div className="hero-in-6 flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-7">
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

          {/* Item 7: Compact Social Links Row */}
          <div className="hero-in-7 flex items-center gap-2.5 pt-4 border-t border-[var(--border)] w-full max-w-md">
            <span className="text-xs font-mono text-[var(--text-2)] mr-1.5">Connect:</span>

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

        {/* Right Column: 3D Digital System Core Centerpiece (Desktop Only, 5 cols with visual overlap) */}
        <div
          className="hidden lg:flex lg:col-span-5 justify-center relative lg:-ml-6 xl:-ml-10"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {/* Subtle Technical Bridging Axis */}
          <div
            className="absolute -left-12 top-1/2 -translate-y-1/2 w-16 h-px border-t border-dashed border-[var(--border)] opacity-60 pointer-events-none"
            aria-hidden="true"
          />

          <div className="hero-in-core hero-3d-scene cursor-default select-none">
            <div
              ref={coreRef}
              className="hero-3d-wrap relative w-72 h-72 xl:w-80 xl:h-80 flex items-center justify-center"
            >
              {/* LAYER 1: Ambient Halo Glow (-40px) */}
              <div
                className="hero-layer-glow absolute -inset-10 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(99,102,241,0.25)_0%,rgba(20,184,166,0.12)_45%,transparent_70%)] blur-xl pointer-events-none"
                aria-hidden="true"
              />

              {/* LAYER 2: Large Orbital Outer Ring (-18px) */}
              <svg
                className="hero-layer-orbital absolute -inset-8 w-[calc(100%+64px)] h-[calc(100%+64px)] pointer-events-none opacity-40 animate-[spin_100s_linear_infinite]"
                viewBox="0 0 240 240"
                aria-hidden="true"
              >
                <circle cx="120" cy="120" r="114" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 8" fill="none" />
                <circle cx="120" cy="120" r="104" stroke="var(--accent-secondary)" strokeWidth="1.2" strokeDasharray="1 14" fill="none" opacity="0.7" />
                <path d="M 120 2 L 120 10 M 120 230 L 120 238 M 2 120 L 10 120 M 230 120 L 238 120" stroke="var(--accent-secondary)" strokeWidth="1.5" />
                <circle cx="120" cy="6" r="2.5" fill="var(--accent-secondary)" />
                <circle cx="120" cy="234" r="2.5" fill="var(--accent-primary)" />
              </svg>

              {/* LAYER 3: Technical Telemetry Ring (+12px) */}
              <svg
                className="hero-layer-telemetry absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none opacity-30"
                viewBox="0 0 200 200"
                aria-hidden="true"
              >
                <circle cx="100" cy="100" r="95" stroke="var(--accent-primary)" strokeWidth="0.8" strokeDasharray="8 16" fill="none" />
                <text x="100" y="16" fill="var(--text-2)" fontSize="5" fontFamily="monospace" textAnchor="middle" letterSpacing="1">
                  SYS.01 // LAT 26.85°N
                </text>
                <text x="100" y="190" fill="var(--text-2)" fontSize="5" fontFamily="monospace" textAnchor="middle" letterSpacing="1">
                  LONG 80.95°E // CORE
                </text>
              </svg>

              {/* LAYER 4: Precision Crosshairs & Alignment Nodes (+26px) */}
              <div className="hero-layer-crosshairs absolute -inset-2 pointer-events-none" aria-hidden="true">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] ring-2 ring-[var(--surface)]" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] ring-2 ring-[var(--surface)]" />
                <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--border)]" />
                <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--border)]" />
              </div>

              {/* LAYER 5: Dimensional Glass Lens Bezel (+40px) */}
              <div
                className="hero-layer-lens absolute inset-0 rounded-full border-2 border-[var(--border)] bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.18)_0%,rgba(14,13,34,0.92)_55%,rgba(11,11,26,0.98)_100%)] shadow-[0_12px_44px_rgba(0,0,0,0.55)] pointer-events-none overflow-hidden"
                aria-hidden="true"
              >
                {/* Subtle Glass Highlight Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-70" />
              </div>

              {/* LAYER 6: Real Untouched Authentic Portrait Photo (+52px) */}
              <div className="hero-layer-photo relative w-56 h-56 xl:w-64 xl:h-64 rounded-full overflow-hidden border border-[var(--border)] shadow-2xl bg-[var(--surface-2)]">
                <img
                  src={profilePhoto}
                  alt="Portrait of Abhijeet Singh"
                  width={800}
                  height={800}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover select-none"
                />
              </div>

              {/* LAYER 7: Floating System Metadata Pill (+66px) */}
              <div
                className="hero-layer-badge absolute -bottom-3 -right-2 px-3.5 py-1.5 rounded-full bg-[var(--surface)]/95 backdrop-blur-md border border-[var(--border)] shadow-xl flex items-center gap-2 pointer-events-none"
                aria-hidden="true"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono font-medium text-[var(--text)]">CS @ PSIT '28</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
