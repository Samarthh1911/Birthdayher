'use client';
import { useState, useEffect, useRef } from 'react';
import Cursor from './Cursor';
import Petals from './Petals';
import ProgressBar from './ProgressBar';
import HeroSection from './HeroSection';
import GallerySection from './GallerySection';
import FavoritesSection from './FavoritesSection';
import LoveLetterSection from './LoveLetterSection';
import FinaleSection from './FinaleSection';
import MusicPlayer from './MusicPlayer';

export default function MainApp() {
  const [mounted, setMounted] = useState(false);

  // Single, reliable mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    if (!mounted) return;
    let lenis;
    const init = async () => {
      try {
        const mod = await import('@studio-freight/lenis');
        const Lenis = mod.default || mod.Lenis;
        if (!Lenis) return;
        lenis = new Lenis({ duration: 1.3, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
      } catch (e) {
        // Gracefully falls back to default scroll
      }
    };
    init();
    return () => lenis?.destroy();
  }, [mounted]);

  if (!mounted) {
    return (
      <div style={{
        minHeight: '100vh', background: '#050005',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontStyle: 'italic', fontSize: '1.5rem', color: '#ff4d8d',
          animation: 'heartbeat 1.5s ease-in-out infinite',
        }}>
          🌹
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Global ambient layer */}
      <Cursor />
      <Petals />
      <ProgressBar />
      <MusicPlayer />

      <main>
        {/* Phase 1 */}
        <HeroSection />

        {/* Phase 2 */}
        <GallerySection />

        {/* Phase 3 */}
        <FavoritesSection />

        {/* Love letter */}
        <LoveLetterSection />

        {/* Finale */}
        <FinaleSection />
      </main>
    </>
  );
}
