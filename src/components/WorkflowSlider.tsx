import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════
   STEP DATA
   ═══════════════════════════════════════════════════════════════════════ */

interface Step {
  id: number;
  num: string;
  label: string;
  headline: string;
  sub: string;
  body: string;
  timeline: string;
  tags: string[];
  bg: string;         // slide bg tint in light mode
  bgDark: string;     // slide bg tint in dark mode
  accent: string;
  Scene: () => React.ReactElement;
}

const STEPS: Step[] = [
  {
    id: 1,
    num: '01',
    label: 'Discovery',
    headline: 'We dig deep\nbefore we build.',
    sub: 'Understanding Your World',
    body: "Every great product starts with ruthless curiosity. We dissect your brand, your competitors, and your users' deepest motivations. Discovery isn't a meeting — it's an obsession.",
    timeline: '1 Week',
    tags: ['Brand Audit', 'User Research', 'Market Analysis', 'Roadmap'],
    bg: '#F0FDF8',
    bgDark: '#001a12',
    accent: '#00C896',
    Scene: SceneDiscovery,
  },
  {
    id: 2,
    num: '02',
    label: 'Strategy',
    headline: 'Architecture\nbefore aesthetics.',
    sub: 'Blueprint & Planning',
    body: 'Information hierarchy, user flows, system architecture — every decision is documented before a pixel is designed or a line coded. Strategy is the invisible design that makes everything else possible.',
    timeline: '1 Week',
    tags: ['Wireframes', 'User Flows', 'Tech Stack', 'API Design'],
    bg: '#F5F3FF',
    bgDark: '#0d0b1a',
    accent: '#7C6FFF',
    Scene: SceneStrategy,
  },
  {
    id: 3,
    num: '03',
    label: 'Design',
    headline: 'Interfaces that\nstop the scroll.',
    sub: 'Visual Identity & Motion',
    body: "High-fidelity UI with obsessive typography, spatial precision, and motion that breathes. We don't design screens — we design experiences your users will remember for years.",
    timeline: '1–2 Weeks',
    tags: ['UI System', 'Prototype', 'Motion', 'Design Tokens'],
    bg: '#FFF7F3',
    bgDark: '#1a0d08',
    accent: '#FF6B35',
    Scene: SceneDesign,
  },
  {
    id: 4,
    num: '04',
    label: 'Build',
    headline: 'Code that\nperforms at scale.',
    sub: 'Engineering Excellence',
    body: 'Pixel-perfect frontends. Bulletproof backends. Sub-45ms APIs. Our engineers treat code as craft — every sprint peer-reviewed, every endpoint benchmarked, every interaction 60fps.',
    timeline: '2–4 Weeks',
    tags: ['Frontend', 'Backend', 'QA Testing', 'CI/CD'],
    bg: '#F0F8FF',
    bgDark: '#001016',
    accent: '#00A3FF',
    Scene: SceneBuild,
  },
  {
    id: 5,
    num: '05',
    label: 'Launch',
    headline: 'Deploy. Dominate.\nRepeat.',
    sub: 'Go Live & Grow',
    body: 'Launch day is just the first win. We handle production deployment, analytics wiring, and A/B frameworks — then pivot into growth mode with data-backed strategies that compound over time.',
    timeline: 'Ongoing',
    tags: ['Deploy', 'Analytics', 'Growth', 'Support'],
    bg: '#FDF4FF',
    bgDark: '#12001a',
    accent: '#E040FB',
    Scene: SceneLaunch,
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   SCENE ILLUSTRATIONS  — full bleed, artful SVGs
   ═══════════════════════════════════════════════════════════════════════ */

function SceneDiscovery() {
  return (
    <svg viewBox="0 0 600 480" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Giant magnifier */}
      <circle cx="270" cy="220" r="140" stroke="#00C896" strokeWidth="3" opacity="0.12" />
      <circle cx="270" cy="220" r="140" stroke="#00C896" strokeWidth="2.5" strokeDasharray="879" strokeDashoffset="879" style={{ animation: 'wf2-draw 2.4s ease-out forwards' }} />
      <circle cx="270" cy="220" r="100" stroke="currentColor" strokeWidth="1" opacity="0.06" />
      <line x1="374" y1="324" x2="480" y2="430" stroke="currentColor" strokeWidth="8" strokeLinecap="round" opacity="0.18" />
      <line x1="374" y1="324" x2="480" y2="430" stroke="#00C896" strokeWidth="4" strokeLinecap="round" opacity="0.35" />
      {/* Data lines inside glass */}
      <line x1="195" y1="195" x2="345" y2="195" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.15" style={{ animation: 'wf2-line 0.6s 0.4s both' }} />
      <line x1="195" y1="215" x2="310" y2="215" stroke="#00C896" strokeWidth="2" strokeLinecap="round" opacity="0.3" style={{ animation: 'wf2-line 0.6s 0.6s both' }} />
      <line x1="195" y1="235" x2="330" y2="235" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.12" style={{ animation: 'wf2-line 0.6s 0.8s both' }} />
      <line x1="195" y1="255" x2="285" y2="255" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.1" style={{ animation: 'wf2-line 0.6s 1.0s both' }} />
      {/* Corner cards */}
      <rect x="30" y="60" width="120" height="80" rx="14" stroke="currentColor" strokeWidth="1.5" opacity="0.1" />
      <rect x="38" y="85" width="60" height="6" rx="3" fill="currentColor" opacity="0.1" />
      <rect x="38" y="98" width="90" height="4" rx="2" fill="currentColor" opacity="0.07" />
      <rect x="38" y="109" width="75" height="4" rx="2" fill="currentColor" opacity="0.05" />
      <rect x="450" y="50" width="110" height="90" rx="14" stroke="#00C896" strokeWidth="1.5" opacity="0.2" />
      <rect x="458" y="72" width="55" height="6" rx="3" fill="#00C896" opacity="0.2" />
      <rect x="458" y="85" width="82" height="4" rx="2" fill="currentColor" opacity="0.08" />
      <rect x="458" y="96" width="70" height="4" rx="2" fill="currentColor" opacity="0.06" />
      {/* Target rings */}
      <circle cx="520" cy="360" r="38" stroke="currentColor" strokeWidth="1.5" opacity="0.08" />
      <circle cx="520" cy="360" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.1" />
      <circle cx="520" cy="360" r="8" stroke="#00C896" strokeWidth="2" opacity="0.25" />
      <circle cx="520" cy="360" r="3" fill="#00C896" opacity="0.4" />
      {/* Floating dots */}
      <circle cx="60" cy="350" r="5" fill="#00C896" opacity="0.2" style={{ animation: 'wf2-float 4s ease-in-out infinite' }} />
      <circle cx="430" cy="400" r="4" fill="currentColor" opacity="0.08" style={{ animation: 'wf2-float 5s 0.5s ease-in-out infinite' }} />
      <circle cx="100" cy="430" r="3" fill="#00C896" opacity="0.12" style={{ animation: 'wf2-float 3.5s 1s ease-in-out infinite' }} />
    </svg>
  );
}

function SceneStrategy() {
  return (
    <svg viewBox="0 0 600 480" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Isometric grid / blueprint */}
      <g opacity="0.06">
        {[0,1,2,3,4,5].map(i => (
          <line key={`h${i}`} x1="0" y1={80 + i * 60} x2="600" y2={80 + i * 60} stroke="currentColor" strokeWidth="1" />
        ))}
        {[0,1,2,3,4,5,6,7,8].map(i => (
          <line key={`v${i}`} x1={i * 75} y1="60" x2={i * 75} y2="440" stroke="currentColor" strokeWidth="1" />
        ))}
      </g>
      {/* Central flowchart */}
      <rect x="220" y="60" width="160" height="52" rx="10" stroke="#7C6FFF" strokeWidth="2" fill="none" opacity="0.3" />
      <text x="300" y="91" textAnchor="middle" fill="#7C6FFF" fontSize="13" fontWeight="700" fontFamily="monospace" opacity="0.5">VISION</text>
      {/* Down arrow */}
      <line x1="300" y1="112" x2="300" y2="148" stroke="#7C6FFF" strokeWidth="2" strokeDasharray="5 4" opacity="0.3" />
      <polygon points="292,148 300,164 308,148" fill="#7C6FFF" opacity="0.25" />
      {/* Diamond */}
      <polygon points="300,170 355,215 300,260 245,215" stroke="#7C6FFF" strokeWidth="2" fill="none" opacity="0.25" />
      <text x="300" y="220" textAnchor="middle" fill="#7C6FFF" fontSize="10" fontWeight="600" fontFamily="monospace" opacity="0.4">SCOPE?</text>
      {/* Branches */}
      <line x1="245" y1="215" x2="140" y2="215" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
      <line x1="355" y1="215" x2="460" y2="215" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
      <rect x="80" y="190" width="120" height="50" rx="8" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.15" />
      <text x="140" y="220" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="monospace" opacity="0.2">MVP</text>
      <rect x="400" y="190" width="120" height="50" rx="8" stroke="#7C6FFF" strokeWidth="1.5" fill="none" opacity="0.2" />
      <text x="460" y="220" textAnchor="middle" fill="#7C6FFF" fontSize="9" fontFamily="monospace" opacity="0.35">FULL</text>
      {/* Down from diamond */}
      <line x1="300" y1="260" x2="300" y2="300" stroke="currentColor" strokeWidth="1.5" opacity="0.12" strokeDasharray="5 4" />
      <rect x="220" y="300" width="160" height="52" rx="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.14" />
      <text x="300" y="331" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="monospace" opacity="0.2">ROADMAP</text>
      <line x1="300" y1="352" x2="300" y2="390" stroke="currentColor" strokeWidth="1.5" opacity="0.1" />
      <rect x="215" y="390" width="170" height="52" rx="10" stroke="#7C6FFF" strokeWidth="2" fill="none" opacity="0.2" />
      <text x="300" y="421" textAnchor="middle" fill="#7C6FFF" fontSize="11" fontFamily="monospace" opacity="0.35">EXECUTE ✓</text>
      {/* Floating */}
      <circle cx="60" cy="130" r="4" fill="#7C6FFF" opacity="0.15" style={{ animation: 'wf2-float 4s ease-in-out infinite' }} />
      <circle cx="540" cy="380" r="5" fill="#7C6FFF" opacity="0.12" style={{ animation: 'wf2-float 5s 1s ease-in-out infinite' }} />
    </svg>
  );
}

