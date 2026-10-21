import type { SiteConfig, Project, AchievementItem, SkillGroup, ChapterAnchor } from '../types';

export const SITE_CONFIG: SiteConfig = {
  name: 'Abhijeet Singh',
  firstName: 'ABHIJEET',
  lastName: 'SINGH',
  role: 'Software Developer · Full-Stack, Backend & AI/ML Engineering',
  shortRole: 'SOFTWARE DEVELOPER',
  intro:
    'Computer Science undergraduate at Pranveer Singh Institute of Technology (PSIT) with hands-on experience in full-stack development, backend engineering, machine learning, and AI-powered applications. Skilled in developing REST APIs, database-driven systems, interactive web applications, and ML-based solutions.',
  careerObjective:
    'Computer Science undergraduate with hands-on experience in full-stack development, backend engineering, machine learning, and AI-powered applications. Skilled in developing REST APIs, database-driven systems, interactive web applications, and ML-based solutions through academic and personal projects. Seeking software development opportunities where I can apply strong problem-solving and programming skills, contribute to scalable and reliable software solutions, and continue developing expertise in Data Structures and Algorithms, backend systems, AI/ML, and Generative AI.',
  email: 'abhijeetsingh01122006@gmail.com',
  phone: '+91 7007803506',
  location: 'Kanpur & Uttar Pradesh, India',
  github: 'https://github.com/Abhijeet-Singh-01',
  linkedin: 'https://www.linkedin.com/in/abhijeet-singh-988276330/',
  leetcode: 'https://leetcode.com/',
  resumeUrl: '/resume.pdf',
  portraitUrl: '/profile.webp',
};

export const CHAPTER_ANCHORS: ChapterAnchor[] = [
  {
    id: 'home',
    num: '01',
    label: 'Home',
    coord: { x: 550, y: 480 },
    scrollProgress: 0.0,
    dwellStart: 0.0,
    dwellEnd: 0.13,
  },
  {
    id: 'projects',
    num: '02',
    label: 'Projects',
    coord: { x: 3550, y: 1350 },
    scrollProgress: 0.25,
    dwellStart: 0.22,
    dwellEnd: 0.36,
  },
  {
    id: 'achievements',
    num: '03',
    label: 'Achievements',
    coord: { x: 750, y: 2350 },
    scrollProgress: 0.50,
    dwellStart: 0.46,
    dwellEnd: 0.60,
  },
  {
    id: 'skills',
    num: '04',
    label: 'Skills',
    coord: { x: 3550, y: 3350 },
    scrollProgress: 0.75,
    dwellStart: 0.70,
    dwellEnd: 0.82,
  },
  {
    id: 'contact',
    num: '05',
    label: 'Contact',
    coord: { x: 2050, y: 4300 },
    scrollProgress: 1.0,
    dwellStart: 0.91,
    dwellEnd: 1.0,
  },
];

export const MASTER_INK_PATH =
  'M 550,860 ' +
  'C 1750,960 2350,1180 3550,1350 ' +
  'C 2350,1650 1850,2050 750,2350 ' +
  'C 1850,2680 2350,3050 3550,3350 ' +
  'C 2950,3720 2550,4020 2050,4300';

