'use client';
import { useEffect, useRef, useState } from 'react';

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  angle: (i / 60) * 360,
  dist: 80 + Math.random() * 200,
  size: 4 + Math.random() * 8,
  color: ['#ff4d8d','#ffb3cc','#d4af7a','#fff','#ff0055','#ffd700','#ff80aa'][i % 7],
  dur: 1.5 + Math.random() * 1.5,
  delay: Math.random() * 0.8,
}));

const MESSAGE_LINES = [
  "Happy Birthday,",
  "Aastha",
];

export default function FinaleSection() {
  const ref = useRef(null);
  const [phase, setPhase] = useState(0); // 0: hidden, 1: show, 2: burst, 3: message
  const hasTriggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasTriggered.current) {
        hasTriggered.current = true;
        setPhase(1);
        setTimeout(() => setPhase(2), 1200);
        setTimeout(() => setPhase(3), 2800);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 40%, #1c0012 0%, #080006 50%, #050005 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      padding: '4rem 1.5rem',
    }}>
      {/* Starfield */}
      {Array.from({ length: 60 }, (_, i) => (
        <div key={i} className="twinkle absolute rounded-full bg-white" style={{
          left: ((i * 41.7) % 99) + '%',
          top: ((i * 27.3) % 95) + '%',
          width: 0.8 + (i % 3) * 0.5 + 'px',
          height: 0.8 + (i % 3) * 0.5 + 'px',
          '--dur': (1.5 + i % 4) + 's',
          '--del': (i * 0.15 % 3) + 's',
        }} />
      ))}

      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,0,80,0.15) 0%, transparent 65%)',
        opacity: phase >= 1 ? 1 : 0,
        transition: 'opacity 2s ease',
      }} />

      {/* Particle burst */}
      {phase >= 2 && PARTICLES.map(p => {
        const rad = p.angle * Math.PI / 180;
        return (
          <div key={p.id} style={{
            position: 'absolute',
            left: '50%', top: '50%',
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: p.color,
            '--tx': (Math.cos(rad) * p.dist) + 'px',
            '--ty': (Math.sin(rad) * p.dist) + 'px',
            '--tr': (Math.random() * 360) + 'deg',
            animation: `confettiBurst ${p.dur}s ease-out ${p.delay}s both`,
            boxShadow: `0 0 6px ${p.color}`,
            pointerEvents: 'none', zIndex: 3,
          }} />
        );
      })}

      {/* Falling petals in finale */}
      {phase >= 3 && Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="petal-fall" style={{
          left: (i * 8.5) + '%',
          animationDuration: (7 + i % 4) + 's',
          animationDelay: (i * 0.5) + 's',
          zIndex: 4,
        }}>
          <span style={{ fontSize: '20px' }}>{['🌸','🌷','🌹','✨'][i % 4]}</span>
        </div>
      ))}

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 5, textAlign: 'center',
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? 'translateY(0)' : 'translateY(60px)',
        transition: 'opacity 1.2s ease, transform 1.2s cubic-bezier(0.22,1,0.36,1)',
      }}>
        {/* Rose */}
        <div style={{
          fontSize: 'clamp(4rem, 12vw, 7rem)',
          marginBottom: '1.5rem',
          filter: 'drop-shadow(0 0 30px rgba(255,77,141,0.6))',
          animation: phase >= 1 ? 'heartbeat 2s ease-in-out infinite' : 'none',
        }}>
          🌹
        </div>

        {/* Happy Birthday */}
        <div style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease 0.3s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.3s',
        }}>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem',
            letterSpacing: '0.5em', color: '#ffb3cc', opacity: 0.5,
            textTransform: 'uppercase', marginBottom: '0.8rem',
          }}>
            with all my love
          </p>

          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.8rem, 6vw, 4rem)',
            color: '#ffb3cc',
            fontStyle: 'italic',
            marginBottom: '0.3rem',
          }}>
            Happy Birthday,
          </h2>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(4rem, 15vw, 10rem)',
            fontWeight: 900, fontStyle: 'italic',
            lineHeight: 0.9,
            background: 'linear-gradient(135deg, #ff4d8d 0%, #ffb3cc 40%, #d4af7a 70%, #ff4d8d 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 40px rgba(255,77,141,0.5))',
            marginBottom: '2rem',
          }}>
            Aastha
          </h1>
        </div>

        {/* Message */}
        <div style={{
          maxWidth: '560px', margin: '0 auto',
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1.5s ease, transform 1.5s cubic-bezier(0.22,1,0.36,1)',
        }}>
          <div className="divider" style={{ marginBottom: '2rem' }} />

          <p style={{
            fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            color: '#ffb3cc',
            lineHeight: 1.8, marginBottom: '2rem',
          }}>
            You are strongest, the most beautiful tulip,.<br/>
            On your birthday and every day after —<br/>
            may you be wrapped in all the love you deserve.
          </p>

          <div className="divider" style={{ marginBottom: '2rem' }} />

          <p style={{
            fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
            fontSize: '1.1rem', color: '#d4af7a', opacity: 0.8,
            lineHeight: 1.7, marginBottom: '2.5rem',
          }}>
            "You are my favourite notification,<br/>
            my favourite distraction,<br/>
            my favourite person." 💕
          </p>

          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '2.5rem',
            color: '#ff4d8d',
            textShadow: '0 0 30px rgba(255,77,141,0.8)',
            marginBottom: '1rem',
          }}>∞</p>

          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.4em',
            color: '#ffb3cc', opacity: 0.4,
            textTransform: 'uppercase',
          }}>
            Made with every beat of my heart ♡
          </p>
        </div>
      </div>
    </section>
  );
}
