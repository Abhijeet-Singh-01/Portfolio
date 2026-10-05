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
  Search,
  Activity,
} from 'lucide-react';
import { siteLinks } from '../../data/socialLinks';
import { playClick, playHover } from '../../lib/sound';

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

const radarMetrics: Record<string, { title: string; score: number; level: string; desc: string }> = {
  languages: {
    title: 'Languages',
    score: 94,
    level: '94% // C++, Python, C, SQL',
    desc: '250+ LeetCode DSA solved in C++ with emphasis on optimal Big-O memory and time complexities.',
  },
  backend: {
    title: 'Backend Systems',
    score: 96,
    level: '96% // FastAPI, REST APIs, Flask',
    desc: 'High-throughput async endpoints, RAG pipeline orchestration, and structured error handling.',
  },
  databases: {
    title: 'Databases & Storage',
    score: 91,
    level: '91% // PostgreSQL, MySQL, MongoDB',
    desc: 'Relational schemas, ACID transactions, geospatial indices, and telemetry persistence.',
  },
  'ml-data': {
    title: 'ML & Data Pipelines',
    score: 89,
    level: '89% // Scikit-learn, Pandas, NumPy',
    desc: 'Anomaly detection models, numerical preprocessing, RAG vector similarity retrieval.',
  },
  frontend: {
    title: 'Modern Frontend',
    score: 87,
    level: '87% // React.js, Tailwind, JS (ES6+)',
    desc: 'Clean component hierarchies, reactive state management, and 60 FPS spatial CSS 3D.',
  },
  tools: {
    title: 'Developer Tooling',
    score: 92,
    level: '92% // Git, GitHub, VS Code',
    desc: 'Strict version control, atomic commits, branch workflows, and modern build tooling.',
  },
};

const skillProjectMap: Record<string, { id: string; name: string }[]> = {
  FastAPI: [
    { id: 'solisiq', name: 'SolisIQ' },
    { id: 'ai-incident-intelligence', name: 'AI Incident Intelligence' },
    { id: 'setu', name: 'SETU' },
  ],
  'React.js': [
    { id: 'solisiq', name: 'SolisIQ' },
    { id: 'setu', name: 'SETU' },
  ],
  Python: [
    { id: 'solisiq', name: 'SolisIQ' },
    { id: 'ai-incident-intelligence', name: 'AI Incident Intelligence' },
    { id: 'setu', name: 'SETU' },
  ],
  'REST APIs': [
    { id: 'solisiq', name: 'SolisIQ' },
    { id: 'ai-incident-intelligence', name: 'AI Incident Intelligence' },
    { id: 'setu', name: 'SETU' },
  ],
  MySQL: [{ id: 'solisiq', name: 'SolisIQ' }],
  PostgreSQL: [{ id: 'setu', name: 'SETU' }],
  'Scikit-learn': [
    { id: 'solisiq', name: 'SolisIQ' },
    { id: 'ai-incident-intelligence', name: 'AI Incident Intelligence' },
  ],
  Pandas: [
    { id: 'solisiq', name: 'SolisIQ' },
    { id: 'ai-incident-intelligence', name: 'AI Incident Intelligence' },
  ],
  NumPy: [
    { id: 'solisiq', name: 'SolisIQ' },
    { id: 'ai-incident-intelligence', name: 'AI Incident Intelligence' },
  ],
  'C++': [{ id: 'skills', name: '250+ LeetCode DSA' }],
  SQL: [
    { id: 'solisiq', name: 'SolisIQ (MySQL)' },
    { id: 'setu', name: 'SETU (PostgreSQL)' },
  ],
};

