import { ArrowDown, Download, Mail } from 'lucide-react';
import { siteLinks } from '../../data/socialLinks';
import profilePhoto from '../../assets/images/profile.webp';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from '../common/BrandIcons';

export const Hero: React.FC = () => {
  const scrollToProjects = () => {
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = (-y * 8).toFixed(2);
    const ry = (x * 8).toFixed(2);
    e.currentTarget.style.setProperty('--hero-rx', `${rx}deg`);
    e.currentTarget.style.setProperty('--hero-ry', `${ry}deg`);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--hero-rx', '0deg');
    e.currentTarget.style.setProperty('--hero-ry', '0deg');
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Text & Primary Actions (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-xs font-mono text-[var(--text-2)] mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span>Available for opportunities</span>
          </div>

          {/* Primary Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)] mb-3 leading-[1.1]">
            Hey, I'm Abhijeet.
          </h1>

          {/* Supporting Identity */}
          <p className="text-lg sm:text-xl font-semibold text-[var(--accent-secondary)] mb-4">
            Software Developer | AI/ML | Full-Stack
          </p>

          {/* Truthful Description */}
          <p className="text-base sm:text-lg text-[var(--text-2)] max-w-xl leading-relaxed mb-8">
            Computer Science undergraduate at PSIT (2024–2028). Focused on building scalable backend
            APIs, database-driven applications, and AI-powered solutions while strengthening DSA and
            modern software engineering.
          </p>

          {/* Primary Actions */}
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

          {/* Secondary Social Links */}
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

        {/* Right Column: Real Untouched Profile Photo with 3D Depth Layers (5 cols) */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <div
            className="hero-3d-scene cursor-default select-none"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <div className="hero-3d-wrap relative w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72">
              {/* Layer 1: Back depth layer (ambient orbital ring & glow) */}
              <div
                className="hero-depth-back absolute -inset-3 rounded-full border border-[var(--accent-secondary)]/25 bg-gradient-to-tr from-[var(--accent-primary)]/15 to-[var(--accent-secondary)]/15 blur-sm pointer-events-none"
                aria-hidden="true"
              />

              {/* Layer 2: Mid depth layer (real untouched profile photo) */}
              <div className="hero-depth-mid relative w-full h-full rounded-full overflow-hidden border-2 border-[var(--border)] shadow-xl bg-[var(--surface-2)]">
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

              {/* Layer 3: Front depth layer (floating accent badge) */}
              <div
                className="hero-depth-front absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--border)] shadow-lg flex items-center gap-1.5 pointer-events-none"
                aria-hidden="true"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
                <span className="text-[11px] font-mono font-medium text-[var(--text)]">CS @ PSIT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
