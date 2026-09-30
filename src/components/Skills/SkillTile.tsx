import React from 'react';
import type { SkillItem } from '../../types';
import { SkillIcon } from './SkillIcon';

interface SkillTileProps {
  skill: SkillItem;
  accent?: 'gold' | 'teal';
  selected?: boolean;
  related?: boolean;
  onActivate?: () => void;
}

export const SkillTile: React.FC<SkillTileProps> = ({ skill, accent = 'gold', selected = false, related = false, onActivate }) => {
  const isGold = accent === 'gold';

  const hoverBorder = isGold
    ? 'hover:border-[#d4af37]/35 hover:shadow-[0_4px_20px_-4px_rgba(212,175,55,0.12)]'
    : 'hover:border-[#2dd4bf]/35 hover:shadow-[0_4px_20px_-4px_rgba(45,212,191,0.12)]';

  const iconColor = isGold
    ? 'text-[#edd894] group-hover:text-[#fbf8f2]'
    : 'text-[#2dd4bf] group-hover:text-[#5eead4]';

  return (
    <button
      type="button"
      aria-pressed={selected}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      className={`group relative w-full text-left flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-[#0e1117]/60 hover:bg-[#131722]/80 border border-white/[0.06] backdrop-blur-sm transition-all duration-200 cursor-pointer ${hoverBorder} ${selected?'skill-selected':''} ${related?'skill-related':''}`}
    >
      <div className={`shrink-0 transition-colors ${iconColor}`}>
        <SkillIcon name={skill.iconName} className="w-4 h-4" />
      </div>

      <span className="min-w-0 flex-1 text-xs font-mono text-[#cfcac0] group-hover:text-[#f4f1ea] transition-colors tracking-tight">
        {skill.name}
      </span>

      {skill.level && <span className="shrink-0 text-[9px] font-mono text-[#8e95a2]">{skill.level}</span>}

      {skill.highlight && (
        <span
          className={`ml-auto w-1.5 h-1.5 rounded-full ${
            isGold ? 'bg-[#d4af37]/50' : 'bg-[#2dd4bf]/50'
          }`}
          title="Core Competency"
        />
      )}
    </button>
  );
};
