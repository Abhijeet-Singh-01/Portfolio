import { SKILLS } from '../../data/portfolioContent';
import { Compass } from 'lucide-react';

interface ForgeChapterProps {
  isActive: boolean;
  reducedMotion: boolean;
  onJumpToChapter?: (index: number) => void;
}

export function ForgeChapter({ onJumpToChapter }: ForgeChapterProps) {
  return (
    <div
      className="chapter-panel"
      style={{
        left: '355vw',
        top: '335vh',
        width: 'clamp(340px, 88vw, 1020px)',
        transform: 'translate(-50%, 0%)',
      }}
      aria-label="Section 04: Technical Skills"
    >
      <div className="section-surface p-6 sm:p-9">
        <div className="flex flex-wrap items-end justify-between gap-4 pb-5 mb-6 border-b border-[var(--rule-color)]">
          <div>
            <span className="type-label block mb-1.5" style={{ color: 'var(--gold)' }}>
              04 — ENGINEERING TOOLKIT
            </span>
            <h2
              className="type-headline"
              style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)' }}
            >
              Technical Skills
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onJumpToChapter?.(4)}
            className="ink-btn"
          >
            <Compass size={13} />
            <span>Next: Contact Details →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((group, idx) => (
            <article
              key={group.category}
              className="project-card p-5"
              style={{ background: 'var(--card-bg-2)' }}
            >
              <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[var(--rule-color)]">
                <span className="type-headline text-base">{group.category}</span>
                <span className="type-mono text-xs" style={{ color: 'var(--gold)' }}>
                  0{idx + 1}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span key={skill} className="tech-pill" style={{ fontSize: '0.68rem', padding: '0.32rem 0.75rem' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
