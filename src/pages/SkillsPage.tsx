import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft, ChevronRight, ArrowUpRight,
  Layers, Code2, Palette, Film, BarChart3, Box, Sparkles,
} from 'lucide-react';
import SEO from '../components/SEO';

import imgUiUx     from '../assets/skill-uiux.png';
import imgDev      from '../assets/skill-dev.png';
import imgBrand    from '../assets/skill-brand.png';
import imgMotion   from '../assets/skill-motion.png';
import imgStrategy from '../assets/skill-strategy.png';
import img3d       from '../assets/skill-3d.png';

const skills = [
  {
    id: 1, tag: 'Design · UX', category: 'UI/UX ARCHITECT',
    title: 'UI / UX', titleSub: 'DESIGN',
    subtitle: 'Interfaces that feel inevitable',
    description: 'Pixel-perfect digital experiences crafted from wireframe to production. Every interaction intentional, every transition purposeful.',
    Icon: Layers, image: imgUiUx,
    accent: '#8B5CF6', accentDark: '#6D28D9',
    tools: ['Figma', 'Framer', 'Protopie'],
    stat: '120+', statLabel: 'Interfaces',
    bars: [{ l: 'Strategy', v: 92 }, { l: 'Execution', v: 98 }, { l: 'Innovation', v: 94 }],
  },
  {
    id: 2, tag: 'Engineering · Web', category: 'FRONTEND ENGINEER',
    title: 'WEB', titleSub: 'DEV',
    subtitle: 'Code as craft, speed as standard',
    description: 'Blazing-fast React & Next.js applications. We obsess over Core Web Vitals, accessibility, and architecture that scales.',
    Icon: Code2, image: imgDev,
    accent: '#06B6D4', accentDark: '#0891B2',
    tools: ['React', 'Next.js', 'TypeScript'],
    stat: '99', statLabel: 'Lighthouse',
    bars: [{ l: 'Performance', v: 99 }, { l: 'Scalability', v: 95 }, { l: 'DX', v: 97 }],
  },
  {
    id: 3, tag: 'Identity · Visual', category: 'BRAND DIRECTOR',
    title: 'BRAND', titleSub: 'IDENTITY',
    subtitle: 'Identity systems built to last',
    description: 'Logos, typography, color systems and guidelines that communicate instantly and age beautifully.',
    Icon: Palette, image: imgBrand,
    accent: '#F59E0B', accentDark: '#D97706',
    tools: ['Illustrator', 'Brand Sprints', 'Print'],
    stat: '80+', statLabel: 'Brands',
    bars: [{ l: 'Creativity', v: 96 }, { l: 'Consistency', v: 98 }, { l: 'Impact', v: 93 }],
  },
  {
    id: 4, tag: 'Motion · Animation', category: 'MOTION DIRECTOR',
    title: 'MOTION', titleSub: 'DESIGN',
    subtitle: 'Movement that gives meaning',
    description: 'From micro-interactions to cinematic sequences. Motion design that makes products feel alive.',
    Icon: Film, image: imgMotion,
    accent: '#EC4899', accentDark: '#DB2777',
    tools: ['GSAP', 'After Effects', 'Rive'],
    stat: '500+', statLabel: 'Animations',
    bars: [{ l: 'Fluidity', v: 98 }, { l: 'Timing', v: 96 }, { l: 'Storytelling', v: 92 }],
  },
  {
    id: 5, tag: 'Strategy · Growth', category: 'GROWTH STRATEGIST',
    title: 'DIGITAL', titleSub: 'STRATEGY',
    subtitle: 'Data-driven, human-centered',
    description: 'SEO, analytics, CRO and content strategy woven into a clear scalable digital roadmap.',
    Icon: BarChart3, image: imgStrategy,
    accent: '#10B981', accentDark: '#059669',
    tools: ['SEO', 'Analytics', 'CRO'],
    stat: '3×', statLabel: 'Avg Growth',
    bars: [{ l: 'Research', v: 94 }, { l: 'Execution', v: 96 }, { l: 'ROI Focus', v: 98 }],
  },
  {
    id: 6, tag: 'Spatial · Immersive', category: '3D & AR SPECIALIST',
    title: '3D &', titleSub: 'IMMERSIVE',
    subtitle: 'Dimensionality as an edge',
    description: 'WebGL scenes, Three.js experiences and AR that make visitors stop scrolling instantly.',
    Icon: Box, image: img3d,
    accent: '#3B82F6', accentDark: '#2563EB',
    tools: ['Three.js', 'Spline', 'Blender'],
    stat: '60fps', statLabel: 'Experiences',
    bars: [{ l: 'Depth', v: 97 }, { l: 'Performance', v: 93 }, { l: 'Realism', v: 95 }],
  },
];