function SceneDesign() {
  return (
    <svg viewBox="0 0 600 480" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Big screen / artboard */}
      <rect x="80" y="50" width="380" height="260" rx="16" stroke="currentColor" strokeWidth="2" opacity="0.14" />
      <rect x="80" y="50" width="380" height="36" rx="16" fill="currentColor" opacity="0.04" />
      <circle cx="108" cy="68" r="6" fill="#FF5F57" opacity="0.6" />
      <circle cx="126" cy="68" r="6" fill="#FEBC2E" opacity="0.6" />
      <circle cx="144" cy="68" r="6" fill="#28C840" opacity="0.6" />
      {/* UI layout inside */}
      <rect x="100" y="100" width="340" height="32" rx="6" fill="currentColor" opacity="0.06" />
      <rect x="100" y="100" width="140" height="32" rx="6" fill="#FF6B35" opacity="0.12" />
      <rect x="100" y="146" width="210" height="140" rx="8" stroke="currentColor" strokeWidth="1.5" opacity="0.1" />
      <rect x="100" y="146" width="210" height="140" rx="8" fill="currentColor" opacity="0.03" />
      <rect x="325" y="146" width="115" height="64" rx="8" stroke="#FF6B35" strokeWidth="1.5" opacity="0.2" />
      <rect x="325" y="222" width="115" height="64" rx="8" stroke="currentColor" strokeWidth="1.5" opacity="0.08" />
      {/* Color swatches */}
      <circle cx="108" cy="176" r="14" fill="#FF6B35" opacity="0.22" />
      <circle cx="138" cy="176" r="14" fill="currentColor" opacity="0.08" />
      <circle cx="168" cy="176" r="14" fill="currentColor" opacity="0.05" />
      <circle cx="198" cy="176" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.1" />
      {/* Typography specimen */}
      <rect x="108" y="205" width="90" height="14" rx="3" fill="currentColor" opacity="0.12" />
      <rect x="108" y="226" width="180" height="6" rx="2" fill="currentColor" opacity="0.07" />
      <rect x="108" y="239" width="155" height="6" rx="2" fill="currentColor" opacity="0.05" />
      <rect x="108" y="252" width="170" height="6" rx="2" fill="currentColor" opacity="0.04" />
      {/* Pen / stylus */}
      <g transform="translate(500, 80) rotate(135)" opacity="0.3">
        <rect x="0" y="0" width="12" height="70" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
        <polygon points="0,70 6,90 12,70" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="2" y="5" width="8" height="5" fill="currentColor" opacity="0.2" />
      </g>
      {/* Palette rings bottom */}
      <circle cx="120" cy="360" r="22" stroke="#FF6B35" strokeWidth="2" opacity="0.25" fill="none" />
      <circle cx="120" cy="360" r="22" fill="#FF6B35" opacity="0.07" />
      <circle cx="175" cy="360" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.12" fill="none" />
      <circle cx="230" cy="360" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.08" fill="none" />
      <circle cx="285" cy="360" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.06" fill="none" />
      <circle cx="340" cy="360" r="22" fill="currentColor" opacity="0.04" />
      {/* Floating */}
      <circle cx="520" cy="350" r="5" fill="#FF6B35" opacity="0.18" style={{ animation: 'wf2-float 4.5s ease-in-out infinite' }} />
      <circle cx="60" cy="240" r="4" fill="currentColor" opacity="0.08" style={{ animation: 'wf2-float 3.8s 0.8s ease-in-out infinite' }} />
    </svg>
  );
}

