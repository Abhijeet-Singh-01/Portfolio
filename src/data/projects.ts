import type { Project } from '../types';
import { projectLinks } from './socialLinks';

export const projectsData: Project[] = [
  {
    id: 'ai-incident-intelligence',
    name: 'AI Incident Intelligence',
    tagline: 'Autonomous root-cause investigation & telemetry triage platform',
    description:
      'AI-powered platform that detects abnormal application behavior, investigates incidents, retrieves relevant evidence, and generates evidence-grounded root-cause analysis and remediation suggestions.',
    category: 'AI / ML / Backend',
    accent: 'gold',
    technologies: ['Python', 'FastAPI', 'ML', 'RAG', 'Embeddings', 'Vector Search', 'PostgreSQL'],
    systemHighlights: [
      'Multi-stage semantic retrieval pipeline pairing dense vector search with deterministic log filtering.',
      'Evidence-grounded hypothesis generation that ties each diagnostic finding directly to timestamped trace logs.',
      'Context-aware remediation playbooks designed to minimize Mean Time to Resolution (MTTR).',
    ],
    metrics: [
      { label: 'Architecture', value: 'RAG Telemetry' },
      { label: 'Retrieval', value: 'Hybrid Vector + Lexical' },
      { label: 'Focus', value: 'Evidence Grounding' },
    ],
    architectureSnippet: {
      title: 'Incident Analysis Pipeline',
      flow: [
        'Stream Ingestion & Log Parsing',
        'Dense Embedding & Chroma/PostgreSQL Vector Indexing',
        'Anomaly Clustered Retrieval',
        'Grounding Verification & LLM Root-Cause Synthesis',
      ],
    },
  },
  {
    id: 'solisiq',
    name: 'SolisIQ',
    tagline: 'Smart Solar Usage & Savings Monitoring System',
    description:
      'Solar usage and savings monitoring system that recommends solar panel capacity and provides savings, ROI, and payback information through a dashboard.',
    category: 'AI / Sustainability / Web App',
    accent: 'teal',
    technologies: ['React.js', 'FastAPI', 'MongoDB', 'JavaScript', 'Chart.js', 'REST APIs'],
    systemHighlights: [
      'FastAPI REST APIs for authentication, solar sizing calculations, and data management.',
      'Calculates electricity bill reduction, return on investment (ROI), and solar payback period.',
    ],
    githubUrl: projectLinks.solisiqSource,
  },
  {
    id: 'instanews',
    name: 'Instanews',
    tagline: 'High-throughput full-stack publishing platform with RBAC & caching',
    description:
      'Full-stack news platform with authentication, role-based administration, caching, and infinite scrolling.',
    category: 'Full-Stack Web App',
    accent: 'gold',
    technologies: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    systemHighlights: [
      'Granular role-based access control separating reader consumers from authenticated editorial staff.',
      'Redux Toolkit state slices paired with virtualized DOM scrolling for reading experiences.',
      'API query caching and aggregated MongoDB pipelines for category-filtered feeds.',
    ],
    metrics: [
      { label: 'Security', value: 'JWT + RBAC Middleware' },
      { label: 'State Management', value: 'Redux Toolkit Slices' },
      { label: 'Rendering', value: 'Virtualized Infinite Scroll' },
    ],
    architectureSnippet: {
      title: 'Feed Ingestion & Delivery',
      flow: [
        'Secure Client Authentication (JWT)',
        'Cached Express API Layer',
        'MongoDB Aggregation Pipeline',
        'Virtualized Infinite Scroll Feed UI',
      ],
    },
  },
  {
    id: 'zerohour',
    name: 'ZeroHour',
    tagline: 'Interactive Countdown Web Application',
    description:
      'Real-time countdown timer web application showing remaining days, hours, minutes, and seconds until a chosen date and time.',
    category: 'Web Application',
    accent: 'teal',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    systemHighlights: [
      'JavaScript date calculations and dynamic DOM updates.',
      'Automatic completion handling and a responsive user interface.',
    ],
  },
];
