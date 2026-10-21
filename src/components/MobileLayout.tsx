import { SITE_CONFIG, PROJECTS, ACHIEVEMENTS, SKILLS, EDUCATION } from '../data/portfolioContent';
import { Mail, Download, ExternalLink } from 'lucide-react';
import { GithubIcon } from './ui/Icons';

export function MobileLayout() {
  return (
    <main
      className="min-h-screen"
      style={{ background: 'var(--paper)', paddingBottom: '5rem' }}
      aria-label="Abhijeet Singh Portfolio"
    >
      {/* 01. HOME */}
      <section
        id="chapter-home"
        className="px-5 pt-14 pb-12 max-w-3xl mx-auto text-center"
        style={{ borderBottom: '1px solid var(--rule-color)' }}
      >
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] mb-5">
          <img
            src={SITE_CONFIG.portraitUrl}
            alt="Abhijeet Singh"
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="type-label text-[9.5px]" style={{ color: 'var(--ink)' }}>
            B.Tech CS @ PSIT ({EDUCATION.period})
          </span>
        </div>

        <h1
          className="font-display-condensed uppercase"
          style={{
            fontSize: 'clamp(3.6rem, 16vw, 6.5rem)',
            lineHeight: 0.88,
            color: 'var(--ink)',
          }}
        >
          {SITE_CONFIG.firstName}
        </h1>
        <div
          className="font-display-condensed uppercase tracking-widest mt-1 mb-4"
          style={{ fontSize: '1.35rem', color: 'var(--gold)' }}
        >
          {SITE_CONFIG.lastName} — {SITE_CONFIG.shortRole}
        </div>

        <p className="type-body text-sm mb-6 max-w-xl mx-auto">
          {SITE_CONFIG.intro}
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          <a href={`mailto:${SITE_CONFIG.email}`} className="ink-btn ink-btn-solid">
            <Mail size={12} /> Contact
          </a>
          <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer" className="ink-btn">
            <GithubIcon size={12} /> GitHub
          </a>
          <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="ink-btn">
            <ExternalLink size={12} /> LinkedIn
          </a>
          <a href={SITE_CONFIG.resumeUrl} download="Abhijeet-Singh-Resume.pdf" className="ink-btn">
            <Download size={12} /> Résumé
          </a>
        </div>
      </section>

      {/* 02. PROJECTS (All 3 Visible!) */}
      <section
        id="chapter-projects"
        className="px-5 py-12 max-w-3xl mx-auto"
        style={{ borderBottom: '1px solid var(--rule-color)' }}
      >
        <span className="type-label block mb-1" style={{ color: 'var(--gold)' }}>
          02 — SELECTED WORK
        </span>
        <h2 className="type-headline text-2xl mb-5">Featured Projects</h2>

        <div className="flex flex-col gap-5">
          {PROJECTS.map((project) => (
            <article key={project.id} className="project-card p-5">
              <div className="flex items-center justify-between mb-1">
                <span className="type-mono text-xs font-bold" style={{ color: 'var(--gold)' }}>
                  PROJECT {project.num}
                </span>
                <span className="type-label text-[9px]">{project.category}</span>
              </div>
              <h3 className="type-headline text-xl mb-1">{project.title}</h3>
              <p className="type-label text-[9.5px] mb-2.5" style={{ color: 'var(--gold)' }}>
                {project.subtitle}
              </p>
              <p className="type-body text-xs mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-btn ink-btn-solid"
              >
                <GithubIcon size={12} /> Source Code on GitHub
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* 03. ACHIEVEMENTS & EDUCATION */}
      <section
        id="chapter-achievements"
        className="px-5 py-12 max-w-3xl mx-auto"
        style={{ borderBottom: '1px solid var(--rule-color)' }}
      >
        <span className="type-label block mb-1" style={{ color: 'var(--gold)' }}>
          03 — CERTIFICATIONS &amp; MILESTONES
        </span>
        <h2 className="type-headline text-2xl mb-5">Achievements &amp; Education</h2>

        <div className="flex flex-col gap-4 mb-6">
          {ACHIEVEMENTS.map((item) => (
            <article key={item.id} className="project-card p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="type-label text-[9px]" style={{ color: 'var(--gold)' }}>
                  {item.subtitle}
                </span>
                <span className="type-mono text-xs font-bold" style={{ color: 'var(--gold)' }}>
                  {item.metric}
                </span>
              </div>
              <h3 className="type-headline text-lg mb-1">{item.title}</h3>
              <p className="type-body text-xs mb-2.5">{item.description}</p>
              <div className="flex flex-wrap gap-1">
                {item.tags.map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="project-card p-5">
          <span className="type-label text-[9.5px] block mb-1" style={{ color: 'var(--gold)' }}>
            EDUCATION
          </span>
          <h3 className="type-headline text-lg">{EDUCATION.institution}</h3>
          <p className="type-body text-xs">{EDUCATION.degree}</p>
          <p className="type-mono text-xs font-bold mt-1 mb-3" style={{ color: 'var(--gold)' }}>
            CGPA: {EDUCATION.cgpa} ({EDUCATION.period})
          </p>
          <div className="pt-3 border-t border-[var(--rule-color)] space-y-2">
            {EDUCATION.schooling.map((s) => (
              <div key={s.degree} className="text-xs">
                <span className="font-semibold" style={{ color: 'var(--ink)' }}>{s.school}</span> — {s.degree} ({s.period}) · <span style={{ color: 'var(--gold)' }}>{s.score}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. SKILLS */}
      <section
        id="chapter-skills"
        className="px-5 py-12 max-w-3xl mx-auto"
        style={{ borderBottom: '1px solid var(--rule-color)' }}
      >
        <span className="type-label block mb-1" style={{ color: 'var(--gold)' }}>
          04 — TOOLKIT
        </span>
        <h2 className="type-headline text-2xl mb-5">Technical Skills</h2>

        <div className="flex flex-col gap-4">
          {SKILLS.map((group) => (
            <div key={group.category} className="project-card p-4">
              <h3 className="type-headline text-base mb-2.5">{group.category}</h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className="tech-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05. CONTACT DETAILS */}
      <section id="chapter-contact" className="px-5 py-12 max-w-3xl mx-auto">
        <span className="type-label block mb-1" style={{ color: 'var(--gold)' }}>
          05 — GET IN TOUCH
        </span>
        <h2 className="type-headline text-2xl mb-4">Contact Details</h2>

        <div className="project-card p-5">
          <p className="type-body text-xs mb-4">
            {SITE_CONFIG.careerObjective}
          </p>
          <p className="type-mono text-sm font-bold mb-1" style={{ color: 'var(--ink)' }}>
            {SITE_CONFIG.email}
          </p>
          <p className="type-mono text-xs font-semibold mb-4" style={{ color: 'var(--gold)' }}>
            {SITE_CONFIG.phone}
          </p>
          <div className="flex flex-wrap gap-2">
            <a href={`mailto:${SITE_CONFIG.email}`} className="ink-btn ink-btn-solid">
              <Mail size={12} /> Send Email
            </a>
            <a href="tel:+917007803506" className="ink-btn">
              Call {SITE_CONFIG.phone}
            </a>
            <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer" className="ink-btn">
              <GithubIcon size={12} /> GitHub
            </a>
            <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="ink-btn">
              <ExternalLink size={12} /> LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
