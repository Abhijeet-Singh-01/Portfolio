import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const toggleRef=useRef<HTMLButtonElement>(null);
  const drawerRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(!mobileMenuOpen) return;
    const drawer=drawerRef.current;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const desktopQuery=window.matchMedia('(min-width: 768px)');
    const closeOnDesktop=()=>{if(desktopQuery.matches)setMobileMenuOpen(false);};
    const focusable=()=>Array.from(drawer?.querySelectorAll<HTMLElement>('a,button,[tabindex]:not([tabindex="-1"])')||[]).filter(el=>!el.hasAttribute('disabled'));
    focusable()[0]?.focus();
    const keydown=(event:KeyboardEvent)=>{
      if(event.key==='Escape') {setMobileMenuOpen(false);requestAnimationFrame(()=>toggleRef.current?.focus());}
      if(event.key==='Tab'){
        const items=focusable(); if(!items.length)return;
        const first=items[0],last=items[items.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
      }
    };
    document.addEventListener('keydown',keydown);
    desktopQuery.addEventListener('change',closeOnDesktop);
    return ()=>{
      document.removeEventListener('keydown',keydown);
      desktopQuery.removeEventListener('change',closeOnDesktop);
      document.body.style.overflow=previousOverflow;
    };
  },[mobileMenuOpen]);

  useEffect(() => {
    let frame=0;
    const updateFromScroll = () => {
      frame=0;
      const scrolled=window.scrollY > 20;
      setIsScrolled((current)=>current===scrolled?current:scrolled);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;
      let nextSection='home';

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            nextSection=sections[i];
            break;
          }
        }
      }
      setActiveSection((current)=>current===nextSection?current:nextSection);
    };
    const handleScroll = () => { if(!frame)frame=requestAnimationFrame(updateFromScroll); };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#090a0d]/80 backdrop-blur-md border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Minimal Monogram Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#home');
            }}
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="Abhijeet Singh Portfolio Home"
          >
            <div className="w-9 h-9 rounded-md border border-[#d4af37]/30 bg-[#12141a]/80 flex items-center justify-center transition-all duration-300 group-hover:border-[#d4af37]/60 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <span className="font-serif text-sm tracking-wider font-semibold text-[#f4f1ea] group-hover:text-[#edd894] transition-colors">
                AS
              </span>
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-medium tracking-widest uppercase text-[#f4f1ea]/90 font-mono">
                Abhijeet Singh
              </span>
              <span className="text-[10px] tracking-wider text-[#8e95a2] font-mono">
                Software & AI Eng.
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.07] bg-[#0f1117]/65 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className={`relative px-4 py-1.5 text-xs font-mono uppercase tracking-widest transition-all duration-200 rounded-full ${
                    isActive
                      ? 'text-[#edd894] font-medium'
                      : 'text-[#8e95a2] hover:text-[#f4f1ea]'
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 bg-[#d4af37]/10 border border-[#d4af37]/25 rounded-full -z-10 animate-fade-in"
                    />
                  )}
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Quick Resume / Contact */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#cfcac0] hover:text-[#edd894] px-3.5 py-1.5 rounded border border-white/[0.08] hover:border-[#d4af37]/40 bg-[#12151c]/60 hover:bg-[#161a23] transition-all duration-200"
            >
              Resume
              <ArrowUpRight className="w-3 h-3 text-[#d4af37]" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            ref={toggleRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 rounded-md border border-white/[0.08] bg-[#12141a]/80 flex items-center justify-center text-[#f4f1ea] hover:border-[#d4af37]/40 focus:outline-none transition-colors"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          ref={drawerRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio navigation"
          className="fixed inset-0 z-40 md:hidden bg-[#08090b]/95 flex flex-col justify-between pt-24 pb-10 px-8 transition-opacity duration-300"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8e95a2] border-b border-white/[0.06] pb-3">
              Menu Navigation
            </span>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className={`text-xl font-serif tracking-wide py-2 transition-colors flex items-center justify-between ${
                      isActive ? 'text-[#edd894] font-medium' : 'text-[#8e95a2] hover:text-[#f4f1ea]'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/[0.06]">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 text-center text-xs font-mono uppercase tracking-widest text-[#090a0d] bg-[#d4af37] hover:bg-[#e0c268] font-semibold rounded transition-colors"
            >
              Download Resume
            </a>
            <p className="text-center text-[11px] font-mono text-[#8e95a2]">
              Abhijeet Singh • Lucknow, India
            </p>
          </div>
        </div>
      )}
    </>
  );
};
