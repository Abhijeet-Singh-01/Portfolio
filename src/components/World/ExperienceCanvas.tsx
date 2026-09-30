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

type Quality = 'high' | 'medium' | 'low';
const PARTICLE_COUNTS: Record<Quality, number> = {
  high: vConfig.particles.counts.high,
  medium: vConfig.particles.counts.medium,
  low: vConfig.particles.counts.low,
};

const cssColor = (token: string) =>
  typeof document !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(token).trim()
    : '#7C6CFF';
const color = (token: string) => new THREE.Color(cssColor(token));

function useAuroraColor(token: string) {
  const value = cssColor(token);
  return useMemo(() => new THREE.Color(value), [value]);
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

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

function makePortalLabel(name: string, index: number, theme: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = theme === 'night' ? 0.76 : 0.82;
  ctx.fillStyle = cssColor('--surface');
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;
  ctx.fillStyle = cssColor('--accent-aqua');
  ctx.font = '700 20px monospace';
  ctx.fillText(`PROJECT // 0${index + 1}`, 36, 56);
  ctx.fillStyle = cssColor('--text');
  ctx.font = '800 32px sans-serif';
  const words = name.toUpperCase().split(' ');
  let line = '';
  let y = 120;
  for (const word of words) {
    const trial = line ? `${line} ${word}` : word;
    if (ctx.measureText(trial).width > 440 && line) {
      ctx.fillText(line, 36, y);
      line = word;
      y += 44;
    } else line = trial;
  }
  ctx.fillText(line, 36, y);
  ctx.fillStyle = cssColor('--text-2');
  ctx.font = '14px monospace';
  ctx.fillText('CLICK TO EXPLORE EVIDENCE', 36, 280);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

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
 * 1. MULTI-LAYER GPU PARTICLES
 * GPU-accelerated points that drift with organic Brownian flow and illuminate surrounding scenes.
 */
function ParticleField({ quality }: { quality: Quality }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();
  const maxCount = vConfig.particles.counts.high;
  const geometry = useMemo(() => {
    const positions = new Float32Array(maxCount * 3);
    for (let index = 0; index < maxCount; index += 1) {
      const angle = index * 2.399963229728653;
      const layer = index % 97;
      const radius = 0.8 + (index % 47) * 0.12;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = Math.sin(angle * 0.73) * (0.5 + (layer % 31) * 0.08);
      positions[index * 3 + 2] = -((index * 0.61803398875) % vConfig.camera.travelZ);
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return result;
  }, [maxCount]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), vConfig.quality.high.maxDpr) },
      uIndigo: { value: color('--accent-indigo') },
      uAqua: { value: color('--accent-aqua') },
      uSize: { value: vConfig.particles.baseSize },
      uGlow: { value: vConfig.particles.glowMultiplier },
    }),
    [gl]
  );

  useEffect(() => {
    geometry.setDrawRange(0, PARTICLE_COUNTS[quality]);
  }, [geometry, quality]);

  useEffect(() => {
    const updateTheme = () => {
      uniforms.uIndigo.value.copy(color('--accent-indigo'));
      uniforms.uAqua.value.copy(color('--accent-aqua'));
    };
    window.addEventListener('aurora-theme-change', updateTheme);
    return () => window.removeEventListener('aurora-theme-change', updateTheme);
  }, [uniforms]);

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
          varying float vGlow;
          void main() {
            vec3 p = position;
            float phase = uTime + position.z * 0.032;
            p.x += sin(phase + position.y * 0.25) * 0.18 + uPointer.x * 0.14;
            p.y += cos(phase * 0.75 + position.x * 0.2) * 0.14 - uPointer.y * 0.12;
            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = clamp(uSize * uPixelRatio * (115.0 / max(1.0, -mvPosition.z)), 1.0, 5.5);
            vGlow = 0.4 + 0.6 * abs(sin(phase * 0.68 + position.x));
          }
        `}
        fragmentShader={`
          uniform vec3 uIndigo;
          uniform vec3 uAqua;
          uniform float uGlow;
          varying float vGlow;
          void main() {
            vec2 point = gl_PointCoord - vec2(0.5);
            float radius = length(point);
            float alpha = smoothstep(0.5, 0.02, radius) * vGlow * 0.55;
            vec3 tint = mix(uIndigo, uAqua, smoothstep(0.0, 1.0, gl_FragCoord.y / 900.0));
            gl_FragColor = vec4(tint * (0.8 + uGlow * 0.45), alpha);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * 2. THE 3D PROJECT BACKBONE (The Master Signature Metaphor)
 * A luminous double-helix spine running through the projects depth with instanced crystal nodes,
 * connecting ribs, traveling energy pulses, and umbilical tendrils reaching out to floating project slabs.
 */
function ProjectBackbone() {
  useTheme();
  const spineGroup = useRef<THREE.Group>(null);
  const nodesMesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const aquaColor = useAuroraColor('--accent-aqua');
  const limeColor = useAuroraColor('--accent-lime');
  const indigoColor = useAuroraColor('--accent-indigo');

  const { nodesPerStrand, radius, height, strutsCount } = vConfig.backbone;
  const totalNodes = nodesPerStrand * 2;

  // Node Positions along Strand A and Strand B
  const nodeData = useMemo(() => {
    const data: { x: number; y: number; z: number; strand: number; t: number }[] = [];
    const zStart = -10.0;
    const zStep = height / nodesPerStrand;

    for (let i = 0; i < nodesPerStrand; i++) {
      const t = i / nodesPerStrand;
      const angle = t * Math.PI * 8; // 4 full helix turns
      const z = zStart - i * zStep;

      // Strand A
      data.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.7,
        z,
        strand: 0,
        t,
      });

      // Strand B (Opposite Phase, PI offset)
      data.push({
        x: Math.cos(angle + Math.PI) * radius,
        y: Math.sin(angle + Math.PI) * radius * 0.7,
        z,
        strand: 1,
        t,
      });
    }
    return data;
  }, [height, nodesPerStrand, radius]);

  // Rib Strut Connections between Strand A and Strand B
  const strutGeometry = useMemo(() => {
    const positions = new Float32Array(strutsCount * 6);
    const zStart = -10.0;
    const zStep = height / strutsCount;

    for (let i = 0; i < strutsCount; i++) {
      const t = i / strutsCount;
      const angle = t * Math.PI * 8;
      const z = zStart - i * zStep;

      const ax = Math.cos(angle) * radius;
      const ay = Math.sin(angle) * radius * 0.7;
      const bx = Math.cos(angle + Math.PI) * radius;
      const by = Math.sin(angle + Math.PI) * radius * 0.7;

      positions.set([ax, ay, z, bx, by, z], i * 6);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [height, radius, strutsCount]);

  // Umbilical Energy Tendrils connecting Backbone Nodes to Project Slabs
  const tendrilGeometry = useMemo(() => {
    const positions: number[] = [];
    const coords = vConfig.projects.coords;

    coords.forEach((coord) => {
      // Find closest backbone node along Z
      const targetZ = coord.z;
      const closest = nodeData.reduce((prev, curr) =>
        Math.abs(curr.z - targetZ) < Math.abs(prev.z - targetZ) ? curr : prev
      );

      // Create a 3-segment energy line from backbone to project slab
      const midX = (closest.x + coord.x) * 0.5 + (coord.side === 'left' ? -0.4 : 0.4);
      const midY = (closest.y + coord.y) * 0.5 + 0.3;
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
        emissive: limeColor,
        emissiveIntensity: 0.65,
        roughness: 0.2,
        metalness: 0.8,
      }),
    [aquaColor, limeColor]
  );

  const strutMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: aquaColor,
        transparent: true,
        opacity: 0.38,
        depthWrite: false,
      }),
    [aquaColor]
  );

  const tendrilMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: limeColor,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
      }),
    [limeColor]
  );

  useFrame(({ clock }) => {
    if (!nodesMesh.current || !spineGroup.current) return;
    const time = clock.elapsedTime;
    const scrollZ = experienceState.scrollProgress * vConfig.camera.travelZ;

    // Subtle axial breathing and rotation
    spineGroup.current.rotation.z = Math.sin(time * 0.15) * 0.08;
    spineGroup.current.position.x = Math.sin(time * 0.25) * 0.06;

    // Traveling energy wave pulse along nodes
    for (let i = 0; i < totalNodes; i++) {
      const d = nodeData[i];
      // Wave traveling along Z
      const wave = Math.sin(d.z * vConfig.backbone.pulseFrequency + time * vConfig.backbone.pulseSpeed);
      const isNearProject = Math.abs(-d.z - scrollZ) < 6.0;
      const scale = (0.75 + wave * 0.35 + (isNearProject ? 0.6 : 0)) * (d.strand === 0 ? 1 : 0.9);

      dummy.position.set(d.x, d.y, d.z);
      dummy.scale.setScalar(scale);
      dummy.rotation.set(time * 0.4 + i, time * 0.3, i);
      dummy.updateMatrix();
      nodesMesh.current.setMatrixAt(i, dummy.matrix);

      // Color tint modulation (Aqua to Lime pulse)
      const pulseColor = isNearProject ? limeColor : wave > 0.4 ? aquaColor : indigoColor;
      nodesMesh.current.setColorAt(i, pulseColor);
    }

    nodesMesh.current.instanceMatrix.needsUpdate = true;
    if (nodesMesh.current.instanceColor) nodesMesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <group ref={spineGroup}>
      {/* Dual Helix Instanced Nodes */}
      <instancedMesh ref={nodesMesh} args={[nodeGeometry, nodeMaterial, totalNodes]} />

      {/* Cross-connecting Strut Ribs */}
      <lineSegments geometry={strutGeometry} material={strutMaterial} />

      {/* Umbilical Tendril Cables to Project Slabs */}
      <lineSegments geometry={tendrilGeometry} material={tendrilMaterial} />

      {/* Traveling Core Glow Light */}
      <pointLight position={[0, 0, -28]} color={aquaColor} intensity={0.9} distance={18} />
    </group>
  );
}

