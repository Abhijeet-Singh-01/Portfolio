import * as THREE from 'three';
import { visualConfig as vConfig } from './visualConfig';

export interface CameraFrame {
  pos: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
  roll: number;
}

export interface LightingFrame {
  ambient: string;
  key: string;
  fill: string;
  fog: string;
}

export interface TimelineState {
  progress: number;
  cameraPos: THREE.Vector3;
  cameraTarget: THREE.Vector3;
  cameraFov: number;
  cameraRoll: number;
  activeBeat: number; // 0: Hero, 1: P01, 2: P02, 3: P03, 4: P04, 5: Skills, 6: About, 7: Contact
  activeProjectIndex: number; // 0, 1, 2, 3, or -1
  projectVisibilities: number[]; // [p0, p1, p2, p3] 0.0 to 1.0 opacity/scale
  hudOpacity: number[]; // Opacity for each beat's HUD overlay
  spineDispersion: number; // 0.0 (intact) -> 1.0 (fragmented into constellation)
  energyPulsePhase: number;
  lighting: LightingFrame;
  isMobile: boolean;
}

// 8 Narrative Beats with explicit Hold / Inspection windows
export const BEATS = [
  { id: 'hero', start: 0.0, end: 0.12, name: 'Hero' },
  { id: 'project-1', start: 0.18, end: 0.36, name: 'AI Incident Intelligence', projectIndex: 0, holdStart: 0.23, holdEnd: 0.32 },
  { id: 'project-2', start: 0.40, end: 0.58, name: 'SolisIQ', projectIndex: 1, holdStart: 0.45, holdEnd: 0.54 },
  { id: 'project-3', start: 0.62, end: 0.78, name: 'Instanews', projectIndex: 2, holdStart: 0.66, holdEnd: 0.75 },
  { id: 'project-4', start: 0.81, end: 0.91, name: 'ZeroHour', projectIndex: 3, holdStart: 0.84, holdEnd: 0.90 },
  { id: 'skills', start: 0.92, end: 0.95, name: 'The Lab' },
  { id: 'about', start: 0.95, end: 0.98, name: 'About' },
  { id: 'contact', start: 0.98, end: 1.0, name: 'Contact' },
] as const;

interface Keyframe {
  t: number;
  pos: [number, number, number];
  target: [number, number, number];
  fov: number;
  roll: number;
  lighting: LightingFrame;
}

