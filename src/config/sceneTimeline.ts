import * as THREE from 'three';
import { visualConfig as vConfig } from './visualConfig';

export interface CameraFrame {
  pos: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
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
  activeBeat: number; // 0: Hero, 1: P01, 2: P02, 3: P03, 4: P04, 5: Skills, 6: About, 7: Contact
  activeProjectIndex: number; // 0, 1, 2, 3, or -1
  projectVisibilities: number[]; // [p0, p1, p2, p3] 0.0 to 1.0 opacity/influence
  hudOpacity: number[]; // [hero, p0, p1, p2, p3, skills, about, contact]
  spineDispersion: number; // 0.0 (intact) -> 1.0 (fragmented into constellation)
  energyPulsePhase: number;
  lighting: LightingFrame;
}

// 8 Cinematic Storytelling Beats along the scroll trajectory
export const BEATS = [
  { id: 'hero', start: 0.0, end: 0.14, name: 'Hero' },
  { id: 'project-1', start: 0.18, end: 0.35, name: 'AI Incident Intelligence', projectIndex: 0 },
  { id: 'project-2', start: 0.38, end: 0.55, name: 'SolisIQ', projectIndex: 1 },
  { id: 'project-3', start: 0.58, end: 0.74, name: 'Instanews', projectIndex: 2 },
  { id: 'project-4', start: 0.77, end: 0.89, name: 'ZeroHour', projectIndex: 3 },
  { id: 'skills', start: 0.89, end: 0.94, name: 'The Lab' },
  { id: 'about', start: 0.94, end: 0.98, name: 'About' },
  { id: 'contact', start: 0.98, end: 1.0, name: 'Contact' },
] as const;

// Keyframe knots along the 3D camera trajectory
interface Keyframe {
  t: number;
  pos: [number, number, number];
  target: [number, number, number];
  fov: number;
  lighting: LightingFrame;
}

const KEYFRAMES: Keyframe[] = [
  // 1. Hero Establishing (t = 0.0)
  {
    t: 0.0,
    pos: [0, 0, 8.5],
    target: [0, 0, 0],
    fov: 50,
    lighting: vConfig.lighting.default,
  },
  // 2. Hero Exit / Spine Entrance (t = 0.14)
  {
    t: 0.14,
    pos: [0.3, 0.2, 1.5],
    target: [0, 0, -8.0],
    fov: 54,
    lighting: vConfig.lighting.default,
  },
  // 3. Project 01 Arrival & Inspection (AI Incident) (t = 0.26)
  {
    t: 0.26,
    pos: [1.4, 0.3, -11.8],
    target: [-3.2, 0.35, -17.0],
    fov: 43,
    lighting: vConfig.lighting.project1,
  },
  // 4. Energy Conduit Transition (P01 -> P02) (t = 0.36)
  {
    t: 0.36,
    pos: [-0.6, -0.1, -21.5],
    target: [0, 0, -28.0],
    fov: 58,
    lighting: vConfig.lighting.project1,
  },
  // 5. Project 02 Arrival & Solar Core Inspection (SolisIQ) (t = 0.46)
  {
    t: 0.46,
    pos: [-1.5, -0.25, -26.0],
    target: [3.2, -0.3, -31.0],
    fov: 43,
    lighting: vConfig.lighting.project2,
  },
  // 6. Information Tunnel Transition (P02 -> P03) (t = 0.56)
  {
    t: 0.56,
    pos: [0.8, 0.15, -36.5],
    target: [0, 0, -42.0],
    fov: 58,
    lighting: vConfig.lighting.project2,
  },
  // 7. Project 03 Dive Through Information Planes (Instanews) (t = 0.66)
  {
    t: 0.66,
    pos: [1.3, 0.25, -40.5],
    target: [-3.1, 0.25, -45.0],
    fov: 44,
    lighting: vConfig.lighting.project3,
  },
  // 8. Mechanical Transition (P03 -> P04) (t = 0.75)
  {
    t: 0.75,
    pos: [-0.8, -0.1, -50.5],
    target: [0, 0, -56.0],
    fov: 56,
    lighting: vConfig.lighting.project3,
  },
  // 9. Project 04 Precision Chronograph Lock (ZeroHour) (t = 0.83)
  {
    t: 0.83,
    pos: [-1.4, -0.15, -54.5],
    target: [3.0, -0.2, -59.0],
    fov: 42,
    lighting: vConfig.lighting.project4,
  },
  // 10. Spine Dissolves into The Lab (Skills Constellation) (t = 0.91)
  {
    t: 0.91,
    pos: [0, 1.4, -60.5],
    target: [0, -0.6, -66.5],
    fov: 52,
    lighting: vConfig.lighting.project4,
  },
  // 11. Human Calm Foundations (About) (t = 0.96)
  {
    t: 0.96,
    pos: [0, 0.3, -71.5],
    target: [0, 0.1, -78.0],
    fov: 48,
    lighting: vConfig.lighting.default,
  },
  // 12. Final Convergence (Contact) (t = 1.0)
  {
    t: 1.0,
    pos: [0, 0, -79.0],
    target: [0, 0, -84.0],
    fov: 46,
    lighting: vConfig.lighting.default,
  },
];

// Helper: Smooth Hermite interpolation (smoothstep)
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
  const velocityWarp = Math.min(10, Math.abs(scrollVelocity) * 2.2);
  const cameraFov = baseFov + velocityWarp;

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

  // 4. Project Visibilities (bell-curve influence around each project peak)
  const pCenters = [0.26, 0.46, 0.66, 0.83];
  const projectVisibilities = pCenters.map((center) => {
    const dist = Math.abs(p - center);
    return Math.max(0, 1 - dist / 0.12);
  });

  // 5. HUD Opacities for the 8 Beats (smooth bell curves)
  const hudOpacity = BEATS.map((beat) => {
    if (p < beat.start - 0.04 || p > beat.end + 0.04) return 0;
    if (p < beat.start) return (p - (beat.start - 0.04)) / 0.04;
    if (p > beat.end) return 1 - (p - beat.end) / 0.04;
    return 1;
  });

  // 6. Spine Dispersion into The Lab Constellation (begins at p = 0.88, fully dispersed at p = 0.94)
  const spineDispersion = Math.max(0, Math.min(1, (p - 0.88) / 0.06));

  // 7. Energy Conduit Pulse Wave Phase
  const energyPulsePhase = p * 18.0;

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
    activeBeat,
    activeProjectIndex,
    projectVisibilities,
    hudOpacity,
    spineDispersion,
    energyPulsePhase,
    lighting: { ambient, key, fill, fog },
  };
}
