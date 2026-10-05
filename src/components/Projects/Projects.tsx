import React, { useState, useEffect } from 'react';
import type { Project } from '../../types';
import { projectsData } from '../../data/projects';
import { ProjectChapter } from './ProjectChapter';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';
import { ProjectChapterNav } from './ProjectChapterNav';
import { siteLinks } from '../../data/socialLinks';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';

export const Projects: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string>(projectsData[0].id);
  const [isWorkActive, setIsWorkActive] = useState<boolean>(true);
  const [isProjectsSectionVisible, setIsProjectsSectionVisible] = useState<boolean>(false);
  const [selectedCaseStudyProject, setSelectedCaseStudyProject] = useState<Project | null>(null);

  // Multi-threshold IntersectionObserver for cinematic scroll choreography
  // Tracks active project chapter and THE WORK portal without continuous scroll listeners or RAF loops
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    // Track active project chapters
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-project-id');
            if (id) {
              setActiveProjectId(id);
            }
          }
        });
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: '-18% 0px -32% 0px',
      }
    );

    const chapterElements = document.querySelectorAll('.project-chapter');
    chapterElements.forEach((el) => observer.observe(el));

    // Track THE WORK transition portal
    let workObserver: IntersectionObserver | null = null;
    const workTransitionEl = document.getElementById('the-work-transition');
    if (workTransitionEl) {
      workObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsWorkActive(entry.isIntersecting);
          });
        },
        { threshold: 0.15, rootMargin: '-10% 0px -10% 0px' }
      );
      workObserver.observe(workTransitionEl);
    }

    // Track overall projects section visibility for floating chapter HUD
    let sectionObserver: IntersectionObserver | null = null;
    const projectsSectionEl = document.getElementById('projects');
    if (projectsSectionEl) {
      sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsProjectsSectionVisible(entry.isIntersecting);
          });
        },
        { threshold: 0.05, rootMargin: '-5% 0px -5% 0px' }
      );
      sectionObserver.observe(projectsSectionEl);
    }

    return () => {
      observer.disconnect();
      if (workObserver) workObserver.disconnect();
      if (sectionObserver) sectionObserver.disconnect();
    };
  }, []);

  const handleSelectProject = (id: string) => {
    setActiveProjectId(id);
    const el = document.getElementById(`project-chapter-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const selectedProjectIndex = selectedCaseStudyProject
    ? projectsData.findIndex((p) => p.id === selectedCaseStudyProject.id)
    : 0;

  return (
    <section id="projects" className="py-20 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Full-screen Cinematic Chapter Transition: THE WORK. */}
      <div
        id="the-work-transition"
        className={`the-work-stage min-h-[80svh] sm:min-h-[90svh] flex flex-col justify-center mb-16 sm:mb-24 border-b border-[var(--border)] pb-12 sm:pb-20 transition-all duration-700 ease-out select-none ${
          isWorkActive ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.98]'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-secondary)] animate-pulse" aria-hidden="true" />
          <span className="text-xs sm:text-sm font-mono tracking-widest text-[var(--accent-secondary)] uppercase">
            // 01 · CURATED ARCHITECTURES &amp; SYSTEMS
          </span>
        </div>

        <h2 className="the-work-title-3d text-6xl sm:text-8xl md:text-9xl lg:text-[clamp(6.5rem,14vw,12.5rem)] font-black tracking-tighter text-[var(--text)] uppercase leading-[0.88] select-none">
          <span className="work-line-the">THE</span> <br />
          <span className="work-line-work text-transparent bg-clip-text bg-gradient-to-r from-[var(--text)] via-[var(--text)] to-[var(--accent-secondary)]">
            WORK.
          </span>
        </h2>

        <p className="mt-8 text-base sm:text-xl text-[var(--text-2)] max-w-2xl leading-relaxed">
          Engineering implementations spanning AI-powered solar analytics &amp; advisory, machine learning incident root-cause triage, and spatial emergency response coordination.
        </p>

        {/* Live Active Chapter Tracker Badge & Stage Prompt */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-xs font-mono text-[var(--text-2)]">
            <span className="text-[var(--accent-secondary)] font-semibold">STAGE:</span>
            <span>{projectsData.find((p) => p.id === activeProjectId)?.name}</span>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-2)]/70">
            <span>01 — {String(projectsData.length).padStart(2, '0')} / CHRONOLOGY</span>
          </div>
        </div>
      </div>

      {/* Sequential Cinematic Project Chapters */}
      <div className="space-y-6 sm:space-y-12">
        {projectsData.map((project, index) => (
          <ProjectChapter
            key={project.id}
            project={project}
            index={index}
            isActive={activeProjectId === project.id}
            onOpenCaseStudy={setSelectedCaseStudyProject}
          />
        ))}
      </div>

      {/* Floating Project Chapter Navigation HUD */}
      <ProjectChapterNav
        projects={projectsData}
        activeProjectId={activeProjectId}
        isVisible={isProjectsSectionVisible}
        onSelectProject={handleSelectProject}
      />

      {/* Deep-Dive Case Study & Architecture Modal */}
      <ProjectCaseStudyModal
        project={selectedCaseStudyProject}
        projectIndex={selectedProjectIndex}
        isOpen={!!selectedCaseStudyProject}
        onClose={() => setSelectedCaseStudyProject(null)}
      />

      {/* GitHub Repository Banner */}
      <div className="mt-20 p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
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
