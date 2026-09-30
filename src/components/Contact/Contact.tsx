import React, { useState } from 'react';
import { socialLinks } from '../../data/socialLinks';
import { Mail, Code2, ArrowUpRight, Copy, Check, Send, Sparkles, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { siteLinks } from '../../data/socialLinks';

const iconMap: Record<string, React.ReactNode> = {
  Mail: <Mail className="w-4 h-4" />,
  Github: <GithubIcon className="w-4 h-4" />,
  Linkedin: <LinkedinIcon className="w-4 h-4" />,
  Code2: <Code2 className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
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
    
    // Fallback directly to mailto
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name || 'Visitor'}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
            05 / Summit · Get In Touch
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#f4f1ea] tracking-tight">
          Let&apos;s build something{' '}
          <span className="text-[#edd894] italic font-light">worth shipping.</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#8e95a2] max-w-2xl font-mono leading-relaxed">
          I&apos;m seeking backend and full-stack software development opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Links & Quick Copy (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Copy Email Card */}
          <div className="contact-panel p-6 sm:p-8 rounded-xl bg-[#0c0e14]/70 border border-[#d4af37]/20 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#d4af37]/10 rounded-full blur-xl pointer-events-none" />

            <span className="text-xs font-mono uppercase tracking-widest text-[#8e95a2] block mb-2">
              Primary Direct Contact
            </span>

            <div className="font-serif text-xl sm:text-2xl text-[#f4f1ea] mb-4 break-all">
              {emailAddress}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={siteLinks.email.url}
                aria-label={siteLinks.email.accessibilityLabel}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#d4af37] hover:bg-[#e0c268] text-[#08090b] font-medium text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>

              <button
                type="button"
                onClick={copyToClipboard}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#131620] hover:bg-[#181c28] border border-white/[0.08] text-[#cfcac0] hover:text-[#edd894] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                aria-label="Copy email address to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#2dd4bf]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Address'}</span>
              </button>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8e95a2] block">
              Contact, Profiles & Resume
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.openInNewTab ? '_blank' : undefined}
                  rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                  download={link.download}
                  aria-label={link.accessibilityLabel}
                  className="group flex items-center justify-between p-4 rounded-lg bg-[#0e1117]/60 hover:bg-[#131722]/80 border border-white/[0.06] hover:border-[#d4af37]/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-[#d4af37] group-hover:text-[#edd894] transition-colors">
                      {iconMap[link.iconName]}
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-[#f4f1ea] font-medium">
                        {link.name}
                      </h4>
                      <p className="text-[11px] font-mono text-[#8e95a2]">
                        {link.label}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-[#8e95a2] group-hover:text-[#edd894] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Direct Message Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="contact-panel p-8 sm:p-10 rounded-xl bg-[#0c0e14]/70 border border-white/[0.08] backdrop-blur-md">
            <h3 className="text-xl sm:text-2xl font-serif text-[#f4f1ea] mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs font-mono text-[#8e95a2] mb-6">
              Have a question, opportunity, or feedback? Leave a message below.
            </p>

            {submitted ? (
              <div className="p-6 rounded-lg bg-[#11181c] border border-[#2dd4bf]/30 text-center py-8">
                <Sparkles className="w-8 h-8 text-[#2dd4bf] mx-auto mb-3" />
                <h4 className="text-base font-serif text-[#f4f1ea] mb-1">
                  Message Prepared
                </h4>
                <p className="text-xs font-mono text-[#8e95a2] mb-4">
                  Your email client has been opened. If it didn&apos;t pop up, feel free to email directly at {emailAddress}.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-mono text-[#edd894] underline hover:text-[#f4f1ea] cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-[#8e95a2] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-md bg-[#090b10] border border-white/[0.08] focus:border-[#d4af37]/60 text-xs font-mono text-[#f4f1ea] placeholder-[#555a64] focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-[#8e95a2] mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 rounded-md bg-[#090b10] border border-white/[0.08] focus:border-[#d4af37]/60 text-xs font-mono text-[#f4f1ea] placeholder-[#555a64] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-[#8e95a2] mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Hello Abhijeet, I came across your portfolio and wanted to discuss..."
                    className="w-full px-3.5 py-2.5 rounded-md bg-[#090b10] border border-white/[0.08] focus:border-[#d4af37]/60 text-xs font-mono text-[#f4f1ea] placeholder-[#555a64] focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#d4af37] hover:bg-[#e0c268] text-[#08090b] font-medium text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(212,175,55,0.15)] cursor-pointer"
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
