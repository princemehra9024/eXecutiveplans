import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* ─── DATA ────────────────────────────────────────────────────────────── */
const EXECUTIVE = [
  { letter: 'E', word: 'Exclusive',    desc: 'Only the finest partnerships — we operate at the absolute peak of digital craft.', num: '01' },
  { letter: 'X', word: 'eXcellence',  desc: 'Every pixel and line of code held to an uncompromising standard of perfection.', num: '02' },
  { letter: 'E', word: 'Expertise',   desc: 'Decades of mastery in UI/UX, engineering, and digital strategy.', num: '03' },
  { letter: 'C', word: 'Creativity',  desc: 'Bold concepts and boundary-breaking design that refuse the ordinary.', num: '04' },
  { letter: 'U', word: 'User-Centric',desc: 'Every decision anchored to the human experience — intuitive & accessible.', num: '05' },
  { letter: 'T', word: 'Technology',  desc: 'Future-proof architectures and cutting-edge stacks built for scale.', num: '06' },
  { letter: 'I', word: 'Innovation',  desc: "We don't follow trends — we set them. First-principles thinking always.", num: '07' },
  { letter: 'V', word: 'Vision',      desc: "Long-range thinking that transforms today's MVP into tomorrow's leader.", num: '08' },
  { letter: 'E', word: 'Efficiency',  desc: 'Speed without sacrifice. Lean execution delivering maximum impact.', num: '09' },
];

const PLANS = [
  { letter: 'P', word: 'Professional', desc: 'White-glove service and enterprise-grade deliverables on every engagement.', num: '10' },
  { letter: 'L', word: 'Leadership',   desc: 'We guide brands through digital transformation with total confidence.', num: '11' },
  { letter: 'A', word: 'Advancement',  desc: 'Continuous evolution — every sprint pushes your product past the curve.', num: '12' },
  { letter: 'N', word: 'Next-Level',   desc: "Systems that redefine what's possible tomorrow, built today.", num: '13' },
  { letter: 'S', word: 'Success',      desc: 'Measurable results and outcomes that make stakeholders proud.', num: '14' },
];

const ALL = [...EXECUTIVE, ...PLANS];

/* ─── HOOK: window width ─────────────────────────────────────────────── */
function useWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handle = () => setW(window.innerWidth);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);
  return w;
}

/* ─── ROW (right panel list item) ────────────────────────────────────── */
function Row({
  item, isActive, onHover, index, compact = false,
}: {
  key?: string | number;
  item: typeof ALL[0];
  isActive: boolean;
  onHover: () => void;
  index: number;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onHover}
      onClick={onHover}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: compact ? '8px' : '10px',
        padding: compact ? '9px 10px' : '7px 10px',
        borderRadius: '8px',
        cursor: 'pointer',
        background: isActive ? 'var(--bg-secondary)' : 'transparent',
        border: `1px solid ${isActive ? 'var(--border-color)' : 'transparent'}`,
        transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
        position: 'relative',
        overflow: 'hidden',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Active left accent bar */}
      <motion.div
        animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.22 }}
        style={{
          position: 'absolute',
          left: 0, top: '20%', bottom: '20%',
          width: '2px',
          background: 'var(--text-primary)',
          borderRadius: '1px',
          transformOrigin: 'top',
        }}
      />

      {/* Number */}
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.4rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        color: 'var(--text-secondary)',
        opacity: isActive ? 0.7 : 0.3,
        flexShrink: 0,
        minWidth: '16px',
        transition: 'opacity 0.2s',
      }}>
        {item.num}
      </span>

      {/* Letter */}
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: compact ? '1rem' : '0.9rem',
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: '-0.04em',
        WebkitTextStroke: isActive ? '0px' : '1px var(--text-primary)',
        WebkitTextFillColor: isActive ? 'var(--text-primary)' : 'transparent',
        transition: 'all 0.22s',
        flexShrink: 0,
        width: '14px',
      }}>
        {item.letter}
      </span>

      {/* Word */}
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: compact ? '0.85rem' : '0.78rem',
        fontWeight: isActive ? 700 : 500,
        letterSpacing: '-0.01em',
        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
        flex: 1,
        transition: 'all 0.22s',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {item.word}
      </span>

      {/* Arrow */}
      <motion.span
        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -4 }}
        transition={{ duration: 0.2 }}
        style={{
          fontSize: '0.65rem',
          color: 'var(--text-primary)',
          flexShrink: 0,
        }}
      >
        →
      </motion.span>
    </motion.div>
  );
}

