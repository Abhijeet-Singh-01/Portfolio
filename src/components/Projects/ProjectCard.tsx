import React from 'react';
import type { Project } from '../../types';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const formattedIndex = String(index + 1).padStart(2, '0');

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = (-y * 7).toFixed(2);
    const ry = (x * 7).toFixed(2);
    const gx = `${Math.round((x + 0.5) * 100)}%`;
    const gy = `${Math.round((y + 0.5) * 100)}%`;

    e.currentTarget.style.setProperty('--card-rx', `${rx}deg`);
    e.currentTarget.style.setProperty('--card-ry', `${ry}deg`);
    e.currentTarget.style.setProperty('--card-gx', gx);
    e.currentTarget.style.setProperty('--card-gy', gy);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty('--card-rx', '0deg');
    e.currentTarget.style.setProperty('--card-ry', '0deg');
  };

  return (
    <article
      className="card-base card-3d p-6 sm:p-8 flex flex-col justify-between reveal-item"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div>
        {/* Header: Number & Category */}
        <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-[var(--accent-secondary)]">
              {formattedIndex}
            </span>
            <span className="text-[var(--text-2)] text-xs font-mono">/ 04</span>
          </div>

          <span className="chip text-[11px] font-medium text-[var(--accent-secondary)] border-[var(--border)]">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] tracking-tight mb-2">
          {project.name}
        </h3>

        {/* Tagline / Subtitle */}
        {project.tagline && (
          <p className="text-xs font-mono text-[var(--text-2)] mb-3">
            {project.tagline}
          </p>
        )}

        {/* Description */}
        <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed mb-5">
          {project.description}
        </p>

        {/* System Highlights */}
        {project.systemHighlights && project.systemHighlights.length > 0 && (
          <div className="mb-5 space-y-1.5">
            <span className="text-xs font-mono text-[var(--text)] font-semibold block mb-2">
              Key Highlights:
            </span>
            <ul className="space-y-1.5 list-none p-0 m-0">
              {project.systemHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-[var(--accent-secondary)] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons: Only show when a real URL exists */}
      {(project.githubUrl || project.liveUrl) ? (
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
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
      ) : null}
    </article>
  );
};
