# PROGRESS.md — Abhijeet Singh Portfolio Rebuild

## Current Status: Rebuild Completed & Verified (Production Ready)

### Summary of Accomplishments:
1. **Full Performance & Architecture Rebuild:**
   - Eliminated the heavy, laggy Three.js/R3F/Drei/Postprocessing WebGL engine (1.06 MB of JS removed).
   - Removed the dual-architecture split where semantic `<main>` was hidden with `sr-only` behind a 650vh dummy scroll runway.
   - Restored pure, direct semantic HTML page flow:
     `Navbar -> Hero -> Projects -> Skills -> About (with Education & Certifications) -> Contact -> Footer`.
   - Eliminated 5 continuous animation loops (`requestAnimationFrame` inside `CinematicStage.tsx` that was re-rendering React at 60-120fps, inertia loops, pointermove GSAP tickers).
   - Replaced all animation bottlenecks with single-trigger `IntersectionObserver` scroll reveals and hardware-accelerated CSS transforms.

2. **Strict Resume Truthfulness & Data Integrity:**
   - Order of Projects (01 to 04):
     01 — AI Incident Intelligence (Python, FastAPI, ML, RAG, Embeddings, Vector Search, PostgreSQL)
     02 — SolisIQ (React.js, FastAPI, MongoDB, JavaScript, Chart.js, REST APIs)
     03 — Instanews (React, Redux Toolkit, Node.js, Express, MongoDB, JWT)
     04 — ZeroHour (HTML, CSS, JavaScript)
   - GharPathshala completely absent.
   - SolisIQ verified GitHub link active; empty buttons completely hidden.
   - Real, authentic portrait photo untouched and recognizable.
   - Education: PSIT B.Tech CSE (2024–2028), CGPA 7.54/10; Class XII 70.6%; Class X 74.6%.
   - Certifications: 2 AWS Generative AI certifications.
   - Achievements: 250+ LeetCode DSA solved.
   - Phone numbers strictly omitted.

3. **Design System & Typography:**
   - Dark theme default with deep indigo-black base (`#0B0B1A`), crisp off-white text, primary violet/indigo (`#6366F1`), and secondary teal (`#14B8A6`).
   - Clean, instant light-theme toggle (`#FAF9FF`).
   - Fonts reduced from 4 families (13 weights) down to 2 families: Inter (sans) & JetBrains Mono (code/labels), preloaded and non-blocking.
   - All tap targets $\ge 44\text{px}$ (30 / 30 verified).

4. **Measured Real Results:**

| Metric | Before Rebuild | After Rebuild | Improvement |
|---|---:|---:|:---:|
| **Lighthouse Performance (Mobile)** | **83** (or laggy) | **99 / 100** | **+16 pts** |
| **Lighthouse Accessibility** | 92 | **100 / 100** | **+8 pts** |
| **Lighthouse Best Practices** | 95 | **100 / 100** | **+5 pts** |
| **Lighthouse SEO** | 92 | **100 / 100** | **+8 pts** |
| **First Contentful Paint (FCP)** | 3.4 s | **1.4 s** | **-2.0 s (59% faster)** |
| **Largest Contentful Paint (LCP)** | 3.4 s | **1.6 s** | **-1.8 s (53% faster)** |
| **Total Blocking Time (TBT)** | ~350 ms | **10 ms** | **97% reduction** |
| **Cumulative Layout Shift (CLS)** | 0.04 | **0.000** | **Zero shift** |
| **Total JavaScript Bundle** | 1,464.3 kB | **267.2 kB** | **-82% size reduction** |
| **Gzip JavaScript Transfer** | 412.3 kB | **80.9 kB** | **-80% transfer size** |
| **CSS Bundle Size** | 88.1 kB | **34.0 kB** | **-61% size reduction** |
| **Production Build Time** | 1,060 ms | **556 ms** | **48% faster** |
| **Oxlint Warnings / Errors** | 4 warnings | **0 warnings, 0 errors** | **100% clean** |
| **TypeScript Errors** | 0 | **0 errors** | **100% clean** |

