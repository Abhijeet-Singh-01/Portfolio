import React from 'react';
import { ArrowUp } from 'lucide-react';
import { socialLinks } from '../../data/socialLinks';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <footer className="border-t border-border/15 bg-bg/95 backdrop-blur-md py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-text-2">
        {/* Monogram & Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg border border-accent-aqua/30 bg-surface flex items-center justify-center">
            <span className="font-display text-xs font-bold text-accent-aqua-ink">AS</span>
          </div>
          <div>
            <span>© 2026 Abhijeet Singh. All rights reserved.</span>
          </div>
        </div>

        {/* Links */}
        <nav aria-label="Footer links" className="flex flex-wrap justify-center gap-x-5 gap-y-2 uppercase tracking-wider text-[11px]">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.openInNewTab ? '_blank' : undefined}
              rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
              download={link.download}
              aria-label={link.accessibilityLabel}
              className="hover:text-accent-aqua-ink transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Back To Top */}
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline">Lucknow, India</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-accent-aqua-ink transition-colors cursor-pointer group uppercase tracking-widest text-[11px]"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-accent-aqua-ink" />
          </button>
        </div>
      </div>
    </footer>
  );
};