function SceneBuild() {
  return (
    <svg viewBox="0 0 600 480" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Terminal window — large */}
      <rect x="60" y="40" width="420" height="280" rx="14" stroke="currentColor" strokeWidth="2" opacity="0.14" />
      <rect x="60" y="40" width="420" height="38" rx="14" fill="currentColor" opacity="0.05" />
      <line x1="60" y1="78" x2="480" y2="78" stroke="currentColor" strokeWidth="1" opacity="0.08" />
      <circle cx="86" cy="59" r="7" fill="#FF5F57" opacity="0.55" />
      <circle cx="108" cy="59" r="7" fill="#FEBC2E" opacity="0.55" />
      <circle cx="130" cy="59" r="7" fill="#28C840" opacity="0.55" />
      {/* Code lines — color-coded syntax */}
      <rect x="86" y="96" width="18" height="5" rx="2" fill="#E040FB" opacity="0.4" />
      <rect x="112" y="96" width="68" height="5" rx="2" fill="#00A3FF" opacity="0.35" />
      <rect x="188" y="96" width="22" height="5" rx="2" fill="currentColor" opacity="0.2" />
      <rect x="218" y="96" width="90" height="5" rx="2" fill="#00C896" opacity="0.3" />

      <rect x="100" y="114" width="24" height="5" rx="2" fill="#FF6B35" opacity="0.35" />
      <rect x="132" y="114" width="110" height="5" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="250" y="114" width="14" height="5" rx="2" fill="#7C6FFF" opacity="0.35" />

      <rect x="100" y="132" width="38" height="5" rx="2" fill="#00A3FF" opacity="0.3" />
      <rect x="146" y="132" width="80" height="5" rx="2" fill="currentColor" opacity="0.12" />

      <rect x="86" y="150" width="16" height="5" rx="2" fill="#E040FB" opacity="0.35" />
      <rect x="110" y="150" width="55" height="5" rx="2" fill="#00C896" opacity="0.28" />

      <rect x="100" y="168" width="28" height="5" rx="2" fill="#FF6B35" opacity="0.3" />
      <rect x="136" y="168" width="95" height="5" rx="2" fill="currentColor" opacity="0.1" />
      <rect x="240" y="168" width="18" height="5" rx="2" fill="#7C6FFF" opacity="0.3" />

      <rect x="100" y="186" width="42" height="5" rx="2" fill="#00A3FF" opacity="0.25" />
      <rect x="150" y="186" width="60" height="5" rx="2" fill="currentColor" opacity="0.1" />

      <rect x="86" y="204" width="20" height="5" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="86" y="222" width="14" height="5" rx="2" fill="#E040FB" opacity="0.3" />
      <rect x="108" y="222" width="50" height="5" rx="2" fill="#00C896" opacity="0.22" />

      {/* Cursor blink */}
      <rect x="86" y="242" width="10" height="16" fill="#00A3FF" opacity="0.3" style={{ animation: 'wf2-blink 1s step-end infinite' }} />

      {/* Git pipeline diagram */}
      <g transform="translate(60, 350)" opacity="0.2">
        <circle cx="20" cy="20" r="8" stroke="#00A3FF" strokeWidth="2" fill="none" />
        <line x1="28" y1="20" x2="72" y2="20" stroke="currentColor" strokeWidth="2" />
        <circle cx="80" cy="20" r="8" stroke="#00A3FF" strokeWidth="2" fill="none" />
        <line x1="88" y1="20" x2="132" y2="20" stroke="currentColor" strokeWidth="2" />
        <circle cx="140" cy="20" r="8" stroke="#00C896" strokeWidth="2" fill="none" />
        <circle cx="140" cy="20" r="4" fill="#00C896" opacity="0.5" />
        <line x1="148" y1="20" x2="192" y2="20" stroke="currentColor" strokeWidth="2" />
        <circle cx="200" cy="20" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="208" y1="20" x2="252" y2="20" stroke="currentColor" strokeWidth="2" />
        <circle cx="260" cy="20" r="8" stroke="#00A3FF" strokeWidth="2" fill="none" />
        {/* Branch */}
        <circle cx="80" cy="-18" r="7" stroke="#7C6FFF" strokeWidth="1.5" fill="none" opacity="0.8" />
        <line x1="80" y1="12" x2="80" y2="-11" stroke="#7C6FFF" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" />
        <text x="95" y="-12" fill="#7C6FFF" fontSize="9" fontFamily="monospace" opacity="0.7">feature/ui</text>
      </g>
      {/* Status badges */}
      <rect x="430" y="340" width="120" height="32" rx="16" stroke="#00C896" strokeWidth="1.5" fill="none" opacity="0.2" />
      <text x="490" y="361" textAnchor="middle" fill="#00C896" fontSize="10" fontWeight="700" fontFamily="monospace" opacity="0.4">✓ PASSED</text>
      <rect x="430" y="385" width="120" height="32" rx="16" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.1" />
      <text x="490" y="406" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="monospace" opacity="0.2">DEPLOYING…</text>
      {/* Float */}
      <circle cx="530" cy="100" r="4" fill="#00A3FF" opacity="0.15" style={{ animation: 'wf2-float 4s ease-in-out infinite' }} />
      <circle cx="50" cy="400" r="5" fill="#7C6FFF" opacity="0.12" style={{ animation: 'wf2-float 5s 0.7s ease-in-out infinite' }} />
    </svg>
  );
}

