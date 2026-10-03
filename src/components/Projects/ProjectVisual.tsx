import React from 'react';

interface ProjectVisualProps {
  projectId: string;
  projectName: string;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ projectId, projectName }) => {
  switch (projectId) {
    case 'ai-incident-intelligence':
      return (
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] overflow-hidden p-6 flex flex-col justify-between shadow-2xl group">
          {/* Background Ambient Grid & Glow */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.18),transparent_65%)] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none"
            aria-hidden="true"
          />

          {/* Visual Header: Telemetry Status */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[var(--surface)]/80 border border-[var(--border)] text-[10px] font-mono text-[var(--accent-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE TELEMETRY INGESTION</span>
            </div>
            <span className="font-mono text-[10px] text-[var(--text-2)]">RAG PIPELINE // V-SEARCH</span>
          </div>

          {/* Center Graphic: Incident Signal & Connected Evidence Graph */}
          <div className="relative z-10 my-auto py-2">
            <svg
              viewBox="0 0 400 140"
              className="w-full h-auto overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Incident signal and evidence graph visual metaphor"
            >
              {/* Connecting Evidence Links */}
              <line x1="40" y1="70" x2="130" y2="35" stroke="var(--accent-primary)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              <line x1="130" y1="35" x2="230" y2="90" stroke="var(--accent-primary)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              <line x1="230" y1="90" x2="350" y2="45" stroke="var(--accent-secondary)" strokeWidth="1.5" opacity="0.8" />

              {/* Anomaly Waveform Spike */}
              <path
                d="M 20 70 Q 70 70, 100 68 T 150 72 T 180 65 L 205 18 L 225 110 L 245 42 L 265 74 T 320 70 T 380 70"
                stroke="url(#aiSignalGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Clustered Evidence Nodes */}
              <circle cx="40" cy="70" r="5" fill="var(--surface)" stroke="var(--accent-primary)" strokeWidth="2" />
              <circle cx="130" cy="35" r="6" fill="var(--surface)" stroke="var(--accent-primary)" strokeWidth="2" />
              <circle cx="205" cy="18" r="7" fill="#EF4444" stroke="#FECACA" strokeWidth="2" />
              <circle cx="230" cy="90" r="5" fill="var(--surface)" stroke="var(--accent-secondary)" strokeWidth="2" />
              <circle cx="350" cy="45" r="7" fill="var(--accent-secondary)" stroke="var(--surface)" strokeWidth="2" />

              {/* Gradients */}
              <defs>
                <linearGradient id="aiSignalGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--accent-primary)" />
                  <stop offset="50%" stopColor="#EF4444" />
                  <stop offset="85%" stopColor="var(--accent-secondary)" />
                  <stop offset="100%" stopColor="var(--accent-secondary)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Visual Footer: Pipeline Stages */}
          <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-[var(--border-subtle)] text-[11px] font-mono">
            <div className="p-1.5 rounded bg-[var(--surface)]/70 border border-[var(--border-subtle)] text-center">
              <span className="text-[var(--text-2)] block text-[9px]">ML MODEL</span>
              <span className="text-[var(--text)] font-semibold">Anomaly Iso</span>
            </div>
            <div className="p-1.5 rounded bg-[var(--surface)]/70 border border-[var(--border-subtle)] text-center">
              <span className="text-[var(--text-2)] block text-[9px]">RETRIEVAL</span>
              <span className="text-[var(--accent-secondary)] font-semibold">Dense Vector</span>
            </div>
            <div className="p-1.5 rounded bg-[var(--surface)]/70 border border-[var(--border-subtle)] text-center">
              <span className="text-[var(--text-2)] block text-[9px]">SYNTHESIS</span>
              <span className="text-[var(--accent-primary)] font-semibold">Grounded RAG</span>
            </div>
          </div>
        </div>
      );

    case 'solisiq':
      return (
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] overflow-hidden p-6 flex flex-col justify-between shadow-2xl group">
          {/* Background Solar Arc Glow */}
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.18),transparent_60%)] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-amber-400/10 blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Visual Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[var(--surface)]/80 border border-[var(--border)] text-[10px] font-mono text-[var(--accent-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>SOLAR SIZING CALCULATOR</span>
            </div>
            <span className="font-mono text-[10px] text-[var(--text-2)]">FASTAPI // REACT DASHBOARD</span>
          </div>

          {/* Center Graphic: Solar Dial & Energy Efficiency Gauge */}
          <div className="relative z-10 my-auto grid grid-cols-12 items-center gap-4 py-2">
            {/* Dial Gauge */}
            <div className="col-span-5 flex justify-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="var(--border)" strokeWidth="8" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="var(--accent-secondary)"
                    strokeWidth="8"
                    strokeDasharray="251"
                    strokeDashoffset="65"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-mono text-base sm:text-lg font-bold text-[var(--text)]">74%</span>
                  <span className="font-mono text-[9px] text-[var(--text-2)]">OFFSET</span>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown Bars */}
            <div className="col-span-7 space-y-2.5">
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1 text-[var(--text-2)]">
                  <span>Generation</span>
                  <span className="text-[var(--text)] font-semibold">4.8 kW Peak</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--surface)] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[82%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1 text-[var(--text-2)]">
                  <span>Bill Reduction</span>
                  <span className="text-[var(--accent-secondary)] font-semibold">-62.5%</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--surface)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent-secondary)] rounded-full w-[62%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1 text-[var(--text-2)]">
                  <span>Payback Horizon</span>
                  <span className="text-[var(--text)] font-semibold">3.8 Years</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--surface)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent-primary)] rounded-full w-[70%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Visual Footer */}
          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-2)]">
            <span>CONSUMPTION SIZING ENGINE</span>
            <span className="text-[var(--accent-secondary)] font-semibold">ROI OPTIMIZED</span>
          </div>
        </div>
      );

    case 'instanews':
      return (
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] overflow-hidden p-6 flex flex-col justify-between shadow-2xl group">
          {/* Background Editorial Accents */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.15),transparent_65%)] pointer-events-none"
            aria-hidden="true"
          />

          {/* Visual Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[var(--surface)]/80 border border-[var(--border)] text-[10px] font-mono text-[var(--accent-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
              <span>HIGH-THROUGHPUT DISPATCH</span>
            </div>
            <span className="font-mono text-[10px] text-[var(--text-2)]">JWT AUTH // REDUX TOOLKIT</span>
          </div>

          {/* Center Graphic: Editorial Streaming Feed Cards */}
          <div className="relative z-10 my-auto space-y-2 py-1">
            {/* Mock Editorial Card 1 */}
            <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] shadow-sm flex items-center justify-between gap-3">
              <div className="space-y-1.5 flex-1">
                <div className="w-16 h-2 rounded bg-[var(--accent-secondary)]/30" />
                <div className="w-4/5 h-2.5 rounded bg-[var(--text)]/80" />
                <div className="w-3/5 h-2 rounded bg-[var(--text-2)]/40" />
              </div>
              <div className="w-12 h-12 rounded bg-[var(--surface-2)] border border-[var(--border-subtle)] flex items-center justify-center font-mono text-[9px] text-[var(--accent-secondary)] shrink-0">
                LIVE
              </div>
            </div>

            {/* Mock Editorial Card 2 */}
            <div className="p-3 rounded-lg bg-[var(--surface)]/60 border border-[var(--border-subtle)] flex items-center justify-between gap-3 opacity-80">
              <div className="space-y-1.5 flex-1">
                <div className="w-12 h-2 rounded bg-[var(--accent-primary)]/30" />
                <div className="w-2/3 h-2.5 rounded bg-[var(--text)]/70" />
                <div className="w-1/2 h-2 rounded bg-[var(--text-2)]/30" />
              </div>
              <div className="w-12 h-12 rounded bg-[var(--surface-2)] border border-[var(--border-subtle)] flex items-center justify-center font-mono text-[9px] text-[var(--text-2)] shrink-0">
                FEED
              </div>
            </div>
          </div>

          {/* Visual Footer */}
          <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-2)] text-center">
            <span>RBAC ACCESS</span>
            <span className="text-[var(--text)] font-semibold">CACHE LAYER</span>
            <span>INFINITE SCROLL</span>
          </div>
        </div>
      );

    case 'zerohour':
      return (
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] overflow-hidden p-6 flex flex-col justify-between shadow-2xl group">
          {/* Background Radiance */}
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.15),transparent_65%)] pointer-events-none"
            aria-hidden="true"
          />

          {/* Visual Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[var(--surface)]/80 border border-[var(--border)] text-[10px] font-mono text-[var(--accent-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>PRECISION CHRONOMETER</span>
            </div>
            <span className="font-mono text-[10px] text-[var(--text-2)]">DYNAMIC DOM ENGINE</span>
          </div>

          {/* Center Graphic: Digital Countdown Dial & Units */}
          <div className="relative z-10 my-auto py-2">
            <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
              <div className="p-2.5 sm:p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-[var(--text)] block leading-none mb-1">
                  12
                </span>
                <span className="font-mono text-[9px] text-[var(--text-2)] uppercase">DAYS</span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-[var(--text)] block leading-none mb-1">
                  08
                </span>
                <span className="font-mono text-[9px] text-[var(--text-2)] uppercase">HOURS</span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-[var(--accent-secondary)] block leading-none mb-1">
                  45
                </span>
                <span className="font-mono text-[9px] text-[var(--accent-secondary)] uppercase">MINS</span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-[var(--accent-primary)] block leading-none mb-1">
                  20
                </span>
                <span className="font-mono text-[9px] text-[var(--accent-primary)] uppercase">SECS</span>
              </div>
            </div>
          </div>

          {/* Visual Footer */}
          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-2)]">
            <span>INTERVAL TICK RESOLUTION: 1000ms</span>
            <span className="text-emerald-400 font-semibold">T-MINUS TRACKING</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full aspect-[16/10] rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center font-mono text-xs text-[var(--text-2)]">
          {projectName}
        </div>
      );
  }
};
