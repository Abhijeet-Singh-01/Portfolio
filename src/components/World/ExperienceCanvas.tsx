import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, advance, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import { visualConfig as vConfig } from '../../config/visualConfig';
import { experienceState, setSmoothScroll } from '../../lib/experienceStore';
import { projectsData } from '../../data/projects';
import { skillsCategories } from '../../data/skills';
import { getTimelineState } from '../../config/sceneTimeline';

type Quality = 'high' | 'medium' | 'low';

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const cssColor = (token: string, fallback = '#7C6CFF') =>
  typeof document !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(token).trim() || fallback
    : fallback;

function useAuroraColor(token: string, fallback = '#7C6CFF') {
  const value = cssColor(token, fallback);
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

// ----------------------------------------------------------------------------------
// 1. STORYTELLING ENVIRONMENT & DYNAMIC LIGHTING
// ----------------------------------------------------------------------------------
function StorytellingEnvironment() {
  const { scene } = useThree();
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.PointLight>(null);

  const tempAmbient = useMemo(() => new THREE.Color(), []);
  const tempKey = useMemo(() => new THREE.Color(), []);
  const tempFill = useMemo(() => new THREE.Color(), []);
  const tempFog = useMemo(() => new THREE.Color(), []);

  useFrame((_, delta) => {
    const safeDelta = Math.min(delta, 0.05);
    const timeline = getTimelineState(experienceState.scrollProgress);

    tempAmbient.set(timeline.lighting.ambient);
    tempKey.set(timeline.lighting.key);
    tempFill.set(timeline.lighting.fill);
    tempFog.set(timeline.lighting.fog);

    if (ambientLightRef.current) {
      ambientLightRef.current.color.lerp(tempAmbient, safeDelta * 4);
    }
    if (keyLightRef.current) {
      keyLightRef.current.color.lerp(tempKey, safeDelta * 4);
    }
    if (fillLightRef.current) {
      fillLightRef.current.color.lerp(tempFill, safeDelta * 4);
    }
    if (scene.fog) {
      scene.fog.color.lerp(tempFog, safeDelta * 4);
    }
  });

  return (
    <>
      <color attach="background" args={[vConfig.lighting.default.fog]} />
      <fogExp2 attach="fog" args={[vConfig.lighting.default.fog, 0.016]} />
      <ambientLight ref={ambientLightRef} intensity={0.85} color={vConfig.lighting.default.ambient} />
      <directionalLight
        ref={keyLightRef}
        position={[8, 12, 14]}
        intensity={1.4}
        color={vConfig.lighting.default.key}
      />
      <pointLight
        ref={fillLightRef}
        position={[-8, -4, 6]}
        intensity={1.1}
        color={vConfig.lighting.default.fill}
        distance={45}
      />
    </>
  );
}

// ----------------------------------------------------------------------------------
// 2. PURPOSEFUL SUBTLE PARTICLES
// ----------------------------------------------------------------------------------
function PurposefulParticleField({ quality }: { quality: Quality }) {
  const pointsRef = useRef<THREE.Points>(null);
  const aqua = useAuroraColor('--accent-aqua', '#22D3EE');
  const count = vConfig.particles.counts[quality];

  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const rand1 = ((i * 9301 + 49297) % 233280) / 233280;
      const rand2 = ((i * 49297 + 9301) % 233280) / 233280;
      const rand3 = ((i * 12345 + 67891) % 233280) / 233280;
      pos[i * 3] = (rand1 - 0.5) * 36;
      pos[i * 3 + 1] = (rand2 - 0.5) * 22;
      pos[i * 3 + 2] = 12 - rand3 * 95;
      ph[i] = rand1 * Math.PI * 2;
    }
    return [pos, ph];
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const time = clock.elapsedTime * 0.2;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      arr[idx + 1] += Math.sin(time + phases[i]) * 0.003;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={aqua}
        size={vConfig.particles.baseSize}
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ----------------------------------------------------------------------------------
// 3. HERO 360° PORTRAIT GLASS LENS & PORTAL DILATION
// ----------------------------------------------------------------------------------
function HeroPortraitRing() {
  const ringRef = useRef<THREE.Group>(null);
  const aqua = useAuroraColor('--accent-aqua', '#22D3EE');
  const violet = useAuroraColor('--accent-violet', '#C084FC');
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
    const p = experienceState.scrollProgress;

    // React to drag rotation stored in experienceState with smooth return
    ringRef.current.rotation.y = THREE.MathUtils.damp(
      ringRef.current.rotation.y,
      experienceState.portraitRotationY,
      4,
      safeDelta
    );
    ringRef.current.rotation.x = THREE.MathUtils.damp(
      ringRef.current.rotation.x,
      experienceState.portraitRotationX,
      4,
      safeDelta
    );

    // Idle organic float
    ringRef.current.position.y = Math.sin(clock.elapsedTime * 0.75) * 0.06;

    // PORTAL DILATION: As camera approaches and dives at t=0.08 -> 0.16,
    // the ring dilates outwards to create an open portal corridor
    if (p >= 0.08 && p <= 0.18) {
      const openT = Math.min(1.0, (p - 0.08) / 0.08);
      const irisScale = 1.0 + openT * 2.8;
      ringRef.current.scale.set(irisScale, irisScale, 1.0);
    } else if (p > 0.18) {
      ringRef.current.scale.set(3.8, 3.8, 1.0);
    } else {
      ringRef.current.scale.set(1.0, 1.0, 1.0);
    }
  });

  return (
    <group ref={ringRef} position={[0, 0, 0]}>
      {/* Outer Luminous Torus Frame */}
      <mesh>
        <torusGeometry args={[vConfig.hero.ringRadius, 0.07, 24, 64]} />
        <meshStandardMaterial
          color={aqua}
          emissive={aqua}
          emissiveIntensity={0.65}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Secondary Counter-Rotating Orbital Rim */}
      <mesh rotation={[Math.PI * 0.25, 0, 0]}>
        <torusGeometry args={[vConfig.hero.ringRadius * 1.08, 0.02, 16, 48]} />
        <meshBasicMaterial color={violet} transparent opacity={0.45} />
      </mesh>

      {/* Untouched Photo Card in Circular Lens */}
      {photoTexture && (
        <mesh position={[0, 0, 0]}>
          <circleGeometry args={[vConfig.hero.ringRadius * 0.94, 48]} />
          <meshBasicMaterial map={photoTexture} toneMapped={false} />
        </mesh>
      )}

      {/* Frosted Glass Protective Bezel */}
      <mesh position={[0, 0, 0.04]}>
        <circleGeometry args={[vConfig.hero.ringRadius * 0.96, 48]} />
        <meshPhysicalMaterial
          color="#0A0620"
          roughness={0.12}
          transmission={0.7}
          thickness={0.2}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

