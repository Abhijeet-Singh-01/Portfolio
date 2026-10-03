export type AuroraTheme = 'light' | 'night';

export const getInitialTheme = (): AuroraTheme => {
  if (typeof window === 'undefined') return 'night';
  try {
    const saved = localStorage.getItem('aurora-theme');
    if (saved === 'light' || saved === 'night') return saved;
  } catch {
    // fallback
  }
  return 'night';
};

export const applyAuroraTheme = (theme: AuroraTheme, persist = true) => {
  const root = document.documentElement;
  root.dataset.theme = theme;
  window.dispatchEvent(new CustomEvent('aurora-theme-change', { detail: theme }));

  if (persist) {
    try {
      localStorage.setItem('aurora-theme', theme);
    } catch {
      // storage unavailable
    }
  }

  const background = theme === 'light' ? '#FAF9FF' : '#0B0B1A';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', background);
};
