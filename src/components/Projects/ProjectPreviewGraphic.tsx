import React from 'react';
import type { Project } from '../../types';
import {
  Activity,
  Layers,
  Search,
  CheckCircle2,
  Cpu,
  Sun,
  Zap,
  TrendingUp,
  Shield,
  Newspaper,
} from 'lucide-react';

interface ProjectPreviewGraphicProps {
  project: Project;
}

export const ProjectPreviewGraphic: React.FC<ProjectPreviewGraphicProps> = ({ project }) => {
  if (project.id === 'ai-incident-intelligence') {
    return (
      <div className="w-full h-full min-h-[260px] p-5 rounded-lg bg-surface/85 border border-border/[0.06] flex flex-col justify-between font-mono text-xs relative overflow-hidden group">
        {/* Glow ambient background */}
        <div className="aurora-blob aurora-blob-indigo absolute top-0 right-0 w-36 h-36 pointer-events-none" />

        {/* Header bar */}
        <div className="flex items-center justify-between pb-3 border-b border-border/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-tangerine animate-pulse" />
            <span className="text-text-2 text-[11px] font-medium tracking-wide">
              INCIDENT TRACE / ANALYSIS
            </span>
          </div>
          <span className="text-[10px] text-accent-indigo-ink px-2 py-0.5 rounded bg-accent-indigo/10 border border-accent-indigo/25">
            RAG ROOT-CAUSE ENGINE
          </span>
        </div>

        {/* Pipeline steps */}
        <div className="my-4 space-y-2.5">
          <div className="p-2.5 rounded bg-surface border border-border/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-accent-indigo-ink" />
              <span className="text-text text-[11px]">Log Stream Anomaly Detected</span>
            </div>
            <span className="text-[10px] text-text-2">FastAPI Ingest</span>
          </div>

          <div className="p-2.5 rounded bg-surface border border-border/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-accent-aqua-ink" />
              <span className="text-text text-[11px]">Dense Vector Similarity Search</span>
            </div>
            <span className="text-[10px] text-accent-aqua-ink">Vector retrieval</span>
          </div>

          <div className="p-2.5 rounded bg-surface border border-accent-indigo/20 flex items-center justify-between bg-gradient-to-r from-accent-indigo/5 to-transparent">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent-indigo-ink" />
              <span className="text-accent-indigo-ink text-[11px] font-medium">Root Cause Grounded</span>
            </div>
            <span className="text-[10px] text-text-2">Evidence grounded</span>
          </div>
        </div>

        {/* Footer telemetry */}
        <div className="pt-3 border-t border-border/[0.06] flex items-center justify-between text-[10px] text-text-2">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-accent-indigo-ink" />
            PostgreSQL + Embeddings
          </span>
          <span className="text-text-2">MTTR Optimization</span>
        </div>
      </div>
    );
  }

  if (project.id === 'solisiq') {
    return (
      <div className="w-full h-full min-h-[260px] p-5 rounded-lg bg-surface/85 border border-border/[0.06] flex flex-col justify-between font-mono text-xs relative overflow-hidden group">
        <div className="aurora-blob aurora-blob-aqua absolute top-0 right-0 w-36 h-36 pointer-events-none" />

        {/* Header bar */}
        <div className="flex items-center justify-between pb-3 border-b border-border/[0.06]">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-accent-indigo-ink" />
            <span className="text-text-2 text-[11px] font-medium">SOLAR USAGE & SAVINGS</span>
          </div>
          <span className="text-[10px] text-accent-aqua-ink px-2 py-0.5 rounded bg-accent-aqua/10 border border-accent-aqua/25">
            RESPONSIVE DASHBOARD
          </span>
        </div>

        {/* Visual Chart Bars Graphic */}
        <div className="my-4 py-2 px-3 rounded bg-surface border border-border/[0.05]">
          <div className="flex justify-between text-[10px] text-text-2 mb-3">
            <span>Energy generation and usage</span>
            <span className="text-accent-aqua-ink">Environmental impact</span>
          </div>
          {/* Simulated mini chart */}
          <div className="h-16 flex items-end gap-2 pt-2">
            {[35, 55, 75, 95, 88, 62, 40, 20].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t transition-all duration-500 bg-gradient-to-t from-accent-aqua to-accent-aqua group-hover:brightness-110"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/[0.06]">
          <div className="flex items-center gap-2 text-[10px] text-text-2">
            <Zap className="w-3 h-3 text-accent-indigo-ink" />
            <span>Capacity recommendation</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-text-2">
            <TrendingUp className="w-3 h-3 text-accent-aqua-ink" />
            <span>Savings analysis</span>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 'instanews') {
    return (
      <div className="w-full h-full min-h-[260px] p-5 rounded-lg bg-surface/85 border border-border/[0.06] flex flex-col justify-between font-mono text-xs relative overflow-hidden group">
        <div className="aurora-blob aurora-blob-magenta absolute top-0 right-0 w-36 h-36 pointer-events-none" />

        <div className="flex items-center justify-between pb-3 border-b border-border/[0.06]">
          <div className="flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-accent-indigo-ink" />
            <span className="text-text-2 text-[11px] font-medium">INSTANEWS ENGINE</span>
          </div>
          <span className="text-[10px] text-accent-indigo-ink px-2 py-0.5 rounded bg-accent-indigo/10 border border-accent-indigo/25">
            FULL-STACK / RBAC
          </span>
        </div>

        <div className="my-4 space-y-2">
          <div className="p-2.5 rounded bg-surface border border-border/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-accent-indigo-ink" />
              <span className="text-text text-[11px]">JWT RBAC Security Middleware</span>
            </div>
            <span className="text-[10px] text-accent-aqua-ink">Role-based access</span>
          </div>

          <div className="p-2.5 rounded bg-surface border border-border/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-accent-indigo-ink" />
              <span className="text-text text-[11px]">Redux Toolkit Slice Caching</span>
            </div>
            <span className="text-[10px] text-text-2">Infinite Scroll Node</span>
          </div>
        </div>

        <div className="pt-3 border-t border-border/[0.06] flex items-center justify-between text-[10px] text-text-2">
          <span>REST API + Express + MongoDB</span>
          <span className="text-accent-indigo-ink">Cached content delivery</span>
        </div>
      </div>
    );
  }

  // ZeroHour
  return (
    <div className="w-full h-full min-h-[260px] p-5 rounded-lg bg-surface/85 border border-border/[0.06] flex flex-col justify-between font-mono text-xs relative overflow-hidden group">
      <div className="flex items-center justify-between pb-3 border-b border-border/[0.06]">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent-aqua-ink" />
          <span className="text-text-2 text-[11px] font-medium">ZEROHOUR</span>
        </div>
        <span className="text-[10px] text-accent-aqua-ink px-2 py-0.5 rounded bg-accent-aqua/10 border border-accent-aqua/25">COUNTDOWN</span>
      </div>
      <div className="grid grid-cols-4 gap-2 my-5 text-center">
        {['Days', 'Hours', 'Minutes', 'Seconds'].map((unit) => (
          <div key={unit} className="p-2 rounded bg-surface border border-border/[0.06]">
            <span className="block text-base sm:text-xl text-text">{unit[0]}</span>
            <span className="text-[9px] text-text-2">{unit}</span>
          </div>
        ))}
      </div>
      <div className="pt-3 border-t border-border/[0.06] text-[10px] text-text-2">
        Date calculations | Dynamic updates | Completion handling
      </div>
    </div>
  );
};