export const PROJECTS: Project[] = [
  {
    id: 'solisiq',
    num: '01',
    title: 'SolisIQ',
    subtitle: 'Smart Solar Usage & Savings Monitoring System',
    category: 'AI Advisory · Flask · MySQL · Scikit-learn',
    description:
      'Developed an AI-powered solar advisory platform recommending solar panel capacity based on electricity consumption, with Flask REST APIs and a responsive ROI monitoring dashboard.',
    highlights: [
      'Developed an AI-powered solar advisory platform recommending solar panel capacity based on electricity consumption.',
      'Built Flask REST APIs with MySQL for authentication, solar calculations, and data management.',
      'Implemented electricity savings, ROI, and solar payback calculations with a responsive dashboard.',
    ],
    techStack: [
      'Python',
      'Flask',
      'MySQL',
      'JavaScript',
      'HTML',
      'CSS',
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Joblib',
      'REST APIs',
      'Render',
    ],
    repoUrl: 'https://github.com/Abhijeet-Singh-01/SolisIQ',
  },
  {
    id: 'ai-incident-intelligence',
    num: '02',
    title: 'AI Incident Intelligence',
    subtitle: 'AI-Powered Incident Intelligence & Root Cause Analysis Platform (Ongoing)',
    category: 'AI / Machine Learning · FastAPI',
    description:
      'Developing an AI-powered platform for anomaly detection and incident root-cause analysis with machine learning models and FastAPI services.',
    highlights: [
      'Developing an AI-powered platform for anomaly detection and incident root-cause analysis.',
      'Trained and evaluated a machine learning anomaly-detection model using feature engineering, validation, and serialized model artifacts.',
      'Built FastAPI services for incident ingestion, anomaly detection, analysis, and evidence retrieval.',
    ],
    techStack: [
      'Python',
      'FastAPI',
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Joblib',
      'REST APIs',
    ],
    repoUrl: 'https://github.com/Abhijeet-Singh-01/ai-incident-intelligence',
  },
  {
    id: 'setu',
    num: '03',
    title: 'SETU',
    subtitle: 'Smart Emergency Response System',
    category: 'React.js · FastAPI · PostgreSQL · Leaflet',
    description:
      'Developed an emergency response platform for distress-report processing, automated triage, interactive OpenStreetMap visualization, and volunteer coordination.',
    highlights: [
      'Developed an emergency response platform for distress-report processing, automated triage, and volunteer coordination.',
      'Developed an interactive emergency map using React.js, Leaflet, and OpenStreetMap for incident visualization.',
      'Implemented location-based volunteer matching and map-based emergency response coordination.',
    ],
    techStack: [
      'React.js',
      'FastAPI',
      'PostgreSQL',
      'Python',
      'Leaflet',
      'OpenStreetMap',
      'REST APIs',
    ],
    repoUrl: 'https://github.com/Hack-Quest/Setu',
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'leetcode-dsa',
    metric: '250+ Solved',
    title: 'Solved 250+ DSA Problems on LeetCode',
    subtitle: 'Data Structures & Algorithms',
    period: 'Ongoing',
    description:
      'Solved 250+ DSA problems on LeetCode, covering arrays, strings, linked lists, stacks, queues, trees, and recursion.',
    tags: ['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Trees & Recursion', 'C++ & Python'],
    linkUrl: 'https://leetcode.com/',
  },
  {
    id: 'aws-ml-foundations',
    metric: 'AWS Badge',
    title: 'AWS Academy Graduate – Machine Learning Foundations Training Badge',
    subtitle: 'Amazon Web Services (AWS)',
    period: 'AWS Certification',
    description:
      'Earned AWS Academy Graduate – Machine Learning Foundations Training Badge focused on machine learning workflows, model training, and evaluation.',
    tags: ['Machine Learning', 'AWS Academy', 'Model Training', 'AI/ML'],
  },
  {
    id: 'aws-gen-ai',
    metric: 'AWS Certified',
    title: 'AWS Planning a Generative AI Project',
    subtitle: 'Amazon Web Services (AWS)',
    period: 'AWS Certification',
    description:
      'Earned AWS credential focused on Generative AI project planning, scoping, and building AI-powered applications alongside full-stack and backend systems.',
    tags: ['Generative AI', 'AWS', 'AI Project Planning', 'Full-Stack & REST APIs'],
  },
];

export const EDUCATION = {
  institution: 'Pranveer Singh Institute of Technology (PSIT)',
  university: 'Bachelor of Technology in Computer Science and Engineering',
  degree: 'Bachelor of Technology in Computer Science and Engineering',
  period: '2024 – 2028',
  cgpa: '7.54/10',
  schooling: [
    {
      degree: 'Class XII (CBSE)',
      school: 'Rani Laxmi Bai Memorial School',
      period: '2024',
      score: '70.6%',
    },
    {
      degree: 'Class X (CBSE)',
      school: 'Rani Laxmi Bai Memorial School',
      period: '2022',
      score: '74.6%',
    },
  ],
};

export const SKILLS: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['C++', 'Python', 'C', 'SQL'],
  },
  {
    category: 'Frontend',
    items: ['React.js', 'HTML', 'CSS', 'Tailwind CSS', 'JavaScript (ES6+)'],
  },
  {
    category: 'Backend',
    items: ['FastAPI', 'Flask', 'REST APIs', 'Firebase Cloud Messaging (Learning)'],
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'MySQL', 'PostgreSQL'],
  },
  {
    category: 'ML/Data',
    items: ['Scikit-learn', 'Pandas', 'NumPy', 'Joblib'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'VS Code'],
  },
];