// ----------------------------------------------------------------------------------
// DESKTOP KEYFRAMES (Asymmetric Spatial Choreography & Horizon Banking)
// ----------------------------------------------------------------------------------
const DESKTOP_KEYFRAMES: Keyframe[] = [
  // 1. Hero Establishing (Wide, centered on portrait ring)
  {
    t: 0.0,
    pos: [0, 0, 8.5],
    target: [0, 0, 0],
    fov: 50,
    roll: 0.0,
    lighting: vConfig.lighting.default,
  },
  // 2. Portal Dive: Swooping straight through the expanded hero glass ring
  {
    t: 0.14,
    pos: [0.0, 0.0, 0.4],
    target: [0, 0, -10.0],
    fov: 56,
    roll: 0.02,
    lighting: vConfig.lighting.default,
  },
  // 3. Project 01 Fast Approach (Banking into turn towards left installation)
  {
    t: 0.20,
    pos: [1.8, 0.45, -10.5],
    target: [-3.2, 0.35, -17.0],
    fov: 48,
    roll: -0.05,
    lighting: vConfig.lighting.project1,
  },
  // 4. Project 01 Inspection & Anomaly Hold (Slow micro-orbit around neural cluster)
  {
    t: 0.28,
    pos: [1.2, 0.22, -12.8],
    target: [-3.2, 0.35, -17.0],
    fov: 42,
    roll: -0.02,
    lighting: vConfig.lighting.project1,
  },
  // 5. Spine Energy Transition 1 -> 2 (Pull-back to show energy pulse rush through spine)
  {
    t: 0.37,
    pos: [-0.5, 1.6, -21.0],
    target: [0, -0.2, -30.0],
    fov: 58,
    roll: 0.04,
    lighting: vConfig.lighting.project1,
  },
  // 6. Project 02 Solar Machine Approach (Banking to frame right installation)
  {
    t: 0.42,
    pos: [-2.0, -0.35, -24.5],
    target: [3.2, -0.25, -31.0],
    fov: 50,
    roll: 0.06,
    lighting: vConfig.lighting.project2,
  },
  // 7. Project 02 Solar Core Inspection Hold (Slow orbit inspecting orbital rings)
  {
    t: 0.50,
    pos: [-1.35, -0.18, -26.8],
    target: [3.2, -0.25, -31.0],
    fov: 42,
    roll: 0.02,
    lighting: vConfig.lighting.project2,
  },
  // 8. Spine Energy Transition 2 -> 3 (Camera weaves through information corridor)
  {
    t: 0.59,
    pos: [0.6, 0.35, -37.0],
    target: [0, 0, -44.0],
    fov: 58,
    roll: -0.05,
    lighting: vConfig.lighting.project2,
  },
  // 9. Project 03 Close Fly-Through (Weaving directly between floating article planes)
  {
    t: 0.70,
    pos: [1.0, 0.2, -41.5],
    target: [-2.8, 0.8, -45.0],
    fov: 44,
    roll: -0.03,
    lighting: vConfig.lighting.project3,
  },
  // 10. Spine Energy Transition 3 -> 4 (Downward dive toward precision chronometer)
  {
    t: 0.79,
    pos: [-1.6, -0.25, -51.5],
    target: [0, 0, -58.0],
    fov: 56,
    roll: 0.04,
    lighting: vConfig.lighting.project3,
  },
  // 11. Project 04 Precision Chronometer Lock & Hold
  {
    t: 0.86,
    pos: [-1.15, -0.15, -55.2],
    target: [2.6, -0.3, -59.0],
    fov: 42,
    roll: 0.01,
    lighting: vConfig.lighting.project4,
  },
  // 12. Spinal Collapse & Fragment Scattering into The Lab
  {
    t: 0.92,
    pos: [0, 2.0, -60.0],
    target: [0, -0.8, -67.0],
    fov: 54,
    roll: 0.0,
    lighting: vConfig.lighting.project4,
  },
  // 13. The Lab (Skills Hex Grid Room)
  {
    t: 0.94,
    pos: [0, 1.2, -64.0],
    target: [0, -0.4, -70.0],
    fov: 50,
    roll: 0.0,
    lighting: vConfig.lighting.default,
  },
  // 14. Human Calm Foundations (About)
  {
    t: 0.965,
    pos: [0, 0.35, -72.0],
    target: [0, 0.1, -78.0],
    fov: 48,
    roll: 0.0,
    lighting: vConfig.lighting.default,
  },
  // 15. Final Calm Convergence (Contact)
  {
    t: 1.0,
    pos: [0, 0, -79.5],
    target: [0, 0, -84.0],
    fov: 46,
    roll: 0.0,
    lighting: vConfig.lighting.default,
  },
];

