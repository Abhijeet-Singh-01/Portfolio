import React, { useState } from 'react';
import { playClick, playAlert, playSuccess } from '../../lib/sound';

interface ProjectVisualProps {
  projectId: string;
  projectName: string;
  isActive?: boolean;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ projectId, projectName, isActive = true }) => {
  // SolisIQ Interactive States
  const [solisPreset, setSolisPreset] = useState<'eco' | 'standard' | 'max'>('standard');

  // AI Incident Intelligence Interactive States
  const [aiStage, setAiStage] = useState<'monitoring' | 'spike' | 'rca'>('monitoring');

  // SETU Interactive States
  const [setuUnit, setSetuUnit] = useState<'all' | 'resp1' | 'resp2'>('all');

  // Interactive 3D Pointer Tilt
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.setProperty('--pvis-rx', `${(-y * 14).toFixed(2)}deg`);
    e.currentTarget.style.setProperty('--pvis-ry', `${(x * 14).toFixed(2)}deg`);
    e.currentTarget.style.setProperty('--pvis-gx', `${((x + 0.5) * 100).toFixed(1)}%`);
    e.currentTarget.style.setProperty('--pvis-gy', `${((y + 0.5) * 100).toFixed(1)}%`);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--pvis-rx', '0deg');
    e.currentTarget.style.setProperty('--pvis-ry', '0deg');
  };

  const containerClasses = `project-visual-3d relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl bg-[var(--surface-2)] border transition-[border-color,box-shadow,opacity] duration-500 overflow-hidden p-4 sm:p-6 flex flex-col justify-between ${
    isActive
      ? 'border-[var(--border)] shadow-2xl opacity-100'
      : 'border-[var(--border-subtle)] shadow-md opacity-70'
  }`;

  switch (projectId) {
    case 'solisiq': {
      const presets = {
        eco: { kw: '3.0 kW', offset: 52, dash: 120, bill: '-44.0%', payback: '4.5 Yrs' },
        standard: { kw: '4.8 kW', offset: 74, dash: 65, bill: '-62.5%', payback: '3.8 Yrs' },
        max: { kw: '7.2 kW', offset: 94, dash: 15, bill: '-79.0%', payback: '3.1 Yrs' },
      };
      const activeData = presets[solisPreset];

      return (
        <div
          className={`${containerClasses} iso-stage-3d`}
          style={{ transformStyle: 'preserve-3d', perspective: '1100px' }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          aria-label="SolisIQ Interactive 3D Solar Sizing Dashboard"
        >
          {/* Background Solar Radiance & 3D Ambient Sun Arc */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
              isActive
                ? 'bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.20)_0%,rgba(20,184,166,0.12)_45%,transparent_70%)] opacity-100'
                : 'opacity-20'
            }`}
            aria-hidden="true"
          />
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-400/15 blur-2xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"
            aria-hidden="true"
          />

          {/* Visual Header (translateZ 24px) */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 vis-depth-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[var(--surface)]/90 backdrop-blur-sm border border-[var(--border)] text-[10px] font-mono text-[var(--text)] font-semibold shadow-sm">
              <span className={`w-1.5 h-1.5 rounded-full bg-amber-400 ${isActive ? 'animate-pulse' : ''}`} />
              <span>3D SOLAR SIZING ARSENAL</span>
            </div>

            {/* Interactive Sizing Capacity Selector */}
            <div className="flex items-center gap-1 bg-[var(--surface)]/90 p-0.5 rounded-md border border-[var(--border-subtle)]">
              {(['eco', 'standard', 'max'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    playClick();
                    setSolisPreset(mode);
                  }}
                  aria-pressed={solisPreset === mode}
                  className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold transition-all cursor-pointer ${
                    solisPreset === mode
                      ? 'bg-amber-400 text-black shadow-xs'
                      : 'text-[var(--text-2)] hover:text-[var(--text)]'
                  }`}
                >
                  {mode === 'eco' ? '3kW' : mode === 'standard' ? '4.8kW' : '7.2kW'}
                </button>
              ))}
            </div>
          </div>

          {/* Center Graphic: 3D Isometric Solar Cell Array + Floating Solar Dial */}
          <div
            className="relative z-10 my-auto grid grid-cols-12 items-center gap-4 py-2"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Left: Floating 3D Solar Generation Dial (translateZ 36px) */}
            <div className="col-span-5 flex justify-center vis-depth-2">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                {/* Outer Celestial Glow Ring */}
                <div className="absolute inset-0 rounded-full border border-amber-400/25 animate-pulse" />
                <svg className="w-full h-full -rotate-90 drop-shadow-lg" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="var(--border)" strokeWidth="7" fill="none" opacity="0.4" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="var(--accent-secondary)"
                    strokeWidth="8"
                    strokeDasharray="251"
                    strokeDashoffset={activeData.dash}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-mono text-base sm:text-lg font-black text-[var(--text)] tracking-tight">
                    {activeData.offset}%
                  </span>
                  <span className="font-mono text-[9px] text-[var(--accent-secondary)] font-bold tracking-wider">
                    OFFSET
                  </span>
                </div>
              </div>
            </div>

            {/* Right: 3D Photovoltaic Isometric Matrix & Telemetry Bars */}
            <div className="col-span-7 space-y-2.5" style={{ transformStyle: 'preserve-3d' }}>
              {/* 3D Isometric Solar Panel Plate */}
              <div
                className="relative p-2.5 rounded-xl bg-gradient-to-br from-[var(--surface)] via-[var(--surface-2)] to-[var(--surface)] border border-[var(--border)] shadow-md overflow-hidden"
                style={{
                  transform: 'rotateX(22deg) rotateY(-10deg) translateZ(18px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Dynamic Caustic Sunlight Sheen */}
                <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent pointer-events-none animate-caustic-sheen" />

                <div className="flex items-center justify-between text-[10px] font-mono mb-1.5 text-[var(--text)]">
                  <span className="flex items-center gap-1 font-semibold text-amber-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    PHOTOVOLTAIC MATRIX
                  </span>
                  <span className="font-bold">{activeData.kw} Peak</span>
                </div>

                <div className="h-2 w-full bg-[var(--surface-2)] rounded-full overflow-hidden p-0.5 border border-[var(--border-subtle)]">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-teal-400 to-[var(--accent-secondary)] rounded-full transition-all duration-500"
                    style={{ width: `${activeData.offset}%` }}
                  />
                </div>
              </div>

              {/* Bill Reduction & Payback Floating Readouts */}
              <div
                className="grid grid-cols-2 gap-2 text-[10px] font-mono"
                style={{ transform: 'translateZ(28px)', transformStyle: 'preserve-3d' }}
              >
                <div className="p-2 rounded-lg bg-[var(--surface)]/90 border border-[var(--border-subtle)] shadow-xs">
                  <span className="text-[var(--text-2)] text-[9px] block">Bill Reduction</span>
                  <span className="text-teal-300 font-bold text-xs">{activeData.bill}</span>
                </div>
                <div className="p-2 rounded-lg bg-[var(--surface)]/90 border border-[var(--border-subtle)] shadow-xs">
                  <span className="text-[var(--text-2)] text-[9px] block">Payback Break-even</span>
                  <span className="text-[var(--text)] font-bold text-xs">{activeData.payback}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Footer (Elevated in 3D: translateZ 20px) */}
          <div className="relative z-20 flex items-center justify-between pt-2.5 border-t border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text)]/85 vis-depth-1">
            <span>FLASK REST // MYSQL &amp; RENDER</span>
            <span className="text-teal-300 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              SIMULATION ACTIVE
            </span>
          </div>
        </div>
      );
    }

    case 'ai-incident-intelligence': {
      return (
        <div
          className={`${containerClasses} iso-stage-3d`}
          style={{ transformStyle: 'preserve-3d', perspective: '1100px' }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          aria-label="AI Incident Intelligence Interactive Radar"
        >
          {/* Background Radial Glow & Neural Lattice */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
              isActive
                ? aiStage === 'spike'
                  ? 'bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.22),transparent_65%)] opacity-100'
                  : 'bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.22),transparent_65%)] opacity-100'
                : 'opacity-20'
            }`}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:24px_24px] opacity-25 pointer-events-none"
            aria-hidden="true"
          />

          {/* Visual Header (translateZ 24px) */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 vis-depth-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[var(--surface)]/90 backdrop-blur-sm border border-[var(--border)] text-[10px] font-mono text-[var(--text)] font-semibold shadow-sm">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  aiStage === 'spike' ? 'bg-red-500 animate-ping' : 'bg-emerald-400 animate-pulse'
                }`}
              />
              <span>3D ANOMALY DETECTION RADAR</span>
            </div>

            {/* Interactive Simulation Controls */}
            <div className="flex items-center gap-1 bg-[var(--surface)]/90 p-0.5 rounded-md border border-[var(--border-subtle)]">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setAiStage('monitoring');
                }}
                className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold transition-all cursor-pointer ${
                  aiStage === 'monitoring'
                    ? 'bg-[var(--accent-secondary)] text-[var(--bg)] shadow-xs'
                    : 'text-[var(--text-2)] hover:text-[var(--text)]'
                }`}
              >
                Nominal
              </button>
              <button
                type="button"
                onClick={() => {
                  playAlert();
                  setAiStage('spike');
                }}
                className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold transition-all cursor-pointer ${
                  aiStage === 'spike'
                    ? 'bg-rose-500 text-white shadow-xs animate-pulse'
                    : 'text-[var(--text-2)] hover:text-rose-400'
                }`}
              >
                Spike Alert
              </button>
              <button
                type="button"
                onClick={() => {
                  playSuccess();
                  setAiStage('rca');
                }}
                className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold transition-all cursor-pointer ${
                  aiStage === 'rca'
                    ? 'bg-purple-500 text-white shadow-xs'
                    : 'text-[var(--text-2)] hover:text-purple-400'
                }`}
              >
                RAG RCA
              </button>
            </div>
          </div>

          {/* Center Graphic: 3D Spatial Anomaly Waveform Spike + Evidence Lattice */}
          <div
            className="relative z-10 my-auto py-2 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Background 3D Rotating Gimbal Wireframe Ring */}
            <div
              className={`absolute w-44 h-44 rounded-full border pointer-events-none ${
                aiStage === 'spike'
                  ? 'border-rose-500/40 animate-[spin_3s_linear_infinite]'
                  : 'border-indigo-500/20 animate-gyro-3d'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            />

            <svg
              viewBox="0 0 400 135"
              className="w-full h-auto overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Incident signal and evidence graph visual metaphor"
              style={{ transform: 'translateZ(26px)', transformStyle: 'preserve-3d' }}
            >
              {/* Connecting Evidence Links */}
              <line x1="40" y1="70" x2="130" y2="35" stroke="var(--accent-primary)" strokeWidth="1.5" strokeDasharray="3 3" opacity={0.7} />
              <line x1="130" y1="35" x2="230" y2="90" stroke="var(--accent-primary)" strokeWidth="1.5" strokeDasharray="3 3" opacity={0.7} />
              <line x1="230" y1="90" x2="350" y2="45" stroke="var(--accent-secondary)" strokeWidth="1.5" opacity={0.9} />

              {/* Anomaly Waveform Spike */}
              <path
                d={
                  aiStage === 'spike'
                    ? 'M 20 70 Q 70 70, 100 68 T 150 72 T 180 65 L 205 6 L 225 125 L 245 32 L 265 74 T 320 70 T 380 70'
                    : 'M 20 70 Q 70 70, 100 68 T 150 72 T 180 65 L 205 24 L 225 100 L 245 46 L 265 74 T 320 70 T 380 70'
                }
                stroke="url(#aiSignalGradient)"
                strokeWidth={aiStage === 'spike' ? '3.5' : '2.5'}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />

              {/* Clustered Evidence Nodes with Drop Glow */}
              <circle cx="40" cy="70" r="5" fill="var(--surface)" stroke="var(--accent-primary)" strokeWidth="2" />
              <circle cx="130" cy="35" r="6" fill="var(--surface)" stroke="var(--accent-primary)" strokeWidth="2" />

              {/* The Peak Anomaly Node (+45px Z effect) */}
              <circle
                cx="205"
                cy={aiStage === 'spike' ? 6 : 24}
                r={aiStage === 'spike' ? 10 : 7}
                fill="#EF4444"
                stroke="#FECACA"
                strokeWidth="2.5"
                className="transition-all duration-300"
              />
              <circle
                cx="205"
                cy={aiStage === 'spike' ? 6 : 24}
                r={aiStage === 'spike' ? 22 : 14}
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeDasharray="2 3"
                opacity="0.8"
                className="animate-ping"
              />

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

          {/* Visual Footer: Pipeline Stages (translateZ 20px) */}
          <div className="relative z-20 pt-2.5 border-t border-[var(--border-subtle)] text-[10px] font-mono vis-depth-1">
            {aiStage === 'monitoring' && (
              <div className="flex items-center justify-between text-[var(--text-2)]">
                <span>STATUS: NOMINAL (LATENCY 28ms)</span>
                <span className="text-emerald-400 font-semibold">ZERO ANOMALIES</span>
              </div>
            )}
            {aiStage === 'spike' && (
              <div className="flex items-center justify-between text-rose-400 font-bold animate-pulse">
                <span>INCIDENT DETECTED: LATENCY 420ms</span>
                <span>CONFIDENCE: 99.4%</span>
              </div>
            )}
            {aiStage === 'rca' && (
              <div className="flex items-center justify-between text-purple-300 font-bold">
                <span>RCA: VECTOR INDEX MEMORY PRESSURE</span>
                <span className="text-teal-300">AUTO-TUNED</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    case 'setu': {
      return (
        <div
          className={`${containerClasses} iso-stage-3d`}
          style={{ transformStyle: 'preserve-3d', perspective: '1100px' }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          aria-label="SETU Emergency Spatial Coordination Map"
        >
          {/* Background Map Grid & Radial Dispatch Glow */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
              isActive
                ? 'bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.18)_0%,rgba(99,102,241,0.10)_60%,transparent_80%)] opacity-100'
                : 'opacity-20'
            }`}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 pointer-events-none"
            aria-hidden="true"
          />

          {/* Visual Header (translateZ 24px) */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 vis-depth-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[var(--surface)]/90 backdrop-blur-sm border border-[var(--border)] text-[10px] font-mono text-[var(--text)] font-semibold shadow-sm">
              <span className={`w-1.5 h-1.5 rounded-full bg-rose-500 ${isActive ? 'animate-pulse' : ''}`} />
              <span>3D SPATIAL DISPATCH TOPOLOGY</span>
            </div>

            {/* Interactive Responder Filter */}
            <div className="flex items-center gap-1 bg-[var(--surface)]/90 p-0.5 rounded-md border border-[var(--border-subtle)]">
              {(['all', 'resp1', 'resp2'] as const).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => {
                    playClick();
                    setSetuUnit(unit);
                  }}
                  aria-pressed={setuUnit === unit}
                  className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold transition-all cursor-pointer ${
                    setuUnit === unit
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-[var(--text-2)] hover:text-[var(--text)]'
                  }`}
                >
                  {unit === 'all' ? 'All Units' : unit === 'resp1' ? 'Resp-01' : 'Resp-02'}
                </button>
              ))}
            </div>
          </div>

          {/* Center Graphic: 3D Isometric Map Canvas with Elevated Distress Pin */}
          <div
            className="relative z-10 my-auto py-2"
            style={{
              transform: 'rotateX(34deg) rotateZ(-12deg) translateZ(16px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* 3D Radar Wavefront Pulsing across the floor */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-rose-500/40 animate-radar-sweep-3d pointer-events-none" />

            <svg
              viewBox="0 0 400 130"
              className="w-full h-auto overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="SETU emergency map and volunteer dispatch visual"
            >
              {/* Map Topology Roads / Spatial Grid Segments */}
              <path d="M 20 65 L 140 65 L 200 40 L 380 40" stroke="var(--border)" strokeWidth="1.5" opacity="0.4" />
              <path d="M 140 10 L 140 120" stroke="var(--border)" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
              <path d="M 270 20 L 270 125" stroke="var(--border)" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
              <path d="M 60 115 L 200 40 L 340 110" stroke="var(--border)" strokeWidth="1.2" opacity="0.35" />

              {/* Distress Incident Epicentre (Elevated Pin) */}
              <circle cx="200" cy="40" r="22" stroke="#EF4444" strokeWidth="1.2" strokeDasharray="2 4" opacity={isActive ? 0.6 : 0.2} />
              <circle cx="200" cy="40" r="14" fill="#EF4444" fillOpacity="0.25" />
              <circle cx="200" cy="40" r="6" fill="#EF4444" stroke="#FECACA" strokeWidth="2.5" />

              {/* Incident Crosshair Marker */}
              <line x1="186" y1="40" x2="214" y2="40" stroke="#EF4444" strokeWidth="1.5" />
              <line x1="200" y1="26" x2="200" y2="54" stroke="#EF4444" strokeWidth="1.5" />

              {/* Location Tag */}
              <text x="200" y="16" fill="var(--text)" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                INCIDENT: P1 CRITICAL (GPS LOCKED)
              </text>

              {/* Proximity Vector to Responder 01 */}
              {(setuUnit === 'all' || setuUnit === 'resp1') && (
                <>
                  <line
                    x1="90"
                    y1="95"
                    x2="200"
                    y2="40"
                    stroke="var(--accent-secondary)"
                    strokeWidth={setuUnit === 'resp1' ? '2.8' : '1.8'}
                    strokeDasharray="4 3"
                    opacity={isActive ? 1 : 0.4}
                  />
                  <circle cx="90" cy="95" r={setuUnit === 'resp1' ? 9 : 7} fill="var(--surface)" stroke="var(--accent-secondary)" strokeWidth="2" />
                  <circle cx="90" cy="95" r="3.5" fill="var(--accent-secondary)" />
                  <text x="90" y="116" fill="var(--accent-secondary)" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    RESP-01 (0.8 KM · ETA 2.4m)
                  </text>
                </>
              )}

              {/* Proximity Vector to Responder 02 */}
              {(setuUnit === 'all' || setuUnit === 'resp2') && (
                <>
                  <line
                    x1="320"
                    y1="85"
                    x2="200"
                    y2="40"
                    stroke="var(--accent-primary)"
                    strokeWidth={setuUnit === 'resp2' ? '2.8' : '1.8'}
                    strokeDasharray="4 3"
                    opacity={isActive ? 1 : 0.4}
                  />
                  <circle cx="320" cy="85" r={setuUnit === 'resp2' ? 9 : 7} fill="var(--surface)" stroke="var(--accent-primary)" strokeWidth="2" />
                  <circle cx="320" cy="85" r="3.5" fill="var(--accent-primary)" />
                  <text x="320" y="106" fill="var(--accent-primary)" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    RESP-02 (1.4 KM · ETA 4.1m)
                  </text>
                </>
              )}
            </svg>
          </div>

          {/* Visual Footer (translateZ 20px) */}
          <div className="relative z-20 flex items-center justify-between pt-2.5 border-t border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text)]/85 vis-depth-1">
            <span>DISPATCH STATUS: ACTIVE</span>
            <span className="text-teal-300 font-semibold">
              {setuUnit === 'resp1'
                ? 'ROUTE 1 ASSIGNED'
                : setuUnit === 'resp2'
                ? 'ROUTE 2 ASSIGNED'
                : '2 RESPONDERS IN RANGE'}
            </span>
          </div>
        </div>
      );
    }

    default:
      return (
        <div className="w-full aspect-[16/10] rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center font-mono text-xs text-[var(--text-2)]">
          {projectName}
        </div>
      );
  }
};
