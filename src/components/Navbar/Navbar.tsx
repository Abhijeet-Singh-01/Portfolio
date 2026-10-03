import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { applyAuroraTheme, getInitialTheme, type AuroraTheme } from '../../lib/theme';

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [theme, setTheme] = useState<AuroraTheme>(getInitialTheme);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Active section indicator via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'projects', 'skills', 'about', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Sync theme changes
  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<AuroraTheme>;
      if (customEvent.detail) setTheme(customEvent.detail);
    };
    window.addEventListener('aurora-theme-change', handleThemeChange);
    return () => window.removeEventListener('aurora-theme-change', handleThemeChange);
  }, []);

  // Handle Escape key and focus trapping for mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }

      if (e.key === 'Tab' && mobileNavRef.current) {
        const focusableElements = mobileNavRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    const nextTheme: AuroraTheme = theme === 'night' ? 'light' : 'night';
    applyAuroraTheme(nextTheme);
    setTheme(nextTheme);
  };

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--surface-glass)] backdrop-blur-md border-b border-[var(--border)] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo: AS */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-2 group min-h-[44px] min-w-[44px] items-center py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] rounded-lg"
          aria-label="AS - Abhijeet Singh Home"
        >
          <span className="w-8 h-8 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center font-mono font-bold text-xs text-[var(--accent-secondary)] group-hover:border-[var(--accent-secondary)] transition-colors">
            AS
          </span>
          <span className="font-semibold text-sm tracking-tight text-[var(--text)] group-hover:text-[var(--accent-secondary)] transition-colors hidden xs:inline">
            Abhijeet Singh
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`min-h-[44px] px-3.5 flex items-center text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'text-[var(--text)] bg-[var(--surface-2)] font-semibold'
                    : 'text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-tint)]'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <div className="w-[1px] h-5 bg-[var(--border)] mx-2" aria-hidden="true" />

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-md text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] cursor-pointer"
            aria-label={`Switch to ${theme === 'night' ? 'light' : 'dark'} mode`}
          >
            {theme === 'night' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--accent-primary)]" />
            )}
          </button>
        </nav>

        {/* Mobile Actions: Theme Toggle + Hamburger Button */}
        <div className="flex md:hidden items-center gap-1">
          <button
            type="button"
            onClick={toggleTheme}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-md text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] cursor-pointer"
            aria-label={`Switch to ${theme === 'night' ? 'light' : 'dark'} mode`}
          >
            {theme === 'night' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--accent-primary)]" />
            )}
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-md text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          ref={mobileNavRef}
          className="md:hidden fixed inset-x-0 top-16 bg-[var(--surface)] border-b border-[var(--border)] shadow-lg px-6 py-6 transition-all duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`min-h-[44px] px-4 py-3 rounded-lg flex items-center justify-between text-base font-medium transition-colors ${
                    isActive
                      ? 'text-[var(--text)] bg-[var(--surface-2)] font-semibold'
                      : 'text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]" />
                  )}
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-[var(--border)] flex items-center justify-between">
              <a
                href="/resume.pdf"
                download="Abhijeet-Singh-Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-secondary w-full text-center justify-center"
              >
                Download Resume (PDF)
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
