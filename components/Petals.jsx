'use client';
import { useMemo } from 'react';

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: (i * 5.8 + Math.sin(i) * 4) % 95 + '%',
  size: 10 + (i % 5) * 3,
  dur: 9 + (i % 6) * 1.5 + 's',
  delay: (i * 0.8) % 12 + 's',
  hue: 330 + (i % 4) * 10,
}));

export default function Petals() {
  return (
    <div className="pointer-events-none" aria-hidden>
      {PETALS.map(p => (
        <div
          key={p.id}
          className="petal-fall"
          style={{ left: p.left, animationDuration: p.dur, animationDelay: p.delay }}
        >
          <svg width={p.size} height={p.size * 1.4} viewBox="0 0 20 28">
            <ellipse cx="10" cy="14" rx="8" ry="13"
              fill={`hsla(${p.hue},80%,72%,0.65)`}
              transform="rotate(-15 10 14)" />
          </svg>
        </div>
      ))}
    </div>
  );
}