/* ── Compact Skill Card ─────────────────────────────────────────────── */
function SkillCard({
  skill, isActive, index, onClick,
}: { key?: string | number; skill: typeof skills[0]; isActive: boolean; index: number; onClick: () => void }) {
  const { Icon } = skill;
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97 }}
      className="relative rounded-2xl overflow-hidden focus:outline-none text-left w-full h-full"
      style={{
        border: isActive
          ? `1.5px solid ${skill.accent}`
          : '1.5px solid var(--border-color)',
        boxShadow: isActive
          ? `0 0 24px ${skill.accent}40, 0 4px 20px rgba(0,0,0,0.20)`
          : '0 2px 12px rgba(0,0,0,0.06)',
        background: 'var(--card-bg)',
        transition: 'box-shadow 0.3s, border-color 0.3s',
      }}
    >
      {/* Image strip */}
      <div className="relative overflow-hidden" style={{ height: '72px' }}>
        <img
          src={skill.image}
          alt={skill.title}
          className="w-full h-full object-cover"
          style={{
            transform: isActive ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.6s ease',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: isActive
              ? `linear-gradient(to bottom, transparent 10%, ${skill.accentDark}bb 100%)`
              : 'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.72) 100%)',
          }}
        />
        {/* Category badge */}
        <span
          className="absolute top-2 left-2 font-body font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded"
          style={{
            fontSize: '0.38rem',
            background: 'rgba(0,0,0,0.5)',
            color: isActive ? skill.accent : 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(6px)',
            border: `1px solid ${isActive ? skill.accent + '55' : 'rgba(255,255,255,0.1)'}`,
          }}
        >
          {skill.category}
        </span>
        {/* Stat bubble */}
        <div
          className="absolute bottom-2 right-2 flex flex-col items-end"
        >
          <span
            className="font-display font-extrabold leading-none"
            style={{ fontSize: '0.95rem', color: isActive ? skill.accent : '#fff' }}
          >
            {skill.stat}
          </span>
          <span
            className="font-body uppercase tracking-widest leading-none"
            style={{ fontSize: '0.3rem', color: 'rgba(255,255,255,0.55)', marginTop: '1px' }}
          >
            {skill.statLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-2.5 py-2">
        <div className="flex items-center gap-1.5 mb-1.5">
          <div
            className="w-5 h-5 rounded-lg flex items-center justify-center flex-none"
            style={{
              background: isActive ? `${skill.accent}20` : 'var(--bg-secondary)',
              border: `1px solid ${isActive ? skill.accent + '40' : 'var(--border-color)'}`,
            }}
          >
            <Icon className="w-2.5 h-2.5" style={{ color: isActive ? skill.accent : 'var(--text-secondary)' }} strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div
              className="font-display font-bold truncate leading-tight"
              style={{ fontSize: '0.65rem', color: 'var(--text-primary)' }}
            >
              {skill.title} {skill.titleSub}
            </div>
            <div
              className="font-body truncate"
              style={{ fontSize: '0.42rem', color: 'var(--text-secondary)', marginTop: '0px' }}
            >
              {skill.tag}
            </div>
          </div>
        </div>

        {/* Tool chips */}
        <div className="flex flex-wrap gap-0.5">
          {skill.tools.map((t) => (
            <span
              key={t}
              className="font-body font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
              style={{
                fontSize: '0.35rem',
                background: isActive ? `${skill.accent}15` : 'var(--bg-secondary)',
                border: `1px solid ${isActive ? skill.accent + '40' : 'var(--border-color)'}`,
                color: isActive ? skill.accent : 'var(--text-secondary)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Active accent line */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '2px',
          background: isActive ? skill.accent : 'transparent',
          boxShadow: isActive ? `0 0 8px ${skill.accent}` : 'none',
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
      />
    </motion.button>
  );
}

/* ── Main Page ──────────────────────────────────────────────────────── */
export default function SkillsPage() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const autoRef       = useRef<ReturnType<typeof setTimeout>>();
  const s             = skills[idx];
  const { Icon }      = s;

  const goTo = useCallback((i: number, d: 1 | -1) => {
    setDir(d); setIdx((i + skills.length) % skills.length);
  }, []);

  useEffect(() => {
    autoRef.current = setTimeout(() => goTo(idx + 1, 1), 6500);
    return () => clearTimeout(autoRef.current);
  }, [idx, goTo]);

  // Lock body scroll & hide footer while on this page
  useEffect(() => {
    // Stop Lenis smooth scroll
    if ((window as any).lenis) (window as any).lenis.stop();
    document.body.style.overflow = 'hidden';
    // Hide footer
    const footer = document.querySelector('footer') as HTMLElement | null;
    if (footer) footer.style.display = 'none';
    return () => {
      if ((window as any).lenis) (window as any).lenis.start();
      document.body.style.overflow = '';
      if (footer) footer.style.display = '';
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '72px',
        boxSizing: 'border-box',
        zIndex: 10,
      }}
    >
      <SEO 
        title="Our Capabilities | Executive Plans" 
        description="Discover the elite technologies and skills we use to engineer bespoke digital products." 
      />
      {/* ── Page wrapper: fills remaining height ── */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
          padding: '8px 20px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >

        {/* ── Header row ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <p
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontFamily: 'var(--font-body)', fontWeight: 600,
                fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--text-secondary)', margin: 0,
              }}
            >
              <Sparkles style={{ width: '10px', height: '10px' }} />
              Our Expertise
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(1.4rem, 3.2vw, 2.5rem)',
                color: 'var(--text-primary)', lineHeight: 1,
                letterSpacing: '-0.03em', margin: 0,
              }}
            >
              OUR{' '}
              <span style={{ WebkitTextStroke: '1.5px var(--text-primary)', color: 'transparent' }}>
                SKILLS
              </span>
            </h1>
          </div>

          {/* Counter + nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={idx}
                initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.2 }}
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 900,
                  fontSize: '1.6rem', color: 'var(--text-primary)', lineHeight: 1,
                }}
              >
                0{idx + 1}
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 400, marginLeft: '3px' }}>
                  / 0{skills.length}
                </span>
              </motion.span>
            </AnimatePresence>
            <div style={{ display: 'flex', gap: '6px' }}>
              <motion.button
                onClick={() => goTo(idx - 1, -1)}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  border: '1.5px solid var(--border-color)',
                  background: 'var(--card-bg)', color: 'var(--text-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft style={{ width: '14px', height: '14px' }} />
              </motion.button>
              <motion.button
                onClick={() => goTo(idx + 1, 1)}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: s.accent, color: '#fff',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 16px ${s.accent}55`,
                }}
              >
                <ChevronRight style={{ width: '14px', height: '14px' }} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ── Main body: hero + grid ─────────────────── */}
        <div
          style={{
            flex: 1, minHeight: 0,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '14px',
          }}
        >
          {/* ════ HERO CARD ════ */}
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              minHeight: 0,
            }}
          >
            {/* BG image */}
            <AnimatePresence mode="sync">
              <motion.img
                key={`hero-${idx}`}
                src={s.image} alt={s.title}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%', objectFit: 'cover',
                }}
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1.02, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>

            {/* Overlays */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.1) 70%, transparent 100%)',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 65%)',
            }} />
            <AnimatePresence>
              <motion.div
                key={`ac-${idx}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: `radial-gradient(ellipse at 80% 90%, ${s.accent}35 0%, transparent 55%)`,
                }}
              />
            </AnimatePresence>

            {/* Content */}
            <div
              style={{
                position: 'relative', zIndex: 10,
                height: '100%', display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '20px 24px',
                boxSizing: 'border-box',
              }}
            >
              {/* Top tag */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`tag-${idx}`}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <div
                    style={{
                      width: '34px', height: '34px', borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(255,255,255,0.09)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Icon style={{ width: '15px', height: '15px', color: '#fff' }} strokeWidth={1.4} />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)', fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.18em',
                      fontSize: '0.5rem', color: 'rgba(255,255,255,0.55)',
                    }}
                  >
                    {s.tag}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Bottom content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`body-${idx}`}
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)', fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.2em',
                      fontSize: '0.52rem', color: s.accent, marginBottom: '8px',
                    }}
                  >
                    {s.subtitle}
                  </p>

                  <h2
                    style={{
                      fontFamily: 'var(--font-display)', fontWeight: 900,
                      color: '#fff', lineHeight: 0.86, letterSpacing: '-0.03em',
                      fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                      marginBottom: '10px',
                    }}
                  >
                    {s.title}<br />
                    <span style={{ color: s.accent }}>{s.titleSub}</span>
                  </h2>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)', lineHeight: 1.55,
                      fontSize: '0.72rem', color: 'rgba(255,255,255,0.62)',
                      marginBottom: '14px', maxWidth: '380px',
                    }}
                  >
                    {s.description}
                  </p>

                  {/* Skill bars */}
                  <div style={{ marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {s.bars.map(({ l, v }, bi) => (
                      <div key={l}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                          <span style={{ fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.42rem', color: 'rgba(255,255,255,0.42)' }}>{l}</span>
                          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.42rem', color: s.accent }}>{v}%</span>
                        </div>
                        <div style={{ height: '2px', borderRadius: '999px', background: 'rgba(255,255,255,0.10)' }}>
                          <motion.div
                            key={`hb-${idx}-${l}`}
                            style={{
                              height: '100%', borderRadius: '999px',
                              background: `linear-gradient(to right, ${s.accentDark}, ${s.accent})`,
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${v}%` }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: bi * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tools + CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {s.tools.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontFamily: 'var(--font-body)', fontWeight: 600,
                            textTransform: 'uppercase', letterSpacing: '0.12em',
                            fontSize: '0.42rem', padding: '4px 10px',
                            borderRadius: '999px', backdropFilter: 'blur(6px)',
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.14)',
                            color: 'rgba(255,255,255,0.78)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.06, boxShadow: `0 8px 24px ${s.accent}70` }}
                      whileTap={{ scale: 0.94 }}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        borderRadius: '999px', border: 'none', cursor: 'pointer',
                        fontFamily: 'var(--font-body)', fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.12em',
                        fontSize: '0.52rem', padding: '8px 18px',
                        background: s.accent, color: '#fff',
                        boxShadow: `0 4px 16px ${s.accent}44`,
                      }}
                    >
                      Explore <ArrowUpRight style={{ width: '12px', height: '12px' }} />
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '2px', background: 'rgba(255,255,255,0.07)',
              }}
            >
              <motion.div
                key={`prog-${idx}`}
                style={{ height: '100%', background: s.accent }}
                initial={{ scaleX: 0, transformOrigin: 'left' }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 6.5, ease: 'linear' }}
              />
            </div>
          </div>

          {/* ════ RIGHT: 2×3 skill grid ════ */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: 'repeat(3, 1fr)',
              gap: '10px',
              minHeight: 0,
            }}
          >
            {skills.map((skill, i) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                isActive={i === idx}
                index={i}
                onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
              />
            ))}
          </div>
        </div>

        {/* ── Dot indicators row ─── */}
        <div
          style={{
            flexShrink: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: '6px',
          }}
        >
          {skills.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
              style={{
                height: '5px',
                width: i === idx ? '22px' : '5px',
                borderRadius: '999px',
                border: 'none', cursor: 'pointer',
                background: i === idx ? s.accent : 'var(--border-color)',
                boxShadow: i === idx ? `0 0 6px ${s.accent}` : 'none',
                transition: 'all 0.3s',
              }}
            />
          ))}
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
              style={{
                fontFamily: 'var(--font-body)', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.16em',
                fontSize: '0.44rem', color: s.accent, marginLeft: '8px',
              }}
            >
              {s.title} {s.titleSub}
            </motion.span>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
