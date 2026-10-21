import { useEffect, useState } from 'react';

/**
 * Detects prefers-reduced-motion and returns a boolean.
 * Also provides a manual override for the user.
 */
export function useReducedMotion(): [boolean, () => void] {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggle = () => setReduced((prev) => !prev);

  return [reduced, toggle];
}
