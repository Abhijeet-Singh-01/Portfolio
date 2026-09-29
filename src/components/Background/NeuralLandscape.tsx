import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { AdditiveBlending, BufferAttribute, BufferGeometry, Group, PointLight, Points, Vector3 } from 'three';
import { experienceConfig as config } from '../../config/experienceConfig';
import { pointerStore } from '../../lib/pointerStore';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

function Network() {
  const group = useRef<Group>(null);
  const pointLight = useRef<PointLight>(null);
  const { viewport } = useThree();
  const count = typeof window !== 'undefined' && window.innerWidth < 700 ? config.scene.mobileNodes : config.scene.desktopNodes;
  const nodes = useMemo(() => Array.from({ length: count }, (_, i) => {
    const t = i * 2.39996;
    const radius = 1.4 + Math.sqrt(i / count) * 3.1;
    return new Vector3(Math.cos(t) * radius, (Math.sin(t * .73) * 2.6), Math.sin(t) * radius * .52);
  }), [count]);
  const links = useMemo(() => {
    const positions: number[] = [];
    nodes.forEach((a, i) => nodes.forEach((b, j) => {
      if (j > i && a.distanceTo(b) < config.scene.connectionDistance) positions.push(a.x,a.y,a.z,b.x,b.y,b.z);
    }));
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    return geometry;
  }, [nodes]);
  const dots = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(nodes.flatMap(p => [p.x,p.y,p.z])), 3));
    return geometry;
  }, [nodes]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const scrollProgress = Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight));
    if (group.current) {
      group.current.rotation.y = t * config.motion.floatSpeed * .14 + pointerStore.nx * .1 + scrollProgress * .24;
      group.current.rotation.x = Math.sin(t * .12) * .035 - pointerStore.ny * .05 + scrollProgress * .08;
      group.current.position.x = (viewport.width < 8 ? .3 : 2.2) + (pointerStore.nx || 0) * .18;
      group.current.position.y = Math.sin(scrollProgress * Math.PI * 2) * .22;
    }
    if (pointLight.current) {
      pointLight.current.position.set(pointerStore.nx * viewport.width * .42, -pointerStore.ny * viewport.height * .4, 2.8);
      pointLight.current.intensity = pointerStore.active ? 2.5 : 1.2;
    }
  });
  return <group ref={group}>
    <lineSegments geometry={links}><lineBasicMaterial color={config.palette.cyan} transparent opacity={.1} blending={AdditiveBlending} /></lineSegments>
    <points geometry={dots}><pointsMaterial color={config.palette.cyan} size={.027} transparent opacity={.65} sizeAttenuation blending={AdditiveBlending} /></points>
    <mesh>
      <icosahedronGeometry args={[1.05, config.scene.sphereSegments > 32 ? 4 : 3]} />
      <meshStandardMaterial color="#101d2b" emissive="#143b55" emissiveIntensity={.65} roughness={.24} metalness={.7} wireframe />
    </mesh>
    <mesh scale={.88}>
      <icosahedronGeometry args={[1, 3]} />
      <meshPhysicalMaterial color="#0b1420" emissive="#092336" emissiveIntensity={.8} roughness={.16} metalness={.62} clearcoat={1} />
    </mesh>
    <pointLight ref={pointLight} color={config.palette.cyan} intensity={1.2} distance={9} />
    <pointLight position={[-4, 2, -2]} color={config.palette.violet} intensity={2.4} distance={11} />
    <pointLight position={[4, -2, 2]} color={config.palette.blue} intensity={2} distance={10} />
  </group>;
}

function ParticleField() {
  const points = useRef<Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(config.scene.particleCount * 3);
    for (let i=0;i<config.scene.particleCount;i++) {
      positions[i*3]=((i*127)%997)/997*18-9; positions[i*3+1]=((i*233)%991)/991*10-5; positions[i*3+2]=((i*541)%983)/983*10-7;
    }
    const g = new BufferGeometry(); g.setAttribute('position',new BufferAttribute(positions,3)); return g;
  }, []);
  useFrame(({clock}) => { if(points.current) { points.current.rotation.y=clock.elapsedTime*.012; points.current.rotation.x=pointerStore.ny*.025; } });
  return <points ref={points} geometry={geometry}><pointsMaterial color={config.palette.white} size={.012} transparent opacity={.48} sizeAttenuation blending={AdditiveBlending} /></points>;
}

function SceneContent({ lowPower }: { lowPower: boolean }) {
  const reduced = usePrefersReducedMotion();
  return <>
    <ambientLight intensity={.4} />
    <Network />
    {!reduced && <ParticleField />}
    {!lowPower && <EffectComposer multisampling={0}><Bloom intensity={config.scene.bloom} luminanceThreshold={.35} luminanceSmoothing={.3} mipmapBlur /><Vignette eskil={false} offset={.22} darkness={.72} /></EffectComposer>}
  </>;
}

export const NeuralLandscape: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const [enabled,setEnabled]=useState(false);
  const [quality,setQuality]=useState(.5);
  const lowPowerDevice = window.matchMedia('(max-width: 700px), (prefers-reduced-motion: reduce)').matches || (navigator.hardwareConcurrency || 8) <= 4;
  const lowPower = lowPowerDevice || quality < config.scene.qualityFloor;
  const dpr = lowPower ? 1 : Math.min(config.scene.dprMax, 1 + quality * (config.scene.dprMax - 1));
  useEffect(()=>{
    if (reduced || !('WebGLRenderingContext' in window)) return;
    const timer=window.setTimeout(()=>setEnabled(true),180);
    return ()=>window.clearTimeout(timer);
  },[reduced]);
  if(!enabled || reduced) return null;
  return <div className="neural-landscape" aria-hidden="true"><Canvas camera={{position:[0,0,11],fov:47}} dpr={dpr} performance={{min:config.scene.fpsFloor/60,max:config.scene.fpsCeiling/60,debounce:1600}} gl={{alpha:true,antialias:false,powerPreference:'low-power'}}><Suspense fallback={null}><PerformanceMonitor flipflops={3} onChange={({factor})=>setQuality(factor)} onFallback={()=>setQuality(0)}><SceneContent lowPower={lowPower} /></PerformanceMonitor></Suspense></Canvas></div>;
};
