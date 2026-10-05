import React, { useEffect, useRef, useState } from 'react';

export const CinematicCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

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
    let isSpecial = false;
    let animationFrameId: number | null = null;
    let isVisible = false;
    let isRunning = false;

    // Smooth lerp loop for the ring only (stops automatically when idle)
    const tick = () => {
      const ease = 0.22;
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * ease;
      ringY += dy * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.7 : isSpecial ? 0 : 1})`;
      }

      if (ringRef.current) {
        const ringScale = isClicking ? 0.85 : isSpecial ? 2.2 : isHovering ? 1.6 : 1;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }

      // Check if settled (within 0.15px of target)
      const isSettled = Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15;

      if (!isSettled || isClicking) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        isRunning = false;
        animationFrameId = null;
      }
    };

    const wakeUp = () => {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      const target = e.target as HTMLElement | null;
      const dragTarget = target?.closest('.hero-3d-scene, [data-cursor="drag"]');
      const viewTarget = !dragTarget && target?.closest('.project-visual, [data-cursor="view"]');
      const interactive = dragTarget || viewTarget || target?.closest('a, button, [role="button"], input');

      isHovering = !!interactive;
      isSpecial = !!(dragTarget || viewTarget);

      if (labelRef.current) {
        if (dragTarget) {
          labelRef.current.textContent = 'DRAG';
          labelRef.current.style.opacity = '1';
        } else if (viewTarget) {
          labelRef.current.textContent = 'VIEW';
          labelRef.current.style.opacity = '1';
        } else {
          labelRef.current.style.opacity = '0';
        }
      }

      wakeUp();
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      isClicking = true;

      if (rippleRef.current) {
        rippleRef.current.style.transition = 'none';
        rippleRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(0.3)`;
        rippleRef.current.style.opacity = '0.6';

        requestAnimationFrame(() => {
          if (rippleRef.current) {
            rippleRef.current.style.transition = 'transform 450ms cubic-bezier(0.1, 0.9, 0.2, 1), opacity 450ms ease-out';
            rippleRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(2.4)`;
            rippleRef.current.style.opacity = '0';
          }
        });
      }

      wakeUp();
    };

    const onPointerUp = () => {
      isClicking = false;
      wakeUp();
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      if (labelRef.current) labelRef.current.style.opacity = '0';
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });

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
      {/* Click ripple pulse */}
      <div
        ref={rippleRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[var(--accent-secondary)] pointer-events-none opacity-0 will-change-transform"
      />
      {/* Central cursor dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--accent-secondary)] transition-[opacity,transform] duration-200 opacity-0 will-change-transform shadow-[0_0_8px_var(--accent-secondary)]"
      />
      {/* Surrounding cinematic ring with contextual label */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/5 backdrop-blur-[1px] transition-[opacity,border-color,background-color] duration-200 opacity-0 will-change-transform flex items-center justify-center"
      >
        <span
          ref={labelRef}
          className="text-[7px] font-mono font-bold tracking-widest text-[var(--accent-secondary)] opacity-0 transition-opacity duration-150 uppercase select-none pointer-events-none"
        />
      </div>
    </div>
  );
};
