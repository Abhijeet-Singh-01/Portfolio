import React, { useState } from 'react';
import { skillsCategories } from '../../data/skills';
import {
  Award,
  Code2,
  Terminal,
  Cpu,
  Database,
  Layout,
  Zap,
  Sparkles,
  ExternalLink,
  Layers,
  List,
  CheckCircle2,
} from 'lucide-react';
import { siteLinks } from '../../data/socialLinks';

const categoryIcons: Record<string, React.ReactNode> = {
  languages: <Code2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />,
  frontend: <Layout className="w-4 h-4 text-cyan-400" aria-hidden="true" />,
  backend: <Zap className="w-4 h-4 text-amber-400" aria-hidden="true" />,
  databases: <Database className="w-4 h-4 text-purple-400" aria-hidden="true" />,
  'ml-data': <Cpu className="w-4 h-4 text-rose-400" aria-hidden="true" />,
  tools: <Terminal className="w-4 h-4 text-blue-400" aria-hidden="true" />,
};

const categoryBadges: Record<string, string> = {
  languages: '01 // LANG',
  frontend: '02 // FE',
  backend: '03 // BE',
  databases: '04 // DB',
  'ml-data': '05 // ML/DATA',
  tools: '06 // TOOLS',
};

export const Skills: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'spatial' | 'list'>('spatial');

  const filteredCategories =
    activeFilter === 'all'
      ? skillsCategories
      : skillsCategories.filter((cat) => cat.id === activeFilter);

  const totalSkillsCount = skillsCategories.reduce((sum, cat) => sum + cat.skills.length, 0);

  return (
    <section
      id="skills"
      aria-label="Technical Arsenal and Skills Lab"
      className="py-20 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto relative overflow-hidden"
    >
      {/* Subtle Background Hex Honeycomb & Scanline Layer */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 opacity-30 select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Hexagonal grid pattern SVG */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-pattern" width="48" height="84" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
              <path
                d="M48 42L24 56L0 42L0 14L24 0L48 14Z M24 56L24 84 M48 42L48 70 M0 42L0 70"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-[var(--border)]"
                strokeOpacity="0.45"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-pattern)" />
        </svg>

        {/* Subtle Ambient Scanline */}
        <div
          className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[var(--accent-secondary)]/10 to-transparent animate-[pulse_6s_ease-in-out_infinite]"
          style={{ transform: 'translateY(20%)' }}
        />
      </div>

      {/* Section Header with Lab Identity */}
      <div className="mb-12 sm:mb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-secondary)] animate-pulse" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[var(--accent-secondary)] uppercase">
              // THE LAB · 02 CAPABILITIES MATRIX
            </span>
          </div>

          {/* View Toggle: Spatial vs Plain List */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-xs font-mono">
            <button
              type="button"
              onClick={() => setViewMode('spatial')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'spatial'
                  ? 'bg-[var(--surface)] text-[var(--accent-secondary)] font-semibold shadow-xs'
                  : 'text-[var(--text-2)] hover:text-[var(--text)]'
              }`}
              aria-label="Switch to 3D Spatial Grid view"
            >
              <Layers className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Spatial Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'list'
                  ? 'bg-[var(--surface)] text-[var(--accent-secondary)] font-semibold shadow-xs'
                  : 'text-[var(--text-2)] hover:text-[var(--text)]'
              }`}
              aria-label="Switch to Plain Accessible List view"
            >
              <List className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Plain List</span>
            </button>
          </div>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text)] uppercase leading-[1.05] mb-4">
          Technical Arsenal.
        </h2>
        <p className="text-base sm:text-lg text-[var(--text-2)] max-w-2xl leading-relaxed">
          Verified programming languages, frameworks, APIs, and databases applied in scalable backend systems, data pipelines, and algorithmic problem-solving.
        </p>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
              activeFilter === 'all'
                ? 'bg-[var(--accent-secondary)] text-[var(--bg)] font-bold border-[var(--accent-secondary)] shadow-sm'
                : 'bg-[var(--surface)] text-[var(--text-2)] border-[var(--border)] hover:text-[var(--text)] hover:border-[var(--border-strong)]'
            }`}
            aria-pressed={activeFilter === 'all'}
          >
            All Matrix ({totalSkillsCount})
          </button>

          {skillsCategories.map((cat) => {
            const isSelected = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(isSelected ? 'all' : cat.id)}
                className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[var(--accent-secondary)] text-[var(--bg)] font-bold border-[var(--accent-secondary)] shadow-sm'
                    : 'bg-[var(--surface)] text-[var(--text-2)] border-[var(--border)] hover:text-[var(--text)] hover:border-[var(--border-strong)]'
                }`}
                aria-pressed={isSelected}
              >
                {categoryIcons[cat.id]}
                <span>{cat.title}</span>
                <span className="text-[10px] opacity-75">({cat.skills.length})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode A: Spatial 3D Networked Hex Grid */}
      {viewMode === 'spatial' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="card-base p-6 flex flex-col justify-between reveal-item relative group hover:border-[var(--accent-secondary)]/50 transition-all duration-300 hover:shadow-lg"
              style={{
                perspective: '1000px',
              }}
            >
              {/* Category Card Header */}
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-md bg-[var(--surface-2)] border border-[var(--border)]">
                      {categoryIcons[category.id] || <Sparkles className="w-4 h-4 text-[var(--accent-secondary)]" />}
                    </span>
                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--text)]">
                        {category.title}
                      </h3>
                      <span className="text-[10px] font-mono text-[var(--text-2)]/80">
                        {categoryBadges[category.id] || '// ARSENAL'}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--surface-2)] border border-[var(--border)] text-[var(--accent-secondary)]">
                    {category.skills.length}
                  </span>
                </div>

                {/* Networked Skill Nodes */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {category.skills.map((skill) => {
                    const isHovered = hoveredSkill === skill.name;
                    return (
                      <div
                        key={skill.name}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-default select-none border ${
                          isHovered
                            ? 'bg-[var(--accent-secondary)] text-[var(--bg)] border-[var(--accent-secondary)] shadow-sm font-bold scale-105'
                            : skill.highlight
                            ? 'bg-[var(--surface-2)] text-[var(--text)] border-[var(--border)] font-medium hover:border-[var(--accent-secondary)]'
                            : 'bg-[var(--surface-2)]/60 text-[var(--text-2)] border-[var(--border-subtle)] hover:text-[var(--text)]'
                        }`}
                      >
                        {skill.highlight && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isHovered ? 'bg-[var(--bg)]' : 'bg-[var(--accent-secondary)]'
                            }`}
                            aria-hidden="true"
                          />
                        )}
                        <span>{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category Footer Indicator */}
              <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-2)]/70">
                <span>STATUS: VERIFIED</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                  <span>ACTIVE</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Mode B: Accessible Plain Semantic List */
        <div className="card-base p-6 sm:p-8 space-y-6">
          <div className="border-b border-[var(--border)] pb-4">
            <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-[var(--text)]">
              Accessible Technical Matrix
            </h3>
            <p className="text-xs text-[var(--text-2)]">
              Screen-reader optimized, hierarchical technical capability inventory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCategories.map((category) => (
              <div key={category.id} className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-secondary)] flex items-center gap-2">
                  {categoryIcons[category.id]}
                  <span>{category.title} ({category.skills.length})</span>
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[var(--text-2)] font-mono">
                  {category.skills.map((s) => (
                    <li key={s.name}>
                      <span className="text-[var(--text)] font-medium">{s.name}</span>
                      {s.highlight ? ' (Primary Core Focus)' : ''}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Restrained & Verified Achievements Track Record */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* LeetCode DSA Highlight */}
        <a
          href={siteLinks.leetcode.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card-base p-5 flex items-start gap-4 hover:border-[var(--accent-secondary)] transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          aria-label="View Abhijeet Singh's LeetCode algorithmic problem-solving profile (opens in new tab)"
        >
          <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center shrink-0 text-[var(--accent-secondary)] group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-bold text-[var(--text)] group-hover:text-[var(--accent-secondary)] transition-colors">
                250+ LeetCode Problems Solved
              </h4>
              <ExternalLink className="w-3.5 h-3.5 text-[var(--accent-secondary)] shrink-0" aria-hidden="true" />
            </div>
            <p className="text-xs text-[var(--text-2)] leading-relaxed">
              Solved 250+ DSA problems on LeetCode, covering arrays, strings, linked lists, stacks, queues, trees, and recursion.
            </p>
          </div>
        </a>

        {/* AWS Credentials Highlight */}
        <div className="card-base p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center shrink-0 text-[var(--accent-primary)]">
            <Award className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[var(--text)] mb-1">
              2 AWS Credentials Earned
            </h4>
            <p className="text-xs text-[var(--text-2)] leading-relaxed">
              AWS Academy Graduate – Machine Learning Foundations Training Badge &amp; AWS Planning a Generative AI Project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
