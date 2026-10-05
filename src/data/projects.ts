import type { Project } from '../types';
import { projectLinks } from './socialLinks';

export const projectsData: Project[] = [
  {
    id: 'solisiq',
    name: 'SolisIQ – Smart Solar Usage & Savings Monitoring System',
    tagline: 'AI-powered solar advisory platform for capacity recommendation & financial monitoring',
    description:
      'Developed an AI-powered solar advisory platform recommending solar panel capacity based on electricity consumption. Built Flask REST APIs with MySQL for authentication, solar calculations, and data management, and implemented electricity savings, ROI, and solar payback calculations with a responsive dashboard.',
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
      'Homeowners and commercial facilities struggle to determine whether solar adoption makes economic sense due to complex seasonal utility tariffs, variable sunlight irradiance, and ambiguous equipment sizing options.',
    approach:
      'Engineered an end-to-end solar advisory application featuring algorithmic capacity recommendation models and financial projections that quantify payback horizons and return on investment.',
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
        detail: 'Applies Scikit-learn, NumPy, and Pandas math to calculate recommended solar panel capacity in kW peak.',
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
    id: 'ai-incident-intelligence',
    name: 'AI-Powered Incident Intelligence & Root Cause Analysis Platform (Ongoing)',
    tagline: 'Autonomous anomaly detection & incident root-cause analysis platform',
    description:
      'Developing an AI-powered platform for anomaly detection and incident root-cause analysis. Trained and evaluated a machine learning anomaly-detection model using feature engineering, validation, and serialized model artifacts, and built FastAPI services for incident ingestion, anomaly detection, analysis, and evidence retrieval.',
    category: 'AI / ML / Backend',
    accent: 'gold',
    technologies: [
      'Python',
      'FastAPI',
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Joblib',
      'REST APIs',
    ],
    problem:
      'Modern microservice and cloud deployments generate overwhelming volumes of operational metrics, logs, and traces. When an outage occurs, on-call engineers spend valuable time manually correlating disparate log streams rather than resolving root causes.',
    approach:
      'Engineered an automated triage pipeline pairing trained machine learning anomaly detection with dense diagnostic evidence retrieval to detect anomalies and accelerate root-cause investigations.',
    systemHighlights: [
      'Developing an AI-powered platform for anomaly detection and incident root-cause analysis.',
      'Trained and evaluated a machine learning anomaly-detection model using feature engineering, validation, and serialized model artifacts.',
      'Built FastAPI services for incident ingestion, anomaly detection, analysis, and evidence retrieval.',
    ],
    keyImplementation: [
      'Engineered feature extractors converting raw error logs and latency metrics into normalized anomaly vectors.',
      'Trained and serialized machine learning models using Scikit-learn and Joblib for real-time anomaly classification.',
      'Built high-performance asynchronous FastAPI ingestion endpoints handling batched telemetry payloads.',
      'Structured diagnostic evidence retrieval correlating anomalous events with timestamped system signals.',
    ],
    metrics: [
      { label: 'Architecture', value: 'ML Anomaly Triage' },
      { label: 'Inference', value: 'Scikit-learn + Joblib' },
      { label: 'API Gateway', value: 'FastAPI Services' },
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
        id: 'feature-eng',
        name: 'Feature Engineering',
        type: 'Transformation',
        detail: 'Transforms raw log counts, error rates, and response durations into standardized machine learning feature vectors.',
      },
      {
        id: 'ml-detector',
        name: 'ML Anomaly Detector',
        type: 'Inference',
        detail: 'Serialized Scikit-learn model artifacts loaded via Joblib evaluate feature variance to detect genuine service degradations.',
      },
      {
        id: 'evidence-retrieval',
        name: 'Evidence Retrieval',
        type: 'Retrieval',
        detail: 'FastAPI service queries historical incidents and correlated log clusters matching the active anomaly fingerprint.',
      },
      {
        id: 'rca-synthesis',
        name: 'Root-Cause Analysis',
        type: 'Synthesis',
        detail: 'Synthesizes timestamped diagnostic evidence into root-cause findings and actionable remediation suggestions.',
      },
    ],
    githubUrl: projectLinks.aiIncidentIntelligenceSource,
  },
  {
    id: 'setu',
    name: 'SETU – Smart Emergency Response System',
    tagline: 'Emergency response platform for distress triage, mapping & volunteer coordination',
    description:
      'Developed an emergency response platform for distress-report processing, automated triage, and volunteer coordination. Features an interactive emergency map using React.js, Leaflet, and OpenStreetMap for incident visualization, along with location-based volunteer matching and map-based emergency response coordination.',
    category: 'Full-Stack Web App / Spatial',
    accent: 'teal',
    technologies: [
      'React.js',
      'FastAPI',
      'PostgreSQL',
      'Python',
      'Leaflet',
      'OpenStreetMap',
      'REST APIs',
    ],
    problem:
      'In high-stakes emergencies, disconnected communication channels delay first responders and community volunteers from pinpointing victims and assessing incident severity.',
    approach:
      'Engineered an integrated emergency response platform that ingests distress reports, automatically triages severity, plots real-time spatial coordinates on Leaflet/OpenStreetMap, and matches proximate active volunteers.',
    systemHighlights: [
      'Developed an emergency response platform for distress-report processing, automated triage, and volunteer coordination.',
      'Developed an interactive emergency map using React.js, Leaflet, and OpenStreetMap for incident visualization.',
      'Implemented location-based volunteer matching and map-based emergency response coordination.',
    ],
    keyImplementation: [
      'Built FastAPI backend services handling distress report ingestion, triage categorization, and responder state.',
      'Developed interactive emergency map interface using React.js, Leaflet, and OpenStreetMap for spatial distress visualization.',
      'Engineered PostgreSQL database schemas storing incident timestamps, status lifecycles, and geographical coordinates.',
      'Implemented proximity-based volunteer routing algorithms calculating distance to the distress epicentre.',
    ],
    metrics: [
      { label: 'Spatial Engine', value: 'Leaflet + OpenStreetMap' },
      { label: 'Backend API', value: 'FastAPI + PostgreSQL' },
      { label: 'Coordination', value: 'Location-Based Matching' },
    ],
    architectureSnippet: {
      title: 'Emergency Triage & Dispatch Flow',
      flow: [
        'Distress Report Ingestion',
        'Automated Triage Categorization',
        'PostgreSQL Geospatial Indexing',
        'Interactive Map & Volunteer Dispatch',
      ],
    },
    architectureFlow: [
      {
        id: 'distress-ingest',
        name: 'Distress Ingestion',
        type: 'Input',
        detail: 'FastAPI REST APIs receive real-time SOS distress alerts with user geographical coordinates and incident metadata.',
      },
      {
        id: 'auto-triage',
        name: 'Automated Triage',
        type: 'Processing',
        detail: 'Classifies and prioritizes incidents based on reported emergency severity, location density, and urgency levels.',
      },
      {
        id: 'postgres-store',
        name: 'PostgreSQL Store',
        type: 'Database',
        detail: 'Relational database stores structured incident histories, coordinate coordinates, and volunteer availability status.',
      },
      {
        id: 'spatial-map',
        name: 'Leaflet / OSM Map',
        type: 'Visualization',
        detail: 'Interactive frontend map plots live distress pins, pulsing radar radius, and proximity dispatch corridors.',
      },
      {
        id: 'volunteer-match',
        name: 'Volunteer Dispatch',
        type: 'Coordination',
        detail: 'Matches nearest active community responders to distress coordinates for rapid on-the-ground assistance.',
      },
    ],
    githubUrl: undefined, // Hidden since repository is not yet public
  },
];
