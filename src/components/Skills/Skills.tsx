import React from 'react';
import { skillsCategories } from '../../data/skills';
import { SkillTile } from './SkillTile';
import { Terminal, Cpu, Database, Server, Code, Layout, Wrench } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  'ai-ml': <Cpu className="w-4 h-4 text-[#edd894]" />,
  'core-cs': <Terminal className="w-4 h-4 text-[#2dd4bf]" />,
  backend: <Server className="w-4 h-4 text-[#edd894]" />,
  languages: <Code className="w-4 h-4 text-[#2dd4bf]" />,
  databases: <Database className="w-4 h-4 text-[#edd894]" />,
  frontend: <Layout className="w-4 h-4 text-[#2dd4bf]" />,
  tools: <Wrench className="w-4 h-4 text-[#edd894]" />,
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 sm:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#2dd4bf]">
            03 / Ridge · Technical Arsenal
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#f4f1ea] tracking-tight">
          Skills & Technologies
        </h2>

        <p className="mt-3 text-base text-[#8e95a2] font-mono max-w-2xl">
          Core computer science foundations, applied AI architectures, and modern engineering toolchains.
        </p>
      </div>

      <div className="ai-flow-panel mb-10 p-5 sm:p-7 rounded-xl border border-[#2dd4bf]/15 bg-[#0b1015]/75 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[.2em] text-[#2dd4bf]">Applied AI / System view</span>
            <h3 className="mt-1 text-xl sm:text-2xl font-serif text-[#f4f1ea]">From signal to grounded output</h3>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[#8e95a2]">A simplified view of the retrieval and evidence flow described in my AI projects.</p>
        </div>
        <div className="ai-flow" aria-label="AI workflow: input, retrieval, grounding, and useful output">
          {[
            { step: '01', name: 'Input', detail: 'Question or event' },
            { step: '02', name: 'Retrieve', detail: 'Relevant context' },
            { step: '03', name: 'Ground', detail: 'Check evidence' },
            { step: '04', name: 'Respond', detail: 'Useful output' },
          ].map((item, index) => (
            <React.Fragment key={item.step}>
              <div className="ai-flow-node">
                <span className="ai-flow-index">{item.step}</span>
                <strong>{item.name}</strong>
                <small>{item.detail}</small>
              </div>
              {index < 3 && <span className="ai-flow-link" aria-hidden="true"><i /></span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillsCategories.map((category, idx) => {
          const isEven = idx % 2 === 1;
          const accent = isEven ? 'teal' : 'gold';

          return (
            <div
              key={category.id}
              className="skill-category p-6 rounded-xl bg-[#0b0d13]/60 border border-white/[0.07] backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.05]">
                  <div className="flex items-center gap-2.5">
                    {categoryIcons[category.id]}
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[#f4f1ea] font-medium">
                      {category.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#8e95a2]">
                    {category.skills.length} Items
                  </span>
                </div>

                {/* Tiles Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {category.skills.map((skill) => (
                    <SkillTile key={skill.name} skill={skill} accent={accent} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Engineering Competency Summary */}
      <div className="mt-12 p-6 rounded-xl border border-white/[0.06] bg-[#0c0f16]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8e95a2]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
          <span>Gold indicators highlight primary core focus areas & applied architectures.</span>
        </div>
        <div className="text-[#cfcac0]">
          Algorithmic problem solving in C++ & Python • Continuous system engineering
        </div>
      </div>
    </section>
  );
};
