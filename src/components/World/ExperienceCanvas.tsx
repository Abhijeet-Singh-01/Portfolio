import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, advance, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import { experienceConfig as config } from '../../config/experienceConfig';
import { experienceState, setSmoothScroll } from '../../lib/experienceStore';
import { projectsData } from '../../data/projects';
import { skillsCategories } from '../../data/skills';

type Quality = 'high' | 'medium' | 'low';
const PARTICLE_COUNTS: Record<Quality, number> = {
  high: config.scene.particles.high,
  medium: config.scene.particles.medium,
  low: config.scene.particles.low,
};

const cssColor = (token: string) => getComputedStyle(document.documentElement).getPropertyValue(token).trim();
const color = (token: string) => new THREE.Color(cssColor(token));
function useAuroraColor(token: string) {
  const value = cssColor(token);
  return useMemo(() => new THREE.Color(value), [value]);
}
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const initialQuality = (): Quality => {
  const mobile = window.innerWidth <= config.scene.quality.mobileWidth;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = navigator.hardwareConcurrency;
  const memory = nav.deviceMemory;
  const weak = (cores !== undefined && cores <= config.scene.quality.weakCores)
    || (memory !== undefined && memory <= config.scene.quality.weakMemoryGb);
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
  ctx.globalAlpha = theme === 'night' ? 0.74 : 0.78;
  ctx.fillStyle = cssColor('--surface');
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;
  ctx.fillStyle = cssColor('--accent-indigo');
  ctx.font = '600 22px monospace';
  ctx.fillText(`PROJECT / 0${index + 1}`, 34, 55);
  ctx.fillStyle = cssColor('--text');
  ctx.font = '500 34px Georgia, serif';
  const words = name.split(' ');
  let line = '';
  let y = 122;
  for (const word of words) {
    const trial = line ? `${line} ${word}` : word;
    if (ctx.measureText(trial).width > 440 && line) {
      ctx.fillText(line, 34, y);
      line = word;
      y += 46;
    } else line = trial;
  }
  ctx.fillText(line, 34, y);
  ctx.fillStyle = cssColor('--text-2');
  ctx.font = '16px monospace';
  ctx.fillText('SELECTED WORK', 34, 277);
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

function ParticleField({ quality }: { quality: Quality }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();
  const maxCount = config.scene.particles.high;
  const geometry = useMemo(() => {
    const positions = new Float32Array(maxCount * 3);
    for (let index = 0; index < maxCount; index += 1) {
      const angle = index * 2.399963229728653;
      const layer = index % 97;
      const radius = 0.6 + (index % 43) * 0.105;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = Math.sin(angle * 0.73) * (0.45 + (layer % 29) * 0.075);
      positions[index * 3 + 2] = -((index * 0.61803398875) % config.scene.camera.travelZ);
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return result;
  }, [maxCount]);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2() },
    uPixelRatio: { value: Math.min(gl.getPixelRatio(), config.scene.quality.high.maxDpr) },
    uIndigo: { value: color(config.scene.colors.indigo) },
    uAqua: { value: color(config.scene.colors.aqua) },
    uSize: { value: config.scene.particles.size },
    uGlow: { value: config.scene.particles.glow },
  }), [gl]);

  useEffect(() => {
    // R3F geometry is intentionally mutated here so adaptive quality changes draw count without reallocating buffers.
    // eslint-disable-next-line react/immutability
    geometry.setDrawRange(0, PARTICLE_COUNTS[quality]);
  }, [geometry, quality]);
  useEffect(() => {
    const updateTheme = () => {
      // Shader uniforms are mutable GPU state and are updated only when the theme changes.
      // eslint-disable-next-line react/immutability
      uniforms.uIndigo.value.copy(color(config.scene.colors.indigo));
      // eslint-disable-next-line react/immutability
      uniforms.uAqua.value.copy(color(config.scene.colors.aqua));
    };
    const updatePixelRatio = () => {
      // Shader uniform mutation avoids a React render for a renderer setting change.
      // eslint-disable-next-line react/immutability
      uniforms.uPixelRatio.value = gl.getPixelRatio();
    };
    window.addEventListener('aurora-theme-change', updateTheme);
    updatePixelRatio();
    return () => window.removeEventListener('aurora-theme-change', updateTheme);
  }, [gl, quality, uniforms]);
  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.elapsedTime * config.scene.particles.driftSpeed;
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
            float phase = uTime + position.z * 0.035;
            p.x += sin(phase + position.y * 0.22) * 0.16 + uPointer.x * 0.12;
            p.y += cos(phase * 0.72 + position.x * 0.18) * 0.12 - uPointer.y * 0.10;
            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = clamp(uSize * uPixelRatio * (110.0 / max(1.0, -mvPosition.z)), 1.0, 5.0);
            vGlow = 0.36 + 0.64 * abs(sin(phase * 0.65 + position.x));
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
            float alpha = smoothstep(0.5, 0.03, radius) * vGlow * 0.52;
            vec3 tint = mix(uIndigo, uAqua, smoothstep(0.0, 1.0, gl_FragCoord.y / 900.0));
            gl_FragColor = vec4(tint * (0.75 + uGlow * 0.45), alpha);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function AuroraBeam({ x, z, token }: { x: number; z: number; token: string }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  useTheme();
  const tint = useAuroraColor(token);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uTint: { value: tint } }), [tint]);
  useFrame(({ clock }) => {
    if (material.current) material.current.uniforms.uTime.value = clock.elapsedTime;
  });
  return (
    <mesh position={[x, 0, z]} rotation={[0, 0, x > 0 ? -0.16 : 0.16]}>
      <planeGeometry args={[4.4, 36, 1, 32]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        vertexShader={`uniform float uTime; varying vec2 vUv; void main(){vUv=uv;vec3 p=position;p.x+=sin(uv.y*5.0+uTime*0.18)*0.22;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`}
        fragmentShader={`uniform float uTime;uniform vec3 uTint;varying vec2 vUv;void main(){float edge=smoothstep(0.0,0.34,vUv.x)*(1.0-smoothstep(0.66,1.0,vUv.x));float pulse=0.5+0.5*sin(vUv.y*5.0+uTime*0.22);float alpha=edge*(0.025+pulse*0.028);gl_FragColor=vec4(uTint,alpha);}`}
      />
    </mesh>
  );
}

