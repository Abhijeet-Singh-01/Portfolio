import React from 'react';
import { personalBio } from '../../data/education';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const DeveloperTerminal: React.FC = () => {
  const reduced=usePrefersReducedMotion();
  return (
    <section className={`developer-terminal ${reduced?'terminal-static':''}`} aria-label="Profile summary terminal">
      <div className="terminal-chrome" aria-hidden="true"><i/><i/><i/><span>PROFILE / SHELL</span></div>
      <div className="terminal-body">
        <p><span className="terminal-prompt">$ whoami</span><br/><span className="terminal-output">{personalBio.name} · {personalBio.role}</span></p>
        <p><span className="terminal-prompt">$ focus</span><br/><span className="terminal-output">{personalBio.corePillars.map(item=>item.title).join(' / ')}</span></p>
        <p><span className="terminal-prompt">$ status</span><br/><span className="terminal-output">{personalBio.status}</span><span className="terminal-caret" aria-hidden="true"/></p>
      </div>
    </section>
  );
};
