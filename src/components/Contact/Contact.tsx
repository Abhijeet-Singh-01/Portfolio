import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink, Download } from 'lucide-react';
import { siteLinks } from '../../data/socialLinks';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from '../common/BrandIcons';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const emailAddress = siteLinks.email.handle;

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Cinematic Closing Eyebrow */}
      <div className="mb-6">
        <span className="section-eyebrow">
          04 // CONTACT &amp; CONNECT
        </span>
      </div>

      {/* Massive Editorial Headline */}
      <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--text)] mb-8 uppercase leading-[1.02] max-w-4xl">
        LET'S BUILD <br />
        SOMETHING <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)]">
          WORTH SHIPPING.
        </span>
      </h2>

      <p className="text-base sm:text-lg text-[var(--text-2)] max-w-2xl leading-relaxed mb-12">
        Currently seeking software development opportunities in backend and full-stack engineering.
        Interested in scalable APIs, database-driven applications, and AI-powered solutions.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Direct Email Card (7 cols) */}
        <div className="lg:col-span-7">
          <div className="card-base p-6 sm:p-10 reveal-item">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent-secondary)] block mb-2">
              Direct Channel
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-3">
              Drop me an email
            </h3>

            <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed mb-6">
              Whether you have an internship or full-time opportunity, a software project to discuss, or want to connect on AI &amp; backend engineering.
            </p>

            <div className="p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="font-mono text-sm sm:text-base text-[var(--text)] font-semibold break-all">
                {emailAddress}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="btn-secondary text-xs min-h-[40px] px-3.5"
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={siteLinks.email.url}
                  className="btn-primary text-xs min-h-[40px] px-4"
                  aria-label="Send email directly via mail client"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[var(--text-2)] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span>Based in Lucknow, India · Responding promptly</span>
            </div>
          </div>
        </div>

        {/* Channels & Profiles (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="card-base p-6 sm:p-8 reveal-item">
            <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-[var(--text)] mb-4 pb-3 border-b border-[var(--border-subtle)]">
              Verified Profiles
            </h3>

            <div className="flex flex-col gap-2.5">
              {/* GitHub */}
              <a
                href={siteLinks.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-subtle)] hover:border-[var(--accent-secondary)] transition-colors flex items-center justify-between group"
                aria-label={siteLinks.github.accessibilityLabel}
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-5 h-5 text-[var(--text)] group-hover:text-[var(--accent-secondary)] transition-colors" />
                  <div>
                    <span className="text-sm font-semibold text-[var(--text)] block">GitHub</span>
                    <span className="text-xs text-[var(--text-2)] font-mono">github.com/Abhijeet-Singh-01</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[var(--text-2)] group-hover:text-[var(--accent-secondary)] transition-colors" />
              </a>

              {/* LinkedIn */}
              <a
                href={siteLinks.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-subtle)] hover:border-[var(--accent-secondary)] transition-colors flex items-center justify-between group"
                aria-label={siteLinks.linkedin.accessibilityLabel}
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-5 h-5 text-[var(--text)] group-hover:text-[var(--accent-secondary)] transition-colors" />
                  <div>
                    <span className="text-sm font-semibold text-[var(--text)] block">LinkedIn</span>
                    <span className="text-xs text-[var(--text-2)] font-mono">in/abhijeet-singh-988276330</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[var(--text-2)] group-hover:text-[var(--accent-secondary)] transition-colors" />
              </a>

              {/* LeetCode */}
              <a
                href={siteLinks.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-subtle)] hover:border-[var(--accent-secondary)] transition-colors flex items-center justify-between group"
                aria-label={siteLinks.leetcode.accessibilityLabel}
              >
                <div className="flex items-center gap-3">
                  <LeetcodeIcon className="w-5 h-5 text-[var(--text)] group-hover:text-[var(--accent-secondary)] transition-colors" />
                  <div>
                    <span className="text-sm font-semibold text-[var(--text)] block">LeetCode</span>
                    <span className="text-xs text-[var(--text-2)] font-mono">250+ solved problems</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[var(--text-2)] group-hover:text-[var(--accent-secondary)] transition-colors" />
              </a>

              {/* Resume */}
              <a
                href={siteLinks.resume.url}
                download={siteLinks.resume.download}
                className="p-3.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] transition-colors flex items-center justify-between group"
                aria-label={siteLinks.resume.accessibilityLabel}
              >
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-[var(--text)] group-hover:text-[var(--accent-primary)] transition-colors" />
                  <div>
                    <span className="text-sm font-semibold text-[var(--text)] block">Resume (PDF)</span>
                    <span className="text-xs text-[var(--text-2)] font-mono">Download official resume</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-[var(--accent-primary)] group-hover:underline">Download</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
