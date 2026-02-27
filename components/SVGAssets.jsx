// All illustrated SVG assets

export function TulipSVG({ color = '#e83e8c', size = 90 }) {
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 60 96" fill="none">
      <line x1="30" y1="96" x2="30" y2="52" stroke="#2d7a3a" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M30 72 C22 65 16 54 24 48 C22 56 27 63 30 72Z" fill="#2d7a3a" opacity="0.9"/>
      <path d="M30 76 C38 69 44 58 36 52 C38 60 33 67 30 76Z" fill="#2d7a3a" opacity="0.9"/>
      {/* Petals */}
      <ellipse cx="30" cy="34" rx="10" ry="22" fill={color} opacity="0.92" transform="rotate(-14 30 34)"/>
      <ellipse cx="30" cy="34" rx="10" ry="22" fill={color} opacity="0.88" transform="rotate(14 30 34)"/>
      <ellipse cx="30" cy="34" rx="9" ry="22" fill={color} opacity="0.95"/>
      <ellipse cx="30" cy="32" rx="5" ry="14" fill="rgba(255,255,255,0.22)" transform="rotate(-6 30 32)"/>
      {/* Stamen */}
      <ellipse cx="30" cy="20" rx="4" ry="5" fill={`${color}cc`}/>
    </svg>
  );
}

export function DarkChocolateSVG({ size = 100 }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 120 90" fill="none">
      {/* Wrapper */}
      <rect x="5" y="5" width="110" height="80" rx="8" fill="#3d1a00"/>
      <rect x="5" y="5" width="110" height="80" rx="8" fill="url(#chocoGrad)" opacity="0.9"/>
      {/* Gold foil */}
      <rect x="12" y="12" width="96" height="66" rx="5" fill="#8B4513" opacity="0.3"/>
      {/* Segments */}
      {[0,1,2].map(row => [0,1,2,3].map(col => (
        <rect key={`${row}-${col}`}
          x={14 + col * 24} y={14 + row * 20} width="20" height="16" rx="2"
          fill="#5c2800" stroke="#3d1a00" strokeWidth="1.5"/>
      )))}
      {/* Shine */}
      <path d="M20 20 Q35 15 50 22" stroke="rgba(255,220,150,0.4)" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Brand text */}
      <text x="60" y="80" textAnchor="middle" fill="#d4af7a" fontSize="7" fontFamily="serif" opacity="0.8">DARK CHOCOLATE</text>
      <defs>
        <linearGradient id="chocoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6b2d00"/>
          <stop offset="100%" stopColor="#2d1000"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TedheMedheSVG({ size = 110 }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 100 140" fill="none">
      {/* Bag shape */}
      <path d="M15 30 Q10 20 20 15 L80 15 Q90 20 85 30 L90 110 Q90 125 75 128 L25 128 Q10 125 10 110 Z" fill="#ff6600"/>
      <path d="M15 30 Q10 20 20 15 L80 15 Q90 20 85 30 L90 110 Q90 125 75 128 L25 128 Q10 125 10 110 Z" fill="url(#bagGrad)"/>
      {/* Crimp top */}
      <rect x="15" y="10" width="70" height="20" rx="4" fill="#cc4400"/>
      {/* Logo area */}
      <ellipse cx="50" cy="75" rx="30" ry="22" fill="#ffe000" opacity="0.9"/>
      <text x="50" y="72" textAnchor="middle" fill="#cc4400" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Tedhe</text>
      <text x="50" y="83" textAnchor="middle" fill="#cc4400" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Medhe</text>
      {/* Chips floating */}
      <ellipse cx="28" cy="48" rx="8" ry="5" fill="#ffe66d" transform="rotate(-20 28 48)" opacity="0.8"/>
      <ellipse cx="72" cy="52" rx="7" ry="4" fill="#ffe66d" transform="rotate(15 72 52)" opacity="0.8"/>
      <ellipse cx="35" cy="100" rx="9" ry="5" fill="#ffe66d" transform="rotate(10 35 100)" opacity="0.7"/>
      {/* Shine */}
      <path d="M22 35 Q50 28 75 35" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <defs>
        <linearGradient id="bagGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,120,0,0.4)"/>
          <stop offset="100%" stopColor="rgba(180,50,0,0.4)"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SpidermanWebSVG({ size = 160 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" opacity="0.25">
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => {
        const rad = angle * Math.PI / 180;
        return <line key={i} x1="80" y1="80"
          x2={80 + 75 * Math.cos(rad)} y2={80 + 75 * Math.sin(rad)}
          stroke="#c0e8ff" strokeWidth="0.8"/>;
      })}
      {[18,35,55,75].map((r, i) => (
        <circle key={i} cx="80" cy="80" r={r} stroke="#c0e8ff" strokeWidth="0.8" fill="none"/>
      ))}
    </svg>
  );
}

export function SpidermanFigureSVG({ size = 140 }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 100 140" fill="none">
      {/* Body */}
      <ellipse cx="50" cy="75" rx="20" ry="28" fill="#CC0000"/>
      {/* Head */}
      <ellipse cx="50" cy="36" rx="17" ry="17" fill="#CC0000"/>
      {/* Web mask lines on head */}
      <ellipse cx="50" cy="36" rx="17" ry="17" fill="none" stroke="#000" strokeWidth="0.5" opacity="0.4"/>
      {[0,45,90,135].map((a,i) => {
        const r = 17 * Math.PI / 180;
        const rad = a * Math.PI / 180;
        return <line key={i} x1="50" y1="36"
          x2={50 + 17*Math.cos(rad)} y2={36 + 17*Math.sin(rad)}
          stroke="#000" strokeWidth="0.4" opacity="0.4"/>;
      })}
      {/* Eyes */}
      <ellipse cx="43" cy="32" rx="6" ry="5.5" fill="white" opacity="0.95"/>
      <ellipse cx="57" cy="32" rx="6" ry="5.5" fill="white" opacity="0.95"/>
      {/* Chest spider */}
      <path d="M50 62 L47 68 L50 66 L53 68Z M50 62 L48 56 L50 59 L52 56Z M50 62 L43 64 L45 61Z M50 62 L57 64 L55 61Z" fill="#000" opacity="0.4"/>
      {/* Blue shorts */}
      <path d="M32 92 Q50 100 68 92 L65 115 Q50 122 35 115Z" fill="#0028cc"/>
      {/* Arms */}
      <path d="M30 72 C18 65 10 75 5 88" stroke="#CC0000" strokeWidth="8" strokeLinecap="round" fill="none"/>
      <path d="M70 72 C82 60 95 55 105 44" stroke="#CC0000" strokeWidth="8" strokeLinecap="round" fill="none"/>
      {/* Web from right hand */}
      <path d="M105 44 L130 20" stroke="#c0e8ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
      <path d="M105 44 L128 30" stroke="#c0e8ff" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      {/* Legs */}
      <path d="M42 118 C38 128 36 135 35 142" stroke="#0028cc" strokeWidth="8" strokeLinecap="round" fill="none"/>
      <path d="M58 118 C62 128 64 135 65 142" stroke="#0028cc" strokeWidth="8" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
