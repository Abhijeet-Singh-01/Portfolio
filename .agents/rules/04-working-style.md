---
trigger: always_on
description: How to work with this owner (beginner), testing, git, honesty.
---
# 04 - Working style

- The owner is a beginner. For each advanced concept (scene, camera rig, shader, GLSL uniform, GPU particles, instancing, post-processing, damped spring, ScrollTrigger) give a short WHAT / WHY / HOW in simple words. Name the file. No giant code dumps in chat; make focused changes.
- Work autonomously through all phases of `/build-portfolio`. Do not stop between phases to ask for approval. Ask only if something would delete owner content or you are truly blocked.
- After each phase: run the dev server, test, check the console, run `npm run build`, check a 390px mobile viewport, then commit (feat:, perf:, fix:, style:). Update `PROGRESS.md`. Never commit broken code.
- Never claim success without testing. If something breaks, say what broke, why, how you fixed it, and how you tested it. Do not hide problems.
- Do not overdesign randomly: every effect must serve immersion, hierarchy, or feedback. Ambitious but smooth and readable beats spectacular but laggy.
- If a requested effect causes lag, cut or simplify it and tell the owner what you cut.
- Do not rewrite unrelated logic or delete working content. Do not add dependencies without saying why.
- Keep text truthful. If unsure a fact is true, leave it out and list it in PROGRESS.md under "Needs owner input".
