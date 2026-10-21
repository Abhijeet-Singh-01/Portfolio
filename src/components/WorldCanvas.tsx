import { useRef, useEffect } from 'react';
import { InkTrail } from './InkTrail';
import { GenesisChapter } from './chapters/GenesisChapter';
import { ArchitectChapter } from './chapters/ArchitectChapter';
import { ArenaChapter } from './chapters/ArenaChapter';
import { ForgeChapter } from './chapters/ForgeChapter';
import { ContactChapter } from './chapters/ContactChapter';
import { CHAPTER_ANCHORS } from '../data/portfolioContent';

interface WorldCanvasProps {
  scrollProgress: React.MutableRefObject<number>;
  reactiveProgress: number;
  reducedMotion: boolean;
  onJumpToChapter?: (index: number) => void;
}

export function WorldCanvas({
  scrollProgress,
  reactiveProgress,
  reducedMotion,
  onJumpToChapter,
}: WorldCanvasProps) {
  const worldRef = useRef<HTMLDivElement>(null);
  const chapterHeightsRef = useRef<number[]>([600, 680, 680, 560, 620]);
  const rafRef = useRef<number>(0);

  const activeChapter = CHAPTER_ANCHORS.reduce((acc, ch, i) => {
    return reactiveProgress >= ch.dwellStart - 0.04 ? i : acc;
  }, 0);

  useEffect(() => {
    const measureChapters = () => {
      if (!worldRef.current) return;
      const panels = worldRef.current.querySelectorAll<HTMLElement>('.chapter-panel');
      const heights = Array.from(panels).map((el) => el.offsetHeight || 600);
      while (heights.length < 5) heights.push(600);
      chapterHeightsRef.current = heights;
    };

    measureChapters();
    window.addEventListener('resize', measureChapters, { passive: true });
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && worldRef.current) {
      ro = new ResizeObserver(measureChapters);
      worldRef.current.querySelectorAll('.chapter-panel').forEach((el) => ro?.observe(el));
    }
    const t1 = window.setTimeout(measureChapters, 150);
    return () => {
      window.removeEventListener('resize', measureChapters);
      if (ro) ro.disconnect();
      window.clearTimeout(t1);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const smoothstep = (t: number) => {
      const x = Math.max(0, Math.min(1, t));
      return x * x * (3 - 2 * x);
    };

    let currentTx: number | null = null;
    let currentTy: number | null = null;

    const updateCamera = () => {
      const p = Math.max(0, Math.min(1, scrollProgress.current));
      const viewW = window.innerWidth;
      const viewH = window.innerHeight;
      const headerH = 60;
      const footerH = 48;
      const availH = Math.max(260, viewH - headerH - footerH);
      const heights = chapterHeightsRef.current;
      const anchors = CHAPTER_ANCHORS;

      // Update header progress bar directly on GPU without React re-render
      const bar = document.getElementById('header-scroll-bar');
      if (bar) {
        bar.style.transform = `scaleX(${Math.max(0.02, p).toFixed(4)})`;
      }

      const getChapterBounds = (idx: number) => {
        const ch = anchors[idx];
        const wx = (ch.coord.x * 0.1 * viewW) / 100;
        const wyBase = (ch.coord.y * 0.1 * viewH) / 100;
        const panelH = heights[idx] ?? 600;
        const overflow = Math.max(0, panelH - (availH - 16));
        // If panel is shorter than available viewport height, center it vertically!
        const centerPad = panelH < availH - 16 ? Math.round((availH - panelH) * 0.42) : 10;
        const topOffset = headerH + centerPad;
        return {
          wx,
          wyStart: wyBase - topOffset,
          wyEnd: wyBase - topOffset + overflow,
        };
      };

      const first = getChapterBounds(0);
      let targetWorldX = first.wx;
      let targetWorldY = first.wyStart;

      for (let i = 0; i < anchors.length; i++) {
        const cur = anchors[i];
        const bCur = getChapterBounds(i);

        if (p >= cur.dwellStart && p <= cur.dwellEnd) {
          const dt = smoothstep(
            (p - cur.dwellStart) / Math.max(0.001, cur.dwellEnd - cur.dwellStart)
          );
          targetWorldX = bCur.wx;
          targetWorldY = bCur.wyStart + (bCur.wyEnd - bCur.wyStart) * dt;
          break;
        }

        if (i < anchors.length - 1) {
          const next = anchors[i + 1];
          if (p > cur.dwellEnd && p < next.dwellStart) {
            const bNext = getChapterBounds(i + 1);
            const u = (p - cur.dwellEnd) / Math.max(0.001, next.dwellStart - cur.dwellEnd);
            const s = smoothstep(u);

            targetWorldX = bCur.wx + (bNext.wx - bCur.wx) * s;
            targetWorldY = bCur.wyEnd + (bNext.wyStart - bCur.wyEnd) * s;
            break;
          }
        }
      }

      const targetTx = viewW * 0.5 - targetWorldX;
      const targetTy = -targetWorldY;

      if (currentTx === null || currentTy === null) {
        currentTx = targetTx;
        currentTy = targetTy;
      } else {
        // Silky-smooth frame-rate-independent damping so diagonal zig-zag pans never jitter
        currentTx += (targetTx - currentTx) * 0.42;
        currentTy += (targetTy - currentTy) * 0.42;
        if (Math.abs(targetTx - currentTx) < 0.05) currentTx = targetTx;
        if (Math.abs(targetTy - currentTy) < 0.05) currentTy = targetTy;
      }

      if (worldRef.current) {
        worldRef.current.style.transform = `translate3d(${currentTx.toFixed(2)}px, ${currentTy.toFixed(2)}px, 0px)`;
      }

      rafRef.current = requestAnimationFrame(updateCamera);
    };

    rafRef.current = requestAnimationFrame(updateCamera);
    return () => cancelAnimationFrame(rafRef.current);
  }, [scrollProgress, reducedMotion]);

  return (
    <div
      ref={worldRef}
      className="world-canvas"
      style={reducedMotion ? { transform: 'none' } : undefined}
      aria-label="Portfolio world canvas"
    >
      {/* Crisp Zig-Zag Connector Line */}
      <InkTrail progress={scrollProgress} reducedMotion={reducedMotion} />

      {/* 5 Separate, Dedicated Zig-Zag Sections */}
      <GenesisChapter
        isActive={activeChapter === 0}
        reducedMotion={reducedMotion}
        onJumpToChapter={onJumpToChapter}
      />
      <ArchitectChapter
        isActive={activeChapter === 1}
        reducedMotion={reducedMotion}
        onJumpToChapter={onJumpToChapter}
      />
      <ArenaChapter
        isActive={activeChapter === 2}
        reducedMotion={reducedMotion}
        onJumpToChapter={onJumpToChapter}
      />
      <ForgeChapter
        isActive={activeChapter === 3}
        reducedMotion={reducedMotion}
        onJumpToChapter={onJumpToChapter}
      />
      <ContactChapter
        isActive={activeChapter === 4}
        reducedMotion={reducedMotion}
        onJumpToChapter={onJumpToChapter}
      />
    </div>
  );
}
