import React, { useEffect, useRef, useState } from 'react';

export const CinematicCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  });

  useEffect(() => {
    if (!enabled) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isClicking = false;
    let animationFrameId: number | null = null;
    let isVisible = false;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      // Check if target or parent is interactive
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [role="button"], input, .interactive-target, .project-visual');
      isHovering = !!interactive;
    };

    const onPointerDown = () => {
      isClicking = true;
    };

    const onPointerUp = () => {
      isClicking = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    // Smooth lerp loop for the ring only (dot is instant)
    const tick = () => {
      // Lerp ring toward mouse
      const ease = 0.22;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.7 : 1})`;
      }

      if (ringRef.current) {
        const ringScale = isClicking ? 0.85 : isHovering ? 1.6 : 1;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Central cursor dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--accent-secondary)] transition-opacity duration-300 opacity-0 will-change-transform shadow-[0_0_8px_var(--accent-secondary)]"
      />
      {/* Surrounding cinematic ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/5 transition-[opacity,border-color,background-color] duration-200 opacity-0 will-change-transform"
      />
    </div>
  );
};
