import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, advance, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import { visualConfig as vConfig } from '../../config/visualConfig';
import { experienceConfig as config } from '../../config/experienceConfig';
import { experienceState, setSmoothScroll } from '../../lib/experienceStore';
import { projectsData } from '../../data/projects';
import { skillsCategories } from '../../data/skills';
import { getTimelineState } from '../../config/sceneTimeline';

type Quality = 'high' | 'medium' | 'low';
const PARTICLE_COUNTS: Record<Quality, number> = {
  high: vConfig.particles.counts.high,
  medium: vConfig.particles.counts.medium,
  low: vConfig.particles.counts.low,
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const cssColor = (token: string) =>
  typeof document !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(token).trim()
    : '#7C6CFF';

function useAuroraColor(token: string) {
  const value = cssColor(token);
  return useMemo(() => new THREE.Color(value), [value]);
}

const initialQuality = (): Quality => {
  if (typeof window === 'undefined') return 'high';
  const mobile = window.innerWidth <= vConfig.quality.mobileBreakpoint;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = navigator.hardwareConcurrency;
  const memory = nav.deviceMemory;
  const weak =
    (cores !== undefined && cores <= vConfig.quality.weakCoresThreshold) ||
    (memory !== undefined && memory <= vConfig.quality.weakMemoryGbThreshold);
  if (mobile || weak) return 'low';
  return cores !== undefined && cores >= 8 && memory !== undefined && memory >= 8 ? 'high' : 'medium';
};

function useTheme() {
  const [theme, setTheme] = useState(experienceState.theme);
  useEffect(() => {
    const sync = (event: Event) => {
      const value = (event as CustomEvent<'light' | 'night'>).detail;
      experienceState.theme = value;
      setTheme(value);
    };
    window.addEventListener('aurora-theme-change', sync);
    return () => window.removeEventListener('aurora-theme-change', sync);
  }, []);
  return theme;
}

/**
 * Procedural Crisp Canvas Texture for Colossal Environmental Project Numbers (Layer 07)
 */
function makeColossalNumberTexture(numStr: string, tintColor: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, 512, 512);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Soft atmospheric glow behind number
  const gradient = ctx.createRadialGradient(256, 256, 40, 256, 256, 240);
  gradient.addColorStop(0, `${tintColor}22`);
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Colossal display numeral with subtle wireframe/stroke
  ctx.font = '900 320px "Space Grotesk", sans-serif';
  ctx.strokeStyle = `${tintColor}40`;
  ctx.lineWidth = 4;
  ctx.strokeText(numStr, 256, 260);

  ctx.fillStyle = `${tintColor}18`;
  ctx.fillText(numStr, 256, 260);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural Crisp Canvas Texture for Project Slab Front Glass Faces
 */
function makeArtifactLabel(name: string, index: number, category: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 440;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Subtle dark tinted glass backing
  ctx.fillStyle = 'rgba(10, 6, 32, 0.88)';
  ctx.roundRect(10, 10, 620, 420, 24);
  ctx.fill();

  // Glass edge highlight
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Corner tech markings
  ctx.strokeStyle = '#22D3EE';
  ctx.lineWidth = 2;
  // Top-left bracket
  ctx.beginPath();
  ctx.moveTo(32, 56);
  ctx.lineTo(32, 32);
  ctx.lineTo(56, 32);
  ctx.stroke();

  // Top-right bracket
  ctx.beginPath();
  ctx.moveTo(608, 56);
  ctx.lineTo(608, 32);
  ctx.lineTo(584, 32);
  ctx.stroke();

  // Metadata Header
  ctx.fillStyle = '#22D3EE';
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillText(`ARTIFACT // 0${index + 1}  [${category.toUpperCase()}]`, 48, 62);

  // Project Title
  ctx.fillStyle = '#F8F6FF';
  ctx.font = '800 38px "Syne", sans-serif';
  const words = name.toUpperCase().split(' ');
  let line = '';
  let y = 130;
  for (const word of words) {
    const trial = line ? `${line} ${word}` : word;
    if (ctx.measureText(trial).width > 540 && line) {
      ctx.fillText(line, 48, y);
      line = word;
      y += 48;
    } else line = trial;
  }
  ctx.fillText(line, 48, y);

  // Technical Sub-readout
  ctx.fillStyle = '#B9B3E6';
  ctx.font = '14px "JetBrains Mono", monospace';
  ctx.fillText('PHYSICAL INSPECTION ACTIVE · SCROLL TO ORBIT', 48, 380);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// ----------------------------------------------------------------------------------
// LAYER 01 & DYNAMIC LIGHTING: STORYTELLING ENVIRONMENT & VOLUMETRIC ATMOSPHERE
// ----------------------------------------------------------------------------------
function StorytellingEnvironment() {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const fillRef = useRef<THREE.DirectionalLight>(null);
  const fogRef = useRef<THREE.Fog>(null);

  // Target color vectors to avoid per-frame GC allocations
  const tempAmbient = useMemo(() => new THREE.Color(), []);
  const tempKey = useMemo(() => new THREE.Color(), []);
  const tempFill = useMemo(() => new THREE.Color(), []);
  const tempFog = useMemo(() => new THREE.Color(), []);

  const p1Colors = useMemo(
    () => ({
      ambient: new THREE.Color(vConfig.lighting.project1.ambient),
      key: new THREE.Color(vConfig.lighting.project1.key),
      fill: new THREE.Color(vConfig.lighting.project1.fill),
      fog: new THREE.Color(vConfig.lighting.project1.fog),
    }),
    []
  );

  const p2Colors = useMemo(
    () => ({
      ambient: new THREE.Color(vConfig.lighting.project2.ambient),
      key: new THREE.Color(vConfig.lighting.project2.key),
      fill: new THREE.Color(vConfig.lighting.project2.fill),
      fog: new THREE.Color(vConfig.lighting.project2.fog),
    }),
    []
  );

  const p3Colors = useMemo(
    () => ({
      ambient: new THREE.Color(vConfig.lighting.project3.ambient),
      key: new THREE.Color(vConfig.lighting.project3.key),
      fill: new THREE.Color(vConfig.lighting.project3.fill),
      fog: new THREE.Color(vConfig.lighting.project3.fog),
    }),
    []
  );

  const p4Colors = useMemo(
    () => ({
      ambient: new THREE.Color(vConfig.lighting.project4.ambient),
      key: new THREE.Color(vConfig.lighting.project4.key),
      fill: new THREE.Color(vConfig.lighting.project4.fill),
      fog: new THREE.Color(vConfig.lighting.project4.fog),
    }),
    []
  );

  const defaultColors = useMemo(
    () => ({
      ambient: new THREE.Color(vConfig.lighting.default.ambient),
      key: new THREE.Color(vConfig.lighting.default.key),
      fill: new THREE.Color(vConfig.lighting.default.fill),
      fog: new THREE.Color(vConfig.lighting.default.fog),
    }),
    []
  );

  useFrame((_, delta) => {
    const safeDelta = Math.min(delta, 0.05);
    const timeline = getTimelineState(experienceState.scrollProgress);

    tempAmbient.set(timeline.lighting.ambient);
    tempKey.set(timeline.lighting.key);
    tempFill.set(timeline.lighting.fill);
    tempFog.set(timeline.lighting.fog);

    if (ambientRef.current) ambientRef.current.color.lerp(tempAmbient, safeDelta * 3.5);
    if (keyRef.current) keyRef.current.color.lerp(tempKey, safeDelta * 3.5);
    if (fillRef.current) fillRef.current.color.lerp(tempFill, safeDelta * 3.5);
    if (fogRef.current) fogRef.current.color.lerp(tempFog, safeDelta * 3.5);
  });

  return (
    <>
      <fog ref={fogRef} attach="fog" args={[vConfig.lighting.default.fog, 18, 92]} />
      <ambientLight ref={ambientRef} intensity={0.85} />
      <directionalLight ref={keyRef} position={[-6, 8, 6]} intensity={1.4} />
      <directionalLight ref={fillRef} position={[6, -5, -15]} intensity={0.75} />
    </>
  );
}

// ----------------------------------------------------------------------------------
// LAYER 02: DUAL-TIER PARTICLES (COSMIC DUST + DIRECTIONAL DATA CONDUIT STREAM)
// ----------------------------------------------------------------------------------
function PurposefulParticleField({ quality }: { quality: Quality }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();
  const maxCount = vConfig.particles.counts.high;

  const geometry = useMemo(() => {
    const positions = new Float32Array(maxCount * 3);
    const speeds = new Float32Array(maxCount);
    for (let i = 0; i < maxCount; i++) {
      const angle = i * 2.399963229728653;
      // 30% of particles are concentrated tightly along the central spine (conduit stream)
      const isConduit = i % 3 === 0;
      const radius = isConduit ? 0.3 + (i % 20) * 0.12 : 1.5 + (i % 60) * 0.22;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle * 0.8) * radius * 0.65;
      positions[i * 3 + 2] = -((i * 0.61803398875) % vConfig.camera.travelZ);
      speeds[i] = isConduit ? 1.8 : 0.4;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
    return geom;
  }, [maxCount]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), vConfig.quality.high.maxDpr) },
      uIndigo: { value: new THREE.Color(vConfig.backbone.conduitColor) },
      uAqua: { value: new THREE.Color(vConfig.backbone.conduitGlow) },
      uSize: { value: vConfig.particles.baseSize },
    }),
    [gl]
  );

  useEffect(() => {
    geometry.setDrawRange(0, PARTICLE_COUNTS[quality]);
  }, [geometry, quality]);

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.elapsedTime * vConfig.particles.driftSpeed;
    materialRef.current.uniforms.uPointer.value.set(experienceState.pointerX, experienceState.pointerY);
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform vec2 uPointer;
          uniform float uPixelRatio;
          uniform float uSize;
          attribute float speed;
          varying float vGlow;
          varying float vSpeed;
          void main() {
            vec3 p = position;
            float streamOffset = mod(p.z + uTime * speed * 6.0, 82.0) - 82.0;
            p.z = streamOffset;
            float phase = uTime * speed + p.z * 0.04;
            p.x += sin(phase + p.y * 0.3) * 0.15 + uPointer.x * 0.22;
            p.y += cos(phase * 0.8 + p.x * 0.25) * 0.12 - uPointer.y * 0.18;
            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = clamp(uSize * uPixelRatio * (120.0 / max(1.0, -mvPosition.z)), 1.0, 6.0);
            vGlow = 0.35 + 0.65 * abs(sin(phase * 0.8));
            vSpeed = speed;
          }
        `}
        fragmentShader={`
          uniform vec3 uIndigo;
          uniform vec3 uAqua;
          varying float vGlow;
          varying float vSpeed;
          void main() {
            vec2 pt = gl_PointCoord - vec2(0.5);
            float r = length(pt);
            float alpha = smoothstep(0.5, 0.04, r) * vGlow * 0.65;
            vec3 color = mix(uIndigo, uAqua, step(1.0, vSpeed));
            gl_FragColor = vec4(color * 1.35, alpha);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ----------------------------------------------------------------------------------
// LAYER 03: ENVIRONMENTAL MEGASTRUCTURES & COLOSSAL 3D SPATIAL NUMBERS
// ----------------------------------------------------------------------------------
function EnvironmentalMegastructures() {
  const ringRef = useRef<THREE.Group>(null);
  const aquaColor = useAuroraColor('--accent-aqua');
  const violetColor = useAuroraColor('--accent-violet');
  const magentaColor = useAuroraColor('--accent-magenta');
  const orangeColor = useAuroraColor('--accent-tangerine');

  const { ringRadius, ringZ, gridWidth, gridLength, gridY } = vConfig.megastructures;

  // Colossal Number Textures
  const num01 = useMemo(() => makeColossalNumberTexture('01', '#22D3EE'), []);
  const num02 = useMemo(() => makeColossalNumberTexture('02', '#FFA36B'), []);
  const num03 = useMemo(() => makeColossalNumberTexture('03', '#38BDF8'), []);
  const num04 = useMemo(() => makeColossalNumberTexture('04', '#A855F7'), []);

  useEffect(() => () => {
    num01.dispose();
    num02.dispose();
    num03.dispose();
    num04.dispose();
  }, [num01, num02, num03, num04]);

  // Massive Structural Grid
  const gridLines = useMemo(() => {
    const coords: number[] = [];
    const step = 3.5;
    for (let x = -gridWidth * 0.5; x <= gridWidth * 0.5; x += step) {
      coords.push(x, gridY, 0, x, gridY, -gridLength);
    }
    for (let z = 0; z >= -gridLength; z -= step) {
      coords.push(-gridWidth * 0.5, gridY, z, gridWidth * 0.5, gridY, z);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(coords), 3));
    return geom;
  }, [gridLength, gridWidth, gridY]);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.elapsedTime * 0.035;
      ringRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.06;
    }
  });

  return (
    <group>
      {/* Enormous Distant Translucent Ring */}
      <group ref={ringRef} position={[0, 0, ringZ]}>
        <mesh>
          <torusGeometry args={[ringRadius, 0.06, 12, 120]} />
          <meshBasicMaterial color={violetColor} transparent opacity={0.22} />
        </mesh>
        <mesh rotation={[Math.PI * 0.35, 0, 0]}>
          <torusGeometry args={[ringRadius * 1.15, 0.035, 8, 120]} />
          <meshBasicMaterial color={aquaColor} transparent opacity={0.16} />
        </mesh>
      </group>

      {/* Massive Technical Grid Floor */}
      <lineSegments geometry={gridLines}>
        <lineBasicMaterial color={violetColor} transparent opacity={0.085} depthWrite={false} />
      </lineSegments>

      {/* Colossal 3D Numerals floating 17m behind projects */}
      <mesh position={[-4.5, 1.2, vConfig.projects.coords[0].numberZ]}>
        <planeGeometry args={[14, 14]} />
        <meshBasicMaterial map={num01} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      <mesh position={[4.5, -0.8, vConfig.projects.coords[1].numberZ]}>
        <planeGeometry args={[14, 14]} />
        <meshBasicMaterial map={num02} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      <mesh position={[-4.5, 1.0, vConfig.projects.coords[2].numberZ]}>
        <planeGeometry args={[14, 14]} />
        <meshBasicMaterial map={num03} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      <mesh position={[4.2, -0.6, vConfig.projects.coords[3].numberZ]}>
        <planeGeometry args={[14, 14]} />
        <meshBasicMaterial map={num04} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// ----------------------------------------------------------------------------------
// LAYER 04: THE LIVING ARCHITECTURAL PROJECT SPINE & DATA CONDUIT
// ----------------------------------------------------------------------------------
function LivingArchitecturalSpine() {
  const spineGroup = useRef<THREE.Group>(null);
  const nodesMesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const aquaColor = useAuroraColor('--accent-aqua');
  const limeColor = useAuroraColor('--accent-lime');
  const indigoColor = useAuroraColor('--accent-indigo');
  const magentaColor = useAuroraColor('--accent-magenta');

  const { nodesPerStrand, radius, secondaryRadius, height, strutsCount } = vConfig.backbone;
  const totalNodes = nodesPerStrand * 2;

  // Primary Strand Nodes with Varying Thickness Profile
  const nodeData = useMemo(() => {
    const data: { x: number; y: number; z: number; strand: number; thickness: number; t: number }[] = [];
    const zStart = -10.0;
    const zStep = height / nodesPerStrand;

    for (let i = 0; i < nodesPerStrand; i++) {
      const t = i / nodesPerStrand;
      const angle = t * Math.PI * 7.5; // Smooth sweeping helix
      const z = zStart - i * zStep;

      // Organic thickness modulation: expands near project stations
      const nearP1 = Math.exp(-Math.pow((z - -17) / 4.0, 2));
      const nearP2 = Math.exp(-Math.pow((z - -31) / 4.0, 2));
      const nearP3 = Math.exp(-Math.pow((z - -45) / 4.0, 2));
      const nearP4 = Math.exp(-Math.pow((z - -59) / 4.0, 2));
      const thickness = 1.0 + (nearP1 + nearP2 + nearP3 + nearP4) * 0.75;

      const r = radius * (0.85 + Math.sin(t * Math.PI * 4) * 0.15);

      // Strand A
      data.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r * 0.65,
        z,
        strand: 0,
        thickness,
        t,
      });

      // Strand B (Opposite Phase)
      data.push({
        x: Math.cos(angle + Math.PI) * r,
        y: Math.sin(angle + Math.PI) * r * 0.65,
        z,
        strand: 1,
        thickness,
        t,
      });
    }
    return data;
  }, [height, nodesPerStrand, radius]);

  // Secondary Helical Energy Cables (2 Wrapping Conduits)
  const secondaryCableGeometry = useMemo(() => {
    const points: number[] = [];
    const totalSteps = 160;
    const zStart = -10.0;
    const zStep = height / totalSteps;

    for (let i = 0; i < totalSteps - 1; i++) {
      const t1 = i / totalSteps;
      const t2 = (i + 1) / totalSteps;
      const a1 = t1 * Math.PI * 12; // High frequency wrap
      const a2 = t2 * Math.PI * 12;
      const z1 = zStart - i * zStep;
      const z2 = zStart - (i + 1) * zStep;

      // Cable 1
      points.push(
        Math.cos(a1) * secondaryRadius,
        Math.sin(a1) * secondaryRadius * 0.6,
        z1,
        Math.cos(a2) * secondaryRadius,
        Math.sin(a2) * secondaryRadius * 0.6,
        z2
      );

      // Cable 2
      points.push(
        Math.cos(a1 + Math.PI * 0.65) * (secondaryRadius * 0.85),
        Math.sin(a1 + Math.PI * 0.65) * (secondaryRadius * 0.55),
        z1,
        Math.cos(a2 + Math.PI * 0.65) * (secondaryRadius * 0.85),
        Math.sin(a2 + Math.PI * 0.65) * (secondaryRadius * 0.55),
        z2
      );
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(points), 3));
    return geom;
  }, [height, secondaryRadius]);

  // Architectural Cross Struts
  const strutGeometry = useMemo(() => {
    const positions = new Float32Array(strutsCount * 6);
    const zStart = -10.0;
    const zStep = height / strutsCount;

    for (let i = 0; i < strutsCount; i++) {
      const t = i / strutsCount;
      const angle = t * Math.PI * 7.5;
      const z = zStart - i * zStep;

      const ax = Math.cos(angle) * radius;
      const ay = Math.sin(angle) * radius * 0.65;
      const bx = Math.cos(angle + Math.PI) * radius;
      const by = Math.sin(angle + Math.PI) * radius * 0.65;

      positions.set([ax, ay, z, bx, by, z], i * 6);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [height, radius, strutsCount]);

  // Umbilical Energy Tendrils to Project Mounts
  const tendrilGeometry = useMemo(() => {
    const positions: number[] = [];
    vConfig.projects.coords.forEach((coord) => {
      const targetZ = coord.z;
      const closest = nodeData.reduce((prev, curr) =>
        Math.abs(curr.z - targetZ) < Math.abs(prev.z - targetZ) ? curr : prev
      );

      // Multi-segment energy branch
      const midX = (closest.x + coord.x) * 0.5 + (coord.side === 'left' ? -0.6 : 0.6);
      const midY = (closest.y + coord.y) * 0.5 + 0.35;
      const midZ = (closest.z + coord.z) * 0.5;

      positions.push(closest.x, closest.y, closest.z, midX, midY, midZ);
      positions.push(midX, midY, midZ, coord.x, coord.y, coord.z);
    });
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    return geom;
  }, [nodeData]);

  const nodeGeometry = useMemo(() => new THREE.OctahedronGeometry(vConfig.backbone.nodeSize, 1), []);
  const nodeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: aquaColor,
        emissive: aquaColor,
        emissiveIntensity: 0.8,
        roughness: 0.15,
        metalness: 0.85,
      }),
    [aquaColor]
  );

  useFrame(({ clock }, delta) => {
    if (!nodesMesh.current || !spineGroup.current) return;
    const time = clock.elapsedTime;
    const safeDelta = Math.min(delta, 0.05);
    const timeline = getTimelineState(experienceState.scrollProgress);
    const dispersion = timeline.spineDispersion;

    // Organic axial sway
    spineGroup.current.rotation.z = Math.sin(time * 0.12) * 0.06;

    // When inspecting or active, shift spine slightly to side to heroize the project
    const activeIdx = timeline.activeProjectIndex;
    const targetSpineX = activeIdx >= 0 ? (vConfig.projects.coords[activeIdx]?.side === 'left' ? 1.6 : -1.6) : 0;
    spineGroup.current.position.x = THREE.MathUtils.damp(spineGroup.current.position.x, targetSpineX, 3.5, safeDelta);

    // Traveling Data Conduit Energy Pulse along spine nodes
    for (let i = 0; i < totalNodes; i++) {
      const d = nodeData[i];
      // Wave traveling forward along Z
      const wave = Math.sin(d.z * vConfig.backbone.pulseFrequency + time * 1.8 + timeline.energyPulsePhase);
      const isNearProject = Math.abs(-d.z - (vConfig.camera.initialZ - timeline.cameraPos.z)) < 7.0;

      // When dispersion > 0 (transitioning into skills constellation), nodes detach and fly outward
      const disperseDist = dispersion * (3.8 + (i % 7) * 0.65);
      const disperseAngle = i * 0.45;
      const posX = d.x + Math.cos(disperseAngle) * disperseDist;
      const posY = d.y + Math.sin(disperseAngle) * disperseDist;
      const posZ = d.z;

      const scale = (0.75 + wave * 0.35 + (isNearProject ? 0.7 : 0)) * d.thickness * (1.0 - dispersion * 0.55);

      dummy.position.set(posX, posY, posZ);
      dummy.scale.setScalar(scale);
      dummy.rotation.set(time * 0.3 + i, time * 0.2, i);
      dummy.updateMatrix();
      nodesMesh.current.setMatrixAt(i, dummy.matrix);

      // Pulse color: shifts from cyan to lime or magenta when data conduit passes
      const nodeColor = isNearProject ? limeColor : wave > 0.45 ? aquaColor : indigoColor;
      nodesMesh.current.setColorAt(i, nodeColor);
    }

    nodesMesh.current.instanceMatrix.needsUpdate = true;
    if (nodesMesh.current.instanceColor) nodesMesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <group ref={spineGroup}>
      {/* 112 Instanced Architectural Node Crystals */}
      <instancedMesh ref={nodesMesh} args={[nodeGeometry, nodeMaterial, totalNodes]} />

      {/* Structural Cross Struts */}
      <lineSegments geometry={strutGeometry}>
        <lineBasicMaterial color={aquaColor} transparent opacity={0.32} depthWrite={false} />
      </lineSegments>

      {/* Secondary Spiraling Energy Conduits */}
      <lineSegments geometry={secondaryCableGeometry}>
        <lineBasicMaterial color={indigoColor} transparent opacity={0.48} depthWrite={false} />
      </lineSegments>

      {/* Umbilical Energy Tendrils to Projects */}
      <lineSegments geometry={tendrilGeometry}>
        <lineBasicMaterial color={limeColor} transparent opacity={0.65} depthWrite={false} />
      </lineSegments>

      {/* Internal Core Conduit Light */}
      <pointLight position={[0, 0, -28]} color={aquaColor} intensity={1.1} distance={22} />
      <pointLight position={[0, 0, -52]} color={limeColor} intensity={0.9} distance={20} />
    </group>
  );
}

