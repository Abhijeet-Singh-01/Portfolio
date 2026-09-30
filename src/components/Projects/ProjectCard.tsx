import React, { useEffect, useRef, useState } from 'react';
import type { Project } from '../../types';
import { ProjectPreviewGraphic } from './ProjectPreviewGraphic';
import { ExternalLink, ChevronDown, ChevronUp, Cpu, CheckCircle, X } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import { experienceConfig } from '../../config/experienceConfig';
import { experienceState } from '../../lib/experienceStore';
import { gsap } from 'gsap';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [showArchitecture, setShowArchitecture] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isEven = index % 2 === 1;

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty('--tilt-x', `${(0.5 - y) * experienceConfig.projects.tiltDegrees}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${(x - 0.5) * experienceConfig.projects.tiltDegrees}deg`);
    event.currentTarget.style.setProperty('--light-x', `${x * 100}%`);
    event.currentTarget.style.setProperty('--light-y', `${y * 100}%`);
  };

  const resetPointer = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
    if (!dialogRef.current?.open && experienceState.activeProject === index) experienceState.activeProject = -1;
  };

  const openDetails = () => {
    experienceState.activeProject = index;
    if (dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
    gsap.to(experienceState, { detailZoom: 1, duration: experienceConfig.motion.cameraDiveDuration, ease: 'power3.out', overwrite: true });
  };

  const closeDetails = () => {
    experienceState.activeProject = -1;
    gsap.to(experienceState, { detailZoom: 0, duration: experienceConfig.motion.cameraDiveDuration, ease: 'power2.inOut', overwrite: true });
  };

  useEffect(() => () => {
    if (experienceState.activeProject === index) experienceState.activeProject = -1;
    experienceState.detailZoom = 0;
  }, [index]);

  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = articleRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            experienceState.activeProject = index;
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-12% 0px -12% 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <article
      ref={articleRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      onPointerEnter={() => { experienceState.activeProject = index; }}
      data-cursor="VIEW"
      className="project-card group relative rounded-2xl border border-border/15 bg-surface-glass backdrop-blur-xl p-6 sm:p-10 lg:p-12 transition-all duration-300 hover:border-accent-aqua/40 hover:shadow-[0_20px_60px_-15px_var(--accent-aqua-glow)]"
    >
      <span className="project-card-light" aria-hidden="true" />

      {/* Top Header: Giant Gradient Number + Category Tag */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/10">
        <div className="flex items-baseline gap-4">
          <span className="font-display font-black text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-aqua opacity-80 group-hover:opacity-100 transition-opacity">
            0{index + 1}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-accent-aqua/30 bg-accent-aqua/10 text-accent-aqua-ink font-medium">
            {project.category}
          </span>
        </div>

        {/* Metric Chip */}
        {project.metrics && project.metrics[0] && (
          <span className="hidden sm:inline-flex text-[11px] font-mono text-text-2 bg-surface/80 px-3 py-1 rounded-full border border-border/15">
            <span className="text-text-2 mr-1.5">{project.metrics[0].label}:</span>
            <span className="text-accent-aqua-ink font-semibold">{project.metrics[0].value}</span>
          </span>
        )}
      </div>

      {/* Main Content Layout */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
        {/* Info Column */}
        <div className={`lg:col-span-7 flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold uppercase text-text mb-3 group-hover:text-accent-aqua-ink transition-colors leading-tight tracking-tight">
              {project.name}
            </h3>

            <p className="text-xs sm:text-sm font-mono text-text-2 mb-4 tracking-tight">
              {project.tagline}
            </p>

            <p className="text-sm sm:text-base text-text-2 leading-relaxed mb-6 font-normal">
              {project.description}
            </p>

            {/* Highlights */}
            <div className="mb-6 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-accent-aqua-ink block mb-2 font-semibold">
                SYSTEM HIGHLIGHTS:
              </span>
              <ul className="space-y-2 list-none p-0 m-0">
                {project.systemHighlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2.5 text-xs text-text-2 leading-relaxed">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-accent-aqua-ink shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-[11px] font-mono bg-surface border border-border/20 text-text-2 hover:border-accent-aqua/40 hover:text-text transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/10">
            <button
              type="button"
              data-magnetic
              onClick={openDetails}
              className="action-primary inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold bg-gradient-button text-text-on-accent shadow-md shadow-accent-indigo/25 hover:shadow-accent-indigo/40 hover:scale-105 active:scale-95 transition-all"
              aria-haspopup="dialog"
            >
              <span>Explore Details</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </button>

            {/* Hide empty button if URL is undefined */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-secondary inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider text-text bg-surface border border-border/20 hover:border-accent-aqua/50 transition-all duration-200"
                aria-label={`View ${project.name} source code on GitHub (opens in new tab)`}
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source Code ↗</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider text-text-on-accent bg-accent-aqua hover:bg-accent-aqua/90 font-medium transition-all duration-200"
                aria-label={`View ${project.name} live demo (opens in new tab)`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo ↗</span>
              </a>
            )}

            {project.architectureSnippet && (
              <button
                type="button"
                onClick={() => setShowArchitecture(!showArchitecture)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-mono text-text-2 hover:text-text transition-colors ml-auto cursor-pointer"
                aria-expanded={showArchitecture}
              >
                <Cpu className="w-3.5 h-3.5 text-accent-aqua-ink" />
                <span className="text-[11px] uppercase tracking-wider">Flow</span>
                {showArchitecture ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {/* Architecture Pipeline Drawer */}
          {showArchitecture && project.architectureSnippet && (
            <div className="mt-4 p-5 rounded-xl bg-surface border border-accent-aqua/30 transition-all text-xs font-mono">
              <span className="text-[11px] text-accent-aqua-ink uppercase tracking-wider block mb-3 font-semibold">
                {project.architectureSnippet.title}
              </span>
              <ol className="space-y-2 list-none p-0 m-0">
                {project.architectureSnippet.flow.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2.5 text-text-2">
                    <span className="text-accent-aqua-ink text-[10px] w-5 mt-0.5 font-bold">0{sIdx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Visual Preview Graphic Column */}
        <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="relative rounded-xl p-1 bg-gradient-to-b from-surface/20 to-transparent">
            <ProjectPreviewGraphic project={project} />
          </div>
        </div>
      </div>

      {/* Dive-in Detail Modal Dialog */}
      <dialog
        ref={dialogRef}
        className="project-detail-dialog fixed inset-0 m-auto z-50 p-6 sm:p-10 rounded-2xl bg-bg/95 backdrop-blur-2xl border border-border/20 text-text max-w-2xl w-[90vw] shadow-2xl"
        aria-labelledby={`project-detail-${project.id}`}
        onClose={closeDetails}
      >
        <div className="project-detail-content flex flex-col gap-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-border/15">
            <p className="text-[11px] uppercase tracking-widest text-accent-aqua-ink font-semibold">
              PROJECT / 0{index + 1}
            </p>
            <button
              type="button"
              className="w-9 h-9 rounded-full border border-border/20 flex items-center justify-center text-text-2 hover:text-text hover:border-accent-magenta transition-colors"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close project details"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 id={`project-detail-${project.id}`} className="font-display font-extrabold uppercase text-2xl sm:text-3xl tracking-tight text-text">
            {project.name}
          </h3>

          <p className="text-accent-aqua-ink tracking-wide font-medium">{project.tagline}</p>
          <p className="text-text-2 leading-relaxed text-sm">{project.description}</p>

          <h4 className="text-[11px] uppercase tracking-wider text-text font-semibold mt-2">
            System Highlights
          </h4>
          <ul className="space-y-1.5 list-none p-0 m-0 text-text-2">
            {project.systemHighlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="text-accent-aqua-ink">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <h4 className="text-[11px] uppercase tracking-wider text-text font-semibold mt-2">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span key={technology} className="px-2.5 py-1 rounded-full border border-border/20 bg-surface text-text-2 text-[10px]">
                {technology}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-border/15 mt-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border/25 bg-surface text-xs text-text hover:border-accent-aqua/50"
              >
                <span>Source code</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent-aqua text-text-on-accent text-xs font-semibold"
              >
                <span>Live demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="ml-auto text-text-2 hover:text-text uppercase tracking-widest text-[11px]"
            >
              Close (Esc)
            </button>
          </div>
        </div>
      </dialog>
    </article>
  );
};
