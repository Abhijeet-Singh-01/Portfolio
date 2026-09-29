import React, { useState } from 'react';
import { projectsData } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import { Sparkles } from 'lucide-react';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = projectsData.filter((project) => {
    if (filter === 'all') return true;
    if (filter === 'ai') return project.technologies.some((t) => ['RAG', 'AI/LLM', 'AI', 'Machine Learning'].includes(t));
    if (filter === 'web') return project.technologies.some((t) => ['React', 'Node.js', 'Express'].includes(t));
    if (filter === 'systems') return project.accent === 'teal' || project.id === 'solisiq';
    return true;
  });

  return (
    <section id="projects" className="py-24 sm:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
              04 / Peak Challenges · Engineered Works
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#f4f1ea] tracking-tight">
            Selected Projects
          </h2>

          <p className="mt-3 text-base text-[#8e95a2] font-mono">
            Things I&apos;ve built, explored, and engineered.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'ai', label: 'AI & RAG Systems' },
            { id: 'web', label: 'Full-Stack Apps' },
            { id: 'systems', label: 'CleanTech & Analytics' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                filter === item.id
                  ? 'bg-[#d4af37]/15 text-[#edd894] border border-[#d4af37]/40 shadow-[0_0_12px_rgba(212,175,55,0.1)]'
                  : 'bg-[#11141c]/60 text-[#8e95a2] border border-white/[0.06] hover:text-[#f4f1ea] hover:border-white/[0.12]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-10 sm:space-y-12">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Engineering Note / Repository Link */}
      <div className="mt-14 p-6 rounded-xl border border-white/[0.06] bg-[#0c0e14]/50 backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-[#edd894]" />
          </div>
          <p className="text-xs font-mono text-[#8e95a2]">
            More open-source experiments, scripts, and algorithmic implementations are available on GitHub.
          </p>
        </div>
        <a
          href="https://github.com/abhijeetsingh"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono uppercase tracking-wider text-[#cfcac0] hover:text-[#edd894] inline-flex items-center gap-1.5 transition-colors shrink-0"
        >
          <span>Explore GitHub Profile</span>
          <span className="text-[#d4af37]">↗</span>
        </a>
      </div>
    </section>
  );
};
