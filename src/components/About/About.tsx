import React from 'react';
import { educationData, personalBio } from '../../data/education';
import { GraduationCap, CheckCircle2, MapPin } from 'lucide-react';
import { DeveloperTerminal } from './DeveloperTerminal';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
            02 / Trail · Background & Focus
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#f4f1ea] tracking-tight">
          About Me
        </h2>

        <p className="mt-3 text-base text-[#8e95a2] font-mono max-w-2xl">
          Engineering trajectory, academic foundations, and technical interests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Bio & Core Philosophy (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Editorial Bio Card */}
          <div className="about-panel p-8 sm:p-10 rounded-xl bg-[#0c0e14]/70 border border-white/[0.08] backdrop-blur-md">
            <h3 className="text-2xl sm:text-3xl font-serif text-[#f4f1ea] mb-4">
              Building serious software with curious precision.
            </h3>

            <p className="text-base sm:text-lg text-[#cfcac0] leading-relaxed mb-6 font-normal">
              {personalBio.introParagraph}
            </p>

            <p className="text-sm sm:text-base text-[#8e95a2] leading-relaxed mb-8">
              Currently pursuing my B.Tech in Computer Science & Engineering (2024–2028) at Pranveer Singh
              Institute of Technology (PSIT), AKTU. My journey is rooted in developing deep foundations across
              core computing principles, modern backend architectures, and intelligent data systems that solve
              tangible problems.
            </p>

            {/* What I enjoy */}
            <div className="pt-6 border-t border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#edd894] block mb-4">
                What I Genuinely Enjoy:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {personalBio.passions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#cfcac0]">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-[#d4af37] shrink-0" />
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
                className="p-5 rounded-lg bg-[#0e1118]/60 border border-white/[0.06] backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]" />
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#f4f1ea] font-medium">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-xs text-[#8e95a2] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Identity Monogram & Education Timeline (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Engineering Monogram / Profile Seal */}
          <div className="about-panel p-8 rounded-xl bg-gradient-to-br from-[#12151e]/80 to-[#0b0d13]/80 border border-white/[0.08] backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl border border-[#d4af37]/40 bg-[#151923] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.15)] shrink-0">
                <span className="font-serif text-2xl font-bold text-[#edd894]">AS</span>
              </div>
              <div>
                <h4 className="font-serif text-xl text-[#f4f1ea] font-medium">Abhijeet Singh</h4>
                <p className="text-xs font-mono text-[#edd894] tracking-wide mt-0.5">
                  Computer Science Undergrad
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8e95a2] mt-1">
                  <MapPin className="w-3 h-3 text-[#d4af37]" />
                  <span>Lucknow, Uttar Pradesh, India</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#090b10] border border-white/[0.05] text-xs font-mono text-[#cfcac0] space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#8e95a2]">Institution:</span>
                <span className="text-[#f4f1ea] font-medium">PSIT, AKTU</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e95a2]">Degree:</span>
                <span>B.Tech in CSE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e95a2]">Cohort:</span>
                <span className="text-[#edd894]">2024 — 2028</span>
              </div>
            </div>
          </div>

          <DeveloperTerminal />

          {/* Vertical Education Timeline */}
          <div className="about-panel p-8 rounded-xl bg-[#0c0e14]/70 border border-white/[0.08] backdrop-blur-md">
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-white/[0.06]">
              <GraduationCap className="w-4 h-4 text-[#d4af37]" />
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#f4f1ea] font-medium">
                Education Timeline
              </h4>
            </div>

            {/* Vertical timeline line */}
            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-gradient-to-b before:from-[#d4af37] before:via-[#2dd4bf]/50 before:to-transparent">
              {educationData.map((item, eIdx) => (
                <div key={eIdx} className="relative group">
                  {/* Circular timeline marker */}
                  <span
                    className={`absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 bg-[#08090b] transition-all duration-300 ${
                      eIdx === 0
                        ? 'border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.6)]'
                        : 'border-[#2dd4bf] shadow-[0_0_8px_rgba(45,212,191,0.4)]'
                    }`}
                  />

                  {/* Period tag */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-mono text-[#edd894] tracking-wider font-semibold">
                      {item.period}
                    </span>
                    {item.status && (
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.05] text-[#8e95a2] border border-white/[0.08]">
                        {item.status}
                      </span>
                    )}
                  </div>

                  <h5 className="text-base font-serif text-[#f4f1ea] group-hover:text-[#edd894] transition-colors leading-snug">
                    {item.degree}
                  </h5>

                  <p className="text-xs font-mono text-[#cfcac0] mt-1">
                    {item.institution}
                  </p>

                  {item.university && (
                    <p className="text-[11px] font-mono text-[#8e95a2]">
                      {item.university}
                    </p>
                  )}

                  <p className="text-[10px] font-mono text-[#8e95a2] mt-1 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" />
                    {item.location}
                  </p>

                  <ul className="mt-3 space-y-1.5">
                    {item.highlights.map((point, pIdx) => (
                      <li key={pIdx} className="text-xs text-[#8e95a2] leading-relaxed">
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
