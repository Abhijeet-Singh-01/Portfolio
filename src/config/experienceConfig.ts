/** Central controls for the visual experience. Tune the numbers here first. */
export const experienceConfig = {
  palette: { cyan: '#70e5f2', blue: '#678bff', violet: '#a58cff', white: '#edf7ff' },
  cursor: { ringEase: 0.18, ringSize: 30, hoverSize: 46, trailLength: 12, burstCount: 14, magnetStrength: 0.16 },
  scene: { desktopNodes: 92, mobileNodes: 44, particleCount: 620, connectionDistance: 1.12, sphereSegments: 40, dprMax: 1.35, bloom: 0.24 },
  motion: { floatSpeed: 0.22, revealDuration: 700, magneticRadius: 90, scrollDuration: 1.05 },
  atmosphere: { stars: 70, glowOpacity: 0.22 },
} as const;
