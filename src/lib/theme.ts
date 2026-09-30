import { experienceState } from './experienceStore';

export type AuroraTheme = 'light' | 'night';

export const applyAuroraTheme = (theme: AuroraTheme, persist = true) => {
  const root = document.documentElement;
  root.dataset.theme = theme;
  experienceState.theme = theme;
  window.dispatchEvent(new CustomEvent('aurora-theme-change', { detail: theme }));

  if (persist) {
    try {
      localStorage.setItem('aurora-theme', theme);
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
  }

  const background = getComputedStyle(root).getPropertyValue('--bg').trim();
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', background);

  root.classList.add('theme-transition');
  window.setTimeout(() => root.classList.remove('theme-transition'), 320);
};
