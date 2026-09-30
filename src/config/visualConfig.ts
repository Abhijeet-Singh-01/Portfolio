/**
 * CENTRAL VISUAL & MOTION CONFIGURATION — SECOND-PASS MASTER DIRECTIVE
 * Architectural parameters for the Living Project Spine, multi-layer depth hierarchy,
 * bespoke project worlds, dynamic camera choreography, and storytelling lighting.
 */

export const visualConfig = {
  // 1. The Living Architectural Project Spine (Signature Conduit)
  backbone: {
    height: 62, // Extended vertical/Z span through projects
    radius: 2.1, // Base radius of primary architectural spine
    secondaryRadius: 2.7, // Orbit radius of secondary organic energy cables
    nodesPerStrand: 56, // 112 primary crystal nodes across dual helix
    cableSegments: 48, // Resolution of secondary spiraling conduits
    strutsCount: 36, // Structural architectural ribs bridging the conduits
    rotationSpeed: 0.12, // Slow, dignified dignified axial rotation
    pulseSpeed: 1.8, // Speed of traveling luminous energy wave along the spine
    pulseFrequency: 0.22, // Frequency density of traveling data pulses
    tendrilCount: 4, // Umbilical energy conduits feeding each project
    nodeSize: 0.082, // Radius of each luminous node crystal
    conduitColor: '#7C6CFF', // Base electric indigo
    conduitGlow: '#22D3EE', // Vivid cyan data pulse
  },

  // 2. Cinematic Camera & Lens System
  camera: {
    baseFov: 50, // Natural cinematic wide perspective
    travelFov: 58, // Expanded dynamic FOV during high-speed travel / transitions
    inspectFov: 42, // Compressed telephoto FOV during close artifact inspection
    initialZ: 8.5, // Hero camera Z position
    travelZ: 82, // Total travel trajectory through the 5 scenes
    damping: 3.2, // GSAP/frame damping factor for buttery smooth motion
    lookAhead: 7.0, // Forward focus distance along travel vector
    mouseLookX: 0.018, // Parallax yaw sensitivity
    mouseLookY: 0.014, // Parallax pitch sensitivity
    breathingSpeed: 0.38, // Organic camera idle breathing frequency
    breathingAmp: 0.042, // Amplitude of floating camera idle movement
    diveDuration: 0.95, // Duration of inspection dive transition
  },

  // 3. Multi-Layer Depth System (Feel the Z-Axis)
  depthLayers: {
    layer01_atmosphere: { parallax: 0.04 }, // Distant deep void
    layer02_particles: { parallax: 0.12 }, // Cosmic dust & data fragments
    layer03_megastructures: { parallax: 0.22 }, // Giant background rings & technical grids
    layer04_backbone: { parallax: 0.38 }, // The architectural spine
    layer05_projectVisuals: { parallax: 0.58 }, // Physical project worlds
    layer06_projectFrames: { parallax: 0.72 }, // Glass slabs & HUD frames
    layer07_typography: { parallax: 0.28 }, // 3D floating numbers & labels
    layer08_cursorLight: { intensity: 1.8, distance: 8.5 }, // Interactive cursor point light
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

  // 5. Physical Project Artifacts & Spatial 3D Composition (Non-facing angles)
  projects: {
    count: 4,
    coords: [
      // Project 01: AI Incident Intelligence (Angled -16° yaw, +4° pitch, left side)
      {
        x: -3.2,
        y: 0.35,
        z: -17.0,
        side: 'left',
        rotY: -0.28, // ~ -16°
        rotX: 0.07,
        scale: 1.15,
        numberZ: -34.0, // Colossal 01 floating behind
      },
      // Project 02: SolisIQ (Angled +22° yaw, -6° pitch, right side diagonal)
      {
        x: 3.2,
        y: -0.3,
        z: -31.0,
        side: 'right',
        rotY: 0.38, // ~ +22°
        rotX: -0.1,
        scale: 1.18,
        numberZ: -48.0, // Colossal 02 floating behind
      },
      // Project 03: Instanews (Angled -24° yaw, partially occluded behind spine until approach)
      {
        x: -3.1,
        y: 0.25,
        z: -45.0,
        side: 'left',
        rotY: -0.42, // ~ -24°
        rotX: 0.05,
        scale: 1.15,
        numberZ: -62.0, // Colossal 03 floating behind
      },
      // Project 04: ZeroHour (Angled +18° yaw, +8° pitch, precision mechanical instrument)
      {
        x: 3.0,
        y: -0.2,
        z: -59.0,
        side: 'right',
        rotY: 0.31, // ~ +18°
        rotX: 0.14,
        scale: 1.2,
        numberZ: -76.0, // Colossal 04 floating behind
      },
    ],
    slabWidth: 2.8,
    slabHeight: 2.1,
    slabDepth: 0.12,
    inspectScale: 1.35,
  },

  // 6. Environmental Megastructures (Layer 03 Scale)
  megastructures: {
    ringRadius: 26, // Enormous distant structural ring
    ringZ: -42, // Centered in the middle of projects trajectory
    gridWidth: 70, // Massive technical floor grid
    gridLength: 100,
    gridY: -3.8,
  },

  // 7. Multi-Tier GPU Particles
  particles: {
    counts: {
      high: 3800,
      medium: 2000,
      low: 800,
    },
    baseSize: 0.038,
    driftSpeed: 0.18,
    streamSpeed: 0.85, // Velocity of particles flowing along the backbone
  },

  // 8. 360° Hero Portrait Orb
  hero: {
    dragSensitivity: 0.009,
    verticalRotationLimit: 1.2,
    autoReturnSpeed: 0.045,
    idleSwaySpeed: 0.75,
    idleSwayAmp: 0.1,
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
    loaderDuration: 1250,
    themeTransition: 320,
    cursorDamping: 0.18,
    scrollDuration: 0.9,
  },
} as const;

export type VisualConfig = typeof visualConfig;
