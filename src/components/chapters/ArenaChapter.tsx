import { ExternalLink, Compass } from 'lucide-react';
import { ACHIEVEMENTS, EDUCATION } from '../../data/portfolioContent';

interface ArenaChapterProps {
  isActive: boolean;
  reducedMotion: boolean;
  onJumpToChapter?: (index: number) => void;
}

export function ArenaChapter({ onJumpToChapter }: ArenaChapterProps) {
  return (
    <div
      className="chapter-panel"
      style={{
        left: '75vw',
        top: '235vh',
        width: 'clamp(340px, 88vw, 1040px)',
        transform: 'translate(-50%, 0%)',
      }}
      aria-label="Section 03: Achievements and Education"
    >
      <div className="section-surface p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4 pb-3.5 mb-4 border-b border-[var(--rule-color)]">
          <div>
            <span className="type-label block mb-1" style={{ color: 'var(--gold)' }}>
              03 — CERTIFICATIONS, ACHIEVEMENTS &amp; EDUCATION
            </span>
            <h2
              className="type-headline"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.45rem)' }}
            >
              Achievements &amp; Education
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onJumpToChapter?.(3)}
            className="ink-btn"
          >
            <Compass size={13} />
            <span>Next: Technical Skills →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left 7 Cols: Achievements & AWS Certifications */}
          <div className="lg:col-span-7 space-y-3">
            {ACHIEVEMENTS.map((item) => (
              <article
                key={item.id}
                className="project-card p-3.5 sm:p-4"
                style={{ background: 'var(--card-bg-2)' }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="type-label text-[9px]" style={{ color: 'var(--gold)' }}>
                    {item.subtitle} · {item.period}
                  </span>
                  <span
                    className="px-3 py-0.5 rounded-full type-mono text-[10px] font-bold"
                    style={{
                      background: 'var(--gold-soft)',
                      color: 'var(--gold)',
                      border: '1px solid var(--gold-border)',
                    }}
                  >
                    {item.metric}
                  </span>
                </div>

                <h3 className="type-headline text-base mb-1">{item.title}</h3>
                <p className="type-body text-xs mb-2 leading-snug">{item.description}</p>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tech-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {item.linkUrl && (
                    <a
                      href={item.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="type-mono text-xs inline-flex items-center gap-1"
                      style={{ color: 'var(--gold)' }}
                    >
                      <span>LeetCode</span>
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Right 5 Cols: Academic Education Timeline */}
          <div className="lg:col-span-5">
            <div className="project-card p-5 sm:p-6" style={{ background: 'var(--card-bg-2)' }}>
              <span className="type-label text-[10px] block mb-2" style={{ color: 'var(--gold)' }}>
                EDUCATION
              </span>
              <h3 className="type-headline text-xl mb-1">{EDUCATION.institution}</h3>
              <p className="type-body text-xs font-semibold mb-3" style={{ color: 'var(--ink)' }}>
                {EDUCATION.degree}
              </p>

              <div
                className="px-3.5 py-1.5 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] mb-4"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}
              >
                <span className="type-mono text-xs font-bold" style={{ color: 'var(--gold)' }}>
                  CGPA: {EDUCATION.cgpa}
                </span>
                <span className="type-label text-[9.5px]">· {EDUCATION.period}</span>
              </div>

              <div className="pt-4 border-t border-[var(--rule-color)] space-y-3">
                {EDUCATION.schooling.map((s) => (
                  <div key={s.degree} className="arch-layer">
                    <div className="flex items-center justify-between text-xs type-mono">
                      <span style={{ color: 'var(--ink)' }}>{s.school}</span>
                      <span style={{ color: 'var(--gold)' }}>{s.score}</span>
                    </div>
                    <p className="type-body text-xs mt-0.5">{s.degree}</p>
                    <span className="type-label text-[9px]">{s.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
