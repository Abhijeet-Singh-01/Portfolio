import type { SkillCategory } from '../types';

export const skillsCategories: SkillCategory[] = [
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning',
    skills: [
      { name: 'Machine Learning', iconName: 'BrainCircuit', highlight: true },
      { name: 'RAG Architecture', iconName: 'Workflow', highlight: true },
      { name: 'Vector Search', iconName: 'SearchCode', highlight: true },
      { name: 'Embeddings', iconName: 'Network', highlight: true },
      { name: 'Scikit-learn', iconName: 'Activity' },
      { name: 'Pandas', iconName: 'FileSpreadsheet' },
      { name: 'NumPy', iconName: 'Binary' },
      { name: 'AI Application Dev', iconName: 'Cpu', highlight: true },
    ],
  },
  {
    id: 'core-cs',
    title: 'Core Computer Science',
    skills: [
      { name: 'Data Structures & Algorithms', iconName: 'GitFork', highlight: true },
      { name: 'Object-Oriented Programming', iconName: 'Boxes' },
      { name: 'Operating Systems', iconName: 'Terminal' },
      { name: 'DBMS', iconName: 'HardDrive' },
      { name: 'Computer Networks', iconName: 'Radio' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    skills: [
      { name: 'FastAPI', iconName: 'Zap', highlight: true },
      { name: 'Node.js', iconName: 'Server' },
      { name: 'Express.js', iconName: 'Layers' },
      { name: 'REST APIs', iconName: 'Route' },
      { name: 'JWT Authentication', iconName: 'ShieldCheck' },
    ],
  },
  {
    id: 'languages',
    title: 'Languages',
    skills: [
      { name: 'C++', iconName: 'Code2', highlight: true },
      { name: 'Python', iconName: 'Code', highlight: true },
      { name: 'JavaScript', iconName: 'FileCode2' },
      { name: 'C', iconName: 'Code2' },
      { name: 'Java', iconName: 'Coffee' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Storage',
    skills: [
      { name: 'PostgreSQL', iconName: 'Database', highlight: true },
      { name: 'MongoDB', iconName: 'Database' },
      { name: 'MySQL', iconName: 'Database' },
      { name: 'Oracle', iconName: 'Database' },
      { name: 'SQLite', iconName: 'Database' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    skills: [
      { name: 'React', iconName: 'Atom', highlight: true },
      { name: 'Tailwind CSS', iconName: 'Palette' },
      { name: 'Redux Toolkit', iconName: 'PackageCheck' },
      { name: 'JavaScript (ES6+)', iconName: 'FileCode' },
      { name: 'HTML5', iconName: 'Layout' },
      { name: 'CSS3', iconName: 'Sparkles' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Cloud Platforms',
    skills: [
      { name: 'Git', iconName: 'GitBranch' },
      { name: 'GitHub', iconName: 'GitBranch' },
      { name: 'Docker', iconName: 'Container', highlight: true },
      { name: 'AWS', iconName: 'Cloud' },
      { name: 'VS Code', iconName: 'Monitor' },
      { name: 'Jupyter Notebook', iconName: 'BookOpen' },
    ],
  },
];
