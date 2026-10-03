import React from 'react';
import { skillsCategories } from '../../data/skills';
import { Award, Code2 } from 'lucide-react';
import { siteLinks } from '../../data/socialLinks';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header with Large Editorial Scale */}
      <div className="mb-14 sm:mb-20">
        <span className="section-eyebrow">
          02 // SKILLS &amp; CAPABILITIES
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text)] mb-4 uppercase leading-[1.05]">
          Technical Arsenal.
        </h2>
        <p className="section-subtitle">
          Verified technologies, languages, and tools applied across scalable backend systems, database engineering, and algorithmic problem-solving.
        </p>
      </div>

      {/* Skills Grouped Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsCategories.map((category) => (
          <div
            key={category.id}
            className="card-base p-6 flex flex-col justify-between reveal-item"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-subtle)]">
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-[var(--accent-secondary)]">
                  {category.title}
                </h3>
                <span className="text-[11px] font-mono text-[var(--text-2)]">
                  {category.skills.length} skills
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      skill.highlight
                        ? 'bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] font-medium'
                        : 'bg-[var(--surface-2)]/60 text-[var(--text-2)] border border-[var(--border-subtle)]'
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Restrained Achievements */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* LeetCode DSA Highlight */}
        <a
          href={siteLinks.leetcode.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card-base p-5 flex items-start gap-4 hover:border-[var(--accent-secondary)] transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center shrink-0 text-[var(--accent-secondary)] group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-semibold text-[var(--text)] group-hover:text-[var(--accent-secondary)] transition-colors">
                250+ LeetCode Problems Solved
              </h4>
              <span className="text-xs text-[var(--accent-secondary)]">↗</span>
            </div>
            <p className="text-xs text-[var(--text-2)] leading-relaxed">
              Consistent daily practice strengthening Data Structures &amp; Algorithms across arrays, strings, linked lists, trees, and recursion.
            </p>
          </div>
        </a>

        {/* AWS GenAI Highlight */}
        <div className="card-base p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center shrink-0 text-[var(--accent-primary)]">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--text)] mb-1">
              2 AWS Generative AI Certifications
            </h4>
            <p className="text-xs text-[var(--text-2)] leading-relaxed">
              Official AWS coursework credentials in Generative AI project planning and foundational machine learning concepts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
