import React, { useState } from 'react';
import type { Project } from '../../types';
import { ProjectPreviewGraphic } from './ProjectPreviewGraphic';
import { ExternalLink, ChevronDown, ChevronUp, Cpu, CheckCircle } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [showArchitecture, setShowArchitecture] = useState(false);
  const isEven = index % 2 === 1;

  const isGold = project.accent === 'gold';
  const accentBorderHover = isGold
    ? 'hover:border-[#d4af37]/40 hover:shadow-[0_15px_40px_-15px_rgba(212,175,55,0.12)]'
    : 'hover:border-[#2dd4bf]/40 hover:shadow-[0_15px_40px_-15px_rgba(45,212,191,0.12)]';

  const accentTagStyle = isGold
    ? 'text-[#edd894] bg-[#d4af37]/10 border-[#d4af37]/25'
    : 'text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/25';

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty('--tilt-x', `${(0.5 - y) * 2.2}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${(x - 0.5) * 2.2}deg`);
    event.currentTarget.style.setProperty('--light-x', `${x * 100}%`);
    event.currentTarget.style.setProperty('--light-y', `${y * 100}%`);
  };

  const resetPointer = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <article
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      data-cursor="VIEW"
      className={`project-card group relative rounded-xl border border-white/[0.08] bg-[#0c0e14]/70 backdrop-blur-md p-6 sm:p-8 lg:p-10 transition-all duration-300 ${accentBorderHover}`}
    >
      <span className="project-card-light" aria-hidden="true" />
      {/* Subtle corner index label */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#8e95a2] tracking-widest">
            PROJECT / 0{index + 1}
          </span>
          <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded border ${accentTagStyle}`}>
            {project.category}
          </span>
        </div>

        {/* Metrics Pill */}
        {project.metrics && project.metrics[0] && (
          <span className="hidden sm:inline-flex text-[11px] font-mono text-[#8e95a2] bg-[#11141c] px-2.5 py-1 rounded border border-white/[0.05]">
            <span className="text-[#cfcac0] mr-1.5">{project.metrics[0].label}:</span>
            <span className={isGold ? 'text-[#edd894]' : 'text-[#2dd4bf]'}>
              {project.metrics[0].value}
            </span>
          </span>
        )}
      </div>

      {/* Main Content Layout: alternating on desktop */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
        {/* Left / Info Column (7 cols) */}
        <div className={`lg:col-span-7 flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#f4f1ea] mb-3 group-hover:text-[#edd894] transition-colors leading-tight">
              {project.name}
            </h3>

            <p className="text-xs sm:text-sm font-mono text-[#cfcac0] mb-4 tracking-tight">
              {project.tagline}
            </p>

            <p className="text-sm sm:text-base text-[#8e95a2] leading-relaxed mb-6 font-normal">
              {project.description}
            </p>

            {/* Engineering Highlights */}
            <div className="mb-6 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#cfcac0] block mb-2">
                System Highlights:
              </span>
              <ul className="space-y-1.5">
                {project.systemHighlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2 text-xs text-[#8e95a2] leading-relaxed">
                    <CheckCircle className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isGold ? 'text-[#d4af37]' : 'text-[#2dd4bf]'}`} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies Badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded text-[11px] font-mono bg-[#12151e] text-[#cfcac0] border border-white/[0.06] hover:border-white/[0.15] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons & Architecture Drawer Toggle */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.06]">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-mono uppercase tracking-wider text-[#f4f1ea] bg-[#141822] hover:bg-[#1a202d] border border-white/[0.09] hover:border-[#d4af37]/40 transition-all duration-200"
                aria-label={`View ${project.name} GitHub Repository`}
                data-magnetic="true"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub ↗</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-mono uppercase tracking-wider text-[#090a0d] bg-[#d4af37] hover:bg-[#e0c268] font-medium transition-all duration-200 shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                aria-label={`View ${project.name} Live Demo`}
                data-magnetic="true"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo ↗</span>
              </a>
            )}

            {project.architectureSnippet && (
              <button
                type="button"
                onClick={() => setShowArchitecture(!showArchitecture)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded text-xs font-mono text-[#8e95a2] hover:text-[#f4f1ea] transition-colors ml-auto cursor-pointer"
                aria-expanded={showArchitecture}
                data-magnetic="true"
              >
                <Cpu className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="text-[11px] uppercase tracking-wider">Architecture Flow</span>
                {showArchitecture ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {/* Expandable Architecture Pipeline Snippet */}
          {showArchitecture && project.architectureSnippet && (
            <div className="mt-4 p-4 rounded-lg bg-[#090b10] border border-[#d4af37]/20 transition-all text-xs font-mono">
              <span className="text-[11px] text-[#edd894] uppercase tracking-wider block mb-3 font-semibold">
                {project.architectureSnippet.title}
              </span>
              <ol className="space-y-2">
                {project.architectureSnippet.flow.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2.5 text-[#cfcac0]">
                    <span className="text-[#8e95a2] text-[10px] w-4 mt-0.5">0{sIdx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Right / Visual Preview Graphic Column (5 cols) */}
        <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="relative rounded-lg p-1 bg-gradient-to-b from-white/[0.08] to-transparent">
            <ProjectPreviewGraphic project={project} />
          </div>
        </div>
      </div>
    </article>
  );
};