function HeroRoom() {
  const room = useRef<THREE.Group>(null);
  useTheme();
  const glow = useAuroraColor(config.scene.colors.indigo);
  useFrame((_, delta) => {
    if (room.current) room.current.position.z = THREE.MathUtils.damp(room.current.position.z, -config.scene.camera.travelZ * experienceState.roomProgress.home, 4, Math.min(delta, 0.05));
  });
  return (
    <group ref={room}>
      <mesh position={[-2.6, 0, -1.4]} rotation={[0, 0, Math.PI * 0.25]}>
        <torusKnotGeometry args={[0.55, 0.012, 110, 8, 2, 3]} />
        <meshBasicMaterial color={glow} transparent opacity={0.35} />
      </mesh>
      <pointLight position={[-2.4, 1.2, 0]} color={glow} intensity={0.5} distance={9} />
    </group>
  );
}

function ProjectArt({ index }: { index: number }) {
  const accent = index % 2 ? color(config.scene.colors.aqua) : color(config.scene.colors.magenta);
  if (index === 0) {
    return <group position={[0, -0.53, 0.04]}>{[0, 1, 2, 3, 4, 5].map((bar) => <mesh key={bar} position={[-0.72 + bar * 0.28, (bar % 3) * 0.12, 0]}><boxGeometry args={[0.08, 0.12 + (bar % 4) * 0.09, 0.025]} /><meshBasicMaterial color={accent} transparent opacity={0.72} /></mesh>)}</group>;
  }
  if (index === 1) return <mesh position={[0.75, -0.54, 0.04]} rotation={[0, 0, 0.2]}><torusGeometry args={[0.38, 0.012, 8, 48]} /><meshBasicMaterial color={accent} transparent opacity={0.8} /></mesh>;
  if (index === 2) return <group position={[0.72, -0.48, 0.04]}>{[0, 1, 2].map((layer) => <mesh key={layer} position={[-layer * 0.12, layer * 0.12, layer * 0.01]}><planeGeometry args={[0.52, 0.35]} /><meshBasicMaterial color={accent} transparent opacity={0.17 + layer * 0.1} /></mesh>)}</group>;
  return <mesh position={[0.78, -0.5, 0.04]}><torusGeometry args={[0.34, 0.018, 8, 48]} /><meshBasicMaterial color={accent} transparent opacity={0.8} /></mesh>;
}

