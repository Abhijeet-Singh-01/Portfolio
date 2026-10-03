import React from 'react';
import { projectsData } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import { siteLinks } from '../../data/socialLinks';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-12 sm:mb-16">
        <span className="section-eyebrow">
          01 // Projects
        </span>
        <h2 className="section-title">
          Featured Work
        </h2>
        <p className="section-subtitle">
          Real projects focused on full-stack architecture, backend APIs, and AI/ML engineering.
        </p>
      </div>

      {/* Projects Grid: 1 col mobile, 2 cols desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* GitHub Repository Footer Note */}
      <div className="mt-12 p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-[var(--text)] mb-1">
            Explore more repositories
          </h4>
          <p className="text-xs sm:text-sm text-[var(--text-2)]">
            Explore additional coursework, algorithms, and experiments on my GitHub profile.
          </p>
        </div>

        <a
          href={siteLinks.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-xs shrink-0"
        >
          <GithubIcon className="w-4 h-4" />
          <span>GitHub Profile</span>
          <ExternalLink className="w-3.5 h-3.5 ml-0.5 text-[var(--text-2)]" />
        </a>
      </div>
    </section>
  );
};
