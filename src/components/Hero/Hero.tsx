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

    // Small controlled rotation
    const rx = (-y * 8).toFixed(2);
    const ry = (x * 8).toFixed(2);
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
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Editorial Headline, Role & Actions (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-xs font-mono text-[var(--text-2)] mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span>Available for opportunities</span>
          </div>

          {/* Large Cinematic Editorial Headline */}
          <div className="mb-4">
            <span className="text-xs font-mono tracking-widest text-[var(--accent-secondary)] uppercase block mb-2">
              // SOFTWARE · INTELLIGENCE · SYSTEMS
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--text)] uppercase leading-[1.02]">
              Hey, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text)] via-[var(--text)] to-[var(--text-2)]">
                Abhijeet.
              </span>
            </h1>
          </div>

          {/* Supporting Role & Positioning */}
          <p className="text-lg sm:text-xl font-semibold text-[var(--accent-secondary)] mb-4 font-mono">
            Software Developer | AI/ML | Full-Stack
          </p>

          {/* Truthful Grounded Summary */}
          <p className="text-base sm:text-lg text-[var(--text-2)] max-w-xl leading-relaxed mb-8">
            Computer Science undergraduate at PSIT (2024–2028). Focused on building scalable backend
            APIs, database-driven applications, and AI-powered solutions while strengthening DSA and
            modern software engineering.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-8">
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

          {/* Connect Bar */}
          <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)] w-full max-w-md">
            <span className="text-xs font-mono text-[var(--text-2)] mr-1">Connect:</span>

            <a
              href={siteLinks.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] p-2 rounded-lg text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
              aria-label={siteLinks.github.accessibilityLabel}
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            <a
              href={siteLinks.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] p-2 rounded-lg text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
              aria-label={siteLinks.linkedin.accessibilityLabel}
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>

            <a
              href={siteLinks.leetcode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] p-2 rounded-lg text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
              aria-label={siteLinks.leetcode.accessibilityLabel}
            >
              <LeetcodeIcon className="w-5 h-5" />
            </a>

            <a
              href={siteLinks.email.url}
              className="min-h-[44px] min-w-[44px] p-2 rounded-lg text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
              aria-label={siteLinks.email.accessibilityLabel}
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Column: 3D Systems Digital Core Centerpiece (5 cols) */}
        <div
          className="lg:col-span-5 flex justify-center order-1 lg:order-2"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className="hero-3d-scene cursor-default select-none">
            <div
              ref={coreRef}
              className="hero-3d-wrap relative w-52 h-52 sm:w-64 sm:h-64 lg:w-76 lg:h-76 flex items-center justify-center"
            >
              {/* Layer 1: Back depth layer (dimensional system core with SVG telemetry ring) */}
              <div
                className="hero-depth-back absolute -inset-6 rounded-full border border-[var(--accent-secondary)]/20 bg-gradient-to-tr from-[var(--accent-primary)]/15 via-transparent to-[var(--accent-secondary)]/15 blur-sm pointer-events-none"
                aria-hidden="true"
              />

              {/* Telemetry Coordinate Tick Markers */}
              <svg
                className="hero-depth-back absolute -inset-5 w-[calc(100%+40px)] h-[calc(100%+40px)] pointer-events-none opacity-40 animate-[spin_60s_linear_infinite]"
                viewBox="0 0 200 200"
                aria-hidden="true"
              >
                <circle cx="100" cy="100" r="92" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 8" fill="none" />
                <circle cx="100" cy="100" r="84" stroke="var(--accent-secondary)" strokeWidth="1" strokeDasharray="1 12" fill="none" />
                <path d="M 100 2 L 100 8 M 100 192 L 100 198 M 2 100 L 8 100 M 192 100 L 198 100" stroke="var(--accent-secondary)" strokeWidth="1.5" />
              </svg>

              {/* Layer 2: Mid depth layer (Real Untouched Authentic Photo) */}
              <div className="hero-depth-mid relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 border-[var(--border)] shadow-2xl bg-[var(--surface-2)]">
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

              {/* Layer 3: Front depth layer (Floating Technical Identifier Badge) */}
              <div
                className="hero-depth-front absolute -bottom-2 -right-1 sm:bottom-0 sm:right-0 px-3.5 py-1.5 rounded-full bg-[var(--surface)]/95 backdrop-blur-md border border-[var(--border)] shadow-xl flex items-center gap-2 pointer-events-none"
                aria-hidden="true"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-mono font-medium text-[var(--text)]">CS @ PSIT '28</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
