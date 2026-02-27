'use client';
import { useState, useEffect, useRef } from 'react';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [exists, setExists] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Check if audio file exists
    fetch('/audio/bgm.mp3', { method: 'HEAD' })
      .then(r => { if (r.ok) setExists(true); })
      .catch(() => {});
  }, []);

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/bgm.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.35;
    }
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  if (!exists) return (
    <div style={{
      position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9000,
      background: 'rgba(10,0,8,0.85)',
      border: '1px solid rgba(255,77,141,0.2)',
      borderRadius: '30px',
      padding: '8px 16px',
      backdropFilter: 'blur(12px)',
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '0.65rem',
      letterSpacing: '0.15em',
      color: 'rgba(255,179,204,0.4)',
    }}>
      ♪ Add bgm.mp3 to /public/audio/
    </div>
  );

  return (
    <button onClick={toggle} style={{
      position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9000,
      background: 'rgba(10,0,8,0.85)',
      border: `1px solid ${playing ? 'rgba(255,77,141,0.5)' : 'rgba(255,77,141,0.2)'}`,
      borderRadius: '30px',
      padding: '10px 20px',
      display: 'flex', alignItems: 'center', gap: '10px',
      backdropFilter: 'blur(12px)',
      cursor: 'pointer',
      boxShadow: playing ? '0 0 20px rgba(255,77,141,0.25)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '16px' }}>
        {[1,2,3,2,1].map((h, i) => (
          <div key={i} style={{
            width: '3px', borderRadius: '2px',
            background: playing ? '#ff4d8d' : 'rgba(255,179,204,0.3)',
            height: playing ? `${h * 4}px` : '3px',
            transition: 'height 0.3s ease',
            animation: playing ? `float ${0.4 + i * 0.08}s ease-in-out infinite alternate` : 'none',
          }} />
        ))}
      </div>
      <span style={{
        fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem',
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: playing ? '#ffb3cc' : 'rgba(255,179,204,0.5)',
      }}>
        {playing ? 'Music On' : 'Music Off'}
      </span>
    </button>
  );
}
