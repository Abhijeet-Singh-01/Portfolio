import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  BrainCircuit,
  Workflow,
  Search,
  Network,
  Activity,
  FileSpreadsheet,
  Binary,
  Cpu,
  GitFork,
  Boxes,
  Terminal,
  HardDrive,
  Radio,
  Zap,
  Server,
  Layers,
  Route,
  ShieldCheck,
  Code2,
  Code,
  FileCode2,
  Coffee,
  Database,
  Atom,
  Palette,
  PackageCheck,
  FileCode,
  Layout,
  Sparkles,
  GitBranch,
  Box,
  Cloud,
  Monitor,
  BookOpen,
} from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';

const iconMap: Record<string, LucideIcon | React.FC<{ className?: string }>> = {
  BrainCircuit,
  Workflow,
  SearchCode: Search,
  Network,
  Activity,
  FileSpreadsheet,
  Binary,
  Cpu,
  GitFork,
  Boxes,
  Terminal,
  HardDrive,
  Radio,
  Zap,
  Server,
  Layers,
  Route,
  ShieldCheck,
  Code2,
  Code,
  FileCode2,
  Coffee,
  Database,
  Atom,
  Palette,
  PackageCheck,
  FileCode,
  Layout,
  Sparkles,
  GitBranch,
  Github: GithubIcon,
  Container: Box,
  Cloud,
  Monitor,
  BookOpen,
};

interface SkillIconProps {
  name: string;
  className?: string;
}

export const SkillIcon: React.FC<SkillIconProps> = ({ name, className = 'w-4 h-4' }) => {
  const IconComponent = iconMap[name] || Code2;
  return <IconComponent className={className} />;
};