/**
 * 3. PROJECT PROCEDURAL 3D VISUALS (One Signature Identity per Project)
 */

// Project 01: AI Incident Intelligence (Neural graph with anomaly pulse & evidence links)
function VisualAIIncident() {
  const group = useRef<THREE.Group>(null);
  const aqua = useAuroraColor('--accent-aqua');
  const magenta = useAuroraColor('--accent-magenta');
  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.elapsedTime;
    group.current.rotation.y = time * 0.2;
    group.current.rotation.x = Math.sin(time * 0.3) * 0.1;
  });
  return (
    <group ref={group} position={[0, 0, 0.08]}>
      {/* Central Anomaly Core Node */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color={magenta} emissive={magenta} emissiveIntensity={0.8} />
      </mesh>
      {/* Evidence Graph Satellite Nodes */}
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        const r = 0.55;
        return (
          <group key={i} position={[Math.cos(a) * r, Math.sin(a) * r * 0.7, Math.sin(a * 2) * 0.2]}>
            <mesh>
              <octahedronGeometry args={[0.07, 0]} />
              <meshBasicMaterial color={aqua} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Project 02: SolisIQ (Solar orbital disc, radiant energy arcs, and capacity gauges)
function VisualSolisIQ() {
  const ringRef = useRef<THREE.Group>(null);
  const lime = useAuroraColor('--accent-lime');
  const aqua = useAuroraColor('--accent-aqua');
  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = clock.elapsedTime * 0.35;
    ringRef.current.rotation.x = 0.35 + Math.sin(clock.elapsedTime * 0.5) * 0.1;
  });
  return (
    <group ref={ringRef} position={[0, 0, 0.08]}>
      <mesh>
        <torusGeometry args={[0.42, 0.02, 12, 48]} />
        <meshBasicMaterial color={lime} />
      </mesh>
      <mesh rotation={[Math.PI * 0.5, 0, 0]}>
        <torusGeometry args={[0.58, 0.012, 8, 48]} />
        <meshBasicMaterial color={aqua} transparent opacity={0.65} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={lime} emissive={lime} emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

// Project 03: Instanews (Cascading data feed layers and news stream scanlines)
function VisualInstanews() {
  const group = useRef<THREE.Group>(null);
  const indigo = useAuroraColor('--accent-indigo');
  const aqua = useAuroraColor('--accent-aqua');
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.05;
  });
  return (
    <group ref={group} position={[0, 0, 0.08]}>
      {[0, 1, 2].map((layer) => (
        <mesh key={layer} position={[-layer * 0.12, layer * 0.12, layer * 0.03]} rotation={[0, 0, -0.08]}>
          <planeGeometry args={[0.62, 0.42]} />
          <meshBasicMaterial color={layer === 0 ? aqua : indigo} transparent opacity={0.25 + layer * 0.18} />
        </mesh>
      ))}
    </group>
  );
}

// Project 04: ZeroHour (Concentric mechanical countdown rings with seconds pulse node)
function VisualZeroHour() {
  const group = useRef<THREE.Group>(null);
  const ticker = useRef<THREE.Mesh>(null);
  const aqua = useAuroraColor('--accent-aqua');
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.z = -clock.elapsedTime * 0.25;
    if (ticker.current) {
      const a = clock.elapsedTime * 2.5;
      ticker.current.position.set(Math.cos(a) * 0.45, Math.sin(a) * 0.45, 0);
    }
  });
  return (
    <group ref={group} position={[0, 0, 0.08]}>
      <mesh>
        <torusGeometry args={[0.45, 0.016, 8, 64]} />
        <meshBasicMaterial color={aqua} />
      </mesh>
      <mesh ref={ticker}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshBasicMaterial color={aqua} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.12, 16]} />
        <meshBasicMaterial color={aqua} transparent opacity={0.4} />
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

