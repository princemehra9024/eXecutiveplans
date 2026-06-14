import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';

/* ── Stats ── */
const STATS = [
  { value: '40+', label: 'Projects Delivered' },
  { value: '8',   label: 'Industries Served'  },
  { value: '4wk', label: 'Avg. Delivery'      },
  { value: '100%',label: 'Client Satisfaction' },
];

/* ── Word-split animated headline ── */
function AnimHeadline({ visible }: { visible: boolean }) {
  // Line 1: ghost style
  const line1 = ['We', 'are', 'a', 'collective'];
  // Line 2: giant filled
  const line2 = ['of', 'digital'];
  // Line 3: outline/stroke
  const line3 = ['natives,'];
  // Line 4: smaller filled
  const line4 = ['obsessed', 'with', 'pushing'];
  // Line 5: mixed
  const line5 = ['the', 'boundaries', 'of'];
  // Line 6: accent ghost
  const line6 = ["what's", 'possible.'];

  const allWords = [...line1, ...line2, ...line3, ...line4, ...line5, ...line6];
  const line1End = line1.length;
  const line2End = line1End + line2.length;
  const line3End = line2End + line3.length;
  const line4End = line3End + line4.length;
  const line5End = line4End + line5.length;

  const wordStyle = (globalIdx: number): React.CSSProperties => {
    const isL1 = globalIdx < line1End;
    const isL2 = globalIdx < line2End && globalIdx >= line1End;
    const isL3 = globalIdx < line3End && globalIdx >= line2End;
    const isL6 = globalIdx >= line5End;
    return {
      display: 'inline-block',
      marginRight: '0.22em',
      fontFamily: 'var(--font-display)',
      fontWeight: isL2 || isL3 ? 900 : 800,
      letterSpacing: '-0.04em',
      lineHeight: 1,
      // Line 2 "of digital" — HUGE
      fontSize: isL2
        ? 'clamp(3.5rem, 9vw, 8rem)'
        : isL3
        ? 'clamp(3.5rem, 9vw, 8rem)'
        : isL6
        ? 'clamp(2rem, 5.5vw, 5rem)'
        : 'clamp(1.6rem, 4vw, 3.8rem)',
      // stroke/outline for L3 "natives"
      WebkitTextStroke: isL3 ? '2px var(--text-primary)' : '0px',
      WebkitTextFillColor: isL3 ? 'transparent' : 'var(--text-primary)',
      color: isL3 ? 'transparent' : 'var(--text-primary)',
      opacity: visible ? (isL1 ? 0.45 : 1) : 0,
      transform: visible ? 'translateY(0) skewX(0deg)' : 'translateY(40px) skewX(-4deg)',
      transition: `opacity 0.65s ${80 + globalIdx * 45}ms cubic-bezier(0.16,1,0.3,1),
                   transform 0.65s ${80 + globalIdx * 45}ms cubic-bezier(0.16,1,0.3,1)`,
    };
  };

  return (
    <div style={{ lineHeight: 0.95 }}>
      {/* Line 1: small */}
      <div style={{ marginBottom: '0.05em' }}>
        {line1.map((w, i) => <span key={i} style={wordStyle(i)}>{w}</span>)}
      </div>

      {/* Line 2+3: GIANT */}
      <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '0 0.15em', marginBottom: '0' }}>
        {line2.map((w, i) => <span key={i} style={wordStyle(line1End + i)}>{w}</span>)}
        {line3.map((w, i) => <span key={i} style={wordStyle(line2End + i)}>{w}</span>)}
      </div>

      {/* Horizontal rule with year stamp */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '16px',
        margin: '16px 0 10px', opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s 600ms ease',
      }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: '0.52rem', fontWeight: 700,
          letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-secondary)',
        }}>EST. 2023 · INDIA · DIGITAL STUDIO</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
      </div>

      {/* Line 4 */}
      <div style={{ marginBottom: '0.05em' }}>
        {line4.map((w, i) => <span key={i} style={wordStyle(line3End + i)}>{w}</span>)}
      </div>

      {/* Line 5 */}
      <div style={{ marginBottom: '0.05em' }}>
        {line5.map((w, i) => <span key={i} style={wordStyle(line4End + i)}>{w}</span>)}
      </div>

      {/* Line 6: large ghost */}
      <div>
        {line6.map((w, i) => <span key={i} style={wordStyle(line5End + i)}>{w}</span>)}
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.15 });
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <section
      ref={ref}
      id="about"
      style={{
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(60px,10vw,120px) 0 clamp(50px,8vw,100px)',
      }}
    >
      {/* Faint grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(var(--border-color) 1px,transparent 1px),
                          linear-gradient(90deg,var(--border-color) 1px,transparent 1px)`,
        backgroundSize: '56px 56px', opacity: 0.2,
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <div style={{
        maxWidth: '1300px', margin: '0 auto',
        padding: '0 clamp(16px,4vw,48px)',
        position: 'relative', zIndex: 1,
      }}>

        {/* ── Top meta bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 'clamp(24px,4vw,48px)',
            paddingBottom: '14px',
            borderBottom: '1px solid var(--border-color)',
            flexWrap: 'wrap', gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              display: 'inline-block', width: '8px', height: '8px',
              borderRadius: '50%', background: 'var(--text-primary)',
              animation: 'ab-blink 2.4s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.52rem', fontWeight: 600,
              letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--text-secondary)',
            }}>
              Studio Manifesto
            </span>
          </div>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '0.58rem', fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-secondary)',
            opacity: 0.5,
          }}>
            §&thinsp;001
          </span>
        </motion.div>

        {/* ── LAYOUT: Headline left | right column ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.35fr) minmax(0,1fr)',
          gap: 'clamp(24px,4vw,60px)',
          alignItems: 'start',
        }}>

          {/* ── LEFT: Animated headline ── */}
          <div>
            <AnimHeadline visible={visible} />
          </div>

          {/* ── RIGHT: Body + stats + CTA ── */}
          <div style={{ paddingTop: 'clamp(0px,4vw,60px)', display: 'flex', flexDirection: 'column', gap: '28px' }}>

            {/* Pull quote */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16,1,0.3,1] }}
              style={{ borderLeft: '2px solid var(--text-primary)', paddingLeft: '18px' }}
            >
              <p style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1.05rem,2.2vw,1.5rem)',
                fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.25,
                color: 'var(--text-primary)', margin: '0 0 12px',
              }}>
                "Based out of nowhere and everywhere."
              </p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'clamp(0.74rem,1.2vw,0.88rem)',
                lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0,
              }}>
                We work with ambitious brands to create experiences that don't just
                exist, but{' '}
                <em style={{ fontStyle: 'normal', color: 'var(--text-primary)', fontWeight: 600 }}>
                  dominate.
                </em>{' '}
                No templates. No fluff. Just raw execution and strategic brilliance.
              </p>
            </motion.div>

            {/* ── Stats grid ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16,1,0.3,1] }}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px',
                border: '1px solid var(--border-color)', borderRadius: '14px',
                overflow: 'hidden', background: 'var(--border-color)',
              }}
            >
              {STATS.map((s, i) => (
                <div key={i} style={{
                  background: 'var(--bg-primary)',
                  padding: 'clamp(12px,2vw,20px)',
                  display: 'flex', flexDirection: 'column', gap: '4px',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-secondary)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-primary)')}
                >
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem,3vw,2.2rem)',
                    fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text-primary)',
                    lineHeight: 1,
                  }}>{s.value}</span>
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.58rem',
                    fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                  }}>{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* ── CTA buttons ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.16,1,0.3,1] }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}
            >
              {/* Primary CTA */}
              <Link
                to="/about"
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  padding: '12px 22px',
                  borderRadius: '999px',
                  background: btnHovered ? 'var(--text-primary)' : 'transparent',
                  border: '1.5px solid var(--text-primary)',
                  fontFamily: 'var(--font-body)', fontWeight: 700,
                  fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: btnHovered ? 'var(--bg-primary)' : 'var(--text-primary)',
                  textDecoration: 'none',
                  transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                Meet the Builders
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '22px', height: '22px', borderRadius: '50%',
                  border: `1.5px solid ${btnHovered ? 'var(--bg-primary)' : 'var(--text-primary)'}`,
                  transition: 'border-color 0.25s',
                }}>
                  <svg width="9" height="9" viewBox="0 0 13 13" fill="none">
                    <path d="M1 12L12 1M12 1H4.5M12 1V8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
              </Link>

              {/* Secondary: View Work */}
              <Link
                to="/work"
                style={{
                  fontFamily: 'var(--font-body)', fontWeight: 600,
                  fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--text-secondary)', textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  transition: 'color 0.2s',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '1px',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                View Our Work
              </Link>
            </motion.div>

          </div>
        </div>

      </div>

      {/* Keyframes injected */}
      <style>{`
        @keyframes ab-blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.3; transform: scale(0.7); }
        }
        @media (max-width: 700px) {
          #about > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
