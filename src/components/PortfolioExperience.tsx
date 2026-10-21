import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { WorldCanvas } from './WorldCanvas';
import { NavigationHUD } from './NavigationHUD';
import { MobileLayout } from './MobileLayout';
import { IntroPreloader } from './IntroPreloader';
import { CHAPTER_ANCHORS } from '../data/portfolioContent';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function PortfolioExperience() {
  const [reducedMotion, toggleReducedMotion] = useReducedMotion();
  const [introDone, setIntroDone] = useState(false);
  const [isCompactScreen, setIsCompactScreen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 860 : false
  );

  const scrollProgress = useRef<number>(0);
  const activeChapterRef = useRef<number>(0);
  const [activeChapter, setActiveChapter] = useState(0);

  const lenisRef = useRef<Lenis | null>(null);
  const proxyRef = useRef<HTMLDivElement>(null);

  const useCanvas = !isCompactScreen && !reducedMotion;

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  const detectChapter = useCallback((progress: number) => {
    const chapter = CHAPTER_ANCHORS.reduce((acc, ch, i) => {
      return progress >= ch.dwellStart - 0.04 ? i : acc;
    }, 0);
    if (chapter !== activeChapterRef.current) {
      activeChapterRef.current = chapter;
      setActiveChapter(chapter);
    }
  }, []);

  const jumpToChapter = useCallback(
    (index: number) => {
      const target = CHAPTER_ANCHORS[index];
      if (!target) return;

      activeChapterRef.current = index;
      setActiveChapter(index);

      if (!useCanvas) {
        const el = document.getElementById(`chapter-${target.id}`);
        el?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const targetScroll = target.dwellStart * maxScroll;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetScroll, {
          duration: 1.05,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    },
    [useCanvas]
  );

  // Initial URL / data-initial-waypoint jump
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const initWp = document.documentElement.dataset.initialWaypoint || window.location.hash.slice(1);
    if (!initWp) return;
    const map: Record<string, number> = {
      home: 0,
      genesis: 0,
      hero: 0,
      work: 1,
      projects: 1,
      architect: 1,
      setu: 1,
      'ai-incident-intelligence': 1,
      solisiq: 1,
      achievements: 2,
      arena: 2,
      about: 2,
      skills: 3,
      forge: 3,
      contact: 4,
    };
    const idx = map[initWp.toLowerCase()];
    if (typeof idx === 'number' && idx > 0) {
      const target = CHAPTER_ANCHORS[idx];
      if (target) {
        scrollProgress.current = target.dwellStart;
        activeChapterRef.current = idx;
        setActiveChapter(idx);
        window.setTimeout(() => {
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          window.scrollTo(0, Math.round(target.dwellStart * maxScroll));
        }, 30);
      }
    }
  }, []);

  useEffect(() => {
    if (!useCanvas) {
      const onLinearScroll = () => {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const p = Math.max(0, Math.min(1, window.scrollY / maxScroll));
        scrollProgress.current = p;
        const bar = document.getElementById('header-scroll-bar');
        if (bar) bar.style.transform = `scaleX(${Math.max(0.02, p).toFixed(4)})`;
        detectChapter(p);
      };
      window.addEventListener('scroll', onLinearScroll, { passive: true });
      return () => window.removeEventListener('scroll', onLinearScroll);
    }

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;

    const ticker = gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Single unified scroll driver from Lenis (no competing native scroll listener!)
    lenis.on('scroll', ({ progress }: { progress: number }) => {
      scrollProgress.current = progress;
      detectChapter(progress);
    });

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [useCanvas, detectChapter]);

  useEffect(() => {
    const handleResize = () => {
      setIsCompactScreen(window.innerWidth < 860);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ']'].includes(e.key)) {
        e.preventDefault();
        jumpToChapter(Math.min(CHAPTER_ANCHORS.length - 1, activeChapterRef.current + 1));
      } else if (['ArrowUp', 'PageUp', '['].includes(e.key)) {
        e.preventDefault();
        jumpToChapter(Math.max(0, activeChapterRef.current - 1));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [jumpToChapter]);

  return (
    <>
      {!introDone && <IntroPreloader onComplete={handleIntroComplete} />}

      {/* Fixed Top Header & Bottom Section Pill — Always Mounted and Visible */}
      <NavigationHUD
        scrollProgress={scrollProgress}
        activeChapter={activeChapter}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={toggleReducedMotion}
        onJumpToChapter={jumpToChapter}
      />

      {!useCanvas ? (
        <div style={{ paddingTop: '60px' }}>
          <MobileLayout />
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          <div className="ink-viewport" aria-label="Portfolio viewport">
            <WorldCanvas
              scrollProgress={scrollProgress}
              reactiveProgress={scrollProgress.current}
              reducedMotion={reducedMotion}
              onJumpToChapter={jumpToChapter}
            />
          </div>

          <div
            ref={proxyRef}
            aria-hidden="true"
            style={{
              position: 'relative',
              height: '960vh',
              width: '1px',
              pointerEvents: 'none',
              zIndex: -1,
            }}
          />
        </div>
      )}
    </>
  );
}
