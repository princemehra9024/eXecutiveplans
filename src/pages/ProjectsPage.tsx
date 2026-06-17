import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Globe, ExternalLink, X, Eye, ChevronDown } from 'lucide-react';

import { projectsData as allProjects } from '../data/projectsData';

import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const seoFaqs = [
  {
    question: "What types of digital projects do you specialize in?",
    answer: "We specialize in crafting high-end, bespoke websites, progressive web applications, and immersive digital experiences. Our portfolio spans various industries including fintech, healthcare, enterprise software, and creative portfolios."
  },
  {
    question: "How do you ensure the websites you build are SEO-friendly?",
    answer: "SEO is integrated directly into our core development process. We use semantic HTML, optimize asset delivery for blazing fast load times, and implement server-side rendering or static site generation where appropriate. We also ensure your site structure and metadata follow all current best practices."
  },
  {
    question: "What is your typical project timeline?",
    answer: "Most of our comprehensive web projects take between 4 to 12 weeks from initial discovery to final launch. However, highly customized enterprise applications or complex 3D web experiences may require additional time to ensure our standard of quality."
  },
  {
    question: "Do you offer ongoing support and maintenance after launch?",
    answer: "Yes, we offer flexible retainer packages for continuous improvement, security updates, and performance monitoring. Your digital presence is an ongoing investment, and we're here to ensure it scales seamlessly with your business."
  }
];

