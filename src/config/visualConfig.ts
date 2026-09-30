/**
 * CENTRAL VISUAL & MOTION CONFIGURATION
 * Master parameters for the 3D world, Project Backbone, particle layers, camera kinematics, and quality tiers.
 * Tune visual intensity here without touching engine shaders or scene trees.
 */

export const visualConfig = {
  // 1. Central Project Backbone (The Signature Metaphor)
  backbone: {
    height: 56, // Total vertical/Z span of the backbone through the projects scene
    radius: 1.85, // Radius of the dual helix spine strands
    nodesPerStrand: 48, // Node count per helix strand (96 total backbone nodes)
    strutsCount: 32, // Cross-connecting ribs/bridges between the two strands
    rotationSpeed: 0.18, // Idle continuous axial rotation speed
    pulseSpeed: 1.4, // Speed of traveling luminous energy wave along the spine
    pulseFrequency: 0.25, // Wavelength density of energy pulses
    tendrilCount: 4, // Number of energy tendrils extending to each project slab
    cursorReactionRadius: 4.5, // Proximity threshold for mouse attraction to backbone nodes
    nodeSize: 0.075, // Radius of each luminous backbone node crystal
  },

  // 2. Camera System & Kinematics
  camera: {
    fov: 44, // Field of view for cinematic perspective
    initialZ: 8.5, // Starting hero camera Z position
    travelZ: 78, // Total travel distance through the 5 scenes
    damping: 3.4, // GSAP/frame damping factor for buttery smooth motion
    lookAhead: 6.0, // Forward focus distance along travel vector
    mouseLookX: 0.016, // Parallax yaw sensitivity
    mouseLookY: 0.012, // Parallax pitch sensitivity
    breathingSpeed: 0.42, // Subtle organic camera idle breathing frequency
    breathingAmp: 0.038, // Amplitude of floating camera idle movement
    diveDuration: 0.85, // Duration of dive-in transition when inspecting project
  },

  // 3. Multi-layer GPU Particle Systems
  particles: {
    counts: {
      high: 3400, // Rich particle clouds on high-tier desktop
      medium: 1800, // Balanced count for mid-range systems
      low: 750, // Minimal lightweight particles for low-end / mobile
    },
    baseSize: 0.034, // Particle point size in world units
    driftSpeed: 0.15, // Idle Brownian drift rate
    glowMultiplier: 0.85, // Emissive intensity in fragment shader
  },

  // 4. Floating 3D Project Slabs
  projects: {
    count: 4,
    // Spatial coordinates relative to backbone for projects 01 - 04 (alternating left/right/depth)
    coords: [
      { x: -2.7, y: 0.35, z: -15.5, side: 'left' },
      { x: 2.7, y: -0.35, z: -27.5, side: 'right' },
      { x: -2.6, y: 0.25, z: -39.5, side: 'left' },
      { x: 2.6, y: -0.2, z: -51.5, side: 'right' },
    ],
    slabWidth: 2.3, // Physical width of glass slab in 3D units
    slabHeight: 1.85, // Physical height of glass slab
    slabDepth: 0.09, // Physical glass thickness with refraction look
    tiltSensitivity: 2.6, // Mouse hover tilt degrees
    settleDuration: 0.6, // Ease duration when card sharpens and settles
  },

  // 5. 360° Hero Portrait Orb
  hero: {
    dragSensitivity: 0.0085, // Pointer drag rotation speed
    verticalRotationLimit: 1.2, // Max up/down tilt limit (radians)
    autoReturnSpeed: 0.04, // Inertia damping ease back toward front face
    idleSwaySpeed: 0.8, // Subtle float frequency when idle
    idleSwayAmp: 0.12, // Subtle float amplitude
  },

  // 6. Adaptive Quality & Hardware Tiers
  quality: {
    high: { maxDpr: 1.5, bloom: true, shadowSamples: 16 },
    medium: { maxDpr: 1.25, bloom: false, shadowSamples: 8 },
    low: { maxDpr: 1.0, bloom: false, shadowSamples: 0 },
    mobileBreakpoint: 768, // Viewport width threshold for mobile defaults
    fpsThresholdDown: 44, // Auto step-down if FPS drops below this
    weakCoresThreshold: 4, // navigator.hardwareConcurrency check
    weakMemoryGbThreshold: 4, // navigator.deviceMemory check
  },

  // 7. Motion & Interaction Timings
  motion: {
    loaderDuration: 1250, // Loader duration in milliseconds (< 2.5s)
    themeTransition: 320, // Theme crossfade duration
    cursorDotDamping: 0.08, // Quick cursor center dot interpolation
    cursorRingDamping: 0.22, // Slightly elastic outer ring interpolation
    scrollDuration: 0.85, // Lenis wheel interpolation duration
  },
} as const;

export type VisualConfig = typeof visualConfig;
