/** Central controls for remaining lightweight interactions and reveals. */
export const experienceConfig = {
  // The hero's CSS artwork only changes on fine pointers; no WebGL is loaded.
  scene: {
    dragSensitivity: 0.008,
    keyboardRotationStep: 0.12,
    verticalRotationLimit: 1.2,
  },
  // Intersection-triggered reveal duration.
  motion: {
    revealDuration: 420,
  },
  // Project-card perspective response.
  projects: { tiltDegrees: 2.2 },
} as const;
