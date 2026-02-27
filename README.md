# 🌹 Project Aastha — Birthday Surprise

A romantic, cinematic birthday web app built with **Next.js 14**, **Framer Motion**, **GSAP**, and **Tailwind CSS**.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

## ✨ Features

- **Countdown Timer** — Locks the site until Feb 28th with a glowing animated timer
- **Custom Cursor** — Romantic pink cursor with smooth trailing effect
- **Floating Particles** — Canvas-based particle system
- **Photo Gallery** — Masonry layout with GSAP scroll-triggered 3D entrance animations
- **Favorites Section** — Interactive floating elements (tulips, snacks, spider web) with micro-interactions
- **Spiderman Finale** — Animated sequence where Spiderman swings in to "catch" her, followed by a heartfelt message
- **Smooth Scrolling** — Powered by Lenis
- **Audio** — Background music toggle with Howler.js

## 📁 Structure

```
project-aastha/
├── app/
│   ├── globals.css       — All styles & animations
│   ├── layout.js         — Root layout
│   └── page.js           — Main page (orchestrates everything)
├── components/
│   ├── CustomCursor.jsx
│   ├── Particles.jsx
│   ├── CountdownSection.jsx  — Phase 1: Timer
│   ├── HeroSection.jsx        — Phase 1b: Landing
│   ├── PhotoGallery.jsx       — Phase 2: Memories
│   ├── FavoritesSection.jsx   — Phase 3: Little Things
│   ├── SpidermanFinale.jsx    — Phase 4: The Grand Finale
│   ├── AudioPlayer.jsx
│   └── LenisProvider.jsx
├── public/
│   └── photos/            — Aastha's photos (p1.jpg → p7.jpg)
└── package.json
```

## 🎵 Adding Custom Music

Replace the audio URL in `components/AudioPlayer.jsx` with your own track:
```js
src: ['/music/your-song.mp3'],
```
Place the file in `public/music/`.

## 📱 Mobile

Fully responsive — designed mobile-first since she'll likely view it on her phone.

## 🔧 Customizing the Message

Edit the `message` object in `components/SpidermanFinale.jsx` to personalize the final birthday message.

## 🕷️ Notes

- The site automatically unlocks on Feb 28, 2026 00:00
- GSAP & Lenis are loaded asynchronously to avoid SSR issues
- All photos are in `/public/photos/` — replace them as needed

---
*Made with love ♡*
