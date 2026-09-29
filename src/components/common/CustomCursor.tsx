import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!finePointer.matches || prefersReducedMotion || !cursor || !ring) return;

    document.documentElement.classList.add('has-custom-cursor');
    let frame = 0;
    let ringX = -100;
    let ringY = -100;
    let targetX = -100;
    let targetY = -100;

    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      if (!frame) frame = requestAnimationFrame(follow);
    };
    const follow = () => {
      ringX += (targetX - ringX) * 0.22;
      ringY += (targetY - ringY) * 0.22;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      if (Math.abs(targetX - ringX) + Math.abs(targetY - ringY) > 0.5) frame = requestAnimationFrame(follow);
      else frame = 0;
    };
    const hover = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest('a, button, [role="button"], input, textarea, .project-card')) ring.classList.add('cursor-hover');
      else ring.classList.remove('cursor-hover');
    };
    const hide = () => { cursor.classList.add('cursor-hidden'); ring.classList.add('cursor-hidden'); };
    const show = () => { cursor.classList.remove('cursor-hidden'); ring.classList.remove('cursor-hidden'); };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', hover, { passive: true });
    document.documentElement.addEventListener('mouseleave', hide);
    document.documentElement.addEventListener('mouseenter', show);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', hover);
      document.documentElement.removeEventListener('mouseleave', hide);
      document.documentElement.removeEventListener('mouseenter', show);
      cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  return <><span ref={ringRef} className="custom-cursor-ring" aria-hidden="true" /><span ref={cursorRef} className="custom-cursor-dot" aria-hidden="true" /></>;
};