5. **Cross-Device Responsive Verification:**
- 360px (Small Mobile): **PASS** (0px horizontal overflow)
- 375px (iPhone SE): **PASS** (0px horizontal overflow)
- 390px (iPhone 12/13/14): **PASS** (0px horizontal overflow)
- 768px (Tablet Portrait): **PASS** (0px horizontal overflow)
- 1024px (Tablet Landscape): **PASS** (0px horizontal overflow)
- 1366px (Standard Laptop): **PASS** (0px horizontal overflow)
- 1440px (Desktop): **PASS** (0px horizontal overflow)
- 1920px (Full HD Desktop): **PASS** (0px horizontal overflow)
- Landscape Phone (844x390): **PASS** (0px horizontal overflow)

---

## 3D Polish Pass (High-End Tactile Depth, Zero Performance Loss)

1. **Hero 3D Depth & Mouse Parallax:**
   - 3 discrete z-axis layers: Back orbital glow (`translateZ(-20px)`), mid authentic photo container (`translateZ(0px)`), and front floating student badge (`translateZ(24px)`).
   - Mouse-driven micro-rotation capped at $\pm 4^\circ$, smoothly eased back with spring easing on pointer leave.
   - Guarded against touch devices (`pointer: coarse`) and `prefers-reduced-motion`.

2. **Project Card 3D Perspective Tilt:**
   - Desktop hover perspective with restrained mouse tilt ($\pm 3.5^\circ$) and subtle radial glare following pointer position.
   - Smooth reset on leave; completely disabled on mobile/touch screens.

3. **Restrained Ambient 3D Depth Layer:**
   - 3 static CSS radial gradient ambient shapes + geometric grid with radial mask (0 JS overhead, pure GPU compositing).

4. **Scroll Reveal & Micro-Interactions:**
   - Single-trigger IntersectionObserver with perspective tilt settle (`rotateX(1.2deg) -> rotateX(0deg)`).
   - Interactive elevation, border illumination, and active section indicator.

5. **Post-3D Pass Verified Metrics (Lighthouse Mobile):**
   - **Performance:** **99 / 100**
   - **Accessibility:** **100 / 100**
   - **Best Practices:** **100 / 100**
   - **SEO:** **100 / 100**
   - **First Contentful Paint (FCP):** 1.4 s
   - **Largest Contentful Paint (LCP):** 1.6 s
   - **Total Blocking Time (TBT):** 10 ms
   - **Cumulative Layout Shift (CLS):** 0
   - **Speed Index:** 1.4 s
   - **Added Dependencies:** 0 (pure CSS/TS)

---

## Cinematic 3D Direction Rebuild (02-Cinematic Inspired)

1. **Cinematic Hero & 3D Digital Core Centerpiece:**
   - Stacked editorial typography: "HEY, I'M ABHIJEET" with subtle gradient clip.
   - Digital systems/intelligence core framing the authentic portrait photo: dimensional telemetry rings, rotating coordinate tick markers, and 3 distinct z-depth layers.
   - Desktop mouse parallax ($\pm 4^\circ$, `perspective(1000px)`) with instant touch-degradation.

2. **Sequential Project Storytelling ("THE WORK."):**
   - Replaced 2-column cards with full-width alternating visual chapters (Projects 01 to 04).
   - Custom abstract SVG/CSS visual metaphors for each project:
     - *01 AI Incident Intelligence*: Live telemetry anomaly waveform, clustered evidence graph, dense vector retrieval badge.
     - *02 SolisIQ*: Circular solar offset gauge, PV generation breakdown bars, and payback calculator.
     - *03 Instanews*: High-throughput editorial stream cards, RBAC/JWT badge, and cache layer indicator.
     - *04 ZeroHour*: Precision chronometer countdown units (days/hours/mins/secs) with dynamic DOM readout.
   - Desktop 3D hover perspective tilt ($\pm 3.5^\circ$) with radial specular glare.

3. **Cinematic Editorial Typography Across All Sections:**
   - About: "BUILD WITH INTENT."
   - Skills: "TECHNICAL ARSENAL."
   - Closing: "LET'S BUILD SOMETHING WORTH SHIPPING."

4. **Desktop Cinematic Cursor:**
   - Lightweight dot (6px) + smooth lerp ring (28px) with hover expansion on interactive elements.
   - Zero-cost: unmounted on mobile/touch screens and `prefers-reduced-motion`.

