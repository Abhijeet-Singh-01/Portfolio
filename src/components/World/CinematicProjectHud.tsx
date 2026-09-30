import React, { useEffect, useState, useRef } from 'react';
import { projectsData } from '../../data/projects';
import { getTimelineState } from '../../config/sceneTimeline';
import { experienceState } from '../../lib/experienceStore';
import { ExternalLink, CheckCircle, Cpu, X, ArrowRight, Layers } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import { gsap } from 'gsap';

export const CinematicProjectHud: React.FC = () => {
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(-1);
  const [hudOpacity, setHudOpacity] = useState<number>(0);
  const [activeModalProject, setActiveModalProject] = useState<(typeof projectsData)[0] | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const hudContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let animFrame = 0;
    const update = () => {
      const p = experienceState.scrollProgress;
      const state = getTimelineState(p, 0);

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

  // On desktop: align opposite to project 3D coordinate (P0 & P2 on left -> HUD on right; P1 & P3 on right -> HUD on left)
  const isLeftPlacement = activeProjectIdx % 2 === 0;

  return (
    <>
      <aside
        ref={hudContainerRef}
        aria-label="Active Project Inspection HUD"
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300"
        style={{ opacity: hudOpacity }}
      >
        {/* DESKTOP VIEWPORT HUD (Positioned Asymmetrically Opposite to 3D Artifact) */}
        {!isMobile && (
          <div className="w-full h-full flex items-center p-8 lg:p-16">
            <div
              className={`w-full max-w-xl pointer-events-auto flex flex-col justify-center ${
                isLeftPlacement ? 'ml-auto text-left pl-6' : 'mr-auto text-left pr-6'
              }`}
            >
              {/* Kicker badge line */}
              <div className="flex items-center gap-3 mb-3">
                <span className="font-display font-black text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-aqua">
                  0{activeProjectIdx + 1}
                </span>
                <span className="text-xs font-mono text-border font-bold">/</span>
                <span className="text-xs font-mono text-text-2 tracking-widest uppercase">04</span>
                <span className="ml-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border border-accent-aqua/30 bg-surface/85 text-accent-aqua-ink font-semibold backdrop-blur-md shadow-[0_0_12px_rgba(34,211,238,0.15)]">
                  {project.category}
                </span>
              </div>

              {/* Display Title */}
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-extrabold uppercase text-text tracking-tight leading-[1.08] mb-3 drop-shadow-md">
                {project.name}
              </h2>

              {/* Verified Tagline */}
              <p className="text-xs lg:text-sm font-mono text-accent-aqua-ink font-medium mb-3 tracking-wide">
                {project.tagline}
              </p>

              {/* Verified Summary */}
              <p className="text-xs lg:text-sm text-text-2 font-sans leading-relaxed mb-5 max-w-lg bg-surface/75 p-4 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
                {project.description}
              </p>

              {/* Tech stack chips */}
              <div className="flex flex-wrap gap-1.5 mb-6 max-w-lg">
                {project.technologies.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-[10px] font-mono border border-border/40 bg-surface-glass text-text-2 font-medium backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 6 && (
                  <span className="px-2 py-1 rounded-md text-[10px] font-mono border border-border/20 text-text-2/70">
                    +{project.technologies.length - 6} more
                  </span>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => openModal(project)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider bg-accent-indigo text-white font-semibold hover:bg-accent-violet transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(124,108,255,0.35)]"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Inspect Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.name} source code on GitHub`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider border border-border/40 bg-surface/75 text-text hover:text-accent-aqua-ink hover:border-accent-aqua/40 transition-colors backdrop-blur-md"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View live demo for ${project.name}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider border border-border/40 bg-surface/75 text-text hover:text-accent-aqua-ink hover:border-accent-aqua/40 transition-colors backdrop-blur-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MOBILE VIEWPORT HUD (Docked at Bottom, Leaving Upper 60% Clear for 3D Artifact) */}
        {isMobile && (
          <div className="fixed bottom-0 inset-x-0 p-4 pb-6 pointer-events-auto">
            <div className="w-full max-w-md mx-auto p-4 rounded-2xl bg-surface/90 border border-white/15 backdrop-blur-xl shadow-2xl">
              {/* Header line */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-accent-indigo to-accent-aqua">
                    0{activeProjectIdx + 1}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider border border-accent-aqua/30 bg-surface text-accent-aqua-ink font-semibold">
                    {project.category}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => openModal(project)}
                  className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-accent-indigo text-white font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Title */}
              <h2 className="text-lg font-display font-bold uppercase text-text tracking-tight leading-tight mb-1 truncate">
                {project.name}
              </h2>

              {/* Short summary */}
              <p className="text-xs text-text-2 line-clamp-2 leading-relaxed mb-3">
                {project.description}
              </p>

              {/* Tech chips & links */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/20">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[9px] font-mono border border-border/30 text-text-2 bg-surface"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg border border-border/30 text-text hover:text-accent-aqua-ink shrink-0"
                    aria-label="GitHub Repository"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Accessible Detail Inspection Modal Dialog */}
      <dialog
        ref={dialogRef}
        onClose={closeModal}
        className="project-detail-dialog fixed inset-0 m-auto bg-surface border border-border/40 rounded-2xl p-0 text-text shadow-2xl backdrop:bg-bg/80 backdrop:backdrop-blur-md z-50 max-w-2xl w-[92vw] max-h-[85vh] overflow-hidden"
      >
        {activeModalProject && (
          <div className="flex flex-col h-full max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-border/20 flex items-center justify-between sticky top-0 bg-surface/95 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest border border-accent-aqua/40 bg-accent-aqua/10 text-accent-aqua-ink font-semibold">
                  {activeModalProject.category}
                </span>
                <span className="text-xs font-mono text-text-2">
                  System Architecture · 0{activeProjectIdx + 1}
                </span>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="w-8 h-8 rounded-full border border-border/30 flex items-center justify-center text-text-2 hover:text-text hover:border-accent-aqua/50 transition-colors cursor-pointer"
                aria-label="Close Inspection Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-text mb-2">
                  {activeModalProject.name}
                </h3>
                <p className="text-sm font-mono text-accent-aqua-ink">
                  {activeModalProject.tagline}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-text-2 mb-2">Overview</h4>
                <p className="text-sm text-text-2 leading-relaxed bg-surface-2/60 p-4 rounded-xl border border-border/15">
                  {activeModalProject.description}
                </p>
              </div>

              {/* Key Features from Resume */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-text-2 mb-3">
                  Verified Technical Pipeline & Features
                </h4>
                <ul className="space-y-2.5">
                  {(activeModalProject.systemHighlights || []).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-text-2 leading-relaxed">
                      <CheckCircle className="w-3.5 h-3.5 text-accent-aqua-ink shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-text-2 mb-2 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-accent-indigo" />
                  <span>Engineering Stack</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-md text-xs font-mono border border-border/30 bg-surface/75 text-text-2 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-border/20 flex items-center justify-between bg-surface/95 backdrop-blur-md">
              <span className="text-[11px] font-mono text-text-2">
                Verified fact from public/resume.pdf
              </span>
              <div className="flex items-center gap-3">
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border border-border/40 text-text hover:text-accent-aqua-ink transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider bg-accent-indigo text-white font-semibold hover:bg-accent-violet transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border border-border/30 text-text-2 hover:text-text cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
};
