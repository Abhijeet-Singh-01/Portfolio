import React, { useEffect, useState, useRef } from 'react';
import { projectsData } from '../../data/projects';
import { BEATS, getTimelineState } from '../../config/sceneTimeline';
import { experienceState } from '../../lib/experienceStore';
import { ExternalLink, CheckCircle, Cpu, X, Sparkles } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import { gsap } from 'gsap';

export const CinematicProjectHud: React.FC = () => {
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(-1);
  const [hudOpacity, setHudOpacity] = useState<number>(0);
  const [activeModalProject, setActiveModalProject] = useState<(typeof projectsData)[0] | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const hudContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animFrame = 0;
    const update = () => {
      const p = experienceState.scrollProgress;
      const state = getTimelineState(p, 0);

      // Determine project visibility and active index
      if (state.activeProjectIndex >= 0) {
        setActiveProjectIdx(state.activeProjectIndex);
        const opacity = state.projectVisibilities[state.activeProjectIndex] || 0;
        setHudOpacity(opacity);
      } else {
        setHudOpacity(0);
        if (state.activeProjectIndex === -1 && hudOpacity < 0.05) {
          setActiveProjectIdx(-1);
        }
      }
      animFrame = requestAnimationFrame(update);
    };
    animFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animFrame);
  }, [hudOpacity]);

  const openModal = (proj: (typeof projectsData)[0]) => {
    setActiveModalProject(proj);
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
    gsap.to(experienceState, {
      detailZoom: 1,
      duration: 0.8,
      ease: 'power3.out',
      overwrite: true,
    });
  };

  const closeModal = () => {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
    setActiveModalProject(null);
    gsap.to(experienceState, {
      detailZoom: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      overwrite: true,
    });
  };

  if (activeProjectIdx < 0 || hudOpacity < 0.05) return null;

  const project = projectsData[activeProjectIdx];
  if (!project) return null;

  const isLeftSlab = activeProjectIdx % 2 === 0;

  return (
    <aside
      ref={hudContainerRef}
      aria-label="Active Project HUD"
      className="fixed inset-0 pointer-events-none z-30 flex items-center justify-between p-6 sm:p-12 md:p-16 transition-opacity duration-300"
      style={{ opacity: hudOpacity }}
    >
      {/* HUD Layout Container: Aligns to Opposite Side of the 3D Artifact */}
      <div
        className={`w-full max-w-xl pointer-events-auto flex flex-col justify-center ${
          isLeftSlab ? 'ml-auto text-left' : 'mr-auto text-left'
        }`}
      >
        {/* Top Floating Badge Bar */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-display font-black text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-aqua">
            0{activeProjectIdx + 1}
          </span>
          <span className="text-[10px] font-mono text-border font-bold">/</span>
          <span className="text-[10px] font-mono text-text-2 tracking-widest uppercase">04</span>
          <span className="ml-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border border-accent-aqua/30 bg-surface/80 text-accent-aqua-ink font-semibold backdrop-blur-md">
            {project.category}
          </span>
        </div>

        {/* Project Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase text-text tracking-tight leading-none mb-3 drop-shadow-md">
          {project.name}
        </h2>

        {/* Tagline */}
        <p className="text-xs sm:text-sm font-mono text-accent-aqua-ink mb-4 font-medium tracking-tight">
          {project.tagline}
        </p>

        {/* Concise Description */}
        <p className="text-xs sm:text-sm text-text-2 leading-relaxed mb-5 font-sans max-w-lg">
          {project.description}
        </p>

        {/* Highlights Checklist */}
        <div className="mb-5 space-y-2">
          {project.systemHighlights.slice(0, 2).map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-text-2">
              <CheckCircle className="w-3.5 h-3.5 mt-0.5 text-accent-aqua-ink shrink-0" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        {/* Tech Chips */}
        <div className="flex flex-wrap gap-2 mb-6 max-w-md">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-surface/85 border border-border/20 text-text-2 backdrop-blur-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-1 text-[10px] font-mono text-text-2">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            data-magnetic
            onClick={() => openModal(project)}
            className="action-primary inline-flex min-h-10 items-center gap-2 rounded-full px-5 py-2 text-xs font-mono uppercase tracking-wider font-semibold bg-gradient-button text-text-on-accent shadow-md shadow-accent-indigo/25 hover:shadow-accent-indigo/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Explore Artifact</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-secondary inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-text bg-surface/80 border border-border/20 hover:border-accent-aqua/50 backdrop-blur-md transition-all cursor-pointer"
              aria-label={`View ${project.name} on GitHub (opens in new tab)`}
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source ↗</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-primary inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-text-on-accent bg-accent-aqua hover:bg-accent-aqua/90 font-medium transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live ↗</span>
            </a>
          )}
        </div>
      </div>

      {/* Modal Dialog for Artifact Full Inspection */}
      <dialog
        ref={dialogRef}
        className="fixed inset-0 m-auto z-50 p-6 sm:p-10 rounded-2xl bg-bg/95 backdrop-blur-2xl border border-border/20 text-text max-w-2xl w-[90vw] shadow-2xl pointer-events-auto"
        aria-labelledby="active-modal-title"
        onClose={closeModal}
      >
        {activeModalProject && (
          <div className="flex flex-col gap-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-border/15">
              <span className="text-[11px] uppercase tracking-widest text-accent-aqua-ink font-semibold">
                ARTIFACT SYSTEM INSPECTION
              </span>
              <button
                type="button"
                className="w-9 h-9 rounded-full border border-border/20 flex items-center justify-center text-text-2 hover:text-text hover:border-accent-magenta transition-colors cursor-pointer"
                onClick={closeModal}
                aria-label="Close project details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 id="active-modal-title" className="font-display font-extrabold uppercase text-2xl sm:text-3xl text-text tracking-tight">
              {activeModalProject.name}
            </h3>

            <p className="text-accent-aqua-ink tracking-wide font-medium">{activeModalProject.tagline}</p>
            <p className="text-text-2 leading-relaxed text-sm font-sans">{activeModalProject.description}</p>

            <h4 className="text-[11px] uppercase tracking-wider text-text font-semibold mt-2">
              System Highlights
            </h4>
            <ul className="space-y-1.5 list-none p-0 m-0 text-text-2">
              {activeModalProject.systemHighlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent-aqua-ink">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-[11px] uppercase tracking-wider text-text font-semibold mt-2">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeModalProject.technologies.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-full border border-border/20 bg-surface text-text-2 text-[10px]">
                  {t}
                </span>
              ))}
            </div>

            {activeModalProject.architectureSnippet && (
              <div className="mt-3 p-4 rounded-xl bg-surface/60 border border-border/15">
                <span className="text-[10px] text-accent-aqua-ink uppercase tracking-wider block mb-2 font-bold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{activeModalProject.architectureSnippet.title}</span>
                </span>
                <ol className="space-y-1 list-none p-0 m-0 text-text-2 text-[11px]">
                  {activeModalProject.architectureSnippet.flow.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent-aqua-ink font-bold">0{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="flex items-center gap-3 pt-4 border-t border-border/15 mt-2">
              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border/25 bg-surface text-xs text-text hover:border-accent-aqua/50"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Source code</span>
                </a>
              )}
              {activeModalProject.liveUrl && (
                <a
                  href={activeModalProject.liveUrl}
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
                onClick={closeModal}
                className="ml-auto text-text-2 hover:text-text uppercase tracking-widest text-[11px] cursor-pointer"
              >
                Close (Esc)
              </button>
            </div>
          </div>
        )}
      </dialog>
    </aside>
  );
};
