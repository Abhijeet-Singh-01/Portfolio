import React from 'react';
import { ArrowUp } from 'lucide-react';
import { socialLinks } from '../../data/socialLinks';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#07080a]/90 backdrop-blur-md py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Monogram & Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded border border-[#d4af37]/30 bg-[#10131a] flex items-center justify-center">
            <span className="font-serif text-xs font-semibold text-[#edd894]">AS</span>
          </div>
          <div className="text-xs font-mono text-[#8e95a2]">
            <span>© 2026 Abhijeet Singh • Built with ♥ and curiosity.</span>
          </div>
        </div>

        <nav aria-label="Contact and profile links" className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] font-mono text-[#8e95a2]">
          {socialLinks.map((link) => (
            <a key={link.name} href={link.url} target={link.openInNewTab ? '_blank' : undefined} rel={link.openInNewTab ? 'noopener noreferrer' : undefined} download={link.download} aria-label={link.accessibilityLabel} className="hover:text-[#edd894] transition-colors">
              {link.name}
            </a>
          ))}
        </nav>

        {/* Location & Back To Top */}
        <div className="flex items-center gap-6 text-xs font-mono text-[#8e95a2]">
          <span className="hidden sm:inline">Lucknow, India</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#edd894] transition-colors cursor-pointer group"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-[#d4af37]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
