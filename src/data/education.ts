import type { EducationItem } from '../types';

export const educationData: EducationItem[] = [
  {
    period: '2024 — 2028',
    degree: 'Bachelor of Technology — Computer Science & Engineering',
    institution: 'Pranveer Singh Institute of Technology (PSIT)',
    university: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
    location: 'Uttar Pradesh, India',
    status: 'In Progress',
    highlights: [
      'Core focus on Computer Science foundations: Data Structures & Algorithms, Object-Oriented Design, and System Architecture.',
      'Active exploration of Machine Learning pipelines, Vector Embeddings, and Modern Web Systems.',
      'Developing production-oriented projects bridging backend microservices with intelligent AI interfaces.',
    ],
  },
  {
    period: '2022 — 2024',
    degree: 'Senior Secondary Education',
    institution: 'Senior Secondary School',
    location: 'Lucknow, India',
    status: 'Completed',
    highlights: [
      'Rigorous foundation in Mathematics, Physics, and Computer Science fundamentals.',
      'Cultivated algorithmic problem solving and introductory programming in C++ and Python.',
    ],
  },
];

export const personalBio = {
  name: 'Abhijeet Singh',
  role: 'Computer Science & Engineering Student',
  subRole: 'Software Developer & AI/ML Enthusiast',
  location: 'Lucknow, India',
  college: 'Pranveer Singh Institute of Technology (PSIT), AKTU',
  years: '2024 – 2028',
  statusBadge: 'AVAILABLE FOR OPPORTUNITIES',
  introParagraph:
    "I'm Abhijeet Singh, a Computer Science & Engineering student passionate about software engineering, artificial intelligence, machine learning, and building practical products.",
  corePillars: [
    {
      title: 'Algorithmic Rigor & DSA',
      description:
        'Cultivating deep problem-solving skills through consistent practice in data structures and algorithmic complexity.',
    },
    {
      title: 'Backend Systems & APIs',
      description:
        'Architecting robust RESTful services, secure JWT authentication layers, and efficient relational/document database schemas.',
    },
    {
      title: 'AI/ML & RAG Systems',
      description:
        'Engineering domain-grounded retrieval pipelines, vector embeddings, and LLM applications designed for deterministic utility.',
    },
    {
      title: 'Full-Stack Execution',
      description:
        'Translating complex architectural concepts into clean, high-performance web applications with seamless user experiences.',
    },
  ],
  passions: [
    'Solving programming problems & algorithmic puzzles',
    'Data Structures & Algorithms (DSA)',
    'Backend architecture & API engineering',
    'Machine Learning & Vector Search',
    'Building responsive full-stack applications',
    'Studying scalable system design principles',
    'Turning raw ideas into reliable, shipped software',
  ],
};
