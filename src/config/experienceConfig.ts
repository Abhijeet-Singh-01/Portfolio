/**
 * One place for motion, scene, quality, and 3D color-token controls.
 * Change CSS colors in public/aurora-tokens.css; these names resolve those same tokens.
 */
export const experienceConfig = {
  // Tweakable controls for the shared 3D world and its 2D fallbacks.
  scene: {
    colors: {
      background: '--bg',
      indigo: '--accent-indigo',
      violet: '--accent-violet',
      magenta: '--accent-magenta',
      tangerine: '--accent-tangerine',
      aqua: '--accent-aqua',
    },
    camera: {
      fov: 43,
      initialZ: 8,
      travelZ: 76,
      follow: 3.1,
      lookAhead: 8,
      breathing: 0.035,
      breathingSpeed: 0.38,
    },
    dragSensitivity: 0.008,
    verticalRotationLimit: 1.25,
    keyboardRotationStep: 0.12,
    particles: {
      high: 3200,
      medium: 1600,
      low: 700,
      size: 0.032,
      driftSpeed: 0.16,
      glow: 0.8,
    },
    quality: {
      high: { maxDpr: 1.5, bloom: true },
      medium: { maxDpr: 1.25, bloom: false },
      low: { maxDpr: 1, bloom: false },
      mobileWidth: 767,
      weakCores: 4,
      weakMemoryGb: 4,
      reduceAtFps: 45,
    },
  },
  motion: {
    revealDuration: 420,
    themeCrossfade: 300,
    loaderDuration: 1150,
    cameraDiveDuration: 0.8,
    cameraDamping: 3.1,
    pointerDamping: 5.8,
  },
  projects: {
    tiltDegrees: 2.2,
  },
} as const;