// ----------------------------------------------------------------------------------
// MOBILE KEYFRAMES (Dedicated Narrow Vertical Corridor & Top-Half Artifact Framing)
// ----------------------------------------------------------------------------------
const MOBILE_KEYFRAMES: Keyframe[] = [
  // 1. Hero Mobile (Centered, slightly wider FOV for portrait ring)
  {
    t: 0.0,
    pos: [0, 0, 9.2],
    target: [0, 0, 0],
    fov: 54,
    roll: 0.0,
    lighting: vConfig.lighting.default,
  },
  // 2. Portal Dive
  {
    t: 0.14,
    pos: [0, 0, 0.4],
    target: [0, 0, -10.0],
    fov: 58,
    roll: 0.0,
    lighting: vConfig.lighting.default,
  },
  // 3. Project 01 Mobile Approach
  {
    t: 0.20,
    pos: [0, 0.2, -10.0],
    target: [0, 0.65, -16.5],
    fov: 54,
    roll: 0.0,
    lighting: vConfig.lighting.project1,
  },
  // 4. Project 01 Mobile Hold (Framed in top 55% of portrait viewport)
  {
    t: 0.28,
    pos: [0, 0.1, -11.8],
    target: [0, 0.65, -16.5],
    fov: 50,
    roll: 0.0,
    lighting: vConfig.lighting.project1,
  },
  // 5. Mobile Transition 1 -> 2
  {
    t: 0.37,
    pos: [0, 0.3, -21.0],
    target: [0, 0.3, -29.0],
    fov: 56,
    roll: 0.0,
    lighting: vConfig.lighting.project1,
  },
  // 6. Project 02 Mobile Approach
  {
    t: 0.42,
    pos: [0, 0.2, -24.0],
    target: [0, 0.65, -30.5],
    fov: 54,
    roll: 0.0,
    lighting: vConfig.lighting.project2,
  },
  // 7. Project 02 Mobile Hold
  {
    t: 0.50,
    pos: [0, 0.1, -25.8],
    target: [0, 0.65, -30.5],
    fov: 50,
    roll: 0.0,
    lighting: vConfig.lighting.project2,
  },
  // 8. Mobile Transition 2 -> 3
  {
    t: 0.59,
    pos: [0, 0.3, -35.0],
    target: [0, 0.3, -43.0],
    fov: 56,
    roll: 0.0,
    lighting: vConfig.lighting.project2,
  },
  // 9. Project 03 Mobile Hold
  {
    t: 0.70,
    pos: [0, 0.1, -39.8],
    target: [0, 0.65, -44.5],
    fov: 50,
    roll: 0.0,
    lighting: vConfig.lighting.project3,
  },
  // 10. Mobile Transition 3 -> 4
  {
    t: 0.79,
    pos: [0, 0.2, -49.0],
    target: [0, 0.2, -57.0],
    fov: 56,
    roll: 0.0,
    lighting: vConfig.lighting.project3,
  },
  // 11. Project 04 Mobile Hold
  {
    t: 0.86,
    pos: [0, 0.1, -53.8],
    target: [0, 0.65, -58.5],
    fov: 50,
    roll: 0.0,
    lighting: vConfig.lighting.project4,
  },
  // 12. Mobile Spinal Dissolve into The Lab
  {
    t: 0.92,
    pos: [0, 1.8, -60.0],
    target: [0, -0.4, -67.0],
    fov: 54,
    roll: 0.0,
    lighting: vConfig.lighting.project4,
  },
  // 13. Mobile The Lab
  {
    t: 0.94,
    pos: [0, 1.0, -64.0],
    target: [0, -0.3, -70.0],
    fov: 52,
    roll: 0.0,
    lighting: vConfig.lighting.default,
  },
  // 14. Mobile About
  {
    t: 0.965,
    pos: [0, 0.2, -72.0],
    target: [0, 0.1, -78.0],
    fov: 50,
    roll: 0.0,
    lighting: vConfig.lighting.default,
  },
  // 15. Mobile Contact
  {
    t: 1.0,
    pos: [0, 0, -79.0],
    target: [0, 0, -84.0],
    fov: 48,
    roll: 0.0,
    lighting: vConfig.lighting.default,
  },
];

// Smooth Hermite (smoothstep)
function smoothHermite(t: number): number {
  return t * t * (3 - 2 * t);
}

// Global cached vectors to prevent garbage collection in the render loop
const _pos = new THREE.Vector3();
const _target = new THREE.Vector3();
const _colorA = new THREE.Color();
const _colorB = new THREE.Color();

/**
 * Evaluates the full cinematic timeline state for a given scrollProgress [0, 1]
 */
