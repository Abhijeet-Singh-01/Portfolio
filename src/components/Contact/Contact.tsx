import React, { useState } from 'react';
import { socialLinks, siteLinks } from '../../data/socialLinks';
import { Mail, ArrowUpRight, Copy, Check, Send, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from '../common/BrandIcons';

const iconMap: Record<string, React.ReactNode> = {
  Mail: <Mail className="w-4 h-4" />,
  Github: <GithubIcon className="w-4 h-4" />,
  Linkedin: <LinkedinIcon className="w-4 h-4" />,
  Code2: <LeetcodeIcon className="w-4 h-4" />,
  FileText: <Download className="w-4 h-4" />,
};

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const emailAddress = siteLinks.email.handle;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name || 'Visitor'}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 pb-6 border-b border-border/15">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-accent-magenta animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent-magenta-ink font-semibold">
            05 / CONTACT · // CONVERGENCE
          </span>
        </div>

        {/* Huge Line: LET'S BUILD SOMETHING WORTH SHIPPING. */}
        <h2 className="font-display font-extrabold uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-text tracking-tighter leading-[0.92] max-w-5xl">
          LET&apos;S BUILD SOMETHING{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-indigo via-accent-magenta to-accent-tangerine">
            WORTH SHIPPING.
          </span>
        </h2>

        <p className="mt-6 text-sm sm:text-base text-text-2 max-w-2xl font-mono leading-relaxed">
          Open to backend and full-stack software development opportunities. Let&apos;s talk engineering, APIs, and scalable systems.
        </p>
      </div>

      {/* Magnetic Pills Row */}
      <div className="mb-16">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-aqua-ink block mb-4 font-semibold">
          DIRECT REACH &amp; CHANNELS:
        </span>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.openInNewTab ? '_blank' : undefined}
              rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
              download={link.download}
              aria-label={link.accessibilityLabel}
              data-magnetic
              className="magnetic group inline-flex items-center gap-2.5 px-5 py-3 rounded-full border border-border/20 bg-surface-glass backdrop-blur-xl hover:border-accent-aqua/50 hover:bg-surface text-xs font-mono uppercase tracking-wider text-text transition-all duration-200 shadow-md hover:shadow-lg shadow-black/15"
            >
              <span className="text-accent-aqua-ink group-hover:text-text transition-colors">
                {iconMap[link.iconName]}
              </span>
              <span className="font-semibold">{link.name}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-text-2 group-hover:text-accent-aqua-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          ))}

          <button
            type="button"
            data-magnetic
            onClick={copyToClipboard}
            className="magnetic inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border/20 bg-surface/60 hover:bg-surface text-xs font-mono uppercase tracking-wider text-text-2 hover:text-text transition-all"
            aria-label="Copy email address to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-accent-aqua-ink" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Email'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Email Info & Direct Message Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Info Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="contact-panel p-8 rounded-2xl bg-surface-glass border border-border/15 backdrop-blur-xl relative overflow-hidden">
            <span className="text-[11px] font-mono uppercase tracking-widest text-text-2 block mb-2 font-medium">
              Primary Direct Email
            </span>

            <div className="font-mono font-bold text-lg sm:text-xl text-text mb-4 break-all">
              {emailAddress}
            </div>

            <p className="text-xs font-mono text-text-2 leading-relaxed mb-6">
              Based in Lucknow, India. Fast response time for internship, project, and engineering opportunities.
            </p>

            <a
              href={siteLinks.email.url}
              aria-label={siteLinks.email.accessibilityLabel}
              data-magnetic
              className="magnetic inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-button text-text-on-accent text-xs font-mono uppercase tracking-widest font-semibold shadow-lg shadow-accent-indigo/25 hover:shadow-accent-indigo/40 hover:scale-105 active:scale-95 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Launch Mail Client</span>
            </a>
          </div>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="lg:col-span-7">
          <div className="contact-panel p-8 sm:p-10 rounded-2xl bg-surface-glass border border-border/15 backdrop-blur-xl font-mono text-xs">
            <h3 className="font-display font-bold uppercase text-xl sm:text-2xl text-text mb-2 tracking-tight">
              SEND A DIRECT MESSAGE
            </h3>
            <p className="text-text-2 mb-6">
              Fill out the details below to open a pre-filled email draft.
            </p>

            {submitted ? (
              <div className="p-8 rounded-xl bg-surface border border-accent-aqua/30 text-center">
                <p className="text-accent-aqua-ink text-sm font-semibold mb-2">Message Draft Prepared</p>
                <p className="text-text-2 text-xs mb-4">
                  Your default email client has been opened. You can also email directly at {emailAddress}.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-accent-aqua-ink underline hover:text-text"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block uppercase tracking-wider text-text-2 mb-1.5 text-[11px]">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-lg bg-surface border border-border/20 focus:border-accent-aqua text-xs text-text placeholder-text-2/50 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block uppercase tracking-wider text-text-2 mb-1.5 text-[11px]">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-lg bg-surface border border-border/20 focus:border-accent-aqua text-xs text-text placeholder-text-2/50 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block uppercase tracking-wider text-text-2 mb-1.5 text-[11px]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Hello Abhijeet, I came across your portfolio and wanted to discuss..."
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-border/20 focus:border-accent-aqua text-xs text-text placeholder-text-2/50 focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-button text-text-on-accent font-semibold uppercase tracking-wider text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
