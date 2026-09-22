# Abhijeet Singh — Personal Engineering Portfolio

A cinematic, editorial developer portfolio engineered with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.

Inspired by dark luxury editorial typography and atmospheric lighting: charcoal dark backdrop, muted gold & teal ambient illumination, fine particle constellation canvas, and structured systems engineering cards.

---

## ✦ Live Preview & Architecture

- **Role**: Computer Science & Engineering Undergraduate | Software Developer | AI/ML Enthusiast
- **Institution**: Pranveer Singh Institute of Technology (PSIT), AKTU (2024 — 2028)
- **Location**: Lucknow, Uttar Pradesh, India

### Visual Identity
- **Palette**: Deep near-black charcoal base (`#08090b`), warm gold accent (`#d4af37`), muted teal accent (`#2dd4bf`), ivory text (`#f4f1ea`), and subtle editorial noise texture.
- **Typography**: Editorial serif headings (`Newsreader`, `Cormorant Garamond`) paired with modern clean sans (`Plus Jakarta Sans`) and technical monospace (`JetBrains Mono`).
- **Atmospheric Background**: Dual-glow radial illumination + lightweight HTML5 canvas particle star-field (automatically optimized for performance and respects `prefers-reduced-motion`).

---

## ✦ Projects Showcased

1. **AI Incident Intelligence** — Autonomous root-cause investigation & telemetry triage engine. Multi-stage RAG semantic retrieval over log streams, dense vector similarity search, and zero-hallucination evidence grounding.
2. **SolisIQ** — Intelligent solar capacity modeling & renewable energy analytics platform. Mathematical yield calculations, time-series Chart.js telemetry, and lifetime carbon offset estimation.
3. **Instanews** — High-throughput full-stack publishing platform with JWT role-based access control (RBAC), Redux Toolkit state slice caching, and virtualized infinite scrolling.
4. **GharPathshala** — Curriculum-grounded AI tutor with adaptive learning diagnostics, NCERT syllabus guardrails, and multilingual vernacular translation.

---

## ✦ Project Structure

```
├── public/
│   ├── favicon.svg          # Minimal gold-bordered AS monogram favicon
│   ├── og-preview.svg       # 1200x630 social preview card for Open Graph / Twitter
│   └── resume.pdf           # Placeholder PDF (replace with your official resume)
├── src/
│   ├── assets/              # Static media & assets
│   ├── components/
│   │   ├── About/           # Bio, engineering pillars, and vertical education timeline
│   │   ├── Background/      # Atmospheric dual glows, grain overlay, and particle canvas
│   │   ├── common/          # Reusable SVGs (GithubIcon, LinkedinIcon)
│   │   ├── Contact/         # 1-click clipboard copy, interactive message form, social links
│   │   ├── Footer/          # Minimal copyright and back-to-top button
│   │   ├── Hero/            # Editorial magazine-style heading, status badge, and CTAs
│   │   ├── Navbar/          # Fixed glassmorphism nav with active section detection & mobile drawer
│   │   ├── Projects/        # Editorial cards, category filter, and architecture previews
│   │   └── Skills/          # Categorized technical tiles with subtle glow hover states
│   ├── data/
│   │   ├── education.ts     # Academic timeline & personal philosophy data
│   │   ├── projects.ts      # Structured projects data, system highlights, and metrics
│   │   ├── skills.ts        # Grouped technical proficiencies across 7 categories
│   │   └── socialLinks.ts   # Contact handles and URLs
│   ├── types/               # Clean TypeScript interfaces
│   ├── App.tsx              # Main application root
│   ├── index.css            # Tailwind CSS v4 variables & custom animations
│   └── main.tsx             # React entrypoint
├── index.html               # Production SEO, Open Graph tags, and Google Fonts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ✦ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

### 5. Run Linter
```bash
npm run lint
```

---

## ✦ Customization Guide

- **Resume**: Replace [public/resume.pdf](file:///E:/portfolio.ABHIJEETSSSS/public/resume.pdf) with your actual resume PDF.
- **Social Links**: Update your URLs and usernames in [src/data/socialLinks.ts](file:///E:/portfolio.ABHIJEETSSSS/src/data/socialLinks.ts).
- **Projects**: Add or modify projects in [src/data/projects.ts](file:///E:/portfolio.ABHIJEETSSSS/src/data/projects.ts).
- **Skills**: Adjust skills in [src/data/skills.ts](file:///E:/portfolio.ABHIJEETSSSS/src/data/skills.ts).

---

## ✦ Deployment

This project is ready to deploy directly on **Vercel**, **Netlify**, or **GitHub Pages**:
- Build command: `npm run build`
- Output directory: `dist`
