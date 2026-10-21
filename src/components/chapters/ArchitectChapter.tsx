import { ExternalLink, Compass } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { PROJECTS } from '../../data/portfolioContent';

interface ArchitectChapterProps {
  isActive: boolean;
  reducedMotion: boolean;
  onJumpToChapter?: (index: number) => void;
}

export function ArchitectChapter({ onJumpToChapter }: ArchitectChapterProps) {
  return (
    <div
      className="chapter-panel"
      style={{
        left: '355vw',
        top: '135vh',
        width: 'clamp(340px, 90vw, 1100px)',
        transform: 'translate(-50%, 0%)',
      }}
      aria-label="Section 02: Selected Projects"
    >
      <div className="section-surface p-5 sm:p-7">
        {/* Clean Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 pb-3.5 mb-4 border-b border-[var(--rule-color)]">
          <div>
            <span className="type-label block mb-1.5" style={{ color: 'var(--gold)' }}>
              02 — SELECTED ENGINEERING WORK
            </span>
            <h2
              className="type-headline"
              style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)' }}
            >
              Featured Projects
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onJumpToChapter?.(2)}
            className="ink-btn"
          >
            <Compass size={13} />
            <span>Next: Achievements →</span>
          </button>
        </div>

        {/* All 3 Projects Visible Side-by-Side (AI Incident Intelligence, SETU, SolisIQ) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="project-card p-4 sm:p-5 flex flex-col justify-between"
              style={{ background: 'var(--card-bg-2)' }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="type-mono text-xs font-bold" style={{ color: 'var(--gold)' }}>
                    PROJECT {project.num}
                  </span>
                  <span className="type-label text-[8.5px]">{project.category}</span>
                </div>

                <h3
                  className="type-headline mb-1"
                  style={{ fontSize: '1.3rem', lineHeight: 1.15 }}
                >
                  {project.title}
                </h3>

                <p
                  className="type-label text-[9px] mb-2"
                  style={{ color: 'var(--gold)', letterSpacing: '0.07em' }}
                >
                  {project.subtitle}
                </p>

                <p className="type-body text-xs mb-2.5 leading-snug">
                  {project.description}
                </p>

                <ul className="space-y-1.5 mb-3.5" style={{ listStyle: 'none' }}>
                  {project.highlights.slice(0, 2).map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="type-mono text-[10px] mt-0.5" style={{ color: 'var(--gold)' }}>
                        •
                      </span>
                      <span className="type-body text-[11.5px] leading-snug">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-[var(--rule-color)]">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ink-btn ink-btn-solid w-full justify-center"
                  >
                    <GithubIcon size={13} />
                    <span>View Source on GitHub</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
