import React from 'react';
import { achievementData, certificationData, educationData, personalBio } from '../../data/education';
import { GraduationCap, CheckCircle2, Award, ExternalLink, Terminal } from 'lucide-react';
import { DeveloperTerminal } from './DeveloperTerminal';
import profilePhoto from '../../assets/images/profile.webp';
import { siteLinks } from '../../data/socialLinks';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 pb-6 border-b border-border/15">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-accent-violet animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent-violet-ink font-semibold">
            04 / ABOUT · TRAJECTORY &amp; FOUNDATIONS
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase text-text tracking-tight leading-none">
          ABOUT ABHIJEET
        </h2>

        <p className="mt-3 text-sm sm:text-base text-text-2 font-mono max-w-2xl">
          Undergraduate background, problem-solving journey, and academic trajectory.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Bio & Core Philosophy (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Editorial Bio Card */}
          <div className="about-panel p-8 sm:p-10 rounded-2xl bg-surface-glass border border-border/15 backdrop-blur-xl">
            <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-text mb-4 tracking-tight leading-snug">
              Backend and full-stack engineering, grounded in problem-solving.
            </h3>

            <p className="text-sm sm:text-base text-text-2 leading-relaxed mb-6 font-mono">
              {personalBio.introParagraph}
            </p>

            <p className="text-xs sm:text-sm text-text-2 leading-relaxed mb-8 font-mono">
              Currently pursuing my B.Tech in Computer Science and Engineering at {personalBio.college} ({personalBio.years}), with an academic score of CGPA {personalBio.cgpa}.
            </p>

            {/* Current Focus */}
            <div className="pt-6 border-t border-border/10">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-violet-ink block mb-4 font-semibold">
                Current Focus:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                {personalBio.passions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-text-2">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-accent-violet-ink shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Engineering Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {personalBio.corePillars.map((pillar, pIdx) => (
              <div
                key={pIdx}
                className="p-5 rounded-xl bg-surface/60 border border-border/15 backdrop-blur-md"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-aqua" />
                  <h4 className="text-xs font-mono uppercase tracking-wider text-text font-bold">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-xs font-mono text-text-2 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications and Achievements */}
          <div className="about-panel p-8 rounded-2xl bg-surface-glass border border-border/15 backdrop-blur-xl">
            <div className="mb-6 pb-4 border-b border-border/10">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-accent-aqua-ink" />
                <h4 className="text-xs font-mono uppercase tracking-widest text-text font-bold">
                  Verified Certifications
                </h4>
              </div>
              <ul className="space-y-2 list-none p-0 m-0 font-mono">
                {certificationData.map((certification) => (
                  <li key={certification} className="text-xs text-text-2 leading-relaxed flex items-start gap-2">
                    <span className="text-accent-aqua-ink">•</span>
                    <span>{certification}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-4 h-4 text-accent-violet-ink" />
                <h4 className="text-xs font-mono uppercase tracking-widest text-text font-bold">
                  Problem Solving Achievements
                </h4>
              </div>
              <ul className="space-y-4 list-none p-0 m-0 font-mono">
                {achievementData.map((achievement) => (
                  <li key={achievement.title} className="text-xs text-text-2 leading-relaxed">
                    {achievement.url ? (
                      <a
                        href={achievement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={siteLinks.leetcode.accessibilityLabel}
                        className="inline-flex items-center gap-1.5 text-accent-aqua-ink hover:text-text font-semibold"
                      >
                        <span>{achievement.title}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <strong className="font-semibold text-text">{achievement.title}</strong>
                    )}
                    <span className="block text-text-2 mt-1">{achievement.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Framed Portrait, Terminal, Education Timeline (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Framed Untouched Portrait Card with Subtle Tilt */}
          <div
            className="about-portrait-wrap relative w-full aspect-square max-w-[380px] mx-auto rounded-2xl overflow-hidden border border-border/20 bg-surface/70 shadow-2xl"
          >
            <img
              src={profilePhoto}
              width="800"
              height="800"
              loading="lazy"
              alt="Portrait of Abhijeet Singh"
              className="w-full h-full object-cover select-none"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-text-2 px-3 py-1.5 rounded-lg bg-surface-glass backdrop-blur-md border border-border/15">
              <span className="text-text font-semibold">Abhijeet Singh</span>
              <span className="text-accent-aqua-ink">Lucknow, IN</span>
            </div>
          </div>

          {/* Interactive Developer Terminal */}
          <DeveloperTerminal />

          {/* Vertical Education Timeline with Glowing Nodes */}
          <div className="about-panel p-8 rounded-2xl bg-surface-glass border border-border/15 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-border/10">
              <GraduationCap className="w-4 h-4 text-accent-aqua-ink" />
              <h4 className="text-xs font-mono uppercase tracking-widest text-text font-bold">
                Education Timeline
              </h4>
            </div>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-accent-aqua via-accent-violet to-accent-indigo">
              {educationData.map((item, eIdx) => (
                <div key={eIdx} className="relative group font-mono">
                  {/* Glowing Node */}
                  <span
                    className={`absolute -left-[22px] top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-surface transition-all duration-300 ${
                      eIdx === 0
                        ? 'border-accent-aqua shadow-[0_0_12px_var(--accent-aqua-glow)]'
                        : 'border-accent-violet shadow-[0_0_8px_var(--accent-violet-glow)]'
                    }`}
                  />

                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] text-accent-aqua-ink tracking-wider font-semibold">
                      {item.period}
                    </span>
                    {item.status && (
                      <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-surface border border-border/15 text-text-2">
                        {item.status}
                      </span>
                    )}
                  </div>

                  <h5 className="text-sm font-display font-bold text-text group-hover:text-accent-aqua-ink transition-colors leading-snug">
                    {item.degree}
                  </h5>

                  <p className="text-xs text-text-2 mt-1">
                    {item.institution}
                  </p>

                  {item.university && (
                    <p className="text-[11px] text-text-2">
                      {item.university}
                    </p>
                  )}

                  <ul className="mt-2.5 space-y-1 list-none p-0 m-0">
                    {item.highlights.map((point, pIdx) => (
                      <li key={pIdx} className="text-xs text-text-2">
                        • {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