5. **Verified Post-Cinematic Rebuild Metrics (Lighthouse Mobile):**
   - **Performance:** **99 / 100**
   - **Accessibility:** **100 / 100**
   - **Best Practices:** **100 / 100**
   - **SEO:** **100 / 100**
   - **FCP:** 1.7 s
   - **LCP:** 1.8 s
   - **TBT:** 30 ms
   - **CLS:** 0.002
   - **Horizontal Overflow (All 9 Viewports):** 0px

---

## Master Cinematic Scroll Choreography & Visual Dominance Rebuild

1. **Dead File Cleanup:**
   - Confirmed 0 imports/usages and removed unused boilerplate `src/App.css` and orphaned `src/components/Projects/ProjectCard.tsx`.

2. **THE WORK Dramatic Typographic Interstitial:**
   - Full-viewport editorial pause (`min-h-[50vh] sm:min-h-[60vh]`) featuring stacked, blocky uppercase display type (`THE` / `WORK.`), category identifier `// 01 · CURATED ARCHITECTURES & SYSTEMS`, and live active stage tracker.

3. **Synchronized Project Scroll Choreography (IntersectionObserver + CSS Sticky):**
   - Implemented multi-threshold `IntersectionObserver` observing project chapter elements.
   - Synchronized active/subordinate states between `ProjectChapter.tsx` and `ProjectVisual.tsx`.
   - Active project visually dominates at `scale(1)` and `opacity: 1`, while inactive chapters are subtly subordinate (`scale(0.97)`, `opacity: 0.38`).
   - Pure CSS/hardware-accelerated transforms; 0 window scroll listeners, 0 RAF scroll loops.
   - 100% flat fallbacks on touch/mobile and `prefers-reduced-motion`.

4. **Optimized Cinematic Cursor (Contextual Modes & Idle RAF Stop):**
   - Cursor animation loop automatically halts when pointer movement settles within 0.15px.
   - Restarts via event-driven `wakeUp()` on `pointermove` or click, eliminating CPU/GPU consumption when stationary.
   - Contextual visual modes: displays "DRAG" badge when hovering over the tactile 3D portrait card, and "VIEW" badge when exploring project chapters and visuals.
   - Added lightweight expanding click ripple effect on pointerdown.

5. **Full-Screen THE WORK Portal & Semantic Hero Footer:**
   - Expanded THE WORK chapter entry into a commanding full-screen transition (`min-h-[80svh] sm:min-h-[90svh]`) with dynamic IntersectionObserver focus.
   - Hero footer migrated to semantic `<footer>` element with verified CGPA metadata (`CS // LUCKNOW · CGPA 7.54`).

6. **Final Production Verification:**
   - Production Build: **538 ms** (Clean, 0 errors)
   - Oxlint: **0 warnings, 0 errors** across 21 files
   - Lighthouse Mobile: **Performance 99**, **Accessibility 100**, **Best Practices 100**, **SEO 100**
   - Multi-Viewport (360px to 1920px + Landscape): **All PASS (0px overflow)**
   - Tap Targets: **All Passed (>= 44px)**
   - Console Errors: **0**

---

## 3D Hero Visual Rebuild (True Physical Spatial Composition)

1. **Rejection of Flat 2D Aesthetics:**
   - Eliminated the flat card presentation and 0deg frontal resting orientation that made the previous iteration look 2D.
   - Built a true 3D spatial stage around a dimensional "Digital Identity Core" with an asymmetric resting perspective (`perspective: 1100px; rotateX(7.5deg) rotateY(-13.5deg) rotateZ(-1deg)`).
   - Visibly 3D **at rest** before any pointer movement.

2. **Central 3D Core Physical Multi-Layer Assembly:**
   - **Layer 0: Deep Cast Shadow Plane (`-95px Z`)**: Directional soft shadow (`box-shadow: 24px 36px 70px -8px rgba(0,0,0,0.85)`), physically detaching the core from the background.
   - **Layer 1: Back Structural Chassis & Standoffs (`-55px Z`)**: Chamfered metallic baseplate with mechanical standoff hex pins and etched chassis serial.
   - **Layer 2: Stepped Depth Casing / Side Extrusion (`-15px Z`)**: Distinct intermediate casing with metallic rim highlights providing physical wall thickness.
   - **Layer 3: Recessed Photo Plane & Physical Portrait Core (`+6px Z`)**: Deeply recessed housing with inner drop shadow (`inset 0 0 24px rgba(0,0,0,0.85)`), framing the untouched authentic photo of Abhijeet Singh.
   - **Layer 4: 3D Optical Glass Lens (`+40px Z`)**: Physical optical lens element with 1.5px bevel edge, specular reflection streak, radial optic highlight, and micro indicator. Sits 34px forward from the photo plane, creating genuine optical depth.
   - **Layer 5: Front Titanium Bezel & Reticle Markers (`+62px Z`)**: 4 front corner calipers clamping the lens with telemetry engravings.

