---
trigger: always_on
description: The site structure, scenes, HUD, typography and color, modeled on the owner's reference video.
---
# 02 - Design and structure (the reference video)

The owner showed a screen recording of a top creative-studio site (Active Theory style). Reproduce its STRUCTURE and FEEL with an original identity and Abhijeet's real content. Do not copy text, logo, or assets.

## What the reference does (observed)
1. LOADER: black screen. A thin vertical stream of particles resolves into a glowing ring logo (lime/cyan glow), then cuts into the hero.
2. HERO: GIANT blocky uppercase display type stacked in 3 lines, filling the left/center. A big glass 3D ring object sits in the center, overlapping the text so the letters refract/distort behind the glass. A small mono paragraph sits on the right. Bottom-left: a tiny mono heading plus an arrow list of destinations. Top-right: a glass pill with two labels separated by a thin line (MENU ------ CONTACT).
3. WORK: the camera flies into dark 3D space with huge floating glass slabs (project cards), each surrounded by colorful particle clouds (pink, cyan, lime, violet). Slabs are motion-blurred while moving and sharpen when they settle. Scroll or drag moves through them in depth.
4. LAB: a wireframe/machinery scene, then a hex-grid "lab" room with a glowing star icon and mono labels.
The whole thing is ONE continuous full-screen WebGL world. Sections are scenes the camera travels to, not stacked web pages.

## Structure for Abhijeet
Scene 0 LOADER (under 2.5 s, skippable): vertical particle stream resolves into a glowing ring containing "AS". Progress counter in mono ("0 -> 100"). Shader dissolve into the hero.
Scene 1 HERO:
- Giant stacked uppercase type, three lines, e.g. "SOFTWARE" / "DEVELOPER" / "AI + FULL-STACK" (refine wording, must stay truthful). Small label above: "ABHIJEET SINGH - LUCKNOW, IN".
- Center: a big glass ring / torus object with real thickness, rim light, refraction-like look; my photo (real, color graded) sits inside the ring as a glass card that can be dragged to rotate 360 degrees with inertia, auto-rotating slowly and easing back to face front. Text behind glass distorts slightly (screen-space refraction, or a cheaper fake using a blurred/offset copy on desktop only).
- Right: small mono paragraph from the career objective (2-3 lines).
- Bottom-left: mono label "EXPLORE:" plus arrow list: -> PROJECTS, -> SKILLS, -> ABOUT, -> CONTACT (hover: arrow slides, text glitches, a particle ripple; click: camera flies there).
- Top-left: "AS" mark. Top-right: glass pill "MENU ------ CONTACT" (MENU opens a full-screen overlay with the same destinations plus theme toggle and social links).
- Availability badge "Available for opportunities" (small, tasteful).
- CTAs also reachable: Download Resume (pill), GitHub, LinkedIn, LeetCode in the menu overlay and contact scene.
Scene 2 WORK ("PROJECTS", numbered 01-04): 4 huge glass slabs arranged on a curved path in depth. Camera drifts between them on scroll/drag/arrow keys. Each slab: big gradient number, title in giant uppercase, category in mono, tech chips, GitHub / Live buttons (hide empty). Around each slab a particle cloud with its own color and behavior matching the project (telemetry lines and anomaly spikes for AI Incident Intelligence; sun arc and energy particles for SolisIQ; stacked news cards flipping for Instanews; countdown ring for ZeroHour). Moving slabs get velocity-based motion blur / chromatic split; they sharpen when settled. Hover: tilt toward cursor, glow, hex/scanline shader reveal. Click: camera dives into the slab and a detail view opens with a shader transition (real info only: what it is, features from the facts file, tech, links). Esc or back returns.
Scene 3 LAB ("SKILLS"): dark hex-grid honeycomb floor. Skills are glowing hex cells grouped by category (Languages, Frontend, Backend, Databases, Tools, Core). Hover a cell: related cells light up with thin beams, others dim. A slow scan line sweeps the floor. A glowing star/asterisk icon and mono labels ("// THE LAB"). Provide an accessible plain-list alternative.
Scene 4 ABOUT: a calm scene. Framed portrait, career objective text, terminal-style card (whoami / focus / status using real info), education timeline as a glowing line with nodes that light up as the camera travels, certification and LeetCode achievement cards.
Scene 5 CONTACT: particles converge into a ring. Huge line "LET'S BUILD SOMETHING WORTH SHIPPING." Magnetic pills: Email, GitHub, LinkedIn, LeetCode, Resume. Minimal footer "(c) 2026 Abhijeet Singh".

## Navigation and HUD
- Scroll (Lenis), drag, keyboard (arrows, Tab, Esc), and menu all move the camera between scenes. Persistent thin progress line and small mono scene counter (01/05).
- Custom cursor (desktop fine-pointer only): dot + ring, shows "VIEW" over slabs and "DRAG" over the ring; click ripple. Disabled on touch and reduced motion.
- Optional ambient sound and hover ticks: default OFF, with a toggle in the menu.

## Typography
- Display: bold, wide, blocky UPPERCASE (for example Unbounded, Syne, Big Shoulders Display, or Space Grotesk 700). The earlier elegant serif direction is REPLACED.
- Labels and small text: monospace (JetBrains Mono or Space Mono), uppercase, letter-spaced, tiny.
- Body: Inter or Manrope. Fluid sizes with clamp(). Giant hero type must never overflow or overlap unreadably on small screens (scale down, keep 3 lines).

## Color (Aurora Vivid tokens, ONE tokens file, mapped to Tailwind AND the 3D scene)
The reference is dark with vivid color pops, so the DEFAULT is Night; Light is a toggle.
- Night (default): bg #0A0620 (deep indigo-black, never flat gray), bg-2 #130A3B, surface #1A1050, text #F8F6FF, text-2 #B9B3E6, border rgba(248,246,255,0.14). Accents: electric indigo #7C6CFF, violet #C084FC, magenta-pink #FF5FA8, tangerine #FFA36B, aqua #22D3EE, lime #C6F432 (ring glow/logo accent, rare).
- Light (toggle): bg #FAF8FF, bg-2 #F1EDFF, surface #FFFFFF, text #14123A, text-2 #4F4B73; accents #5B4BFF, #8B5CF6, #EC4899, #FF7A45, #06B6D4.
- Brand gradient: indigo -> violet -> magenta -> tangerine. Use it on a few things only (project numbers, ring glow, key words).
- 60-30-10: mostly calm dark surfaces, vivid color mainly in particles, glass edges, and accents. Max 2-3 accents per scene. Tinted shadows, not black.
- Contrast: AA in both themes, verified with a real check. Theme switch cross-fades (about 300 ms), no flash on load, and the 3D scene changes with the theme.
- Photo grading: subtle soft-light violet-to-aqua overlay at low opacity, natural skin tone.
