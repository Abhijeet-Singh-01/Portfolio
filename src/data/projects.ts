import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'ai-incident-intelligence',
    name: 'AI Incident Intelligence',
    tagline: 'Autonomous root-cause investigation & telemetry triage engine',
    description:
      'AI-powered incident analysis and root-cause investigation platform designed to detect abnormal application behavior, retrieve relevant evidence from logs/incidents, and generate evidence-grounded root-cause analysis and remediation suggestions.',
    category: 'AI Systems & Telemetry',
    accent: 'gold',
    technologies: [
      'Python',
      'FastAPI',
      'Machine Learning',
      'RAG',
      'Vector Search',
      'Embeddings',
      'PostgreSQL',
      'AI/LLM',
    ],
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
    githubUrl: 'https://github.com/abhijeetsingh',
  },
  {
    id: 'solisiq',
    name: 'SolisIQ',
    tagline: 'Intelligent solar capacity modeling & renewable energy analytics',
    description:
      'Solar usage and savings monitoring platform designed to help users understand energy consumption, estimated savings, solar capacity requirements, and environmental impact.',
    category: 'CleanTech & Energy Analytics',
    accent: 'teal',
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Chart.js',
      'Python',
      'Flask',
      'Database',
    ],
    systemHighlights: [
      'Mathematical irradiance modeling calibrated to regional sunlight exposure and rooftop surface area.',
      'Interactive time-series dashboards charting real-time solar production against utility grid consumption.',
      'Carbon offset computational engine quantifying lifetime financial savings and avoided CO₂ emissions.',
    ],
    metrics: [
      { label: 'Analysis Engine', value: 'Solar Yield Algorithm' },
      { label: 'Visualization', value: 'Interactive Chart.js' },
      { label: 'Outcome', value: 'ROI & Carbon Metrics' },
    ],
    architectureSnippet: {
      title: 'Energy Analytics Pipeline',
      flow: [
        'User Consumption & Roof Data Input',
        'Yield Estimation Formula & Solar Constants',
        'Time-Series Generation & Storage',
        'Comparative Cost & Carbon Analytics Visualization',
      ],
    },
    githubUrl: 'https://github.com/abhijeetsingh',
  },
  {
    id: 'instanews',
    name: 'Instanews',
    tagline: 'High-throughput full-stack publishing platform with RBAC & caching',
    description:
      'Full-stack news platform with authentication, role-based administration, API-driven content, caching, and infinite scrolling.',
    category: 'Full-Stack Web Engineering',
    accent: 'gold',
    technologies: [
      'React',
      'Redux Toolkit',
      'Node.js',
      'Express',
      'MongoDB',
      'JWT',
    ],
    systemHighlights: [
      'Granular role-based access control (RBAC) separating reader consumers from authenticated editorial staff.',
      'Redux Toolkit state slices paired with virtualized DOM scrolling for stutter-free reading experiences.',
      'API query caching and aggregated MongoDB pipelines for instant category-filtered feeds.',
    ],
    metrics: [
      { label: 'Security', value: 'JWT + RBAC Middleware' },
      { label: 'State Mgmt', value: 'Redux Toolkit Slices' },
      { label: 'Rendering', value: 'Virtualized Infinite Scroll' },
    ],
    architectureSnippet: {
      title: 'Feed Ingestion & Delivery',
      flow: [
        'Secure Client Authentication (JWT)',
        'Cached Express.js API Layer',
        'MongoDB Aggregation Pipeline',
        'Virtualized Infinite Scroll Feed UI',
      ],
    },
    githubUrl: 'https://github.com/abhijeetsingh',
  },
  {
    id: 'gharpathshala',
    name: 'GharPathshala',
    tagline: 'Curriculum-grounded AI tutor with adaptive learning diagnostics',
    description:
      'AI-powered multilingual home-learning platform designed around curriculum-grounded learning, personalized activities, assessment, learning-gap detection, teacher validation, and learner analytics.',
    category: 'EdTech & Multilingual AI',
    accent: 'teal',
    technologies: [
      'AI',
      'RAG',
      'LLM',
      'FastAPI',
      'Machine Learning',
      'Vector Search',
      'React',
    ],
    systemHighlights: [
      'Curriculum-locked vector retrieval ensuring generated educational responses never deviate from verified textbooks.',
      'Cognitive learning-gap diagnosis that infers conceptual misunderstandings from response timing and errors.',
      'Bilingual and vernacular translation layer enabling natural mother-tongue learning for young students.',
    ],
    metrics: [
      { label: 'Safeguard', value: 'Curriculum-Grounded RAG' },
      { label: 'Intelligence', value: 'Gap Diagnostic Classifier' },
      { label: 'Interface', value: 'Multilingual Interactive UI' },
    ],
    architectureSnippet: {
      title: 'Pedagogical AI Flow',
      flow: [
        'Curriculum Corpus Ingestion & Embedding',
        'Student Query & Level Assessment',
        'Grounded Context Retrieval & LLM Simplification',
        'Teacher Validation & Gap Metric Logging',
      ],
    },
    githubUrl: 'https://github.com/abhijeetsingh',
  },
];
