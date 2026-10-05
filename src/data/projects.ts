import type { Project } from '../types';
import { projectLinks } from './socialLinks';

export const projectsData: Project[] = [
  {
    id: 'ai-incident-intelligence',
    name: 'AI-Powered Incident Intelligence & Root Cause Analysis Platform (Ongoing)',
    tagline: 'Autonomous anomaly detection & incident root-cause analysis platform',
    description:
      'AI-powered platform for anomaly detection and incident root-cause analysis, featuring an ML anomaly-detection model trained with feature engineering, validation, and serialized model artifacts, paired with FastAPI services for incident ingestion, analysis, and evidence retrieval.',
    category: 'AI / ML / Backend',
    accent: 'gold',
    technologies: ['Python', 'FastAPI', 'Scikit-learn', 'Pandas', 'NumPy', 'Joblib', 'REST APIs'],
    systemHighlights: [
      'Developing an AI-powered platform for anomaly detection and incident root-cause analysis.',
      'Trained and evaluated a machine learning anomaly-detection model using feature engineering, validation, and serialized model artifacts.',
      'Built FastAPI services for incident ingestion, anomaly detection, analysis, and evidence retrieval.',
    ],
    metrics: [
      { label: 'Architecture', value: 'ML Anomaly Triage' },
      { label: 'Modeling', value: 'Feature Eng & Serialization' },
      { label: 'Services', value: 'FastAPI Ingestion & Retrieval' },
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
    githubUrl: projectLinks.aiIncidentIntelligenceSource,
  },
  {
    id: 'solisiq',
    name: 'SolisIQ – Smart Solar Usage & Savings Monitoring System',
    tagline: 'AI-powered solar advisory platform for capacity recommendation & financial monitoring',
    description:
      'Solar usage and savings monitoring advisory platform that recommends optimal solar panel capacity based on electricity consumption, providing electricity savings, ROI, and solar payback calculations via a responsive dashboard and Flask REST APIs with MySQL.',
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
    systemHighlights: [
      'Developed an AI-powered solar advisory platform recommending solar panel capacity based on electricity consumption.',
      'Built Flask REST APIs with MySQL for authentication, solar calculations, and data management.',
      'Implemented electricity savings, ROI, and solar payback calculations with a responsive dashboard.',
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
    githubUrl: projectLinks.solisiqSource,
  },
  {
    id: 'setu',
    name: 'SETU – Smart Emergency Response System',
    tagline: 'Distress-report processing, automated triage, and volunteer coordination platform',
    description:
      'Emergency response platform for distress-report processing, automated triage, and volunteer coordination, featuring an interactive emergency map with location-based responder matching built with React.js, Leaflet, OpenStreetMap, and FastAPI with PostgreSQL.',
    category: 'Full-Stack Web App',
    accent: 'teal',
    technologies: ['React.js', 'FastAPI', 'PostgreSQL', 'Python', 'Leaflet', 'OpenStreetMap', 'REST APIs'],
    systemHighlights: [
      'Developed an emergency response platform for distress-report processing, automated triage, and volunteer coordination.',
      'Developed an interactive emergency map using React.js, Leaflet, and OpenStreetMap for incident visualization.',
      'Implemented location-based volunteer matching and map-based emergency response coordination.',
    ],
    metrics: [
      { label: 'Spatial Mapping', value: 'Leaflet + OpenStreetMap' },
      { label: 'Triage Engine', value: 'Automated Distress Queue' },
      { label: 'Backend Architecture', value: 'FastAPI + PostgreSQL' },
    ],
    architectureSnippet: {
      title: 'Emergency Dispatch Lifecycle',
      flow: [
        'Distress Report Ingestion & Verification',
        'Automated Severity Triage',
        'Leaflet Spatial Proximity Indexing',
        'Volunteer Dispatch & Live Tracking',
      ],
    },
  },
];
