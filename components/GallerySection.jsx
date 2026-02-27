'use client';
import { useEffect, useRef } from 'react';

const PHOTOS = [
  { src: '/photos/w0.jpeg', caption: 'That smile stops time', rotate: '-3deg', delay: 0 },
  { src: '/photos/w1.jpeg', caption: 'Eyes that hold galaxies', rotate: '2.5deg', delay: 0.1 },
  { src: '/photos/w2.jpeg', caption: 'My favourite person', rotate: '-1.5deg', delay: 0.2 },
  { src: '/photos/w3.jpeg', caption: 'Effortlessly beautiful', rotate: '3deg', delay: 0 },
  { src: '/photos/w4.jpeg', caption: 'The grace that floors me', rotate: '-2deg', delay: 0.1 },
  { src: '/photos/w6.jpeg', caption: 'She makes every room glow', rotate: '1.5deg', delay: 0.2 },
  { src: '/photos/w7.jpeg', caption: 'Every photo is a favourite', rotate: '-2.5deg', delay: 0 },
];

export default function GallerySection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.photo-item');
    if (!cards?.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = `rotate(${entry.target.dataset.rotate}) translateY(0) scale(1)`;
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} style={{
      background: 'linear-gradient(180deg, #050005 0%, #0e0008 50%, #050005 100%)',
      padding: '6rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,77,141,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,77,141,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        opacity: 0.6,
      }} />

      {/* Section heading */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 2 }}>
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem',
          letterSpacing: '0.5em', color: '#ffb3cc', opacity: 0.45,
          textTransform: 'uppercase', marginBottom: '1rem',
        }}>A gallery of your favourite memories</p>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2.5rem, 8vw, 6rem)',
          fontStyle: 'italic', fontWeight: 700,
          background: 'linear-gradient(135deg, #fff 30%, #ffb3cc)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>The Memories</h2>
        <div className="divider" style={{ marginTop: '1.2rem' }} />
        <p style={{
          fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
          color: '#ffb3cc', opacity: 0.4, fontSize: '1.05rem', marginTop: '1rem',
        }}>Every photo — a piece of my perfection</p>
      </div>

      {/* Photo grid */}
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2.5rem',
        position: 'relative', zIndex: 2,
      }}>
        {PHOTOS.map((photo, i) => (
          <div
            key={i}
            className="photo-item"
            data-rotate={photo.rotate}
            style={{
              rotate: photo.rotate,
              opacity: 0,
              transform: `rotate(${photo.rotate}) translateY(80px) scale(0.85)`,
              transition: `opacity 0.9s ease ${photo.delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${photo.delay}s`,
              transitionDelay: `${photo.delay}s`,
            }}
          >
            <div className="polaroid" style={{
              boxShadow: '0 6px 30px rgba(0,0,0,0.6), 0 0 30px rgba(255,77,141,0.08)',
              rotate: photo.rotate,
            }}>
              <div style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
                  }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                {/* Colour overlay on hover */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(204,0,77,0.25), transparent)',
                  opacity: 0, transition: 'opacity 0.5s',
                  pointerEvents: 'none',
                }} className="photo-overlay" />
              </div>
              {/* Caption */}
              <p style={{
                position: 'absolute', bottom: '8px', left: 0, right: 0,
                textAlign: 'center', fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic', color: '#3d0015',
                fontSize: '0.7rem', letterSpacing: '0.02em',
              }}>{photo.caption}</p>
            </div>

            {/* Glow behind polaroid */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(255,77,141,0.15)',
              filter: 'blur(25px)',
              transform: 'scale(1.1)',
              borderRadius: '4px',
              opacity: 0, transition: 'opacity 0.5s',
              zIndex: -1,
              pointerEvents: 'none',
            }} className="card-glow" />
          </div>
        ))}
      </div>

      {/* Hover effects via inline style injection */}
      <style>{`
        .photo-item:hover .card-glow { opacity: 1 !important; }
        .photo-item:hover .photo-overlay { opacity: 1 !important; }
      `}</style>

      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <svg width="200" height="24" viewBox="0 0 200 24" className="mx-auto" style={{ opacity: 0.2 }}>
          <path d="M0,12 Q50,2 100,12 Q150,22 200,12" stroke="#ff4d8d" strokeWidth="1" fill="none"/>
          <circle cx="100" cy="12" r="3" fill="#ff4d8d"/>
        </svg>
      </div>
    </section>
  );
}
