import { SITE_CONFIG, EDUCATION } from '../../data/portfolioContent';
import { ChevronDown, Download, Mail, ExternalLink, Compass } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

interface GenesisChapterProps {
  isActive: boolean;
  reducedMotion: boolean;
  onJumpToChapter?: (index: number) => void;
}

export function GenesisChapter({ onJumpToChapter }: GenesisChapterProps) {
  const heroLetters = SITE_CONFIG.firstName.split('');

  return (
    <div
      className="chapter-panel"
      style={{
        left: '55vw',
        top: '48vh',
        width: 'clamp(340px, 88vw, 1040px)',
        transform: 'translate(-50%, 0%)',
      }}
      aria-label="Hero Section — Abhijeet Singh"
    >
      <div className="section-surface section-surface-hero px-6 sm:px-12 py-5 sm:py-7 text-center flex flex-col items-center">
        {/* Top Clean Identity Pill */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg-2)] mb-6">
          <img
            src={SITE_CONFIG.portraitUrl}
            alt="Abhijeet Singh"
            className="w-7 h-7 rounded-full object-cover"
            style={{ border: '1.5px solid var(--gold)' }}
          />
          <span className="type-label text-[10px]" style={{ color: 'var(--ink)' }}>
            {SITE_CONFIG.name} · B.Tech CS @ PSIT Kanpur ({EDUCATION.period})
          </span>
        </div>

        {/* GIANT MONUMENTAL CONDENSED DISPLAY TITLE (Matching "CREATIVE DEVELOPER" in the video!) */}
        <h1
          className="font-display-condensed uppercase select-none overflow-hidden flex items-center justify-center"
          style={{
            fontSize: 'clamp(4.2rem, 13vw, 9.6rem)',
            lineHeight: 0.86,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
          }}
          aria-label="Abhijeet Singh"
        >
          {heroLetters.map((char, idx) => (
            <span
              key={idx}
              className="hero-letter-rise inline-block"
              style={{ animationDelay: `${idx * 45}ms` }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Secondary Condensed Subtitle Banner (Matching "DEVELOPER" in the video!) */}
        <div className="mt-2 mb-5 flex flex-col items-center">
          <span
            className="font-display-condensed uppercase tracking-[0.14em]"
            style={{
              fontSize: 'clamp(1.35rem, 3.2vw, 2.35rem)',
              lineHeight: 1,
              color: 'var(--gold)',
            }}
          >
            {SITE_CONFIG.lastName} — {SITE_CONFIG.shortRole}
          </span>
        </div>

        {/* Clean, Readable, Generously Spaced Introduction */}
        <p
          className="type-body max-w-2xl mx-auto mb-7"
          style={{
            fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)',
            lineHeight: 1.7,
            color: 'var(--charcoal)',
          }}
        >
          {SITE_CONFIG.intro}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => onJumpToChapter?.(1)}
            className="ink-btn ink-btn-solid"
          >
            <Compass size={14} />
            <span>Explore Projects</span>
          </button>

          <a
            href={SITE_CONFIG.resumeUrl}
            download="Abhijeet-Singh-Resume.pdf"
            className="ink-btn"
          >
            <Download size={14} />
            <span>Download Résumé</span>
          </a>

          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="ink-btn"
          >
            <GithubIcon size={14} />
            <span>GitHub</span>
          </a>

          <a
            href={SITE_CONFIG.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="ink-btn"
          >
            <ExternalLink size={13} />
            <span>LinkedIn</span>
          </a>

          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="ink-btn"
          >
            <Mail size={13} />
            <span>Contact</span>
          </a>
        </div>

        {/* Bottom 3 Clean Pillars + Scroll Indicator (Matching "VISUALS / CODE / EXPERIENCE" in the video!) */}
        <div className="w-full pt-5 border-t border-[var(--rule-color)] grid grid-cols-3 gap-4 items-center text-center">
          <div>
            <span className="type-label text-[10px] block font-semibold" style={{ color: 'var(--ink)' }}>
              AI &amp; ML SYSTEMS
            </span>
            <span className="type-label text-[8.5px] block mt-0.5">
              Anomaly &amp; Root-Cause Models
            </span>
          </div>

          <button
            type="button"
            onClick={() => onJumpToChapter?.(1)}
            className="flex flex-col items-center justify-center gap-1 cursor-pointer bg-transparent border-none mx-auto"
          >
            <span className="type-label text-[10px] font-bold" style={{ color: 'var(--gold)' }}>
              SCROLL TO EXPLORE
            </span>
            <ChevronDown size={15} style={{ color: 'var(--gold)' }} />
          </button>

          <div>
            <span className="type-label text-[10px] block font-semibold" style={{ color: 'var(--ink)' }}>
              FULL-STACK &amp; APIs
            </span>
            <span className="type-label text-[8.5px] block mt-0.5">
              FastAPI · React · PostgreSQL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
