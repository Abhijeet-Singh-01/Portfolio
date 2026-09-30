import React, { useRef, useEffect } from 'react';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { experienceConfig } from '../../config/experienceConfig';
import { experienceState, scrollToRoom } from '../../lib/experienceStore';
import { siteLinks } from '../../data/socialLinks';
import profilePhoto from '../../assets/images/profile.webp';

const exploreLinks = [
  { id: 'projects', label: 'PROJECTS', num: '02' },
  { id: 'skills', label: 'SKILLS', num: '03' },
  { id: 'about', label: 'ABOUT', num: '04' },
  { id: 'contact', label: 'CONTACT', num: '05' },
];

export const Hero: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dragPoint = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = usePrefersReducedMotion();

  // Inertia and auto-return frame loop for 360-degree rotation
  useEffect(() => {
    if (prefersReducedMotion) return;
    let animFrame = 0;
    const loop = () => {
      if (!experienceState.portraitDragging) {
        // Apply friction to velocities
        experienceState.portraitVelocityX *= 0.92;
        experienceState.portraitVelocityY *= 0.92;
        experienceState.portraitRotationX += experienceState.portraitVelocityX;
        experienceState.portraitRotationY += experienceState.portraitVelocityY;

        // Auto-ease slowly toward 0 (front face) when velocity is low
        if (Math.abs(experienceState.portraitVelocityX) < 0.002 && Math.abs(experienceState.portraitVelocityY) < 0.002) {
          experienceState.portraitRotationX += (0 - experienceState.portraitRotationX) * 0.04;
          // Idle gentle floating sway
          const idleTime = performance.now() * 0.001;
          experienceState.portraitRotationY += (Math.sin(idleTime * 0.8) * 0.12 - experienceState.portraitRotationY) * 0.03;
        }

        if (ringRef.current) {
          ringRef.current.style.transform = `rotateX(${experienceState.portraitRotationX * 57.3}deg) rotateY(${experienceState.portraitRotationY * 57.3}deg)`;
        }
      }
      animFrame = requestAnimationFrame(loop);
    };
    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, [prefersReducedMotion]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    experienceState.portraitDragging = true;
    dragPoint.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && !prefersReducedMotion && sceneRef.current) {
      const bounds = sceneRef.current.getBoundingClientRect();
      const x = (e.clientX - bounds.left) / bounds.width - 0.5;
      const y = (e.clientY - bounds.top) / bounds.height - 0.5;
      experienceState.pointerX = Math.max(-1, Math.min(1, x * 2));
      experienceState.pointerY = Math.max(-1, Math.min(1, y * 2));
    }

    if (!experienceState.portraitDragging || prefersReducedMotion) return;
    const dx = e.clientX - dragPoint.current.x;
    const dy = e.clientY - dragPoint.current.y;
    dragPoint.current = { x: e.clientX, y: e.clientY };

    const sensitivity = experienceConfig.scene.dragSensitivity;
    experienceState.portraitVelocityY = dx * sensitivity;
    experienceState.portraitVelocityX = -dy * sensitivity;
    experienceState.portraitRotationY += dx * sensitivity;
    experienceState.portraitRotationX = Math.max(
      -experienceConfig.scene.verticalRotationLimit,
      Math.min(experienceConfig.scene.verticalRotationLimit, experienceState.portraitRotationX - dy * sensitivity)
    );

    if (ringRef.current) {
      ringRef.current.style.transform = `rotateX(${experienceState.portraitRotationX * 57.3}deg) rotateY(${experienceState.portraitRotationY * 57.3}deg)`;
    }
  };

  const handlePointerUp = () => {
    experienceState.portraitDragging = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = experienceConfig.scene.keyboardRotationStep;
    if (e.key === 'ArrowLeft') experienceState.portraitRotationY -= step;
    else if (e.key === 'ArrowRight') experienceState.portraitRotationY += step;
    else if (e.key === 'ArrowUp') experienceState.portraitRotationX = Math.max(-experienceConfig.scene.verticalRotationLimit, experienceState.portraitRotationX - step);
    else if (e.key === 'ArrowDown') experienceState.portraitRotationX = Math.min(experienceConfig.scene.verticalRotationLimit, experienceState.portraitRotationX + step);
    else return;
    e.preventDefault();
    if (ringRef.current) {
      ringRef.current.style.transform = `rotateX(${experienceState.portraitRotationX * 57.3}deg) rotateY(${experienceState.portraitRotationY * 57.3}deg)`;
    }
  };

  return (
    <section
      id="home"
      ref={sceneRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        experienceState.pointerX = 0;
        experienceState.pointerY = 0;
      }}
      className="hero-scene relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Top Identity Kicker & Availability Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-accent-aqua-ink">
            ABHIJEET SINGH — LUCKNOW, IN
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-lime/25 bg-surface-glass backdrop-blur-md w-fit">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-lime opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-lime" />
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-text font-medium">
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </div>
      </div>

      {/* Main Center Composition: Stacked Blocky Display + Interactive Glass 3D Ring */}
      <div className="my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left/Center: Giant Stacked Uppercase Display Type */}
        <div className="lg:col-span-7 flex flex-col">
          <h1 className="font-display font-extrabold uppercase text-[clamp(2.8rem,9vw,6.5rem)] leading-[0.88] tracking-tighter text-text select-none">
            <span className="block hover:text-accent-aqua-ink transition-colors duration-300">
              SOFTWARE
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-magenta hover:brightness-125 transition-all duration-300">
              DEVELOPER
            </span>
            <span className="block text-[clamp(2.2rem,7.5vw,5.2rem)] text-text-2 hover:text-text transition-colors duration-300">
              AI + FULL-STACK
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => scrollToRoom('projects')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-button text-text-on-accent font-mono text-xs uppercase tracking-widest font-semibold shadow-lg shadow-accent-indigo/25 hover:shadow-accent-indigo/40 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>Explore Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={siteLinks.resume.url}
              download={siteLinks.resume.download}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-border/20 bg-surface/60 backdrop-blur-md text-text hover:border-accent-aqua/60 hover:text-accent-aqua-ink font-mono text-xs uppercase tracking-widest transition-all duration-200"
              aria-label={siteLinks.resume.accessibilityLabel}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>
          </div>
        </div>

        {/* Center/Right: Interactive 3D Glass Ring with Photo Card */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
          <div
            tabIndex={0}
            role="region"
            aria-label="Interactive 3D portrait card. Drag or use arrow keys to rotate 360 degrees."
            data-cursor="DRAG"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={handleKeyDown}
            className="hero-ring-container relative w-[280px] sm:w-[340px] md:w-[380px] aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-aqua rounded-full"
            style={{ perspective: '1200px' }}
          >
            {/* Outer Glowing Torus Rim Indicator */}
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-accent-aqua/30 animate-spin-slow pointer-events-none"
              style={{ animationDuration: '45s' }}
              aria-hidden="true"
            />
            <div
              className="absolute -inset-3 rounded-full bg-gradient-to-tr from-accent-indigo/15 via-accent-aqua/15 to-accent-lime/15 blur-xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Glass Torus Ring Bezel */}
            <div
              className="absolute inset-2 rounded-full border border-border/30 bg-surface-glass/40 backdrop-blur-md shadow-2xl pointer-events-none ring-bezel"
              aria-hidden="true"
            />

            {/* Inner Rotating Card with Real Untouched Photo */}
            <div
              ref={ringRef}
              className="relative w-48 sm:w-56 md:w-64 aspect-square rounded-full overflow-hidden border-2 border-accent-aqua/40 shadow-[0_0_30px_var(--accent-aqua-glow)] transition-transform duration-75 will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={profilePhoto}
                width="800"
                height="800"
                fetchPriority="high"
                loading="eager"
                alt="Portrait of Abhijeet Singh"
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-accent-aqua/10 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Interactive Badge Indicator */}
            <div className="absolute -bottom-2 px-3 py-1 rounded-full border border-border/30 bg-surface/90 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-text-2 pointer-events-none flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3 h-3 text-accent-aqua-ink" />
              <span>360° DRAG TO ROTATE</span>
            </div>
          </div>

          {/* Right Mono Paragraph (2-3 lines from Career Objective) */}
          <p className="mt-8 max-w-sm text-right text-xs font-mono uppercase text-text-2 leading-relaxed tracking-wider hidden lg:block">
            CS undergraduate seeking backend and full-stack software development opportunities. Focused on scalable APIs, database-driven systems, and AI-powered solutions.
          </p>
        </div>
      </div>

      {/* Bottom Row: Bottom-Left Arrow List & Meta Info */}
      <div className="pt-6 border-t border-border/15 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10 text-xs font-mono">
        {/* Bottom-Left Explore Arrow List */}
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-accent-aqua-ink block mb-2 font-semibold">
            EXPLORE:
          </span>
          <div className="flex flex-wrap gap-5 sm:gap-8">
            {exploreLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToRoom(item.id)}
                className="group flex items-center gap-1.5 text-text-2 hover:text-accent-aqua-ink transition-colors uppercase tracking-widest"
              >
                <span className="transition-transform duration-200 group-hover:translate-x-1 text-accent-aqua-ink">
                  →
                </span>
                <span>{item.label}</span>
                <span className="text-[9px] text-border group-hover:text-accent-aqua-ink transition-colors">
                  /{item.num}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom-Right Context Tag */}
        <div className="text-right text-[11px] text-text-2 hidden sm:block">
          <span>PSIT CSE · 2024–2028 · CGPA 7.54</span>
        </div>
      </div>
    </section>
  );
};
