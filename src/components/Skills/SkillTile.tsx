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
    ? 'hover:border-accent-indigo/35 hover:shadow-[0_4px_20px_-4px_var(--accent-indigo-glow)]'
    : 'hover:border-accent-aqua/35 hover:shadow-[0_4px_20px_-4px_var(--accent-aqua-glow)]';

  const iconColor = isGold
    ? 'text-accent-indigo-ink group-hover:text-text'
    : 'text-accent-aqua-ink group-hover:text-accent-aqua-ink';

  return (
    <button
      type="button"
      aria-pressed={selected}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      className={`skill-tile group relative w-full text-left flex items-center gap-3 px-3.5 py-2.5 rounded-lg border border-border/[0.1] transition-all duration-200 cursor-pointer ${isGold ? 'skill-tile-indigo' : 'skill-tile-aqua'} ${hoverBorder} ${selected?'skill-selected':''} ${related?'skill-related':''}`}
    >
      <div className={`shrink-0 transition-colors ${iconColor}`}>
        <SkillIcon name={skill.iconName} className="w-4 h-4" />
      </div>

      <span className="min-w-0 flex-1 text-xs font-mono text-text-2 group-hover:text-text transition-colors tracking-tight">
        {skill.name}
      </span>

      {skill.level && <span className="shrink-0 text-[9px] font-mono text-text-2">{skill.level}</span>}

      {skill.highlight && (
        <span
          className={`ml-auto w-1.5 h-1.5 rounded-full ${
            isGold ? 'bg-accent-indigo/50' : 'bg-accent-aqua/50'
          }`}
          title="Core Competency"
        />
      )}
    </button>
  );
};
