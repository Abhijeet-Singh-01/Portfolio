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
import profilePhoto from '../../assets/images/profile.webp';

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
      <fogExp2 attach="fog" args={[vConfig.lighting.default.fog, 0.02]} />
      <ambientLight ref={ambientLightRef} intensity={0.9} color={vConfig.lighting.default.ambient} />
      <directionalLight
        ref={keyLightRef}
        position={[8, 12, 14]}
        intensity={1.5}
        color={vConfig.lighting.default.key}
      />
      <pointLight
        ref={fillLightRef}
        position={[-8, -4, 6]}
        intensity={1.2}
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
      pos[i * 3] = (rand1 - 0.5) * 32;
      pos[i * 3 + 1] = (rand2 - 0.5) * 20;
      pos[i * 3 + 2] = 10 - rand3 * 90;
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
      arr[idx + 1] += Math.sin(time + phases[i]) * 0.0025;
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
        opacity={0.3}
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

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  // Desktop: Positioned on the right half ([1.95, 0, 0]) to provide full clearance for left typography.
  // Mobile: Positioned in the upper half ([0, 1.32, 0]) with scale 0.68 to float cleanly above bottom typography.
  const ringPos = useMemo<[number, number, number]>(() => (isMobile ? [0, 1.32, 0] : [1.95, 0, 0]), [isMobile]);
  const ringBaseScale = isMobile ? 0.68 : 1.0;

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(profilePhoto, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      setPhotoTexture(tex);
    });
  }, []);

  useFrame(({ clock }, delta) => {
    if (!ringRef.current) return;
    const safeDelta = Math.min(delta, 0.05);
    const p = experienceState.scrollProgress;

    // Gated visibility: only render during Hero scene (p <= 0.18)
    if (p > 0.18) {
      ringRef.current.visible = false;
      return;
    }
    ringRef.current.visible = true;

    // React to drag rotation with smooth damping return
    ringRef.current.rotation.y = THREE.MathUtils.damp(
      ringRef.current.rotation.y,
      experienceState.portraitRotationY,
      4.0,
      safeDelta
    );
    ringRef.current.rotation.x = THREE.MathUtils.damp(
      ringRef.current.rotation.x,
      experienceState.portraitRotationX,
      4.0,
      safeDelta
    );

    // Idle organic float
    ringRef.current.position.y = ringPos[1] + Math.sin(clock.elapsedTime * 0.75) * 0.04;

    // PORTAL DILATION: As camera dives at t = 0.08 -> 0.16, expand ring outwards
    if (p >= 0.08 && p <= 0.18) {
      const openT = Math.min(1.0, (p - 0.08) / 0.08);
      const irisScale = ringBaseScale * (1.0 + openT * 3.0);
      ringRef.current.scale.set(irisScale, irisScale, 1.0);
    } else {
      ringRef.current.scale.set(ringBaseScale, ringBaseScale, 1.0);
    }
  });

  return (
    <group ref={ringRef} position={ringPos}>
      {/* Outer Luminous Torus Frame */}
      <mesh>
        <torusGeometry args={[vConfig.hero.ringRadius, 0.065, 24, 64]} />
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
        <torusGeometry args={[vConfig.hero.ringRadius * 1.07, 0.018, 16, 48]} />
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
      <mesh position={[0, 0, 0.035]}>
        <circleGeometry args={[vConfig.hero.ringRadius * 0.96, 48]} />
        <meshPhysicalMaterial
          color="#0A0620"
          roughness={0.15}
          transmission={0.65}
          thickness={0.15}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

// ----------------------------------------------------------------------------------
// 4. THE LIVING ARCHITECTURAL INFRASTRUCTURE SPINE (NOT A DNA HELIX)
// ----------------------------------------------------------------------------------
function ArchitecturalInfrastructureSpine() {
  const spineGroup = useRef<THREE.Group>(null);
  const nodesMesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const aquaColor = useAuroraColor('--accent-aqua', '#22D3EE');
  const indigoColor = useAuroraColor('--accent-indigo', '#7C6CFF');

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  // Primary Spine Asymmetric 3D Spline Curve
  // Desktop: Frames behind/beside artifacts and NEVER intersects the opposite-side HTML cards.
  // Mobile: Stays elevated at Y ~ 0.95 behind artifacts and NEVER crosses into the bottom dock.
  const spineSpline = useMemo(() => {
    const points = isMobile
      ? [
          new THREE.Vector3(0, 0.8, -2),
          new THREE.Vector3(0.1, 0.9, -8),
          new THREE.Vector3(0.0, 0.95, -17.0),
          new THREE.Vector3(0.15, 0.9, -24.0),
          new THREE.Vector3(0.0, 0.95, -31.0),
          new THREE.Vector3(-0.15, 0.9, -38.0),
          new THREE.Vector3(0.0, 0.95, -45.0),
          new THREE.Vector3(0.15, 0.9, -52.0),
          new THREE.Vector3(0.0, 0.95, -59.0),
          new THREE.Vector3(0, -0.6, -68),
        ]
      : [
          new THREE.Vector3(0, 0, -2),
          new THREE.Vector3(0.4, 0.2, -8),
          new THREE.Vector3(-1.2, 0.8, -17), // P01 is at X=-2.6; spine frames it from above-center, well clear of card at X>=1.0
          new THREE.Vector3(0.0, 0.4, -24),  // Bridges between P01 and P02 through the center
          new THREE.Vector3(1.2, -0.7, -31), // P02 is at X=+2.6; spine frames it from below-center, well clear of card at X<=-1.0
          new THREE.Vector3(0.0, 0.4, -38),  // Bridges between P02 and P03
          new THREE.Vector3(-1.2, 0.8, -45), // P03 is at X=-2.6; spine frames it on the left
          new THREE.Vector3(0.0, -0.4, -52),
          new THREE.Vector3(1.2, -0.7, -59), // P04 is at X=+2.6; spine frames it on the right
          new THREE.Vector3(0, -1.6, -68),   // Expands into hex foundation of The Lab
        ];
    return new THREE.CatmullRomCurve3(points, false, 'centripetal');
  }, [isMobile]);

  const totalNodes = 36;
  const spineNodes = useMemo(() => {
    const list: { pos: THREE.Vector3; t: number }[] = [];
    for (let i = 0; i < totalNodes; i++) {
      const t = i / (totalNodes - 1);
      const pos = spineSpline.getPoint(t);
      list.push({ pos, t });
    }
    return list;
  }, [spineSpline, totalNodes]);

  // 3 Multi-Conduit Neural Cables with organic twisting
  const cablesGeometry = useMemo(() => {
    const cableSteps = 90;
    const positions: number[] = [];

    for (let c = 0; c < 3; c++) {
      const angleOffset = (c * Math.PI * 2) / 3;
      const cableRadius = isMobile ? 0.22 : 0.45;

      for (let i = 0; i < cableSteps - 1; i++) {
        const t1 = i / (cableSteps - 1);
        const t2 = (i + 1) / (cableSteps - 1);

        const p1 = spineSpline.getPoint(t1);
        const p2 = spineSpline.getPoint(t2);

        const a1 = t1 * Math.PI * 6 + angleOffset;
        const a2 = t2 * Math.PI * 6 + angleOffset;

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

  const nodeGeometry = useMemo(() => new THREE.OctahedronGeometry(vConfig.backbone.nodeSize, 1), []);
  const nodeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: aquaColor,
        emissive: aquaColor,
        emissiveIntensity: 0.75,
        roughness: 0.25,
        metalness: 0.75,
      }),
    [aquaColor]
  );

  useFrame(({ clock }) => {
    if (!nodesMesh.current || !spineGroup.current) return;
    const p = experienceState.scrollProgress;
    const time = clock.elapsedTime;
    const timeline = getTimelineState(p);
    const dispersion = timeline.spineDispersion;

    // Organic axial sway
    spineGroup.current.rotation.z = Math.sin(time * 0.15) * 0.02;

    const isInspecting = timeline.activeProjectIndex >= 0;

    for (let i = 0; i < totalNodes; i++) {
      const sn = spineNodes[i];
      const wave = Math.sin(sn.pos.z * vConfig.backbone.pulseFrequency + time * 1.8 + timeline.energyPulsePhase);

      const disperseDist = dispersion * (3.5 + (i % 6) * 0.6);
      const disperseAngle = i * 0.45;
      const posX = sn.pos.x + Math.cos(disperseAngle) * disperseDist;
      const posY = sn.pos.y + Math.sin(disperseAngle) * disperseDist;
      const posZ = sn.pos.z;

      // Attenuate spine scale during inspection so project is the clear hero
      const baseScale = isInspecting ? 0.4 : 0.75;
      const scale = (baseScale + wave * 0.25) * (1.0 - dispersion * 0.6);

      dummy.position.set(posX, posY, posZ);
      dummy.scale.setScalar(scale);
      dummy.rotation.set(time * 0.3 + i, time * 0.25, i);
      dummy.updateMatrix();
      nodesMesh.current.setMatrixAt(i, dummy.matrix);

      const nodeColor = wave > 0.45 ? aquaColor : indigoColor;
      nodesMesh.current.setColorAt(i, nodeColor);
    }

    nodesMesh.current.instanceMatrix.needsUpdate = true;
    if (nodesMesh.current.instanceColor) nodesMesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <group ref={spineGroup}>
      <instancedMesh ref={nodesMesh} args={[nodeGeometry, nodeMaterial, totalNodes]} />
      <lineSegments geometry={cablesGeometry}>
        <lineBasicMaterial color={indigoColor} transparent opacity={0.45} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

// ----------------------------------------------------------------------------------
// 5. THE 4 BESPOKE 3D PROJECT WORLDS (DISTINCT VISUAL GRAMMARS)
// ----------------------------------------------------------------------------------

/**
 * PROJECT 01: AI INCIDENT INTELLIGENCE
 * Visual Grammar: Neural Telemetry & Incident Detection Cluster
 */
function VisualAIIncident({ isActive }: { isActive: boolean }) {
  const group = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const nucleusRef = useRef<THREE.Mesh>(null);
  const aqua = useAuroraColor('--accent-aqua', '#22D3EE');
  const magenta = useAuroraColor('--accent-magenta', '#FF5FA8');
  const indigo = useAuroraColor('--accent-indigo', '#7C6CFF');

  const satellites = useMemo(
    () => [
      { x: -0.95, y: 0.55, z: 0.2, label: 'metrics' },
      { x: -1.05, y: -0.45, z: -0.2, label: 'logs' },
      { x: 0.85, y: 0.65, z: -0.3, label: 'traces' },
      { x: 0.95, y: -0.55, z: 0.2, label: 'services' },
      { x: 0.25, y: 0.95, z: 0.3, label: 'incident' },
      { x: -0.35, y: -0.85, z: 0.2, label: 'evidence' },
      { x: 0.75, y: 0.15, z: 0.4, label: 'root_cause' },
      { x: -0.75, y: 0.18, z: -0.4, label: 'remediation' },
    ],
    []
  );

  const linksGeometry = useMemo(() => {
    const pts: number[] = [];
    satellites.forEach((s) => {
      pts.push(0, 0, 0, s.x, s.y, s.z);
    });
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
    if (!group.current || !coreRef.current || !nucleusRef.current) return;
    const time = clock.elapsedTime;

    group.current.rotation.y = time * 0.25;
    group.current.rotation.x = Math.sin(time * 0.35) * 0.08;

    const anomalyPulse = Math.sin(time * 3.0);
    const pulseScale = isActive ? 1.0 + anomalyPulse * 0.12 : 0.9;
    coreRef.current.scale.setScalar(pulseScale);
    nucleusRef.current.scale.setScalar(0.7 + Math.sin(time * 5.0) * 0.15);
  });

  return (
    <group ref={group}>
      {/* Central Anomaly Detection Engine Outer Faceted Shell */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.36, 1]} />
        <meshPhysicalMaterial
          color={isActive ? magenta : aqua}
          emissive={isActive ? magenta : aqua}
          emissiveIntensity={isActive ? 0.9 : 0.55}
          roughness={0.15}
          transmission={0.65}
          thickness={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Internal Dense Neural Nucleus */}
      <mesh ref={nucleusRef}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color={isActive ? magenta : aqua} />
      </mesh>

      {/* Precision Core Coordinate Ring */}
      <mesh rotation={[Math.PI * 0.35, 0, 0]}>
        <torusGeometry args={[0.62, 0.016, 16, 40]} />
        <meshBasicMaterial color={aqua} transparent opacity={0.65} />
      </mesh>

      {/* Network Telemetry Links */}
      <lineSegments geometry={linksGeometry}>
        <lineBasicMaterial color={isActive ? magenta : indigo} transparent opacity={0.55} />
      </lineSegments>

      {/* Orbiting Telemetry & Service Nodes */}
      {satellites.map((s, idx) => (
        <mesh key={idx} position={[s.x, s.y, s.z]}>
          <octahedronGeometry args={[0.11, 0]} />
          <meshStandardMaterial
            color={s.label === 'incident' || s.label === 'root_cause' ? magenta : aqua}
            emissive={s.label === 'incident' || s.label === 'root_cause' ? magenta : aqua}
            emissiveIntensity={0.85}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * PROJECT 02: SOLISIQ
 * Visual Grammar: Engineered Solar Energy Machine
 */
function VisualSolisIQ({ isActive }: { isActive: boolean }) {
  const group = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  const tangerine = useAuroraColor('--accent-tangerine', '#FFA36B');
  const aqua = useAuroraColor('--accent-aqua', '#22D3EE');

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.elapsedTime;

    group.current.rotation.y = time * 0.16;

    // Counter-rotating precision gimbal rings
    if (ring1Ref.current) ring1Ref.current.rotation.x = time * 0.75;
    if (ring2Ref.current) ring2Ref.current.rotation.y = -time * 0.55;
    if (ring3Ref.current) ring3Ref.current.rotation.z = time * 0.4;
    if (coronaRef.current) coronaRef.current.scale.setScalar(1.0 + Math.sin(time * 3.5) * 0.08);
  });

  return (
    <group ref={group}>
      {/* Central Concentrated Radiant Solar Core */}
      <mesh>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color={tangerine}
          emissive={tangerine}
          emissiveIntensity={isActive ? 1.4 : 0.9}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Layered Fiery Corona Shell */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[0.27, 24, 24]} />
        <meshBasicMaterial color={tangerine} transparent opacity={0.35} wireframe />
      </mesh>

      {/* 3 Precision Gimbal Rings with tick marks */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.42, 0.014, 16, 48]} />
        <meshStandardMaterial color={tangerine} roughness={0.15} metalness={0.9} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[0.56, 0.014, 16, 48]} />
        <meshStandardMaterial color={aqua} roughness={0.15} metalness={0.9} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[0.7, 0.014, 16, 48]} />
        <meshStandardMaterial color={tangerine} roughness={0.15} metalness={0.9} />
      </mesh>

      {/* 4 Engineered Photovoltaic Collector Wings */}
      {[0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].map((angle, idx) => (
        <group key={idx} rotation={[0, 0, angle]}>
          {/* Dark Silicon Solar Panel with metallic busbars */}
          <mesh position={[0.86, 0, 0]} rotation={[0, Math.PI * 0.25, 0]}>
            <boxGeometry args={[0.28, 0.16, 0.015]} />
            <meshStandardMaterial color="#0A0F1D" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Silicon cell laser grid line */}
          <lineSegments position={[0.86, 0, 0.01]} rotation={[0, Math.PI * 0.25, 0]}>
            <edgesGeometry args={[new THREE.BoxGeometry(0.28, 0.16, 0.015)]} />
            <lineBasicMaterial color={aqua} transparent opacity={0.7} />
          </lineSegments>
          {/* Energy Conduit to Core */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([0.22, 0, 0, 0.86, 0, 0]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color={tangerine} transparent opacity={0.75} />
          </line>
        </group>
      ))}
    </group>
  );
}

/**
 * PROJECT 03: INSTANEWS
 * Visual Grammar: 3D Information Architecture Environment
 */
function VisualInstanews({ isActive }: { isActive: boolean }) {
  const group = useRef<THREE.Group>(null);
  const cyan = useAuroraColor('--accent-aqua', '#38BDF8');
  const indigo = useAuroraColor('--accent-indigo', '#6366F1');

  // 6 Floating Holographic Article Slabs at staggered depths
  const planes = useMemo(
    () => [
      { x: -0.75, y: 0.45, z: 0.35, rotY: 0.22, rotX: -0.08, w: 0.75, h: 0.45 },
      { x: 0.8, y: 0.35, z: -0.25, rotY: -0.28, rotX: 0.12, w: 0.82, h: 0.48 },
      { x: -0.4, y: -0.5, z: 0.2, rotY: 0.15, rotX: 0.08, w: 0.65, h: 0.4 },
      { x: 0.68, y: -0.42, z: 0.38, rotY: -0.2, rotX: -0.12, w: 0.72, h: 0.42 },
      { x: 0.15, y: 0.72, z: -0.38, rotY: 0.1, rotX: 0.18, w: 0.78, h: 0.46 },
      { x: -0.88, y: -0.12, z: -0.3, rotY: 0.32, rotX: -0.05, w: 0.62, h: 0.38 },
    ],
    []
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.elapsedTime;
    group.current.rotation.y = Math.sin(time * 0.28) * 0.15;
  });

  return (
    <group ref={group}>
      {/* Central High-Throughput Dispatch Hub */}
      <mesh>
        <dodecahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color={cyan}
          emissive={cyan}
          emissiveIntensity={isActive ? 0.95 : 0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Floating Translucent Holographic Article Slabs */}
      {planes.map((p, idx) => (
        <group key={idx} position={[p.x, p.y, p.z]} rotation={[p.rotX, p.rotY, 0]}>
          {/* Glass Plane */}
          <mesh>
            <planeGeometry args={[p.w, p.h]} />
            <meshPhysicalMaterial
              color="#070D1E"
              roughness={0.12}
              transmission={0.82}
              thickness={0.1}
              transparent
              opacity={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Luminous Article Edge */}
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(p.w, p.h)]} />
            <lineBasicMaterial color={idx % 2 === 0 ? cyan : indigo} transparent opacity={0.75} />
          </lineSegments>

          {/* Simulated Article Data Headline Bars */}
          <mesh position={[-p.w * 0.15, p.h * 0.2, 0.005]}>
            <planeGeometry args={[p.w * 0.55, 0.03]} />
            <meshBasicMaterial color={cyan} transparent opacity={0.65} />
          </mesh>
          <mesh position={[-p.w * 0.05, p.h * 0.05, 0.005]}>
            <planeGeometry args={[p.w * 0.7, 0.015]} />
            <meshBasicMaterial color="#94A3B8" transparent opacity={0.45} />
          </mesh>
          <mesh position={[-p.w * 0.1, -p.h * 0.1, 0.005]}>
            <planeGeometry args={[p.w * 0.6, 0.015]} />
            <meshBasicMaterial color="#94A3B8" transparent opacity={0.45} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * PROJECT 04: ZEROHOUR
 * Visual Grammar: Precision Mechanical Chronometer
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

    // Toothed gears meshed with exact 1.5x gear ratio
    if (gear1Ref.current) gear1Ref.current.rotation.z = time * 0.45;
    if (gear2Ref.current) gear2Ref.current.rotation.z = -time * 0.675;

    // High-speed escapement balance wheel oscillation (8 Hz)
    if (balanceRef.current) balanceRef.current.rotation.z = Math.sin(time * 8.0) * 0.45;
  });

  return (
    <group ref={group}>
      {/* Outer Calibrated Dial Bezel Ring */}
      <mesh>
        <torusGeometry args={[1.15, 0.026, 16, 64]} />
        <meshStandardMaterial color={violet} roughness={0.2} metalness={0.85} />
      </mesh>

      {/* 60 Precision Dial Bezel Tick Marks */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 24;
        const isMajor = i % 6 === 0;
        return (
          <mesh key={i} position={[Math.cos(a) * 1.15, Math.sin(a) * 1.15, 0]} rotation={[0, 0, a]}>
            <boxGeometry args={[isMajor ? 0.08 : 0.04, 0.015, 0.02]} />
            <meshBasicMaterial color={isMajor ? aqua : violet} />
          </mesh>
        );
      })}

      {/* Interlocking Gear 1 (Hours/Minutes) */}
      <group ref={gear1Ref}>
        <mesh>
          <torusGeometry args={[0.75, 0.035, 16, 48]} />
          <meshStandardMaterial color="#94A3B8" roughness={0.25} metalness={0.85} />
        </mesh>
        {/* 16 Gear Teeth */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 16;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.78, Math.sin(a) * 0.78, 0]} rotation={[0, 0, a]}>
              <boxGeometry args={[0.05, 0.04, 0.03]} />
              <meshStandardMaterial color="#94A3B8" roughness={0.25} metalness={0.85} />
            </mesh>
          );
        })}
      </group>

      {/* Interlocking Gear 2 (Seconds) */}
      <group ref={gear2Ref} position={[0.42, 0.42, -0.04]}>
        <mesh>
          <torusGeometry args={[0.5, 0.028, 16, 36]} />
          <meshStandardMaterial color={aqua} roughness={0.2} metalness={0.85} />
        </mesh>
        {/* 12 Meshing Gear Teeth */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 12;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.53, Math.sin(a) * 0.53, 0]} rotation={[0, 0, a]}>
              <boxGeometry args={[0.045, 0.035, 0.025]} />
              <meshStandardMaterial color={aqua} roughness={0.2} metalness={0.85} />
            </mesh>
          );
        })}
      </group>

      {/* Rapid Escapement Balance Wheel with Ruby Pivot */}
      <group ref={balanceRef}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.035, 24]} />
          <meshStandardMaterial
            color={isActive ? aqua : violet}
            emissive={isActive ? aqua : violet}
            emissiveIntensity={0.7}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* Ruby Pivot Jewel */}
        <mesh position={[0, 0, 0.02]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#E11D48" roughness={0.1} metalness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

// ----------------------------------------------------------------------------------
// 6. PHYSICAL PROJECT ARTIFACTS ORCHESTRATION WITH STRICT SCENE GATING
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

    // Strict scene gating: if visibility is near 0, completely hide the artifact!
    if (visibility < 0.005) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    // Smooth scaling from 0 to full scale
    const targetScale = coord.scale * visibility;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4.2, safeDelta)
    );

    // Orientation settles facing camera during peak hold
    const targetRotY = isActive ? coord.rotY * 0.25 : coord.rotY;
    const targetRotX = isActive ? coord.rotX * 0.25 : coord.rotX;

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3.8, safeDelta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 3.8, safeDelta);
  });

  const timeline = getTimelineState(experienceState.scrollProgress);
  const isActive = timeline.activeProjectIndex === index;

  return (
    <group ref={groupRef} position={[coord.x, coord.y, coord.z]}>
      {index === 0 && <VisualAIIncident isActive={isActive} />}
      {index === 1 && <VisualSolisIQ isActive={isActive} />}
      {index === 2 && <VisualInstanews isActive={isActive} />}
      {index === 3 && <VisualZeroHour isActive={isActive} />}
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
    const p = experienceState.scrollProgress;

    // Strict scene gating: only visible during Skills beat
    if (p < 0.90 || p > 0.965) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    const time = clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(time * 0.12) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, -1.8, -68]}>
      {/* Hex Grid Floor Cells with Glowing Edges */}
      {hexCells.map((cell, idx) => (
        <group key={idx} position={[cell.x, 0, cell.z]} rotation={[-Math.PI * 0.5, 0, 0]}>
          <mesh>
            <circleGeometry args={[0.54, 6]} />
            <meshStandardMaterial
              color="#070417"
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.CircleGeometry(0.54, 6)]} />
            <lineBasicMaterial color={idx % 2 === 0 ? aqua : violet} transparent opacity={0.65} />
          </lineSegments>
        </group>
      ))}

      {/* Floating Center Star/Asterisk Emblem */}
      <mesh position={[0, 1.2, 0]}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color={aqua} emissive={aqua} emissiveIntensity={0.85} />
      </mesh>
    </group>
  );
}