// ----------------------------------------------------------------------------------
// LAYER 05: 4 BESPOKE PROCEDURAL 3D PROJECT WORLDS
// ----------------------------------------------------------------------------------

/**
 * Project 01: AI Incident Intelligence (The Incident Network)
 * Multi-node neural cluster with telemetry lines, anomaly spikes, and investigation wave
 */
function VisualAIIncident() {
  const group = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const aqua = useAuroraColor('--accent-aqua');
  const magenta = useAuroraColor('--accent-magenta');
  const indigo = useAuroraColor('--accent-indigo');

  // 8 Satellite Nodes (Logs, Metrics, Services, Traces, Incidents, Evidence, Root Cause, Remediation)
  const satellites = useMemo(() => {
    return [
      { x: -0.75, y: 0.45, z: 0.15, role: 'logs' },
      { x: -0.85, y: -0.35, z: -0.1, role: 'metrics' },
      { x: 0.75, y: 0.55, z: -0.15, role: 'services' },
      { x: 0.85, y: -0.4, z: 0.12, role: 'traces' },
      { x: 0.15, y: 0.8, z: 0.22, role: 'incident' },
      { x: -0.2, y: -0.75, z: 0.18, role: 'evidence' },
      { x: 0.65, y: 0.1, z: 0.35, role: 'root_cause' },
      { x: -0.6, y: 0.12, z: -0.3, role: 'remediation' },
    ];
  }, []);

  // Neural Connection Links between Core and Satellites
  const linksGeometry = useMemo(() => {
    const coords: number[] = [];
    satellites.forEach((sat, i) => {
      coords.push(0, 0, 0, sat.x, sat.y, sat.z);
      // Cross-link to next satellite
      const next = satellites[(i + 1) % satellites.length];
      coords.push(sat.x, sat.y, sat.z, next.x, next.y, next.z);
    });
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(coords), 3));
    return geom;
  }, [satellites]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.elapsedTime;
    group.current.rotation.y = time * 0.18;
    group.current.rotation.x = Math.sin(time * 0.25) * 0.08;

    // Anomaly heart-beat pulse on central investigation node
    if (coreRef.current) {
      const pulse = 1.0 + Math.pow(Math.sin(time * 2.8), 6) * 0.45;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group}>
      {/* Central Incident Core Node */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.28, 2]} />
        <meshStandardMaterial
          color={magenta}
          emissive={magenta}
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Satellite Observability Nodes */}
      {satellites.map((sat, i) => (
        <group key={i} position={[sat.x, sat.y, sat.z]}>
          <mesh>
            <octahedronGeometry args={[0.085, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? aqua : indigo}
              emissive={i % 2 === 0 ? aqua : indigo}
              emissiveIntensity={0.65}
            />
          </mesh>
        </group>
      ))}

      {/* Dynamic Telemetry Neural Connections */}
      <lineSegments geometry={linksGeometry}>
        <lineBasicMaterial color={aqua} transparent opacity={0.65} depthWrite={false} />
      </lineSegments>

      {/* Outer Telemetry Bounds */}
      <mesh>
        <sphereGeometry args={[1.05, 16, 16]} />
        <meshBasicMaterial color={indigo} wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

/**
 * Project 02: SolisIQ (The Solar Energy System)
 * Radiant solar core with corona flares, 3 multi-axis orbital rings, and photovoltaic collectors
 */
function VisualSolisIQ() {
  const group = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Group>(null);
  const ring2 = useRef<THREE.Group>(null);
  const ring3 = useRef<THREE.Group>(null);

  const tangerine = useAuroraColor('--accent-tangerine');
  const aqua = useAuroraColor('--accent-aqua');
  const lime = useAuroraColor('--accent-lime');

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.elapsedTime;
    if (ring1.current) ring1.current.rotation.z = time * 0.45;
    if (ring2.current) ring2.current.rotation.x = time * 0.32;
    if (ring3.current) {
      ring3.current.rotation.y = time * 0.38;
      ring3.current.rotation.z = -time * 0.22;
    }
  });

  return (
    <group ref={group}>
      {/* Radiant Solar Core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.34, 24, 24]} />
        <meshStandardMaterial
          color={tangerine}
          emissive={tangerine}
          emissiveIntensity={1.4}
          roughness={0.15}
          metalness={0.3}
        />
      </mesh>

      {/* Orbital Ring 1: Primary Photovoltaic Collector Arc */}
      <group ref={ring1}>
        <mesh>
          <torusGeometry args={[0.72, 0.025, 12, 64]} />
          <meshBasicMaterial color={tangerine} />
        </mesh>
        {/* Photovoltaic Solar Panels */}
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.72, Math.sin(a) * 0.72, 0]} rotation={[0, 0, a]}>
              <boxGeometry args={[0.12, 0.04, 0.04]} />
              <meshBasicMaterial color={lime} />
            </mesh>
          );
        })}
      </group>

      {/* Orbital Ring 2: Equatorial Energy Flow */}
      <group ref={ring2} rotation={[Math.PI * 0.4, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.95, 0.018, 8, 64]} />
          <meshBasicMaterial color={aqua} transparent opacity={0.75} />
        </mesh>
      </group>

      {/* Orbital Ring 3: Tilted Outer Corona Arc */}
      <group ref={ring3} rotation={[0, Math.PI * 0.35, Math.PI * 0.2]}>
        <mesh>
          <torusGeometry args={[1.18, 0.012, 6, 64]} />
          <meshBasicMaterial color={tangerine} transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Project 03: Instanews (Futuristic Information Stream & RBAC Node)
 * 3 staggered floating article planes with varying Z-depths and dynamic news ribbons
 */
