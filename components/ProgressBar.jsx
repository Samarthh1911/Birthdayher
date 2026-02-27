'use client';
import { useState, useEffect } from 'react';

export default function ProgressBar() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const fn = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: '3px',
      background: 'rgba(255,77,141,0.08)', zIndex: 9990,
    }}>
      <div style={{
        height: '100%', width: p * 100 + '%',
        background: 'linear-gradient(90deg, #cc004d, #ff4d8d, #ffb3cc)',
        boxShadow: '0 0 8px rgba(255,77,141,0.9)',
        transition: 'width 0.1s linear',
      }} />
    </div>
  );
}