/**
 * 4. FLOATING 3D PROJECT SLABS
 * Glass slabs arranged in depth along the curved backbone trajectory with hover tilt,
 * shader reveal, dynamic labels, and camera dive transitions.
 */
function ProjectSlabs() {
  const theme = useTheme();
  const coords = vConfig.projects.coords;
  const labelTextures = useMemo(
    () => projectsData.map((project, index) => makePortalLabel(project.name, index, theme)),
    [theme]
  );

  useEffect(() => () => labelTextures.forEach((texture) => texture.dispose()), [labelTextures]);

  return (
    <group>
      {projectsData.map((project, index) => {
        const coord = coords[index];
        return (
          <ProjectSingleSlab
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

function ProjectSingleSlab({
  index,
  coord,
  texture,
}: {
  project: (typeof projectsData)[0];
  index: number;
  coord: (typeof vConfig.projects.coords)[0];
  texture: THREE.CanvasTexture;
}) {
  const slabRef = useRef<THREE.Group>(null);
  const { slabWidth, slabHeight, slabDepth } = vConfig.projects;
  const aquaColor = useAuroraColor('--accent-aqua');
  const surfaceColor = useAuroraColor('--surface');

  useFrame(({ clock }, delta) => {
    if (!slabRef.current) return;
    const safeDelta = Math.min(delta, 0.05);
    const cameraZ = vConfig.camera.initialZ - experienceState.scrollProgress * vConfig.camera.travelZ;
    const distToCamera = Math.abs(coord.z - cameraZ);
    const isNearby = distToCamera < 10.0;

    // Settle toward front face when approaching
    const targetRotY = isNearby
      ? (coord.side === 'left' ? 0.08 : -0.08) + experienceState.pointerX * 0.08
      : (coord.side === 'left' ? 0.22 : -0.22);
    const targetRotX = isNearby ? -experienceState.pointerY * 0.08 : 0;

    slabRef.current.rotation.y = THREE.MathUtils.damp(slabRef.current.rotation.y, targetRotY, 4, safeDelta);
    slabRef.current.rotation.x = THREE.MathUtils.damp(slabRef.current.rotation.x, targetRotX, 4, safeDelta);

    // Subtle floating breathing
    slabRef.current.position.y = coord.y + Math.sin(clock.elapsedTime * 0.7 + index) * 0.04;
  });

  return (
    <group ref={slabRef} position={[coord.x, coord.y, coord.z]}>
      {/* Physical Rounded Glass Slab */}
      <RoundedBox args={[slabWidth, slabHeight, slabDepth]} radius={0.08} smoothness={2}>
        <meshPhysicalMaterial
          color={surfaceColor}
          roughness={0.25}
          metalness={0.12}
          clearcoat={0.6}
          transparent
          opacity={0.84}
        />
      </RoundedBox>

      {/* Front Canvas Label Overlay */}
      <mesh position={[0, 0, slabDepth * 0.5 + 0.005]}>
        <planeGeometry args={[slabWidth * 0.94, slabHeight * 0.94]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>

      {/* Glowing Rim Wireframe */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[slabWidth * 1.01, slabHeight * 1.01, slabDepth * 1.05]} />
        <meshBasicMaterial color={aquaColor} wireframe transparent opacity={0.28} />
      </mesh>

      {/* Attached Procedural 3D Visual */}
      <group position={[coord.side === 'left' ? 0.75 : -0.75, 0.42, 0.05]}>
        <ProjectVisualSwitcher index={index} />
      </group>
    </group>
  );
}

/**
 * 5. THE LAB (SKILLS CONSTELLATION & HONEYCOMB FLOOR)
 */
function LabHoneycombFloor() {
  useTheme();
  const mesh = useRef<THREE.InstancedMesh>(null);
  const count = 25;
  const geometry = useMemo(() => new THREE.CylinderGeometry(0.68, 0.68, 0.018, 6, 1, true), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: color('--accent-aqua'),
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      }),
    []
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const aquaValue = cssColor('--accent-aqua');

  useEffect(() => {
    if (!mesh.current) return;
    let index = 0;
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        if (index >= count) break;
        dummy.position.set(c * 1.18 + (r % 2) * 0.59, -1.6, r * 1.02);
        dummy.updateMatrix();
        mesh.current.setMatrixAt(index, dummy.matrix);
        index++;
      }
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    material.color.set(aquaValue);
  }, [aquaValue, dummy, material]);

  return <instancedMesh ref={mesh} args={[geometry, material, count]} />;
}

function LabSkillsConstellation() {
  useTheme();
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
        const radius = 1.6 + (index % 3) * 0.25;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.6;
        const z = Math.sin(angle * 2) * 0.35;
        positions.set([0, 0, 0, x, y, z], index * 6);
        index++;
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [count]);

  const beamMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: activeSkill ? aqua : violet,
        transparent: true,
        opacity: activeSkill ? 0.75 : 0.35,
        depthWrite: false,
      }),
    [activeSkill, aqua, violet]
  );

  return (
    <group>
      <LabHoneycombFloor />
      <lineSegments geometry={beamGeometry} material={beamMaterial} />
    </group>
  );
}

/**
 * 6. CALM SCENES: ABOUT & CONTACT
 */
function CalmSceneVisuals() {
  const aboutRef = useRef<THREE.Group>(null);
  const contactRef = useRef<THREE.Group>(null);
  const aqua = useAuroraColor('--accent-aqua');
  const magenta = useAuroraColor('--accent-magenta');

  // Education Timeline 3D Line
  const linePoints = useMemo(
    () => [
      new THREE.Vector3(-2.2, -0.8, 0),
      new THREE.Vector3(-1.1, -0.2, 0),
      new THREE.Vector3(0, 0.35, 0),
      new THREE.Vector3(1.1, 0.75, 0),
      new THREE.Vector3(2.2, 1.15, 0),
    ],
    []
  );
  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(linePoints), [linePoints]);
  const lineMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ color: aqua, transparent: true, opacity: 0.5 }),
    [aqua]
  );

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
      {/* About Timeline Scene */}
      <group ref={aboutRef}>
        <line geometry={lineGeometry} material={lineMaterial} />
        {linePoints.map((pt, i) => (
          <mesh key={i} position={[pt.x, pt.y, 0]}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshBasicMaterial color={i % 2 === 0 ? aqua : magenta} />
          </mesh>
        ))}
      </group>

      {/* Contact Converging Ring Scene */}
      <group ref={contactRef}>
        <mesh rotation={[0.4, 0, 0]}>
          <torusGeometry args={[1.8, 0.025, 10, 64]} />
          <meshBasicMaterial color={magenta} transparent opacity={0.75} />
        </mesh>
        <mesh rotation={[0.4, 0.6, 0]}>
          <torusGeometry args={[1.45, 0.012, 8, 64]} />
          <meshBasicMaterial color={aqua} transparent opacity={0.6} />
        </mesh>
        <pointLight color={magenta} intensity={0.6} distance={12} />
      </group>
    </>
  );
}

