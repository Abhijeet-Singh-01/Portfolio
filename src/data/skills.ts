import type { SkillCategory } from '../types';

export const skillsCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    skills: [
      { name: 'C++', iconName: 'Code2', highlight: true },
      { name: 'Python', iconName: 'Code', highlight: true },
      { name: 'C', iconName: 'Code2' },
      { name: 'SQL', iconName: 'Database' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'React.js', iconName: 'Atom', highlight: true },
      { name: 'HTML', iconName: 'Layout' },
      { name: 'CSS', iconName: 'Sparkles' },
      { name: 'Tailwind CSS', iconName: 'Palette' },
      { name: 'JavaScript (ES6+)', iconName: 'FileCode', highlight: true },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      { name: 'FastAPI', iconName: 'Zap', highlight: true },
      { name: 'REST APIs', iconName: 'Route', highlight: true },
      { name: 'Firebase Cloud Messaging (Learning)', iconName: 'Radio' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    skills: [
      { name: 'MongoDB', iconName: 'Database', highlight: true },
      { name: 'MySQL', iconName: 'Database', highlight: true },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    skills: [
      { name: 'Git', iconName: 'GitBranch' },
      { name: 'GitHub', iconName: 'Github' },
      { name: 'VS Code', iconName: 'Monitor' },
    ],
  },
  {
    id: 'core-cs',
    title: 'Core',
    skills: [
      { name: 'Data Structures and Algorithms', iconName: 'GitFork', highlight: true },
    ],
  },
  {
    id: 'ai',
    title: 'AI / Foundations',
    skills: [
      { name: 'Generative AI (AWS Coursework)', iconName: 'Cpu', highlight: true },
    ],
  },
];
