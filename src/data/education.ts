import type { EducationItem } from '../types';
import { siteLinks } from './socialLinks';

export const educationData: EducationItem[] = [
  {
    period: '2024 - 2028',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    institution: 'Pranveer Singh Institute of Technology (PSIT)',
    university: 'Affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
    status: 'In Progress',
    highlights: ['CGPA: 7.54/10'],
  },
  {
    period: '2024',
    degree: 'Class XII (CBSE)',
    institution: 'Rani Laxmi Bai Memorial School',
    status: 'Completed',
    highlights: ['Percentage: 70.6%'],
  },
  {
    period: '2022',
    degree: 'Class X (CBSE)',
    institution: 'Rani Laxmi Bai Memorial School',
    status: 'Completed',
    highlights: ['Percentage: 74.6%'],
  },
];

export const certificationData = [
  'AWS Planning a Generative AI Project - Amazon Web Services (AWS)',
  'AWS Introduction to Generative AI - Art of the Possible - Amazon Web Services (AWS)',
];

export const achievementData = [
  {
    title: '250+ DSA problems solved on LeetCode',
    description: 'Arrays, strings, linked lists, stacks, queues, trees, and recursion.',
    url: siteLinks.leetcode.url,
  },
  {
    title: 'Consistent daily coding practice',
    description: 'Focused on algorithmic problem-solving and data structure fundamentals.',
  },
];

export const careerObjective =
  'Computer Science undergraduate seeking software development opportunities to apply problem-solving and programming skills in backend and full-stack engineering. Interested in building scalable APIs, database-driven applications, and AI-powered solutions while strengthening expertise in DSA, Generative AI, and modern software development.';

export const personalBio = {
  name: 'Abhijeet Singh',
  role: 'Computer Science undergraduate',
  subRole: 'Software Developer · AI/ML · Full-Stack Development',
  location: 'Lucknow, India',
  college: 'Pranveer Singh Institute of Technology (PSIT), AKTU',
  years: '2024 - 2028',
  cgpa: '7.54/10',
  statusBadge: 'AVAILABLE FOR OPPORTUNITIES',
  status: 'Seeking software development opportunities in backend and full-stack engineering.',
  heroSummary:
    'Seeking software development opportunities in backend and full-stack engineering, with interests in scalable APIs, database-driven applications, and AI-powered solutions.',
  introParagraph: careerObjective,
  corePillars: [
    {
      title: 'Full Stack',
      description: 'Software development across frontend and backend engineering.',
    },
    {
      title: 'Backend',
      description: 'Scalable APIs and database-driven applications.',
    },
    {
      title: 'AI/ML',
      description: 'AI-powered solutions and Generative AI.',
    },
    {
      title: 'DSA',
      description: 'Data structures, algorithms, and problem-solving practice.',
    },
  ],
  passions: [
    'Backend and full-stack engineering',
    'Scalable APIs and database-driven applications',
    'AI-powered solutions and Generative AI',
    'Data structures and algorithms',
  ],
};
