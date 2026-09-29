import { useSyncExternalStore } from 'react';

const motionPreference = () => window.matchMedia('(prefers-reduced-motion: reduce)');

const subscribe = (onChange: () => void) => {
  const preference = motionPreference();
  preference.addEventListener('change', onChange);
  return () => preference.removeEventListener('change', onChange);
};

const getSnapshot = () => motionPreference().matches;

export const usePrefersReducedMotion = () =>
  useSyncExternalStore(subscribe, getSnapshot, () => false);