function VisualInstanews() {
  const group = useRef<THREE.Group>(null);
  const p1 = useRef<THREE.Mesh>(null);
  const p2 = useRef<THREE.Mesh>(null);
  const p3 = useRef<THREE.Mesh>(null);

  const aqua = useAuroraColor('--accent-aqua');
  const indigo = useAuroraColor('--accent-indigo');

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.elapsedTime;
    group.current.rotation.y = Math.sin(time * 0.2) * 0.15;
    if (p1.current) p1.current.position.y = Math.sin(time * 0.8) * 0.06;
    if (p2.current) p2.current.position.y = Math.cos(time * 0.75 + 1) * 0.07;
    if (p3.current) p3.current.position.y = Math.sin(time * 0.9 + 2) * 0.05;
  });

  return (
    <group ref={group}>
      {/* Plane 1: Front Active Article Pane (Z = +0.22) */}
      <mesh ref={p1} position={[-0.32, 0.15, 0.22]} rotation={[0, 0.12, -0.05]}>
        <planeGeometry args={[0.95, 0.65]} />
        <meshStandardMaterial
          color={indigo}
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Plane 2: Mid Content Layer with RBAC Shield (Z = 0.0) */}
      <mesh ref={p2} position={[0.25, -0.1, 0.0]} rotation={[0, -0.15, 0.06]}>
        <planeGeometry args={[0.85, 0.58]} />
        <meshBasicMaterial color={aqua} wireframe transparent opacity={0.45} />
      </mesh>

      {/* Plane 3: Deep Cached Content Stream (Z = -0.28) */}
      <mesh ref={p3} position={[-0.1, -0.35, -0.28]} rotation={[-0.08, 0.05, -0.02]}>
        <planeGeometry args={[1.1, 0.7]} />
        <meshBasicMaterial color={indigo} transparent opacity={0.35} />
      </mesh>

      {/* Glowing RBAC Auth Token Satellite */}
      <mesh position={[0.65, 0.45, 0.15]}>
        <octahedronGeometry args={[0.11, 0]} />
        <meshBasicMaterial color={aqua} />
      </mesh>
    </group>
  );
}

