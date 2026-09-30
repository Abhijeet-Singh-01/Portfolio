import * as THREE from 'three';
import { visualConfig as vConfig } from './visualConfig';

export interface CameraFrame {
  pos: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
  roll: number; // Subtle camera banking/tilt in radians
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
}

// 8 Narrative Beats with explicit Hold / Inspection windows
export const BEATS = [
  { id: 'hero', start: 0.0, end: 0.14, name: 'Hero' },
  { id: 'project-1', start: 0.18, end: 0.36, name: 'AI Incident Intelligence', projectIndex: 0, holdStart: 0.24, holdEnd: 0.32 },
  { id: 'project-2', start: 0.40, end: 0.58, name: 'SolisIQ', projectIndex: 1, holdStart: 0.46, holdEnd: 0.54 },
  { id: 'project-3', start: 0.62, end: 0.78, name: 'Instanews', projectIndex: 2, holdStart: 0.67, holdEnd: 0.75 },
  { id: 'project-4', start: 0.80, end: 0.90, name: 'ZeroHour', projectIndex: 3, holdStart: 0.83, holdEnd: 0.88 },
  { id: 'skills', start: 0.90, end: 0.95, name: 'The Lab' },
  { id: 'about', start: 0.95, end: 0.98, name: 'About' },
  { id: 'contact', start: 0.98, end: 1.0, name: 'Contact' },
] as const;

// Keyframe knots along the 3D cinematic camera spline
interface Keyframe {
  t: number;
  pos: [number, number, number];
  target: [number, number, number];
  fov: number;
  roll: number;
  lighting: LightingFrame;
}

