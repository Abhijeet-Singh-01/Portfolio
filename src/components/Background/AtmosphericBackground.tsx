import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { experienceConfig } from '../../config/experienceConfig';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
  color: string;
}

export const AtmosphericBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check prefers-reduced-motion
    // Subtle star-like particle palette: warm gold & cool teal hints
    const colors = [
      'rgba(244, 241, 234,', // ivory
      'rgba(212, 175, 55,',  // gold
      'rgba(45, 212, 191,',  // teal
      'rgba(200, 205, 215,', // silver
    ];

    const particleCount = Math.min(Math.floor((width * height) / 32000), experienceConfig.atmosphere.stars);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isGoldOrTeal = Math.random() > 0.6;
      const colorPrefix = isGoldOrTeal 
        ? (Math.random() > 0.5 ? colors[1] : colors[2])
        : (Math.random() > 0.5 ? colors[0] : colors[3]);

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.2 + 0.6,
        baseAlpha: Math.random() * 0.35 + 0.1,
        alpha: Math.random() * 0.35 + 0.1,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        phase: Math.random() * Math.PI * 2,
        speed: 0.006 + Math.random() * 0.009,
        color: colorPrefix,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.phase += p.speed;
          p.alpha = p.baseAlpha + Math.sin(p.phase) * (p.baseAlpha * 0.5);

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${Math.max(0.05, Math.min(p.alpha, 0.7))})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep atmospheric base */}
      <div className="absolute inset-0 bg-[var(--ascent-background)]" />

      {/* Cool cyan and blue light establishes the ascent palette */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] rounded-full blur-[140px] opacity-40 animate-ambient-left"
        style={{
          background: 'radial-gradient(circle, rgba(87, 222, 242, 0.14) 0%, rgba(103, 139, 255, 0.05) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* A violet tint adds depth between the sections */}
      <div
        className="absolute top-[45%] -left-[15%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full blur-[160px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(165, 140, 255, 0.08) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Electric blue glow toward the right */}
      <div
        className="absolute top-[8%] -right-[10%] w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] rounded-full blur-[150px] opacity-35 animate-ambient-right"
        style={{
          background: 'radial-gradient(circle, rgba(103, 139, 255, 0.12) 0%, rgba(165, 140, 255, 0.04) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Lower section subtle teal accent */}
      <div
        className="absolute top-[68%] -right-[12%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[160px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(87, 222, 242, 0.07) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Canvas for tiny stars and particles */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* Extremely subtle editorial noise/grain texture */}
      <div className="noise-overlay" aria-hidden="true" />
    </div>
  );
};