/**
 * Project 04: ZeroHour (Mechanical Precision Chronograph)
 * Multi-axis precision tick-mark ring, counter-rotating gears, and sweeping countdown second needle
 */
function VisualZeroHour() {
  const outerRing = useRef<THREE.Group>(null);
  const gear1 = useRef<THREE.Group>(null);
  const gear2 = useRef<THREE.Group>(null);
  const handRef = useRef<THREE.Group>(null);

  const aqua = useAuroraColor('--accent-aqua');
  const violet = useAuroraColor('--accent-violet');

  // 60 Subdivided Chronograph Tick Marks
  const tickGeometry = useMemo(() => {
    const coords: number[] = [];
    const count = 60;
    const rOuter = 0.95;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const rInner = i % 5 === 0 ? 0.82 : 0.89; // Major tick vs minor tick
      coords.push(Math.cos(a) * rInner, Math.sin(a) * rInner, 0, Math.cos(a) * rOuter, Math.sin(a) * rOuter, 0);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(coords), 3));
    return geom;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    if (outerRing.current) outerRing.current.rotation.z = -time * 0.12;
    if (gear1.current) gear1.current.rotation.z = time * 0.45;
    if (gear2.current) gear2.current.rotation.z = -time * 0.45;
    if (handRef.current) handRef.current.rotation.z = -time * 2.2;
  });

  return (
    <group>
      {/* Outer Precision Tick Mark Chronograph Ring */}
      <group ref={outerRing}>
        <lineSegments geometry={tickGeometry}>
          <lineBasicMaterial color={aqua} />
        </lineSegments>
        <mesh>
          <torusGeometry args={[0.96, 0.02, 8, 64]} />
          <meshBasicMaterial color={violet} />
        </mesh>
      </group>

      {/* Sweeping Precision Hand */}
      <group ref={handRef}>
        <mesh position={[0, 0.4, 0.04]}>
          <boxGeometry args={[0.025, 0.8, 0.015]} />
          <meshBasicMaterial color={aqua} />
        </mesh>
      </group>

      {/* Interlocking Gear 1 */}
      <group ref={gear1} position={[-0.28, 0.12, 0.02]}>
        <mesh>
          <cylinderGeometry args={[0.26, 0.26, 0.03, 16]} />
          <meshBasicMaterial color={violet} wireframe transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Interlocking Gear 2 (Counter-rotating) */}
      <group ref={gear2} position={[0.24, -0.22, 0.02]}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.22, 0.03, 14]} />
          <meshBasicMaterial color={aqua} wireframe transparent opacity={0.65} />
        </mesh>
      </group>

      {/* Center Segmented Time Crystal */}
      <mesh position={[0, 0, 0.06]}>
        <octahedronGeometry args={[0.14, 0]} />
        <meshStandardMaterial color={aqua} emissive={aqua} emissiveIntensity={1.0} />
      </mesh>
    </group>
  );
}

