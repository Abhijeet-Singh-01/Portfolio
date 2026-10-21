import { SITE_CONFIG, CHAPTER_ANCHORS } from '../data/portfolioContent';
import { Download, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavigationHUDProps {
  scrollProgress: React.MutableRefObject<number>;
  activeChapter: number;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onJumpToChapter: (index: number) => void;
}

export function NavigationHUD({
  scrollProgress,
  activeChapter,
  reducedMotion,
  onToggleReducedMotion,
  onJumpToChapter,
}: NavigationHUDProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  // Default to Dark Mode ('obsidian') as requested, with 1-click toggle to Cream Mode ('ivory')
  const [theme, setTheme] = useState<'ivory' | 'obsidian'>('obsidian');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'obsidian' ? 'ivory' : 'obsidian'));
  };

  const currentCh = CHAPTER_ANCHORS[activeChapter] ?? CHAPTER_ANCHORS[0];

  return (
    <>
      <header
        className="site-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '60px',
          zIndex: 9500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(14px, 3vw, 36px)',
          background: 'var(--header-bg)',
          borderBottom: '1px solid var(--rule-color)',
          boxSizing: 'border-box',
          pointerEvents: 'auto',
        }}
        role="banner"
      >
        {/* Left: Brand Identity */}
        <button
          type="button"
          onClick={() => onJumpToChapter(0)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 0',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '999px',
              background: 'var(--gold)',
              display: 'inline-block',
              flexShrink: 0,
              boxShadow: '0 0 10px var(--gold)',
            }}
          />
          <span
            className="type-headline"
            style={{
              color: 'var(--ink)',
              fontSize: '0.98rem',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            Abhijeet Singh
          </span>
        </button>

        {/* Center: 5 Section Navigation Links (Visible on Desktop & Tablet >= 860px) */}
        <nav
          className="site-header-nav"
          aria-label="Portfolio sections"
        >
          {CHAPTER_ANCHORS.map((ch, i) => {
            const isActive = activeChapter === i;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => onJumpToChapter(i)}
                className={`site-nav-link ${isActive ? 'site-nav-link--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="site-nav-num">{ch.num}</span>
                <span>{ch.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Theme Toggle, View Mode Toggle & Résumé Download */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            onClick={toggleTheme}
            className="ink-btn"
            style={{
              padding: '0.36rem 0.72rem',
              fontSize: '0.62rem',
              whiteSpace: 'nowrap',
            }}
          >
            <span>{theme === 'obsidian' ? '◐ Cream Mode' : '◑ Dark Mode'}</span>
          </button>

          <button
            type="button"
            onClick={onToggleReducedMotion}
            className="ink-btn site-desktop-only-btn"
            style={{
              padding: '0.36rem 0.72rem',
              fontSize: '0.62rem',
              whiteSpace: 'nowrap',
            }}
          >
            <span>{reducedMotion ? '◎ Zig-Zag' : '◉ Linear'}</span>
          </button>

          <a
            href={SITE_CONFIG.resumeUrl}
            download="Abhijeet-Singh-Resume.pdf"
            className="ink-btn ink-btn-solid site-desktop-only-btn"
            style={{
              padding: '0.36rem 0.82rem',
              fontSize: '0.62rem',
              whiteSpace: 'nowrap',
            }}
          >
            <Download size={11} />
            <span>Résumé</span>
          </a>

          {/* Mobile Hamburger Button (< 860px) */}
          <button
            type="button"
            className="site-mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            style={{
              background: 'transparent',
              border: '1px solid var(--card-border)',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer',
              color: 'var(--ink)',
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Smooth GPU Scroll Progress Bar along bottom edge of Header */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '2px',
            background: 'transparent',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <div
            id="header-scroll-bar"
            style={{
              width: '100%',
              height: '100%',
              background: 'var(--gold)',
              transformOrigin: '0 50%',
              transform: `scaleX(${Math.max(0.02, scrollProgress.current || 0)})`,
              willChange: 'transform',
            }}
          />
        </div>
      </header>

      {/* Mobile Dropdown Menu (< 860px) */}
      {menuOpen && (
        <div
          className="site-mobile-dropdown"
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            right: 0,
            zIndex: 9499,
            background: 'var(--paper)',
            borderBottom: '1px solid var(--rule-color)',
            padding: '16px 22px',
            boxShadow: '0 14px 34px rgba(0, 0, 0, 0.28)',
            pointerEvents: 'auto',
          }}
        >
          <nav
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            aria-label="Mobile navigation"
          >
            {CHAPTER_ANCHORS.map((ch, i) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => {
                  onJumpToChapter(i);
                  setMenuOpen(false);
                }}
                className="type-label"
                style={{
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  padding: '6px 4px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: activeChapter === i ? 700 : 500,
                  color: activeChapter === i ? 'var(--gold)' : 'var(--ink)',
                }}
              >
                {ch.num} — {ch.label}
              </button>
            ))}
            <div className="rule-h" style={{ margin: '6px 0' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  onToggleReducedMotion();
                  setMenuOpen(false);
                }}
                className="ink-btn"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                {reducedMotion ? '◎ Zig-Zag View' : '◉ Linear View'}
              </button>
              <a
                href={SITE_CONFIG.resumeUrl}
                download="Abhijeet-Singh-Resume.pdf"
                className="ink-btn ink-btn-solid"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Download size={12} />
                <span>Résumé PDF</span>
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Bottom Floating Section Switcher Pill */}
      <div
        style={{
          position: 'fixed',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9400,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '999px',
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.22)',
          whiteSpace: 'nowrap',
          pointerEvents: 'auto',
        }}
      >
        <button
          type="button"
          onClick={() => onJumpToChapter(Math.max(0, activeChapter - 1))}
          disabled={activeChapter === 0}
          style={{
            padding: '4px',
            borderRadius: '999px',
            cursor: activeChapter === 0 ? 'default' : 'pointer',
            background: 'transparent',
            border: 'none',
            color: 'var(--ink)',
            opacity: activeChapter === 0 ? 0.3 : 1,
            display: 'inline-flex',
            alignItems: 'center',
          }}
          aria-label="Previous section"
        >
          <ChevronLeft size={14} />
        </button>

        <span
          className="type-mono"
          style={{
            fontSize: '10.5px',
            padding: '0 6px',
            color: 'var(--ink)',
            whiteSpace: 'nowrap',
          }}
        >
          {currentCh.num} / 05 — {currentCh.label}
        </span>

        <button
          type="button"
          onClick={() => onJumpToChapter(Math.min(CHAPTER_ANCHORS.length - 1, activeChapter + 1))}
          disabled={activeChapter === CHAPTER_ANCHORS.length - 1}
          style={{
            padding: '4px',
            borderRadius: '999px',
            cursor: activeChapter === CHAPTER_ANCHORS.length - 1 ? 'default' : 'pointer',
            background: 'transparent',
            border: 'none',
            color: 'var(--ink)',
            opacity: activeChapter === CHAPTER_ANCHORS.length - 1 ? 0.3 : 1,
            display: 'inline-flex',
            alignItems: 'center',
          }}
          aria-label="Next section"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </>
  );
}
