export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  technologies: string[];
  systemHighlights: string[];
  metrics?: { label: string; value: string }[];
  githubUrl?: string;
  liveUrl?: string;
  accent: 'gold' | 'teal';
  architectureSnippet?: {
    title: string;
    flow: string[];
  };
}

export interface SkillItem {
  name: string;
  iconName: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: SkillItem[];
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  university?: string;
  location: string;
  status?: string;
  highlights: string[];
}

export interface SocialLink {
  name: string;
  label: string;
  url: string;
  handle: string;
  iconName: string;
  isPrimary?: boolean;
}
