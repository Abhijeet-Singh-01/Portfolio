import React, { useRef } from 'react';
import type { Project } from '../../types';
import { ProjectVisual } from './ProjectVisual';
import { ExternalLink, CheckCircle, Layers } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';

interface ProjectChapterProps {
  project: Project;
  index: number;
  isActive: boolean;
  onOpenCaseStudy?: (project: Project) => void;
}

export const ProjectChapter: React.FC<ProjectChapterProps> = ({
  project,
  index,
  isActive,
  onOpenCaseStudy,
}) => {
  const visualRef = useRef<HTMLDivElement>(null);
  const formattedIndex = String(index + 1).padStart(2, '0');
  const isEven = index % 2 === 1;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!visualRef.current) return;

    const rect = visualRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Subtle 3-4 degree maximum rotation
    const rx = (-y * 7).toFixed(2);
    const ry = (x * 7).toFixed(2);
    const gx = `${Math.round((x + 0.5) * 100)}%`;
    const gy = `${Math.round((y + 0.5) * 100)}%`;

    visualRef.current.style.setProperty('--pvis-rx', `${rx}deg`);
    visualRef.current.style.setProperty('--pvis-ry', `${ry}deg`);
    visualRef.current.style.setProperty('--pvis-gx', gx);
    visualRef.current.style.setProperty('--pvis-gy', gy);
  };

  const handlePointerLeave = () => {
    if (!visualRef.current) return;
    visualRef.current.style.setProperty('--pvis-rx', '0deg');
    visualRef.current.style.setProperty('--pvis-ry', '0deg');
  };

  return (
    <article
      id={`project-chapter-${project.id}`}
      data-project-id={project.id}
      className={`project-chapter project-chapter-stage relative py-12 sm:py-20 lg:py-28 border-b border-[var(--border-subtle)] last:border-b-0 ${
        isActive ? 'chapter-active' : 'chapter-subordinate'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Text & Metadata Column */}
        <div
          className={`flex flex-col items-start ${
            isEven ? 'lg:col-span-5 lg:order-2' : 'lg:col-span-5 lg:order-1'
          }`}
        >
          {/* Project Large Number & Category */}
          <div className="flex items-baseline justify-between w-full mb-3">
            <span
              aria-hidden="true"
              className={`font-mono text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter select-none transition-colors duration-500 ${
                isActive ? 'text-[var(--accent-secondary)]' : 'text-[var(--text-2)]/70'
              }`}
            >
              {formattedIndex}
            </span>

            <span className="chip text-[11px] font-mono tracking-wider uppercase text-[var(--accent-secondary)] border-[var(--border)]">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--text)] mb-2 leading-tight">
            {project.name}
          </h3>

          {/* Tagline */}
          {project.tagline && (
            <p className="text-xs sm:text-sm font-mono text-[var(--accent-secondary)] mb-4">
              {project.tagline}
            </p>
          )}

          {/* Description */}
          <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed mb-6">
            {project.description}
          </p>

          {/* System Highlights */}
          {project.systemHighlights && project.systemHighlights.length > 0 && (
            <div className="mb-6 space-y-2 w-full">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text)] block mb-2">
                Engineering Highlights:
              </span>
              <ul className="space-y-2 list-none p-0 m-0">
                {project.systemHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-[var(--accent-secondary)] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Chips */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons: Architecture Case Study + Verified URLs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.architectureFlow && project.architectureFlow.length > 0 && (
              <button
                type="button"
                onClick={() => onOpenCaseStudy?.(project)}
                className="btn-secondary text-xs inline-flex items-center gap-2 group cursor-pointer"
                aria-label={`Inspect ${project.name} architecture and case study`}
              >
                <Layers className="w-3.5 h-3.5 text-[var(--accent-secondary)] transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                <span>Architecture &amp; Case Study</span>
              </button>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs"
                aria-label={`View ${project.name} source code on GitHub (opens in new tab)`}
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs"
                aria-label={`View ${project.name} live demo (opens in new tab)`}
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Visual Abstract Metaphor Column */}
        <div
          className={`w-full ${
            isEven ? 'lg:col-span-7 lg:order-1' : 'lg:col-span-7 lg:order-2'
          }`}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div
            ref={visualRef}
            onClick={() => onOpenCaseStudy?.(project)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenCaseStudy?.(project);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Inspect interactive architecture for ${project.name}`}
            className="project-visual-3d transition-transform duration-300 ease-out will-change-transform relative group/vis cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] rounded-2xl"
          >
            <ProjectVisual projectId={project.id} projectName={project.name} isActive={isActive} />

            {/* Subtle hover prompt pill on desktop */}
            <div className="absolute bottom-4 right-4 z-20 hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--border)] text-[11px] font-mono text-[var(--text-2)] shadow-md opacity-75 group-hover/vis:opacity-100 transition-opacity">
              <Layers className="w-3.5 h-3.5 text-[var(--accent-secondary)]" aria-hidden="true" />
              <span>Inspect Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
