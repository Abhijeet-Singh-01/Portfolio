import React, { useRef } from 'react';
import { ArrowDown, ArrowRight, FileText, Sparkles, MapPin, Terminal, Orbit, Braces, Cpu, Database, Workflow } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { pointerStore } from '../../lib/pointerStore';
import { experienceConfig as config } from '../../config/experienceConfig';
import { personalBio } from '../../data/education';

export const Hero: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const pointerFrame = useRef(0);
  const pendingPointer = useRef<{ x: number; y: number } | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroIntroduction=personalBio.introParagraph.replace("I'm Abhijeet Singh, ", "I'm ");
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });

  const moveScene = (event: React.PointerEvent<HTMLElement>) => {
    if (!sceneRef.current || prefersReducedMotion) return;
    if (pointerStore.dragging) {
      const dx=event.clientX-pointerStore.x;
      const dy=event.clientY-pointerStore.y;
      pointerStore.rotationY += dx * config.scene.dragSensitivity;
      pointerStore.rotationX = Math.max(-config.scene.verticalRotationLimit,Math.min(config.scene.verticalRotationLimit,pointerStore.rotationX + dy * config.scene.dragSensitivity));
    }
    pointerStore.x=event.clientX; pointerStore.y=event.clientY;
    if (event.pointerType !== 'mouse') return;
    pendingPointer.current = { x: event.clientX, y: event.clientY };
    if (pointerFrame.current) return;
    pointerFrame.current = requestAnimationFrame(() => {
      pointerFrame.current = 0;
      const scene = sceneRef.current;
      const pointer = pendingPointer.current;
      if (!scene || !pointer) return;
      const bounds = scene.getBoundingClientRect();
      const x = Math.max(-0.5, Math.min(0.5, (pointer.x - bounds.left) / bounds.width - 0.5));
      const y = Math.max(-0.5, Math.min(0.5, (pointer.y - bounds.top) / bounds.height - 0.5));
      scene.style.setProperty('--tilt-x', `${y * -4}deg`);
      scene.style.setProperty('--tilt-y', `${x * 5}deg`);
      scene.style.setProperty('--orbit-front-x', `${x * 12}px`);
      scene.style.setProperty('--orbit-front-y', `${y * 12}px`);
      scene.style.setProperty('--card-x', `${x * 16}px`);
      scene.style.setProperty('--card-y', `${y * 16}px`);
    });
  };

  const beginDrag=(event:React.PointerEvent<HTMLDivElement>)=>{
    if(prefersReducedMotion) return;
    pointerStore.dragging=true; pointerStore.x=event.clientX; pointerStore.y=event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const endDrag=()=>{pointerStore.dragging=false;};
  const rotateWithKeyboard=(event:React.KeyboardEvent<HTMLDivElement>)=>{
    const step=config.scene.keyboardRotationStep;
    if(event.key==='ArrowLeft') pointerStore.rotationY-=step;
    else if(event.key==='ArrowRight') pointerStore.rotationY+=step;
    else if(event.key==='ArrowUp') pointerStore.rotationX=Math.max(-config.scene.verticalRotationLimit,pointerStore.rotationX-step);
    else if(event.key==='ArrowDown') pointerStore.rotationX=Math.min(config.scene.verticalRotationLimit,pointerStore.rotationX+step);
    else return;
    event.preventDefault();
  };

  const resetScene = () => {
    if (pointerFrame.current) cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = 0;
    pendingPointer.current = null;
    if (!sceneRef.current) return;
    ['--grid-x','--grid-y','--glow-x','--glow-y','--orbit-back-x','--orbit-back-y','--orbit-mid-x','--orbit-mid-y','--orbit-front-x','--orbit-front-y','--card-x','--card-y','--float-one-x','--float-one-y','--float-two-x','--float-two-y','--float-three-x','--float-three-y'].forEach((property) => sceneRef.current?.style.setProperty(property, '0px'));
    sceneRef.current.style.setProperty('--tilt-x', '0deg');
    sceneRef.current.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <section id="home" onPointerMove={moveScene} onPointerLeave={resetScene} onPointerUp={endDrag} onPointerCancel={endDrag} className="hero-scene relative min-h-[95svh] flex flex-col justify-between pt-32 pb-12 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="hero-grid flex-1 grid lg:grid-cols-[1.15fr_.85fr] gap-10 lg:gap-6 items-center">
        <div className="relative z-10 flex flex-col justify-center max-w-3xl hero-copy">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#2dd4bf]/20 bg-[#111820]/70 backdrop-blur-md w-fit mb-7">
            <span className="relative h-2 w-2 rounded-full bg-[#2dd4bf]" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#c6d7d3]">Available for opportunities</span>
          </div>

          <p className="hero-kicker mb-4 text-[11px] font-mono uppercase tracking-[.24em] text-[#2dd4bf]">Software · Systems · Applied AI</p>
          <h1 className="text-[clamp(2.3rem,10vw,3rem)] sm:text-6xl md:text-7xl lg:text-[5.7rem] font-serif font-normal tracking-tight text-[#f4f1ea] leading-[.98] mb-4">
            Hey, I&apos;m <span className="hero-title-accent">Abhijeet Singh.</span>
          </h1>
          <p className="hero-manifesto mb-3 text-xl sm:text-2xl font-serif text-[#d6e8eb]">Building useful things for a complex world.</p>
          <p className="mb-4 text-[11px] sm:text-xs font-mono uppercase tracking-[.13em] text-[#70e5f2]">{personalBio.subRole}</p>
          <p className="text-base sm:text-lg text-[#a0a8b4] max-w-xl leading-relaxed mb-8">
            {heroIntroduction}
          </p>

          <div className="flex flex-wrap gap-2.5 mb-8 text-[11px] font-mono text-[#9da6b2]">
            <span className="hero-meta"><MapPin className="w-3.5 h-3.5 text-[#2dd4bf]" />Lucknow, India</span>
            <span className="hero-meta"><Terminal className="w-3.5 h-3.5 text-[#2dd4bf]" />B.Tech CSE · PSIT, AKTU</span>
            <span className="hero-meta"><Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />2024—2028</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button type="button" onClick={() => scrollTo('projects')} className="hero-primary group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-md font-medium text-xs font-mono uppercase tracking-widest">
              <span>View projects</span><ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md bg-white/[0.035] hover:bg-white/[0.07] text-[#d7d9dc] border border-white/[0.1] hover:border-[#2dd4bf]/30 text-xs font-mono uppercase tracking-widest transition-all">
              <FileText className="w-4 h-4 text-[#2dd4bf]" />Resume
            </a>
            <button type="button" onClick={() => scrollTo('contact')} className="px-4 py-3 text-xs font-mono uppercase tracking-widest text-[#929ba7] hover:text-white transition-colors">Get in touch ↗</button>
          </div>
        </div>

        <div ref={sceneRef} onPointerDown={beginDrag} onPointerUp={endDrag} onLostPointerCapture={endDrag} onKeyDown={rotateWithKeyboard} data-cursor="DRAG" className="hero-art relative mx-auto w-full max-w-[490px] aspect-square" aria-label="Interactive neural sphere. Drag with a pointer or use arrow keys to rotate." role="group" tabIndex={0}>
          <div className="hero-orbit hero-orbit-outer" />
          <div className="hero-orbit hero-orbit-inner" />
          <div className="hero-orbit hero-orbit-core"><span /></div>
          <div className="hero-glow" />
          <div className="hero-system-card hero-card-main"><div className="flex items-center justify-between text-[10px] font-mono text-[#8d9aa7]"><span>SYSTEM / 01</span><span className="text-[#2dd4bf]">● ONLINE</span></div><div className="hero-card-mark"><Orbit strokeWidth={1.15} /></div><p className="font-mono text-xs text-[#d8dfdf]">Ideas into systems</p><div className="hero-signal"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div>
          <div className="hero-float hero-float-code"><Braces /><span>clean interfaces</span></div>
          <div className="hero-float hero-float-ai"><Cpu /><span>grounded AI</span></div>
          <div className="hero-float hero-float-data"><Database /><span>reliable data</span></div>
          <div className="hero-orbit-label label-top">ENGINEERING / 2026</div>
          <div className="hero-orbit-label label-bottom"><Workflow /> CONNECTED BY CURIOSITY</div>
        </div>
      </div>

      <div className="pt-8 flex items-center justify-between border-t border-white/[0.06] mt-10 text-xs font-mono text-[#7e8996]">
        <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]" /><span>01 / Base Camp · Selected work &amp; study</span></div>
          <button type="button" onClick={() => scrollTo('projects')} className="flex items-center gap-2 hover:text-[#c5e5df] transition-colors group" aria-label="Scroll to projects section"><span className="text-[10px] tracking-widest uppercase">Scroll to explore</span><ArrowDown className="w-3.5 h-3.5 text-[#2dd4bf]" /></button>
      </div>
    </section>
  );
};
