import React, { useState, useEffect, useRef } from 'react';
import type { Project } from '../../types';
import { X, ExternalLink, CheckCircle, ArrowRight, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';

interface ProjectCaseStudyModalProps {
  project: Project | null;
  projectIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  projectIndex,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);

  const selectedNode =
    project?.architectureFlow && project.architectureFlow.length > 0
      ? project.architectureFlow[selectedNodeIndex] ?? project.architectureFlow[0]
      : null;

  // Handle Escape key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const formattedIndex = String(projectIndex + 1).padStart(2, '0');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-[0_30px_70px_rgba(0,0,0,0.85)] p-6 sm:p-8 lg:p-10 text-left focus:outline-none"
        tabIndex={-1}
      >
        {/* Top Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-[var(--border)]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-2xl sm:text-3xl font-black text-[var(--accent-secondary)]">
                {formattedIndex}
              </span>
              <span className="chip text-[10px] font-mono tracking-wider uppercase text-[var(--accent-secondary)] border-[var(--border)]">
                {project.category}
              </span>
              <span className="hidden sm:inline text-xs font-mono text-[var(--text-2)]">
                // ARCHITECTURAL CASE STUDY
              </span>
            </div>
            <h2
              id="case-study-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[var(--text)] uppercase"
            >
              {project.name}
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-mono text-[var(--accent-secondary)]">
              {project.tagline}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-2)] hover:text-[var(--text)] hover:border-[var(--accent-secondary)] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Narrative Section: Problem vs Approach */}
        <div className="py-6 border-b border-[var(--border-subtle)] grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.problem && (
            <div className="p-4 sm:p-5 rounded-xl bg-[var(--surface-2)]/60 border border-[var(--border-subtle)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--text)]">
                  The Problem
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}

          {project.approach && (
            <div className="p-4 sm:p-5 rounded-xl bg-[var(--surface-2)]/60 border border-[var(--border-subtle)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--text)]">
                  The Engineering Approach
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
                {project.approach}
              </p>
            </div>
          )}
        </div>

        {/* Interactive Architecture Flow (Phase 10) */}
        {project.architectureFlow && project.architectureFlow.length > 0 && (
          <div className="py-6 border-b border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--accent-secondary)]" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--text)]">
                  Interactive Architecture Flow
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[var(--text-2)] hidden sm:inline">
                Hover or select a node to inspect
              </span>
            </div>

            {/* Desktop Horizontal Node Flow / Mobile Vertical Flow */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 p-3 rounded-xl bg-[var(--surface-2)]/50 border border-[var(--border-subtle)] overflow-x-auto">
              {project.architectureFlow.map((node, nIdx) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <React.Fragment key={node.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedNodeIndex(nIdx)}
                      onMouseEnter={() => setSelectedNodeIndex(nIdx)}
                      onFocus={() => setSelectedNodeIndex(nIdx)}
                      className={`flex-1 min-h-[52px] p-3 rounded-lg border text-left transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${
                        isSelected
                          ? 'bg-[var(--surface)] border-[var(--accent-secondary)] shadow-md ring-1 ring-[var(--accent-secondary)]/50'
                          : 'bg-[var(--surface)]/70 border-[var(--border-subtle)] hover:border-[var(--border)]'
                      }`}
                    >
                      <span className="text-[9px] font-mono tracking-wider uppercase text-[var(--accent-secondary)] block">
                        {node.type}
                      </span>
                      <span className="text-xs font-bold text-[var(--text)] block truncate">
                        {node.name}
                      </span>
                    </button>

                    {nIdx < (project.architectureFlow?.length ?? 0) - 1 && (
                      <div className="flex items-center justify-center text-[var(--text-2)]/50 md:rotate-0 rotate-90 my-1 md:my-0">
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Active Node Inspection Card */}
            {selectedNode && (
              <div className="mt-3 p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] shadow-sm flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border-subtle)] text-[var(--accent-secondary)] shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[var(--text)]">
                      {selectedNode.name}
                    </span>
                    <span className="chip text-[9px] py-0 px-2 font-mono">
                      {selectedNode.type}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-2)] leading-relaxed">
                    {selectedNode.detail}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Key Implementation Highlights */}
        <div className="py-6 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-[var(--accent-secondary)]" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--text)]">
              Key Engineering Implementation
            </h3>
          </div>

          <ul className="space-y-2.5 list-none p-0 m-0">
            {(project.keyImplementation || project.systemHighlights).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
                <CheckCircle className="w-4 h-4 text-[var(--accent-secondary)] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Applied */}
        <div className="py-6 border-b border-[var(--border-subtle)]">
          <span className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--text)] block mb-3">
            Technology Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="chip text-xs">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions: GitHub & Live Demo */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
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
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 text-[var(--text-2)]" />
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

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-xs font-mono text-[var(--text)] hover:border-[var(--accent-secondary)] transition-colors cursor-pointer"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
