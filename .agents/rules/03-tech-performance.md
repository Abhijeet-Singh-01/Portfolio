---
trigger: always_on
description: Stack, performance budget, fallbacks, responsive and accessibility rules. Lag is the owner's biggest complaint.
---
# 03 - Tech, performance, responsive, accessibility

## Stack (inspect the repo first, reuse what exists)
React + TypeScript + Vite; Tailwind CSS for the HTML UI layer; Three.js via React Three Fiber + drei for the ONE full-screen canvas; custom GLSL shaders (particles, glass/refraction look, transitions, hex grid); GSAP (single animation engine, camera and UI timelines); Lenis (smooth scroll mapped to camera progress, sharing ONE requestAnimationFrame loop with GSAP and R3F); Lucide icons. Install only what is needed and say why. Remove libraries that duplicate jobs (for example two animation engines).
Keep content in `src/data/*.ts` (projects, skills, education, socialLinks). Keep ALL colors in one tokens file. Keep ALL tweakable numbers (particle counts, rotation speed, camera speed, glow, quality tiers) in ONE commented config file.
Real text is rendered as accessible HTML over the canvas (or a hidden semantic mirror) so crawlers and screen readers see everything.

## Performance budget (measure the PRODUCTION build)
- Targets: about 60 FPS desktop, 30+ FPS on a mid-range phone. Lighthouse mobile: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+. If a target is missed, say why and what you cut.
- One canvas, one render loop. Cap devicePixelRatio: 1.5 desktop, 1 mobile. Never allocate objects or vectors inside useFrame; reuse them.
- Particles: GPU-based (shader Points or GPGPU) and instanced meshes for repeated shapes. Keep counts modest and configurable.
- Post-processing: bloom and a light vignette on desktop only. Motion blur/chromatic split done cheaply in shaders on the slabs. No SSAO, no heavy depth of field. Nothing heavy on mobile or the Low tier.
- ADAPTIVE QUALITY: measure FPS continuously; if it stays under about 45, step down automatically (particles, DPR, effects). Tiers High / Medium / Low in the config file. Default to Low on mobile; auto "Lite mode" on weak devices (navigator.hardwareConcurrency <= 4 or deviceMemory <= 4). A visible Lite mode toggle in the menu.
- Pause rendering when the tab is hidden and when a scene is far off-screen. Lazy-load scene modules, code-split the 3D bundle, dispose geometries/materials/textures/listeners on unmount, no memory leaks.
- CSS: animate only transform and opacity. Limit backdrop-filter to the top-right pill and a few cards with small blur. No animated blur or box-shadow.
- Assets: WebP with srcSet and width/height, compressed textures, subset fonts with font-display: swap, remove unused dependencies.
- Custom cursor and parallax use refs and GSAP quickTo, NEVER React state per mouse move.

## Fallbacks
If WebGL fails, the device is very weak, or prefers-reduced-motion is on: show a beautiful 2D/CSS version with the same content, palette, and photo (CSS 3D tilt card, gradient glow, normal scrolling sections). Loader is skippable and never blocks if 3D fails.

## Responsive
Mobile-first. Test 360, 375, 390, 768, 1024, 1366, 1440, 1920 and landscape phone. No horizontal scroll, no overlapping text, tap targets 44px+, use 100svh/100dvh, fluid type with clamp(). Mobile: giant hero type scales down but stays 3 lines, touch-drag rotates the ring without blocking vertical scroll (touch-action tuned), simplified scenes and fewer particles, no custom cursor, still premium. Projects: swipe/drag between slabs.

## Accessibility and SEO
Semantic HTML, skip link, keyboard navigation between scenes, visible focus rings in both themes, aria-labels, alt text, AA contrast, prefers-reduced-motion respected everywhere, accessible menu overlay (focus trap, Esc closes). SEO tags as listed in the facts file.