// ----------------------------------------------------------------------------------
// 4. THE LIVING ARCHITECTURAL INFRASTRUCTURE SPINE (NOT A DNA HELIX)
// ----------------------------------------------------------------------------------
/**
 * Engineered Asymmetric Digital Spine:
 * - Single curved structural trunk that sweeps asymmetrically through 3D space
 * - Irregular architectural cross-rib brackets
 * - 3 twisting optical neural conduit cables
 * - Luminous junction node crystals
 * - Umbilical data tendrils directly connecting to the 4 projects
 * - Traveling energy pulses that bridge transitions
 */
function ArchitecturalInfrastructureSpine() {
  const spineGroup = useRef<THREE.Group>(null);
  const nodesMesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const aquaColor = useAuroraColor('--accent-aqua', '#22D3EE');
  const limeColor = useAuroraColor('--accent-lime', '#C6F432');
  const indigoColor = useAuroraColor('--accent-indigo', '#7C6CFF');

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  // Primary Spine Asymmetric 3D Spline Curve
  const spineSpline = useMemo(() => {
    // Desktop wide asymmetric sweep vs Mobile narrow vertical corridor
    const points = isMobile
      ? [
          new THREE.Vector3(0, 0, -2),
          new THREE.Vector3(0.2, -0.1, -8),
          new THREE.Vector3(-0.4, 0.2, -16.5),
          new THREE.Vector3(0.3, -0.2, -23.5),
          new THREE.Vector3(-0.3, 0.1, -30.5),
          new THREE.Vector3(0.4, -0.2, -37.5),
          new THREE.Vector3(-0.3, 0.2, -44.5),
          new THREE.Vector3(0.2, -0.1, -51.5),
          new THREE.Vector3(-0.2, 0.1, -58.5),
          new THREE.Vector3(0, -0.4, -68),
        ]
      : [
          new THREE.Vector3(0, 0, -2),
          new THREE.Vector3(0.6, -0.3, -8),
          new THREE.Vector3(2.4, -0.4, -17), // P01 is at X=-3.2; spine swoops to X=+2.4 on the RIGHT
          new THREE.Vector3(0.4, 1.2, -24),  // Arches overhead between P01 and P02
          new THREE.Vector3(-2.2, 0.6, -31), // P02 is at X=+3.2; spine sweeps to X=-2.2 on the LEFT
          new THREE.Vector3(0.8, -1.6, -38), // Dives deep low behind
          new THREE.Vector3(2.0, 1.1, -45),  // P03 is at X=-2.8; spine rises to X=+2.0 on the RIGHT
          new THREE.Vector3(-0.8, -0.9, -52),// Weaves downward
          new THREE.Vector3(-1.8, -0.4, -59),// P04 is at X=+2.6; spine frames it from the left
          new THREE.Vector3(0, -1.8, -68),   // Expands into hex foundation of The Lab
        ];
    return new THREE.CatmullRomCurve3(points, false, 'centripetal');
  }, [isMobile]);

  // Sample points along spine for nodes and geometry
  const totalNodes = 48;
  const spineNodes = useMemo(() => {
    const list: { pos: THREE.Vector3; tangent: THREE.Vector3; t: number }[] = [];
    for (let i = 0; i < totalNodes; i++) {
      const t = i / (totalNodes - 1);
      const pos = spineSpline.getPoint(t);
      const tangent = spineSpline.getTangent(t);
      list.push({ pos, tangent, t });
    }
    return list;
  }, [spineSpline, totalNodes]);

  // 3 Multi-Conduit Neural Cables with organic twisting
  const cablesGeometry = useMemo(() => {
    const cableSteps = 120;
    const positions: number[] = [];

    for (let c = 0; c < 3; c++) {
      const angleOffset = (c * Math.PI * 2) / 3;
      const cableRadius = isMobile ? 0.35 : 0.65;

      for (let i = 0; i < cableSteps - 1; i++) {
        const t1 = i / (cableSteps - 1);
        const t2 = (i + 1) / (cableSteps - 1);

        const p1 = spineSpline.getPoint(t1);
        const p2 = spineSpline.getPoint(t2);

        const a1 = t1 * Math.PI * 8 + angleOffset;
        const a2 = t2 * Math.PI * 8 + angleOffset;

        positions.push(
          p1.x + Math.cos(a1) * cableRadius,
          p1.y + Math.sin(a1) * cableRadius,
          p1.z,
          p2.x + Math.cos(a2) * cableRadius,
          p2.y + Math.sin(a2) * cableRadius,
          p2.z
        );
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    return geom;
  }, [spineSpline, isMobile]);

  // Asymmetric Structural Rib Brackets
  const ribsGeometry = useMemo(() => {
    const ribCount = vConfig.backbone.strutsCount;
    const positions: number[] = [];

    for (let i = 0; i < ribCount; i++) {
      const t = i / (ribCount - 1);
      const pt = spineSpline.getPoint(t);
      const ribSpan = isMobile ? 0.8 : 1.6 + Math.sin(t * Math.PI * 3) * 0.6;
      const angle = t * Math.PI * 5;

      const p1 = new THREE.Vector3(
        pt.x + Math.cos(angle) * ribSpan,
        pt.y + Math.sin(angle) * ribSpan * 0.7,
        pt.z
      );
      const p2 = new THREE.Vector3(
        pt.x - Math.cos(angle) * (ribSpan * 0.6),
        pt.y - Math.sin(angle) * (ribSpan * 0.8),
        pt.z
      );

      positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    return geom;
  }, [spineSpline, isMobile]);

  // Umbilical Tendrils connecting Spine directly to each Project
  const tendrilGeometry = useMemo(() => {
    const positions: number[] = [];
    const projectZs = [-17.0, -31.0, -45.0, -59.0];

    projectZs.forEach((pz, idx) => {
      const coord = vConfig.projects.coords[idx];
      const targetCoord = isMobile ? coord.mobile : coord.desktop;

      // Find closest spine point
      let closestPt = spineNodes[0].pos;
      let minDiff = 999;
      for (const sn of spineNodes) {
        const diff = Math.abs(sn.pos.z - pz);
        if (diff < minDiff) {
          minDiff = diff;
          closestPt = sn.pos;
        }
      }

      // 3-segment umbilical bridge
      const mid1 = new THREE.Vector3(
        closestPt.x + (targetCoord.x - closestPt.x) * 0.4,
        closestPt.y + (targetCoord.y - closestPt.y) * 0.3 + 0.3,
        closestPt.z + (targetCoord.z - closestPt.z) * 0.4
      );
      const mid2 = new THREE.Vector3(
        closestPt.x + (targetCoord.x - closestPt.x) * 0.8,
        closestPt.y + (targetCoord.y - closestPt.y) * 0.7 - 0.2,
        closestPt.z + (targetCoord.z - closestPt.z) * 0.8
      );

      positions.push(
        closestPt.x, closestPt.y, closestPt.z, mid1.x, mid1.y, mid1.z,
        mid1.x, mid1.y, mid1.z, mid2.x, mid2.y, mid2.z,
        mid2.x, mid2.y, mid2.z, targetCoord.x, targetCoord.y, targetCoord.z
      );
    });

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    return geom;
  }, [spineNodes, isMobile]);

  const nodeGeometry = useMemo(() => new THREE.OctahedronGeometry(vConfig.backbone.nodeSize, 1), []);
  const nodeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: aquaColor,
        emissive: aquaColor,
        emissiveIntensity: 0.85,
        roughness: 0.15,
        metalness: 0.85,
      }),
    [aquaColor]
  );

  useFrame(({ clock }) => {
    if (!nodesMesh.current || !spineGroup.current) return;
    const time = clock.elapsedTime;
    const timeline = getTimelineState(experienceState.scrollProgress);
    const dispersion = timeline.spineDispersion;

    // Organic axial sway
    spineGroup.current.rotation.z = Math.sin(time * 0.15) * 0.04;

    for (let i = 0; i < totalNodes; i++) {
      const sn = spineNodes[i];
      // Wave traveling along the spine
      const wave = Math.sin(sn.pos.z * vConfig.backbone.pulseFrequency + time * 1.9 + timeline.energyPulsePhase);
      const isNearActive =
        timeline.activeProjectIndex >= 0 &&
        Math.abs(sn.pos.z - vConfig.projects.coords[timeline.activeProjectIndex].desktop.z) < 6.0;

      // Dispersion into The Lab
      const disperseDist = dispersion * (4.0 + (i % 6) * 0.7);
      const disperseAngle = i * 0.45;
      const posX = sn.pos.x + Math.cos(disperseAngle) * disperseDist;
      const posY = sn.pos.y + Math.sin(disperseAngle) * disperseDist;
      const posZ = sn.pos.z;

      const scale = (0.75 + wave * 0.35 + (isNearActive ? 0.65 : 0)) * (1.0 - dispersion * 0.6);

      dummy.position.set(posX, posY, posZ);
      dummy.scale.setScalar(scale);
      dummy.rotation.set(time * 0.4 + i, time * 0.3, i);
      dummy.updateMatrix();
      nodesMesh.current.setMatrixAt(i, dummy.matrix);

      // Node color shifts during energy pulse
      const nodeColor = isNearActive ? limeColor : wave > 0.45 ? aquaColor : indigoColor;
      nodesMesh.current.setColorAt(i, nodeColor);
    }

    nodesMesh.current.instanceMatrix.needsUpdate = true;
    if (nodesMesh.current.instanceColor) nodesMesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <group ref={spineGroup}>
      {/* Junction Node Crystals */}
      <instancedMesh ref={nodesMesh} args={[nodeGeometry, nodeMaterial, totalNodes]} />

      {/* Asymmetric Structural Rib Brackets */}
      <lineSegments geometry={ribsGeometry}>
        <lineBasicMaterial color={aquaColor} transparent opacity={0.35} depthWrite={false} />
      </lineSegments>

      {/* Twisting Multi-Conduit Neural Cables */}
      <lineSegments geometry={cablesGeometry}>
        <lineBasicMaterial color={indigoColor} transparent opacity={0.55} depthWrite={false} />
      </lineSegments>

      {/* Umbilical Tendrils to Projects */}
      <lineSegments geometry={tendrilGeometry}>
        <lineBasicMaterial color={limeColor} transparent opacity={0.7} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

// ----------------------------------------------------------------------------------
// 5. THE 4 BESPOKE 3D PROJECT WORLDS (DISTINCT VISUAL GRAMMARS)
// ----------------------------------------------------------------------------------

/**
 * PROJECT 01: AI INCIDENT INTELLIGENCE
 * Visual Grammar: Neural Telemetry & Incident Cluster
 * Real trained ML anomaly wave propagation, telemetry conduits, satellite service nodes
 */
function VisualAIIncident({ isActive }: { isActive: boolean }) {
  const group = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const aqua = useAuroraColor('--accent-aqua', '#22D3EE');
  const magenta = useAuroraColor('--accent-magenta', '#FF5FA8');
  const indigo = useAuroraColor('--accent-indigo', '#7C6CFF');

  const satellites = useMemo(
    () => [
      { x: -0.9, y: 0.5, z: 0.2, label: 'metrics' },
      { x: -1.0, y: -0.4, z: -0.2, label: 'logs' },
      { x: 0.8, y: 0.6, z: -0.3, label: 'traces' },
      { x: 0.9, y: -0.5, z: 0.2, label: 'services' },
      { x: 0.2, y: 0.9, z: 0.3, label: 'incident' },
      { x: -0.3, y: -0.8, z: 0.2, label: 'evidence' },
      { x: 0.7, y: 0.1, z: 0.4, label: 'root_cause' },
      { x: -0.7, y: 0.15, z: -0.4, label: 'remediation' },
    ],
    []
  );

  const linksGeometry = useMemo(() => {
    const pts: number[] = [];
    satellites.forEach((s) => {
      // Connect to center core
      pts.push(0, 0, 0, s.x, s.y, s.z);
    });
    // Cross connections between adjacent nodes
    for (let i = 0; i < satellites.length; i++) {
      const s1 = satellites[i];
      const s2 = satellites[(i + 1) % satellites.length];
      pts.push(s1.x, s1.y, s1.z, s2.x, s2.y, s2.z);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3));
    return geom;
  }, [satellites]);

  useFrame(({ clock }) => {
    if (!group.current || !coreRef.current) return;
    const time = clock.elapsedTime;

    // Steady micro-rotation
    group.current.rotation.y = time * 0.25;
    group.current.rotation.x = Math.sin(time * 0.35) * 0.1;

    // Core pulsing anomaly wave
    const anomalyPulse = Math.sin(time * 2.2);
    const coreScale = isActive ? 1.0 + anomalyPulse * 0.15 : 0.85;
    coreRef.current.scale.setScalar(coreScale);
  });

  return (
    <group ref={group}>
      {/* Central Anomaly Detection Engine Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.38, 1]} />
        <meshStandardMaterial
          color={isActive ? magenta : aqua}
          emissive={isActive ? magenta : aqua}
          emissiveIntensity={isActive ? 0.95 : 0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Core Coordinate Ring */}
      <mesh rotation={[Math.PI * 0.3, 0, 0]}>
        <torusGeometry args={[0.62, 0.02, 16, 32]} />
        <meshBasicMaterial color={aqua} transparent opacity={0.65} />
      </mesh>

      {/* Network Links */}
      <lineSegments geometry={linksGeometry}>
        <lineBasicMaterial color={isActive ? magenta : indigo} transparent opacity={0.5} />
      </lineSegments>

      {/* Satellite Service & Telemetry Nodes */}
      {satellites.map((s, idx) => (
        <mesh key={idx} position={[s.x, s.y, s.z]}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial
            color={s.label === 'incident' || s.label === 'root_cause' ? magenta : aqua}
            emissive={s.label === 'incident' ? magenta : aqua}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * PROJECT 02: SOLISIQ
 * Visual Grammar: Engineered Solar Energy Machine
 * Pulsating solar core, 3 precision gimbal rings, 4 photovoltaic collector wings
 */
function VisualSolisIQ({ isActive }: { isActive: boolean }) {
  const group = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  const tangerine = useAuroraColor('--accent-tangerine', '#FFA36B');
  const aqua = useAuroraColor('--accent-aqua', '#22D3EE');

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.elapsedTime;

    group.current.rotation.y = time * 0.18;

    // Counter-rotating precision gimbal rings
    if (ring1Ref.current) ring1Ref.current.rotation.x = time * 0.85;
    if (ring2Ref.current) ring2Ref.current.rotation.y = -time * 0.65;
    if (ring3Ref.current) ring3Ref.current.rotation.z = time * 0.45;
  });

  return (
    <group ref={group}>
      {/* Central Solar Plasma Core */}
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial
          color={tangerine}
          emissive={tangerine}
          emissiveIntensity={isActive ? 1.2 : 0.8}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* 3 Concentric Precision Gimbal Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.72, 0.022, 16, 48]} />
        <meshStandardMaterial color={tangerine} roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[0.92, 0.022, 16, 48]} />
        <meshStandardMaterial color={aqua} roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.14, 0.022, 16, 48]} />
        <meshStandardMaterial color={tangerine} roughness={0.2} metalness={0.9} />
      </mesh>

      {/* 4 Photovoltaic Collector Array Wings */}
      {[0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].map((angle, idx) => (
        <group key={idx} rotation={[0, 0, angle]}>
          <mesh position={[1.4, 0, 0]} rotation={[0, Math.PI * 0.25, 0]}>
            <boxGeometry args={[0.45, 0.24, 0.02]} />
            <meshStandardMaterial color="#1E293B" roughness={0.15} metalness={0.8} />
          </mesh>
          {/* Energy Beam to Core */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([0.45, 0, 0, 1.4, 0, 0]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color={aqua} transparent opacity={0.65} />
          </line>
        </group>
      ))}
    </group>
  );
}

/**
 * PROJECT 03: INSTANEWS
 * Visual Grammar: 3D Information Environment
 * Floating translucent article planes at staggered depths/angles, data streams, central routing hub
 */
function VisualInstanews({ isActive }: { isActive: boolean }) {
  const group = useRef<THREE.Group>(null);
  const cyan = useAuroraColor('--accent-aqua', '#38BDF8');
  const indigo = useAuroraColor('--accent-indigo', '#6366F1');

  // 6 Floating Article Data Planes at staggered depths
  const planes = useMemo(
    () => [
      { x: -0.7, y: 0.45, z: 0.35, rotY: 0.25, rotX: -0.1, w: 0.75, h: 0.45 },
      { x: 0.8, y: 0.3, z: -0.25, rotY: -0.3, rotX: 0.15, w: 0.85, h: 0.5 },
      { x: -0.35, y: -0.5, z: 0.2, rotY: 0.15, rotX: 0.1, w: 0.65, h: 0.4 },
      { x: 0.65, y: -0.4, z: 0.4, rotY: -0.2, rotX: -0.15, w: 0.7, h: 0.42 },
      { x: 0.1, y: 0.7, z: -0.4, rotY: 0.1, rotX: 0.2, w: 0.8, h: 0.48 },
      { x: -0.85, y: -0.1, z: -0.3, rotY: 0.35, rotX: -0.05, w: 0.6, h: 0.38 },
    ],
    []
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.elapsedTime;
    group.current.rotation.y = Math.sin(time * 0.3) * 0.18;
  });

  return (
    <group ref={group}>
      {/* Central Routing Dispatch Hub */}
      <mesh>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color={cyan}
          emissive={cyan}
          emissiveIntensity={isActive ? 0.9 : 0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Floating Translucent Article Surfaces */}
      {planes.map((p, idx) => (
        <group key={idx} position={[p.x, p.y, p.z]} rotation={[p.rotX, p.rotY, 0]}>
          <mesh>
            <planeGeometry args={[p.w, p.h]} />
            <meshPhysicalMaterial
              color="#0A0620"
              roughness={0.15}
              transmission={0.8}
              thickness={0.1}
              transparent
              opacity={0.85}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Glowing Border Edge */}
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(p.w, p.h)]} />
            <lineBasicMaterial color={idx % 2 === 0 ? cyan : indigo} transparent opacity={0.65} />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}

/**
 * PROJECT 04: ZEROHOUR
 * Visual Grammar: Precision Mechanical Chronometer
 * Interlocking toothed gear rings, calibrated countdown arcs, ticking balance wheel
 */
function VisualZeroHour({ isActive }: { isActive: boolean }) {
  const group = useRef<THREE.Group>(null);
  const gear1Ref = useRef<THREE.Group>(null);
  const gear2Ref = useRef<THREE.Group>(null);
  const balanceRef = useRef<THREE.Group>(null);

  const violet = useAuroraColor('--accent-violet', '#A855F7');
  const aqua = useAuroraColor('--accent-aqua', '#22D3EE');

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.elapsedTime;

    // Toothed gear rotation with mechanical gear ratios
    if (gear1Ref.current) gear1Ref.current.rotation.z = time * 0.5;
    if (gear2Ref.current) gear2Ref.current.rotation.z = -time * 0.75;

    // Balance wheel rapid escapement oscillation
    if (balanceRef.current) balanceRef.current.rotation.z = Math.sin(time * 8.0) * 0.45;
  });

  return (
    <group ref={group}>
      {/* Outer Calibrated Dial Ring with Tick Marks */}
      <mesh>
        <torusGeometry args={[1.2, 0.03, 16, 64]} />
        <meshStandardMaterial color={violet} roughness={0.2} metalness={0.85} />
      </mesh>

      {/* Interlocking Gear 1 (Hours/Minutes) */}
      <group ref={gear1Ref}>
        <mesh>
          <torusGeometry args={[0.85, 0.04, 16, 48]} />
          <meshStandardMaterial color="#94A3B8" roughness={0.25} metalness={0.8} />
        </mesh>
        {/* Gear Teeth */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 16;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.89, Math.sin(a) * 0.89, 0]} rotation={[0, 0, a]}>
              <boxGeometry args={[0.06, 0.05, 0.04]} />
              <meshStandardMaterial color="#94A3B8" roughness={0.25} metalness={0.8} />
            </mesh>
          );
        })}
      </group>

      {/* Interlocking Gear 2 (Seconds) */}
      <group ref={gear2Ref} position={[0.45, 0.45, -0.05]}>
        <mesh>
          <torusGeometry args={[0.55, 0.03, 16, 36]} />
          <meshStandardMaterial color={aqua} roughness={0.2} metalness={0.85} />
        </mesh>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 12;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.58, Math.sin(a) * 0.58, 0]} rotation={[0, 0, a]}>
              <boxGeometry args={[0.05, 0.04, 0.03]} />
              <meshStandardMaterial color={aqua} roughness={0.2} metalness={0.85} />
            </mesh>
          );
        })}
      </group>

      {/* Central Rapid Escapement Balance Wheel */}
      <group ref={balanceRef}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 24]} />
          <meshStandardMaterial
            color={isActive ? aqua : violet}
            emissive={isActive ? aqua : violet}
            emissiveIntensity={0.65}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[0, 0.18, 0.03]}>
          <boxGeometry args={[0.04, 0.24, 0.02]} />
          <meshBasicMaterial color={aqua} />
        </mesh>
      </group>
    </group>
  );
}