function SceneLaunch() {
  return (
    <svg viewBox="0 0 600 480" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Rocket — big, central */}
      <g transform="translate(220, 20)">
        <path d="M80 0 C80 0 120 50 120 150 L120 260 L40 260 L40 150 C40 50 80 0 80 0Z"
          stroke="#E040FB" strokeWidth="2.5" fill="none" opacity="0.25" />
        <path d="M80 0 C80 0 120 50 120 150 L120 260 L40 260 L40 150 C40 50 80 0 80 0Z"
          fill="#E040FB" opacity="0.04" />
        {/* Window */}
        <circle cx="80" cy="120" r="24" stroke="#E040FB" strokeWidth="2" fill="none" opacity="0.3" />
        <circle cx="80" cy="120" r="14" stroke="#E040FB" strokeWidth="1.5" fill="none" opacity="0.2" />
        <circle cx="80" cy="120" r="6" fill="#E040FB" opacity="0.2" />
        {/* Fins */}
        <path d="M40 200 L10 260 L40 248Z" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.18" />
        <path d="M120 200 L150 260 L120 248Z" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.18" />
        {/* Flames */}
        <path d="M55 260 L80 320 L105 260" stroke="#FF6B35" strokeWidth="2.5" fill="none" opacity="0.3"
          style={{ animation: 'wf2-flame 0.4s ease-in-out infinite alternate' }} />
        <path d="M62 260 L80 305 L98 260" stroke="#FEBC2E" strokeWidth="2" fill="none" opacity="0.25"
          style={{ animation: 'wf2-flame 0.3s 0.1s ease-in-out infinite alternate' }} />
        <path d="M68 260 L80 295 L92 260" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.15"
          style={{ animation: 'wf2-flame 0.25s 0.05s ease-in-out infinite alternate' }} />
      </g>
      {/* Orbit ellipse */}
      <ellipse cx="300" cy="390" rx="200" ry="30" stroke="currentColor" strokeWidth="1" opacity="0.08"
        strokeDasharray="12 8" />
      <ellipse cx="300" cy="390" rx="200" ry="30" stroke="#E040FB" strokeWidth="1" opacity="0.06"
        strokeDasharray="6 14" />
      {/* Planet */}
      <circle cx="520" cy="380" r="35" stroke="currentColor" strokeWidth="1.5" opacity="0.1" fill="none" />
      <ellipse cx="520" cy="380" rx="35" ry="10" stroke="currentColor" strokeWidth="1" opacity="0.08" fill="none" />
      <circle cx="520" cy="380" r="14" fill="currentColor" opacity="0.04" />
      {/* Stars scattered */}
      {[[60,80],[100,160],[500,60],[540,200],[80,300],[560,300],[150,420],[450,120]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.5 : 1.5}
          fill={i % 2 === 0 ? '#E040FB' : 'currentColor'}
          opacity={i % 2 === 0 ? 0.18 : 0.1}
          style={{ animation: `wf2-float ${3.5 + i * 0.4}s ${i * 0.3}s ease-in-out infinite` }} />
      ))}
      {/* Growth chart */}
      <g transform="translate(40, 300)" opacity="0.18">
        <line x1="0" y1="100" x2="140" y2="100" stroke="currentColor" strokeWidth="2" />
        <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="2" />
        <polyline points="5,95 25,82 45,75 65,55 85,35 105,22 125,8"
          stroke="#E040FB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8" />
        <circle cx="125" cy="8" r="5" fill="#E040FB" opacity="0.5" />
      </g>
      {/* Analytics card */}
      <rect x="40" y="60" width="150" height="90" rx="12" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.1" />
      <rect x="56" y="80" width="60" height="8" rx="3" fill="currentColor" opacity="0.1" />
      <rect x="56" y="95" width="110" height="5" rx="2" fill="currentColor" opacity="0.06" />
      <rect x="56" y="108" width="90" height="5" rx="2" fill="currentColor" opacity="0.05" />
      <text x="56" y="135" fill="#E040FB" fontSize="18" fontWeight="800" fontFamily="monospace" opacity="0.3">+247%</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */

