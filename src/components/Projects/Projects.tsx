import React from 'react';
import { projectsData } from '../../data/projects';
import { ProjectChapter } from './ProjectChapter';
import { siteLinks } from '../../data/socialLinks';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Cinematic Section Header */}
      <div className="mb-14 sm:mb-20">
        <span className="section-eyebrow">
          01 // SELECTED WORK
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text)] mb-4 uppercase leading-[1.05]">
          The Work.
        </h2>
        <p className="section-subtitle">
          Engineered systems spanning AI incident triage, solar analytics, high-throughput media delivery, and real-time state machines.
        </p>
      </div>

      {/* Sequential Cinematic Project Chapters */}
      <div className="space-y-6 sm:space-y-10">
        {projectsData.map((project, index) => (
          <ProjectChapter key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* GitHub Repository Banner */}
      <div className="mt-16 p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent-secondary)] block mb-1">
            OPEN SOURCE CODEBASE
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--text)] mb-1">
            Explore additional repositories &amp; algorithms
          </h4>
          <p className="text-xs sm:text-sm text-[var(--text-2)] max-w-xl">
            View course laboratories, data structures implementations, and experiments on my GitHub profile.
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