// ----------------------------------------------------------------------------------
// 6. PHYSICAL PROJECT ARTIFACTS ORCHESTRATION
// ----------------------------------------------------------------------------------
function PhysicalProjectArtifacts() {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <group>
      {projectsData.map((project, index) => {
        const coordConf = vConfig.projects.coords[index];
        const coord = isMobile ? coordConf.mobile : coordConf.desktop;

        return (
          <SingleProjectArtifact
            key={project.id}
            index={index}
            coord={coord}
          />
        );
      })}
    </group>
  );
}

function SingleProjectArtifact({
  index,
  coord,
}: {
  index: number;
  coord: { x: number; y: number; z: number; rotY: number; rotX: number; scale: number };
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const safeDelta = Math.min(delta, 0.05);
    const timeline = getTimelineState(experienceState.scrollProgress);
    const visibility = timeline.projectVisibilities[index] || 0;
    const isActive = timeline.activeProjectIndex === index;

    // Smooth appearance scaling
    const targetScale = coord.scale * (0.4 + visibility * 0.85);
    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4.0, safeDelta)
    );

    // Dynamic rotation: settles facing camera during inspection
    const targetRotY = isActive ? coord.rotY * 0.3 : coord.rotY;
    const targetRotX = isActive ? coord.rotX * 0.3 : coord.rotX;

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3.8, safeDelta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 3.8, safeDelta);
  });

  return (
    <group ref={groupRef} position={[coord.x, coord.y, coord.z]}>
      {index === 0 && <VisualAIIncident isActive={false} />}
      {index === 1 && <VisualSolisIQ isActive={false} />}
      {index === 2 && <VisualInstanews isActive={false} />}
      {index === 3 && <VisualZeroHour isActive={false} />}
    </group>
  );
}

