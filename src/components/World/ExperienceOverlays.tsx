import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { experienceConfig } from '../../config/experienceConfig';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function IntroLoader() {
  const [visible, setVisible] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<SVGSVGElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const progress = { value: 0 };
    const timeline = gsap.timeline({ onComplete: () => setVisible(false) });
    timeline.to(progress, {
      value: 100,
      duration: experienceConfig.motion.loaderDuration / 1000,
      ease: 'power2.out',
      onUpdate: () => {
        if (counter.current) counter.current.textContent = String(Math.round(progress.value)).padStart(3, '0');
      },
    });
    if (mark.current) timeline.to(mark.current, { rotate: 360, duration: experienceConfig.motion.loaderDuration / 1000, ease: 'none' }, 0);
    if (root.current) timeline.to(root.current, { autoAlpha: 0, duration: 0.24, ease: 'power2.in' }, '>-0.02');
    return () => { timeline.kill(); };
  }, [prefersReducedMotion]);

  const skip = () => {
    if (!root.current) return setVisible(false);
    gsap.to(root.current, { autoAlpha: 0, duration: 0.18, onComplete: () => setVisible(false) });
  };
  if (!visible || prefersReducedMotion) return null;

  return (
    <div ref={root} className="intro-loader" role="status" aria-label="Loading the portfolio experience">
      {/* Vertical particle stream resolving into the ring */}
      <div className="intro-particle-stream" aria-hidden="true">
        <span className="stream-particle stream-p1" />
        <span className="stream-particle stream-p2" />
        <span className="stream-particle stream-p3" />
      </div>

      <div className="intro-loader-inner">
        <svg ref={mark} className="intro-loader-mark" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="none" stroke="var(--accent-aqua-glow)" strokeWidth="1.5" />
          <path d="M25 69V31l25 38V31M58 31h16M66 31v38M58 69h16" fill="none" stroke="url(#as-loader-gradient)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="200" strokeDashoffset="0" />
          <defs>
            <linearGradient id="as-loader-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="var(--accent-aqua)" />
              <stop offset=".45" stopColor="var(--accent-lime)" />
              <stop offset="1" stopColor="var(--accent-indigo)" />
            </linearGradient>
          </defs>
        </svg>
        <span className="intro-loader-label">INITIALIZING <span ref={counter}>000</span> / 100</span>
      </div>
      <button type="button" onClick={skip} className="intro-loader-skip">Skip intro</button>
    </div>
  );
}

export function ExperienceCursor() {
  const dot = useRef<HTMLSpanElement>(null);
  const ring = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const dotElement = dot.current;
    const ringElement = ring.current;
    const labelElement = label.current;
    if (!finePointer.matches || prefersReducedMotion || !dotElement || !ringElement || !labelElement) return;
    const dotX = gsap.quickTo(dotElement, 'x', { duration: 0.08, ease: 'power2.out' });
    const dotY = gsap.quickTo(dotElement, 'y', { duration: 0.08, ease: 'power2.out' });
    const ringX = gsap.quickTo(ringElement, 'x', { duration: 0.2, ease: 'power3.out' });
    const ringY = gsap.quickTo(ringElement, 'y', { duration: 0.2, ease: 'power3.out' });
    let activeMagnet: HTMLElement | null = null;
    const move = (event: PointerEvent) => {
      dotX(event.clientX); dotY(event.clientY); ringX(event.clientX); ringY(event.clientY);
      const element = event.target instanceof Element ? event.target : null;
      const target = element?.closest<HTMLElement>('[data-cursor]') ?? null;
      const text = target?.dataset.cursor ?? '';
      ringElement.classList.toggle('cursor-active', Boolean(text));
      labelElement.textContent = text;
      const magnet = element?.closest<HTMLElement>('[data-magnetic]') ?? null;
      if (magnet !== activeMagnet && activeMagnet) {
        activeMagnet.style.setProperty('--magnetic-x', '0px');
        activeMagnet.style.setProperty('--magnetic-y', '0px');
      }
      activeMagnet = magnet;
      if (magnet) {
        const bounds = magnet.getBoundingClientRect();
        magnet.style.setProperty('--magnetic-x', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 7}px`);
        magnet.style.setProperty('--magnetic-y', `${((event.clientY - bounds.top) / bounds.height - 0.5) * 7}px`);
      }
    };
    const click = () => {
      ringElement.classList.remove('cursor-click');
      requestAnimationFrame(() => {
        ringElement.classList.add('cursor-click');
        window.setTimeout(() => ringElement.classList.remove('cursor-click'), 340);
      });
    };
    const leave = () => {
      ringElement.classList.add('cursor-out');
      activeMagnet?.style.setProperty('--magnetic-x', '0px');
      activeMagnet?.style.setProperty('--magnetic-y', '0px');
      activeMagnet = null;
    };
    const enter = () => ringElement.classList.remove('cursor-out');
    document.body.classList.add('has-experience-cursor');
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', click, { passive: true });
    document.addEventListener('pointerleave', leave);
    document.addEventListener('pointerenter', enter);
    return () => {
      document.body.classList.remove('has-experience-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', click);
      document.removeEventListener('pointerleave', leave);
      document.removeEventListener('pointerenter', enter);
      gsap.killTweensOf([dotElement, ringElement]);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="experience-cursor" aria-hidden="true">
      <span ref={dot} className="experience-cursor-dot" />
      <span ref={ring} className="experience-cursor-ring"><span ref={label} /></span>
    </div>
  );
}
