---
description: Build the immersive 3D portfolio end to end, autonomously, in phases.
---
# /build-portfolio

Read AGENTS.md and every file in .agents/rules/ first. Then run these phases IN ORDER without waiting for approval. After each phase: run dev server, test, check console, `npm run build`, check 390px viewport, commit, update PROGRESS.md.

## Phase 0 - Inspect and plan
Inspect the repo (git log, tree, package.json, components, data, styles, cursor code, build). Write findings to PROGRESS.md: what exists, what is kept, what is replaced, packages to install (with reasons), what was left half-done by the previous agent. Present a short plan, then continue.

## Phase 1 - Foundation
Design tokens (Night default + Light) in one tokens file mapped to Tailwind; fonts; quality-tier config file; content data files updated from the facts rule (remove GharPathshala, fix SolisIQ tech, add ZeroHour, real links, education, certifications, achievements); public/resume.pdf download works; SEO tags.

## Phase 2 - World, camera, scroll
One R3F canvas fixed behind the UI; camera rig with damped springs; Lenis + GSAP + R3F on one loop; scroll/drag/keys/menu map to camera progress across 5 scenes; scene counter and progress line; adaptive-quality monitor.

## Phase 3 - Loader and hero
Particle-stream loader resolving into the ring logo, skippable; hero with giant stacked uppercase type, glass ring object with the real photo card (drag 360 with inertia), refraction-style text interaction, right mono paragraph, bottom-left arrow list, "AS" mark, top-right MENU --- CONTACT pill, availability badge, menu overlay.

## Phase 4 - Projects (Work)
Four glass slabs in depth with per-project particle clouds/visuals, velocity motion blur, hover tilt + hex/scanline reveal, click dive-in detail view with shader transition (real info only), Esc to return, hide empty links.

## Phase 5 - Lab (Skills)
Hex-grid floor with skill cells by category, hover beams and dimming, scan line, accessible list fallback, real skills only.

## Phase 6 - About, Contact
About scene (portrait, objective, terminal card, education timeline that lights as the camera moves, certifications, LeetCode achievement); contact scene with converging particles, huge CTA line, magnetic pills, footer.

## Phase 7 - Cursor and micro-interactions
Custom cursor (VIEW / DRAG states, ripple), magnetic buttons, hover glitch on the arrow list, focus rings, theme toggle animation, optional sound toggle (default off).

## Phase 8 - Performance and fallbacks
Profile the PRODUCTION build (FPS idle/scroll/mouse, Lighthouse, bundle size, LCP), apply fixes from rule 03, build the no-WebGL / reduced-motion / weak-device 2D fallback, test with 4x CPU throttle. Report before/after numbers.

## Phase 9 - Responsive, accessibility, SEO, QA
Test all widths listed in rule 03; keyboard-only run-through; contrast check in both themes; click every link (email, GitHub, LinkedIn, LeetCode, resume, project links); grep the repo for leftovers (GharPathshala, Flask, Java, empty hrefs, phone number, old colors); console clean; production build passes.

## Finish
Write the FINAL REPORT from AGENTS.md and update PROGRESS.md.