function ProjectVisualSwitcher({ index }: { index: number }) {
  if (index === 0) return <VisualAIIncident />;
  if (index === 1) return <VisualSolisIQ />;
  if (index === 2) return <VisualInstanews />;
  return <VisualZeroHour />;
}

// ----------------------------------------------------------------------------------
// LAYER 06: PHYSICAL PROJECT ARTIFACTS (NON-FACING 3D COMPOSITION)
// ----------------------------------------------------------------------------------
function PhysicalProjectArtifacts() {
  const coords = vConfig.projects.coords;
  const labelTextures = useMemo(
    () =>
      projectsData.map((project, index) =>
        makeArtifactLabel(project.name, index, project.category)
      ),
    []
  );

  useEffect(() => () => labelTextures.forEach((t) => t.dispose()), [labelTextures]);

  return (
    <group>
      {projectsData.map((project, index) => {
        const coord = coords[index];
        return (
          <PhysicalArtifactSingle
            key={project.id}
            project={project}
            index={index}
            coord={coord}
            texture={labelTextures[index]}
          />
        );
      })}
    </group>
  );
}

function PhysicalArtifactSingle({
  index,
  coord,
  texture,
}: {
  project: (typeof projectsData)[0];
  index: number;
  coord: (typeof vConfig.projects.coords)[0];
  texture: THREE.CanvasTexture;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const visualMountRef = useRef<THREE.Group>(null);
  const { slabWidth, slabHeight, slabDepth, inspectScale } = vConfig.projects;

  const aquaColor = useAuroraColor('--accent-aqua');
  const surfaceColor = useAuroraColor('--surface');

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    const safeDelta = Math.min(delta, 0.05);
    const timeline = getTimelineState(experienceState.scrollProgress);
    const visibility = timeline.projectVisibilities[index] || 0;
    const isActive = timeline.activeProjectIndex === index || experienceState.activeProject === index;

    // Dynamic 3D Composition: Projects sit at natural angles (front vs side),
    // then gracefully ease forward when actively inspected
    const baseRotY = coord.rotY;
    const baseRotX = coord.rotX;
    const targetRotY = isActive ? baseRotY * 0.25 + experienceState.pointerX * 0.12 : baseRotY;
    const targetRotX = isActive ? baseRotX * 0.25 - experienceState.pointerY * 0.1 : baseRotX;
    const targetScale = coord.scale * (0.6 + visibility * 0.75);

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3.8, safeDelta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 3.8, safeDelta);
    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4.0, safeDelta)
    );

    // Subtle physical float
    groupRef.current.position.y = coord.y + Math.sin(clock.elapsedTime * 0.65 + index) * 0.06;

    // Visual mount expands and rotates slightly
    if (visualMountRef.current) {
      visualMountRef.current.scale.setScalar(isActive ? 1.35 : 1.0);
    }
  });

  return (
    <group ref={groupRef} position={[coord.x, coord.y, coord.z]}>
      {/* Physical Glass Housing Slab */}
      <RoundedBox args={[slabWidth, slabHeight, slabDepth]} radius={0.09} smoothness={2}>
        <meshPhysicalMaterial
          color={surfaceColor}
          roughness={0.2}
          metalness={0.15}
          transmission={0.65}
          thickness={0.5}
          transparent
          opacity={0.88}
        />
      </RoundedBox>

      {/* Front HUD Label Overlay */}
      <mesh position={[0, 0, slabDepth * 0.5 + 0.005]}>
        <planeGeometry args={[slabWidth * 0.94, slabHeight * 0.94]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>

      {/* Tech Glowing Rim Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[slabWidth * 1.015, slabHeight * 1.015, slabDepth * 1.08]} />
        <meshBasicMaterial color={aquaColor} wireframe transparent opacity={0.32} />
      </mesh>

      {/* HERO BESPOKE 3D VISUAL (Mounted on the Slab) */}
      <group
        ref={visualMountRef}
        position={[coord.side === 'left' ? 1.05 : -1.05, 0.45, 0.15]}
      >
        <ProjectVisualSwitcher index={index} />
      </group>
    </group>
  );
}

