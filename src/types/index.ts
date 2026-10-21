export interface SiteConfig {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  shortRole: string;
  intro: string;
  careerObjective: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  leetcode: string;
  resumeUrl: string;
  portraitUrl: string;
}

export interface Project {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  highlights: string[];
  techStack: string[];
  repoUrl: string;
}

export interface AchievementItem {
  id: string;
  metric: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  tags: string[];
  linkUrl?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ChapterAnchor {
  id: string;
  num: string;
  label: string;
  coord: { x: number; y: number };
  scrollProgress: number;
  dwellStart: number;
  dwellEnd: number;
}
