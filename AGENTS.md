# AGENTS.md - Abhijeet Singh Portfolio (read this first)

You are working in the repository of Abhijeet Singh's personal portfolio. This file is the entry point. Rules are also in `.agents/rules/` (read ALL of them before writing code) and the build plan is the file `.agents/workflows/build-portfolio.md`. You may be running in the Antigravity CLI (`agy`), where slash workflows may not be available: in that case open and read every rules file, and follow the build-portfolio.md file directly, phase by phase.

## HANDOVER CONTEXT (important)
- The owner previously worked with another coding agent (Codex) and ran out of tokens, so you are taking over MID-PROJECT. You do not know what is already done.
- FIRST inspect the repo: `git log --oneline -20`, `git status`, `package.json`, folder tree, existing components, data files, styles, dependencies. Write what you found to `PROGRESS.md` (create if missing).
- Keep what works: data files with content, working links, the resume, the profile images, build config. The owner is NOT happy with the current look/structure, so the UI/section structure will be replaced as described below. Do not delete content data; reuse it.
- The owner is a beginner. Explain advanced things simply (WHAT / WHY / HOW). No giant code dumps in chat.

## THE OWNER
Abhijeet Singh, B.Tech Computer Science and Engineering student (PSIT, 2024-2028), Lucknow, India. Aspiring software engineer: full-stack, backend, AI/ML. Do NOT present him as a senior engineer.

## THE GOAL
Rebuild the portfolio to feel like a top creative-studio WebGL website (Active Theory style), based on a screen recording the owner showed. It is a full-screen, cinematic, dark 3D world: a particle loader that resolves into a glowing ring logo, a hero with giant blocky uppercase type interacting with a big glass 3D object, a tiny glass "MENU --- CONTACT" pill, a bottom-left arrow list of destinations, then a fly-through of giant glass slabs (projects) surrounded by colorful particle clouds, and a hex-grid "lab" scene (skills). Details are in `.agents/rules/02-design-and-structure.md`.
Take inspiration from the FEEL only. Do not copy any studio's text, logo, or assets. Original identity for Abhijeet.

## NON-NEGOTIABLE RULES
1. Content is truthful. Source of truth: `public/resume.pdf` and `.agents/rules/01-content-and-facts.md`. Never invent projects, stats, certifications, links, deployments, or experience. Hide any button whose URL is empty. Never show the phone number.
2. GharPathshala must NOT appear anywhere (remove all references if they still exist).
3. Smoothness beats spectacle. The owner reported heavy LAG before. Follow `.agents/rules/03-tech-performance.md` strictly: adaptive quality, capped pixel ratio, one render loop, fallbacks.
4. Accessible and responsive: real text stays in HTML (SEO, screen readers), keyboard works, prefers-reduced-motion respected, no horizontal scroll at 360px, tap targets 44px+.
5. Never say "it works" unless you actually ran and tested it (dev server, production build, console, mobile viewport). Report real numbers.
6. Commit after each phase with a meaningful message (feat:, perf:, fix:, style:). Do not commit broken code.
7. Do not rewrite unrelated logic. Do not add dependencies without saying why.

## HOW TO RUN
Present a short plan, then follow `.agents/workflows/build-portfolio.md` (run `/build-portfolio` if it exists, otherwise read the file) and complete ALL phases without stopping to ask for approval between phases. Stop only if something would delete owner content or you are truly blocked. Update `PROGRESS.md` after each phase so any future agent (or you after a context reset) can resume by following `.agents/workflows/resume-work.md`.

## FINAL REPORT (at the end)
Changed, Added, Dependencies (with reasons), how the 3D world works (simply), color system, responsive changes, performance results (real numbers), accessibility, what was actually tested, remaining issues, content still needed from the owner (repo URLs, live demos), exact run and build commands.
