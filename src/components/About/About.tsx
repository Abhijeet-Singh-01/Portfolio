import React from 'react';
import { educationData, certificationData, careerObjective } from '../../data/education';
import { GraduationCap, Award, CheckCircle, ExternalLink } from 'lucide-react';
import { siteLinks } from '../../data/socialLinks';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header with Large Editorial Typography */}
      <div className="mb-14 sm:mb-20">
        <span className="section-eyebrow">
          03 // ABOUT &amp; BACKGROUND
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text)] mb-4 uppercase leading-[1.05]">
          Build With Intent.
        </h2>
        <p className="section-subtitle">
          Academic foundation, engineering discipline, and focused trajectory across full-stack systems, backend engineering, and AI/ML.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Architectural Intent & Certifications (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="card-base p-6 sm:p-8 reveal-item">
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] mb-4 tracking-tight leading-snug">
              Engineering scalable software through algorithmic discipline.
            </h3>

            <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed mb-6">
              {careerObjective}
            </p>

            <div className="pt-6 border-t border-[var(--border-subtle)] space-y-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent-secondary)] block">
                Engineering Focus
              </span>
              <ul className="space-y-2.5 list-none p-0 m-0">
                {[
                  'Scalable backend systems and RESTful API architecture',
                  'Database-driven full-stack engineering with modern React & Python',
                  'AI/ML integration: anomaly detection, vector search, and RAG pipelines',
                  'Strengthening Data Structures & Algorithms with consistent practice',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-2)]">
                    <CheckCircle className="w-4 h-4 text-[var(--accent-secondary)] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Certifications Card */}
          <div className="card-base p-6 sm:p-8 reveal-item">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-subtle)]">
              <Award className="w-4 h-4 text-[var(--accent-primary)]" aria-hidden="true" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-[var(--text)]">
                Verified Certifications
              </h3>
            </div>

            <ul className="space-y-3 list-none p-0 m-0">
              {certificationData.map((cert) => (
                <li key={cert} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-2)]">
                  <span className="text-[var(--accent-primary)] font-bold">•</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Education Timeline (6 cols) */}
        <div className="lg:col-span-6">
          <div className="card-base p-6 sm:p-8 reveal-item">
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-[var(--border-subtle)]">
              <GraduationCap className="w-4 h-4 text-[var(--accent-secondary)]" aria-hidden="true" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-[var(--text)]">
                Education Timeline
              </h3>
            </div>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-[var(--border)]">
              {educationData.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline node */}
                  <span
                    className={`absolute -left-[22px] top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-[var(--surface)] ${
                      idx === 0
                        ? 'border-[var(--accent-secondary)] bg-[var(--accent-secondary)]/20'
                        : 'border-[var(--border)]'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Period & Status */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-semibold text-[var(--accent-secondary)]">
                      {item.period}
                    </span>
                    {item.status && (
                      <span className="chip text-[10px] py-0 px-2 font-mono">
                        {item.status}
                      </span>
                    )}
                  </div>

                  {/* Degree & Institution */}
                  <h4 className="text-sm sm:text-base font-semibold text-[var(--text)] mb-1 leading-snug">
                    {item.degree}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text-2)] mb-1">
                    {item.institution}
                  </p>
                  {item.university && (
                    <p className="text-xs text-[var(--text-2)]/80 mb-2">
                      {item.university}
                    </p>
                  )}

                  {/* Highlights */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.highlights.map((h, hIdx) => (
                        <span key={hIdx} className="chip text-[11px] text-[var(--text)] font-mono">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* LeetCode Profile Link */}
            <div className="mt-8 pt-5 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
              <span className="text-[var(--text-2)]">Problem-solving profile:</span>
              <a
                href={siteLinks.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent-secondary)] hover:underline inline-flex items-center gap-1 font-mono font-medium min-h-[44px] px-1"
                aria-label={siteLinks.leetcode.accessibilityLabel}
              >
                <span>LeetCode (250+ solved)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
