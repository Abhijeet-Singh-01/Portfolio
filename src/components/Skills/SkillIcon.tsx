import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  BrainCircuit,
  GitFork,
  Zap,
  Route,
  Code2,
  Code,
  Database,
  Atom,
  Palette,
  FileCode,
  Layout,
  Sparkles,
  GitBranch,
  Cloud,
  Monitor,
} from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';

const iconMap: Record<string, LucideIcon | React.FC<{ className?: string }>> = {
  BrainCircuit,
  GitFork,
  Zap,
  Route,
  Code2,
  Code,
  Database,
  Atom,
  Palette,
  FileCode,
  Layout,
  Sparkles,
  GitBranch,
  Github: GithubIcon,
  Cloud,
  Monitor,
};

interface SkillIconProps {
  name: string;
  className?: string;
}

export const SkillIcon: React.FC<SkillIconProps> = ({ name, className = 'w-4 h-4' }) => {
  const IconComponent = iconMap[name] || Code2;
  return <IconComponent className={className} />;
};
