import React from 'react';

/** Static color atmosphere; avoids a full-screen canvas and continuously blurred layers. */
export const AtmosphericBackground: React.FC = () => (
  <div
    className="pointer-events-none fixed inset-0 z-0"
    aria-hidden="true"
    style={{
      background: [
        'radial-gradient(ellipse at 14% 8%, rgb(87 222 242 / 9%), transparent 34%)',
        'radial-gradient(ellipse at 88% 22%, rgb(103 139 255 / 8%), transparent 36%)',
        'radial-gradient(ellipse at 24% 72%, rgb(165 140 255 / 5%), transparent 34%)',
        'var(--ascent-background)',
      ].join(', '),
    }}
  />
);
