import React from 'react';
import type { Project } from '../../types';

interface ProjectChapterNavProps {
  projects: Project[];
  activeProjectId: string;
  isVisible: boolean;
  onSelectProject: (id: string) => void;
}

export const ProjectChapterNav: React.FC<ProjectChapterNavProps> = ({
  projects,
  activeProjectId,
  isVisible,
  onSelectProject,
}) => {
  if (!isVisible) return null;

  const activeIndex = projects.findIndex((p) => p.id === activeProjectId);
  const currentNum = String(activeIndex + 1).padStart(2, '0');
  const totalNum = String(projects.length).padStart(2, '0');

  return (
    <nav
      aria-label="Projects chapter navigation"
      className="fixed bottom-6 right-4 sm:right-8 z-40 flex items-center gap-2 p-1.5 sm:p-2 rounded-full bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--border)] shadow-xl transition-all duration-300 animate-fadeIn select-none"
    >
      {/* Chapter Counter Badge */}
      <div className="px-2 sm:px-2.5 py-1 rounded-full bg-[var(--surface-2)] text-[10px] sm:text-xs font-mono font-bold text-[var(--accent-secondary)] flex items-center gap-1">
        <span>{currentNum}</span>
        <span className="text-[var(--text-2)]/50">/</span>
        <span className="text-[var(--text-2)]">{totalNum}</span>
      </div>

      {/* Chapter Indicator Dots */}
      <div className="flex items-center gap-1.5 px-1">
        {projects.map((p, idx) => {
          const isActive = p.id === activeProjectId;
          const num = String(idx + 1).padStart(2, '0');
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectProject(p.id)}
              aria-label={`Jump to project ${num}: ${p.name}`}
              className={`min-h-[32px] min-w-[32px] sm:min-h-[36px] sm:min-w-[36px] rounded-full flex items-center justify-center transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${
                isActive
                  ? 'bg-[var(--accent-secondary)] text-[var(--bg)] font-bold text-[10px] scale-105 shadow-sm'
                  : 'text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] text-[9px] font-mono'
              }`}
            >
              {num}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