3. **3D Orbital Systems with Real Spatial Occlusion:**
   - **Orbit A (Equatorial Plane)**: Tilted `rotateX(72deg) rotateY(-16deg) rotateZ(10deg)`. Rear arc sits at `-52px Z` (passing behind chassis), front arc sits at `+72px Z` (passing in front of lens) with pulsing satellite node.
   - **Orbit B (Meridian Plane)**: Tilted `rotateY(75deg) rotateX(18deg) rotateZ(-20deg)`. Rear arc sits at `-62px Z`, front arc sits at `+82px Z`.
   - **Orbit C (Celestial Diagonal Ring)**: Tilted `rotateX(40deg) rotateY(46deg) rotateZ(-25deg)` at `+15px Z` with gentle, continuous GPU rotation.

4. **Floating 3D Technical Artifacts (Distinct Z-Depths):**
   - **Object 1: Deep Spatial Plate (`-80px Z`)**: Micro-plate with coordinates `LAT 26.85°N / LONG 80.95°E`.
   - **Object 2: 3D Isometric Mini-Cube (`+95px Z`)**: Authentic 3D CSS cube with 3 visible physical faces catching key, ambient, and rim light in `preserve-3d`.
   - **Object 3: Foreground Spatial Reticle & Sensor Node (`+130px Z`)**: Precision caliper with cyan LED and `DEPTH // Z:+130`.
   - **Object 4: Vertical Z-Datum Line (`+45px Z`)**: Calibrated scale axis `Z:+45`.
   - **Object 5: Optical Sensor Node (`-35px Z`)**: Pulse beacon `CORE // STABLE`.
   - **Object 6: Tethered Top Telemetry Tag (`+75px Z`)**: Floating chip `IDENTITY CORE // 01`.

5. **Editorial 3D Typography:**
   - "ABHIJEET." headline wrapped in spatial perspective with front text layer (`translateZ(24px)`) and atmospheric depth shadow layer (`translateZ(-15px)`).

6. **Interaction & Responsive Architecture:**
   - **Multi-Plane Parallax**: Smooth pointer tracking modulating the resting angle and driving differential layer parallax multipliers (1x background to 8x foreground objects).
   - **Scroll Depth Dolly**: Zero-listener `IntersectionObserver` scaling down the stage, translating Z backward (`-160px`), and dollying into THE WORK.
   - **Mobile 3D Preservation**: Full 3D resting angle and depth planes preserved on mobile with fluid `clamp()` sizing (zero horizontal overflow at 360px).
   - **Accessibility**: Smooth fallbacks for `prefers-reduced-motion` retaining static dimensional hierarchy.

7. **Production Metrics:**
   - Production Build: **580 ms** (Clean, 0 errors)
   - Oxlint: **0 warnings, 0 errors** across 21 files
   - Lighthouse Mobile: **Performance 99**, **Accessibility 100**, **Best Practices 100**, **SEO 100**
   - Viewport Verification: **Passes 360px to 1920px (0px overflow)**

---

## Complete Premium Portfolio Upgrade (Spatial 3D & Recruiter-Friendly Architecture)

### 1. Spatial 3D Hero Centerpiece
- **Dimensional Digital Identity Core**: High-presence 3D composition with distinct resting angle (`rotateX(7.5deg) rotateY(-13.5deg)`), 6 depth planes (`-95px` to `+62px`), and three orbital rings.
- **Multi-Plane Physical Depth**:
  - Deep rear shadow & coordinates plate (`translateZ(-95px)`)
  - Back ambient glow (`translateZ(-55px)`)
  - Mid photo container (`translateZ(0px)`)
  - Optical semi-transparent glass lens with Fresnel edge lighting and caustic highlight reflection (`translateZ(+38px)`)
  - Authentic 3D Isometric Mini-Cube with key/ambient/rim shaded faces (`translateZ(+55px)`)
  - Floating status pill & sensor reticles (`translateZ(+62px)`)
