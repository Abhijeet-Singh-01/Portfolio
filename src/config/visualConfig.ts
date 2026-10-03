/**
 * CENTRAL VISUAL & MOTION CONFIGURATION — MASTER ARCHITECTURE
 * Parameters for the Architectural Infrastructure Spine, bespoke project worlds,
 * dual-layout responsive camera choreography (Desktop & Mobile), and storytelling lighting.
 */

export const visualConfig = {
  // 1. The Living Architectural Infrastructure Spine (Futuristic Engineered Spine)
  backbone: {
    height: 64,
    radius: 2.2,
    strutsCount: 24,
    pulseSpeed: 1.8,
    pulseFrequency: 0.22,
    nodeSize: 0.08,
    conduitColor: '#7C6CFF', // Base electric indigo
    conduitGlow: '#22D3EE', // Vivid cyan data pulse
    tendrilColor: '#C6F432', // Lime umbilical conduit
  },

  // 2. Cinematic Camera & Lens System
  camera: {
    baseFov: 48,
    travelFov: 54,
    inspectFov: 40,
    initialZ: 7.5,
    travelZ: 84,
    damping: 3.6,
    lookAhead: 6.5,
    mouseLookX: 0.015,
    mouseLookY: 0.012,
    breathingSpeed: 0.35,
    breathingAmp: 0.03,
    diveDuration: 0.95,
  },

  // 3. Multi-Layer Depth Hierarchy
  depthLayers: {
    layer01_atmosphere: { parallax: 0.04 },
    layer02_particles: { parallax: 0.12 },
    layer03_megastructures: { parallax: 0.22 },
    layer04_backbone: { parallax: 0.38 },
    layer05_projectVisuals: { parallax: 0.58 },
    layer06_projectFrames: { parallax: 0.72 },
    layer07_typography: { parallax: 0.28 },
    layer08_cursorLight: { intensity: 1.8, distance: 8.5 },
  },

  // 4. Storytelling Dynamic Lighting (Per-Project Color Worlds)
  lighting: {
    default: {
      ambient: '#0A0620',
      key: '#7C6CFF',
      fill: '#22D3EE',
      fog: '#05060A',
    },
    // Project 01: AI Incident Intelligence (Deep Observability & Incident Detection)
    project1: {
      ambient: '#0A0620',
      key: '#7C6CFF', // Electric Indigo
      fill: '#FF5FA8', // Anomaly Magenta
      accent: '#22D3EE', // Telemetry Cyan
      fog: '#05060E',
    },
    // Project 02: SolisIQ (Solar Energy System & Photovoltaic Power)
    project2: {
      ambient: '#1A0D04',
      key: '#FFA36B', // Solar Tangerine
      fill: '#FCD34D', // Photovoltaic Amber
      accent: '#22D3EE', // Storage Aqua
      fog: '#0A0604',
    },
    // Project 03: Instanews (High-Velocity Information Stream & RBAC Node)
    project3: {
      ambient: '#060F24',
      key: '#38BDF8', // Data Cyan
      fill: '#6366F1', // Express Indigo
      accent: '#FFFFFF', // Pure White feed
      fog: '#030814',
    },
    // Project 04: ZeroHour (Mechanical Precision Chronograph)
    project4: {
      ambient: '#100724',
      key: '#A855F7', // Chrono Violet
      fill: '#60A5FA', // Precision Blue
      accent: '#E0E7FF', // Diamond tick marks
      fog: '#060312',
    },
  },

  // 5. Physical Project Artifacts: Dual-Layout Coordinates (Desktop Asymmetric vs Mobile Vertical Corridor)
  projects: {
    count: 4,
    coords: [
      // Project 01: AI Incident Intelligence (Desktop: Artifact LEFT, Info RIGHT)
      {
        desktop: { x: -2.6, y: 0.2, z: -17.0, rotY: -0.25, rotX: 0.05, scale: 1.1, side: 'left' as const },
        mobile: { x: 0, y: 0.95, z: -17.0, rotY: 0.0, rotX: 0.04, scale: 0.8, side: 'center' as const },
      },
      // Project 02: SolisIQ (Desktop: Artifact RIGHT, Info LEFT)
      {
        desktop: { x: 2.6, y: 0.0, z: -31.0, rotY: 0.28, rotX: -0.05, scale: 1.15, side: 'right' as const },
        mobile: { x: 0, y: 0.95, z: -31.0, rotY: 0.0, rotX: -0.04, scale: 0.8, side: 'center' as const },
      },
      // Project 03: Instanews (Desktop: Artifact LEFT, Info RIGHT)
      {
        desktop: { x: -2.6, y: 0.2, z: -45.0, rotY: -0.28, rotX: 0.06, scale: 1.1, side: 'left' as const },
        mobile: { x: 0, y: 0.95, z: -45.0, rotY: 0.0, rotX: 0.04, scale: 0.8, side: 'center' as const },
      },
      // Project 04: ZeroHour (Desktop: Artifact RIGHT, Info LEFT)
      {
        desktop: { x: 2.6, y: 0.0, z: -59.0, rotY: 0.25, rotX: 0.08, scale: 1.15, side: 'right' as const },
        mobile: { x: 0, y: 0.95, z: -59.0, rotY: 0.0, rotX: 0.06, scale: 0.8, side: 'center' as const },
      },
    ],
  },

  // 6. Environmental Megastructures
  megastructures: {
    ringRadius: 26,
    ringZ: -42,
    gridWidth: 70,
    gridLength: 100,
    gridY: -3.8,
  },

  // 7. Multi-Tier GPU Particles (Restrained & Purposeful)
  particles: {
    counts: {
      high: 1200,
      medium: 700,
      low: 300,
    },
    baseSize: 0.032,
    driftSpeed: 0.14,
    streamSpeed: 0.65,
  },

  // 8. 360° Hero Portrait Orb
  hero: {
    dragSensitivity: 0.009,
    verticalRotationLimit: 1.1,
    autoReturnSpeed: 0.045,
    idleSwaySpeed: 0.65,
    idleSwayAmp: 0.06,
    ringRadius: 1.85,
    glassThickness: 0.12,
  },

  // 9. Adaptive Quality & Hardware Tiers
  quality: {
    high: { maxDpr: 1.5, bloom: true, shadowSamples: 16 },
    medium: { maxDpr: 1.25, bloom: false, shadowSamples: 8 },
    low: { maxDpr: 1.0, bloom: false, shadowSamples: 0 },
    mobileBreakpoint: 768,
    fpsThresholdDown: 44,
    weakCoresThreshold: 4,
    weakMemoryGbThreshold: 4,
  },

  // 10. Motion & Interaction Timings
  motion: {
    loaderDuration: 1200,
    themeTransition: 300,
    cursorDamping: 0.18,
    scrollDuration: 0.75,
  },
} as const;

export type VisualConfig = typeof visualConfig;
