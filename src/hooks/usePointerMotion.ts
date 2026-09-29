import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export interface PointerMotionValue {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

/** Normalized pointer coordinates that ease toward the cursor without React renders. */
export const usePointerMotion = () => {
  const pointerRef = useRef<PointerMotionValue>({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer || prefersReducedMotion) return;

    let frame = 0;
    const pointer = pointerRef.current;

    const animate = () => {
      pointer.x += (pointer.targetX - pointer.x) * 0.12;
      pointer.y += (pointer.targetY - pointer.y) * 0.12;

      if (Math.abs(pointer.targetX - pointer.x) + Math.abs(pointer.targetY - pointer.y) > 0.001) {
        frame = window.requestAnimationFrame(animate);
      } else {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
        frame = 0;
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointer.targetX = (event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      pointer.targetY = (event.clientY / Math.max(window.innerHeight, 1)) * 2 - 1;
      requestUpdate();
    };

    const resetPointer = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
      requestUpdate();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('blur', resetPointer);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', resetPointer);
      window.cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  return pointerRef;
};
