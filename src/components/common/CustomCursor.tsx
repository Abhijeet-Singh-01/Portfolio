import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { pointerStore } from '../../lib/pointerStore';
import { experienceConfig as config } from '../../config/experienceConfig';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const trail = trailRef.current;
    if (!finePointer.matches || prefersReducedMotion || !cursor || !ring || !trail) return;
    const ctx = trail.getContext('2d');
    if (!ctx) return;

    document.documentElement.classList.add('has-custom-cursor');
    document.documentElement.style.setProperty('--cursor-ring-size', `${config.cursor.ringSize}px`);
    document.documentElement.style.setProperty('--cursor-hover-size', `${config.cursor.hoverSize}px`);
    let frame = 0;
    let ringX = -100;
    let ringY = -100;
    let targetX = -100;
    let targetY = -100;
    let points: {x:number;y:number;life:number}[] = [];
    let burst: {x:number;y:number;vx:number;vy:number;life:number}[] = [];
    let lastMagnetic: HTMLElement | null = null;
    const resize = () => { const dpr=Math.min(devicePixelRatio||1,2); trail.width=innerWidth*dpr; trail.height=innerHeight*dpr; trail.style.width=`${innerWidth}px`; trail.style.height=`${innerHeight}px`; ctx.setTransform(dpr,0,0,dpr,0,0); };
    resize(); window.addEventListener('resize',resize);

    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      targetX = event.clientX;
      targetY = event.clientY;
      pointerStore.x=targetX; pointerStore.y=targetY; pointerStore.nx=targetX/innerWidth*2-1; pointerStore.ny=targetY/innerHeight*2-1; pointerStore.active=true;
      document.documentElement.style.setProperty('--pointer-x', `${targetX}px`); document.documentElement.style.setProperty('--pointer-y', `${targetY}px`);
      points.push({x:targetX,y:targetY,life:1}); if(points.length>config.cursor.trailLength) points.shift();
      cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      if (!frame) frame = requestAnimationFrame(follow);
    };
    const follow = () => {
      ringX += (targetX - ringX) * config.cursor.ringEase;
      ringY += (targetY - ringY) * config.cursor.ringEase;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      ctx.clearRect(0,0,innerWidth,innerHeight);
      points.forEach((p,i)=>{p.life*=.82;const next=points[i+1];if(next){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(next.x,next.y);ctx.strokeStyle=`rgba(112,229,242,${p.life*.22})`;ctx.lineWidth=(i+1)/points.length*5;ctx.stroke();}});
      burst=burst.filter(p=>p.life>0); burst.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.life-=.035;ctx.beginPath();ctx.arc(p.x,p.y,2.5*p.life,0,Math.PI*2);ctx.fillStyle=`rgba(165,140,255,${p.life})`;ctx.fill();});
      const magnetic=document.querySelector<HTMLElement>('[data-magnetic="true"]:hover');
      if(lastMagnetic && lastMagnetic!==magnetic){lastMagnetic.style.removeProperty('--magnetic-x');lastMagnetic.style.removeProperty('--magnetic-y');}
      lastMagnetic=magnetic;
      if(magnetic){
        const b=magnetic.getBoundingClientRect(),dx=targetX-(b.left+b.width/2),dy=targetY-(b.top+b.height/2),distance=Math.hypot(dx,dy);
        const pull=Math.max(0,1-distance/config.motion.magneticRadius)*config.cursor.magnetStrength;
        magnetic.style.setProperty('--magnetic-x',`${(dx*pull).toFixed(1)}px`);magnetic.style.setProperty('--magnetic-y',`${(dy*pull).toFixed(1)}px`);
      }
      if (Math.abs(targetX - ringX) + Math.abs(targetY - ringY) > 0.5 || points.some(p=>p.life>.08) || burst.length) frame = requestAnimationFrame(follow);
      else frame = 0;
    };
    const hover = (event: PointerEvent) => {
      const target = event.target;
      if(target instanceof Element){
        const labeled=target.closest<HTMLElement>('[data-cursor]');
        const link=target.closest('a');
        const interactive=target.closest('a, button, [role="button"], input, textarea, .project-card, [data-cursor]');
        ring.classList.toggle('cursor-hover',Boolean(interactive));
        ring.dataset.label=labeled?.dataset.cursor||(link?'↗':'');
      } else { ring.classList.remove('cursor-hover'); ring.dataset.label=''; }
    };
    const down=(event:PointerEvent)=>{if(event.pointerType!=='mouse')return;pointerStore.pressed=true;pointerStore.burst++; ring.classList.add('cursor-pressed'); burst=Array.from({length:config.cursor.burstCount},()=>{const angle=Math.random()*Math.PI*2,speed=1+Math.random()*3;return{x:event.clientX,y:event.clientY,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:1};});if(!frame)frame=requestAnimationFrame(follow);};
    const up=()=>{pointerStore.pressed=false;ring.classList.remove('cursor-pressed');};
    const leave=()=>{pointerStore.active=false;points=[];};
    const hide = () => { cursor.classList.add('cursor-hidden'); ring.classList.add('cursor-hidden'); };
    const show = () => { cursor.classList.remove('cursor-hidden'); ring.classList.remove('cursor-hidden'); };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', hover, { passive: true });
    window.addEventListener('pointerdown',down,{passive:true});window.addEventListener('pointerup',up,{passive:true});window.addEventListener('pointerleave',leave);
    document.documentElement.addEventListener('mouseleave', hide);
    document.documentElement.addEventListener('mouseenter', show);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      document.documentElement.style.removeProperty('--cursor-ring-size'); document.documentElement.style.removeProperty('--cursor-hover-size');
      document.documentElement.style.removeProperty('--pointer-x');document.documentElement.style.removeProperty('--pointer-y');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', hover);
      window.removeEventListener('pointerdown',down);window.removeEventListener('pointerup',up);window.removeEventListener('pointerleave',leave);window.removeEventListener('resize',resize);
      document.documentElement.removeEventListener('mouseleave', hide);
      document.documentElement.removeEventListener('mouseenter', show);
      cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  return <><div className="cursor-spotlight" aria-hidden="true" /><canvas ref={trailRef} className="cursor-trail" aria-hidden="true" /><span ref={ringRef} className="custom-cursor-ring" aria-hidden="true" /><span ref={cursorRef} className="custom-cursor-dot" aria-hidden="true" /></>;
};