// ----------------------------------------------------------------------------------
// LAYER 08: CURSOR INTERACTION POINT LIGHT
// ----------------------------------------------------------------------------------
function CursorInteractionLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const aqua = useAuroraColor('--accent-aqua');

  useFrame(() => {
    if (!lightRef.current) return;
    const px = experienceState.pointerX * 5.5;
    const py = experienceState.pointerY * 3.8;
    const pz = vConfig.camera.initialZ - experienceState.scrollProgress * vConfig.camera.travelZ - 3.5;
    lightRef.current.position.set(px, py, pz);
  });

  return (
    <pointLight
      ref={lightRef}
      color={aqua}
      intensity={vConfig.depthLayers.layer08_cursorLight.intensity}
      distance={vConfig.depthLayers.layer08_cursorLight.distance}
    />
  );
}

// ----------------------------------------------------------------------------------
// HERO 360° PORTRAIT GLASS RING
// ----------------------------------------------------------------------------------
function HeroPortraitRing() {
  const ringRef = useRef<THREE.Group>(null);
  const aqua = useAuroraColor('--accent-aqua');
  const violet = useAuroraColor('--accent-violet');
  const [photoTexture, setPhotoTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/src/assets/images/profile.webp', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setPhotoTexture(tex);
    });
  }, []);

  useFrame(({ clock }, delta) => {
    if (!ringRef.current) return;
    const safeDelta = Math.min(delta, 0.05);
    const time = clock.elapsedTime;

    // React to drag rotation stored in experienceState
    ringRef.current.rotation.y = THREE.MathUtils.damp(
      ringRef.current.rotation.y,
      experienceState.heroRotationY,
      4,
      safeDelta
    );
    ringRef.current.rotation.x = THREE.MathUtils.damp(
      ringRef.current.rotation.x,
      experienceState.heroRotationX,
      4,
      safeDelta
    );

    // Subtle idle float
    ringRef.current.position.y = Math.sin(time * vConfig.hero.idleSwaySpeed) * vConfig.hero.idleSwayAmp;

    // Close-Pass 1: As camera descends through ring portal (p: 0.05 -> 0.15),
    // expand ring geometry like an iris aperture allowing camera to pass through center
    const p = experienceState.scrollProgress;
    const portalDilation = p < 0.22 ? THREE.MathUtils.smoothstep(p, 0.05, 0.15) * 2.2 : 0;
    const targetScale = 1.0 + portalDilation;
    const currentScale = THREE.MathUtils.damp(ringRef.current.scale.x, targetScale, 4.0, safeDelta);
    ringRef.current.scale.setScalar(currentScale);
  });

  return (
    <group ref={ringRef} position={[0, 0, 0]}>
      {/* Outer Luminous Ring Torus */}
      <mesh>
        <torusGeometry args={[vConfig.hero.ringRadius, 0.08, 16, 64]} />
        <meshPhysicalMaterial
          color={violet}
          emissive={aqua}
          emissiveIntensity={0.65}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Untouched Real Portrait Card centered inside Ring */}
      {photoTexture && (
        <mesh position={[0, 0, 0]}>
          <circleGeometry args={[1.58, 48]} />
          <meshBasicMaterial map={photoTexture} toneMapped={false} />
        </mesh>
      )}

      {/* Glass Rim Shield */}
      <mesh position={[0, 0, 0.02]}>
        <ringGeometry args={[1.56, 1.74, 48]} />
        <meshBasicMaterial color={aqua} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// ----------------------------------------------------------------------------------
