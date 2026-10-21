import { useEffect, useRef, useState } from 'react';

interface IntroPreloaderProps {
  onComplete: () => void;
}

export function IntroPreloader({ onComplete }: IntroPreloaderProps) {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<'counter' | 'hello' | 'portal' | 'done'>('counter');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (
        params.get('skipIntro') === '1' ||
        document.documentElement.dataset.initialWaypoint
      ) {
        setPhase('done');
        onCompleteRef.current();
        return;
      }
    }

    let frameId = 0;
    let holdTimer = 0;
    const start = performance.now();
    // Balanced, responsive 2.6-second 0% -> 100% progression
    const counterDuration = 2600;

    const step = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / counterDuration);
      // Smooth ease-in-out curve
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setPercent(Math.round(eased * 100));

      if (t < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setPercent(100);
        holdTimer = window.setTimeout(() => {
          setPhase('hello');
        }, 150);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frameId);
      if (holdTimer) window.clearTimeout(holdTimer);
    };
  }, []);

  useEffect(() => {
    if (phase === 'hello') {
      // 1.65s cursive handwriting draw -> immediately transitions into portal at 1.72s with NO dead pause!
      const t1 = window.setTimeout(() => setPhase('portal'), 1720);
      return () => window.clearTimeout(t1);
    }
    if (phase === 'portal') {
      // Crisp 0.76s portal expansion into the Dark Mode Hero section
      const t2 = window.setTimeout(() => {
        setPhase('done');
        onCompleteRef.current();
      }, 760);
      return () => window.clearTimeout(t2);
    }
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      className="select-none overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A0A0A',
        color: '#EAE3D2',
      }}
      aria-label="Loading portfolio"
    >
      {/* Skip Button in bottom corner for instant access */}
      <button
        type="button"
        onClick={() => {
          setPhase('done');
          onCompleteRef.current();
        }}
        className="type-label text-[10px] px-3.5 py-1.5 rounded-full cursor-pointer"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '28px',
          zIndex: 100001,
          color: 'rgba(234, 227, 210, 0.72)',
          border: '1px solid rgba(234, 227, 210, 0.24)',
          background: 'rgba(255, 255, 255, 0.04)',
        }}
      >
        Skip Intro →
      </button>

      {/* STAGE 1: 0% -> 100% Condensed Counter + Rotating 3D Crescent Ring */}
      {phase === 'counter' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 20px',
          }}
        >
          <div
            className="font-display-condensed"
            style={{
              fontSize: 'clamp(4.8rem, 11vw, 8.2rem)',
              lineHeight: 0.92,
              color: '#EAE3D2',
              marginBottom: '0.6rem',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {percent}%
          </div>

          {/* 3D Shaded Crescent Torus Ring */}
          <div
            style={{
              position: 'relative',
              width: 'clamp(120px, 16vw, 156px)',
              height: 'clamp(120px, 16vw, 156px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              className="w-full h-full preloader-ring-spin"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="crescent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5F0E6" stopOpacity="1" />
                  <stop offset="65%" stopColor="#C8B99E" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#2A2620" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="34"
                fill="none"
                stroke="rgba(234, 227, 210, 0.12)"
                strokeWidth="9"
              />
              <circle
                cx="50"
                cy="50"
                r="34"
                fill="none"
                stroke="url(#crescent-grad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="135 220"
              />
            </svg>
          </div>
        </div>
      )}

      {/* STAGE 2: Cursive Handwritten "hello" Stroke Animation (Immediate Transition When Complete!) */}
      {phase === 'hello' && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '0 24px',
          }}
        >
          <svg
            width="460"
            height="195"
            viewBox="0 0 320 140"
            fill="none"
            aria-label="hello"
            style={{
              width: 'clamp(260px, 46vw, 500px)',
              height: 'auto',
              overflow: 'visible',
            }}
          >
            <path
              d="M 48,96 C 62,64 78,24 72,18 C 65,12 56,52 56,96 C 56,74 74,62 86,66 C 96,70 92,94 104,94 C 118,94 134,80 134,68 C 134,58 120,60 118,74 C 116,90 132,98 148,92 C 168,84 186,44 182,22 C 178,10 166,38 166,84 C 166,96 178,98 192,90 C 210,78 226,42 222,22 C 218,10 206,40 206,84 C 206,96 220,98 234,88 C 244,80 246,68 258,68 C 272,68 278,80 272,90 C 264,100 246,96 246,80 C 246,68 264,64 286,70"
              stroke="#EAE3D2"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hello-stroke-path"
            />
          </svg>
        </div>
      )}

      {/* STAGE 3: Horizontal Line & Smooth Expanding Portal Reveal */}
      {phase === 'portal' && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '2px',
              background: 'var(--gold)',
            }}
          />
          <div className="portal-expand-box" />
        </div>
      )}
    </div>
  );
}
