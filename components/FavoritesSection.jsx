'use client';
import { useState, useEffect, useRef } from 'react';
import { TulipSVG, DarkChocolateSVG, TedheMedheSVG, SpidermanWebSVG, SpidermanFigureSVG } from './SVGAssets';

const TULIP_COLORS = ['#e83e8c','#ff6eb4','#d63384','#c71585','#ff4d8d','#e91e8c'];

function FloatingCard({ children, style, onClick, message, clicked, className = '' }) {
  return (
    <div className={`absolute select-none cursor-pointer group ${className}`} style={style} onClick={onClick}>
      <div style={{ transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        {children}
        {clicked && (
          <div style={{
            position: 'absolute', top: '-44px', left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(10,0,5,0.9)',
            border: '1px solid rgba(255,77,141,0.4)',
            borderRadius: '20px',
            padding: '6px 14px',
            whiteSpace: 'nowrap',
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            color: '#ffb3cc',
            fontSize: '0.8rem',
            backdropFilter: 'blur(10px)',
            animation: 'slideUp 0.4s cubic-bezier(0.22,1,0.36,1)',
            pointerEvents: 'none',
            zIndex: 10,
          }}>
            {message} ✨
          </div>
        )}
      </div>
    </div>
  );
}

export default function FavoritesSection() {
  const [clicked, setClicked] = useState({});
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const toggle = (id) => setClicked(p => ({ ...p, [id]: !p[id] }));

  const items = [
    { id: 'tulip1', msg: 'Her favourite flowers', className: 'float-a', style: { left: '5%', top: '10%' },
      node: <TulipSVG color="#e83e8c" size={72}/>, label: 'Tulips 🌷' },
    { id: 'choco', msg: 'Dark Chocolate lover!', className: 'float-b', style: { right: '6%', top: '8%' },
      node: <DarkChocolateSVG size={100}/>, label: 'Dark Chocolate 🍫' },
    { id: 'tedhe', msg: 'Her comfort snack', className: 'float-c', style: { right: '8%', bottom: '18%' },
      node: <TedheMedheSVG size={90}/>, label: 'Tedhe Medhe 🍟' },
    { id: 'spider', msg: 'Our favourite superhero', className: 'float-a', style: { left: '8%', bottom: '15%' },
      node: <SpidermanFigureSVG size={90}/>, label: 'Spiderman 🕷️' },
    { id: 'tulip2', msg: 'Pretty like her', className: 'float-b', style: { left: '40%', top: '6%', transform: 'translateX(-50%)' },
      node: <TulipSVG color="#ff6eb4" size={60}/>, label: '' },
    { id: 'heart', msg: 'Endless love', className: 'float-c', style: { right: '38%', bottom: '8%' },
      node: <span style={{ fontSize: '3.5rem', display: 'block' }}>💖</span>, label: '' },
  ];

  return (
    <section ref={ref} style={{
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(180,0,80,0.07) 0%, transparent 60%), linear-gradient(180deg, #050005, #0c0008, #050005)',
      padding: '5rem 1.5rem',
    }}>
      {/* Background webs */}
      <div style={{ position: 'absolute', top: '5%', right: '2%', opacity: 0.15, pointerEvents: 'none' }}>
        <SpidermanWebSVG size={220}/>
      </div>
      <div style={{ position: 'absolute', bottom: '5%', left: '2%', opacity: 0.12, pointerEvents: 'none', transform: 'rotate(30deg)' }}>
        <SpidermanWebSVG size={180}/>
      </div>

      {/* Heading */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '1rem' }}>
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem',
          letterSpacing: '0.5em', color: '#ffb3cc', opacity: 0.45,
          textTransform: 'uppercase', marginBottom: '1rem',
        }}>Everything she loves</p>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2.5rem, 8vw, 6rem)',
          fontStyle: 'italic', fontWeight: 700,
          background: 'linear-gradient(135deg, #fff 30%, #ffb3cc)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>The Little Things</h2>
        <div className="divider" style={{ marginTop: '1.2rem' }} />
        <p style={{
          fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
          color: '#ffb3cc', opacity: 0.4, fontSize: '1rem', marginTop: '1rem',
        }}>Tap each one ✨</p>
      </div>

      {/* Floating items zone */}
      <div style={{ position: 'relative', height: '70vh', maxWidth: '900px', margin: '0 auto', zIndex: 2 }}>
        {items.map(item => (
          <FloatingCard
            key={item.id}
            className={item.className}
            style={{
              ...item.style,
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.8s ease',
            }}
            message={item.msg}
            clicked={clicked[item.id]}
            onClick={() => toggle(item.id)}
          >
            {item.node}
            {item.label && (
              <p style={{
                textAlign: 'center', marginTop: '6px',
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem',
                letterSpacing: '0.15em', color: '#ffb3cc', opacity: 0.5,
              }}>{item.label}</p>
            )}
          </FloatingCard>
        ))}

        {/* Centre tulip bouquet */}
        <div style={{
          position: 'absolute', bottom: '5%', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: '6px', alignItems: 'flex-end',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease 0.3s',
        }}>
          {TULIP_COLORS.map((color, i) => (
            <div key={i} style={{
              animation: `bloomIn ${0.8 + i * 0.15}s cubic-bezier(0.34,1.56,0.64,1) ${0.5 + i * 0.15}s both`,
            }}>
              <TulipSVG color={color} size={36 + (i === 2 || i === 3 ? 18 : i === 1 || i === 4 ? 8 : 0)}/>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div style={{ textAlign: 'center', padding: '0 1.5rem 2rem', position: 'relative', zIndex: 2 }}>
        <p style={{
          fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          color: '#ffb3cc', opacity: 0.7,
          maxWidth: '560px', margin: '0 auto', lineHeight: 1.7,
        }}>
          "These little things are what make you, <em>you</em> —<br/>The most special person."
        </p>
      </div>
    </section>
  );
}
