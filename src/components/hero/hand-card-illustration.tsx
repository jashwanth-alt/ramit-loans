export function HandCardIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 420" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f5eed" />
          <stop offset="100%" stopColor="#7c5cfc" />
        </linearGradient>
        <linearGradient id="chipGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0c76a" />
          <stop offset="100%" stopColor="#d99b3c" />
        </linearGradient>
        <linearGradient id="handGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd8ae" />
          <stop offset="100%" stopColor="#f4b787" />
        </linearGradient>
        <filter id="softShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#0a0f2c" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Backdrop blob */}
      <ellipse cx="210" cy="230" rx="175" ry="165" fill="url(#cardGrad)" opacity="0.08" />

      {/* Hand (simplified, stylised) */}
      <path
        d="M120 300c-6-40 4-95 30-118 10-9 24-11 30 2 4-24 26-30 36-16 6-22 30-24 36-4 18-6 34 8 30 28l-10 96c-4 34-30 58-64 58h-28c-30 0-56-20-60-46Z"
        fill="url(#handGrad)"
      />
      <path d="M120 300c-6-40 4-95 30-118 10-9 24-11 30 2" stroke="#e8a06a" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

      {/* Card */}
      <g filter="url(#softShadow)">
        <rect x="88" y="150" width="230" height="146" rx="20" fill="url(#cardGrad)" transform="rotate(-8 203 223)" />
        <rect x="112" y="182" width="34" height="26" rx="6" fill="url(#chipGrad)" transform="rotate(-8 129 195)" />
        <rect x="106" y="252" width="86" height="10" rx="5" fill="white" opacity="0.85" transform="rotate(-8 149 257)" />
        <rect x="106" y="270" width="140" height="8" rx="4" fill="white" opacity="0.5" transform="rotate(-8 176 274)" />
        <circle cx="278" cy="176" r="16" fill="white" opacity="0.25" transform="rotate(-8 278 176)" />
        <circle cx="292" cy="184" r="16" fill="white" opacity="0.35" transform="rotate(-8 292 184)" />
      </g>

      {/* Floating coins */}
      <g>
        <circle cx="330" cy="120" r="26" fill="#1fd1e0" opacity="0.9" />
        <text x="330" y="128" textAnchor="middle" fontSize="22" fontWeight="700" fill="white" fontFamily="sans-serif">
          ₹
        </text>
      </g>
      <g>
        <circle cx="70" cy="150" r="20" fill="#17a367" opacity="0.9" />
        <text x="70" y="157" textAnchor="middle" fontSize="17" fontWeight="700" fill="white" fontFamily="sans-serif">
          ₹
        </text>
      </g>
      <g>
        <circle cx="350" cy="230" r="16" fill="#f0a63a" opacity="0.9" />
        <text x="350" y="236" textAnchor="middle" fontSize="14" fontWeight="700" fill="white" fontFamily="sans-serif">
          ₹
        </text>
      </g>
    </svg>
  );
}