// ----------------------------------------------------------------------------------
// 8. CALM SCENES (ABOUT TRAJECTORY & CONTACT RING)
// ----------------------------------------------------------------------------------
function CalmSceneVisuals() {
  const aboutGroupRef = useRef<THREE.Group>(null);
  const contactGroupRef = useRef<THREE.Group>(null);
  const aqua = useAuroraColor('--accent-aqua', '#22D3EE');

  const aboutPoints = useMemo(
    () => [
      new THREE.Vector3(-1.8, -0.5, -74),
      new THREE.Vector3(-0.6, 0.2, -75),
      new THREE.Vector3(0.6, -0.1, -76),
      new THREE.Vector3(1.8, 0.4, -77),
    ],
    []
  );

  const aboutLine = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(aboutPoints);
    const mat = new THREE.LineBasicMaterial({ color: aqua, transparent: true, opacity: 0.55 });
    return new THREE.Line(geom, mat);
  }, [aboutPoints, aqua]);

  useFrame(() => {
    const p = experienceState.scrollProgress;
    if (aboutGroupRef.current) {
      aboutGroupRef.current.visible = p >= 0.945 && p <= 0.985;
    }
    if (contactGroupRef.current) {
      contactGroupRef.current.visible = p >= 0.975;
    }
  });

  return (
    <>
      {/* About Trajectory Line & Milestone Nodes */}
      <group ref={aboutGroupRef}>
        <primitive object={aboutLine} />
        {aboutPoints.map((pt, i) => (
          <mesh key={i} position={[pt.x, pt.y, pt.z]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color={aqua} emissive={aqua} emissiveIntensity={0.8} />
          </mesh>
        ))}
      </group>

      {/* Contact Converging Ring */}
      <group ref={contactGroupRef}>
        <mesh position={[0, 0, -84]} rotation={[0, 0, 0]}>
          <torusGeometry args={[2.2, 0.04, 16, 64]} />
          <meshStandardMaterial color={aqua} emissive={aqua} emissiveIntensity={0.7} />
        </mesh>
      </group>
    </>
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

    // Damped camera tracking along spline
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      timeline.cameraPos.x + experienceState.pointerX * 0.14,
      vConfig.camera.damping,
      safeDelta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      timeline.cameraPos.y - experienceState.pointerY * 0.1 + Math.sin(clock.elapsedTime * 0.35) * 0.025,
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
          <Bloom intensity={0.35} luminanceThreshold={1.1} mipmapBlur />
          <Vignette eskil={false} offset={0.15} darkness={0.25} />
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
      setSmoothScroll((id) => {
        const roomProg = experienceState.roomProgress[id];
        if (roomProg !== undefined) {
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          lenis?.scrollTo(roomProg * maxScroll, { duration: vConfig.motion.scrollDuration });
        } else {
          lenis?.scrollTo(`#${id}`, { offset: 0, duration: vConfig.motion.scrollDuration });
        }
      });
    } else {
      setSmoothScroll((id) => {
        const roomProg = experienceState.roomProgress[id];
        if (roomProg !== undefined) {
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          window.scrollTo({ top: roomProg * maxScroll, behavior: 'smooth' });
        } else {
          const el = document.getElementById(id);
          el?.scrollIntoView({ behavior: 'smooth' });
        }
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
