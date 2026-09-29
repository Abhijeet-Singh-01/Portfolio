/** Central controls for the interactive experience. Tune these before editing component styles. */
export const experienceConfig = {
  // Shared colors for the WebGL scene and cursor system.
  palette: { cyan: '#70e5f2', blue: '#678bff', violet: '#a58cff', white: '#edf7ff' },
  // Ring lag, cursor dimensions, trail length, click sparks, and button pull.
  cursor: {
    ringEase: 0.18,
    ringSize: 30,
    hoverSize: 46,
    trailLength: 12,
    burstCount: 14,
    magnetStrength: 0.16,
  },
  // WebGL density, resolution/effects, pointer rotation, and hero exit movement.
  scene: {
    desktopNodes: 92,
    mobileNodes: 44,
    particleCount: 620,
    connectionDistance: 1.12,
    sphereSegments: 40,
    dprMax: 1.35,
    bloom: 0.24,
    qualityFloor: 0.25,
    fpsFloor: 45,
    fpsCeiling: 58,
    dragSensitivity: 0.008,
    dragInertia: 0.94,
    idleRotation: 0.0018,
    keyboardRotationStep: 0.12,
    verticalRotationLimit: 1.2,
    heroExitScale: 0.72,
    heroExitDepth: 1.5,
    lineOpacity: 0.1,
    nodeOpacity: 0.65,
    nodeSize: 0.027,
    particleOpacity: 0.48,
  },
  // Page reveal, magnetic reach, and the smooth-scroll / hero-scroll timings.
  motion: {
    revealDuration: 700,
    magneticRadius: 90,
    scrollDuration: 1.05,
    heroExitY: -52,
    heroExitOpacity: 0.42,
  },
  // Project-card perspective response.
  projects: { tiltDegrees: 2.2 },
  // Background star count and ambient-light opacity.
  atmosphere: { stars: 70, glowOpacity: 0.35 },
} as const;