/**
 * 7. CINEMATIC CAMERA SYSTEM
 * GSAP/frame damped interpolation along the spine with pointer parallax and breathing kinematics.
 */
function CameraRig() {
  const camera = useThree((state) => state.camera);

  useFrame(({ clock }, delta) => {
    const safeDelta = Math.min(delta, 0.05);
    const dive = experienceState.detailZoom * vConfig.camera.diveDuration;
    const targetZ =
      vConfig.camera.initialZ - vConfig.camera.travelZ * experienceState.scrollProgress - dive;

    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, vConfig.camera.damping, safeDelta);
    camera.position.y =
      Math.sin(clock.elapsedTime * vConfig.camera.breathingSpeed) * vConfig.camera.breathingAmp;

    camera.rotation.x = THREE.MathUtils.damp(
      camera.rotation.x,
      -experienceState.pointerY * vConfig.camera.mouseLookY,
      vConfig.camera.damping,
      safeDelta
    );
    camera.rotation.y = THREE.MathUtils.damp(
      camera.rotation.y,
      experienceState.pointerX * vConfig.camera.mouseLookX,
      vConfig.camera.damping,
      safeDelta
    );
  });

  return null;
}

/**
 * 8. WORLD SCENE COMPOSITION
 */
function WorldScene({ quality }: { quality: Quality }) {
  const theme = useTheme();
  const bg = useAuroraColor('--bg');
  const violet = useAuroraColor('--accent-violet');
  const aqua = useAuroraColor('--accent-aqua');

  useEffect(() => {
    document.documentElement.classList.add('webgl-world-ready');
    return () => document.documentElement.classList.remove('webgl-world-ready');
  }, []);

  return (
    <>
      <color attach="background" args={[bg]} />
      <fog attach="fog" args={[bg, 18, 85]} />
      <ambientLight intensity={theme === 'night' ? 0.9 : 0.75} />
      <directionalLight position={[-4, 7, 5]} color={violet} intensity={1.3} />
      <directionalLight position={[4, -4, -12]} color={aqua} intensity={0.65} />

      <CameraRig />
      <ParticleField quality={quality} />
      <ProjectBackbone />
      <ProjectSlabs />

      {/* Lab Skills Scene */}
      <group position={[0, 0, -vConfig.camera.travelZ * 0.48]}>
        <LabSkillsConstellation />
      </group>

      {/* Calm Scenes (About Timeline & Contact Convergence) */}
      <CalmSceneVisuals />

      {/* Postprocessing Bloom on High-tier Desktop Only */}
      {quality === 'high' && window.innerWidth > vConfig.quality.mobileBreakpoint && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.42} luminanceThreshold={1.15} mipmapBlur />
          <Vignette eskil={false} offset={0.12} darkness={0.22} />
        </EffectComposer>
      )}
    </>
  );
}

/**
 * 9. UNIFIED RENDER LOOP & SCROLL CONTROLLER
 * Lenis + GSAP + Three.js single RAF loop. Pauses completely when tab is hidden.
 */
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
      setSmoothScroll((id) => lenis?.scrollTo(`#${id}`, { offset: -16, duration: vConfig.motion.scrollDuration }));
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

/**
 * 10. MAIN EXPORT: ExperienceCanvas
 */
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
          fov: vConfig.camera.fov,
          near: 0.1,
          far: 120,
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