export default function WorkflowSlider() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  const step = STEPS[current];

  const goTo = useCallback((idx: number) => {
    if (idx === current || idx < 0 || idx >= STEPS.length) return;
    setDir(idx > current ? 1 : -1);
    setCurrent(idx);
    setShowInfo(false);
  }, [current]);

  const next = useCallback(() => goTo(current === STEPS.length - 1 ? 0 : current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current === 0 ? STEPS.length - 1 : current - 1), [current, goTo]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      if (r.top > window.innerHeight || r.bottom < 0) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // Swipe
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    touchEnd.current = e.changedTouches[0].clientX;
    const d = touchStart.current - touchEnd.current;
    if (Math.abs(d) > 40) d > 0 ? next() : prev();
  };

  // Slide variants — cinematic
  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0, scale: 0.94 }),
  };

  const numVariants = {
    enter: () => ({ y: 60, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: () => ({ y: -60, opacity: 0 }),
  };

  return (
    <section
      ref={sectionRef}
      id="workflow"
      className="wf2-section"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        '--wf2-accent': step.accent,
        '--wf2-accent-faint': step.accent + '14',
      } as React.CSSProperties}
    >
      {/* ── Ambient background layer that shifts per slide ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          className="wf2-bg-ambient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{ background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${step.accent}25 0%, transparent 80%)`, position: 'absolute', inset: '-20%', zIndex: 0 }}
        />
      </AnimatePresence>

      {/* ── Top label strip ── */}
      <motion.div
        className="wf2-top-strip"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="wf2-section-label">
          <span className="wf2-label-dot" />
          <span>Our Process</span>
        </div>
        <div className="wf2-step-tabs">
          {STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`wf2-step-tab ${i === current ? 'wf2-step-tab--active' : ''}`}
              style={i === current ? { color: step.accent, borderColor: step.accent } : {}}
            >
              {s.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── MAIN SLIDE CANVAS ── */}
      <div className="wf2-canvas">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="wf2-slide glass-card shadow-2xl relative overflow-hidden"
            style={{ padding: 'clamp(2rem, 5vw, 4rem)', margin: '1rem 0' }}
          >
            {/* Added glowing orbital behind the entire slide */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-current opacity-5 pointer-events-none" style={{ color: step.accent }} />
            {/* Giant ghost number — background decoration */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`num-${current}`}
                className="wf2-ghost-num"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.15 }}
                transition={{ duration: 0.6 }}
                style={{ color: step.accent }}
              >
                {step.num}
              </motion.div>
            </AnimatePresence>

            {/* Left pane — text */}
            <div className="wf2-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="wf2-step-badge" style={{ background: step.accent + '18', color: step.accent, borderColor: step.accent + '35' }}>
                  <span className="wf2-step-badge-num">{step.num}</span>
                  <span>/</span>
                  <span>05</span>
                  <span className="wf2-step-badge-div" />
                  <span>{step.label}</span>
                </div>
              </motion.div>

              <motion.h2
                className="wf2-headline"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
              >
                {step.headline.split('\n').map((line, i) => (
                  <span key={i} style={i === 1 ? { display: 'block', background: `linear-gradient(to right, currentColor, ${step.accent})`, WebkitBackgroundClip: 'text', color: 'transparent', filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.1))' } : { display: 'block' }}>
                    {line}
                  </span>
                ))}
              </motion.h2>

              <motion.p
                className="wf2-sub"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                style={{ color: step.accent }}
              >
                — {step.sub}
              </motion.p>

              <motion.p
                className="wf2-body"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
              >
                {step.body}
              </motion.p>

              {/* Tags */}
              <motion.div
                className="wf2-tags"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.34 }}
              >
                {step.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="wf2-tag"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.38 + i * 0.06 }}
                    style={{ '--t-accent': step.accent } as React.CSSProperties}
                  >
                    {tag}
                  </motion.span>
                ))}
                <motion.span
                  className="wf2-tag wf2-tag-time"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.62 }}
                  style={{ background: step.accent + '18', color: step.accent, borderColor: step.accent + '35' }}
                >
                  ⏱ {step.timeline}
                </motion.span>
              </motion.div>
            </div>

            {/* Right pane — illustration */}
            <motion.div
              className="wf2-right"
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="wf2-scene-wrap" style={{ borderColor: step.accent + '25' }}>
                {/* Glow */}
                <div className="wf2-scene-glow"
                  style={{ background: `radial-gradient(ellipse 70% 70% at 60% 40%, ${step.accent}15 0%, transparent 65%)` }}
                />
                {/* Corner decoration */}
                <div className="wf2-scene-corner wf2-scene-corner--tl" style={{ borderColor: step.accent + '40' }} />
                <div className="wf2-scene-corner wf2-scene-corner--br" style={{ borderColor: step.accent + '40' }} />
                <step.Scene />
                {/* Bottom meta bar inside illustration */}
                <div className="wf2-scene-meta">
                  <div className="wf2-scene-meta-dot" style={{ background: step.accent }} />
                  <span style={{ color: step.accent }}>{step.label}</span>
                  <span className="wf2-scene-meta-sep">·</span>
                  <span>Phase {step.num}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Info overlay (toggleable) ── */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            className="wf2-info-overlay"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
          >
            <p className="wf2-info-text">{step.body}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BOTTOM NAV BAR — Alt.portfolio style ── */}
      <motion.nav
        className="wf2-nav"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Info toggle */}
        <button
          className={`wf2-nav-btn wf2-nav-info-btn ${showInfo ? 'wf2-nav-btn--active' : ''}`}
          onClick={() => setShowInfo(v => !v)}
          aria-label="Toggle step info"
          style={showInfo ? { background: step.accent, color: '#fff', borderColor: step.accent } : {}}
        >
          <Info size={15} />
        </button>

        {/* Dots — same as Alt.portfolio */}
        <div className="wf2-nav-dots">
          {STEPS.map((s, i) => (
            <button
              key={i}
              className={`wf2-nav-dot ${i === current ? 'wf2-nav-dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Step ${i + 1}: ${s.label}`}
              style={i === current ? { background: step.accent, width: 28 } : {}}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="wf2-nav-counter">
          <AnimatePresence mode="wait">
            <motion.span
              key={step.num}
              className="wf2-nav-count-cur"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {step.num}
            </motion.span>
          </AnimatePresence>
          <span className="wf2-nav-count-sep">/</span>
          <span className="wf2-nav-count-tot">05</span>
        </div>

        {/* Arrows */}
        <button className="wf2-nav-arrow" onClick={prev} aria-label="Previous">
          <ChevronLeft size={17} />
        </button>
        <button className="wf2-nav-arrow wf2-nav-arrow--next" onClick={next} aria-label="Next"
          style={{ background: step.accent, borderColor: step.accent, color: '#fff' }}>
          <ChevronRight size={17} />
        </button>
      </motion.nav>

      {/* ── Hint ── */}
      <motion.p
        className="wf2-hint"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
      >
        ← swipe or use arrow keys →
      </motion.p>

      {/* Inline keyframes */}
      <style>{`
        @keyframes wf2-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes wf2-line {
          from { opacity: 0; transform: scaleX(0); transform-origin: left; }
          to   { opacity: 1; transform: scaleX(1); }
        }
        @keyframes wf2-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes wf2-blink {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0; }
        }
        @keyframes wf2-flame {
          from { transform: scaleY(1) translateY(0); }
          to   { transform: scaleY(0.82) translateY(4px); }
        }
      `}</style>
    </section>
  );
}
