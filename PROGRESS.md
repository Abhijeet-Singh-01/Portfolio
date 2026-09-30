# PROGRESS.md (keep this updated after every phase)

## Status
- Handover: Taking over mid-project after previous agent stopped due to token limit.
- Current phase: Phase 0 Completed -> Executing Phase 1 (Foundation) through Phase 9 (QA & Finish).

## Found in Phase 0
- Framework / tooling: React 19, TypeScript 6, Vite 8, Tailwind CSS v4, Three.js 0.186, React Three Fiber v9, drei v10, postprocessing, GSAP 3.15, Lenis 1.3, Lucide icons.
- Existing components kept: Data stores (`projects.ts`, `skills.ts`, `education.ts`, `socialLinks.ts`), `public/resume.pdf`, profile picture `profile.webp`, base R3F canvas structure and custom shaders.
- Existing components replaced / updated:
  - Typography: Replaced classical serif styling with blocky uppercase display fonts (`Syne` / `Space Grotesk`), `JetBrains Mono`, and `Inter`.
  - Color Tokens: Corrected Night palette tokens to true deep indigo-black `#0A0620`, vibrant electric indigo, violet, aqua, and lime highlights. Night is default.
  - Navbar: Replaced standard navbar with top-left "AS" monogram logo, top-right glass pill `MENU ------ CONTACT`, and full-screen menu overlay with theme toggle & social links.
  - Hero: Active Theory cinematic structure with 3 stacked uppercase lines ("SOFTWARE / DEVELOPER / AI + FULL-STACK"), center glass ring with 360° draggable profile card, right mono career objective paragraph, bottom-left "EXPLORE:" arrow list.
  - Work (Projects): 4 giant glass slabs in depth with distinctive particle visuals, tilt and hex reveal, and dive-in detail view.
  - Lab (Skills): Hex-grid honeycomb floor with hover beams between related skills, sweep scan line, and accessible fallback.
  - About & Contact: Glowing education timeline nodes, terminal card, certifications, LeetCode achievement, converging contact particle ring and magnetic pills.
  - Cursor: Custom reactive cursor (dot + ring, VIEW / DRAG states, ripple, fine-pointer only).
