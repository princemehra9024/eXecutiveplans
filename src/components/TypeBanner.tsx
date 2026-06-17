import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

/* ── tiny helper: split string into chars with staggered reveal ── */
function SplitText({ text, className, delay = 0, style }: { text: string; className?: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <span ref={ref} className={className} style={style} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: char === ' ' ? 'inline' : 'inline-block', willChange: 'transform, opacity' }}
          initial={{ y: '110%', opacity: 0, rotateX: -80 }}
          animate={inView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
          transition={{ duration: 0.7, delay: delay + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function TypeBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  // Parallax transforms for the different text layers
  const exY   = useTransform(scrollYProgress, [0, 1], ['8%',  '-8%']);
  const plansY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const bigEY  = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);

  return (
    <section
      ref={sectionRef}
      id="type-banner"
      className="relative overflow-hidden select-none"
      style={{ background: 'var(--bg-primary)', paddingTop: '2rem', paddingBottom: '4rem' }}
    >
      {/* Ambient glow for dark mode depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(255,255,255,0.035) 0%, transparent 70%)'
        }}
      />
      {/* ── Subtle horizontal rule above ── */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="w-full h-px mb-16 opacity-20" style={{ background: 'var(--text-primary)' }} />
      </div>

      {/* ══════════ ROW 1 ══════════
          Giant floating "E" on the left, then "XECUTIVE" normal weight right
      ══════════════════════════════ */}
      <div className="relative w-full overflow-hidden">

        {/* ── Massive background "E" – purely decorative, scroll parallax ── */}
        <motion.div
          style={{ y: bigEY }}
          className="absolute left-[-4vw] top-1/2 -translate-y-1/2 pointer-events-none z-0 leading-none"
        >
          <span
            className="font-display font-black text-transparent"
            style={{
              fontSize: 'clamp(14rem, 40vw, 38rem)',
              WebkitTextStroke: '2px var(--text-primary)',
              opacity: 0.06,
              lineHeight: 1,
              letterSpacing: '-0.06em',
            }}
          >
            E
          </span>
        </motion.div>

        {/* ── Row content ── */}
        <motion.div
          style={{ y: exY }}
          className="relative z-10 flex items-end gap-0 md:gap-2 px-6 md:px-16"
        >
          {/* "EXECUTIVE" – huge solid, with ghost offset layer for 3D depth */}
          <div className="overflow-hidden leading-[0.88] relative">
            {/* Ghost/shadow copy for 3D depth illusion */}
            <span
              aria-hidden="true"
              className="absolute font-display font-black pointer-events-none block select-none"
              style={{
                fontSize: 'clamp(4.5rem, 14vw, 14rem)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.04em',
                lineHeight: 0.88,
                opacity: 0.06,
                transform: 'translate(6px, 6px)',
                top: 0, left: 0,
              }}
            >
              EXECUTIVE
            </span>
            <SplitText
              text="EXECUTIVE"
              delay={0}
              className="font-display font-black block relative z-10"
              style={{
                fontSize: 'clamp(4.5rem, 14vw, 14rem)',
                color: 'transparent',
                WebkitTextStroke: '1.5px var(--text-primary)',
                letterSpacing: '-0.04em',
                lineHeight: 0.88,
                opacity: 1,
              }}
            />
          </div>

          {/* Year / descriptor label – editorial detail */}
          <motion.div
            className="ml-auto self-end pb-3 md:pb-6 flex flex-col items-end gap-1 shrink-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span
              className="font-body text-right leading-tight"
              style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.55rem, 1.1vw, 0.85rem)', letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              Est. 2023
            </span>
            <span
              className="font-body text-right leading-tight"
              style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.5rem, 1vw, 0.75rem)', letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              Digital Studio
            </span>
            <div className="w-8 h-px mt-1" style={{ background: 'var(--text-primary)', opacity: 0.4 }} />
          </motion.div>
        </motion.div>
      </div>

      {/* ══════════ ROW 2 ══════════
          "PLANS" – extra-bold, solid filled, full bleed. Offset right to
          create the staggered architectural look from the reference.
      ══════════════════════════════ */}
      <motion.div
        style={{ y: plansY }}
        className="relative z-10 flex items-start pl-6 md:pl-24 mt-[-3vw]"
      >
        {/* Vertical description text – echoes the reference poster layout */}
        <motion.div
          className="hidden md:flex flex-col gap-2 pr-8 pt-4 shrink-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p
            className="font-body text-center"
            style={{
              writingMode: 'vertical-rl',
              color: 'var(--text-secondary)',
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: 0.7,
            }}
          >
            Kota · India · Premium Digital
          </p>
        </motion.div>

        {/* "PLANS" – massive, solid filled, with 3D offset shadow */}
        <div className="overflow-hidden leading-[0.88] relative">
          {/* Ghost shadow layer */}
          <span
            aria-hidden="true"
            className="absolute font-display font-black pointer-events-none block select-none"
            style={{
              fontSize: 'clamp(5rem, 18vw, 18rem)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.05em',
              lineHeight: 0.88,
              opacity: 0.08,
              transform: 'translate(8px, 8px)',
              top: 0, left: 0,
            }}
          >
            PLANS
          </span>
          <SplitText
            text="PLANS"
            delay={0.15}
            className="font-display font-black block relative z-10"
            style={{
              fontSize: 'clamp(5rem, 18vw, 18rem)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.05em',
              lineHeight: 0.88,
            }}
          />
        </div>

        {/* Subscript tagline floats to the right of PLANS */}
        <motion.div
          className="hidden lg:block self-end pb-3 ml-6 max-w-[160px]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p
            className="font-body leading-snug"
            style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', letterSpacing: '0.05em', opacity: 0.8 }}
          >
            We engineer elite digital experiences that command attention and drive exponential growth.
          </p>
        </motion.div>
      </motion.div>

      {/* ══════════ ROW 3 ══════════
          Thin horizontal rule + small caps stat line like the reference
      ══════════════════════════════ */}
      <motion.div
        className="mx-auto max-w-[1600px] px-6 md:px-16 mt-10 md:mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <div className="w-full h-px mb-6 opacity-15" style={{ background: 'var(--text-primary)' }} />
        <div className="flex flex-wrap justify-between items-center gap-4">
          {[
            { label: 'Projects Delivered', value: '40+' },
            { label: 'Industries Served', value: '8' },
            { label: 'Average Delivery', value: '4 Weeks' },
            { label: 'Client Satisfaction', value: '100%' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              className="flex flex-col gap-1"
            >
              <span
                className="font-display font-black"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1 }}
              >
                {stat.value}
              </span>
              <span
                className="font-body uppercase"
                style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'var(--text-secondary)', opacity: 0.9 }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── bottom rule ── */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 mt-10">
        <div className="w-full h-px opacity-10" style={{ background: 'var(--text-primary)' }} />
      </div>
    </section>
  );
}
