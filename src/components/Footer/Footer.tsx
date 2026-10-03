import React from 'react';
import { ArrowUp } from 'lucide-react';
import { siteLinks } from '../../data/socialLinks';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-2)]">
        {/* Minimal Copyright */}
        <div>
          <span>© 2026 Abhijeet Singh</span>
        </div>

        {/* Minimal Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={siteLinks.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text)] transition-colors min-h-[44px] flex items-center px-1"
            aria-label={siteLinks.github.accessibilityLabel}
          >
            GitHub
          </a>
          <a
            href={siteLinks.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text)] transition-colors min-h-[44px] flex items-center px-1"
            aria-label={siteLinks.linkedin.accessibilityLabel}
          >
            LinkedIn
          </a>
          <a
            href={siteLinks.leetcode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text)] transition-colors min-h-[44px] flex items-center px-1"
            aria-label={siteLinks.leetcode.accessibilityLabel}
          >
            LeetCode
          </a>
          <a
            href={siteLinks.email.url}
            className="hover:text-[var(--text)] transition-colors min-h-[44px] flex items-center px-1"
            aria-label={siteLinks.email.accessibilityLabel}
          >
            Email
          </a>
        </div>

        {/* Back To Top Button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="min-h-[44px] flex items-center gap-1.5 hover:text-[var(--text)] transition-colors cursor-pointer group"
          aria-label="Scroll back to top of the page"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