export function getTimelineState(rawProgress: number, scrollVelocity = 0): TimelineState {
  const p = Math.max(0, Math.min(1, rawProgress));
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const keyframes = isMobile ? MOBILE_KEYFRAMES : DESKTOP_KEYFRAMES;

  // Find bounding keyframe segment
  let i = 0;
  while (i < keyframes.length - 2 && keyframes[i + 1].t < p) {
    i++;
  }

  const k1 = keyframes[i];
  const k2 = keyframes[i + 1];
  const segmentDuration = Math.max(0.0001, k2.t - k1.t);
  const localT = Math.max(0, Math.min(1, (p - k1.t) / segmentDuration));
  const smoothT = smoothHermite(localT);

  // 1. Camera 3D Spline Position
  _pos.set(
    THREE.MathUtils.lerp(k1.pos[0], k2.pos[0], smoothT),
    THREE.MathUtils.lerp(k1.pos[1], k2.pos[1], smoothT),
    THREE.MathUtils.lerp(k1.pos[2], k2.pos[2], smoothT)
  );

  // 2. Camera Target
  _target.set(
    THREE.MathUtils.lerp(k1.target[0], k2.target[0], smoothT),
    THREE.MathUtils.lerp(k1.target[1], k2.target[1], smoothT),
    THREE.MathUtils.lerp(k1.target[2], k2.target[2], smoothT)
  );

  // 3. Dynamic Field of View
  const baseFov = THREE.MathUtils.lerp(k1.fov, k2.fov, smoothT);
  const velocityFovWarp = Math.min(7.0, Math.abs(scrollVelocity) * 2.8);
  const cameraFov = baseFov + velocityFovWarp;

  // 4. Camera Roll
  const cameraRoll = THREE.MathUtils.lerp(k1.roll, k2.roll, smoothT);

  // 5. Active Narrative Beat and Project Index
  let activeBeat = 0;
  let activeProjectIndex = -1;
  for (let b = 0; b < BEATS.length; b++) {
    const beat = BEATS[b];
    if (p >= beat.start && p <= beat.end) {
      activeBeat = b;
      if ('projectIndex' in beat) {
        activeProjectIndex = beat.projectIndex;
      }
      break;
    }
  }

  // 6. Project Visibilities (Emergence -> Peak hold -> Graceful departure)
  const projectVisibilities = [0, 0, 0, 0];
  const hudOpacity = [0, 0, 0, 0, 0, 0, 0, 0];

  const projectBeats = [
    { start: 0.18, peakStart: 0.23, peakEnd: 0.32, end: 0.37 },
    { start: 0.39, peakStart: 0.45, peakEnd: 0.54, end: 0.59 },
    { start: 0.61, peakStart: 0.66, peakEnd: 0.75, end: 0.79 },
    { start: 0.80, peakStart: 0.84, peakEnd: 0.90, end: 0.92 },
  ];

  projectBeats.forEach((b, idx) => {
    if (p < b.start || p > b.end) {
      projectVisibilities[idx] = 0;
    } else if (p < b.peakStart) {
      // Smooth emergence
      projectVisibilities[idx] = smoothHermite((p - b.start) / (b.peakStart - b.start));
    } else if (p <= b.peakEnd) {
      // Stable peak inspection
      projectVisibilities[idx] = 1.0;
    } else {
      // Graceful departure
      projectVisibilities[idx] = 1.0 - smoothHermite((p - b.peakEnd) / (b.end - b.peakEnd));
    }
  });

  // HUD opacities per beat
  if (activeProjectIndex >= 0) {
    const pb = projectBeats[activeProjectIndex];
    if (p >= pb.peakStart && p <= pb.peakEnd) {
      hudOpacity[activeProjectIndex + 1] = 1.0;
    } else if (p > pb.start && p < pb.peakStart) {
      hudOpacity[activeProjectIndex + 1] = smoothHermite((p - pb.start) / (pb.peakStart - pb.start));
    } else if (p > pb.peakEnd && p < pb.end) {
      hudOpacity[activeProjectIndex + 1] = 1.0 - smoothHermite((p - pb.peakEnd) / (pb.end - pb.peakEnd));
    }
  }

  // 7. Spine Dispersion (Collapses and transforms into The Lab skills floor)
  const spineDispersion = p < 0.90 ? 0.0 : Math.min(1.0, (p - 0.90) / 0.04);

  // 8. Traveling Energy Pulse Phase
  const energyPulsePhase = p * Math.PI * 16.0;

  // 9. Storytelling Environment Lighting Interpolation
  _colorA.set(k1.lighting.ambient);
  _colorB.set(k2.lighting.ambient);
  const ambientHex = '#' + _colorA.lerp(_colorB, smoothT).getHexString();

  _colorA.set(k1.lighting.key);
  _colorB.set(k2.lighting.key);
  const keyHex = '#' + _colorA.lerp(_colorB, smoothT).getHexString();

  _colorA.set(k1.lighting.fill);
  _colorB.set(k2.lighting.fill);
  const fillHex = '#' + _colorA.lerp(_colorB, smoothT).getHexString();

  _colorA.set(k1.lighting.fog);
  _colorB.set(k2.lighting.fog);
  const fogHex = '#' + _colorA.lerp(_colorB, smoothT).getHexString();

  return {
    progress: p,
    cameraPos: _pos,
    cameraTarget: _target,
    cameraFov,
    cameraRoll,
    activeBeat,
    activeProjectIndex,
    projectVisibilities,
    hudOpacity,
    spineDispersion,
    energyPulsePhase,
    lighting: {
      ambient: ambientHex,
      key: keyHex,
      fill: fillHex,
      fog: fogHex,
    },
    isMobile,
  };
}
