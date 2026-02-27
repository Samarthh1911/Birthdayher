'use client';
import { useState, useEffect, useCallback } from 'react';

const BIRTHDAY = new Date('2026-02-28T00:00:00');

function getTimeLeft() {
  const diff = BIRTHDAY - new Date();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}

function StarField() {
  const stars = Array.from({ length: 90 }, (_, i) => ({
    x: (i * 37.3 + Math.sin(i * 1.7) * 20) % 100,
    y: (i * 23.7 + Math.cos(i * 2.1) * 15) % 100,
    size: 0.8 + (i % 4) * 0.5,
    dur: 1.5 + (i % 5) * 0.7,
    del: (i % 8) * 0.4,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s, i) => (
        <div key={i} className="twinkle absolute rounded-full bg-white"
          style={{
            left: s.x + '%', top: s.y + '%',
            width: s.size + 'px', height: s.size + 'px',
            '--dur': s.dur + 's', '--del': s.del + 's',
          }} />
      ))}
    </div>
  );
}

function TimerBlock({ val, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative px-5 py-4 md:px-8 md:py-6 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255,77,141,0.06)',
          border: '1px solid rgba(255,77,141,0.25)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 30px rgba(255,77,141,0.15), inset 0 0 30px rgba(255,77,141,0.03)',
          minWidth: '80px',
        }}>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2.2rem, 7vw, 4.5rem)',
          lineHeight: 1,
          color: '#fff',
          textShadow: '0 0 30px rgba(255,77,141,0.9), 0 0 60px rgba(255,77,141,0.4)',
          textAlign: 'center',
          fontWeight: 700,
        }}>
          {String(val).padStart(2, '0')}
        </div>
        {/* Shimmer overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)' }} />
      </div>
      <p className="mt-3 text-center"
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.65rem',
          letterSpacing: '0.35em',
          color: '#ffb3cc',
          opacity: 0.5,
          textTransform: 'uppercase',
        }}>{label}</p>
    </div>
  );
}

export default function HeroSection({ onUnlocked }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());
  const [unlocked, setUnlocked] = useState(false);
  const [burst, setBurst] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade in after mount
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const initial = getTimeLeft();
    if (!initial) {
      setUnlocked(true);
      onUnlocked?.();
      return;
    }

    const id = setInterval(() => {
      const t = getTimeLeft();
      setTimeLeft(t);
      if (!t) {
        clearInterval(id);
        setBurst(true);
        setTimeout(() => { setUnlocked(true); onUnlocked?.(); }, 2200);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [onUnlocked]);

  // Confetti burst
  const confetti = burst ? Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: ['#ff4d8d','#ffb3cc','#d4af7a','#fff','#ff80aa','#ffd700'][i % 6],
    tx: (Math.random() - 0.5) * 400 + 'px',
    ty: (Math.random() * -300 - 50) + 'px',
    tr: Math.random() * 720 - 360 + 'deg',
    size: Math.random() * 10 + 5,
    delay: Math.random() * 0.6 + 's',
  })) : [];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #1c0014 0%, #0a0007 55%, #050005 100%)' }}>

      <StarField />

      {/* Radial atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(200,0,80,0.12) 0%, transparent 70%)',
      }} />

      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: 200 + i * 80 + 'px', height: 200 + i * 80 + 'px',
            left: (10 + i * 15) + '%', top: (5 + i * 12) + '%',
            background: `radial-gradient(circle, rgba(255,${30 + i * 20},${100 + i * 10},0.06) 0%, transparent 70%)`,
            filter: 'blur(40px)',
            transform: `rotate(${i * 30}deg)`,
          }} />
      ))}

      {/* Confetti */}
      {confetti.map(c => (
        <div key={c.id} style={{
          position: 'absolute', left: '50%', top: '50%',
          width: c.size, height: c.size,
          background: c.color,
          borderRadius: '50%',
          '--tx': c.tx, '--ty': c.ty, '--tr': c.tr,
          animation: `confettiBurst 2s ease-out ${c.delay} both`,
          pointerEvents: 'none', zIndex: 20,
        }} />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 1.5s ease', transitionDelay: '0.2s' }}>

        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.65rem',
          letterSpacing: '0.55em',
          color: '#ffb3cc',
          opacity: 0.5,
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>
          For the best person in the world
        </p>

        {/* AASTHA */}
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(4rem, 16vw, 11rem)',
          lineHeight: 0.9,
          fontWeight: 900,
          fontStyle: 'italic',
          background: 'linear-gradient(135deg, #ff4d8d 0%, #ffb3cc 40%, #ff0055 70%, #ff4d8d 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 40px rgba(255,77,141,0.5))',
          marginBottom: '1rem',
        }}>
          Aastha
        </h1>

        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
          fontStyle: 'italic',
          color: '#d4af7a',
          opacity: 0.8,
          letterSpacing: '0.05em',
          marginBottom: '3.5rem',
        }}>
          "The most beautiful chapters are still unwritten."
        </p>

        {/* Timer or Unlocked */}
        {!unlocked ? (
          <div>
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.45em',
              color: '#ffb3cc',
              opacity: 0.4,
              textTransform: 'uppercase',
              marginBottom: '2rem',
            }}>
              Her special day arrives in
            </p>

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 'clamp(12px, 3vw, 32px)' }}>
              {timeLeft && <>
                <TimerBlock val={timeLeft.days} label="Days" />
                <div style={{ paddingTop: '1.2rem', color: '#ff4d8d', fontSize: '2.5rem', fontFamily: 'Playfair Display', opacity: 0.5 }}>:</div>
                <TimerBlock val={timeLeft.hours} label="Hours" />
                <div style={{ paddingTop: '1.2rem', color: '#ff4d8d', fontSize: '2.5rem', fontFamily: 'Playfair Display', opacity: 0.5 }}>:</div>
                <TimerBlock val={timeLeft.mins} label="Mins" />
                <div style={{ paddingTop: '1.2rem', color: '#ff4d8d', fontSize: '2.5rem', fontFamily: 'Playfair Display', opacity: 0.5 }}>:</div>
                <TimerBlock val={timeLeft.secs} label="Secs" />
              </>}
            </div>

            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              color: '#ffb3cc',
              opacity: 0.35,
              fontSize: '1rem',
              marginTop: '2.5rem',
              letterSpacing: '0.05em',
              animation: 'fadeIn 2s ease both, float 4s ease-in-out infinite',
            }}>
              Patience... beautiful things take time ✨
            </p>
          </div>
        ) : (
          <div style={{ animation: 'slideUp 1s cubic-bezier(0.22,1,0.36,1) both' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1.5rem', animation: 'heartbeat 1.5s ease infinite' }}>🌹</div>
            <p style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
              color: '#ff4d8d',
              textShadow: '0 0 30px rgba(255,77,141,0.8)',
              marginBottom: '0.8rem',
            }}>
              Happy Birthday, Aastha! 🎂
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#ffb3cc', opacity: 0.5, fontSize: '0.85rem', letterSpacing: '0.15em', marginBottom: '2.5rem' }}>
              Your surprise awaits ↓ Scroll to begin
            </p>
            <div style={{ fontSize: '1.5rem', animation: 'bounce 2s ease-in-out infinite', color: '#ff4d8d' }}>↓</div>
          </div>
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '120px', background: 'linear-gradient(to bottom, transparent, #050005)' }} />
    </section>
  );
}