function PortalShader({ index }: { index: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  useTheme();
  const tint = useAuroraColor(index % 2 ? config.scene.colors.aqua : config.scene.colors.violet);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uReveal: { value: 0.18 }, uDive: { value: 0 }, uTint: { value: tint } }), [tint]);
  useFrame(({ clock }) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = clock.elapsedTime;
    material.current.uniforms.uReveal.value = experienceState.activeProject === index ? 1 : 0.18;
    material.current.uniforms.uDive.value = experienceState.detailZoom;
  });
  return (
    <shaderMaterial
      ref={material}
      transparent
      depthWrite={false}
      uniforms={uniforms}
      vertexShader={`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`}
      fragmentShader={`
        uniform float uTime; uniform float uReveal; uniform float uDive; uniform vec3 uTint; varying vec2 vUv;
        void main(){
          vec2 gridUv=vUv*vec2(22.0,12.0);
          vec2 cell=abs(fract(gridUv-0.5)-0.5);
          float grid=1.0-smoothstep(0.025,0.075,min(cell.x,cell.y));
          float scan=1.0-smoothstep(0.0,0.035,abs(fract(vUv.y*12.0-uTime*0.12)-0.5));
          float sweep=1.0-smoothstep(0.0,0.08,abs(vUv.x-fract(uTime*0.08)));
          float alpha=grid*(0.025+uReveal*0.07)+scan*0.025+sweep*uReveal*0.08+uDive*0.035;
          gl_FragColor=vec4(uTint,alpha);
        }
      `}
    />
  );
}

function ProjectPortals() {
  const room = useRef<THREE.Group>(null);
  const theme = useTheme();
  const accent = useAuroraColor(config.scene.colors.violet);
  const labelTextures = useMemo(() => projectsData.map((project, index) => makePortalLabel(project.name, index, theme)), [theme]);
  useEffect(() => () => labelTextures.forEach((texture) => texture.dispose()), [labelTextures]);
  useFrame((_, delta) => {
    if (room.current) {
      room.current.position.z = THREE.MathUtils.damp(room.current.position.z, -config.scene.camera.travelZ * experienceState.roomProgress.projects, 4, Math.min(delta, 0.05));
      room.current.visible = Math.abs(experienceState.scrollProgress - experienceState.roomProgress.projects) < 0.14;
    }
    if (room.current) room.current.scale.z = THREE.MathUtils.damp(room.current.scale.z, 1 + experienceState.detailZoom * 0.25, 4, Math.min(delta, 0.05));
  });
  return (
    <group ref={room}>
      {projectsData.map((project, index) => {
        const x = (index - 1.5) * 2.55;
        const z = (1.5 - index) * 0.72;
        return (
          <group key={project.id} position={[x, Math.sin(index * 1.2) * 0.22, z]} rotation={[0, (1.5 - index) * 0.07, 0]}>
            <RoundedBox args={[2.2, 1.8, 0.09]} radius={0.08} smoothness={2}>
              <meshPhysicalMaterial color={color('--surface')} roughness={0.3} metalness={0.1} clearcoat={0.5} transparent opacity={0.82} />
            </RoundedBox>
            <mesh position={[0, 0, 0.048]}>
              <planeGeometry args={[2.04, 1.68]} />
              <PortalShader index={index} />
            </mesh>
            <mesh position={[0, 0, 0.052]}>
              <planeGeometry args={[2.04, 1.68]} />
              <meshBasicMaterial map={labelTextures[index]} transparent toneMapped={false} />
            </mesh>
            <mesh position={[0, 0, -0.055]}>
              <boxGeometry args={[2.22, 1.82, 0.02]} />
              <meshBasicMaterial color={accent} wireframe transparent opacity={0.28} />
            </mesh>
            <ProjectArt index={index} />
          </group>
        );
      })}
      <pointLight position={[0, 1.8, 1]} color={accent} intensity={0.8} distance={12} />
    </group>
  );
}

