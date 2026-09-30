export type ExperienceTheme = 'light' | 'night';

/** Mutable frame data avoids React renders during camera, pointer, and particle motion. */
export const experienceState = {
  scrollProgress: 0,
  theme: 'night' as ExperienceTheme,
  roomProgress: {
    home: 0.00,
    projects: 0.25,
    skills: 0.935,
    about: 0.965,
    contact: 0.995,
  } as Record<string, number>,
  pointerX: 0,
  pointerY: 0,
  portraitRotationX: 0,
  portraitRotationY: 0,
  portraitVelocityX: 0,
  portraitVelocityY: 0,
  portraitDragging: false,
  activeSkill: '',
  activeProject: -1,
  detailZoom: 0,
  activeSceneIndex: 1,
  liteMode: false,
};

let smoothScroll: ((id: string) => void) | null = null;

export const setSmoothScroll = (scroll: ((id: string) => void) | null) => {
  smoothScroll = scroll;
};

export const scrollToRoom = (id: string) => {
  if (smoothScroll) {
    smoothScroll(id);
    return;
  }
  document.getElementById(id)?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });
};
