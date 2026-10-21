import { j as __jsxRuntime, r as __React, c as __ReactDOMClient, R as __ReactDefault } from "./vendor-DuOeAc5B.js";
import { g as __gsap, L as __Lenis } from "./animation-B-NUKnBa.js";

const __mkIcon = (paths) => ({ size = 16, className = '', style = {} }) =>
  __jsxRuntime.jsx('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    style,
    children: paths.map((d, i) => __jsxRuntime.jsx('path', { d }, i)),
  });

const __lucide = {
  ChevronDown: __mkIcon(['m6 9 6 6 6-6']),
  ChevronLeft: __mkIcon(['m15 18-6-6 6-6']),
  ChevronRight: __mkIcon(['m9 18 6-6-6-6']),
  Download: __mkIcon(['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm7 10 5 5 5-5', 'M12 15V3']),
  Mail: __mkIcon(['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', 'm22 6-10 7L2 6']),
  ExternalLink: __mkIcon(['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14 21 3']),
  Compass: __mkIcon(['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'm16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z']),
  RotateCcw: __mkIcon(['M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8', 'M3 3v5h5']),
  Menu: __mkIcon(['M4 12h16', 'M4 6h16', 'M4 18h16']),
  X: __mkIcon(['M18 6 6 18', 'm6 6 12 12']),
};

const __modules = {
  "./types/index": function(module, exports, require) {
"use strict";
  },
  "./data/portfolioContent": function(module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SKILLS = exports.SITE_CONFIG = exports.PROJECTS = exports.MASTER_INK_PATH = exports.EDUCATION = exports.CHAPTER_ANCHORS = exports.ACHIEVEMENTS = void 0;
const SITE_CONFIG = {
  name: 'Abhijeet Singh',
  firstName: 'ABHIJEET',
  lastName: 'SINGH',
  role: 'Software Developer · Full-Stack, Backend & AI/ML Engineering',
  shortRole: 'SOFTWARE DEVELOPER',
  intro: 'Computer Science undergraduate at Pranveer Singh Institute of Technology (PSIT) with hands-on experience in full-stack development, backend engineering, machine learning, and AI-powered applications. Skilled in developing REST APIs, database-driven systems, interactive web applications, and ML-based solutions.',
  careerObjective: 'Computer Science undergraduate with hands-on experience in full-stack development, backend engineering, machine learning, and AI-powered applications. Skilled in developing REST APIs, database-driven systems, interactive web applications, and ML-based solutions through academic and personal projects. Seeking software development opportunities where I can apply strong problem-solving and programming skills, contribute to scalable and reliable software solutions, and continue developing expertise in Data Structures and Algorithms, backend systems, AI/ML, and Generative AI.',
  email: 'abhijeetsingh01122006@gmail.com',
  phone: '+91 7007803506',
  location: 'Kanpur & Uttar Pradesh, India',
  github: 'https://github.com/Abhijeet-Singh-01',
  linkedin: 'https://www.linkedin.com/in/abhijeet-singh-988276330/',
  leetcode: 'https://leetcode.com/',
  resumeUrl: '/resume.pdf',
  portraitUrl: '/profile.webp'
};
exports.SITE_CONFIG = SITE_CONFIG;
const CHAPTER_ANCHORS = [{
  id: 'home',
  num: '01',
  label: 'Home',
  coord: {
    x: 550,
    y: 480
  },
  scrollProgress: 0.0,
  dwellStart: 0.0,
  dwellEnd: 0.13
}, {
  id: 'projects',
  num: '02',
  label: 'Projects',
  coord: {
    x: 3550,
    y: 1350
  },
  scrollProgress: 0.25,
  dwellStart: 0.22,
  dwellEnd: 0.36
}, {
  id: 'achievements',
  num: '03',
  label: 'Achievements',
  coord: {
    x: 750,
    y: 2350
  },
  scrollProgress: 0.50,
  dwellStart: 0.46,
  dwellEnd: 0.60
}, {
  id: 'skills',
  num: '04',
  label: 'Skills',
  coord: {
    x: 3550,
    y: 3350
  },
  scrollProgress: 0.75,
  dwellStart: 0.70,
  dwellEnd: 0.82
}, {
  id: 'contact',
  num: '05',
  label: 'Contact',
  coord: {
    x: 2050,
    y: 4300
  },
  scrollProgress: 1.0,
  dwellStart: 0.91,
  dwellEnd: 1.0
}];
exports.CHAPTER_ANCHORS = CHAPTER_ANCHORS;
const MASTER_INK_PATH = 'M 550,860 ' + 'C 1750,960 2350,1180 3550,1350 ' + 'C 2350,1650 1850,2050 750,2350 ' + 'C 1850,2680 2350,3050 3550,3350 ' + 'C 2950,3720 2550,4020 2050,4300';
exports.MASTER_INK_PATH = MASTER_INK_PATH;
const PROJECTS = [{
  id: 'solisiq',
  num: '01',
  title: 'SolisIQ',
  subtitle: 'Smart Solar Usage & Savings Monitoring System',
  category: 'AI Advisory · Flask · MySQL · Scikit-learn',
  description: 'Developed an AI-powered solar advisory platform recommending solar panel capacity based on electricity consumption, with Flask REST APIs and a responsive ROI monitoring dashboard.',
  highlights: ['Developed an AI-powered solar advisory platform recommending solar panel capacity based on electricity consumption.', 'Built Flask REST APIs with MySQL for authentication, solar calculations, and data management.', 'Implemented electricity savings, ROI, and solar payback calculations with a responsive dashboard.'],
  techStack: ['Python', 'Flask', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'Scikit-learn', 'Pandas', 'NumPy', 'Joblib', 'REST APIs', 'Render'],
  repoUrl: 'https://github.com/Abhijeet-Singh-01/SolisIQ'
}, {
  id: 'ai-incident-intelligence',
  num: '02',
  title: 'AI Incident Intelligence',
  subtitle: 'AI-Powered Incident Intelligence & Root Cause Analysis Platform (Ongoing)',
  category: 'AI / Machine Learning · FastAPI',
  description: 'Developing an AI-powered platform for anomaly detection and incident root-cause analysis with machine learning models and FastAPI services.',
  highlights: ['Developing an AI-powered platform for anomaly detection and incident root-cause analysis.', 'Trained and evaluated a machine learning anomaly-detection model using feature engineering, validation, and serialized model artifacts.', 'Built FastAPI services for incident ingestion, anomaly detection, analysis, and evidence retrieval.'],
  techStack: ['Python', 'FastAPI', 'Scikit-learn', 'Pandas', 'NumPy', 'Joblib', 'REST APIs'],
  repoUrl: 'https://github.com/Abhijeet-Singh-01/ai-incident-intelligence'
}, {
  id: 'setu',
  num: '03',
  title: 'SETU',
  subtitle: 'Smart Emergency Response System',
  category: 'React.js · FastAPI · PostgreSQL · Leaflet',
  description: 'Developed an emergency response platform for distress-report processing, automated triage, interactive OpenStreetMap visualization, and volunteer coordination.',
  highlights: ['Developed an emergency response platform for distress-report processing, automated triage, and volunteer coordination.', 'Developed an interactive emergency map using React.js, Leaflet, and OpenStreetMap for incident visualization.', 'Implemented location-based volunteer matching and map-based emergency response coordination.'],
  techStack: ['React.js', 'FastAPI', 'PostgreSQL', 'Python', 'Leaflet', 'OpenStreetMap', 'REST APIs'],
  repoUrl: 'https://github.com/Hack-Quest/Setu'
}];
exports.PROJECTS = PROJECTS;
const ACHIEVEMENTS = [{
  id: 'leetcode-dsa',
  metric: '250+ Solved',
  title: 'Solved 250+ DSA Problems on LeetCode',
  subtitle: 'Data Structures & Algorithms',
  period: 'Ongoing',
  description: 'Solved 250+ DSA problems on LeetCode, covering arrays, strings, linked lists, stacks, queues, trees, and recursion.',
  tags: ['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Trees & Recursion', 'C++ & Python'],
  linkUrl: 'https://leetcode.com/'
}, {
  id: 'aws-ml-foundations',
  metric: 'AWS Badge',
  title: 'AWS Academy Graduate – Machine Learning Foundations Training Badge',
  subtitle: 'Amazon Web Services (AWS)',
  period: 'AWS Certification',
  description: 'Earned AWS Academy Graduate – Machine Learning Foundations Training Badge focused on machine learning workflows, model training, and evaluation.',
  tags: ['Machine Learning', 'AWS Academy', 'Model Training', 'AI/ML']
}, {
  id: 'aws-gen-ai',
  metric: 'AWS Certified',
  title: 'AWS Planning a Generative AI Project',
  subtitle: 'Amazon Web Services (AWS)',
  period: 'AWS Certification',
  description: 'Earned AWS credential focused on Generative AI project planning, scoping, and building AI-powered applications alongside full-stack and backend systems.',
  tags: ['Generative AI', 'AWS', 'AI Project Planning', 'Full-Stack & REST APIs']
}];
exports.ACHIEVEMENTS = ACHIEVEMENTS;
const EDUCATION = {
  institution: 'Pranveer Singh Institute of Technology (PSIT)',
  university: 'Bachelor of Technology in Computer Science and Engineering',
  degree: 'Bachelor of Technology in Computer Science and Engineering',
  period: '2024 – 2028',
  cgpa: '7.54/10',
  schooling: [{
    degree: 'Class XII (CBSE)',
    school: 'Rani Laxmi Bai Memorial School',
    period: '2024',
    score: '70.6%'
  }, {
    degree: 'Class X (CBSE)',
    school: 'Rani Laxmi Bai Memorial School',
    period: '2022',
    score: '74.6%'
  }]
};
exports.EDUCATION = EDUCATION;
const SKILLS = [{
  category: 'Languages',
  items: ['C++', 'Python', 'C', 'SQL']
}, {
  category: 'Frontend',
  items: ['React.js', 'HTML', 'CSS', 'Tailwind CSS', 'JavaScript (ES6+)']
}, {
  category: 'Backend',
  items: ['FastAPI', 'Flask', 'REST APIs', 'Firebase Cloud Messaging (Learning)']
}, {
  category: 'Databases',
  items: ['MongoDB', 'MySQL', 'PostgreSQL']
}, {
  category: 'ML/Data',
  items: ['Scikit-learn', 'Pandas', 'NumPy', 'Joblib']
}, {
  category: 'Tools',
  items: ['Git', 'GitHub', 'VS Code']
}];
exports.SKILLS = SKILLS;
  },
  "./hooks/useReducedMotion": function(module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useReducedMotion = useReducedMotion;
var _react = require("react");
/**
 * Detects prefers-reduced-motion and returns a boolean.
 * Also provides a manual override for the user.
 */
function useReducedMotion() {
  const [reduced, setReduced] = (0, _react.useState)(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  (0, _react.useEffect)(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = e => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  const toggle = () => setReduced(prev => !prev);
  return [reduced, toggle];
}
  },
  "./components/ui/Icons": function(module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GithubIcon = GithubIcon;
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function GithubIcon({
  size = 16,
  className = ''
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className,
    "aria-hidden": "true",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      d: "M9 18c-4.51 2-5-2-7-2"
    })]
  });
}
  },
  "./components/InkFilters": function(module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InkFilters = InkFilters;
var _jsxRuntime = require("react/jsx-runtime");
/**
 * InkFilters — SVG filter pipeline for the liquid ink effect.
 *
 * Three distinct filter configurations:
 *  - #ink-fresh   : Active trail head with turbulent edges
 *  - #ink-pool    : Stabilized pool at chapter anchors
 *  - #ink-splatter: Micro-droplet field around active head
 *
 * These filters approximate physical ink soaking into textured paper.
 * They are applied sparingly via filter="url(#...)" on SVG elements.
 *
 * Performance note: filterUnits="userSpaceOnUse" restricts filter
 * computation to the element's bounding box, avoiding full-canvas
 * rasterization.
 */
function InkFilters() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      width: 0,
      height: 0,
      overflow: 'hidden'
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("defs", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("filter", {
        id: "ink-fresh",
        x: "-20%",
        y: "-20%",
        width: "140%",
        height: "140%",
        colorInterpolationFilters: "linearRGB",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("feTurbulence", {
          type: "turbulence",
          baseFrequency: "0.035 0.06",
          numOctaves: "3",
          seed: "7",
          result: "noise"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("feDisplacementMap", {
          in: "SourceGraphic",
          in2: "noise",
          scale: "6",
          xChannelSelector: "R",
          yChannelSelector: "G",
          result: "displaced"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("feGaussianBlur", {
          in: "displaced",
          stdDeviation: "1.2",
          result: "blurred"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("feColorMatrix", {
          in: "blurred",
          type: "matrix",
          values: "0 0 0 0 0.10\r 0 0 0 0 0.07\r 0 0 0 0 0.03\r 0 0 0 14 -5",
          result: "thresholded"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("feComposite", {
          in: "thresholded",
          in2: "SourceGraphic",
          operator: "in"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("filter", {
        id: "ink-pool",
        x: "-30%",
        y: "-30%",
        width: "160%",
        height: "160%",
        colorInterpolationFilters: "linearRGB",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("feTurbulence", {
          type: "fractalNoise",
          baseFrequency: "0.018 0.025",
          numOctaves: "4",
          seed: "12",
          result: "pool-noise"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("feDisplacementMap", {
          in: "SourceGraphic",
          in2: "pool-noise",
          scale: "14",
          xChannelSelector: "R",
          yChannelSelector: "G",
          result: "pool-displaced"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("feGaussianBlur", {
          in: "pool-displaced",
          stdDeviation: "2.5",
          result: "pool-blurred"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("feColorMatrix", {
          in: "pool-blurred",
          type: "matrix",
          values: "0 0 0 0 0.10\r 0 0 0 0 0.07\r 0 0 0 0 0.03\r 0 0 0 18 -6",
          result: "pool-threshold"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("feComposite", {
          in: "pool-threshold",
          in2: "SourceGraphic",
          operator: "in"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("filter", {
        id: "ink-splatter",
        x: "-50%",
        y: "-50%",
        width: "200%",
        height: "200%",
        colorInterpolationFilters: "linearRGB",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("feTurbulence", {
          type: "turbulence",
          baseFrequency: "0.09 0.12",
          numOctaves: "2",
          seed: "3",
          result: "splat-noise"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("feDisplacementMap", {
          in: "SourceGraphic",
          in2: "splat-noise",
          scale: "22",
          xChannelSelector: "R",
          yChannelSelector: "G",
          result: "splat-displaced"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("feColorMatrix", {
          in: "splat-displaced",
          type: "matrix",
          values: "0 0 0 0 0.10\r 0 0 0 0 0.07\r 0 0 0 0 0.03\r 0 0 0 22 -10"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("filter", {
        id: "paper-texture",
        x: "0%",
        y: "0%",
        width: "100%",
        height: "100%",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("feTurbulence", {
          type: "fractalNoise",
          baseFrequency: "0.75",
          numOctaves: "4",
          stitchTiles: "stitch",
          result: "paper-noise"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("feColorMatrix", {
          in: "paper-noise",
          type: "saturate",
          values: "0",
          result: "gray-noise"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("feBlend", {
          in: "SourceGraphic",
          in2: "gray-noise",
          mode: "multiply"
        })]
      })]
    })
  });
}
  },
  "./components/InkTrail": function(module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InkTrail = InkTrail;
var _react = require("react");
var _portfolioContent = require("../data/portfolioContent");
var _jsxRuntime = require("react/jsx-runtime");
function InkTrail({
  progress
}) {
  const masterPathRef = (0, _react.useRef)(null);
  const headGroupRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    const masterPath = masterPathRef.current;
    if (!masterPath) return;
    const masterLen = masterPath.getTotalLength();
    const SAMPLES = 300;
    const pts = new Array(SAMPLES + 1);
    for (let i = 0; i <= SAMPLES; i++) {
      const pt = masterPath.getPointAtLength(i / SAMPLES * masterLen);
      pts[i] = {
        x: pt.x,
        y: pt.y
      };
    }
    masterPath.style.strokeDasharray = `${masterLen}`;
    masterPath.style.strokeDashoffset = `${masterLen * 0.96}`;
    let rafId = 0;
    let lastP = -1;
    const animate = () => {
      const p = Math.max(0.02, Math.min(1, progress.current));
      if (Math.abs(p - lastP) > 0.00005) {
        lastP = p;
        const remaining = masterLen * (1 - p);
        masterPath.style.strokeDashoffset = `${remaining.toFixed(1)}`;
        const idxFloat = p * SAMPLES;
        const idx0 = Math.min(SAMPLES, Math.max(0, Math.floor(idxFloat)));
        const idx1 = Math.min(SAMPLES, idx0 + 1);
        const frac = idxFloat - idx0;
        const px = pts[idx0].x + (pts[idx1].x - pts[idx0].x) * frac;
        const py = pts[idx0].y + (pts[idx1].y - pts[idx0].y) * frac;
        if (headGroupRef.current) {
          headGroupRef.current.setAttribute('transform', `translate(${px.toFixed(1)}, ${py.toFixed(1)})`);
        }
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [progress]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
    className: "ink-svg",
    viewBox: "0 0 5000 5000",
    preserveAspectRatio: "none",
    "aria-hidden": "true",
    shapeRendering: "geometricPrecision",
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      d: _portfolioContent.MASTER_INK_PATH,
      fill: "none",
      stroke: "var(--rule-color)",
      strokeWidth: "2.5",
      strokeDasharray: "10 10",
      vectorEffect: "non-scaling-stroke"
    }), _portfolioContent.CHAPTER_ANCHORS.map(ch => /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
      transform: `translate(${ch.coord.x}, ${ch.coord.y})`,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
        r: "24",
        fill: "none",
        stroke: "var(--gold)",
        strokeWidth: "1.5",
        opacity: "0.45"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
        r: "8",
        fill: "var(--gold)",
        opacity: "0.85"
      })]
    }, ch.id)), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      ref: masterPathRef,
      d: _portfolioContent.MASTER_INK_PATH,
      className: "ink-trail-path",
      vectorEffect: "non-scaling-stroke",
      style: {
        strokeWidth: 3.5
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
      ref: headGroupRef,
      transform: "translate(550, 860)",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
        r: "14",
        fill: "none",
        stroke: "var(--gold)",
        strokeWidth: "2"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
        r: "5",
        fill: "var(--gold)"
      })]
    })]
  });
}
  },
  "./components/IntroPreloader": function(module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntroPreloader = IntroPreloader;
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
function IntroPreloader({
  onComplete
}) {
  const [percent, setPercent] = (0, _react.useState)(0);
  const [phase, setPhase] = (0, _react.useState)('counter');
  const onCompleteRef = (0, _react.useRef)(onComplete);
  onCompleteRef.current = onComplete;
  (0, _react.useEffect)(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('skipIntro') === '1' || document.documentElement.dataset.initialWaypoint) {
        setPhase('done');
        onCompleteRef.current();
        return;
      }
    }
    let frameId = 0;
    let holdTimer = 0;
    const start = performance.now();
    // Balanced, responsive 2.6-second 0% -> 100% progression
    const counterDuration = 2600;
    const step = now => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / counterDuration);
      // Smooth ease-in-out curve
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setPercent(Math.round(eased * 100));
      if (t < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setPercent(100);
        holdTimer = window.setTimeout(() => {
          setPhase('hello');
        }, 150);
      }
    };
    frameId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frameId);
      if (holdTimer) window.clearTimeout(holdTimer);
    };
  }, []);
  (0, _react.useEffect)(() => {
    if (phase === 'hello') {
      // 1.65s cursive handwriting draw -> immediately transitions into portal at 1.72s with NO dead pause!
      const t1 = window.setTimeout(() => setPhase('portal'), 1720);
      return () => window.clearTimeout(t1);
    }
    if (phase === 'portal') {
      // Crisp 0.76s portal expansion into the Dark Mode Hero section
      const t2 = window.setTimeout(() => {
        setPhase('done');
        onCompleteRef.current();
      }, 760);
      return () => window.clearTimeout(t2);
    }
  }, [phase]);
  if (phase === 'done') return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "select-none overflow-hidden",
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0A0A0A',
      color: '#EAE3D2'
    },
    "aria-label": "Loading portfolio",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      type: "button",
      onClick: () => {
        setPhase('done');
        onCompleteRef.current();
      },
      className: "type-label text-[10px] px-3.5 py-1.5 rounded-full cursor-pointer",
      style: {
        position: 'fixed',
        bottom: '24px',
        right: '28px',
        zIndex: 100001,
        color: 'rgba(234, 227, 210, 0.72)',
        border: '1px solid rgba(234, 227, 210, 0.24)',
        background: 'rgba(255, 255, 255, 0.04)'
      },
      children: "Skip Intro \u2192"
    }), phase === 'counter' && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "font-display-condensed",
        style: {
          fontSize: 'clamp(4.8rem, 11vw, 8.2rem)',
          lineHeight: 0.92,
          color: '#EAE3D2',
          marginBottom: '0.6rem',
          fontVariantNumeric: 'tabular-nums'
        },
        children: [percent, "%"]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          position: 'relative',
          width: 'clamp(120px, 16vw, 156px)',
          height: 'clamp(120px, 16vw, 156px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
          className: "w-full h-full preloader-ring-spin",
          viewBox: "0 0 100 100",
          "aria-hidden": "true",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("defs", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("linearGradient", {
              id: "crescent-grad",
              x1: "0%",
              y1: "0%",
              x2: "100%",
              y2: "100%",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("stop", {
                offset: "0%",
                stopColor: "#F5F0E6",
                stopOpacity: "1"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("stop", {
                offset: "65%",
                stopColor: "#C8B99E",
                stopOpacity: "0.85"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("stop", {
                offset: "100%",
                stopColor: "#2A2620",
                stopOpacity: "0.05"
              })]
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
            cx: "50",
            cy: "50",
            r: "34",
            fill: "none",
            stroke: "rgba(234, 227, 210, 0.12)",
            strokeWidth: "9"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
            cx: "50",
            cy: "50",
            r: "34",
            fill: "none",
            stroke: "url(#crescent-grad)",
            strokeWidth: "10",
            strokeLinecap: "round",
            strokeDasharray: "135 220"
          })]
        })
      })]
    }), phase === 'hello' && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '0 24px'
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
        width: "460",
        height: "195",
        viewBox: "0 0 320 140",
        fill: "none",
        "aria-label": "hello",
        style: {
          width: 'clamp(260px, 46vw, 500px)',
          height: 'auto',
          overflow: 'visible'
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
          d: "M 48,96 C 62,64 78,24 72,18 C 65,12 56,52 56,96 C 56,74 74,62 86,66 C 96,70 92,94 104,94 C 118,94 134,80 134,68 C 134,58 120,60 118,74 C 116,90 132,98 148,92 C 168,84 186,44 182,22 C 178,10 166,38 166,84 C 166,96 178,98 192,90 C 210,78 226,42 222,22 C 218,10 206,40 206,84 C 206,96 220,98 234,88 C 244,80 246,68 258,68 C 272,68 278,80 272,90 C 264,100 246,96 246,80 C 246,68 264,64 286,70",
          stroke: "#EAE3D2",
          strokeWidth: "4.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: "hello-stroke-path"
        })
      })
    }), phase === 'portal' && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          position: 'absolute',
          left: 0,
          right: 0,
          height: '2px',
          background: 'var(--gold)'
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "portal-expand-box"
      })]
    })]
  });
}
  },
  "./components/chapters/GenesisChapter": function(module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenesisChapter = GenesisChapter;
var _portfolioContent = require("../../data/portfolioContent");
var _lucideReact = require("lucide-react");
var _Icons = require("../ui/Icons");
var _jsxRuntime = require("react/jsx-runtime");
function GenesisChapter({
  onJumpToChapter
}) {
  const heroLetters = _portfolioContent.SITE_CONFIG.firstName.split('');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "chapter-panel",
    style: {
      left: '55vw',
      top: '48vh',
      width: 'clamp(340px, 88vw, 1040px)',
      transform: 'translate(-50%, 0%)'
    },
    "aria-label": "Hero Section \u2014 Abhijeet Singh",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "section-surface section-surface-hero px-6 sm:px-12 py-5 sm:py-7 text-center flex flex-col items-center",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg-2)] mb-6",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: _portfolioContent.SITE_CONFIG.portraitUrl,
          alt: "Abhijeet Singh",
          className: "w-7 h-7 rounded-full object-cover",
          style: {
            border: '1.5px solid var(--gold)'
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          className: "type-label text-[10px]",
          style: {
            color: 'var(--ink)'
          },
          children: [_portfolioContent.SITE_CONFIG.name, " \xB7 B.Tech CS @ PSIT Kanpur (", _portfolioContent.EDUCATION.period, ")"]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        className: "font-display-condensed uppercase select-none overflow-hidden flex items-center justify-center",
        style: {
          fontSize: 'clamp(4.2rem, 13vw, 9.6rem)',
          lineHeight: 0.86,
          letterSpacing: '-0.02em',
          color: 'var(--ink)'
        },
        "aria-label": "Abhijeet Singh",
        children: heroLetters.map((char, idx) => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "hero-letter-rise inline-block",
          style: {
            animationDelay: `${idx * 45}ms`
          },
          children: char
        }, idx))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "mt-2 mb-5 flex flex-col items-center",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          className: "font-display-condensed uppercase tracking-[0.14em]",
          style: {
            fontSize: 'clamp(1.35rem, 3.2vw, 2.35rem)',
            lineHeight: 1,
            color: 'var(--gold)'
          },
          children: [_portfolioContent.SITE_CONFIG.lastName, " \u2014 ", _portfolioContent.SITE_CONFIG.shortRole]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        className: "type-body max-w-2xl mx-auto mb-7",
        style: {
          fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)',
          lineHeight: 1.7,
          color: 'var(--charcoal)'
        },
        children: _portfolioContent.SITE_CONFIG.intro
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "flex flex-wrap items-center justify-center gap-3 mb-8",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
          type: "button",
          onClick: () => onJumpToChapter?.(1),
          className: "ink-btn ink-btn-solid",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Compass, {
            size: 14
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: "Explore Projects"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
          href: _portfolioContent.SITE_CONFIG.resumeUrl,
          download: "Abhijeet-Singh-Resume.pdf",
          className: "ink-btn",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Download, {
            size: 14
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: "Download R\xE9sum\xE9"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
          href: _portfolioContent.SITE_CONFIG.github,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "ink-btn",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Icons.GithubIcon, {
            size: 14
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: "GitHub"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
          href: _portfolioContent.SITE_CONFIG.linkedin,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "ink-btn",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ExternalLink, {
            size: 13
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: "LinkedIn"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
          href: `mailto:${_portfolioContent.SITE_CONFIG.email}`,
          className: "ink-btn",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Mail, {
            size: 13
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: "Contact"
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "w-full pt-5 border-t border-[var(--rule-color)] grid grid-cols-3 gap-4 items-center text-center",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "type-label text-[10px] block font-semibold",
            style: {
              color: 'var(--ink)'
            },
            children: "AI & ML SYSTEMS"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "type-label text-[8.5px] block mt-0.5",
            children: "Anomaly & Root-Cause Models"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
          type: "button",
          onClick: () => onJumpToChapter?.(1),
          className: "flex flex-col items-center justify-center gap-1 cursor-pointer bg-transparent border-none mx-auto",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "type-label text-[10px] font-bold",
            style: {
              color: 'var(--gold)'
            },
            children: "SCROLL TO EXPLORE"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ChevronDown, {
            size: 15,
            style: {
              color: 'var(--gold)'
            }
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "type-label text-[10px] block font-semibold",
            style: {
              color: 'var(--ink)'
            },
            children: "FULL-STACK & APIs"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "type-label text-[8.5px] block mt-0.5",
            children: "FastAPI \xB7 React \xB7 PostgreSQL"
          })]
        })]
      })]
    })
  });
}
  },
  "./components/chapters/ArchitectChapter": function(module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArchitectChapter = ArchitectChapter;
var _lucideReact = require("lucide-react");
var _Icons = require("../ui/Icons");
var _portfolioContent = require("../../data/portfolioContent");
var _jsxRuntime = require("react/jsx-runtime");
function ArchitectChapter({
  onJumpToChapter
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "chapter-panel",
    style: {
      left: '355vw',
      top: '135vh',
      width: 'clamp(340px, 90vw, 1100px)',
      transform: 'translate(-50%, 0%)'
    },
    "aria-label": "Section 02: Selected Projects",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "section-surface p-5 sm:p-7",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "flex flex-wrap items-end justify-between gap-4 pb-3.5 mb-4 border-b border-[var(--rule-color)]",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "type-label block mb-1.5",
            style: {
              color: 'var(--gold)'
            },
            children: "02 \u2014 SELECTED ENGINEERING WORK"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
            className: "type-headline",
            style: {
              fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)'
            },
            children: "Featured Projects"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
          type: "button",
          onClick: () => onJumpToChapter?.(2),
          className: "ink-btn",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Compass, {
            size: 13
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: "Next: Achievements \u2192"
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "grid grid-cols-1 lg:grid-cols-3 gap-5",
        children: _portfolioContent.PROJECTS.map(project => /*#__PURE__*/(0, _jsxRuntime.jsxs)("article", {
          className: "project-card p-4 sm:p-5 flex flex-col justify-between",
          style: {
            background: 'var(--card-bg-2)'
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: "flex items-center justify-between gap-2 mb-1.5",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
                className: "type-mono text-xs font-bold",
                style: {
                  color: 'var(--gold)'
                },
                children: ["PROJECT ", project.num]
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                className: "type-label text-[8.5px]",
                children: project.category
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
              className: "type-headline mb-1",
              style: {
                fontSize: '1.3rem',
                lineHeight: 1.15
              },
              children: project.title
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              className: "type-label text-[9px] mb-2",
              style: {
                color: 'var(--gold)',
                letterSpacing: '0.07em'
              },
              children: project.subtitle
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              className: "type-body text-xs mb-2.5 leading-snug",
              children: project.description
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
              className: "space-y-1.5 mb-3.5",
              style: {
                listStyle: 'none'
              },
              children: project.highlights.slice(0, 2).map((h, i) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
                className: "flex items-start gap-2",
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                  className: "type-mono text-[10px] mt-0.5",
                  style: {
                    color: 'var(--gold)'
                  },
                  children: "\u2022"
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                  className: "type-body text-[11.5px] leading-snug",
                  children: h
                })]
              }, i))
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "flex flex-wrap gap-1.5 mb-3",
              children: project.techStack.map(tech => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                className: "tech-pill",
                children: tech
              }, tech))
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "pt-3 border-t border-[var(--rule-color)]",
              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
                href: project.repoUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "ink-btn ink-btn-solid w-full justify-center",
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Icons.GithubIcon, {
                  size: 13
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                  children: "View Source on GitHub"
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ExternalLink, {
                  size: 11
                })]
              })
            })]
          })]
        }, project.id))
      })]
    })
  });
}
  },
  "./components/chapters/ArenaChapter": function(module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArenaChapter = ArenaChapter;
var _lucideReact = require("lucide-react");
var _portfolioContent = require("../../data/portfolioContent");
var _jsxRuntime = require("react/jsx-runtime");
function ArenaChapter({
  onJumpToChapter
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "chapter-panel",
    style: {
      left: '75vw',
      top: '235vh',
      width: 'clamp(340px, 88vw, 1040px)',
      transform: 'translate(-50%, 0%)'
    },
    "aria-label": "Section 03: Achievements and Education",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "section-surface p-5 sm:p-7",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "flex flex-wrap items-end justify-between gap-4 pb-3.5 mb-4 border-b border-[var(--rule-color)]",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "type-label block mb-1",
            style: {
              color: 'var(--gold)'
            },
            children: "03 \u2014 CERTIFICATIONS, ACHIEVEMENTS & EDUCATION"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
            className: "type-headline",
            style: {
              fontSize: 'clamp(1.75rem, 3vw, 2.45rem)'
            },
            children: "Achievements & Education"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
          type: "button",
          onClick: () => onJumpToChapter?.(3),
          className: "ink-btn",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Compass, {
            size: 13
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: "Next: Technical Skills \u2192"
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "grid grid-cols-1 lg:grid-cols-12 gap-5 items-start",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "lg:col-span-7 space-y-3",
          children: _portfolioContent.ACHIEVEMENTS.map(item => /*#__PURE__*/(0, _jsxRuntime.jsxs)("article", {
            className: "project-card p-3.5 sm:p-4",
            style: {
              background: 'var(--card-bg-2)'
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: "flex flex-wrap items-center justify-between gap-2 mb-1",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
                className: "type-label text-[9px]",
                style: {
                  color: 'var(--gold)'
                },
                children: [item.subtitle, " \xB7 ", item.period]
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                className: "px-3 py-0.5 rounded-full type-mono text-[10px] font-bold",
                style: {
                  background: 'var(--gold-soft)',
                  color: 'var(--gold)',
                  border: '1px solid var(--gold-border)'
                },
                children: item.metric
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
              className: "type-headline text-base mb-1",
              children: item.title
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              className: "type-body text-xs mb-2 leading-snug",
              children: item.description
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: "flex flex-wrap items-center justify-between gap-2",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "flex flex-wrap gap-1.5",
                children: item.tags.map(tag => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                  className: "tech-pill",
                  children: tag
                }, tag))
              }), item.linkUrl && /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
                href: item.linkUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "type-mono text-xs inline-flex items-center gap-1",
                style: {
                  color: 'var(--gold)'
                },
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                  children: "LeetCode"
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ExternalLink, {
                  size: 11
                })]
              })]
            })]
          }, item.id))
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "lg:col-span-5",
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "project-card p-5 sm:p-6",
            style: {
              background: 'var(--card-bg-2)'
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "type-label text-[10px] block mb-2",
              style: {
                color: 'var(--gold)'
              },
              children: "EDUCATION"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
              className: "type-headline text-xl mb-1",
              children: _portfolioContent.EDUCATION.institution
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              className: "type-body text-xs font-semibold mb-3",
              style: {
                color: 'var(--ink)'
              },
              children: _portfolioContent.EDUCATION.degree
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: "px-3.5 py-1.5 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] mb-4",
              style: {
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px'
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
                className: "type-mono text-xs font-bold",
                style: {
                  color: 'var(--gold)'
                },
                children: ["CGPA: ", _portfolioContent.EDUCATION.cgpa]
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
                className: "type-label text-[9.5px]",
                children: ["\xB7 ", _portfolioContent.EDUCATION.period]
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "pt-4 border-t border-[var(--rule-color)] space-y-3",
              children: _portfolioContent.EDUCATION.schooling.map(s => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                className: "arch-layer",
                children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                  className: "flex items-center justify-between text-xs type-mono",
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                    style: {
                      color: 'var(--ink)'
                    },
                    children: s.school
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                    style: {
                      color: 'var(--gold)'
                    },
                    children: s.score
                  })]
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                  className: "type-body text-xs mt-0.5",
                  children: s.degree
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                  className: "type-label text-[9px]",
                  children: s.period
                })]
              }, s.degree))
            })]
          })
        })]
      })]
    })
  });
}
  },
  "./components/chapters/ForgeChapter": function(module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForgeChapter = ForgeChapter;
var _portfolioContent = require("../../data/portfolioContent");
var _lucideReact = require("lucide-react");
var _jsxRuntime = require("react/jsx-runtime");
function ForgeChapter({
  onJumpToChapter
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "chapter-panel",
    style: {
      left: '355vw',
      top: '335vh',
      width: 'clamp(340px, 88vw, 1020px)',
      transform: 'translate(-50%, 0%)'
    },
    "aria-label": "Section 04: Technical Skills",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "section-surface p-6 sm:p-9",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "flex flex-wrap items-end justify-between gap-4 pb-5 mb-6 border-b border-[var(--rule-color)]",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "type-label block mb-1.5",
            style: {
              color: 'var(--gold)'
            },
            children: "04 \u2014 ENGINEERING TOOLKIT"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
            className: "type-headline",
            style: {
              fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)'
            },
            children: "Technical Skills"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
          type: "button",
          onClick: () => onJumpToChapter?.(4),
          className: "ink-btn",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Compass, {
            size: 13
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: "Next: Contact Details \u2192"
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
        children: _portfolioContent.SKILLS.map((group, idx) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("article", {
          className: "project-card p-5",
          style: {
            background: 'var(--card-bg-2)'
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "flex items-center justify-between mb-3 pb-2.5 border-b border-[var(--rule-color)]",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "type-headline text-base",
              children: group.category
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
              className: "type-mono text-xs",
              style: {
                color: 'var(--gold)'
              },
              children: ["0", idx + 1]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "flex flex-wrap gap-2",
            children: group.items.map(skill => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "tech-pill",
              style: {
                fontSize: '0.68rem',
                padding: '0.32rem 0.75rem'
              },
              children: skill
            }, skill))
          })]
        }, group.category))
      })]
    })
  });
}
  },
  "./components/chapters/ContactChapter": function(module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactChapter = ContactChapter;
var _react = require("react");
var _portfolioContent = require("../../data/portfolioContent");
var _lucideReact = require("lucide-react");
var _Icons = require("../ui/Icons");
var _jsxRuntime = require("react/jsx-runtime");
function ContactChapter({
  onJumpToChapter
}) {
  const [copied, setCopied] = (0, _react.useState)(false);
  const [copiedPhone, setCopiedPhone] = (0, _react.useState)(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(_portfolioContent.SITE_CONFIG.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };
  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(_portfolioContent.SITE_CONFIG.phone);
      setCopiedPhone(true);
      window.setTimeout(() => setCopiedPhone(false), 2500);
    } catch {
      setCopiedPhone(false);
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "chapter-panel",
    style: {
      left: '205vw',
      top: '430vh',
      width: 'clamp(340px, 86vw, 980px)',
      transform: 'translate(-50%, 0%)'
    },
    "aria-label": "Section 05: Contact Details",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "section-surface p-6 sm:p-9",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "flex flex-wrap items-end justify-between gap-4 pb-4 mb-5 border-b border-[var(--rule-color)]",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "type-label block mb-1",
            style: {
              color: 'var(--gold)'
            },
            children: "05 \u2014 GET IN TOUCH"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
            className: "type-headline",
            style: {
              fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)'
            },
            children: "Contact Details"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
          type: "button",
          onClick: () => onJumpToChapter?.(0),
          className: "ink-btn",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.RotateCcw, {
            size: 13
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: "Back to Home"
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "lg:col-span-7",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
            className: "type-headline text-xl mb-2",
            children: "Seeking Software Development Opportunities"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            className: "type-body text-xs sm:text-[13px] mb-4 leading-relaxed",
            children: _portfolioContent.SITE_CONFIG.careerObjective
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "p-4 rounded-xl border mb-3",
            style: {
              background: 'var(--card-bg-2)',
              borderColor: 'var(--gold-border)'
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "type-label text-[9px] block mb-1",
              style: {
                color: 'var(--gold)'
              },
              children: "EMAIL ADDRESS"
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: "flex flex-wrap items-center justify-between gap-2",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                className: "type-mono text-xs sm:text-sm font-bold break-all",
                style: {
                  color: 'var(--ink)'
                },
                children: _portfolioContent.SITE_CONFIG.email
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
                  type: "button",
                  onClick: copyEmail,
                  className: "ink-btn",
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                    children: copied ? '✓ Copied' : 'Copy Email'
                  })
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
                  href: `mailto:${_portfolioContent.SITE_CONFIG.email}`,
                  className: "ink-btn ink-btn-solid",
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Mail, {
                    size: 13
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                    children: "Send Email"
                  })]
                })]
              })]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "p-4 rounded-xl border",
            style: {
              background: 'var(--card-bg-2)',
              borderColor: 'var(--card-border)'
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "type-label text-[9px] block mb-1",
              style: {
                color: 'var(--gold)'
              },
              children: "PHONE NUMBER"
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: "flex flex-wrap items-center justify-between gap-2",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                className: "type-mono text-xs sm:text-sm font-bold",
                style: {
                  color: 'var(--ink)'
                },
                children: _portfolioContent.SITE_CONFIG.phone
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
                  type: "button",
                  onClick: copyPhone,
                  className: "ink-btn",
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                    children: copiedPhone ? '✓ Copied' : 'Copy Phone'
                  })
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
                  href: "tel:+917007803506",
                  className: "ink-btn",
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                    children: "Call"
                  })
                })]
              })]
            })]
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "lg:col-span-5 flex flex-col gap-3",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
            href: _portfolioContent.SITE_CONFIG.github,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "project-card p-4 flex items-center justify-between no-underline",
            style: {
              background: 'var(--card-bg-2)',
              textDecoration: 'none'
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: "flex items-center gap-3",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Icons.GithubIcon, {
                size: 18
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                  className: "type-headline text-sm block",
                  style: {
                    color: 'var(--ink)'
                  },
                  children: "GitHub Profile"
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                  className: "type-mono text-[11px]",
                  style: {
                    color: 'var(--warm-gray)'
                  },
                  children: "github.com/Abhijeet-Singh-01"
                })]
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ExternalLink, {
              size: 14,
              style: {
                color: 'var(--gold)'
              }
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
            href: _portfolioContent.SITE_CONFIG.linkedin,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "project-card p-4 flex items-center justify-between no-underline",
            style: {
              background: 'var(--card-bg-2)',
              textDecoration: 'none'
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                className: "type-headline text-sm block",
                style: {
                  color: 'var(--ink)'
                },
                children: "LinkedIn Profile"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                className: "type-mono text-[11px]",
                style: {
                  color: 'var(--warm-gray)'
                },
                children: "in/abhijeet-singh-988276330"
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ExternalLink, {
              size: 14,
              style: {
                color: 'var(--gold)'
              }
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
            href: _portfolioContent.SITE_CONFIG.leetcode,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "project-card p-4 flex items-center justify-between no-underline",
            style: {
              background: 'var(--card-bg-2)',
              textDecoration: 'none'
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                className: "type-headline text-sm block",
                style: {
                  color: 'var(--ink)'
                },
                children: "LeetCode (250+ DSA Problems)"
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                className: "type-mono text-[11px]",
                style: {
                  color: 'var(--warm-gray)'
                },
                children: "Arrays, Strings, Linked Lists, Stacks, Queues, Trees"
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ExternalLink, {
              size: 14,
              style: {
                color: 'var(--gold)'
              }
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
            href: _portfolioContent.SITE_CONFIG.resumeUrl,
            download: "Abhijeet-Singh-Resume.pdf",
            className: "ink-btn ink-btn-solid justify-center py-3",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Download, {
              size: 14
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              children: "Download Official R\xE9sum\xE9 (PDF)"
            })]
          })]
        })]
      })]
    })
  });
}
  },
  "./components/WorldCanvas": function(module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldCanvas = WorldCanvas;
var _react = require("react");
var _InkTrail = require("./InkTrail");
var _GenesisChapter = require("./chapters/GenesisChapter");
var _ArchitectChapter = require("./chapters/ArchitectChapter");
var _ArenaChapter = require("./chapters/ArenaChapter");
var _ForgeChapter = require("./chapters/ForgeChapter");
var _ContactChapter = require("./chapters/ContactChapter");
var _portfolioContent = require("../data/portfolioContent");
var _jsxRuntime = require("react/jsx-runtime");
function WorldCanvas({
  scrollProgress,
  reactiveProgress,
  reducedMotion,
  onJumpToChapter
}) {
  const worldRef = (0, _react.useRef)(null);
  const chapterHeightsRef = (0, _react.useRef)([600, 680, 680, 560, 620]);
  const rafRef = (0, _react.useRef)(0);
  const activeChapter = _portfolioContent.CHAPTER_ANCHORS.reduce((acc, ch, i) => {
    return reactiveProgress >= ch.dwellStart - 0.04 ? i : acc;
  }, 0);
  (0, _react.useEffect)(() => {
    const measureChapters = () => {
      if (!worldRef.current) return;
      const panels = worldRef.current.querySelectorAll('.chapter-panel');
      const heights = Array.from(panels).map(el => el.offsetHeight || 600);
      while (heights.length < 5) heights.push(600);
      chapterHeightsRef.current = heights;
    };
    measureChapters();
    window.addEventListener('resize', measureChapters, {
      passive: true
    });
    let ro = null;
    if (typeof ResizeObserver !== 'undefined' && worldRef.current) {
      ro = new ResizeObserver(measureChapters);
      worldRef.current.querySelectorAll('.chapter-panel').forEach(el => ro?.observe(el));
    }
    const t1 = window.setTimeout(measureChapters, 150);
    return () => {
      window.removeEventListener('resize', measureChapters);
      if (ro) ro.disconnect();
      window.clearTimeout(t1);
    };
  }, []);
  (0, _react.useEffect)(() => {
    if (reducedMotion) return;
    const smoothstep = t => {
      const x = Math.max(0, Math.min(1, t));
      return x * x * (3 - 2 * x);
    };
    let currentTx = null;
    let currentTy = null;
    const updateCamera = () => {
      const p = Math.max(0, Math.min(1, scrollProgress.current));
      const viewW = window.innerWidth;
      const viewH = window.innerHeight;
      const headerH = 60;
      const footerH = 48;
      const availH = Math.max(260, viewH - headerH - footerH);
      const heights = chapterHeightsRef.current;
      const anchors = _portfolioContent.CHAPTER_ANCHORS;

      // Update header progress bar directly on GPU without React re-render
      const bar = document.getElementById('header-scroll-bar');
      if (bar) {
        bar.style.transform = `scaleX(${Math.max(0.02, p).toFixed(4)})`;
      }
      const getChapterBounds = idx => {
        const ch = anchors[idx];
        const wx = ch.coord.x * 0.1 * viewW / 100;
        const wyBase = ch.coord.y * 0.1 * viewH / 100;
        const panelH = heights[idx] ?? 600;
        const overflow = Math.max(0, panelH - (availH - 16));
        // If panel is shorter than available viewport height, center it vertically!
        const centerPad = panelH < availH - 16 ? Math.round((availH - panelH) * 0.42) : 10;
        const topOffset = headerH + centerPad;
        return {
          wx,
          wyStart: wyBase - topOffset,
          wyEnd: wyBase - topOffset + overflow
        };
      };
      const first = getChapterBounds(0);
      let targetWorldX = first.wx;
      let targetWorldY = first.wyStart;
      for (let i = 0; i < anchors.length; i++) {
        const cur = anchors[i];
        const bCur = getChapterBounds(i);
        if (p >= cur.dwellStart && p <= cur.dwellEnd) {
          const dt = smoothstep((p - cur.dwellStart) / Math.max(0.001, cur.dwellEnd - cur.dwellStart));
          targetWorldX = bCur.wx;
          targetWorldY = bCur.wyStart + (bCur.wyEnd - bCur.wyStart) * dt;
          break;
        }
        if (i < anchors.length - 1) {
          const next = anchors[i + 1];
          if (p > cur.dwellEnd && p < next.dwellStart) {
            const bNext = getChapterBounds(i + 1);
            const u = (p - cur.dwellEnd) / Math.max(0.001, next.dwellStart - cur.dwellEnd);
            const s = smoothstep(u);
            targetWorldX = bCur.wx + (bNext.wx - bCur.wx) * s;
            targetWorldY = bCur.wyEnd + (bNext.wyStart - bCur.wyEnd) * s;
            break;
          }
        }
      }
      const targetTx = viewW * 0.5 - targetWorldX;
      const targetTy = -targetWorldY;
      if (currentTx === null || currentTy === null) {
        currentTx = targetTx;
        currentTy = targetTy;
      } else {
        // Silky-smooth frame-rate-independent damping so diagonal zig-zag pans never jitter
        currentTx += (targetTx - currentTx) * 0.42;
        currentTy += (targetTy - currentTy) * 0.42;
        if (Math.abs(targetTx - currentTx) < 0.05) currentTx = targetTx;
        if (Math.abs(targetTy - currentTy) < 0.05) currentTy = targetTy;
      }
      if (worldRef.current) {
        worldRef.current.style.transform = `translate3d(${currentTx.toFixed(2)}px, ${currentTy.toFixed(2)}px, 0px)`;
      }
      rafRef.current = requestAnimationFrame(updateCamera);
    };
    rafRef.current = requestAnimationFrame(updateCamera);
    return () => cancelAnimationFrame(rafRef.current);
  }, [scrollProgress, reducedMotion]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: worldRef,
    className: "world-canvas",
    style: reducedMotion ? {
      transform: 'none'
    } : undefined,
    "aria-label": "Portfolio world canvas",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InkTrail.InkTrail, {
      progress: scrollProgress,
      reducedMotion: reducedMotion
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenesisChapter.GenesisChapter, {
      isActive: activeChapter === 0,
      reducedMotion: reducedMotion,
      onJumpToChapter: onJumpToChapter
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ArchitectChapter.ArchitectChapter, {
      isActive: activeChapter === 1,
      reducedMotion: reducedMotion,
      onJumpToChapter: onJumpToChapter
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ArenaChapter.ArenaChapter, {
      isActive: activeChapter === 2,
      reducedMotion: reducedMotion,
      onJumpToChapter: onJumpToChapter
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ForgeChapter.ForgeChapter, {
      isActive: activeChapter === 3,
      reducedMotion: reducedMotion,
      onJumpToChapter: onJumpToChapter
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ContactChapter.ContactChapter, {
      isActive: activeChapter === 4,
      reducedMotion: reducedMotion,
      onJumpToChapter: onJumpToChapter
    })]
  });
}
  },
  "./components/NavigationHUD": function(module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationHUD = NavigationHUD;
var _portfolioContent = require("../data/portfolioContent");
var _lucideReact = require("lucide-react");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
function NavigationHUD({
  scrollProgress,
  activeChapter,
  reducedMotion,
  onToggleReducedMotion,
  onJumpToChapter
}) {
  const [menuOpen, setMenuOpen] = (0, _react.useState)(false);
  // Default to Dark Mode ('obsidian') as requested, with 1-click toggle to Cream Mode ('ivory')
  const [theme, setTheme] = (0, _react.useState)('obsidian');
  (0, _react.useEffect)(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const toggleTheme = () => {
    setTheme(prev => prev === 'obsidian' ? 'ivory' : 'obsidian');
  };
  const currentCh = _portfolioContent.CHAPTER_ANCHORS[activeChapter] ?? _portfolioContent.CHAPTER_ANCHORS[0];
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("header", {
      className: "site-header",
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '60px',
        zIndex: 9500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(14px, 3vw, 36px)',
        background: 'var(--header-bg)',
        borderBottom: '1px solid var(--rule-color)',
        boxSizing: 'border-box',
        pointerEvents: 'auto'
      },
      role: "banner",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
        type: "button",
        onClick: () => onJumpToChapter(0),
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 0',
          whiteSpace: 'nowrap'
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: {
            width: '8px',
            height: '8px',
            borderRadius: '999px',
            background: 'var(--gold)',
            display: 'inline-block',
            flexShrink: 0,
            boxShadow: '0 0 10px var(--gold)'
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "type-headline",
          style: {
            color: 'var(--ink)',
            fontSize: '0.98rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap'
          },
          children: "Abhijeet Singh"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("nav", {
        className: "site-header-nav",
        "aria-label": "Portfolio sections",
        children: _portfolioContent.CHAPTER_ANCHORS.map((ch, i) => {
          const isActive = activeChapter === i;
          return /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
            type: "button",
            onClick: () => onJumpToChapter(i),
            className: `site-nav-link ${isActive ? 'site-nav-link--active' : ''}`,
            "aria-current": isActive ? 'page' : undefined,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "site-nav-num",
              children: ch.num
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              children: ch.label
            })]
          }, ch.id);
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          type: "button",
          onClick: toggleTheme,
          className: "ink-btn",
          style: {
            padding: '0.36rem 0.72rem',
            fontSize: '0.62rem',
            whiteSpace: 'nowrap'
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: theme === 'obsidian' ? '◐ Cream Mode' : '◑ Dark Mode'
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          type: "button",
          onClick: onToggleReducedMotion,
          className: "ink-btn site-desktop-only-btn",
          style: {
            padding: '0.36rem 0.72rem',
            fontSize: '0.62rem',
            whiteSpace: 'nowrap'
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: reducedMotion ? '◎ Zig-Zag' : '◉ Linear'
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
          href: _portfolioContent.SITE_CONFIG.resumeUrl,
          download: "Abhijeet-Singh-Resume.pdf",
          className: "ink-btn ink-btn-solid site-desktop-only-btn",
          style: {
            padding: '0.36rem 0.82rem',
            fontSize: '0.62rem',
            whiteSpace: 'nowrap'
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Download, {
            size: 11
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: "R\xE9sum\xE9"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          type: "button",
          className: "site-mobile-menu-btn",
          onClick: () => setMenuOpen(!menuOpen),
          "aria-label": menuOpen ? 'Close navigation menu' : 'Open navigation menu',
          style: {
            background: 'transparent',
            border: '1px solid var(--card-border)',
            borderRadius: '8px',
            padding: '6px',
            cursor: 'pointer',
            color: 'var(--ink)'
          },
          children: menuOpen ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.X, {
            size: 18
          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Menu, {
            size: 18
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '2px',
          background: 'transparent',
          overflow: 'hidden',
          pointerEvents: 'none'
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          id: "header-scroll-bar",
          style: {
            width: '100%',
            height: '100%',
            background: 'var(--gold)',
            transformOrigin: '0 50%',
            transform: `scaleX(${Math.max(0.02, scrollProgress.current || 0)})`,
            willChange: 'transform'
          }
        })
      })]
    }), menuOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "site-mobile-dropdown",
      style: {
        position: 'fixed',
        top: '60px',
        left: 0,
        right: 0,
        zIndex: 9499,
        background: 'var(--paper)',
        borderBottom: '1px solid var(--rule-color)',
        padding: '16px 22px',
        boxShadow: '0 14px 34px rgba(0, 0, 0, 0.28)',
        pointerEvents: 'auto'
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("nav", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        },
        "aria-label": "Mobile navigation",
        children: [_portfolioContent.CHAPTER_ANCHORS.map((ch, i) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
          type: "button",
          onClick: () => {
            onJumpToChapter(i);
            setMenuOpen(false);
          },
          className: "type-label",
          style: {
            textAlign: 'left',
            fontSize: '0.75rem',
            padding: '6px 4px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontWeight: activeChapter === i ? 700 : 500,
            color: activeChapter === i ? 'var(--gold)' : 'var(--ink)'
          },
          children: [ch.num, " \u2014 ", ch.label]
        }, ch.id)), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "rule-h",
          style: {
            margin: '6px 0'
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            type: "button",
            onClick: () => {
              onToggleReducedMotion();
              setMenuOpen(false);
            },
            className: "ink-btn",
            style: {
              flex: 1,
              justifyContent: 'center'
            },
            children: reducedMotion ? '◎ Zig-Zag View' : '◉ Linear View'
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
            href: _portfolioContent.SITE_CONFIG.resumeUrl,
            download: "Abhijeet-Singh-Resume.pdf",
            className: "ink-btn ink-btn-solid",
            style: {
              flex: 1,
              justifyContent: 'center'
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Download, {
              size: 12
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              children: "R\xE9sum\xE9 PDF"
            })]
          })]
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        position: 'fixed',
        bottom: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9400,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        borderRadius: '999px',
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.22)',
        whiteSpace: 'nowrap',
        pointerEvents: 'auto'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        type: "button",
        onClick: () => onJumpToChapter(Math.max(0, activeChapter - 1)),
        disabled: activeChapter === 0,
        style: {
          padding: '4px',
          borderRadius: '999px',
          cursor: activeChapter === 0 ? 'default' : 'pointer',
          background: 'transparent',
          border: 'none',
          color: 'var(--ink)',
          opacity: activeChapter === 0 ? 0.3 : 1,
          display: 'inline-flex',
          alignItems: 'center'
        },
        "aria-label": "Previous section",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ChevronLeft, {
          size: 14
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: "type-mono",
        style: {
          fontSize: '10.5px',
          padding: '0 6px',
          color: 'var(--ink)',
          whiteSpace: 'nowrap'
        },
        children: [currentCh.num, " / 05 \u2014 ", currentCh.label]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        type: "button",
        onClick: () => onJumpToChapter(Math.min(_portfolioContent.CHAPTER_ANCHORS.length - 1, activeChapter + 1)),
        disabled: activeChapter === _portfolioContent.CHAPTER_ANCHORS.length - 1,
        style: {
          padding: '4px',
          borderRadius: '999px',
          cursor: activeChapter === _portfolioContent.CHAPTER_ANCHORS.length - 1 ? 'default' : 'pointer',
          background: 'transparent',
          border: 'none',
          color: 'var(--ink)',
          opacity: activeChapter === _portfolioContent.CHAPTER_ANCHORS.length - 1 ? 0.3 : 1,
          display: 'inline-flex',
          alignItems: 'center'
        },
        "aria-label": "Next section",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ChevronRight, {
          size: 14
        })
      })]
    })]
  });
}
  },
  "./components/MobileLayout": function(module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MobileLayout = MobileLayout;
var _portfolioContent = require("../data/portfolioContent");
var _lucideReact = require("lucide-react");
var _Icons = require("./ui/Icons");
var _jsxRuntime = require("react/jsx-runtime");
function MobileLayout() {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: "min-h-screen",
    style: {
      background: 'var(--paper)',
      paddingBottom: '5rem'
    },
    "aria-label": "Abhijeet Singh Portfolio",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      id: "chapter-home",
      className: "px-5 pt-14 pb-12 max-w-3xl mx-auto text-center",
      style: {
        borderBottom: '1px solid var(--rule-color)'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] mb-5",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: _portfolioContent.SITE_CONFIG.portraitUrl,
          alt: "Abhijeet Singh",
          className: "w-6 h-6 rounded-full object-cover"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          className: "type-label text-[9.5px]",
          style: {
            color: 'var(--ink)'
          },
          children: ["B.Tech CS @ PSIT (", _portfolioContent.EDUCATION.period, ")"]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        className: "font-display-condensed uppercase",
        style: {
          fontSize: 'clamp(3.6rem, 16vw, 6.5rem)',
          lineHeight: 0.88,
          color: 'var(--ink)'
        },
        children: _portfolioContent.SITE_CONFIG.firstName
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "font-display-condensed uppercase tracking-widest mt-1 mb-4",
        style: {
          fontSize: '1.35rem',
          color: 'var(--gold)'
        },
        children: [_portfolioContent.SITE_CONFIG.lastName, " \u2014 ", _portfolioContent.SITE_CONFIG.shortRole]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        className: "type-body text-sm mb-6 max-w-xl mx-auto",
        children: _portfolioContent.SITE_CONFIG.intro
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "flex flex-wrap justify-center gap-2",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
          href: `mailto:${_portfolioContent.SITE_CONFIG.email}`,
          className: "ink-btn ink-btn-solid",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Mail, {
            size: 12
          }), " Contact"]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
          href: _portfolioContent.SITE_CONFIG.github,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "ink-btn",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Icons.GithubIcon, {
            size: 12
          }), " GitHub"]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
          href: _portfolioContent.SITE_CONFIG.linkedin,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "ink-btn",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ExternalLink, {
            size: 12
          }), " LinkedIn"]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
          href: _portfolioContent.SITE_CONFIG.resumeUrl,
          download: "Abhijeet-Singh-Resume.pdf",
          className: "ink-btn",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Download, {
            size: 12
          }), " R\xE9sum\xE9"]
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      id: "chapter-projects",
      className: "px-5 py-12 max-w-3xl mx-auto",
      style: {
        borderBottom: '1px solid var(--rule-color)'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "type-label block mb-1",
        style: {
          color: 'var(--gold)'
        },
        children: "02 \u2014 SELECTED WORK"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
        className: "type-headline text-2xl mb-5",
        children: "Featured Projects"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "flex flex-col gap-5",
        children: _portfolioContent.PROJECTS.map(project => /*#__PURE__*/(0, _jsxRuntime.jsxs)("article", {
          className: "project-card p-5",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "flex items-center justify-between mb-1",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
              className: "type-mono text-xs font-bold",
              style: {
                color: 'var(--gold)'
              },
              children: ["PROJECT ", project.num]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "type-label text-[9px]",
              children: project.category
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
            className: "type-headline text-xl mb-1",
            children: project.title
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            className: "type-label text-[9.5px] mb-2.5",
            style: {
              color: 'var(--gold)'
            },
            children: project.subtitle
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            className: "type-body text-xs mb-3",
            children: project.description
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "flex flex-wrap gap-1.5 mb-4",
            children: project.techStack.map(t => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "tech-pill",
              children: t
            }, t))
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
            href: project.repoUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "ink-btn ink-btn-solid",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Icons.GithubIcon, {
              size: 12
            }), " Source Code on GitHub"]
          })]
        }, project.id))
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      id: "chapter-achievements",
      className: "px-5 py-12 max-w-3xl mx-auto",
      style: {
        borderBottom: '1px solid var(--rule-color)'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "type-label block mb-1",
        style: {
          color: 'var(--gold)'
        },
        children: "03 \u2014 CERTIFICATIONS & MILESTONES"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
        className: "type-headline text-2xl mb-5",
        children: "Achievements & Education"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "flex flex-col gap-4 mb-6",
        children: _portfolioContent.ACHIEVEMENTS.map(item => /*#__PURE__*/(0, _jsxRuntime.jsxs)("article", {
          className: "project-card p-4",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "flex items-center justify-between mb-1",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "type-label text-[9px]",
              style: {
                color: 'var(--gold)'
              },
              children: item.subtitle
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "type-mono text-xs font-bold",
              style: {
                color: 'var(--gold)'
              },
              children: item.metric
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
            className: "type-headline text-lg mb-1",
            children: item.title
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            className: "type-body text-xs mb-2.5",
            children: item.description
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "flex flex-wrap gap-1",
            children: item.tags.map(t => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "tech-pill",
              children: t
            }, t))
          })]
        }, item.id))
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "project-card p-5",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "type-label text-[9.5px] block mb-1",
          style: {
            color: 'var(--gold)'
          },
          children: "EDUCATION"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
          className: "type-headline text-lg",
          children: _portfolioContent.EDUCATION.institution
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "type-body text-xs",
          children: _portfolioContent.EDUCATION.degree
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
          className: "type-mono text-xs font-bold mt-1 mb-3",
          style: {
            color: 'var(--gold)'
          },
          children: ["CGPA: ", _portfolioContent.EDUCATION.cgpa, " (", _portfolioContent.EDUCATION.period, ")"]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "pt-3 border-t border-[var(--rule-color)] space-y-2",
          children: _portfolioContent.EDUCATION.schooling.map(s => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "text-xs",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "font-semibold",
              style: {
                color: 'var(--ink)'
              },
              children: s.school
            }), " \u2014 ", s.degree, " (", s.period, ") \xB7 ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              style: {
                color: 'var(--gold)'
              },
              children: s.score
            })]
          }, s.degree))
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      id: "chapter-skills",
      className: "px-5 py-12 max-w-3xl mx-auto",
      style: {
        borderBottom: '1px solid var(--rule-color)'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "type-label block mb-1",
        style: {
          color: 'var(--gold)'
        },
        children: "04 \u2014 TOOLKIT"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
        className: "type-headline text-2xl mb-5",
        children: "Technical Skills"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "flex flex-col gap-4",
        children: _portfolioContent.SKILLS.map(group => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "project-card p-4",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
            className: "type-headline text-base mb-2.5",
            children: group.category
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "flex flex-wrap gap-1.5",
            children: group.items.map(item => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "tech-pill",
              children: item
            }, item))
          })]
        }, group.category))
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      id: "chapter-contact",
      className: "px-5 py-12 max-w-3xl mx-auto",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "type-label block mb-1",
        style: {
          color: 'var(--gold)'
        },
        children: "05 \u2014 GET IN TOUCH"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
        className: "type-headline text-2xl mb-4",
        children: "Contact Details"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "project-card p-5",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "type-body text-xs mb-4",
          children: _portfolioContent.SITE_CONFIG.careerObjective
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "type-mono text-sm font-bold mb-1",
          style: {
            color: 'var(--ink)'
          },
          children: _portfolioContent.SITE_CONFIG.email
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "type-mono text-xs font-semibold mb-4",
          style: {
            color: 'var(--gold)'
          },
          children: _portfolioContent.SITE_CONFIG.phone
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "flex flex-wrap gap-2",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
            href: `mailto:${_portfolioContent.SITE_CONFIG.email}`,
            className: "ink-btn ink-btn-solid",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Mail, {
              size: 12
            }), " Send Email"]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
            href: "tel:+917007803506",
            className: "ink-btn",
            children: ["Call ", _portfolioContent.SITE_CONFIG.phone]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
            href: _portfolioContent.SITE_CONFIG.github,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "ink-btn",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Icons.GithubIcon, {
              size: 12
            }), " GitHub"]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
            href: _portfolioContent.SITE_CONFIG.linkedin,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "ink-btn",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ExternalLink, {
              size: 12
            }), " LinkedIn"]
          })]
        })]
      })]
    })]
  });
}
  },
  "./components/PortfolioExperience": function(module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PortfolioExperience = PortfolioExperience;
var _react = require("react");
var _gsap = _interopRequireDefault(require("gsap"));
var _lenis = _interopRequireDefault(require("lenis"));
var _WorldCanvas = require("./WorldCanvas");
var _NavigationHUD = require("./NavigationHUD");
var _MobileLayout = require("./MobileLayout");
var _IntroPreloader = require("./IntroPreloader");
var _portfolioContent = require("../data/portfolioContent");
var _useReducedMotion = require("../hooks/useReducedMotion");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function PortfolioExperience() {
  const [reducedMotion, toggleReducedMotion] = (0, _useReducedMotion.useReducedMotion)();
  const [introDone, setIntroDone] = (0, _react.useState)(false);
  const [isCompactScreen, setIsCompactScreen] = (0, _react.useState)(() => typeof window !== 'undefined' ? window.innerWidth < 860 : false);
  const scrollProgress = (0, _react.useRef)(0);
  const activeChapterRef = (0, _react.useRef)(0);
  const [activeChapter, setActiveChapter] = (0, _react.useState)(0);
  const lenisRef = (0, _react.useRef)(null);
  const proxyRef = (0, _react.useRef)(null);
  const useCanvas = !isCompactScreen && !reducedMotion;
  const handleIntroComplete = (0, _react.useCallback)(() => {
    setIntroDone(true);
  }, []);
  const detectChapter = (0, _react.useCallback)(progress => {
    const chapter = _portfolioContent.CHAPTER_ANCHORS.reduce((acc, ch, i) => {
      return progress >= ch.dwellStart - 0.04 ? i : acc;
    }, 0);
    if (chapter !== activeChapterRef.current) {
      activeChapterRef.current = chapter;
      setActiveChapter(chapter);
    }
  }, []);
  const jumpToChapter = (0, _react.useCallback)(index => {
    const target = _portfolioContent.CHAPTER_ANCHORS[index];
    if (!target) return;
    activeChapterRef.current = index;
    setActiveChapter(index);
    if (!useCanvas) {
      const el = document.getElementById(`chapter-${target.id}`);
      el?.scrollIntoView({
        behavior: 'smooth'
      });
      return;
    }
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const targetScroll = target.dwellStart * maxScroll;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScroll, {
        duration: 1.05,
        easing: t => 1 - Math.pow(1 - t, 4)
      });
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  }, [useCanvas]);

  // Initial URL / data-initial-waypoint jump
  (0, _react.useEffect)(() => {
    if (typeof window === 'undefined') return;
    const initWp = document.documentElement.dataset.initialWaypoint || window.location.hash.slice(1);
    if (!initWp) return;
    const map = {
      home: 0,
      genesis: 0,
      hero: 0,
      work: 1,
      projects: 1,
      architect: 1,
      setu: 1,
      'ai-incident-intelligence': 1,
      solisiq: 1,
      achievements: 2,
      arena: 2,
      about: 2,
      skills: 3,
      forge: 3,
      contact: 4
    };
    const idx = map[initWp.toLowerCase()];
    if (typeof idx === 'number' && idx > 0) {
      const target = _portfolioContent.CHAPTER_ANCHORS[idx];
      if (target) {
        scrollProgress.current = target.dwellStart;
        activeChapterRef.current = idx;
        setActiveChapter(idx);
        window.setTimeout(() => {
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          window.scrollTo(0, Math.round(target.dwellStart * maxScroll));
        }, 30);
      }
    }
  }, []);
  (0, _react.useEffect)(() => {
    if (!useCanvas) {
      const onLinearScroll = () => {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const p = Math.max(0, Math.min(1, window.scrollY / maxScroll));
        scrollProgress.current = p;
        const bar = document.getElementById('header-scroll-bar');
        if (bar) bar.style.transform = `scaleX(${Math.max(0.02, p).toFixed(4)})`;
        detectChapter(p);
      };
      window.addEventListener('scroll', onLinearScroll, {
        passive: true
      });
      return () => window.removeEventListener('scroll', onLinearScroll);
    }
    const lenis = new _lenis.default({
      duration: 0.85,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8
    });
    lenisRef.current = lenis;
    const ticker = _gsap.default.ticker.add(time => {
      lenis.raf(time * 1000);
    });
    _gsap.default.ticker.lagSmoothing(0);

    // Single unified scroll driver from Lenis (no competing native scroll listener!)
    lenis.on('scroll', ({
      progress
    }) => {
      scrollProgress.current = progress;
      detectChapter(progress);
    });
    return () => {
      _gsap.default.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [useCanvas, detectChapter]);
  (0, _react.useEffect)(() => {
    const handleResize = () => {
      setIsCompactScreen(window.innerWidth < 860);
    };
    window.addEventListener('resize', handleResize, {
      passive: true
    });
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  (0, _react.useEffect)(() => {
    const handleKey = e => {
      if (['ArrowDown', 'PageDown', ']'].includes(e.key)) {
        e.preventDefault();
        jumpToChapter(Math.min(_portfolioContent.CHAPTER_ANCHORS.length - 1, activeChapterRef.current + 1));
      } else if (['ArrowUp', 'PageUp', '['].includes(e.key)) {
        e.preventDefault();
        jumpToChapter(Math.max(0, activeChapterRef.current - 1));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [jumpToChapter]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [!introDone && /*#__PURE__*/(0, _jsxRuntime.jsx)(_IntroPreloader.IntroPreloader, {
      onComplete: handleIntroComplete
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_NavigationHUD.NavigationHUD, {
      scrollProgress: scrollProgress,
      activeChapter: activeChapter,
      reducedMotion: reducedMotion,
      onToggleReducedMotion: toggleReducedMotion,
      onJumpToChapter: jumpToChapter
    }), !useCanvas ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        paddingTop: '60px'
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MobileLayout.MobileLayout, {})
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        position: 'relative'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ink-viewport",
        "aria-label": "Portfolio viewport",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_WorldCanvas.WorldCanvas, {
          scrollProgress: scrollProgress,
          reactiveProgress: scrollProgress.current,
          reducedMotion: reducedMotion,
          onJumpToChapter: jumpToChapter
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        ref: proxyRef,
        "aria-hidden": "true",
        style: {
          position: 'relative',
          height: '960vh',
          width: '1px',
          pointerEvents: 'none',
          zIndex: -1
        }
      })]
    })]
  });
}
  },
  "./main": function(module, exports, require) {
"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = _interopRequireDefault(require("react-dom/client"));
var _PortfolioExperience = require("./components/PortfolioExperience");
require("./index.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_client.default.createRoot(document.getElementById('root')).render( /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.default.StrictMode, {
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PortfolioExperience.PortfolioExperience, {})
}));
  },
};
const __cache = {};
function __require(id, fromId) {
  if (id === 'react') return Object.assign({ __esModule: true, default: __ReactDefault }, __React);
  if (id === 'react/jsx-runtime') return __jsxRuntime;
  if (id === 'react-dom/client') return Object.assign({ __esModule: true, default: __ReactDOMClient }, __ReactDOMClient);
  if (id === 'gsap') return { __esModule: true, default: __gsap, ...__gsap };
  if (id === 'lenis') return { __esModule: true, default: __Lenis };
  if (id === 'lucide-react') return __lucide;
  if (id.endsWith('.css')) return {};

  let resolved = id;
  if (id.startsWith('.')) {
    const baseParts = fromId.split('/').slice(0, -1);
    for (const part of id.split('/')) {
      if (part === '.') continue;
      if (part === '..') baseParts.pop();
      else baseParts.push(part);
    }
    resolved = baseParts.join('/');
  }
  if (__cache[resolved]) return __cache[resolved].exports;
  const fn = __modules[resolved];
  if (!fn) throw new Error('Module not found: ' + resolved + ' from ' + fromId);
  const mod = { exports: {} };
  __cache[resolved] = mod;
  fn(mod, mod.exports, (childId) => __require(childId, resolved));
  return mod.exports;
}

__require('./main', './root');