const KEYFRAMES: Keyframe[] = [
  // 1. Hero Establishing (Wide, centered on portrait ring)
  {
    t: 0.0,
    pos: [0, 0, 8.5],
    target: [0, 0, 0],
    fov: 50,
    roll: 0.0,
    lighting: vConfig.lighting.default,
  },
  // 2. Close-Pass 1: Flying right through the expanded hero glass ring
  {
    t: 0.14,
    pos: [0.1, 0.1, 0.2],
    target: [0, 0, -10.0],
    fov: 56,
    roll: 0.03,
    lighting: vConfig.lighting.default,
  },
  // 3. Project 01 Fast Approach
  {
    t: 0.20,
    pos: [1.8, 0.5, -9.5],
    target: [-3.2, 0.35, -17.0],
    fov: 50,
    roll: -0.05,
    lighting: vConfig.lighting.project1,
  },
  // 4. Project 01 Inspection & Anomaly Hold (Slow micro-orbit)
  {
    t: 0.28,
    pos: [1.3, 0.25, -12.5],
    target: [-3.2, 0.35, -17.0],
    fov: 42,
    roll: -0.02,
    lighting: vConfig.lighting.project1,
  },
  // 5. Far-Away Moment 1: Pull-back to show glowing spine & energy pulse
  {
    t: 0.37,
    pos: [-0.4, 1.8, -21.0],
    target: [0, -0.2, -30.0],
    fov: 60,
    roll: 0.04,
    lighting: vConfig.lighting.project1,
  },
  // 6. Project 02 Solar System Approach
  {
    t: 0.43,
    pos: [-2.0, -0.4, -24.5],
    target: [3.2, -0.3, -31.0],
    fov: 52,
    roll: 0.06,
    lighting: vConfig.lighting.project2,
  },
  // 7. Project 02 Solar Core Inspection Hold & Close-Pass 2
  {
    t: 0.50,
    pos: [-1.4, -0.2, -27.5],
    target: [3.2, -0.3, -31.0],
    fov: 42,
    roll: 0.02,
    lighting: vConfig.lighting.project2,
  },
  // 8. Information Tunnel Transition (Camera dives into data ribbons)
  {
    t: 0.59,
    pos: [0.6, 0.3, -37.0],
    target: [0, 0, -44.0],
    fov: 58,
    roll: -0.05,
    lighting: vConfig.lighting.project2,
  },
  // 9. Project 03 Close-Pass 3: Weaving directly between floating article planes
  {
    t: 0.70,
    pos: [1.1, 0.15, -42.0],
    target: [-3.1, 0.25, -45.0],
    fov: 43,
    roll: -0.03,
    lighting: vConfig.lighting.project3,
  },
  // 10. Mechanical Transition to Chronometer
  {
    t: 0.78,
    pos: [-1.8, -0.2, -51.5],
    target: [0, 0, -58.0],
    fov: 56,
    roll: 0.04,
    lighting: vConfig.lighting.project3,
  },
  // 11. Project 04 Precision Chronometer Lock & Hold
  {
    t: 0.85,
    pos: [-1.3, -0.15, -55.0],
    target: [3.0, -0.2, -59.0],
    fov: 42,
    roll: 0.01,
    lighting: vConfig.lighting.project4,
  },
  // 12. Far-Away Moment 2: Spinal Collapse & Fragment Scattering into The Lab
  {
    t: 0.91,
    pos: [0, 2.2, -59.5],
    target: [0, -0.8, -66.5],
    fov: 54,
    roll: 0.0,
    lighting: vConfig.lighting.project4,
  },
  // 13. Human Calm Foundations (About)
  {
    t: 0.96,
    pos: [0, 0.4, -72.0],
    target: [0, 0.1, -78.0],
    fov: 48,
    roll: 0.0,
    lighting: vConfig.lighting.default,
  },
  // 14. Final Calm Convergence (Contact)
  {
    t: 1.0,
    pos: [0, 0, -79.5],
    target: [0, 0, -84.0],
    fov: 46,
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

  // 1. Locate surrounding keyframes
  let idx = 0;
  while (idx < KEYFRAMES.length - 1 && KEYFRAMES[idx + 1].t < p) {
    idx++;
  }
  const kA = KEYFRAMES[idx];
  const kB = KEYFRAMES[Math.min(idx + 1, KEYFRAMES.length - 1)];

  // Local normalized segment progression
  const span = Math.max(0.0001, kB.t - kA.t);
  const localT = smoothHermite(Math.max(0, Math.min(1, (p - kA.t) / span)));

  // 2. Interpolate Camera Position & Target along the 3D spline
  _pos.set(
    kA.pos[0] + (kB.pos[0] - kA.pos[0]) * localT,
    kA.pos[1] + (kB.pos[1] - kA.pos[1]) * localT,
    kA.pos[2] + (kB.pos[2] - kA.pos[2]) * localT
  );

  _target.set(
    kA.target[0] + (kB.target[0] - kA.target[0]) * localT,
    kA.target[1] + (kB.target[1] - kA.target[1]) * localT,
    kA.target[2] + (kB.target[2] - kA.target[2]) * localT
  );

  // Dynamic FOV: Base Hermite + Velocity warp (widens when scrolling fast)
  const baseFov = kA.fov + (kB.fov - kA.fov) * localT;
  const velocityWarp = Math.min(12, Math.abs(scrollVelocity) * 2.5);
  const cameraFov = baseFov + velocityWarp;

  // Camera Roll (Banking)
  const cameraRoll = kA.roll + (kB.roll - kA.roll) * localT;

  // 3. Determine Active Beat and Project
  let activeBeat = 0;
  let activeProjectIndex = -1;

  for (let b = 0; b < BEATS.length; b++) {
    const beat = BEATS[b];
    if (p >= beat.start && p <= beat.end) {
      activeBeat = b;
      if ('projectIndex' in beat && beat.projectIndex !== undefined) {
        activeProjectIndex = beat.projectIndex;
      }
      break;
    }
  }

  // 4. Project Visibilities (bell-curve influence centered on each inspection peak)
  const pPeaks = [0.28, 0.50, 0.70, 0.85];
  const projectVisibilities = pPeaks.map((peak) => {
    const dist = Math.abs(p - peak);
    return Math.max(0, 1 - dist / 0.11);
  });

  // 5. HUD Opacities for the 8 Beats (smooth bell curves)
  const hudOpacity = BEATS.map((beat) => {
    if (p < beat.start - 0.03 || p > beat.end + 0.03) return 0;
    if (p < beat.start) return (p - (beat.start - 0.03)) / 0.03;
    if (p > beat.end) return 1 - (p - beat.end) / 0.03;
    return 1;
  });

  // 6. Spine Dispersion into The Lab Constellation (begins at p = 0.89, fully dispersed at p = 0.94)
  const spineDispersion = Math.max(0, Math.min(1, (p - 0.89) / 0.05));

  // 7. Energy Conduit Pulse Wave Phase
  const energyPulsePhase = p * 20.0;

  // 8. Storytelling Lighting Color Blending
  _colorA.set(kA.lighting.ambient);
  _colorB.set(kB.lighting.ambient);
  _colorA.lerp(_colorB, localT);
  const ambient = '#' + _colorA.getHexString();

  _colorA.set(kA.lighting.key);
  _colorB.set(kB.lighting.key);
  _colorA.lerp(_colorB, localT);
  const key = '#' + _colorA.getHexString();

  _colorA.set(kA.lighting.fill);
  _colorB.set(kB.lighting.fill);
  _colorA.lerp(_colorB, localT);
  const fill = '#' + _colorA.getHexString();

  _colorA.set(kA.lighting.fog);
  _colorB.set(kB.lighting.fog);
  _colorA.lerp(_colorB, localT);
  const fog = '#' + _colorA.getHexString();

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
    lighting: { ambient, key, fill, fog },
  };
}
