import React from 'react';
import { ArrowDown, ArrowRight, FileText, Sparkles, MapPin, Terminal } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex flex-col justify-between pt-36 pb-16 px-6 md:px-10 max-w-7xl mx-auto"
    >
      <div className="flex-1 flex flex-col justify-center max-w-4xl">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#d4af37]/25 bg-[#141720]/70 backdrop-blur-md w-fit mb-8 shadow-[0_0_15px_rgba(212,175,55,0.08)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5eead4] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2dd4bf]" />
          </span>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#edd894] font-medium">
            Available For Opportunities
          </span>
        </div>

        {/* Hero Heading: Large Editorial Typography */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-[#f4f1ea] leading-[1.08] mb-6">
          Hey, I&apos;m{' '}
          <span className="text-[#edd894] italic font-light font-serif decoration-[#d4af37]/40 underline-offset-8">
            Abhijeet.
          </span>
        </h1>

        {/* Subtitle / Positioning Tagline */}
        <p className="text-base sm:text-lg md:text-xl font-mono text-[#cfcac0] mb-6 tracking-tight flex flex-wrap items-center gap-y-1">
          <span>Computer Science Engineer</span>
          <span className="text-[#d4af37] mx-2.5 opacity-60">•</span>
          <span>Software Developer</span>
          <span className="text-[#2dd4bf] mx-2.5 opacity-60">•</span>
          <span>AI/ML Enthusiast</span>
        </p>

        {/* Short Editorial Introduction */}
        <p className="text-base sm:text-lg text-[#8e95a2] max-w-2xl leading-relaxed mb-10 font-normal">
          I build practical software systems and intelligent applications that combine strong engineering
          fundamentals with modern AI and web technologies. Focused on scalable backends, reliable data
          pipelines, and clean digital experiences.
        </p>

        {/* Context metadata tags */}
        <div className="flex flex-wrap items-center gap-3 mb-10 text-xs font-mono text-[#8e95a2]">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#11141a]/60 border border-white/[0.06]">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Lucknow, India</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#11141a]/60 border border-white/[0.06]">
            <Terminal className="w-3.5 h-3.5 text-[#2dd4bf]" />
            <span>B.Tech CSE @ PSIT, AKTU (2024–2028)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#11141a]/60 border border-white/[0.06]">
            <Sparkles className="w-3.5 h-3.5 text-[#edd894]" />
            <span>Core CS • AI Systems • Full Stack</span>
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            type="button"
            onClick={scrollToProjects}
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-md bg-[#d4af37] hover:bg-[#e0c268] text-[#08090b] font-medium text-xs font-mono uppercase tracking-widest transition-all duration-200 shadow-[0_0_20px_rgba(212,175,55,0.18)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] cursor-pointer"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-md bg-[#11141b]/80 hover:bg-[#161a23] text-[#f4f1ea] hover:text-[#edd894] border border-white/[0.1] hover:border-[#d4af37]/40 text-xs font-mono uppercase tracking-widest transition-all duration-200 backdrop-blur-sm cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#d4af37]" />
            <span>Download Resume</span>
          </a>

          <button
            type="button"
            onClick={scrollToContact}
            className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md text-xs font-mono uppercase tracking-widest text-[#8e95a2] hover:text-[#f4f1ea] transition-colors cursor-pointer"
          >
            <span>Get in Touch</span>
            <span className="text-[#d4af37] group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="pt-12 flex items-center justify-between border-t border-white/[0.05] mt-12 text-xs font-mono text-[#8e95a2]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/70" />
          <span>Curated Engineering Portfolio</span>
        </div>

        <button
          type="button"
          onClick={scrollToProjects}
          className="flex items-center gap-2 hover:text-[#edd894] transition-colors group cursor-pointer"
          aria-label="Scroll to Projects section"
        >
          <span className="text-[11px] tracking-widest uppercase">Explore Work</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#d4af37] animate-bounce" />
        </button>
      </div>
    </section>
  );
};