/* ─── FEATURED PANEL ─────────────────────────────────────────────────── */
function FeaturedPanel({
  item, isAutoPlaying, compact,
}: { item: typeof ALL[0]; isAutoPlaying: boolean; compact: boolean }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '14px',
      border: '1px solid var(--border-color)',
      background: 'var(--bg-secondary)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: compact ? '16px' : '22px',
      boxSizing: 'border-box',
      minHeight: compact ? '160px' : '200px',
    }}>
      {/* Giant ghost letter */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${item.num}`}
          initial={{ opacity: 0, scale: 1.3 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            right: '-4%', top: '50%', transform: 'translateY(-50%)',
            fontFamily: 'var(--font-display)',
            fontSize: compact ? 'clamp(5rem, 22vw, 9rem)' : 'clamp(6rem, 16vw, 13rem)',
            fontWeight: 900, lineHeight: 1, letterSpacing: '-0.06em',
            WebkitTextStroke: '1.5px var(--border-color)',
            WebkitTextFillColor: 'transparent',
            pointerEvents: 'none', userSelect: 'none', zIndex: 0,
          }}
        >
          {item.letter}
        </motion.div>
      </AnimatePresence>

      {/* Top: counter + auto */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={`num-${item.num}`}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
            style={{
              fontFamily: 'var(--font-body)', fontSize: '0.55rem', fontWeight: 800,
              letterSpacing: '0.22em', color: 'var(--text-secondary)', opacity: 0.5,
            }}
          >
            {item.num} / {String(ALL.length).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
        {isAutoPlaying && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <span style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: 'var(--text-primary)', opacity: 0.4, display: 'block',
              animation: 'ep-pulse 1.8s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.42rem',
              color: 'var(--text-secondary)', letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>Auto</span>
          </motion.div>
        )}
      </div>

      {/* Bottom: content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${item.num}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: compact ? 'clamp(2rem, 8vw, 3.5rem)' : 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.05em',
              color: 'var(--text-primary)', marginBottom: compact ? '8px' : '10px',
            }}>
              {item.letter}
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: compact ? 'clamp(0.9rem, 3.5vw, 1.3rem)' : 'clamp(1rem, 2vw, 1.7rem)',
              fontWeight: 800, letterSpacing: '-0.03em',
              color: 'var(--text-primary)', lineHeight: 1, marginBottom: compact ? '8px' : '12px',
            }}>
              {item.word}
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: compact ? '0.7rem' : '0.74rem',
              lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0,
              maxWidth: '280px',
            }}>
              {item.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── PROGRESS BAR ───────────────────────────────────────────────────── */
function ProgressBar({ active, total, autoSeconds, isAutoPlaying }: {
  active: number; total: number; autoSeconds: number; isAutoPlaying: boolean;
}) {
  return (
    <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          height: '2px', flex: 1, borderRadius: '999px',
          background: 'var(--border-color)', overflow: 'hidden', position: 'relative',
        }}>
          {i === active && isAutoPlaying && (
            <motion.div
              key={`prog-${active}`}
              style={{ position: 'absolute', inset: 0, background: 'var(--text-primary)', transformOrigin: 'left' }}
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: autoSeconds, ease: 'linear' }}
            />
          )}
          {i < active && (
            <div style={{ position: 'absolute', inset: 0, background: 'var(--text-primary)', opacity: 0.3 }} />
          )}
          {i === active && !isAutoPlaying && (
            <div style={{ position: 'absolute', inset: 0, background: 'var(--text-primary)' }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── MAIN SECTION ───────────────────────────────────────────────────── */
export default function ExecutivePlansSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [mobileTab, setMobileTab] = useState<'executive' | 'plans'>('executive');
  const autoRef = useRef<ReturnType<typeof setInterval>>();
  const AUTO_SECS = 3.5;
  const width = useWidth();

  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  const advance = useCallback(() => {
    setActiveIdx(i => (i + 1) % ALL.length);
  }, []);

  useEffect(() => {
    if (!isHovering) {
      setIsAutoPlaying(true);
      autoRef.current = setInterval(advance, AUTO_SECS * 1000);
    } else {
      setIsAutoPlaying(false);
      clearInterval(autoRef.current);
    }
    return () => clearInterval(autoRef.current);
  }, [isHovering, advance]);

  // Sync mobile tab with active item
  useEffect(() => {
    if (activeIdx < EXECUTIVE.length) setMobileTab('executive');
    else setMobileTab('plans');
  }, [activeIdx]);

  const active = ALL[activeIdx];

  /* ── Shared header ── */
  const Header = (
    <div style={{
      display: 'flex',
      alignItems: isMobile ? 'flex-start' : 'flex-end',
      justifyContent: 'space-between',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '10px' : '16px',
    }}>
      <div>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.52rem', fontWeight: 600,
          letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--text-secondary)',
          marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ display: 'block', width: '20px', height: '1px', background: 'currentColor', opacity: 0.45 }} />
          The Anatomy of Excellence
          <span style={{ display: 'block', width: '20px', height: '1px', background: 'currentColor', opacity: 0.45 }} />
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: isMobile ? 'clamp(1.8rem, 10vw, 2.8rem)' : isTablet ? 'clamp(2rem, 6vw, 3.5rem)' : 'clamp(2rem, 4vw, 4rem)',
          letterSpacing: '-0.05em', lineHeight: 0.88,
          color: 'var(--text-primary)', margin: 0,
        }}>
          EXECUTIVE{' '}
          <span style={{ WebkitTextStroke: '2px var(--text-primary)', WebkitTextFillColor: 'transparent' }}>
            PLANS
          </span>
        </h2>
      </div>
      {!isMobile && (
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.7rem', lineHeight: 1.6,
          color: 'var(--text-secondary)', maxWidth: '260px', margin: 0, textAlign: 'right',
        }}>
          Every letter, every principle — codified into a philosophy that drives everything we build.
        </p>
      )}
    </div>
  );

  /* ── Footer strip ── */
  const Footer = (
    <div style={{
      display: 'flex',
      alignItems: isMobile ? 'flex-start' : 'center',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      paddingTop: '14px',
      borderTop: '1px solid var(--border-color)',
      gap: '12px', flexWrap: 'wrap',
    }}>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: isMobile ? 'clamp(0.8rem, 4vw, 1.1rem)' : 'clamp(0.85rem, 1.8vw, 1.3rem)',
        fontWeight: 700, letterSpacing: '-0.02em',
        color: 'var(--text-primary)', margin: 0,
      }}>
        This is not a brand.{' '}
        <em style={{ fontStyle: 'italic', WebkitTextStroke: '1px var(--text-primary)', WebkitTextFillColor: 'transparent' }}>
          This is a declaration.
        </em>
      </p>
      <a
        href="/about"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '9px 20px', borderRadius: '999px',
          border: '1.5px solid var(--text-primary)',
          background: 'transparent',
          fontFamily: 'var(--font-body)', fontWeight: 700,
          fontSize: '0.65rem', letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--text-primary)',
          textDecoration: 'none', transition: 'background 0.25s, color 0.25s',
          alignSelf: isMobile ? 'flex-start' : 'center',
        }}
        onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--text-primary)'; el.style.color = 'var(--bg-primary)'; }}
        onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = 'var(--text-primary)'; }}
      >
        Our Story
        <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
          <path d="M1 12L12 1M12 1H4.5M12 1V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </a>
    </div>
  );

  /* ══════════════════════ MOBILE LAYOUT ══════════════════════ */
  if (isMobile) {
    return (
      <section id="executive-plans" style={{
        background: 'var(--bg-primary)', padding: '72px 0 32px',
        boxSizing: 'border-box', position: 'relative', overflow: 'hidden',
      }}>
        <style>{`
          @keyframes ep-pulse { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.15;transform:scale(0.75)} }
        `}</style>

        {/* Grid bg */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(var(--border-color) 1px,transparent 1px),linear-gradient(90deg,var(--border-color) 1px,transparent 1px)`,
          backgroundSize: '40px 40px', opacity: 0.15,
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
        }} />

        <div style={{ padding: '0 16px', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {Header}

          {/* Progress bar */}
          <ProgressBar active={activeIdx} total={ALL.length} autoSeconds={AUTO_SECS} isAutoPlaying={isAutoPlaying} />

          {/* Featured panel — compact */}
          <div onTouchStart={() => setIsHovering(true)} onTouchEnd={() => setIsHovering(false)}>
            <FeaturedPanel item={active} isAutoPlaying={isAutoPlaying} compact={true} />
          </div>

          {/* Tab toggle */}
          <div style={{ display: 'flex', borderRadius: '999px', border: '1px solid var(--border-color)', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
            {(['executive', 'plans'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setMobileTab(tab)}
                style={{
                  flex: 1, padding: '9px 0', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 700,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  background: mobileTab === tab ? 'var(--text-primary)' : 'transparent',
                  color: mobileTab === tab ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  transition: 'all 0.22s', borderRadius: mobileTab === tab ? '999px' : '0',
                }}
              >
                {tab === 'executive' ? 'Executive' : 'Plans'}
              </button>
            ))}
          </div>

          {/* List based on tab */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {(mobileTab === 'executive' ? EXECUTIVE : PLANS).map((item, i) => {
              const globalIdx = mobileTab === 'executive' ? i : EXECUTIVE.length + i;
              return (
                <Row
                  key={item.num}
                  item={item}
                  isActive={activeIdx === globalIdx}
                  onHover={() => { setActiveIdx(globalIdx); setIsHovering(false); }}
                  index={i}
                  compact={true}
                />
              );
            })}
          </div>

          {Footer}
        </div>
      </section>
    );
  }

  /* ══════════════════════ TABLET LAYOUT ══════════════════════ */
  if (isTablet) {
    return (
      <section id="executive-plans" style={{
        background: 'var(--bg-primary)', minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '80px 0 32px', boxSizing: 'border-box', position: 'relative', overflow: 'hidden',
      }}>
        <style>{`
          @keyframes ep-pulse { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.15;transform:scale(0.75)} }
        `}</style>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(var(--border-color) 1px,transparent 1px),linear-gradient(90deg,var(--border-color) 1px,transparent 1px)`,
          backgroundSize: '48px 48px', opacity: 0.17,
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
        }} />

        <div style={{
          maxWidth: '900px', margin: '0 auto', padding: '0 24px', width: '100%',
          boxSizing: 'border-box', position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column', gap: '18px',
        }}>
          {Header}
          <ProgressBar active={activeIdx} total={ALL.length} autoSeconds={AUTO_SECS} isAutoPlaying={isAutoPlaying} />

          {/* 2-col: featured | combined list */}
          <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', minHeight: '320px' }}
          >
            <FeaturedPanel item={active} isAutoPlaying={isAutoPlaying} compact={false} />

            {/* Unified list: executive + divider + plans */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'space-between' }}>
              {/* EXECUTIVE label */}
              <div style={{ paddingBottom: '5px', borderBottom: '1px solid var(--border-color)', marginBottom: '3px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-primary)', opacity: 0.45 }}>EXECUTIVE</span>
              </div>
              {EXECUTIVE.map((item, i) => (
                <Row key={item.num} item={item} isActive={activeIdx === i} onHover={() => setActiveIdx(i)} index={i} />
              ))}
              {/* PLANS label */}
              <div style={{ paddingBottom: '5px', paddingTop: '8px', borderBottom: '1px solid var(--border-color)', marginBottom: '3px', marginTop: '4px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-primary)', opacity: 0.45 }}>PLANS</span>
              </div>
              {PLANS.map((item, i) => (
                <Row key={item.num} item={item} isActive={activeIdx === EXECUTIVE.length + i} onHover={() => setActiveIdx(EXECUTIVE.length + i)} index={i + EXECUTIVE.length} />
              ))}
            </div>
          </div>

          {Footer}
        </div>
      </section>
    );
  }

  /* ══════════════════════ DESKTOP LAYOUT ══════════════════════ */
  return (
    <section id="executive-plans" style={{
      background: 'var(--bg-primary)', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '80px 0 32px', boxSizing: 'border-box', position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes ep-pulse { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.15;transform:scale(0.75)} }
      `}</style>

      {/* Grid background */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(var(--border-color) 1px,transparent 1px),linear-gradient(90deg,var(--border-color) 1px,transparent 1px)`,
        backgroundSize: '52px 52px', opacity: 0.18,
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <div style={{
        maxWidth: '1320px', margin: '0 auto',
        padding: '0 24px', width: '100%',
        boxSizing: 'border-box', position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', gap: '20px',
      }}>
        {Header}

        {/* Progress bar */}
        <ProgressBar active={activeIdx} total={ALL.length} autoSeconds={AUTO_SECS} isAutoPlaying={isAutoPlaying} />

        {/* Main body */}
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{ display: 'grid', gridTemplateColumns: '0.85fr 1fr 0.6fr', gap: '12px', minHeight: '340px' }}
        >
          <FeaturedPanel item={active} isAutoPlaying={isAutoPlaying} compact={false} />

          {/* EXECUTIVE column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'space-between' }}>
            <div style={{ paddingBottom: '6px', borderBottom: '1px solid var(--border-color)', marginBottom: '4px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-primary)', opacity: 0.5 }}>EXECUTIVE</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1px', justifyContent: 'space-between' }}>
              {EXECUTIVE.map((item, i) => (
                <Row key={item.num} item={item} isActive={activeIdx === i} onHover={() => setActiveIdx(i)} index={i} />
              ))}
            </div>
          </div>

          {/* PLANS column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'space-between' }}>
            <div style={{ paddingBottom: '6px', borderBottom: '1px solid var(--border-color)', marginBottom: '4px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-primary)', opacity: 0.5 }}>PLANS</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1px', justifyContent: 'space-between' }}>
              {PLANS.map((item, i) => (
                <Row key={item.num} item={item} isActive={activeIdx === EXECUTIVE.length + i} onHover={() => setActiveIdx(EXECUTIVE.length + i)} index={i + EXECUTIVE.length} />
              ))}
              {Array.from({ length: EXECUTIVE.length - PLANS.length }).map((_, i) => (
                <div key={`s-${i}`} style={{ height: '36px' }} />
              ))}
            </div>
          </div>
        </div>

        {Footer}
      </div>
    </section>
  );
}