function SkillsConstellation() {
  useTheme();
  const instance = useRef<THREE.InstancedMesh>(null);
  const [activeSkill, setActiveSkill] = useState('');
  const count = skillsCategories.reduce((total, category) => total + category.skills.length, 0);
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(0.11, 1), []);
  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: color('--text-on-accent'), metalness: 0.25, roughness: 0.28, emissive: color(config.scene.colors.indigo), emissiveIntensity: 0.28 }), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const aquaValue = cssColor(config.scene.colors.aqua);
  const violetValue = cssColor(config.scene.colors.violet);
  const indigoValue = cssColor(config.scene.colors.indigo);
  const beamGeometry = useMemo(() => {
    const positions = new Float32Array(count * 6);
    const colors = new Float32Array(count * 6);
    const activeCategory = skillsCategories.find((category) => category.skills.some((skill) => skill.name === activeSkill))?.id;
    let index = 0;
    for (const category of skillsCategories) {
      for (const skill of category.skills) {
        const angle = (index / count) * Math.PI * 2;
        const radius = 1.55 + (index % 3) * 0.28;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.62;
        const z = Math.sin(angle * 2) * 0.45;
        positions.set([0, 0, 0, x, y, z], index * 6);
        const tint = new THREE.Color(index % 2 ? aquaValue : violetValue);
        const strength = !activeSkill ? 0.18 : category.id === activeCategory ? skill.name === activeSkill ? 1.2 : 0.72 : 0.06;
        tint.multiplyScalar(strength);
        colors.set([tint.r, tint.g, tint.b, tint.r, tint.g, tint.b], index * 6);
        index += 1;
      }
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    result.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return result;
  }, [activeSkill, aquaValue, count, violetValue]);
  const beamMaterial = useMemo(() => new THREE.LineBasicMaterial({ transparent: true, vertexColors: true, opacity: 0.65, depthWrite: false }), []);
  const beams = useMemo(() => new THREE.LineSegments(beamGeometry, beamMaterial), [beamGeometry, beamMaterial]);
  useEffect(() => () => beamGeometry.dispose(), [beamGeometry]);
  useEffect(() => {
    const update = (event: Event) => setActiveSkill((event as CustomEvent<string>).detail);
    window.addEventListener('aurora-skill-change', update);
    return () => window.removeEventListener('aurora-skill-change', update);
  }, []);
  useEffect(() => {
    if (!instance.current) return;
    const mesh = instance.current;
    const tint = new THREE.Color(cssColor(config.scene.colors.aqua));
    let index = 0;
    const activeCategory = skillsCategories.find((category) => category.skills.some((skill) => skill.name === activeSkill))?.id;
    for (const category of skillsCategories) {
      for (const skill of category.skills) {
        const angle = (index / count) * Math.PI * 2;
        const radius = 1.55 + (index % 3) * 0.28;
        dummy.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.62, Math.sin(angle * 2) * 0.45);
        dummy.scale.setScalar(skill.name === activeSkill ? 1.55 : skill.highlight ? 1.15 : 0.82);
        dummy.updateMatrix();
        mesh.setMatrixAt(index, dummy.matrix);
        tint.set(index % 2 ? aquaValue : violetValue);
        if (activeSkill && category.id !== activeCategory) tint.multiplyScalar(0.24);
        else if (skill.name === activeSkill) tint.multiplyScalar(1.45);
        mesh.setColorAt(index, tint);
        index += 1;
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [activeSkill, aquaValue, count, dummy, violetValue]);
  useEffect(() => {
    // Material color is GPU state; update it only when the Aurora token changes.
    // eslint-disable-next-line react/immutability
    material.emissive.set(indigoValue);
  }, [indigoValue, material]);
  return <><primitive object={beams} /><instancedMesh ref={instance} args={[geometry, material, count]} /></>;
}

function HoneycombFloor() {
  useTheme();
  const mesh = useRef<THREE.InstancedMesh>(null);
  const count = 19;
  const geometry = useMemo(() => new THREE.CylinderGeometry(0.62, 0.62, 0.016, 6, 1, true), []);
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: color(config.scene.colors.aqua), wireframe: true, transparent: true, opacity: 0.24 }), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const aquaValue = cssColor(config.scene.colors.aqua);
  useEffect(() => {
    if (!mesh.current) return;
    let index = 0;
    for (let row = -2; row <= 2; row += 1) {
      for (let column = -2; column <= 2; column += 1) {
        if (index >= count) break;
        dummy.position.set(column * 1.08 + (row % 2) * 0.54, -1.42, row * 0.94);
        dummy.updateMatrix();
        mesh.current.setMatrixAt(index, dummy.matrix);
        index += 1;
      }
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    // Material color is GPU state; update it only when the Aurora token changes.
    // eslint-disable-next-line react/immutability
    material.color.set(aquaValue);
  }, [aquaValue, dummy, material]);
  return <instancedMesh ref={mesh} args={[geometry, material, count]} />;
}

function RingParticles() {
  useTheme();
  const particles = useRef<THREE.InstancedMesh>(null);
  const count = 42;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(0.025, 0), []);
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: color(config.scene.colors.aqua), transparent: true, opacity: 0.8 }), []);
  const aquaValue = cssColor(config.scene.colors.aqua);
  useEffect(() => {
    // Keep the particle tint in sync with the mutable material when the theme changes.
    // eslint-disable-next-line react/immutability
    material.color.set(aquaValue);
  }, [aquaValue, material]);
  useFrame(({ clock }) => {
    if (!particles.current) return;
    const time = clock.elapsedTime;
    for (let index = 0; index < count; index += 1) {
      const phase = (index / count) * Math.PI * 2 + time * 0.08;
      const pulse = (Math.sin(time * 0.48 + index * 0.31) + 1) * 0.5;
      const radius = 1.75 + (1 - pulse) * 0.72;
      dummy.position.set(Math.cos(phase) * radius, Math.sin(phase * 1.3) * 0.28, Math.sin(phase) * radius * 0.22);
      dummy.scale.setScalar(0.45 + pulse * 0.7);
      dummy.updateMatrix();
      particles.current.setMatrixAt(index, dummy.matrix);
    }
    particles.current.instanceMatrix.needsUpdate = true;
  });
  return <instancedMesh ref={particles} args={[geometry, material, count]} />;
}

