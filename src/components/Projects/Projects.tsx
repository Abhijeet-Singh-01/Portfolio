import React, { useState } from 'react';
import { projectsData } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import { Sparkles } from 'lucide-react';
import { siteLinks } from '../../data/socialLinks';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = projectsData.filter((project) => {
    if (filter === 'all') return true;
    if (filter === 'ai') return project.technologies.some((t) => ['RAG', 'AI/LLM', 'AI', 'Machine Learning'].includes(t));
    if (filter === 'web') return project.technologies.some((t) => ['React.js', 'Node.js', 'Express.js', 'HTML', 'CSS', 'JavaScript'].includes(t));
    if (filter === 'systems') return project.id === 'solisiq';
    return true;
  });

  return (
    <section id="projects" className="py-24 sm:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-border/15">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent-aqua animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent-aqua-ink font-semibold">
              02 / WORK · SELECTED PROJECTS
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase text-text tracking-tight leading-none">
            FEATURED WORK
          </h2>

          <p className="mt-3 text-sm sm:text-base text-text-2 font-mono">
            Full-stack engineering, AI/ML pipelines, and telemetry systems.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'ai', label: 'AI & RAG Systems' },
            { id: 'web', label: 'Full-Stack' },
            { id: 'systems', label: 'CleanTech' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                filter === item.id
                  ? 'bg-accent-aqua/15 text-accent-aqua-ink border border-accent-aqua/40 shadow-[0_0_12px_var(--accent-aqua-glow)] font-semibold'
                  : 'bg-surface/60 text-text-2 border border-border/15 hover:text-text hover:border-accent-aqua/30'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Glass Slabs */}
      <div className="space-y-12 sm:space-y-16">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Repository Note */}
      <div className="mt-14 p-6 rounded-2xl border border-border/15 bg-surface-glass backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent-aqua/10 border border-accent-aqua/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-accent-aqua-ink" />
          </div>
          <p className="text-xs font-mono text-text-2">
            Verified projects from resume. Source code links shown where publicly available.
          </p>
        </div>
        <a
          href={siteLinks.github.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={siteLinks.github.accessibilityLabel}
          className="text-xs font-mono uppercase tracking-wider text-text hover:text-accent-aqua-ink inline-flex items-center gap-2 transition-colors shrink-0 px-4 py-2 rounded-full border border-border/20 bg-surface/60 hover:border-accent-aqua/40"
        >
          <span>GitHub Profile</span>
          <span className="text-accent-aqua-ink">↗</span>
        </a>
      </div>
    </section>
  );
};