// LAB HONEYCOMB & SKILL CONSTELLATION
// ----------------------------------------------------------------------------------
function LabHoneycombFloor() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const count = 30;
  const geometry = useMemo(() => new THREE.CylinderGeometry(0.72, 0.72, 0.02, 6, 1, true), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(cssColor('--accent-aqua')),
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      }),
    []
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!mesh.current) return;
    let idx = 0;
    for (let r = -2; r <= 3; r++) {
      for (let c = -2; c <= 2; c++) {
        if (idx >= count) break;
        dummy.position.set(c * 1.25 + (r % 2) * 0.62, -1.8, r * 1.08);
        dummy.updateMatrix();
        mesh.current.setMatrixAt(idx, dummy.matrix);
        idx++;
      }
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  return <instancedMesh ref={mesh} args={[geometry, material, count]} />;
}

function LabSkillsConstellation() {
  const count = skillsCategories.reduce((total, cat) => total + cat.skills.length, 0);
  const [activeSkill, setActiveSkill] = useState('');
  const aqua = useAuroraColor('--accent-aqua');
  const violet = useAuroraColor('--accent-violet');

  useEffect(() => {
    const update = (e: Event) => setActiveSkill((e as CustomEvent<string>).detail);
    window.addEventListener('aurora-skill-change', update);
    return () => window.removeEventListener('aurora-skill-change', update);
  }, []);

  const beamGeometry = useMemo(() => {
    const positions = new Float32Array(count * 6);
    let index = 0;
    for (const category of skillsCategories) {
      for (let s = 0; s < category.skills.length; s++) {
        const angle = (index / count) * Math.PI * 2;
        const radius = 1.7 + (index % 3) * 0.28;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.62;
        const z = Math.sin(angle * 2) * 0.35;
        positions.set([0, 0, 0, x, y, z], index * 6);
        index++;
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [count]);

  return (
    <group>
      <LabHoneycombFloor />
      <lineSegments geometry={beamGeometry}>
        <lineBasicMaterial
          color={activeSkill ? aqua : violet}
          transparent
          opacity={activeSkill ? 0.8 : 0.32}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// ----------------------------------------------------------------------------------
// CALM SCENES: ABOUT & CONTACT
// ----------------------------------------------------------------------------------
function CalmSceneVisuals() {
  const aboutRef = useRef<THREE.Group>(null);
  const contactRef = useRef<THREE.Group>(null);
  const aqua = useAuroraColor('--accent-aqua');
  const magenta = useAuroraColor('--accent-magenta');

  const linePoints = useMemo(
    () => [
      new THREE.Vector3(-2.4, -0.8, 0),
      new THREE.Vector3(-1.2, -0.2, 0),
      new THREE.Vector3(0, 0.4, 0),
      new THREE.Vector3(1.2, 0.8, 0),
      new THREE.Vector3(2.4, 1.2, 0),
    ],
    []
  );
  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(linePoints), [linePoints]);

  useFrame((_, delta) => {
    const safeDelta = Math.min(delta, 0.05);
    const travel = vConfig.camera.travelZ;
    if (aboutRef.current) {
      aboutRef.current.position.z = THREE.MathUtils.damp(
        aboutRef.current.position.z,
        -travel * experienceState.roomProgress.about,
        4,
        safeDelta
      );
    }
    if (contactRef.current) {
      contactRef.current.position.z = THREE.MathUtils.damp(
        contactRef.current.position.z,
        -travel * experienceState.roomProgress.contact,
        4,
        safeDelta
      );
      contactRef.current.rotation.z += 0.002;
    }
  });

  return (
    <>
      <group ref={aboutRef}>
        <line geometry={lineGeometry}>
          <lineBasicMaterial color={aqua} transparent opacity={0.55} />
        </line>
        {linePoints.map((pt, i) => (
          <mesh key={i} position={[pt.x, pt.y, 0]}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshBasicMaterial color={i % 2 === 0 ? aqua : magenta} />
          </mesh>
        ))}
      </group>

      <group ref={contactRef}>
        <mesh rotation={[0.45, 0, 0]}>
          <torusGeometry args={[2.1, 0.025, 10, 64]} />
          <meshBasicMaterial color={magenta} transparent opacity={0.75} />
        </mesh>
        <mesh rotation={[0.45, 0.65, 0]}>
          <torusGeometry args={[1.65, 0.012, 8, 64]} />
          <meshBasicMaterial color={aqua} transparent opacity={0.65} />
        </mesh>
        <pointLight color={magenta} intensity={0.75} distance={14} />
      </group>
    </>
  );
}

// ----------------------------------------------------------------------------------
// CINEMATIC CAMERA RIG (DYNAMIC FOV & CHOREOGRAPHY)
// ----------------------------------------------------------------------------------
function CameraRig() {
  const camera = useThree((state) => state.camera as THREE.PerspectiveCamera);
  const lastProgress = useRef(experienceState.scrollProgress);
  const currentRoll = useRef(0);

  useFrame(({ clock }, delta) => {
    const safeDelta = Math.min(delta, 0.05);
    const p = experienceState.scrollProgress;
    const velocity = (p - lastProgress.current) / safeDelta;
    lastProgress.current = p;

    const timeline = getTimelineState(p, velocity);
    const dive = experienceState.detailZoom * vConfig.camera.diveDuration * 3.5;

    // Camera 3D spline position interpolation
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      timeline.cameraPos.x + experienceState.pointerX * 0.18,
      vConfig.camera.damping,
      safeDelta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      timeline.cameraPos.y - experienceState.pointerY * 0.14 + Math.sin(clock.elapsedTime * 0.38) * 0.035,
      vConfig.camera.damping,
      safeDelta
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      timeline.cameraPos.z - dive,
      vConfig.camera.damping,
      safeDelta
    );

    // Dynamic Camera Roll (Banking subtly into curved trajectory)
    currentRoll.current = THREE.MathUtils.damp(
      currentRoll.current,
      timeline.cameraRoll,
      3.5,
      safeDelta
    );
    camera.up.set(Math.sin(-currentRoll.current), Math.cos(currentRoll.current), 0);

    // Look at choreographed focus target along the cinematic spline
    camera.lookAt(
      timeline.cameraTarget.x,
      timeline.cameraTarget.y,
      timeline.cameraTarget.z
    );

    // Dynamic FOV: Base Hermite + Velocity warp
    camera.fov = THREE.MathUtils.damp(camera.fov, timeline.cameraFov, 3.5, safeDelta);
    camera.updateProjectionMatrix();

    experienceState.activeProject = timeline.activeProjectIndex;
  });

  return null;
}

// ----------------------------------------------------------------------------------
// COMPLETE WORLD SCENE COMPOSITION
// ----------------------------------------------------------------------------------
function WorldScene({ quality }: { quality: Quality }) {
  useTheme();

  useEffect(() => {
    document.documentElement.classList.add('webgl-world-ready');
    return () => document.documentElement.classList.remove('webgl-world-ready');
  }, []);

  return (
    <>
      <StorytellingEnvironment />
      <CameraRig />
      <CursorInteractionLight />

      {/* Layer 02: Purposeful Particles (Cosmic Dust + Energy Stream) */}
      <PurposefulParticleField quality={quality} />

      {/* Layer 03: Distant Megastructures & Colossal 3D Numbers */}
      <EnvironmentalMegastructures />

      {/* Hero 360° Glass Ring */}
      <group
        position={[
          typeof window !== 'undefined' && window.innerWidth > 1024 ? 2.6 : 0,
          typeof window !== 'undefined' && window.innerWidth > 1024 ? 0.2 : -0.6,
          0,
        ]}
      >
        <HeroPortraitRing />
      </group>

      {/* Layer 04: The Living Architectural Spine */}
      <LivingArchitecturalSpine />

      {/* Layer 05 & 06: Physical Project Artifacts with Bespoke 3D Worlds */}
      <PhysicalProjectArtifacts />

      {/* The Lab (Skills Constellation) */}
      <group position={[0, 0, -vConfig.camera.travelZ * 0.48]}>
        <LabSkillsConstellation />
      </group>

      {/* Calm Scenes (About Timeline & Contact Convergence) */}
      <CalmSceneVisuals />

      {/* Postprocessing Bloom on High-tier Desktop Only */}
      {quality === 'high' && window.innerWidth > vConfig.quality.mobileBreakpoint && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.45} luminanceThreshold={1.12} mipmapBlur />
          <Vignette eskil={false} offset={0.12} darkness={0.25} />
        </EffectComposer>
      )}
    </>
  );
}

// ----------------------------------------------------------------------------------
// SCROLL DRIVER & MAIN EXPORT
// ----------------------------------------------------------------------------------
function ScrollDriver() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
      lenis = new Lenis({
        duration: vConfig.motion.scrollDuration,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
      });
      setSmoothScroll((id) =>
        lenis?.scrollTo(`#${id}`, { offset: -16, duration: vConfig.motion.scrollDuration })
      );
    }

    const measure = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const markerIds = ['home', 'projects', 'skills', 'about', 'contact'] as const;
      for (const id of markerIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        const center = element.offsetTop + (element.offsetHeight - window.innerHeight) * 0.5;
        experienceState.roomProgress[id] = clamp01(center / maxScroll);
      }
      experienceState.scrollProgress = clamp01(window.scrollY / maxScroll);
    };

    const onScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      experienceState.scrollProgress = clamp01(window.scrollY / maxScroll);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('load', measure, { once: true });

    const tick = (time: number) => {
      if (document.hidden) return;
      lenis?.raf(time * 1000);
      advance(time * 1000, true);
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      setSmoothScroll(null);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, []);

  return null;
}

