import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, ExternalLink, Globe, X, Eye, Sparkles } from 'lucide-react';

import { projectsData as projects } from '../data/projectsData';

/* ─── FULLSCREEN MODAL ──────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
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

/* ─── MAIN EXPORT ───────────────────────────────────────────────── */
import { useTheme } from './ThemeProvider';
import dayImg from '../../images/day.png';
import nightImg from '../../images/night.png';

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const [modalProject, setModalProject] = useState<typeof projects[0] | null>(null);
  const { theme } = useTheme();

  // Scroll animations
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 0.25], [50, 0]);
  const titleOp = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  // Duplicate projects for infinite marquee scroll
  const projectSet = [...projects, ...projects, ...projects, ...projects];
  const duplicatedProjects = [...projectSet, ...projectSet]; // Total 24 projects

  return (
    <section ref={sectionRef} id="work" className="relative py-24 md:py-36 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, var(--glow-color) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* ══ SECTION HEADER ══ */}
        <motion.div className="flex flex-col md:flex-row-reverse items-center justify-between text-left mb-16 md:mb-24 px-4 md:px-12 max-w-7xl mx-auto" style={{ y: titleY, opacity: titleOp }}>
          <div className="flex-1 md:pl-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
              <Sparkles size={14} className="text-amber-500" />
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-primary)' }}>Signature Portfolio</span>
            </div>
            <h2 className="text-5xl md:text-[6rem] font-bold tracking-tighter mb-6 leading-none" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              <span className="opacity-40" style={{ WebkitTextStroke: '1px var(--text-primary)', color: 'transparent' }}>Digital</span><br />
              Masterpieces
            </h2>
            <p className="max-w-xl text-sm md:text-lg font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Discover our defining projects—where cutting-edge engineering meets visionary design to create unforgettable digital experiences.
            </p>
          </div>
          
          {/* Day/Night Theme Image */}
          <div className="mt-10 md:mt-0 flex-shrink-0 relative">
            <img 
              src={theme === 'dark' ? nightImg : dayImg} 
              alt={theme === 'dark' ? "Night Artwork" : "Day Artwork"}
              className="w-48 h-auto md:w-80 lg:w-[400px] object-contain drop-shadow-2xl transition-opacity duration-500 ease-in-out hover:scale-105"
              style={{ filter: theme === 'dark' ? 'brightness(0.9) contrast(1.1)' : 'brightness(1.0)' }}
            />
          </div>
        </motion.div>

        {/* ══ MARQUEE SCROLL ══ */}
        <div className="relative w-full overflow-hidden py-10" style={{ perspective: '2000px' }}>
          {/* Edge fade masks */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-64 z-20 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-24 md:w-64 z-20 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }} />
          
          {/* Marquee Track */}
          <div 
            className="flex w-max marquee-track hover:[animation-play-state:paused] gap-6 md:gap-10 px-8 items-center" 
            style={{ animationDuration: '60s' }}
          >
            {duplicatedProjects.map((p, i) => (
              <div 
                key={`${p.id}-${i}`} 
                className="group relative flex-shrink-0 w-[340px] md:w-[460px] h-[500px] md:h-[620px] overflow-hidden transition-all duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] rounded-3xl"
                style={{ background: 'var(--card-bg)' }}
              >
                {/* Background image covering full card */}
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                />

                {/* Overlays for contrast */}
                <div className="absolute inset-0 transition-opacity duration-500"
                     style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)' }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ background: `radial-gradient(ellipse at 50% 80%, ${p.accent}33 0%, transparent 60%)` }} />

                {/* Content Layout - Editorial */}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="font-body font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md"
                          style={{ fontSize: '0.55rem', background: 'rgba(0,0,0,0.5)', border: `1px solid ${p.accent}55`, color: p.accent }}>
                      {p.category}
                    </span>
                    <span className="font-display font-bold text-white/50 text-xs">{p.year}</span>
                  </div>

                  {/* Center - Hover Eye */}
                  <div className="flex-1 cursor-pointer flex items-center justify-center relative" onClick={() => setModalProject(p)}>
                    <div className="absolute opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[0.5s] ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <div className="w-20 h-20 rounded-full flex flex-col items-center justify-center gap-1 backdrop-blur-md text-white shadow-2xl hover:scale-110 transition-transform"
                           style={{ background: `${p.accent}cc`, border: `1px solid ${p.accent}` }}>
                        <Eye size={20} strokeWidth={1.5} />
                        <span className="text-[0.55rem] font-bold tracking-[0.2em] uppercase mt-1">View</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="transform transition-transform duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-3">
                    <h3 className="text-3xl md:text-4xl font-bold mb-3 tracking-tighter leading-[1.0] text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-6 max-w-[90%] text-white/60 font-body">
                      {p.desc}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map(t => (
                          <span key={t} className="text-[0.55rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-sm" 
                                style={{ color: p.accent, border: `1px solid ${p.accent}44`, background: 'rgba(0,0,0,0.3)' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      
                      <a 
                        href={p.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="relative overflow-hidden flex items-center justify-center w-12 h-12 rounded-full border border-transparent transition-all duration-500 hover:scale-110 hover:-translate-y-1 group/link"
                        style={{ background: p.accent, color: '#fff', boxShadow: `0 8px 24px -8px ${p.accent}` }}
                      >
                        <span className="absolute inset-0 opacity-0 group-hover/link:opacity-100 transition-opacity duration-500 mix-blend-overlay bg-white/20" />
                        <ArrowUpRight size={18} strokeWidth={2} className="relative z-10 transition-all duration-500 group-hover/link:rotate-45 group-hover/link:scale-110" />
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Thin Border Overlay to avoid clipping issues */}
                <div className="absolute inset-0 border pointer-events-none rounded-3xl transition-colors duration-500 group-hover:border-transparent" style={{ borderColor: 'var(--border-color)' }} />
              </div>
            ))}
          </div>
        </div>

        {/* ══ VIEW ALL PROJECTS BUTTON ══ */}
        <div className="mt-20 md:mt-32 flex justify-center px-6">
          <Link 
            to="/work" 
            className="group relative flex items-center justify-center w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-full overflow-hidden border transition-transform duration-700 hover:scale-105"
            style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}
          >
            {/* Liquid hover effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />
            <div className="absolute w-[200%] h-[200%] top-[150%] left-1/2 -translate-x-1/2 rounded-[40%] transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:top-[-10%] group-hover:animate-[spin_8s_linear_infinite]" style={{ background: 'var(--text-primary)' }} />
            
            <div className="relative z-10 flex flex-col items-center gap-3 text-center transition-colors duration-500 group-hover:text-[var(--bg-primary)]">
              <span className="text-sm md:text-base font-bold tracking-[0.25em] uppercase" style={{ color: 'inherit' }}>
                View All
              </span>
              <span className="text-[0.65rem] tracking-[0.3em] uppercase opacity-50" style={{ color: 'inherit' }}>
                Projects
              </span>
              <ArrowUpRight size={20} strokeWidth={2} className="mt-2 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-45" style={{ color: 'inherit' }} />
            </div>
          </Link>
        </div>
      </div>

      {/* ══ FULLSCREEN MODAL ══ */}
      <AnimatePresence>
        {modalProject && (
          <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