function RoomVisuals() {
  useTheme();
  const about = useRef<THREE.Group>(null);
  const skills = useRef<THREE.Group>(null);
  const contact = useRef<THREE.Group>(null);
  const linePoints = useMemo(() => [new THREE.Vector3(-2, -0.9, 0), new THREE.Vector3(-1, -0.25, 0), new THREE.Vector3(0, 0.35, 0), new THREE.Vector3(1, 0.7, 0), new THREE.Vector3(2, 1.1, 0)], []);
  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(linePoints), [linePoints]);
  const timelineLine = useMemo(() => new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: color(config.scene.colors.aqua), transparent: true, opacity: 0.48 })), [lineGeometry]);
  const aqua = useAuroraColor(config.scene.colors.aqua);
  const magenta = useAuroraColor(config.scene.colors.magenta);
  useEffect(() => {
    // Line material tint is shared GPU state updated on theme changes.
    // eslint-disable-next-line react/immutability
    (timelineLine.material as THREE.LineBasicMaterial).color.copy(aqua);
  }, [aqua, timelineLine]);
  useEffect(() => {
    return () => lineGeometry.dispose();
  }, [lineGeometry]);
  useFrame((_, delta) => {
    const safeDelta = Math.min(delta, 0.05);
    if (about.current) about.current.position.z = THREE.MathUtils.damp(about.current.position.z, -config.scene.camera.travelZ * experienceState.roomProgress.about, 4, safeDelta);
    if (skills.current) skills.current.position.z = THREE.MathUtils.damp(skills.current.position.z, -config.scene.camera.travelZ * experienceState.roomProgress.skills, 4, safeDelta);
    if (contact.current) contact.current.position.z = THREE.MathUtils.damp(contact.current.position.z, -config.scene.camera.travelZ * experienceState.roomProgress.contact, 4, safeDelta);
    if (skills.current) skills.current.rotation.z = Math.sin(performance.now() * 0.00012) * 0.035;
    if (contact.current) contact.current.rotation.z = performance.now() * 0.000035;
  });
  return (
    <>
      <group ref={about}>
        <primitive object={timelineLine} />
        {linePoints.map((point, index) => <mesh key={index} position={[point.x, point.y, 0]}><sphereGeometry args={[index === 0 ? 0.075 : 0.12, 10, 10]} /><meshBasicMaterial color={index % 2 ? aqua : magenta} /></mesh>)}
      </group>
      <group ref={skills}>
        <HoneycombFloor />
        <SkillsConstellation />
      </group>
      <group ref={contact}>
        <RingParticles />
        <mesh rotation={[0.3, 0, 0]}><torusGeometry args={[1.75, 0.035, 10, 80]} /><meshBasicMaterial color={magenta} transparent opacity={0.78} /></mesh>
        <mesh rotation={[0.3, 0.5, 0]}><torusGeometry args={[1.44, 0.012, 8, 80]} /><meshBasicMaterial color={aqua} transparent opacity={0.66} /></mesh>
        <pointLight color={magenta} intensity={0.55} distance={10} />
      </group>
    </>
  );
}