/* ─── FULLSCREEN MODAL ───────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: typeof allProjects[0]; onClose: () => void }) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    setState('loading');
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-6xl h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          initial={{ scale: 0.94, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.97, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ border: `1px solid ${project.accent}44`, background: '#0e0e0e' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Chrome bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b"
               style={{ background: '#111', borderColor: '#ffffff14', borderTop: `3px solid ${project.accent}` }}>
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
              <span className="w-3 h-3 rounded-full bg-amber-400 opacity-80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 opacity-80" />
            </div>
            <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono"
                 style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid #ffffff0a', color: 'rgba(255,255,255,0.45)' }}>
              <Globe size={11} /> <span>{project.displayUrl}</span>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="ml-auto hover:text-white transition-colors">
                <ExternalLink size={11} />
              </a>
            </div>
            <button className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
                    style={{ border: '1px solid #ffffff14', color: 'rgba(255,255,255,0.5)' }}
                    onClick={onClose}>
              <X size={14} />
            </button>
          </div>

          {state === 'loading' && (
            <div className="h-[2px] w-full" style={{ background: '#ffffff0a' }}>
              <motion.div style={{ background: project.accent, height: '100%' }}
                initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ duration: 2 }} />
            </div>
          )}

          {state !== 'error' ? (
            <iframe
              src={project.url} title={project.displayUrl}
              className="w-full flex-1 border-none transition-opacity duration-500"
              style={{ opacity: state === 'loaded' ? 1 : 0 }}
              onLoad={() => setState('loaded')}
              onError={() => setState('error')}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
              <div className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-15" style={{ background: project.accent }} />
              <img src={project.image} alt={project.title}
                   className="w-full max-w-lg rounded-xl mb-8 relative z-10 opacity-60"
                   style={{ border: `1px solid ${project.accent}33` }} />
              <h3 className="text-2xl font-bold mb-2 text-white relative z-10" style={{ fontFamily: 'var(--font-display)' }}>{project.title}</h3>
              <p className="text-white/45 mb-6 relative z-10 max-w-sm text-sm">{project.desc}</p>
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                 className="relative z-10 px-6 py-3 rounded-full font-bold text-white flex items-center gap-2 transition-transform hover:scale-105 text-sm"
                 style={{ background: project.accent, boxShadow: `0 8px 28px -8px ${project.accent}` }}>
                Open Live Site <ArrowUpRight size={16} />
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── PARALLAX PROJECT CARD ─────────────────────────────────────── */
function ParallaxProject({ project, onClick }: { key?: string | number; project: typeof allProjects[0]; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yImage = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const yText  = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const isLeft = project.align === 'left';

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={`relative w-full flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-10 md:gap-20 py-16 md:py-28`}
    >
      {/* Ghost number */}
      <div
        className="absolute top-1/2 -translate-y-1/2 font-black leading-none select-none pointer-events-none z-0"
        style={{
          fontFamily: 'var(--font-display)',
          color: project.accent,
          opacity: 0.04,
          fontSize: 'clamp(120px, 22vw, 340px)',
          [isLeft ? 'right' : 'left']: '-3%',
        }}
      >
        {project.num}
      </div>

      {/* ── Image card ── */}
      <div
        className="relative w-full md:w-[58%] group cursor-pointer overflow-hidden z-10"
        style={{ borderRadius: '20px', height: 'clamp(320px, 48vw, 580px)' }}
        onClick={onClick}
      >
        {/* Parallax image */}
        <motion.div className="absolute inset-0 w-full h-[130%]" style={{ y: yImage }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-105"
          />
        </motion.div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 transition-opacity duration-500"
             style={{
               background: `linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, transparent 80%)`,
             }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             style={{ background: `radial-gradient(ellipse at 50% 80%, ${project.accent}22 0%, transparent 60%)` }} />

        {/* Category pill — top left */}
        <div className="absolute top-5 left-5 z-20">
          <span className="font-body font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md"
                style={{
                  fontSize: '0.52rem',
                  background: 'rgba(0,0,0,0.6)',
                  border: `1px solid ${project.accent}55`,
                  color: project.accent,
                }}>
            {project.category}
          </span>
        </div>

        {/* Year badge — top right */}
        <div className="absolute top-5 right-5 z-20">
          <span className="font-display font-bold text-white/50 text-xs">{project.year}</span>
        </div>

        {/* Hover CTA circle */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div
            className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-white opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-md gap-1"
            style={{ background: `${project.accent}cc`, border: `1.5px solid ${project.accent}` }}
          >
            <Eye size={20} strokeWidth={1.5} />
            <span className="text-[0.55rem] font-bold tracking-[0.15em] uppercase">Preview</span>
          </div>
        </div>

        {/* Metric strip at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between z-10"
             style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)' }}>
          {project.metrics.map(m => (
            <div key={m.label} className="text-center">
              <div className="font-display font-bold" style={{ fontSize: '0.95rem', color: project.accent, lineHeight: 1 }}>
                {m.val}
              </div>
              <div className="font-body uppercase tracking-widest mt-0.5" style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.45)' }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Border */}
        <div className="absolute inset-0 rounded-[20px] pointer-events-none transition-colors duration-500"
             style={{ border: `1px solid ${project.accent}22` }} />
      </div>

      {/* ── Text content ── */}
      <motion.div
        className="w-full md:w-[38%] flex flex-col z-10"
        style={{ y: yText }}
      >
        {/* Category tag */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[2px] w-10 rounded-full" style={{ background: project.accent }} />
          <span className="font-body font-bold uppercase tracking-[0.2em]"
                style={{ fontSize: '0.6rem', color: project.accent }}>
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h2
          className="font-display font-bold tracking-tighter leading-[0.92] mb-4"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', color: 'var(--text-primary)' }}
        >
          {project.title}
        </h2>

        {/* Subtitle */}
        <p className="font-body font-semibold uppercase tracking-widest mb-4"
           style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
          {project.subtitle}
        </p>

        {/* Description */}
        <p className="font-body leading-relaxed mb-7"
           style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '34ch' }}>
          {project.desc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map(t => (
            <span key={t}
                  className="font-body font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{
                    fontSize: '0.52rem',
                    border: `1px solid ${project.accent}44`,
                    background: `${project.accent}0d`,
                    color: project.accent,
                  }}>
              {t}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px mb-8 w-full" style={{ background: 'var(--border-color)' }} />

        {/* CTA */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.04, boxShadow: `0 12px 36px -8px ${project.accent}77` }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2.5 rounded-full font-body font-bold uppercase tracking-widest"
            style={{
              fontSize: '0.62rem', padding: '0.75rem 1.4rem',
              background: project.accent, color: '#fff',
              boxShadow: `0 6px 24px -6px ${project.accent}66`,
            }}
          >
            <Eye size={13} /> Preview
          </motion.button>
          <a href={project.url} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 font-body font-semibold uppercase tracking-widest transition-all duration-200 hover:gap-3"
             style={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>
            Live Site <ArrowUpRight size={13} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────────── */
export default function ProjectsPage() {
  const [modalProject, setModalProject] = useState<typeof allProjects[0] | null>(null);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="min-h-screen pt-24 pb-24" style={{ background: 'var(--bg-primary)' }}>
      <SEO 
        title="Our Work | Executive Plans" 
        description="Explore our portfolio of bespoke websites, progressive web apps, and immersive digital experiences." 
      />
      {/* ══ HERO ══ */}
      <section className="relative px-6 md:px-12 max-w-[1700px] mx-auto min-h-[65vh] flex flex-col justify-center mb-10 md:mb-20 pt-24">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.12 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--text-primary) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-10 h-[1px]" style={{ background: 'var(--text-primary)' }} />
            <span className="font-body font-bold uppercase tracking-[0.35em] opacity-50"
                  style={{ fontSize: '0.65rem', color: 'var(--text-primary)' }}>
              Our Archive
            </span>
          </motion.div>

          <h1
            className="font-display font-bold tracking-tighter leading-[0.85] mb-12 uppercase"
            style={{ color: 'var(--text-primary)', fontSize: 'clamp(4rem, 12vw, 13rem)' }}
          >
            <div className="flex overflow-hidden pb-3">
              {'SELECTED'.split('').map((char, i) => (
                <motion.span key={i}
                  initial={{ y: '120%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block">{char}</motion.span>
              ))}
            </div>
            <div className="flex items-center gap-8">
              <div className="flex overflow-hidden pb-3">
                {'WORKS'.split('').map((char, i) => (
                  <motion.span key={i}
                    initial={{ y: '120%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.04, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block text-transparent"
                    style={{ WebkitTextStroke: '2px var(--text-primary)' }}>{char}</motion.span>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="hidden md:flex flex-col gap-2 max-w-xs border-l-2 pl-7 py-1 mt-6"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <p className="font-body leading-relaxed opacity-60"
                   style={{ fontSize: '0.95rem', WebkitTextStroke: '0px', color: 'var(--text-primary)' }}>
                  Digital experiences that redefine interaction, aesthetics, and performance.
                </p>
                <span className="font-body font-bold uppercase tracking-[0.2em] opacity-35 flex items-center gap-2"
                      style={{ fontSize: '0.58rem', color: 'var(--text-primary)', WebkitTextStroke: '0px' }}>
                  Scroll to explore <div className="w-4 h-[1px] bg-current" />
                </span>
              </motion.div>
            </div>
          </h1>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="flex items-center gap-8 flex-wrap"
          >
            {[
              { n: '50+', l: 'Projects Shipped' },
              { n: '100%', l: 'Client Satisfaction' },
              { n: '4', l: 'Years of Excellence' },
              { n: '$10M+', l: 'Value Delivered' },
            ].map(({ n, l }) => (
              <div key={l} className="flex flex-col">
                <span className="font-display font-extrabold"
                      style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: 'var(--text-primary)', lineHeight: 1 }}>{n}</span>
                <span className="font-body uppercase tracking-widest mt-0.5"
                      style={{ fontSize: '0.5rem', color: 'var(--text-secondary)' }}>{l}</span>
              </div>
            ))}
          </motion.div>

          {/* Animated divider */}
          <motion.div className="w-full h-px mt-12 relative overflow-hidden" style={{ background: 'var(--border-color)' }}>
            <motion.div className="absolute inset-y-0 left-0 w-[12%]"
              style={{ background: 'var(--text-primary)' }}
              initial={{ x: '-100%' }} animate={{ x: '900%' }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
          </motion.div>
        </div>
      </section>

      {/* ══ PROJECTS LIST ══ */}
      <section className="px-6 md:px-12 max-w-[1600px] mx-auto flex flex-col gap-0 md:gap-4">
        {allProjects.map((project, idx) => (
          <ParallaxProject key={project.id} project={project} onClick={() => setModalProject(project)} />
        ))}
      </section>

      {/* ══ SEO ACCORDION FAQs ══ */}
      <section className="px-6 md:px-12 max-w-[1000px] mx-auto mt-24">
        <h2 className="font-display text-4xl uppercase tracking-tight mb-12 border-b pb-6" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-4">
          {seoFaqs.map((faq, idx) => {
            const isOpen = !!faqOpen[idx];
            return (
              <div 
                key={idx} 
                className="backdrop-blur-md rounded-2xl border overflow-hidden transition-all duration-300"
                style={{ 
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: isOpen ? 'rgba(255,255,255,0.2)' : 'var(--border-color)'
                }}
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-6 font-display text-lg uppercase tracking-tight font-bold transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span>{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} 
                    style={{ color: 'var(--text-secondary)' }}
                  />
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div 
                        className="p-6 pt-0 border-t font-body text-sm md:text-base leading-relaxed"
                        style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══ BOTTOM CTA ══ */}
      <section className="mt-32 mb-16 px-6 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="font-body font-semibold uppercase tracking-[0.2em] mb-6"
          style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}
        >
          Ready to be next?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold tracking-tighter mb-10"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', color: 'var(--text-primary)' }}
        >
          Ready to start a<br />
          <span style={{ opacity: 0.35, fontStyle: 'italic' }}>project?</span>
        </motion.h2>
        <motion.a
          href="/about"
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center gap-3 rounded-full overflow-hidden font-body font-bold uppercase tracking-widest"
          style={{
            fontSize: '0.7rem', padding: '0.9rem 2rem',
            background: 'var(--text-primary)', color: 'var(--bg-primary)',
          }}
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                style={{ background: 'rgba(255,255,255,0.15)' }} />
          Let's Talk <ArrowUpRight className="w-3.5 h-3.5" />
        </motion.a>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modalProject && <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />}
      </AnimatePresence>
    </div>
  );
}
