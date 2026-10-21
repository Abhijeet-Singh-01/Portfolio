import { useEffect, useRef } from 'react';
import { MASTER_INK_PATH, CHAPTER_ANCHORS } from '../data/portfolioContent';

interface InkTrailProps {
  progress: React.MutableRefObject<number>;
  reducedMotion: boolean;
}

export function InkTrail({ progress }: InkTrailProps) {
  const masterPathRef = useRef<SVGPathElement>(null);
  const headGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const masterPath = masterPathRef.current;
    if (!masterPath) return;

    const masterLen = masterPath.getTotalLength();
    const SAMPLES = 300;
    const pts: Array<{ x: number; y: number }> = new Array(SAMPLES + 1);
    for (let i = 0; i <= SAMPLES; i++) {
      const pt = masterPath.getPointAtLength((i / SAMPLES) * masterLen);
      pts[i] = { x: pt.x, y: pt.y };
    }

    masterPath.style.strokeDasharray = `${masterLen}`;
    masterPath.style.strokeDashoffset = `${masterLen * 0.96}`;

    let rafId = 0;
    let lastP = -1;

    const animate = () => {
      const p = Math.max(0.02, Math.min(1, progress.current));
      if (Math.abs(p - lastP) > 0.00005) {
        lastP = p;
        const remaining = masterLen * (1 - p);
        masterPath.style.strokeDashoffset = `${remaining.toFixed(1)}`;

        const idxFloat = p * SAMPLES;
        const idx0 = Math.min(SAMPLES, Math.max(0, Math.floor(idxFloat)));
        const idx1 = Math.min(SAMPLES, idx0 + 1);
        const frac = idxFloat - idx0;
        const px = pts[idx0].x + (pts[idx1].x - pts[idx0].x) * frac;
        const py = pts[idx0].y + (pts[idx1].y - pts[idx0].y) * frac;

        if (headGroupRef.current) {
          headGroupRef.current.setAttribute(
            'transform',
            `translate(${px.toFixed(1)}, ${py.toFixed(1)})`
          );
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [progress]);

  return (
    <svg
      className="ink-svg"
      viewBox="0 0 5000 5000"
      preserveAspectRatio="none"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {/* Subtle Guide Line */}
      <path
        d={MASTER_INK_PATH}
        fill="none"
        stroke="var(--rule-color)"
        strokeWidth="2.5"
        strokeDasharray="10 10"
        vectorEffect="non-scaling-stroke"
      />

      {/* Crisp Waypoint Anchor Dots */}
      {CHAPTER_ANCHORS.map((ch) => (
        <g key={ch.id} transform={`translate(${ch.coord.x}, ${ch.coord.y})`}>
          <circle r="24" fill="none" stroke="var(--gold)" strokeWidth="1.5" opacity="0.45" />
          <circle r="8" fill="var(--gold)" opacity="0.85" />
        </g>
      ))}

      {/* Active Zig-Zag Trajectory Line */}
      <path
        ref={masterPathRef}
        d={MASTER_INK_PATH}
        className="ink-trail-path"
        vectorEffect="non-scaling-stroke"
        style={{ strokeWidth: 3.5 }}
      />

      {/* Moving Camera Head Dot */}
      <g ref={headGroupRef} transform="translate(550, 860)">
        <circle r="14" fill="none" stroke="var(--gold)" strokeWidth="2" />
        <circle r="5" fill="var(--gold)" />
      </g>
    </svg>
  );
}
