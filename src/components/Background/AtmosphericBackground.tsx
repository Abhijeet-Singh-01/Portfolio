import React from 'react';

/** Static color atmosphere; avoids a full-screen canvas and continuously blurred layers. */
export const AtmosphericBackground: React.FC = () => (
  <div
    className="pointer-events-none fixed inset-0 z-0"
    aria-hidden="true"
    style={{
      background: [
        'radial-gradient(ellipse at 12% 10%, var(--accent-indigo-glow), transparent 32%)',
        'radial-gradient(ellipse at 88% 18%, var(--accent-magenta-glow), transparent 34%)',
        'radial-gradient(ellipse at 18% 75%, var(--accent-aqua-glow), transparent 34%)',
        'radial-gradient(ellipse at 90% 82%, var(--accent-tangerine-glow), transparent 30%)',
        'var(--bg)',
      ].join(', '),
    }}
  />
);
