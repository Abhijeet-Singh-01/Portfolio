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
  'AWS Academy Graduate – Machine Learning Foundations Training Badge – AWS',
  'AWS Planning a Generative AI Project – AWS',
];

export const achievementData = [
  {
    title: '250+ DSA problems solved on LeetCode',
    description: 'Covering arrays, strings, linked lists, stacks, queues, trees, and recursion.',
    url: siteLinks.leetcode.url,
  },
  {
    title: 'Consistent daily coding practice',
    description: 'Focused on algorithmic problem-solving and data structure fundamentals.',
  },
];

export const careerObjective =
  'Computer Science undergraduate with hands-on experience in full-stack development, backend engineering, machine learning, and AI-powered applications. Skilled in developing REST APIs, database-driven systems, interactive web applications, and ML-based solutions through academic and personal projects. Seeking software development opportunities where I can apply strong problem-solving and programming skills, contribute to scalable and reliable software solutions, and continue developing expertise in Data Structures and Algorithms, backend systems, AI/ML, and Generative AI.';

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