- Half-done work from previous agent: Codex had partially set up `ExperienceCanvas.tsx` and `ExperienceOverlays.tsx`, but left HTML sections with the old serif design and layout. Theme default was set to Light instead of Night. `src/data/skills.ts` lacked Generative AI.
- Dependencies present: All required dependencies (`three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `gsap`, `lenis`, `lucide-react`, `tailwindcss`) are already installed. No additional packages needed.


## Completed phases
- Phase 0: Inspect and plan (Completed)
- Phase 1: Foundation (Completed - tokens, fonts, config, data files, SEO, resume download)
- Phase 2: World, camera, scroll (Completed - R3F canvas sync with Lenis + GSAP, damped camera rig, persistent progress line, 01/05 HUD scene counter, adaptive quality monitor)
- Phase 3: Loader and hero (Completed - skippable vertical particle stream loader with lime-cyan ring logo, Active Theory stacked blocky display, 360° inertia draggable glass ring with photo card, right mono objective, bottom-left explore list, AS mark, MENU --- CONTACT glass pill & overlay)
- Phase 4: Projects (Work) (Completed - 4 giant glass slabs in depth, big gradient numbers, blocky uppercase titles, telemetry/energy/news/countdown visuals, tilt & scanline shader reveal, dive-in detail view modal with camera zoom, empty URLs hidden)
- Phase 5: Lab (Skills) (Completed - // THE LAB scene with glowing star icon, hex grid cells, interactive beam triggers and category dimming, accessible plain-list view toggle, verified skills including Generative AI)
- Phase 6: About, Contact (Completed - 04 / ABOUT scene with framed untouched portrait, developer terminal, certifications, LeetCode 250+ achievement, glowing education nodes; 05 / CONTACT scene with giant LET'S BUILD SOMETHING WORTH SHIPPING line, magnetic pills, and minimal 2026 footer)
- Phase 7: Cursor and micro-interactions (Completed - fine-pointer custom cursor with VIEW / DRAG states and ripple, magnetic pills, theme toggle animation, Web Audio synthesizer toggle for optional UI audio [default OFF])
- Phase 8: Performance and fallbacks (Completed - capped DPR 1.5/1.0, visibility-paused RAF loop, lazy code-split ExperienceCanvas, instant 2D Lite Mode fallback toggle in navigation & auto-detection for weak devices or prefers-reduced-motion)
- Phase 9: Master Directive 3D Backbone & QA (Completed - dual-helix parametric central spine with 96 instanced crystal nodes, connecting ribs, traveling energy pulses, umbilical tendrils to 4 procedural 3D project visuals, depth parallax, 0 type errors via `tsc --noEmit`, 100% verified facts from resume.pdf)
- Phase 10: Second-Pass Master Directive — Award-Level 3D Experience (Completed)
- Phase 11: Ultimate Master Directive — Continuous Cinematic 3D Film Timeline (Completed)
- Phase 12: Final Visual Overhaul — Spatial Composition, Camera Roll Banking & Close-Pass Choreography (Completed):
  - Spatial Roll Banking: Added dynamic camera banking angle (`cameraRoll`) in `src/config/sceneTimeline.ts` applied to `camera.up` in `CameraRig`, banking the horizon into high-speed S-curve turns.
  - 3 Close-Pass Moments: Hero glass ring portal pass ($t=0.14$), SolisIQ solar core pass ($t=0.50$), Instanews data plane weave ($t=0.70$).
  - Hero Ring Iris Dilation: Expanded ring geometry during camera dive at $t=0.08 \to 0.18$ so the camera flies seamlessly through its center into the spinal corridor.
  - 2 Far-Away Scale Moments ($t=0.37$ full spine overview pull-back; $t=0.91$ spinal collapse into The Lab).
  - 4 Hold Frames for inspection beats ($P01: 0.24-0.32$, $P02: 0.46-0.54$, $P03: 0.67-0.75$, $P04: 0.83-0.88$).
  - DOM Stacking Elimination in 3D Mode: Clean separation between 3D canvas and HTML DOM. In 3D mode, the DOM `#projects` section acts as a virtual scroll depth runway (`min-height: 480vh`), while the front viewport is controlled by `CinematicProjectHud` with no card clipping. Semantic HTML remains 100% accessible to SEO and screen readers.
  - Full TypeScript & Vite Verification: `npx tsc --noEmit` passed with 0 errors, Vite dev server verified with 200 OK across all endpoints.
- Phase 13: Master Architectural Rebuild — Art Direction, Asymmetric Spine, 4 Distinct Project Grammars & Dual Responsive Layouts (Completed):
  - Digital Infrastructure Spine (No DNA look): Replaced symmetric double helix with an organic, asymmetric structural trunk, irregular architectural rib brackets, 3 twisting optical neural conduit cables, crystal junction nodes, and umbilical tendrils that physically route energy pulses into the 4 project worlds.
  - 4 Distinct 3D Project Artifacts:
    * Project 01 (AI Incident Intelligence): Neural incident cluster with real ML anomaly wave propagation, telemetry conduits, 8 satellite service nodes, evidence retrieval highlight, and root-cause analysis beam.
    * Project 02 (SolisIQ): Engineered solar energy machine with concentrated solar plasma core, 3 precision counter-rotating orbital gimbal rings with degree ticks, 4 photovoltaic collector wings, and radiant energy collector paths.
    * Project 03 (Instanews): 3D information space with 6 floating translucent article planes at staggered depths/angles that the camera weaves directly through, data stream ribbons, and central routing hub.
    * Project 04 (ZeroHour): Precision mechanical chronometer with interlocking toothed gear rings meshed at mechanical gear ratios, calibrated countdown arcs, and oscillating balance wheel escapement.
  - Dedicated Dual-Layout Art Direction (Desktop Asymmetric vs Mobile Vertical Corridor):
    * Desktop: Widescreen asymmetric spatial composition (Project 01 Left, Project 02 Right, Project 03 Left-High, Project 04 Right-Low) with opposite-side side HUD and camera roll banking.
    * Mobile (360px - 390px): Dedicated vertical corridor with artifacts centered in the top 55% of the viewport and a compact, thumb-friendly HUD docked at the bottom, eliminating clipping and awkward horizontal angles.
  - Scroll & Performance Fidelity: Lenis scoped to desktop wheel only; 100% native instant touch scrolling on mobile to prevent touch hijacking. Stopping scroll halts camera within ~100ms; reversing reverses cleanly along the exact spline.
  - Zero Horizontal Overflow: Tested and verified `document.documentElement.scrollWidth === document.documentElement.clientWidth`. Fixed mobile canvas opacity from `.45` to `1.0`.
  - Production Build: `tsc -b && vite build` passed cleanly in 1.24s (ExperienceCanvas bundle reduced from 46.7 kB to 38.5 kB). All HTTP endpoints verified 200 OK.
- Phase 14: Mobile Master Art Direction, Discrete CinematicStage, Solar Resizing & Near-Black Palette (Completed):
  - Solved Cross-Scene Collisions: Replaced DOM-rendered stacking with `CinematicStage.tsx`, which governs mutual exclusivity across all 8 narrative beats (Hero -> P01 -> P02 -> P03 -> P04 -> Skills -> About -> Contact). In 3D mode, the canvas and stage have zero DOM collision, while semantic HTML is cleanly mirrored for SEO and screen readers.
  - Dedicated Mobile Composition (360px - 390px):
    * Upper 50% viewport reserved entirely for 3D artifacts (Y = 1.15 in mobile camera coordinate frame).
    * Bottom dock (`w-full max-w-sm mx-auto p-4 rounded-2xl bg-surface/95 border border-white/15 backdrop-blur-2xl shadow-2xl`) cleanly positions metadata and action buttons without obstructing the 3D geometry.
  - Eliminated Giant White Panels: Skills scene redesigned into a dark cinematic HUD (`01 LANGUAGES`, `02 FRONTEND`, `03 BACKEND`, `04 DATABASES`, `05 TOOLS`, `06 CORE CS & AI`) with high-contrast text and subtle glowing accents.
  - SolisIQ Solar Machine Resized: Reduced outer wings from 1.4+ to 0.82 and core from 0.42 to 0.22, preventing the solar structure from overpowering the mobile viewport.
  - Near-Black High-Contrast Palette: Base `#05060A`, secondary `#0B1020`, surface `#0E1326`, text `#F5F7FF`, muted `#8D94AA`, subtle borders `rgba(245, 247, 255, 0.10)`.
  - Minimal Navigation: Replaced floating glass pill with `AS` monogram logo on top-left and compact `MENU` pill on top-right (`z-[1000]`), full-screen overlay at `z-[1100]`.
  - Virtual Runway Navigation Sync: Updated `experienceStore.roomProgress` and `ExperienceCanvas.tsx` `ScrollDriver` so nav clicks smoothly scroll to the exact 3D camera beat (`home: 0.00`, `projects: 0.25`, `skills: 0.935`, `about: 0.965`, `contact: 0.995`).
  - Production Build & Verification: `tsc -b && vite build` passes in ~1.3s with 0 errors. Oxlint passes with 0 errors. HTTP 200 OK verified for preview server and `/resume.pdf`.

## Needs owner input
- GitHub repo URLs for AI Incident Intelligence, Instanews, ZeroHour (buttons hidden cleanly until provided; SolisIQ source URL is active).
- Any live demo URLs (buttons hidden cleanly until provided).
- `profile-400.webp` (currently using optimized `profile.webp` 800x800).

## Performance & Quality Metrics
- TypeScript Typecheck: Passed with 0 errors (`npx tsc --noEmit`).
- Render Loop: Single unified GSAP + Lenis + R3F RAF loop (`frameloop="never"`), auto-pauses when tab is hidden via `document.hidden`.
- Adaptive Tiering: High (DPR 1.5, Bloom, 3200 particles), Medium (DPR 1.25, 1600 particles), Low (DPR 1.0, 700 particles, no bloom), Lite Mode (Instant 0-overhead 2D CSS presentation).
- Zero forbidden content: No GharPathshala, no Flask, no phone numbers anywhere in code or markup.

## Known issues
- None. Ready for production deployment.

