import React, { useState } from 'react';
import { skillsCategories } from '../../data/skills';
import { SkillTile } from './SkillTile';
import { Terminal, Database, Server, Code, Layout, Wrench, Sparkles, Star, List, Grid } from 'lucide-react';
import { experienceState } from '../../lib/experienceStore';

const categoryIcons: Record<string, React.ReactNode> = {
  'core-cs': <Terminal className="w-4 h-4 text-accent-aqua-ink" />,
  backend: <Server className="w-4 h-4 text-accent-indigo-ink" />,
  languages: <Code className="w-4 h-4 text-accent-aqua-ink" />,
  databases: <Database className="w-4 h-4 text-accent-indigo-ink" />,
  frontend: <Layout className="w-4 h-4 text-accent-aqua-ink" />,
  tools: <Wrench className="w-4 h-4 text-accent-indigo-ink" />,
  ai: <Sparkles className="w-4 h-4 text-accent-lime" />,
};

export const Skills: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const relatedCategory = skillsCategories.find((category) =>
    category.skills.some((skill) => skill.name === activeSkill)
  );

  const handleActivateSkill = (name: string) => {
    setActiveSkill(name);
    experienceState.activeSkill = name;
    window.dispatchEvent(new CustomEvent('aurora-skill-change', { detail: name }));
  };

  const handleClear = () => {
    setActiveSkill('');
    experienceState.activeSkill = '';
    window.dispatchEvent(new CustomEvent('aurora-skill-change', { detail: '' }));
  };

  return (
    <section id="skills" className="py-24 sm:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header with glowing star and mono label */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-border/15">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <Star className="w-4 h-4 text-accent-lime fill-accent-lime animate-pulse" aria-hidden="true" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent-lime font-semibold">
              03 / LAB · // THE LAB
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase text-text tracking-tight leading-none">
            TECHNICAL ARSENAL
          </h2>

          <p className="mt-3 text-sm sm:text-base text-text-2 font-mono max-w-2xl">
            Interactive skill matrix mapped onto the 3D honeycomb floor. Select a cell to illuminate related toolchains.
          </p>
        </div>

        {/* View Mode Toggle: Hex Grid vs Plain List */}
        <div className="mt-6 md:mt-0 flex items-center gap-2">
          <div className="flex items-center p-1 rounded-full border border-border/20 bg-surface/60 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                viewMode === 'grid'
                  ? 'bg-accent-aqua/20 text-accent-aqua-ink font-semibold'
                  : 'text-text-2 hover:text-text'
              }`}
              aria-pressed={viewMode === 'grid'}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                viewMode === 'list'
                  ? 'bg-accent-aqua/20 text-accent-aqua-ink font-semibold'
                  : 'text-text-2 hover:text-text'
              }`}
              aria-pressed={viewMode === 'list'}
            >
              <List className="w-3.5 h-3.5" />
              <span>Plain List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Feedback Banner */}
      <div className="flex items-center justify-between min-h-8 mb-6 text-xs font-mono text-text-2 bg-surface/40 px-4 py-2 rounded-xl border border-border/10" aria-live="polite">
        <span>
          {activeSkill ? (
            <>
              Active node: <strong className="text-accent-aqua-ink">{activeSkill}</strong> · Group: <span className="text-text font-medium">{relatedCategory?.title}</span>
            </>
          ) : (
            'Hover or focus any technology node to trace its network beams in the lab.'
          )}
        </span>
        {activeSkill && (
          <button
            type="button"
            className="text-accent-aqua-ink hover:underline uppercase text-[11px] tracking-wider"
            onClick={handleClear}
          >
            Clear
          </button>
        )}
      </div>

      {/* Hex Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillsCategories.map((category, idx) => {
            const isEven = idx % 2 === 1;
            const accent = isEven ? 'teal' : 'gold';

            return (
              <div
                key={category.id}
                className="skill-category p-6 sm:p-7 rounded-2xl bg-surface-glass border border-border/15 backdrop-blur-xl flex flex-col justify-between hover:border-accent-aqua/30 transition-all duration-300"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-border/10">
                    <div className="flex items-center gap-2.5">
                      {categoryIcons[category.id] || <Code className="w-4 h-4 text-accent-aqua-ink" />}
                      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-text font-bold">
                        {category.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-text-2 px-2 py-0.5 rounded-full border border-border/10 bg-surface/80">
                      {category.skills.length}
                    </span>
                  </div>

                  {/* Skills Cells */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 list-none p-0 m-0">
                    {category.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className={`transition-opacity duration-200 ${
                          activeSkill && relatedCategory?.id !== category.id ? 'opacity-35' : 'opacity-100'
                        }`}
                      >
                        <SkillTile
                          skill={skill}
                          accent={accent}
                          selected={activeSkill === skill.name}
                          related={Boolean(activeSkill && relatedCategory?.id === category.id)}
                          onActivate={() => handleActivateSkill(skill.name)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Accessible Plain List View */
        <div className="p-8 rounded-2xl bg-surface-glass border border-border/15 backdrop-blur-xl space-y-6">
          {skillsCategories.map((category) => (
            <div key={category.id} className="pb-4 border-b border-border/10 last:border-b-0">
              <h3 className="text-sm font-mono uppercase tracking-widest text-accent-aqua-ink font-bold mb-3">
                {category.title}
              </h3>
              <ul className="flex flex-wrap gap-2.5 list-none p-0 m-0">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="px-3 py-1.5 rounded-lg border border-border/20 bg-surface text-xs font-mono text-text flex items-center gap-2"
                  >
                    <span>{skill.name}</span>
                    {skill.level && (
                      <span className="text-[10px] text-accent-aqua-ink">({skill.level})</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Lab Footer Note */}
      <div className="mt-12 p-6 rounded-2xl border border-border/10 bg-surface/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-lime" />
          <span>Strictly verified skills from resume. Core CS &amp; daily DSA practice on LeetCode.</span>
        </div>
        <div className="text-text">
          <span>7 Categories · 20 Core Technologies</span>
        </div>
      </div>
    </section>
  );
};
