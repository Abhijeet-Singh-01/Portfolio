import React, { useState, useEffect, useRef } from 'react';
import { X, Moon, Sun, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { siteLinks } from '../../data/socialLinks';
import { applyAuroraTheme, type AuroraTheme } from '../../lib/theme';
import { scrollToRoom, experienceState } from '../../lib/experienceStore';
import { sound } from '../../lib/sound';

interface NavDestination {
  id: string;
  num: string;
  name: string;
  sub: string;
}

const destinations: NavDestination[] = [
  { id: 'home', num: '01', name: 'HERO', sub: 'Base Camp & Identity' },
  { id: 'projects', num: '02', name: 'WORK', sub: 'Selected Engineering Projects' },
  { id: 'skills', num: '03', name: 'LAB', sub: 'Technical Arsenal & Hex Grid' },
  { id: 'about', num: '04', name: 'ABOUT', sub: 'Trajectory, Education & Terminal' },
  { id: 'contact', num: '05', name: 'CONTACT', sub: 'Let’s Build Something' },
];

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(() => sound.isEnabled());
  const [isLite, setIsLite] = useState(false);
  const [theme, setTheme] = useState<AuroraTheme>(() =>
    typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light' ? 'light' : 'night'
  );
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Esc key & focus trap for menu overlay
  useEffect(() => {
    if (!menuOpen) return;
    const overlay = overlayRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusables = overlay?.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    focusables?.[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (e.key === 'Tab' && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const handleNavigate = (id: string) => {
    setMenuOpen(false);
    scrollToRoom(id);
  };

  const toggleTheme = () => {
    const nextTheme: AuroraTheme = theme === 'night' ? 'light' : 'night';
    applyAuroraTheme(nextTheme);
    setTheme(nextTheme);
  };

  const toggleLiteMode = () => {
    const nextLite = !isLite;
    setIsLite(nextLite);
    experienceState.liteMode = nextLite;
    window.dispatchEvent(new CustomEvent('aurora-lite-mode-change', { detail: nextLite }));
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-[1000] py-4 px-6 md:px-12 flex items-center justify-between pointer-events-none">
        {/* Top-Left: "AS" Logo Mark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate('home');
          }}
          className="pointer-events-auto group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo rounded-lg"
          aria-label="Abhijeet Singh Portfolio Home"
        >
          <div className="w-9 h-9 rounded-lg border border-border/25 bg-surface/85 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:border-accent-aqua/60 group-hover:shadow-[0_0_16px_var(--accent-aqua-glow)]">
            <span className="font-display font-black text-xs tracking-widest text-text group-hover:text-accent-aqua-ink transition-colors">
              AS
            </span>
          </div>
          <span className="hidden sm:block text-[11px] font-mono tracking-widest uppercase text-text-2 group-hover:text-text transition-colors">
            ABHIJEET SINGH
          </span>
        </a>

        {/* Top-Right: Minimal Compact MENU Button */}
        <button
          type="button"
          ref={menuButtonRef}
          onClick={() => setMenuOpen(true)}
          className="pointer-events-auto px-4 py-2 rounded-full border border-border/25 bg-surface/85 backdrop-blur-xl text-xs font-mono uppercase tracking-[0.2em] text-text hover:text-accent-aqua-ink hover:border-accent-aqua/40 transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-aqua cursor-pointer"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          MENU
        </button>
      </header>

      {/* Full-Screen Menu Overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio navigation overlay"
          className="fixed inset-0 z-[1100] bg-bg/95 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-14 animate-fade-in text-text"
        >
          {/* Overlay Top Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg border border-accent-aqua/40 bg-surface/80 flex items-center justify-center shadow-[0_0_15px_var(--accent-aqua-glow)]">
                <span className="font-display font-bold text-xs tracking-wider text-accent-aqua-ink">
                  AS
                </span>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-text-2">
                NAVIGATION
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="w-11 h-11 rounded-full border border-border/30 bg-surface/80 flex items-center justify-center text-text hover:text-accent-magenta hover:border-accent-magenta/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-magenta transition-all"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Destinations Grid */}
          <nav className="my-auto py-8">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 list-none p-0 m-0 max-w-4xl mx-auto">
              {destinations.map((dest) => (
                <li key={dest.id}>
                  <button
                    type="button"
                    onClick={() => handleNavigate(dest.id)}
                    className="w-full text-left group p-5 sm:p-6 rounded-xl border border-border/15 bg-surface/40 hover:bg-surface/80 hover:border-accent-aqua/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-aqua"
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-xs font-mono text-accent-aqua-ink tracking-widest">
                        {dest.num} //
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-text-2 group-hover:text-accent-aqua-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <span className="block font-display font-bold text-2xl sm:text-3xl tracking-tight text-text group-hover:text-accent-aqua-ink transition-colors">
                      {dest.name}
                    </span>
                    <span className="block text-xs font-mono text-text-2 mt-1">
                      {dest.sub}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Overlay Footer: Theme Toggle & Social Links */}
          <div className="pt-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/25 bg-surface/60 text-xs font-mono uppercase tracking-widest text-text hover:border-accent-aqua/50 transition-all focus-visible:ring-2 focus-visible:ring-accent-aqua"
                aria-label={`Switch to ${theme === 'light' ? 'Night' : 'Light'} theme`}
              >
                {theme === 'light' ? <Moon className="w-3.5 h-3.5 text-accent-indigo" /> : <Sun className="w-3.5 h-3.5 text-accent-tangerine" />}
                <span>{theme === 'light' ? 'NIGHT MODE' : 'LIGHT MODE'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSoundOn(sound.toggle())}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/25 bg-surface/60 text-xs font-mono uppercase tracking-widest text-text hover:border-accent-aqua/50 transition-all focus-visible:ring-2 focus-visible:ring-accent-aqua"
                aria-label="Toggle sound effects (default OFF)"
              >
                {soundOn ? <Volume2 className="w-3.5 h-3.5 text-accent-lime" /> : <VolumeX className="w-3.5 h-3.5 text-text-2" />}
                <span>{soundOn ? 'AUDIO ON' : 'AUDIO OFF'}</span>
              </button>

              <button
                type="button"
                onClick={toggleLiteMode}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/25 bg-surface/60 text-xs font-mono uppercase tracking-widest text-text hover:border-accent-aqua/50 transition-all focus-visible:ring-2 focus-visible:ring-accent-aqua"
                aria-label="Toggle 3D world or 2D Lite mode"
              >
                <span>{isLite ? '3D WORLD' : 'LITE MODE'}</span>
              </button>

              <a
                href={siteLinks.resume.url}
                download={siteLinks.resume.download}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent-indigo/20 border border-accent-indigo/40 text-xs font-mono uppercase tracking-widest text-accent-indigo-ink hover:bg-accent-indigo/30 transition-all"
              >
                RESUME (PDF)
              </a>
            </div>

            <div className="flex items-center gap-5 text-xs font-mono uppercase tracking-wider text-text-2">
              <a
                href={siteLinks.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-aqua-ink transition-colors"
                aria-label={siteLinks.github.accessibilityLabel}
              >
                GITHUB
              </a>
              <a
                href={siteLinks.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-aqua-ink transition-colors"
                aria-label={siteLinks.linkedin.accessibilityLabel}
              >
                LINKEDIN
              </a>
              <a
                href={siteLinks.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-aqua-ink transition-colors"
                aria-label={siteLinks.leetcode.accessibilityLabel}
              >
                LEETCODE
              </a>
              <a
                href={siteLinks.email.url}
                className="hover:text-accent-aqua-ink transition-colors"
                aria-label={siteLinks.email.accessibilityLabel}
              >
                EMAIL
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