// ----------------------------------------------------------------------------------
// 7. THE LAB (SKILLS HEX GRID ROOM)
// ----------------------------------------------------------------------------------
function LabSkillsConstellation() {
  const groupRef = useRef<THREE.Group>(null);
  const aqua = useAuroraColor('--accent-aqua', '#22D3EE');
  const violet = useAuroraColor('--accent-violet', '#C084FC');

  const hexCells = useMemo(() => {
    const list: { x: number; z: number; category: string }[] = [];
    let catIdx = 0;
    for (const cat of skillsCategories) {
      cat.skills.forEach((_, i) => {
        const row = Math.floor((catIdx * 4 + i) / 5);
        const col = (catIdx * 4 + i) % 5;
        const x = (col - 2) * 1.4 + (row % 2 === 0 ? 0 : 0.7);
        const z = (row - 2) * 1.2;
        list.push({ x, z, category: cat.title });
      });
      catIdx++;
    }
    return list;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const time = clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(time * 0.12) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -1.8, -68]}>
      {/* Hex Grid Cells */}
      {hexCells.map((cell, idx) => (
        <mesh key={idx} position={[cell.x, 0, cell.z]} rotation={[-Math.PI * 0.5, 0, 0]}>
          <circleGeometry args={[0.55, 6]} />
          <meshStandardMaterial
            color="#0A0620"
            emissive={idx % 3 === 0 ? aqua : violet}
            emissiveIntensity={0.25}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// ----------------------------------------------------------------------------------
// 8. CALM SCENES (ABOUT TRAJECTORY & CONTACT RING)
// ----------------------------------------------------------------------------------
function CalmSceneVisuals() {
  const aqua = useAuroraColor('--accent-aqua', '#22D3EE');

  // About Education Trajectory Nodes
  const aboutPoints = useMemo(
    () => [
      new THREE.Vector3(-1.8, -0.6, -74),
      new THREE.Vector3(-0.6, 0.2, -75),
      new THREE.Vector3(0.6, -0.1, -76),
      new THREE.Vector3(1.8, 0.5, -77),
    ],
    []
  );

  const aboutLine = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(aboutPoints);
    const mat = new THREE.LineBasicMaterial({ color: aqua, transparent: true, opacity: 0.55 });
    return new THREE.Line(geom, mat);
  }, [aboutPoints, aqua]);

  return (
    <group>
      {/* About Trajectory Line */}
      <primitive object={aboutLine} />
      {aboutPoints.map((pt, i) => (
        <mesh key={i} position={[pt.x, pt.y, pt.z]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={aqua} emissive={aqua} emissiveIntensity={0.8} />
        </mesh>
      ))}

      {/* Contact Converging Ring */}
      <mesh position={[0, 0, -82]} rotation={[0, 0, 0]}>
        <torusGeometry args={[2.4, 0.05, 16, 64]} />
        <meshStandardMaterial color={aqua} emissive={aqua} emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

// ----------------------------------------------------------------------------------
// 9. CINEMATIC CAMERA RIG (DYNAMIC FOV & ROLL BANKING)
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

    // Damped camera spline tracking
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      timeline.cameraPos.x + experienceState.pointerX * 0.16,
      vConfig.camera.damping,
      safeDelta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      timeline.cameraPos.y - experienceState.pointerY * 0.12 + Math.sin(clock.elapsedTime * 0.38) * 0.03,
      vConfig.camera.damping,
      safeDelta
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      timeline.cameraPos.z - dive,
      vConfig.camera.damping,
      safeDelta
    );

    // Roll banking into turns
    currentRoll.current = THREE.MathUtils.damp(currentRoll.current, timeline.cameraRoll, 3.5, safeDelta);
    camera.up.set(Math.sin(-currentRoll.current), Math.cos(currentRoll.current), 0);

    // Look at choreographed target along spline
    camera.lookAt(timeline.cameraTarget.x, timeline.cameraTarget.y, timeline.cameraTarget.z);

    // Dynamic FOV
    camera.fov = THREE.MathUtils.damp(camera.fov, timeline.cameraFov, 3.5, safeDelta);
    camera.updateProjectionMatrix();

    experienceState.activeProject = timeline.activeProjectIndex;
  });

  return null;
}

// ----------------------------------------------------------------------------------
// 10. SCENE GRAPH
// ----------------------------------------------------------------------------------
function WorldScene({ quality }: { quality: Quality }) {
  useEffect(() => {
    document.documentElement.classList.add('webgl-world-ready');
    return () => document.documentElement.classList.remove('webgl-world-ready');
  }, []);

  return (
    <>
      <StorytellingEnvironment />
      <CameraRig />

      {/* Layer 02: Purposeful Subtle Particles */}
      <PurposefulParticleField quality={quality} />

      {/* Hero 360° Portrait Glass Lens */}
      <HeroPortraitRing />

      {/* Layer 04: The Living Architectural Infrastructure Spine */}
      <ArchitecturalInfrastructureSpine />

      {/* Layer 05: The 4 Bespoke 3D Project Worlds */}
      <PhysicalProjectArtifacts />

      {/* The Lab (Skills Hex Grid Room) */}
      <LabSkillsConstellation />

      {/* Calm Scenes (About Trajectory & Contact Ring) */}
      <CalmSceneVisuals />

      {/* Postprocessing Bloom on High-tier Desktop Only */}
      {quality === 'high' && window.innerWidth > vConfig.quality.mobileBreakpoint && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.4} luminanceThreshold={1.15} mipmapBlur />
          <Vignette eskil={false} offset={0.14} darkness={0.22} />
        </EffectComposer>
      )}
    </>
  );
}

// ----------------------------------------------------------------------------------
// 11. SCROLL DRIVER (NATIVE MOBILE SCROLL & RESPONSIVE DESKTOP LENIS)
// ----------------------------------------------------------------------------------
function ScrollDriver() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Use Lenis on desktop only; preserve 100% native instant touch scroll on mobile
    if (!reduced && !isMobile) {
      lenis = new Lenis({
        duration: vConfig.motion.scrollDuration,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
      });
      setSmoothScroll((id) =>
        lenis?.scrollTo(`#${id}`, { offset: 0, duration: vConfig.motion.scrollDuration })
      );
    } else {
      setSmoothScroll((id) => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const onScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      experienceState.scrollProgress = clamp01(window.scrollY / maxScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

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
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return null;
}

// ----------------------------------------------------------------------------------
// 12. CANVAS EXPORT
// ----------------------------------------------------------------------------------
export default function ExperienceCanvas() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const device = navigator as Navigator & { deviceMemory?: number };
  const veryWeak = (navigator.hardwareConcurrency || 8) <= 2 || (device.deviceMemory || 8) <= 2;
  const [quality, setQuality] = useState<Quality>(initialQuality);
  const [failed, setFailed] = useState(false);

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