export const Skills: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'spatial' | 'radar' | 'list'>('spatial');
  const [selectedRadarCategory, setSelectedRadarCategory] = useState<string>('backend');

  const filteredCategories = (
    activeFilter === 'all'
      ? skillsCategories
      : skillsCategories.filter((cat) => cat.id === activeFilter)
  ).map((cat) => {
    if (!searchQuery.trim()) return cat;
    const query = searchQuery.toLowerCase().trim();
    return {
      ...cat,
      skills: cat.skills.filter((s) => s.name.toLowerCase().includes(query)),
    };
  }).filter((cat) => cat.skills.length > 0);

  const totalSkillsCount = skillsCategories.reduce((sum, cat) => sum + cat.skills.length, 0);

  const handleCardPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.setProperty('--card-rx', `${(-y * 10).toFixed(2)}deg`);
    e.currentTarget.style.setProperty('--card-ry', `${(x * 10).toFixed(2)}deg`);
    e.currentTarget.style.setProperty('--card-gx', `${((x + 0.5) * 100).toFixed(1)}%`);
    e.currentTarget.style.setProperty('--card-gy', `${((y + 0.5) * 100).toFixed(1)}%`);
  };

  const handleCardPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--card-rx', '0deg');
    e.currentTarget.style.setProperty('--card-ry', '0deg');
  };

  return (
    <section
      id="skills"
      aria-label="Technical Arsenal and Skills Lab"
      className="py-20 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto relative overflow-hidden"
    >
      {/* 3D Background Hex Honeycomb Floor & Scanline Layer */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 opacity-30 select-none overflow-hidden hex-floor-3d"
        aria-hidden="true"
      >
        <div className="w-full h-full hex-floor-plane">
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
        </div>

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

          {/* View Toggle: Spatial vs Radar Matrix vs Plain List */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                playClick();
                setViewMode('spatial');
              }}
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
              onClick={() => {
                playClick();
                setViewMode('radar');
              }}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'radar'
                  ? 'bg-[var(--surface)] text-[var(--accent-secondary)] font-semibold shadow-xs'
                  : 'text-[var(--text-2)] hover:text-[var(--text)]'
              }`}
              aria-label="Switch to Cybernetic Radar Matrix view"
            >
              <Activity className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Radar Matrix</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playClick();
                setViewMode('list');
              }}
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

        {/* Interactive Query & Search Filter */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-2)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Query skills (e.g. FastAPI, Python, React)..."
              className="w-full pl-9 pr-8 py-1.5 rounded-lg text-xs font-mono bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-2)]/60 focus:outline-none focus:border-[var(--accent-secondary)] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[var(--text-2)] hover:text-[var(--text)] cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && (
            <span className="text-xs font-mono text-[var(--accent-secondary)]">
              Showing filtered results
            </span>
          )}
        </div>

        {/* Dynamic Cross-Project Architecture HUD */}
        {hoveredSkill && skillProjectMap[hoveredSkill] && (
          <div className="mt-4 p-3 rounded-xl bg-[var(--surface)]/95 border border-[var(--accent-secondary)]/60 shadow-lg flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-secondary)] animate-ping" />
              <span className="font-bold text-[var(--text)]">{hoveredSkill.toUpperCase()}</span>
              <span className="text-[var(--text-2)]">is deployed in active architectures:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {skillProjectMap[hoveredSkill].map((proj) => (
                <a
                  key={proj.id}
                  href={`#project-chapter-${proj.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(`project-chapter-${proj.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="px-2.5 py-1 rounded-md bg-[var(--surface-2)] border border-[var(--border)] text-xs font-mono font-semibold text-[var(--accent-secondary)] hover:bg-[var(--accent-secondary)] hover:text-[var(--bg)] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{proj.name}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* View Mode Switching: Spatial 3D Grid vs Cybernetic Radar Matrix vs Accessible List */}
      {viewMode === 'spatial' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              onPointerMove={handleCardPointerMove}
              onPointerLeave={handleCardPointerLeave}
              className="card-base card-3d p-6 flex flex-col justify-between reveal-item relative group hover:border-[var(--accent-secondary)]/50 transition-all duration-300 hover:shadow-lg"
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
                        onMouseEnter={() => {
                          playHover();
                          setHoveredSkill(skill.name);
                        }}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`skill-chip-3d inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-default select-none border ${
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
      ) : viewMode === 'radar' ? (
        /* Mode B: Cybernetic Capabilities Radar / Telemetry Matrix */
        <div className="card-base p-6 sm:p-8 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-[var(--text)]">
                  CYBERNETIC CAPABILITIES RADAR · TELEMETRY MATRIX
                </h3>
              </div>
              <p className="text-xs text-[var(--text-2)] font-mono">
                Multi-axis competency distribution &amp; architectural integration telemetry
              </p>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono text-[var(--text-2)]">
              <span className="px-2.5 py-1 rounded bg-[var(--surface-2)] border border-[var(--border)] text-emerald-400 font-bold">
                SYS // 99.8% NOMINAL
              </span>
              <span className="hidden sm:inline text-[var(--text-2)]/60">|</span>
              <span className="hidden sm:inline">6 VECTORS ACTIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Radar Scope SVG Display (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative w-[280px] sm:w-[320px] h-[280px] sm:h-[320px] select-none">
                <svg className="w-full h-full" viewBox="0 0 320 320" fill="none">
                  {/* Concentric Reference Rings */}
                  <circle cx="160" cy="160" r="30" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  <circle cx="160" cy="160" r="60" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                  <circle cx="160" cy="160" r="90" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                  <circle cx="160" cy="160" r="120" stroke="var(--border-strong)" strokeWidth="1.2" opacity="0.8" />

                  {/* Radial Reference Axes */}
                  <line x1="160" y1="40" x2="160" y2="280" stroke="var(--border)" strokeWidth="1" opacity="0.35" />
                  <line x1="56" y1="100" x2="264" y2="220" stroke="var(--border)" strokeWidth="1" opacity="0.35" />
                  <line x1="56" y1="220" x2="264" y2="100" stroke="var(--border)" strokeWidth="1" opacity="0.35" />

                  {/* Range Percentage Labels */}
                  <text x="165" y="132" fill="var(--text-2)" fontSize="8" fontFamily="monospace" opacity="0.6">25%</text>
                  <text x="165" y="102" fill="var(--text-2)" fontSize="8" fontFamily="monospace" opacity="0.6">50%</text>
                  <text x="165" y="72" fill="var(--text-2)" fontSize="8" fontFamily="monospace" opacity="0.6">75%</text>
                  <text x="165" y="42" fill="var(--accent-secondary)" fontSize="8" fontFamily="monospace" fontWeight="bold">100%</text>

                  {/* Continuous Rotating Sweep Beam */}
                  <g className="radar-sweep-beam">
                    <line x1="160" y1="160" x2="160" y2="40" stroke="var(--accent-secondary)" strokeWidth="1.5" strokeOpacity="0.8" />
                    <path d="M 160 160 L 160 40 A 120 120 0 0 1 245 75 Z" fill="url(#sweep-grad)" opacity="0.25" />
                  </g>

                  {/* Gradient definition for sweep beam */}
                  <defs>
                    <linearGradient id="sweep-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="100%" stopColor="var(--accent-secondary)" />
                    </linearGradient>
                  </defs>

                  {/* Dynamic Telemetry Polygon */}
                  <polygon
                    points="160,47.2 259.8,102.4 254.6,214.6 160,266.8 69.6,212.2 64.4,104.8"
                    fill="rgba(20, 184, 166, 0.18)"
                    stroke="var(--accent-secondary)"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />

                  {/* Active Vertex Nodes */}
                  {[
                    { id: 'languages', cx: 160, cy: 47.2, label: 'LANG' },
                    { id: 'backend', cx: 259.8, cy: 102.4, label: 'BACKEND' },
                    { id: 'databases', cx: 254.6, cy: 214.6, label: 'DATA' },
                    { id: 'ml-data', cx: 160, cy: 266.8, label: 'ML' },
                    { id: 'frontend', cx: 69.6, cy: 212.2, label: 'FRONTEND' },
                    { id: 'tools', cx: 64.4, cy: 104.8, label: 'TOOLS' },
                  ].map((node) => {
                    const isSelected = selectedRadarCategory === node.id;
                    return (
                      <g
                        key={node.id}
                        className="cursor-pointer"
                        onClick={() => {
                          playClick();
                          setSelectedRadarCategory(node.id);
                        }}
                        onMouseEnter={() => playHover()}
                      >
                        {isSelected && (
                          <circle cx={node.cx} cy={node.cy} r="10" stroke="var(--accent-secondary)" strokeWidth="1" fill="none" className="radar-vertex-pulse" />
                        )}
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r={isSelected ? 5.5 : 4}
                          fill={isSelected ? 'var(--accent-secondary)' : 'var(--text)'}
                          stroke="var(--bg)"
                          strokeWidth="1.5"
                        />
                        <text
                          x={node.cx}
                          y={node.cy > 160 ? node.cy + 14 : node.cy - 8}
                          textAnchor="middle"
                          fill={isSelected ? 'var(--accent-secondary)' : 'var(--text-2)'}
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <span className="text-[10px] font-mono text-[var(--text-2)] mt-2">
                Click any vector node to inspect domain telemetry
              </span>
            </div>

            {/* Domain Vector Breakdown List (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              {skillsCategories.map((cat) => {
                const isSelected = selectedRadarCategory === cat.id;
                const metric = radarMetrics[cat.id] || { score: 90, level: '90%', desc: '' };
                return (
                  <div
                    key={cat.id}
                    onClick={() => {
                      playClick();
                      setSelectedRadarCategory(cat.id);
                    }}
                    onMouseEnter={() => playHover()}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--surface-2)] border-[var(--accent-secondary)] shadow-md'
                        : 'bg-[var(--surface-2)]/40 border-[var(--border-subtle)] hover:border-[var(--border)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded bg-[var(--surface)] border border-[var(--border)]">
                          {categoryIcons[cat.id]}
                        </span>
                        <span className="font-mono text-xs font-bold text-[var(--text)] uppercase">
                          {cat.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="text-[var(--accent-secondary)] font-bold">{metric.score}%</span>
                        <span className="text-[10px] text-[var(--text-2)]">({cat.skills.length} skills)</span>
                      </div>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-[var(--accent-secondary)] to-emerald-400 transition-all duration-500"
                        style={{ width: `${metric.score}%` }}
                      />
                    </div>

                    {/* Description & Skill Tags */}
                    {isSelected ? (
                      <div className="space-y-2 mt-2 pt-2 border-t border-[var(--border-subtle)]">
                        <p className="text-xs text-[var(--text-2)] font-mono leading-relaxed">
                          {metric.desc}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.skills.map((s) => (
                            <span
                              key={s.name}
                              className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                s.highlight
                                  ? 'bg-[var(--accent-secondary)]/15 border-[var(--accent-secondary)]/40 text-[var(--accent-secondary)] font-bold'
                                  : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-2)]'
                              }`}
                            >
                              {s.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-2)] truncate">
                        <span>Stack:</span>
                        <span className="truncate">{cat.skills.map((s) => s.name).join(', ')}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Mode C: Accessible Plain Semantic List */
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
