import React, { useState } from 'react';
import { educationData, certificationData, careerObjective } from '../../data/education';
import { GraduationCap, Award, CheckCircle, ExternalLink } from 'lucide-react';
import { siteLinks } from '../../data/socialLinks';
import { playClick, playSuccess } from '../../lib/sound';

type TerminalTab = 'mission' | 'stack' | 'focus' | 'whoami';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TerminalTab>('mission');
  const [customCommand, setCustomCommand] = useState<string>('');
  const [commandFeedback, setCommandFeedback] = useState<string | null>(null);

  const handleRunCommand = (cmd: string) => {
    playClick();
    const cleanCmd = cmd.trim().toLowerCase();
    if (cleanCmd.includes('mission') || cleanCmd === '1') {
      setActiveTab('mission');
      setCommandFeedback('Displaying engineering mission');
    } else if (cleanCmd.includes('stack') || cleanCmd === '2') {
      setActiveTab('stack');
      setCommandFeedback('Displaying verified tech stack JSON');
    } else if (cleanCmd.includes('focus') || cleanCmd === '3') {
      setActiveTab('focus');
      setCommandFeedback('Displaying core engineering pillars');
    } else if (cleanCmd.includes('whoami') || cleanCmd === '4') {
      setActiveTab('whoami');
      setCommandFeedback('Displaying user credentials');
    } else if (cleanCmd.includes('dsa') || cleanCmd.includes('leetcode')) {
      playSuccess();
      setActiveTab('stack');
      setCommandFeedback('Verified: 250+ LeetCode DSA algorithmic problems solved.');
    } else if (cleanCmd === 'clear') {
      setCommandFeedback(null);
    } else {
      setCommandFeedback(`Command '${cmd}' not recognized. Try: mission, stack, focus, whoami, dsa, clear`);
    }
  };

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
        {/* Left Column: Interactive Developer Terminal & Certifications (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Interactive Developer Terminal: AS-SHELL */}
          <div className="card-base rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl reveal-item">
            {/* Terminal Window Header Bar */}
            <div className="bg-[var(--surface-2)]/90 px-4 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
                <span className="ml-2 font-mono text-[11px] text-[var(--text-2)] font-semibold hidden sm:inline">
                  as-shell // ~/engineering-intent
                </span>
              </div>

              {/* Mode Tabs */}
              <div className="flex items-center gap-1 font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => setActiveTab('mission')}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    activeTab === 'mission'
                      ? 'bg-[var(--accent-secondary)] text-[var(--bg)] font-bold'
                      : 'text-[var(--text-2)] hover:text-[var(--text)]'
                  }`}
                >
                  mission.sh
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('stack')}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    activeTab === 'stack'
                      ? 'bg-[var(--accent-secondary)] text-[var(--bg)] font-bold'
                      : 'text-[var(--text-2)] hover:text-[var(--text)]'
                  }`}
                >
                  stack.json
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('focus')}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    activeTab === 'focus'
                      ? 'bg-[var(--accent-secondary)] text-[var(--bg)] font-bold'
                      : 'text-[var(--text-2)] hover:text-[var(--text)]'
                  }`}
                >
                  focus.md
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('whoami')}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    activeTab === 'whoami'
                      ? 'bg-[var(--accent-secondary)] text-[var(--bg)] font-bold'
                      : 'text-[var(--text-2)] hover:text-[var(--text)]'
                  }`}
                >
                  whoami
                </button>
              </div>
            </div>

            {/* Terminal Body Content */}
            <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm bg-[var(--surface)] min-h-[260px] flex flex-col justify-between">
              {activeTab === 'mission' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="text-[var(--text-2)] flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span>cat mission.sh</span>
                  </div>
                  <div className="text-[var(--text)] leading-relaxed text-xs sm:text-sm border-l-2 border-[var(--accent-secondary)] pl-3 py-1">
                    "{careerObjective}"
                  </div>
                  <div className="pt-2 text-[10px] text-[var(--accent-secondary)] font-bold">
                    # STATUS: Available for software engineering opportunities
                  </div>
                </div>
              )}

              {activeTab === 'stack' && (
                <div className="space-y-2 text-xs font-mono animate-fadeIn">
                  <div className="text-[var(--text-2)] flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span>jq . stack.json</span>
                  </div>
                  <pre className="text-teal-300 bg-[var(--surface-2)]/60 p-3 rounded-lg overflow-x-auto text-[11px] sm:text-xs">
{`{
  "engineer": "Abhijeet Singh",
  "degree": "B.Tech Computer Science (PSIT 2024–28)",
  "specializations": ["Backend APIs", "Full-Stack", "AI/ML"],
  "core_stack": ["FastAPI", "Python", "React.js", "C++", "SQL"],
  "verified_dsa": "250+ LeetCode problems solved"
}`}
                  </pre>
                </div>
              )}

              {activeTab === 'focus' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="text-[var(--text-2)] flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span>cat focus.md</span>
                  </div>
                  <ul className="space-y-2 list-none p-0 m-0">
                    {[
                      'Scalable backend systems and RESTful API architecture',
                      'Database-driven full-stack engineering with modern React & Python',
                      'AI/ML integration: anomaly detection, vector search, and RAG pipelines',
                      'Strengthening Data Structures & Algorithms with consistent practice',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--text)]">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'whoami' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="text-[var(--text-2)] flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span>whoami --verbose</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[var(--surface-2)]/70 border border-[var(--border-subtle)] space-y-1.5 text-xs">
                    <p className="font-bold text-[var(--text)]">Abhijeet Singh</p>
                    <p className="text-[var(--text-2)]">Undergraduate Software Developer · Lucknow, India</p>
                    <p className="text-[var(--accent-secondary)]">PSIT Computer Science (2024–2028) · CGPA 7.54</p>
                  </div>
                </div>
              )}

              {/* Quick Execution Pills & Command Prompt */}
              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] text-[var(--text-2)] font-mono">Quick Run:</span>
                  {(['mission', 'stack', 'focus', 'whoami'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => handleRunCommand(tab)}
                      className="px-2 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border-subtle)] hover:border-[var(--accent-secondary)] text-[10px] font-mono text-[var(--text-2)] hover:text-[var(--text)] transition-colors cursor-pointer"
                    >
                      cat {tab}
                    </button>
                  ))}
                </div>

                {/* Interactive CLI Command Input Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (customCommand.trim()) {
                      handleRunCommand(customCommand);
                      setCustomCommand('');
                    }
                  }}
                  className="flex items-center gap-2 pt-2 border-t border-[var(--border-subtle)] text-xs font-mono"
                >
                  <span className="text-emerald-400 font-bold">$</span>
                  <input
                    type="text"
                    value={customCommand}
                    onChange={(e) => setCustomCommand(e.target.value)}
                    placeholder="Type command: mission, stack, focus, whoami, dsa, clear..."
                    className="flex-1 bg-transparent border-none outline-none text-[var(--text)] placeholder-[var(--text-2)]/50 font-mono text-xs"
                    aria-label="Terminal command prompt"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--accent-secondary)] hover:bg-[var(--accent-secondary)] hover:text-[var(--bg)] transition-colors cursor-pointer font-bold"
                  >
                    EXEC
                  </button>
                </form>

                {commandFeedback && (
                  <div className="text-[11px] font-mono text-teal-300 flex items-center gap-1.5 animate-fadeIn">
                    <span className="text-emerald-400">&gt;&gt;</span>
                    <span>{commandFeedback}</span>
                  </div>
                )}
              </div>
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
                    className={`absolute -left-[22px] top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-[var(--surface)] transition-all ${
                      idx === 0
                        ? 'border-[var(--accent-secondary)] bg-[var(--accent-secondary)]/30 ring-4 ring-[var(--accent-secondary)]/15 scale-110'
                        : 'border-[var(--border)] group-hover:border-[var(--accent-secondary)]'
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