export default function ExperienceCanvas() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const device = navigator as Navigator & { deviceMemory?: number };
  const veryWeak = (navigator.hardwareConcurrency || 8) <= 2 || (device.deviceMemory || 8) <= 2;
  const [quality, setQuality] = useState<Quality>(initialQuality);
  const [failed, setFailed] = useState(false);
  const lowFpsSample = useRef({ start: 0, frames: 0, lastReduction: 0 });

  // Adaptive Quality Monitor: Steps down if FPS drops below threshold
  useEffect(() => {
    if (reducedMotion || veryWeak) return;
    lowFpsSample.current.start = performance.now();

    const tick = () => {
      const sample = lowFpsSample.current;
      if (document.hidden) {
        sample.frames = 0;
        sample.start = performance.now();
        return;
      }
      sample.frames += 1;
      const now = performance.now();
      if (now - sample.start < 1800) return;
      const fps = (sample.frames * 1000) / (now - sample.start);
      sample.frames = 0;
      sample.start = now;

      if (fps < vConfig.quality.fpsThresholdDown && now - sample.lastReduction > 4500) {
        sample.lastReduction = now;
        setQuality((curr) => (curr === 'high' ? 'medium' : 'low'));
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [reducedMotion, veryWeak]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= vConfig.quality.mobileBreakpoint) setQuality('low');
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (reducedMotion || veryWeak || failed || !('WebGLRenderingContext' in window)) return null;

  const dpr = vConfig.quality[quality].maxDpr;

  return (
    <div className="experience-canvas" aria-hidden="true">
      <ScrollDriver />
      <Canvas
        frameloop="never"
        dpr={dpr}
        camera={{
          position: [0, 0, vConfig.camera.initialZ],
          fov: vConfig.camera.baseFov,
          near: 0.1,
          far: 140,
        }}
        gl={{ alpha: false, antialias: quality === 'high', powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            'webglcontextlost',
            (e) => {
              e.preventDefault();
              document.documentElement.classList.remove('webgl-world-ready');
              setFailed(true);
            },
            { once: true }
          );
        }}
      >
        <React.Suspense fallback={null}>
          <WorldScene quality={quality} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
