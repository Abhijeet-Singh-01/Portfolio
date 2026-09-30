/**
 * CENTRAL VISUAL & MOTION CONFIGURATION — MASTER ARCHITECTURE
 * Parameters for the Architectural Infrastructure Spine, bespoke project worlds,
 * dual-layout responsive camera choreography (Desktop & Mobile), and storytelling lighting.
 */

export const visualConfig = {
  // 1. The Living Architectural Infrastructure Spine (Futuristic Engineered Spine)
  backbone: {
    height: 64, // Extended Z-span through all 4 projects
    radius: 2.2, // Structural envelope radius
    strutsCount: 28, // Architectural cross-rib frames
    pulseSpeed: 1.9, // Luminous energy pulse propagation velocity
    pulseFrequency: 0.24, // Data pulse frequency density
    nodeSize: 0.09, // Luminous junction node crystal scale
    conduitColor: '#7C6CFF', // Base electric indigo
    conduitGlow: '#22D3EE', // Vivid cyan data pulse
    tendrilColor: '#C6F432', // Lime umbilical conduit
  },

  // 2. Cinematic Camera & Lens System
  camera: {
    baseFov: 50,
    travelFov: 58,
    inspectFov: 42,
    initialZ: 8.5,
    travelZ: 82,
    damping: 3.4,
    lookAhead: 7.0,
    mouseLookX: 0.018,
    mouseLookY: 0.014,
    breathingSpeed: 0.38,
    breathingAmp: 0.04,
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
      ambient: '#1A1050',
      key: '#7C6CFF',
      fill: '#22D3EE',
      fog: '#0A0620',
    },
    // Project 01: AI Incident Intelligence (Deep Observability & Incident Detection)
    project1: {
      ambient: '#160838',
      key: '#7C6CFF', // Electric Indigo
      fill: '#FF5FA8', // Anomaly Magenta
      accent: '#22D3EE', // Telemetry Cyan
      fog: '#0A0624',
    },
    // Project 02: SolisIQ (Solar Energy System & Photovoltaic Power)
    project2: {
      ambient: '#261204',
      key: '#FFA36B', // Solar Tangerine
      fill: '#FCD34D', // Photovoltaic Amber
      accent: '#22D3EE', // Storage Aqua
      fog: '#120803',
    },
    // Project 03: Instanews (High-Velocity Information Stream & RBAC Node)
    project3: {
      ambient: '#06162E',
      key: '#38BDF8', // Data Cyan
      fill: '#6366F1', // Express Indigo
      accent: '#FFFFFF', // Pure White feed
      fog: '#040B1A',
    },
    // Project 04: ZeroHour (Mechanical Precision Chronograph)
    project4: {
      ambient: '#180B33',
      key: '#A855F7', // Chrono Violet
      fill: '#60A5FA', // Precision Blue
      accent: '#E0E7FF', // Diamond tick marks
      fog: '#0B051C',
    },
  },

  // 5. Physical Project Artifacts: Dual-Layout Coordinates (Desktop Asymmetric vs Mobile Vertical Corridor)
  projects: {
    count: 4,
    coords: [
      // Project 01: AI Incident Intelligence
      {
        desktop: { x: -3.2, y: 0.35, z: -17.0, rotY: -0.25, rotX: 0.05, scale: 1.15, side: 'left' as const },
        mobile: { x: 0, y: 0.65, z: -16.5, rotY: 0.0, rotX: 0.04, scale: 0.95, side: 'center' as const },
        numberZ: -34.0,
      },
      // Project 02: SolisIQ
      {
        desktop: { x: 3.2, y: -0.25, z: -31.0, rotY: 0.30, rotX: -0.06, scale: 1.18, side: 'right' as const },
        mobile: { x: 0, y: 0.65, z: -30.5, rotY: 0.0, rotX: -0.04, scale: 0.95, side: 'center' as const },
        numberZ: -48.0,
      },
      // Project 03: Instanews
      {
        desktop: { x: -2.8, y: 0.8, z: -45.0, rotY: -0.32, rotX: 0.06, scale: 1.15, side: 'left' as const },
        mobile: { x: 0, y: 0.65, z: -44.5, rotY: 0.0, rotX: 0.04, scale: 0.95, side: 'center' as const },
        numberZ: -62.0,
      },
      // Project 04: ZeroHour
      {
        desktop: { x: 2.6, y: -0.3, z: -59.0, rotY: 0.25, rotX: 0.10, scale: 1.2, side: 'right' as const },
        mobile: { x: 0, y: 0.65, z: -58.5, rotY: 0.0, rotX: 0.06, scale: 0.95, side: 'center' as const },
        numberZ: -76.0,
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
      high: 1800, // Reduced from excessive 3800 to purposeful 1800
      medium: 1000,
      low: 400,
    },
    baseSize: 0.035,
    driftSpeed: 0.16,
    streamSpeed: 0.75,
  },

  // 8. 360° Hero Portrait Orb
  hero: {
    dragSensitivity: 0.009,
    verticalRotationLimit: 1.2,
    autoReturnSpeed: 0.045,
    idleSwaySpeed: 0.75,
    idleSwayAmp: 0.08,
    ringRadius: 1.9,
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
    scrollDuration: 0.75, // Responsive crisp scroll duration
  },
} as const;

export type VisualConfig = typeof visualConfig;
