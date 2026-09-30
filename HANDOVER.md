# Portfolio Project Handover

## Project Goal

Develop this existing portfolio into an original, cinematic and futuristic 3D portfolio. Keep it fast, readable, accessible and recruiter-friendly. The visual concept is **The Ascent**: a journey from Base Camp (Hero), along the Trail (About), to the Ridge (Skills), Peak Challenges (Projects), and the Summit (Contact).

Take inspiration from the expedition and digital-landscape mood only. Do not copy another site's code, layout, text or assets.

## Content Rules

- Treat the current portfolio and repository data as the single source of truth.
- Do not invent projects, stats, certifications, achievements, metrics, experience, features, live demos or links.
- Decorative interface labels are allowed when they do not imply personal facts.
- Preserve existing content and functionality unless a phase explicitly changes its presentation.

## Verified Portfolio Content

- `public/resume.pdf` is the current resume and source of truth for profile content.
- Use the shared links in `src/data/socialLinks.ts`: `abhijeetsingh01122006@gmail.com`, GitHub `Abhijeet-Singh-01`, LinkedIn `abhijeet-singh-988276330`, LeetCode `1_abhi`, and `/resume.pdf`.
- Do not publish a phone number in portfolio content or HTML.
- Featured projects, in order: AI Incident Intelligence, SolisIQ, Instanews, ZeroHour. Only show project links when a real URL is available.
- SolisIQ source: `https://github.com/Abhijeet-Singh-01/SolisIQ`. No ZeroHour repository or demo URL is verified yet.

### Education

- 2024 - 2028: Bachelor of Technology in Computer Science and Engineering, Pranveer Singh Institute of Technology (PSIT); CGPA 7.54/10; affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU).
- 2024: Class XII (CBSE), Rani Laxmi Bai Memorial School; 70.6%.
- 2022: Class X (CBSE), Rani Laxmi Bai Memorial School; 74.6%.

### Certifications and achievements

- AWS Planning a Generative AI Project - Amazon Web Services (AWS).
- AWS Introduction to Generative AI - Art of the Possible - Amazon Web Services (AWS).
- Solved 250+ DSA problems on LeetCode across arrays, strings, linked lists, stacks, queues, trees, and recursion.
- Consistent daily coding practice focused on problem-solving and data structure fundamentals.

### Skills

- Languages: C++, Python, C, SQL.
- Frontend: React.js, HTML, CSS, Tailwind CSS, JavaScript (ES6+).
- Backend: FastAPI, REST APIs, Firebase Cloud Messaging (Learning).
- Databases: MongoDB, MySQL.
- Tools: Git, GitHub, VS Code.
- Core: Data Structures & Algorithms.
- AI: Generative AI.
- Project-specific technologies belong on their project cards, not in the core skills list.

### Career objective

Computer Science undergraduate seeking software development opportunities in backend and full-stack engineering, interested in scalable APIs, database-driven applications, and AI-powered solutions, while strengthening DSA, Generative AI, and modern software development.

## Stack and Dependencies

- Existing stack: React, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide icons.
- Prefer existing dependencies and browser APIs where they meet the requirement.
- Before installing a package, explain what it provides and why it is needed. Keep dependencies purposeful.
- A React Three Fiber scene is appropriate for a real WebGL hero. Lazy-load it, cap rendering cost and provide a static fallback.
- Do not add smooth-scroll or postprocessing libraries unless the implementation needs them and the reason is explained first.

## Design and Interaction

- Keep a dark, readable palette with restrained cyan, electric blue and violet accents.
- Use glass surfaces selectively and maintain clear text contrast.
- Pointer movement should create layered depth with smooth interpolation, not snapping.
- Do not update React state on every pointer movement. Prefer refs, motion values or an animation frame loop.
- Keep a desktop custom cursor fully disabled for touch and reduced-motion users; preserve keyboard focus and text selection.
- Respect `prefers-reduced-motion` throughout the experience.
- Keep mobile layouts purpose-designed, touch-friendly and free of horizontal overflow.
- Use semantic HTML, keyboard support, visible focus and meaningful accessible labels.

## Work Process

1. Work on one requested phase at a time and preserve the current architecture.
2. Explain advanced ideas in beginner-friendly **What / Why / How** terms before implementing them. Avoid giant code dumps.
3. After each phase, run the dev server, test the phase, check browser/runtime output, run the production build, and commit with a clear `feat:`, `fix:` or `perf:` message.
4. Stop after each phase and tell Abhijeet exactly what to inspect before continuing.
5. Never claim a check passed unless it was actually run. If something breaks, explain what broke, why, what changed, and how the fix was verified.
6. Do not begin code changes until the user has approved the phase plan.

## Phase Order

1. Foundation, design tokens, smooth scrolling and progress HUD.
2. 3D hero and cursor-reactive depth.
3. Custom cursor, magnetic buttons and cursor light.
4. Scroll cinematics and navigation.
5. About, terminal and real education/experience timeline.
6. Interactive skills visualization.
7. Project cards and accurate project detail views.
8. AI pipeline, contact and loading experience, followed by final performance, mobile and accessibility QA.
