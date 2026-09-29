import React, { useEffect, useRef } from 'react';

const checkpoints = [
  { id: 'home', label: '01 / BASE CAMP' },
  { id: 'about', label: '02 / TRAIL' },
  { id: 'skills', label: '03 / RIDGE' },
  { id: 'projects', label: '04 / PEAK CHALLENGES' },
  { id: 'contact', label: '05 / SUMMIT' },
];

export const ElevationHud: React.FC = () => {
  const hudRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

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

      hudRef.current?.style.setProperty('--page-progress', `${progress * 100}%`);
      if (progressRef.current) progressRef.current.setAttribute('aria-valuenow', String(percent));
      if (progressRef.current) progressRef.current.setAttribute('aria-valuetext', `${currentCheckpoint.label}, ${percent}%`);
      if (labelRef.current) labelRef.current.textContent = currentCheckpoint.label;
      if (valueRef.current) valueRef.current.textContent = `${String(percent).padStart(2, '0')}%`;
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
    <div ref={hudRef} className="ascent-hud" aria-label="Portfolio journey progress">
      <div ref={progressRef} className="ascent-progress" role="progressbar" aria-label="Scroll progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} aria-valuetext="01 / BASE CAMP, 0%">
        <span className="ascent-progress-fill" />
      </div>
      <span ref={labelRef} className="ascent-checkpoint">01 / BASE CAMP</span>
      <span ref={valueRef} className="ascent-percent">00%</span>
    </div>
  );
};
