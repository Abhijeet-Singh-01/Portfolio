import type { Project } from '../types';
import { projectLinks } from './socialLinks';

export const projectsData: Project[] = [
  {
    id: 'ai-incident-intelligence',
    name: 'AI Incident Intelligence',
    tagline: 'Autonomous anomaly detection & incident root-cause analysis platform',
    description:
      'AI-powered platform that detects abnormal application behavior, investigates incidents, retrieves relevant evidence, and generates evidence-grounded root-cause analysis and remediation suggestions.',
    category: 'AI / ML / Backend',
    accent: 'gold',
    technologies: ['Python', 'FastAPI', 'Machine Learning', 'RAG', 'Embeddings', 'Vector Search', 'PostgreSQL'],
    problem:
      'Modern microservice ecosystems generate overwhelming volumes of operational metrics, logs, and traces. When an outage occurs, on-call engineers spend valuable time manually correlating disparate log streams rather than resolving the core issue.',
    approach:
      'Engineered an automated triage pipeline pairing machine learning anomaly detection with dense vector embeddings and retrieval-augmented generation (RAG) to cross-reference live telemetry against historical incident resolutions.',
    systemHighlights: [
      'Multi-stage semantic retrieval pipeline pairing dense vector search with deterministic log filtering.',
      'Trained and evaluated a machine learning anomaly-detection model using feature engineering, validation, and serialized model artifacts.',
      'Built FastAPI services for incident ingestion, anomaly detection, analysis, and evidence retrieval.',
      'Evidence-grounded hypothesis generation that ties each diagnostic finding directly to timestamped trace logs.',
    ],
    keyImplementation: [
      'Engineered feature extractors converting raw error logs and latency metrics into normalized anomaly vectors.',
      'Constructed vector database schemas in PostgreSQL with embeddings for rapid sub-second similarity lookup.',
      'Built high-performance asynchronous FastAPI ingestion endpoints handling batched telemetry payloads.',
      'Designed grounded prompt templates ensuring the LLM synthesizer cites concrete log timestamps rather than hallucinating causes.',
    ],
    metrics: [
      { label: 'Architecture', value: 'ML Anomaly Triage' },
      { label: 'Retrieval', value: 'Hybrid Vector + Lexical' },
      { label: 'Focus', value: 'Evidence Grounding' },
    ],
    architectureSnippet: {
      title: 'Incident Analysis Pipeline',
      flow: [
        'Stream Ingestion & Log Parsing',
        'Feature Engineering & Anomaly Inference',
        'Diagnostic Evidence Clustering',
        'Root-Cause Analysis & Synthesis',
      ],
    },
    architectureFlow: [
      {
        id: 'telemetry',
        name: 'Telemetry Ingestion',
        type: 'Input Stream',
        detail: 'FastAPI endpoints accept batched JSON payloads of error logs, CPU/memory spikes, and distributed trace spans.',
      },
      {
        id: 'ml-detector',
        name: 'ML Anomaly Detector',
        type: 'Inference',
        detail: 'Pre-trained anomaly classification model evaluates feature variance to isolate genuine service degradations from routine noise.',
      },
      {
        id: 'vector-index',
        name: 'Vector Indexing',
        type: 'Database',
        detail: 'Dense embeddings generated for diagnostic evidence are indexed in PostgreSQL vector tables for fast cosine similarity search.',
      },
      {
        id: 'rag-engine',
        name: 'Grounded RAG',
        type: 'Retrieval',
        detail: 'Retrieval engine queries historical post-mortems and known runbooks matching the current anomaly signature.',
      },
      {
        id: 'synthesis',
        name: 'Root-Cause Synthesis',
        type: 'Output',
        detail: 'Generates evidence-grounded hypotheses with exact log line references and step-by-step remediation recommendations.',
      },
    ],
    githubUrl: projectLinks.aiIncidentIntelligenceSource,
  },
  {
    id: 'solisiq',
    name: 'SolisIQ – Smart Solar Usage & Savings Monitoring System',
    tagline: 'AI-powered solar advisory platform for capacity recommendation & financial monitoring',
    description:
      'Solar usage and savings monitoring system that recommends optimal solar panel capacity based on electricity consumption, providing electricity savings, ROI, and payback calculations via a responsive dashboard and Flask REST APIs with MySQL.',
    category: 'AI / Sustainability / Web App',
    accent: 'teal',
    technologies: [
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
    problem:
      'Homeowners and businesses struggle to determine whether solar adoption makes economic sense due to complex utility tariffs, variable seasonal sunlight, and ambiguous equipment sizing options.',
    approach:
      'Developed an end-to-end solar advisory application featuring algorithmic capacity recommendation models and financial projections that quantify payback horizons and return on investment.',
    systemHighlights: [
      'Developed an AI-powered solar advisory platform recommending solar panel capacity based on electricity consumption.',
      'Built Flask REST APIs with MySQL for authentication, solar calculations, and data management.',
      'Implemented electricity savings, ROI, and solar payback calculations with a responsive dashboard.',
    ],
    keyImplementation: [
      'Constructed algorithmic sizing formulas using Scikit-learn, Pandas, and NumPy mapping monthly kWh usage to optimal kW peak capacity.',
      'Implemented relational schema in MySQL managing user session data, consumption histories, and calculation results.',
      'Built modular Flask RESTful endpoints with parameter validation and secure session authentication.',
      'Created interactive financial dashboard graphing generation estimates, utility bill offsets, and capital payback periods.',
    ],
    metrics: [
      { label: 'Advisory Engine', value: 'Consumption-Based Sizing' },
      { label: 'Backend API', value: 'Flask REST + MySQL' },
      { label: 'Analytics', value: 'ROI & Payback Modeling' },
    ],
    architectureSnippet: {
      title: 'Solar Sizing & Payback Flow',
      flow: [
        'Consumption Telemetry Ingestion',
        'Capacity Recommendation Model',
        'MySQL State & Authentication',
        'Responsive Analytics Dashboard',
      ],
    },
    architectureFlow: [
      {
        id: 'consumption',
        name: 'Consumption Input',
        type: 'Data Ingestion',
        detail: 'Captures monthly electricity bills, utility rate schedules, and geographical sunlight data.',
      },
      {
        id: 'sizing-model',
        name: 'Sizing Algorithm',
        type: 'Model Inference',
        detail: 'Applies Scikit-learn and NumPy math to calculate recommended solar panel capacity in kW peak.',
      },
      {
        id: 'financials',
        name: 'Financial Modeling',
        type: 'Calculation',
        detail: 'Simulates net monthly bill reductions, capital expenditure payback curves, and 10-year cumulative ROI.',
      },
      {
        id: 'flask-mysql',
        name: 'Flask API & MySQL',
        type: 'Backend',
        detail: 'Relational database securely stores calculation profiles with RESTful routes serving structured JSON.',
      },
      {
        id: 'dashboard',
        name: 'Interactive UI',
        type: 'Presentation',
        detail: 'Visualizes solar generation dials, payback break-even points, and environmental carbon offset metrics.',
      },
    ],
    githubUrl: projectLinks.solisiqSource,
  },
  {
    id: 'instanews',
    name: 'Instanews',
    tagline: 'High-throughput full-stack publishing platform with RBAC & caching',
    description:
      'Full-stack news platform with authentication, role-based administration, API-driven content caching, and infinite scrolling.',
    category: 'Full-Stack Web App',
    accent: 'gold',
    technologies: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    problem:
      'Editorial media platforms frequently struggle with content delivery bottlenecks under heavy read traffic and complex state synchronization when publishing live breaking updates.',
    approach:
      'Engineered an Express/Node.js API gateway paired with MongoDB aggregation pipelines, caching layers, and a responsive React frontend managed by Redux Toolkit for seamless infinite scrolling.',
    systemHighlights: [
      'Granular role-based access control separating reader consumers from authenticated editorial staff.',
      'Redux Toolkit state slices paired with virtualized DOM scrolling for reading experiences.',
      'API query caching and aggregated MongoDB pipelines for category-filtered feeds.',
    ],
    keyImplementation: [
      'Built authentication middleware verifying JSON Web Tokens (JWT) and enforcing granular role permissions (Admin, Editor, Reader).',
      'Created optimized MongoDB aggregation queries indexing articles by publication timestamp, tags, and category.',
      'Configured in-memory caching headers on Express endpoints to dramatically reduce repeated database queries.',
      'Integrated Redux Toolkit state slices handling optimistic feed updates and smooth infinite scrolling pagination.',
    ],
    metrics: [
      { label: 'Security', value: 'JWT + RBAC Middleware' },
      { label: 'State Management', value: 'Redux Toolkit Slices' },
      { label: 'Rendering', value: 'Infinite Scroll Feed' },
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
    architectureFlow: [
      {
        id: 'client-ui',
        name: 'React Frontend',
        type: 'Client Layer',
        detail: 'Responsive interface delivering news categories with Redux Toolkit managing normalized article state.',
      },
      {
        id: 'jwt-auth',
        name: 'JWT & RBAC Gate',
        type: 'Security',
        detail: 'Middleware parses bearer tokens to enforce role-based route permissions for article publishing and editing.',
      },
      {
        id: 'cached-api',
        name: 'Express API Gateway',
        type: 'Server Layer',
        detail: 'Node.js REST service caching frequent category requests to maintain low-latency responses.',
      },
      {
        id: 'mongo-pipeline',
        name: 'MongoDB Aggregation',
        type: 'Database',
        detail: 'Indexed database collections filter, sort, and paginate articles with compound indexing on categories.',
      },
      {
        id: 'infinite-scroll',
        name: 'Infinite Feed',
        type: 'Presentation',
        detail: 'Observer-based infinite scroll feed that progressively loads article batches without browser layout thrashing.',
      },
    ],
  },
  {
    id: 'zerohour',
    name: 'ZeroHour',
    tagline: 'Interactive Countdown Web Application',
    description:
      'Real-time countdown timer web application showing remaining days, hours, minutes, and seconds until a chosen date and time with JavaScript date calculations, dynamic DOM updates, and completion handling.',
    category: 'Web Application',
    accent: 'teal',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    problem:
      'Many countdown timer implementations suffer from drift over prolonged periods due to inaccurate interval delays, lack completion states, or break when rendered on small viewports.',
    approach:
      'Built a zero-dependency web application using native JavaScript Date math to calculate exact temporal intervals down to the second, backed by dynamic DOM mutation and responsive CSS.',
    systemHighlights: [
      'JavaScript date calculations and dynamic DOM updates.',
      'Automatic completion handling and a responsive user interface.',
      'Timezone-aware target configuration with zero layout shift during continuous unit ticks.',
    ],
    keyImplementation: [
      'Programmed temporal interval algorithms calculating millisecond deltas between client system clock and target timestamps.',
      'Implemented targeted DOM mutations that only modify changed numerical digits, preventing unnecessary reflows.',
      'Created state completion handling that transitions the chronometer into an expired notification state.',
      'Designed responsive CSS layout scaling fluidly across mobile and desktop viewports without clipping.',
    ],
    metrics: [
      { label: 'Time Resolution', value: '1-Second Tick Precision' },
      { label: 'DOM Mutation', value: 'Targeted Node Updates' },
      { label: 'Dependencies', value: 'Zero (Vanilla Web Standards)' },
    ],
    architectureSnippet: {
      title: 'Chronometer Tick Lifecycle',
      flow: [
        'Target Timestamp Ingestion',
        'Millisecond Delta Computation',
        'Unit Decomposition (Days/Hrs/Mins/Secs)',
        'Targeted DOM Update & Zero-State Trigger',
      ],
    },
    architectureFlow: [
      {
        id: 'target-input',
        name: 'Target Epoch Input',
        type: 'Input',
        detail: 'Accepts user-specified target date and time parameters through accessible form controls.',
      },
      {
        id: 'math-engine',
        name: 'Delta Calculator',
        type: 'Algorithm',
        detail: 'Calculates the exact millisecond differential against the local system clock.',
      },
      {
        id: 'partitioning',
        name: 'Unit Partitioning',
        type: 'Processing',
        detail: 'Decomposes millisecond delta into synchronous Days, Hours, Minutes, and Seconds integers.',
      },
      {
        id: 'dom-updates',
        name: 'Targeted DOM Update',
        type: 'Rendering',
        detail: 'Mutates only the specific digit nodes that changed on the current tick to maintain smooth performance.',
      },
      {
        id: 'completion-trigger',
        name: 'Completion Trigger',
        type: 'Lifecycle',
        detail: 'Halts the timer interval on zero reaching and transitions the UI to the event completion state.',
      },
    ],
    githubUrl: projectLinks.zeroHourSource,
  },
];