- **Resting 3D Visibility**: The spatial relationship, specular glare, lens refraction, and depth layering are immediately apparent even when the pointer is completely motionless.
- **Cinematic Parallax**: Non-blocking pointer tracking modulating the resting angle with spring ease on leave. Touch screens and `prefers-reduced-motion` are guarded and respected.

### 2. Cinematic Scroll Transition & Chapter Choreography
- **Portal Transition**: Massive `THE WORK.` typography (`min-h-[85svh]`) with dynamic `IntersectionObserver` scaling down and dollying into sequential project chapters.
- **Floating Chapter Navigation HUD (`ProjectChapterNav.tsx`)**:
  - Floating glass pill indicator (`01 / 04`) with chapter dots.
  - Smooth-scroll chapter jumps to each project stage on click.
  - Only visible when user is actively exploring the projects section.

### 3. Four-Project Lineup & Deep-Dive Case Study Architecture Modals
- **Verified 4-Project Lineup**:
  1. `01 AI Incident Intelligence`: Python, FastAPI, ML, RAG, Embeddings, Vector Search, PostgreSQL, LLM.
  2. `02 SolisIQ – Smart Solar Usage & Savings Monitoring System`: React.js, Python (FastAPI), MongoDB, JavaScript, Chart.js, REST APIs.
  3. `03 Instanews`: React, Redux Toolkit, Node.js, Express.js, MongoDB, JWT.
  4. `04 ZeroHour`: HTML, CSS, JavaScript countdown application with dynamic DOM calculations.
- **Deep-Dive Architecture & Case Study Modal (`ProjectCaseStudyModal.tsx`)**:
  - Problem framing, engineering approach, and key implementations.
  - **Interactive Architecture Flow**: Clickable/hoverable interactive system nodes with live technical inspector detail cards.
  - Verified source code and live demo buttons (empty buttons strictly hidden).
  - Accessible focus trap, keyboard navigation (`Tab` / `Shift+Tab`), and `Escape` dismiss.

### 4. Technical Arsenal & Skills Lab (Spatial 3D Matrix)
- **Spatial Networked Laboratory Layout (`Skills.tsx`)**:
  - Category groupings: Languages, Frontend, Backend, Databases, Tools, Core, and AI.
  - Ambient SVG hexagonal honeycomb grid background with subtle pulse scanline.
  - Interactive skill pill nodes with hover highlight and category connection.
  - Category matrix filters (`All Matrix (19)`, `Languages`, `Frontend`, etc.).
  - View switcher: Toggle between **Spatial Grid** and **Plain Accessible List** for screen readers and recruiters.
  - Verified achievements: 250+ LeetCode DSA solved and 2 AWS Generative AI certifications.

### 5. Global Command Palette (`CommandPalette.tsx`)
- Keyboard accessible via `Ctrl+K` or `Cmd+K` from anywhere in the application.
- Trigger pill in desktop and mobile header navigation with `⌘K` badge.
- Instant search filter for navigating to Projects, Skills, About, Contact, Resume download, and external profiles (GitHub, LinkedIn, LeetCode).
- Full arrow-key navigation (`Up`/`Down`/`Enter`/`Esc`) and focus trap.

### 6. Verification & Test Metrics
- **TypeScript & Linter**: 0 errors, **0 warnings** across all 24 project files (`oxlint`).
- **Production Build (`npm run build`)**: **655 ms** clean compilation into `dist/`.
- **Browser Runtime Test (Microsoft Edge Headless / CDP)**:
  - Console Errors: **0**
  - Page Exceptions: **0**
  - Viewport 390px (Mobile iPhone): `docWidth: 390, winWidth: 390` (**0px horizontal overflow**)
  - Viewport 360px (Mobile Android): `docWidth: 360, winWidth: 360` (**0px horizontal overflow**)
  - Resume Download: HTTP 200, `application/pdf`, **137,947 bytes** verified.
  - Architecture Modal: Opened, verified 4 deep-dive headings and interactive nodes.
  - Command Palette: Opened via `Ctrl+K`, search input focused, all navigation items verified.




