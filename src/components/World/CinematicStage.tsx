import React, { useEffect, useState, useRef } from 'react';
import { projectsData } from '../../data/projects';
import { siteLinks } from '../../data/socialLinks';
import { experienceState, scrollToRoom } from '../../lib/experienceStore';
import { CheckCircle, X, ArrowRight, Download, Award, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from '../common/BrandIcons';
import profilePhoto from '../../assets/images/profile.webp';
import { gsap } from 'gsap';

export const CinematicStage: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [activeModalProject, setActiveModalProject] = useState<(typeof projectsData)[0] | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let animId = 0;
    const update = () => {
      setProgress(experienceState.scrollProgress);
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  const openModal = (proj: (typeof projectsData)[0]) => {
    setActiveModalProject(proj);
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
    gsap.to(experienceState, { detailZoom: 1, duration: 0.8, ease: 'power3.out' });
  };

  const closeModal = () => {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
    setActiveModalProject(null);
    gsap.to(experienceState, { detailZoom: 0, duration: 0.8, ease: 'power2.inOut' });
  };

  // Determine active scene window & opacities
  // Hero: 0.00 -> 0.14
  const heroOpacity = progress <= 0.07 ? 1 : Math.max(0, 1 - (progress - 0.07) / 0.06);

  // Projects:
  // P01: 0.18 -> 0.36 (peak 0.23 -> 0.32)
  // P02: 0.40 -> 0.58 (peak 0.45 -> 0.54)
  // P03: 0.62 -> 0.78 (peak 0.66 -> 0.75)
  // P04: 0.81 -> 0.91 (peak 0.84 -> 0.90)
  const getProjectOpacity = (start: number, peakStart: number, peakEnd: number, end: number) => {
    if (progress < start || progress > end) return 0;
    if (progress < peakStart) return (progress - start) / (peakStart - start);
    if (progress <= peakEnd) return 1;
    return 1 - (progress - peakEnd) / (end - peakEnd);
  };

  const p1Opacity = getProjectOpacity(0.18, 0.23, 0.32, 0.36);
  const p2Opacity = getProjectOpacity(0.40, 0.45, 0.54, 0.58);
  const p3Opacity = getProjectOpacity(0.62, 0.66, 0.75, 0.78);
  const p4Opacity = getProjectOpacity(0.81, 0.84, 0.90, 0.92);

  // Skills (The Lab): 0.92 -> 0.95
  const skillsOpacity =
    progress >= 0.92 && progress <= 0.95
      ? progress < 0.928
        ? (progress - 0.92) / 0.008
        : progress > 0.945
        ? 1 - (progress - 0.945) / 0.005
        : 1
      : 0;

  // About: 0.95 -> 0.98
  const aboutOpacity =
    progress >= 0.95 && progress <= 0.98
      ? progress < 0.958
        ? (progress - 0.95) / 0.008
        : progress > 0.975
        ? 1 - (progress - 0.975) / 0.005
        : 1
      : 0;

  // Contact: 0.98 -> 1.00
  const contactOpacity = progress >= 0.98 ? Math.min(1, (progress - 0.98) / 0.015) : 0;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden select-none">
      {/* ---------------------------------------------------------------------- */}
      {/* SCENE 0: HERO (Visible at t = 0.00 -> 0.13)                            */}
      {/* ---------------------------------------------------------------------- */}
      {heroOpacity > 0.01 && (
        <div
          className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 md:p-16 pt-24 pb-8 transition-opacity duration-200"
          style={{ opacity: heroOpacity }}
        >
          {/* Top Kicker */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[11px] uppercase tracking-[0.25em] text-accent-aqua-ink">
              ABHIJEET SINGH — LUCKNOW, IN
            </span>
            <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/20 bg-surface/80 text-[10px] text-accent-lime tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>

          {/* Center Content */}
          <div className="my-auto py-6 max-w-4xl">
            <h1 className="font-display font-extrabold uppercase text-[clamp(2.4rem,8.5vw,6rem)] leading-[0.9] tracking-tighter text-text">
              <span className="block">SOFTWARE</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-aqua">
                DEVELOPER
              </span>
              <span className="block text-text-2 text-[clamp(1.8rem,6.5vw,4.6rem)]">
                AI + FULL-STACK
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-xs sm:text-sm font-mono text-text-2 leading-relaxed">
              CS undergraduate (PSIT 2024–2028). Building scalable backend APIs, database-driven architectures, and AI/ML solutions. Strengthening DSA & Generative AI.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3.5 pointer-events-auto">
              <button
                type="button"
                onClick={() => scrollToRoom('projects')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-indigo text-white font-mono text-xs uppercase tracking-widest font-semibold hover:bg-accent-violet transition-colors cursor-pointer shadow-lg shadow-accent-indigo/25"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={siteLinks.resume.url}
                download={siteLinks.resume.download}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border/25 bg-surface/80 text-text hover:border-accent-aqua/50 hover:text-accent-aqua-ink font-mono text-xs uppercase tracking-widest transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume PDF</span>
              </a>
            </div>
          </div>

          {/* Bottom Explore Links */}
          <div className="pt-4 border-t border-border/10 flex items-center justify-between text-xs font-mono">
            <div className="flex flex-wrap gap-4 sm:gap-7 pointer-events-auto">
              <button
                type="button"
                onClick={() => scrollToRoom('projects')}
                className="text-text-2 hover:text-accent-aqua-ink transition-colors uppercase tracking-wider"
              >
                → PROJECTS /02
              </button>
              <button
                type="button"
                onClick={() => scrollToRoom('skills')}
                className="text-text-2 hover:text-accent-aqua-ink transition-colors uppercase tracking-wider"
              >
                → SKILLS /03
              </button>
              <button
                type="button"
                onClick={() => scrollToRoom('about')}
                className="text-text-2 hover:text-accent-aqua-ink transition-colors uppercase tracking-wider"
              >
                → ABOUT /04
              </button>
              <button
                type="button"
                onClick={() => scrollToRoom('contact')}
                className="text-text-2 hover:text-accent-aqua-ink transition-colors uppercase tracking-wider"
              >
                → CONTACT /05
              </button>
            </div>
            <span className="hidden sm:block text-[11px] text-text-2">
              PSIT CSE · CGPA 7.54
            </span>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* SCENE 1: PROJECT 01 — AI INCIDENT INTELLIGENCE                          */}
      {/* ---------------------------------------------------------------------- */}
      {p1Opacity > 0.01 && (
        <ProjectView
          project={projectsData[0]}
          index={0}
          opacity={p1Opacity}
          isMobile={isMobile}
          onOpenModal={openModal}
        />
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* SCENE 2: PROJECT 02 — SOLISIQ                                          */}
      {/* ---------------------------------------------------------------------- */}
      {p2Opacity > 0.01 && (
        <ProjectView
          project={projectsData[1]}
          index={1}
          opacity={p2Opacity}
          isMobile={isMobile}
          onOpenModal={openModal}
        />
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* SCENE 3: PROJECT 03 — INSTANEWS                                        */}
      {/* ---------------------------------------------------------------------- */}
      {p3Opacity > 0.01 && (
        <ProjectView
          project={projectsData[2]}
          index={2}
          opacity={p3Opacity}
          isMobile={isMobile}
          onOpenModal={openModal}
        />
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* SCENE 4: PROJECT 04 — ZEROHOUR                                         */}
      {/* ---------------------------------------------------------------------- */}
      {p4Opacity > 0.01 && (
        <ProjectView
          project={projectsData[3]}
          index={3}
          opacity={p4Opacity}
          isMobile={isMobile}
          onOpenModal={openModal}
        />
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* SCENE 5: THE LAB — SKILLS MATRIX                                       */}
      {/* ---------------------------------------------------------------------- */}
      {skillsOpacity > 0.01 && (
        <div
          className="absolute inset-0 flex items-center justify-center p-6 sm:p-12 transition-opacity duration-300"
          style={{ opacity: skillsOpacity }}
        >
          <div className="w-full max-w-2xl bg-surface/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl pointer-events-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border/15 mb-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-lime font-semibold">
                  03 / LAB
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-black uppercase text-text tracking-tight">
                  TECHNICAL ARSENAL
                </h2>
              </div>
              <span className="text-xs font-mono text-text-2">// THE LAB</span>
            </div>

            {/* Categorized Skills List (Strictly Verified from Resume) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-accent-aqua-ink font-semibold">
                  01 LANGUAGES
                </span>
                <p className="text-text leading-relaxed">C++, Python, C, SQL</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-accent-aqua-ink font-semibold">
                  02 FRONTEND
                </span>
                <p className="text-text leading-relaxed">React.js, HTML, CSS, Tailwind CSS, JavaScript (ES6+)</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-accent-aqua-ink font-semibold">
                  03 BACKEND
                </span>
                <p className="text-text leading-relaxed">FastAPI, REST APIs, Firebase Cloud Messaging (Learning)</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-accent-aqua-ink font-semibold">
                  04 DATABASES
                </span>
                <p className="text-text leading-relaxed">MongoDB, MySQL</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-accent-aqua-ink font-semibold">
                  05 TOOLS & PLATFORMS
                </span>
                <p className="text-text leading-relaxed">Git, GitHub, VS Code</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-accent-aqua-ink font-semibold">
                  06 CORE CS & AI
                </span>
                <p className="text-text leading-relaxed">Data Structures & Algorithms, Generative AI (AWS)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* SCENE 6: ABOUT — IDENTITY & TRAJECTORY                                 */}
      {/* ---------------------------------------------------------------------- */}
      {aboutOpacity > 0.01 && (
        <div
          className="absolute inset-0 flex items-center justify-center p-6 sm:p-12 transition-opacity duration-300"
          style={{ opacity: aboutOpacity }}
        >
          <div className="w-full max-w-2xl bg-surface/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl pointer-events-auto">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Natural Portrait (Uncropped, crisp) */}
              <div className="w-24 sm:w-32 aspect-square rounded-2xl overflow-hidden border border-border/25 bg-surface-2 shrink-0">
                <img
                  src={profilePhoto}
                  alt="Portrait of Abhijeet Singh"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bio & Details */}
              <div className="flex-1 text-left">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-aqua-ink font-semibold">
                  04 / ABOUT
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-black uppercase text-text tracking-tight mt-0.5">
                  ABHIJEET SINGH
                </h2>
                <p className="text-xs font-mono text-text-2 mt-1">
                  B.Tech CSE · PSIT, Kanpur (2024–2028) · CGPA 7.54
                </p>

                <p className="text-xs text-text-2 leading-relaxed mt-3">
                  Undergraduate software developer with a focus on backend systems, clean REST APIs, and AI/ML applications. Passionate about engineering reliable services grounded in real data.
                </p>

                {/* Achievements & Certifications */}
                <div className="mt-4 pt-3 border-t border-border/15 flex flex-wrap items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-accent-aqua-ink">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>250+ LeetCode DSA Solved</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-accent-lime">
                    <Award className="w-3.5 h-3.5" />
                    <span>AWS Generative AI Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* SCENE 7: CONTACT — LET'S BUILD SOMETHING MEANINGFUL                    */}
      {/* ---------------------------------------------------------------------- */}
      {contactOpacity > 0.01 && (
        <div
          className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 pt-24 pb-8 transition-opacity duration-300"
          style={{ opacity: contactOpacity }}
        >
          <div />

          <div className="max-w-2xl mx-auto text-center pointer-events-auto">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-aqua-ink font-semibold">
              05 / CONTACT
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-text tracking-tight leading-tight mt-2 mb-6">
              LET'S BUILD SOMETHING MEANINGFUL.
            </h2>

            {/* Magnetic Contact Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={siteLinks.email.url}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-indigo text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-accent-violet transition-colors"
              >
                <span>Email Me</span>
              </a>

              <a
                href={siteLinks.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border/25 bg-surface/85 text-text hover:text-accent-aqua-ink hover:border-accent-aqua/40 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={siteLinks.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border/25 bg-surface/85 text-text hover:text-accent-aqua-ink hover:border-accent-aqua/40 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href={siteLinks.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border/25 bg-surface/85 text-text hover:text-accent-aqua-ink hover:border-accent-aqua/40 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <LeetcodeIcon className="w-3.5 h-3.5" />
                <span>LeetCode</span>
              </a>

              <a
                href={siteLinks.resume.url}
                download={siteLinks.resume.download}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border/25 bg-surface/85 text-text hover:text-accent-aqua-ink hover:border-accent-aqua/40 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            </div>
          </div>

          <div className="text-center text-[10px] font-mono text-text-2">
            © 2026 Abhijeet Singh · Lucknow, India
          </div>
        </div>
      )}

      {/* Accessible Detail Modal Dialog */}
      <dialog
        ref={dialogRef}
        onClose={closeModal}
        className="fixed inset-0 m-auto bg-surface border border-white/10 rounded-2xl p-0 text-text shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-md z-[1200] max-w-xl w-[92vw] max-h-[85vh] overflow-hidden"
      >
        {activeModalProject && (
          <div className="flex flex-col h-full max-h-[85vh]">
            <div className="p-5 border-b border-border/15 flex items-center justify-between bg-surface-2/60">
              <span className="text-xs font-mono uppercase tracking-widest text-accent-aqua-ink font-semibold">
                {activeModalProject.category}
              </span>
              <button
                type="button"
                onClick={closeModal}
                className="w-7 h-7 rounded-full border border-border/25 flex items-center justify-center text-text-2 hover:text-text cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <h3 className="text-2xl font-display font-extrabold uppercase text-text">
                  {activeModalProject.name}
                </h3>
                <p className="text-xs font-mono text-accent-aqua-ink mt-1">
                  {activeModalProject.tagline}
                </p>
              </div>

              <div>
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-text-2 mb-1.5">Overview</h4>
                <p className="text-xs text-text-2 leading-relaxed bg-surface-2/40 p-3.5 rounded-xl border border-border/10">
                  {activeModalProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-text-2 mb-2">Verified Highlights</h4>
                <ul className="space-y-2">
                  {(activeModalProject.systemHighlights || []).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text-2">
                      <CheckCircle className="w-3.5 h-3.5 text-accent-aqua-ink shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-text-2 mb-2">Engineering Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProject.technologies.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded text-[10px] font-mono border border-border/20 bg-surface-2 text-text-2">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border/15 flex items-center justify-between bg-surface-2/60">
              <span className="text-[10px] font-mono text-text-2">Source: public/resume.pdf</span>
              <div className="flex items-center gap-2">
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase border border-border/30 text-text hover:text-accent-aqua-ink"
                  >
                    <GithubIcon className="w-3 h-3" />
                    <span>Code</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase border border-border/25 text-text-2 hover:text-text cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};

// ----------------------------------------------------------------------------------
// REUSABLE PROJECT VIEW (DUAL-LAYOUT: DESKTOP ASYMMETRIC VS MOBILE BOTTOM DOCK)
// ----------------------------------------------------------------------------------
function ProjectView({
  project,
  index,
  opacity,
  isMobile,
  onOpenModal,
}: {
  project: (typeof projectsData)[0];
  index: number;
  opacity: number;
  isMobile: boolean;
  onOpenModal: (proj: (typeof projectsData)[0]) => void;
}) {
  const isLeft = index % 2 === 0;

  return (
    <div
      className="absolute inset-0 flex items-center p-6 sm:p-12 transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* DESKTOP VIEWPORT: Opposite Side of the 3D Artifact */}
      {!isMobile && (
        <div
          className={`w-full max-w-lg pointer-events-auto flex flex-col justify-center ${
            isLeft ? 'ml-auto text-left pl-6' : 'mr-auto text-left pr-6'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="font-display font-black text-4xl text-transparent bg-clip-text bg-gradient-to-r from-accent-indigo to-accent-aqua">
              0{index + 1}
            </span>
            <span className="text-xs font-mono text-border font-bold">/</span>
            <span className="text-xs font-mono text-text-2 tracking-widest uppercase">04</span>
            <span className="ml-2 px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest border border-accent-aqua/30 bg-surface/85 text-accent-aqua-ink font-semibold">
              {project.category}
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-display font-extrabold uppercase text-text tracking-tight leading-tight mb-2">
            {project.name}
          </h2>

          <p className="text-xs font-mono text-accent-aqua-ink mb-3">{project.tagline}</p>

          <p className="text-xs text-text-2 leading-relaxed mb-4 max-w-md bg-surface/85 p-3.5 rounded-xl border border-white/10 backdrop-blur-md">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5 max-w-md">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded text-[10px] font-mono border border-border/30 bg-surface/75 text-text-2 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenModal(project)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider bg-accent-indigo text-white font-semibold hover:bg-accent-violet transition-colors cursor-pointer"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono uppercase border border-border/30 bg-surface/75 text-text hover:text-accent-aqua-ink transition-colors"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* MOBILE VIEWPORT: Positioned in Lower Half, Leaving Upper 50% for 3D Artifact */}
      {isMobile && (
        <div className="fixed bottom-0 inset-x-0 p-4 pb-6 pointer-events-auto">
          <div className="w-full max-w-sm mx-auto p-4 rounded-2xl bg-surface/95 border border-white/15 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-accent-indigo to-accent-aqua">
                  0{index + 1}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider border border-accent-aqua/30 bg-surface text-accent-aqua-ink font-semibold">
                  {project.category}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onOpenModal(project)}
                className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-accent-indigo text-white font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <h2 className="text-base font-display font-extrabold uppercase text-text tracking-tight mb-1 truncate">
              {project.name}
            </h2>

            <p className="text-xs text-text-2 line-clamp-2 leading-relaxed mb-2.5">
              {project.description}
            </p>

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/15">
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.5 rounded text-[9px] font-mono border border-border/25 text-text-2 bg-surface"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded-md border border-border/30 text-text hover:text-accent-aqua-ink"
                  aria-label="GitHub Repository"
                >
                  <GithubIcon className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
