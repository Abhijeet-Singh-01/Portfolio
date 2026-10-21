import { useState } from 'react';
import { SITE_CONFIG } from '../../data/portfolioContent';
import { Download, Mail, ExternalLink, RotateCcw } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

interface ContactChapterProps {
  isActive: boolean;
  reducedMotion: boolean;
  onJumpToChapter?: (index: number) => void;
}

export function ContactChapter({ onJumpToChapter }: ContactChapterProps) {
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.phone);
      setCopiedPhone(true);
      window.setTimeout(() => setCopiedPhone(false), 2500);
    } catch {
      setCopiedPhone(false);
    }
  };

  return (
    <div
      className="chapter-panel"
      style={{
        left: '205vw',
        top: '430vh',
        width: 'clamp(340px, 86vw, 980px)',
        transform: 'translate(-50%, 0%)',
      }}
      aria-label="Section 05: Contact Details"
    >
      <div className="section-surface p-6 sm:p-9">
        <div className="flex flex-wrap items-end justify-between gap-4 pb-4 mb-5 border-b border-[var(--rule-color)]">
          <div>
            <span className="type-label block mb-1" style={{ color: 'var(--gold)' }}>
              05 — GET IN TOUCH
            </span>
            <h2
              className="type-headline"
              style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)' }}
            >
              Contact Details
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onJumpToChapter?.(0)}
            className="ink-btn"
          >
            <RotateCcw size={13} />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 7 Cols: Career Objective, Email & Phone */}
          <div className="lg:col-span-7">
            <h3 className="type-headline text-xl mb-2">
              Seeking Software Development Opportunities
            </h3>
            <p className="type-body text-xs sm:text-[13px] mb-4 leading-relaxed">
              {SITE_CONFIG.careerObjective}
            </p>

            {/* Email Box */}
            <div
              className="p-4 rounded-xl border mb-3"
              style={{
                background: 'var(--card-bg-2)',
                borderColor: 'var(--gold-border)',
              }}
            >
              <span className="type-label text-[9px] block mb-1" style={{ color: 'var(--gold)' }}>
                EMAIL ADDRESS
              </span>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className="type-mono text-xs sm:text-sm font-bold break-all"
                  style={{ color: 'var(--ink)' }}
                >
                  {SITE_CONFIG.email}
                </span>

                <div className="flex items-center gap-2">
                  <button type="button" onClick={copyEmail} className="ink-btn">
                    <span>{copied ? '✓ Copied' : 'Copy Email'}</span>
                  </button>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="ink-btn ink-btn-solid">
                    <Mail size={13} />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Box */}
            <div
              className="p-4 rounded-xl border"
              style={{
                background: 'var(--card-bg-2)',
                borderColor: 'var(--card-border)',
              }}
            >
              <span className="type-label text-[9px] block mb-1" style={{ color: 'var(--gold)' }}>
                PHONE NUMBER
              </span>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className="type-mono text-xs sm:text-sm font-bold"
                  style={{ color: 'var(--ink)' }}
                >
                  {SITE_CONFIG.phone}
                </span>

                <div className="flex items-center gap-2">
                  <button type="button" onClick={copyPhone} className="ink-btn">
                    <span>{copiedPhone ? '✓ Copied' : 'Copy Phone'}</span>
                  </button>
                  <a href="tel:+917007803506" className="ink-btn">
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Direct Profile Cards */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card p-4 flex items-center justify-between no-underline"
              style={{ background: 'var(--card-bg-2)', textDecoration: 'none' }}
            >
              <div className="flex items-center gap-3">
                <GithubIcon size={18} />
                <div>
                  <span className="type-headline text-sm block" style={{ color: 'var(--ink)' }}>
                    GitHub Profile
                  </span>
                  <span className="type-mono text-[11px]" style={{ color: 'var(--warm-gray)' }}>
                    github.com/Abhijeet-Singh-01
                  </span>
                </div>
              </div>
              <ExternalLink size={14} style={{ color: 'var(--gold)' }} />
            </a>

            <a
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card p-4 flex items-center justify-between no-underline"
              style={{ background: 'var(--card-bg-2)', textDecoration: 'none' }}
            >
              <div>
                <span className="type-headline text-sm block" style={{ color: 'var(--ink)' }}>
                  LinkedIn Profile
                </span>
                <span className="type-mono text-[11px]" style={{ color: 'var(--warm-gray)' }}>
                  in/abhijeet-singh-988276330
                </span>
              </div>
              <ExternalLink size={14} style={{ color: 'var(--gold)' }} />
            </a>

            <a
              href={SITE_CONFIG.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card p-4 flex items-center justify-between no-underline"
              style={{ background: 'var(--card-bg-2)', textDecoration: 'none' }}
            >
              <div>
                <span className="type-headline text-sm block" style={{ color: 'var(--ink)' }}>
                  LeetCode (250+ DSA Problems)
                </span>
                <span className="type-mono text-[11px]" style={{ color: 'var(--warm-gray)' }}>
                  Arrays, Strings, Linked Lists, Stacks, Queues, Trees
                </span>
              </div>
              <ExternalLink size={14} style={{ color: 'var(--gold)' }} />
            </a>

            <a
              href={SITE_CONFIG.resumeUrl}
              download="Abhijeet-Singh-Resume.pdf"
              className="ink-btn ink-btn-solid justify-center py-3"
            >
              <Download size={14} />
              <span>Download Official Résumé (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
