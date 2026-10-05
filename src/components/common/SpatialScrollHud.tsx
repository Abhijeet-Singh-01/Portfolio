import React, { useState, useEffect } from 'react';

interface SectionBeacon {
  id: string;
  num: string;
  label: string;
}

const sectionBeacons: SectionBeacon[] = [
  { id: 'home', num: '01', label: 'HERO' },
  { id: 'projects', num: '02', label: 'WORK' },
  { id: 'skills', num: '03', label: 'LAB' },
  { id: 'about', num: '04', label: 'ABOUT' },
  { id: 'contact', num: '05', label: 'CONNECT' },
];

export const SpatialScrollHud: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentProgress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
            setScrollProgress(Math.round(currentProgress));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Track active section via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-25% 0px -45% 0px', threshold: 0 }
    );

    sectionBeacons.forEach((b) => {
      const el = document.getElementById(b.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Global High-Precision Top Scroll Progress Line */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-emerald-400 transition-[width] duration-75 ease-out shadow-[0_0_10px_var(--accent-secondary)] relative"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Glowing Lead Comet Point */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#fff,0_0_14px_var(--accent-secondary)]" />
        </div>
      </div>

      {/* 2. Desktop Floating Spatial Section Beacon Track */}
      <aside
        aria-label="Spatial Section Navigation HUD"
        className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3 select-none pointer-events-auto"
      >
        <div className="p-2 rounded-2xl bg-[var(--surface)]/85 backdrop-blur-md border border-[var(--border)] shadow-xl flex flex-col items-center gap-3">
          {/* Micro HUD Header with Current Scroll % */}
          <div className="text-[9px] font-mono text-[var(--accent-secondary)] font-bold tracking-wider px-1">
            {String(scrollProgress).padStart(3, '0')}%
          </div>

          <div className="w-full h-[1px] bg-[var(--border-subtle)]" />

          {/* Section Beacons */}
          <nav className="flex flex-col items-center gap-2" aria-label="Quick section jumps">
            {sectionBeacons.map((beacon) => {
              const isActive = activeSection === beacon.id;
              return (
                <button
                  key={beacon.id}
                  type="button"
                  onClick={() => scrollToSection(beacon.id)}
                  aria-label={`Scroll to ${beacon.label} section (${beacon.num})`}
                  className="group relative flex items-center justify-center p-1.5 focus:outline-none cursor-pointer"
                >
                  {/* Floating Tooltip Label */}
                  <span
                    className={`absolute right-full mr-3 px-2 py-1 rounded bg-[var(--surface-2)] text-[10px] font-mono font-bold whitespace-nowrap border border-[var(--border)] shadow-md transition-all duration-200 pointer-events-none opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 ${
                      isActive ? 'text-[var(--accent-secondary)]' : 'text-[var(--text-2)]'
                    }`}
                  >
                    {beacon.num} // {beacon.label}
                  </span>

                  {/* Beacon Node Dot */}
                  <div
                    className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                      isActive
                        ? 'w-4 h-4 bg-[var(--accent-secondary)]/20 border-2 border-[var(--accent-secondary)] scale-110 shadow-[0_0_10px_var(--accent-secondary)]'
                        : 'w-2 h-2 bg-[var(--border-strong)] hover:bg-[var(--text-2)] hover:scale-125'
                    }`}
                  >
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] animate-pulse" />
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};
