import React, { useState, useEffect, useRef } from 'react';
import { Search, FolderGit2, Cpu, User, Mail, Download, X, Command } from 'lucide-react';
import { siteLinks } from '../../data/socialLinks';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './BrandIcons';

interface CommandItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandItems: CommandItem[] = [
    {
      id: 'projects',
      title: 'Projects',
      category: 'Navigation',
      description: 'Explore curated engineering systems & research platforms',
      icon: <FolderGit2 className="w-4 h-4 text-[var(--accent-secondary)]" />,
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'skills',
      title: 'Skills & Capabilities',
      category: 'Navigation',
      description: 'View technical languages, frameworks, and database proficiencies',
      icon: <Cpu className="w-4 h-4 text-[var(--accent-primary)]" />,
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'about',
      title: 'About & Education',
      category: 'Navigation',
      description: 'Read engineering intent, PSIT education timeline & certifications',
      icon: <User className="w-4 h-4 text-emerald-400" />,
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'contact',
      title: 'Contact',
      category: 'Navigation',
      description: 'Reach out directly for software development opportunities',
      icon: <Mail className="w-4 h-4 text-amber-400" />,
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'resume',
      title: 'Download Resume (PDF)',
      category: 'Document',
      description: 'Download verified resume file directly (/resume.pdf)',
      icon: <Download className="w-4 h-4 text-[var(--accent-secondary)]" />,
      action: () => {
        const link = document.createElement('a');
        link.href = siteLinks.resume.url;
        link.download = siteLinks.resume.download || 'Abhijeet-Singh-Resume.pdf';
        link.click();
      },
    },
    {
      id: 'github',
      title: 'GitHub Profile',
      category: 'External',
      description: 'Visit github.com/Abhijeet-Singh-01 repositories & lab code',
      icon: <GithubIcon className="w-4 h-4 text-[var(--text)]" />,
      action: () => {
        window.open(siteLinks.github.url, '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Profile',
      category: 'External',
      description: 'Connect with Abhijeet Singh on LinkedIn',
      icon: <LinkedinIcon className="w-4 h-4 text-blue-400" />,
      action: () => {
        window.open(siteLinks.linkedin.url, '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'leetcode',
      title: 'LeetCode (250+ Solved)',
      category: 'External',
      description: 'View algorithmic problem-solving track record & solutions',
      icon: <LeetcodeIcon className="w-4 h-4 text-amber-400" />,
      action: () => {
        window.open(siteLinks.leetcode.url, '_blank', 'noopener,noreferrer');
      },
    },
  ];

  const filteredItems = commandItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            setQuery('');
            setSelectedIndex(0);
          }
          return !prev;
        });
      }
    };

    const handleCustomOpen = () => {
      setQuery('');
      setSelectedIndex(0);
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  // Modal Focus & Key Navigation
  useEffect(() => {
    if (!isOpen) return;

    const timeout = setTimeout(() => inputRef.current?.focus(), 40);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleModalKeys = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (filteredItems.length === 0 ? 0 : (prev + 1) % filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredItems.length === 0 ? 0 : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      } else if (e.key === 'Enter') {
        const activeItem = filteredItems[selectedIndex];
        if (activeItem) {
          e.preventDefault();
          activeItem.action();
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleModalKeys);
    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleModalKeys);
    };
  }, [isOpen, filteredItems, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] sm:pt-[16vh] px-3 sm:px-6 bg-black/80 backdrop-blur-md transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div className="relative w-full max-w-xl rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-[0_30px_70px_rgba(0,0,0,0.85)] overflow-hidden text-left focus:outline-none">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)] bg-[var(--surface-2)]/70">
          <Search className="w-4 h-4 text-[var(--text-2)] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or jump to section..."
            className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-2)] focus:outline-none font-mono"
            aria-label="Search command options"
          />
          <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border border-[var(--border)] text-[10px] font-mono text-[var(--text-2)]">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close command palette"
            className="p-1 rounded-md text-[var(--text-2)] hover:text-[var(--text)] sm:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-[var(--text-2)]">
              No matching commands found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--surface-2)] text-[var(--text)] ring-1 ring-[var(--accent-secondary)]/40'
                      : 'text-[var(--text-2)] hover:bg-[var(--surface-2)]/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[var(--text)] truncate">
                          {item.title}
                        </span>
                        <span className="chip text-[9px] py-0 px-1.5 font-mono">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--text-2)] truncate">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-[var(--accent-secondary)] opacity-0 group-hover:opacity-100 pl-2 shrink-0">
                    ↵
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hints */}
        <div className="px-4 py-2 bg-[var(--surface-2)]/60 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-2)]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="text-[var(--accent-secondary)] font-semibold">COMMAND PALETTE</span>
        </div>
      </div>
    </div>
  );
};
