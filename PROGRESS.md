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
- Phase 15: Experience Elevation, Visual Polish & Zero-Collision Validation (Completed):
  - Fixed Profile Asset Bundling: Replaced raw string path with Vite ES module import (`import profilePhoto from '../../assets/images/profile.webp'`), ensuring the genuine, untouched portrait is correctly resolved and rendered in production builds.
  - Strict Scene Gating & GPU Culling: Implemented strict visibility thresholds (`if (visibility < 0.005) { groupRef.current.visible = false; return; }`) across all 4 project artifacts and transitional geometries, eliminating cross-scene geometry overlap and freeing GPU fill-rate.
  - Zero-Collision Hero Architecture:
    * Desktop: Asymmetric composition with typography occupying the left corridor ($X \le 0$, `max-w-xl`) and the 3D glowing portal ring centered at $X = 1.95$, preventing any text overlap over the portrait.
    * Mobile (360px - 390px): Vertical corridor layout positioning the 3D portal ring in the upper half ($Y = 1.32$, scale 0.68) and pinning the typography and action buttons in the lower half (`mt-auto mb-2 w-full max-w-sm`), eliminating facial obstruction.
  - Bespoke Project Grammars:
    * P01 (AI Incident Intelligence): Crystalline anomaly core, neural nucleus, 8 orbiting telemetry service nodes, and propagation waves.
    * P02 (SolisIQ): Concentrated solar plasma core, outer wireframe corona, 3 precision counter-rotating gimbal rings, and 4 photovoltaic collector wings.
    * P03 (Instanews): 6 floating holographic glass article slabs with neon headline scanlines and a central dispatch routing hub.
    * P04 (ZeroHour): Precision gunmetal chronometer with 24 calibrated dial ticks, interlocking toothed gear train (1.5x ratio), and 8 Hz oscillating escapement balance wheel with ruby bearing.
  - Chrome CDP Visual Verification: Headless Chrome CDP captured full-resolution screenshots across all 8 narrative beats for Desktop (1440x900) and Mobile (390x844). Visually inspected and confirmed zero text overlapping, crystal-clear contrast, and pristine 3D staging.
  - Multi-Viewport Overflow Test: Automated CDP test across Narrow Mobile (360x800), Standard Mobile (390x844), Tablet Portrait (768x1024), and Desktop (1440x900) confirmed 0px horizontal overflow across the entire scroll journey.
  - Zero Console Errors: Chrome CDP monitored runtime logs and exceptions during full scroll journey; confirmed 0 errors and 0 uncaught exceptions.
  - Production Build: `tsc -b && vite build` built in 664ms with 0 type errors.

## Needs owner input
- GitHub repo URLs for AI Incident Intelligence, Instanews, ZeroHour (buttons hidden cleanly until provided; SolisIQ source URL is active).
- Any live demo URLs (buttons hidden cleanly until provided).
- `profile-400.webp` (currently using optimized `profile.webp` 800x800).

## Performance & Quality Metrics
- TypeScript Typecheck: Passed with 0 errors (`npx tsc --noEmit`).
- Production Build: 664ms compilation (`dist/` clean and optimized).
- Render Loop: Single unified GSAP + Lenis + R3F RAF loop (`frameloop="never"`), auto-pauses when tab is hidden via `document.hidden`.
- Adaptive Tiering: High (DPR 1.5, Bloom, 3200 particles), Medium (DPR 1.25, 1600 particles), Low (DPR 1.0, 700 particles, no bloom), Lite Mode (Instant 0-overhead 2D CSS presentation).
- Zero forbidden content: No GharPathshala, no Flask, no phone numbers anywhere in code or markup.
- Responsive Quality: 0px horizontal overflow on 360px, 375px, 768px, 1440px.

## Known issues
- None. Ready for production deployment.