function ShaderTransition() {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  useTheme();
  const indigo = useAuroraColor(config.scene.colors.indigo);
  const aqua = useAuroraColor(config.scene.colors.aqua);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uProgress: { value: 0 }, uIndigo: { value: indigo }, uAqua: { value: aqua } }), [indigo, aqua]);
  useFrame(({ camera, clock }) => {
    if (!mesh.current || !material.current) return;
    mesh.current.position.copy(camera.position);
    mesh.current.rotation.copy(camera.rotation);
    mesh.current.translateZ(-0.8);
    material.current.uniforms.uTime.value = clock.elapsedTime;
    material.current.uniforms.uProgress.value = experienceState.detailZoom;
  });
  return (
    <mesh ref={mesh} renderOrder={90} frustumCulled={false}>
      <planeGeometry args={[20, 14]} />
      <shaderMaterial
        ref={material}
        transparent
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`}
        fragmentShader={`
          uniform float uTime; uniform float uProgress; uniform vec3 uIndigo; uniform vec3 uAqua; varying vec2 vUv;
          void main(){
            float noise=0.5+0.25*sin(vUv.x*29.0+sin(vUv.y*17.0+uTime*0.45))+0.25*cos(vUv.y*31.0-vUv.x*13.0);
            float dissolve=1.0-smoothstep(uProgress-0.12,uProgress+0.12,noise);
            float ripple=0.5+0.5*sin(length(vUv-0.5)*45.0-uTime*4.0);
            float alpha=dissolve*uProgress*0.12+ripple*uProgress*(1.0-uProgress)*0.035;
            vec3 tint=mix(uIndigo,uAqua,step(0.5,fract(vUv.x*8.0+uTime*0.12)));
            gl_FragColor=vec4(tint,alpha);
          }
        `}
      />
    </mesh>
  );
}

function CameraRig() {
  const camera = useThree((state) => state.camera);
  useFrame(({ clock }, delta) => {
    const safeDelta = Math.min(delta, 0.05);
    const dive = experienceState.detailZoom * config.motion.cameraDiveDuration;
    const targetZ = config.scene.camera.initialZ - config.scene.camera.travelZ * experienceState.scrollProgress - dive;
    // The camera is a persistent Three object updated by R3F's frame loop.
    // eslint-disable-next-line react/immutability
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, config.motion.cameraDamping, safeDelta);
    camera.position.y = Math.sin(clock.elapsedTime * config.scene.camera.breathingSpeed) * config.scene.camera.breathing;
    camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, -experienceState.pointerY * 0.012, config.motion.pointerDamping, safeDelta);
    camera.rotation.y = THREE.MathUtils.damp(camera.rotation.y, experienceState.pointerX * 0.017, config.motion.pointerDamping, safeDelta);
  });
  return null;
}

function ThemeFog() {
  useTheme();
  const fogColor = useAuroraColor(config.scene.colors.background);
  return <fog attach="fog" args={[fogColor, 20, 78]} />;
}

function WorldScene({ quality }: { quality: Quality }) {
  const theme = useTheme();
  const background = useAuroraColor(config.scene.colors.background);
  useEffect(() => {
    document.documentElement.classList.add('webgl-world-ready');
    return () => document.documentElement.classList.remove('webgl-world-ready');
  }, []);
  return (
    <>
      <color attach="background" args={[background]} />
      <ThemeFog />
      <ambientLight intensity={theme === 'night' ? 0.85 : 0.7} />
      <directionalLight position={[-4, 6, 4]} color={color(config.scene.colors.violet)} intensity={1.25} />
      <directionalLight position={[4, -3, -10]} color={color(config.scene.colors.aqua)} intensity={0.55} />
      <CameraRig />
      <ParticleField quality={quality} />
      <AuroraBeam x={-3.4} z={-26} token={config.scene.colors.violet} />
      <AuroraBeam x={3.8} z={-57} token={config.scene.colors.aqua} />
      <HeroRoom />
      <RoomVisuals />
      <ProjectPortals />
      <ShaderTransition />
      {quality === 'high' && window.innerWidth > config.scene.quality.mobileWidth && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.45} luminanceThreshold={1.15} mipmapBlur />
          <Vignette eskil={false} offset={0.12} darkness={0.22} />
        </EffectComposer>
      )}
    </>
  );
}

function ScrollDriver() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
      lenis = new Lenis({ duration: 0.85, smoothWheel: true, syncTouch: false, wheelMultiplier: 0.9 });
      setSmoothScroll((id) => lenis?.scrollTo(`#${id}`, { offset: -16, duration: 0.85 }));
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
      const fps = sample.frames * 1000 / (now - sample.start);
      sample.frames = 0;
      sample.start = now;
      if (fps < config.scene.quality.reduceAtFps && now - sample.lastReduction > 4500) {
        sample.lastReduction = now;
        setQuality((current) => current === 'high' ? 'medium' : 'low');
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [reducedMotion, veryWeak]);

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth <= config.scene.quality.mobileWidth) setQuality('low');
    };
    window.addEventListener('resize', resize, { passive: true });
    return () => window.removeEventListener('resize', resize);
  }, []);

  if (reducedMotion || veryWeak || failed || !('WebGLRenderingContext' in window)) return null;
  const dpr = config.scene.quality[quality].maxDpr;
  return (
    <div className="experience-canvas" aria-hidden="true">
      <ScrollDriver />
      <Canvas
        frameloop="never"
        dpr={dpr}
        camera={{ position: [0, 0, config.scene.camera.initialZ], fov: config.scene.camera.fov, near: 0.1, far: 120 }}
        gl={{ alpha: false, antialias: quality === 'high', powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (event) => {
            event.preventDefault();
            document.documentElement.classList.remove('webgl-world-ready');
            setFailed(true);
          }, { once: true });
        }}
      >
        <React.Suspense fallback={null}>
          <WorldScene quality={quality} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
