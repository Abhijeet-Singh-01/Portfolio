import React, { useEffect, useRef } from 'react';

const checkpoints = [
  { id: 'home', label: 'HERO', counter: '01/05' },
  { id: 'projects', label: 'WORK', counter: '02/05' },
  { id: 'skills', label: 'LAB', counter: '03/05' },
  { id: 'about', label: 'ABOUT', counter: '04/05' },
  { id: 'contact', label: 'CONTACT', counter: '05/05' },
];

export const ElevationHud: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      const percent = Math.round(progress * 100);

      const currentCheckpoint = [...checkpoints].reverse().find(({ id }) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= window.innerHeight * 0.48;
      }) ?? checkpoints[0];

      if (lineRef.current) {
        lineRef.current.style.transform = `scaleX(${progress})`;
      }
      if (counterRef.current) {
        counterRef.current.textContent = currentCheckpoint.counter;
      }
      if (labelRef.current) {
        labelRef.current.textContent = currentCheckpoint.label;
      }
      if (percentRef.current) {
        percentRef.current.textContent = `${String(percent).padStart(2, '0')}%`;
      }
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {/* Persistent Full-width Thin Top Progress Line */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-surface/30"
        aria-hidden="true"
      >
        <div
          ref={lineRef}
          className="h-full w-full origin-left bg-gradient-to-r from-accent-aqua via-accent-indigo to-accent-magenta transition-transform duration-75 ease-out"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Floating Bottom HUD Pill: Scene Counter & Progress */}
      <aside
        ref={pillRef}
        className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full border border-border/15 bg-surface-glass backdrop-blur-md text-[11px] font-mono tracking-wider shadow-lg shadow-black/20"
        aria-label="Scene progress indicator"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-aqua animate-pulse" aria-hidden="true" />
          <span ref={counterRef} className="font-semibold text-accent-aqua-ink">
            01/05
          </span>
          <span className="text-border">/</span>
          <span ref={labelRef} className="uppercase text-text-2">
            HERO
          </span>
        </div>
        <span className="text-border">|</span>
        <span ref={percentRef} className="text-text font-medium min-w-[2.2rem] text-right">
          00%
        </span>
      </aside>
    </>
  );
};
