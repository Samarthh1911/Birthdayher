'use client';
import { useEffect, useRef } from 'react';

const LINES = [
  { text: 'You are the reason', size: '3rem', italic: true, color: '#ffb3cc' },
  { text: 'I believe in beautiful things.', size: '4rem', italic: true, color: '#fff' },
  { text: '—', size: '2rem', italic: false, color: '#ff4d8d' },
  { text: 'Every time you smile,', size: '2.5rem', italic: true, color: '#ffb3cc' },
  { text: 'the whole world gets a little brighter.', size: '2.8rem', italic: true, color: '#fff' },
  { text: '—', size: '2rem', italic: false, color: '#d4af7a' },
  { text: 'You are the cutest, sunderest and best person.', size: '3.5rem', italic: true, color: '#ff4d8d' },
  { text: 'In a hundred lifetimes,', size: '2.2rem', italic: true, color: '#ffb3cc' },
  { text: 'in a hundred worlds,', size: '2.2rem', italic: true, color: '#ffb3cc' },
  { text: 'in any version of reality —', size: '2.5rem', italic: true, color: '#ffb3cc' },
  { text: 'you are an imaginationn exisiting in real', size: '3rem', italic: true, color: '#fff' },
  { text: 'and so many happy returns of the day', size: '4.5rem', italic: true, color: '#ff4d8d' },
  { text: 'CUTU.', size: '3rem', italic: true, color: '#fff' },
  { text: '∞', size: '4rem', italic: false, color: '#d4af7a' },
];

export default function LoveLetterSection() {
  const lineRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.3 });

    lineRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{
      background: 'radial-gradient(ellipse at 70% 30%, rgba(180,0,80,0.09) 0%, transparent 60%), linear-gradient(180deg, #050005, #080006)',
      padding: '7rem 1.5rem',
      overflow: 'hidden', position: 'relative',
    }}>
      {/* Decorative rose */}
      <div style={{
        position: 'absolute', top: '5%', right: '5%', fontSize: '12rem',
        opacity: 0.04, pointerEvents: 'none', userSelect: 'none',
        transform: 'rotate(-15deg)',
      }}>🌹</div>
      <div style={{
        position: 'absolute', bottom: '5%', left: '3%', fontSize: '10rem',
        opacity: 0.04, pointerEvents: 'none', userSelect: 'none',
        transform: 'rotate(10deg)',
      }}>💕</div>

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem',
          letterSpacing: '0.5em', color: '#ffb3cc', opacity: 0.45,
          textTransform: 'uppercase', marginBottom: '4rem',
        }}>Words from the heart</p>

        {LINES.map((line, i) => (
          <div
            key={i}
            ref={el => lineRefs.current[i] = el}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: `clamp(${parseFloat(line.size) * 0.55}rem, ${parseFloat(line.size) * 1.5}vw, ${line.size})`,
              fontStyle: line.italic ? 'italic' : 'normal',
              color: line.color,
              lineHeight: 1.25,
              marginBottom: '0.8rem',
              opacity: 0,
              transform: 'translateY(40px)',
              transition: `opacity 1s ease ${(i % 4) * 0.1}s, transform 1s cubic-bezier(0.22,1,0.36,1) ${(i % 4) * 0.1}s`,
              textShadow: line.color === '#ff4d8d' ? '0 0 30px rgba(255,77,141,0.5)' : 'none',
            }}
          >
            {line.text}
          </div>
        ))}
      </div>
    </section>
  );
}
