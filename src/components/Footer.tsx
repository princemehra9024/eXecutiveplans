import { Link } from 'react-router-dom';
import { ArrowUpRight, Send, Sparkles } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import logoImg from '../assets/executive-logo.png';

export default function Footer() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.2 });
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <footer
      ref={ref}
      className="relative z-10 pt-32 pb-12 px-6 md:px-12 mt-20 overflow-hidden"
      style={{
        background: 'var(--text-primary)', // Inverted: Footer background is text color
        color: 'var(--bg-primary)', // Inverted: Footer text is background color
        borderTopLeftRadius: 'clamp(40px, 8vw, 80px)',
        borderTopRightRadius: 'clamp(40px, 8vw, 80px)',
      }}
    >
      {/* ── Background Grid (Inverted contrast) ── */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(var(--bg-primary) 1px,transparent 1px),
                          linear-gradient(90deg,var(--bg-primary) 1px,transparent 1px)`,
        backgroundSize: '48px 48px', opacity: 0.08,
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 20%, transparent 100%)',
      }} />

      <div className="max-w-[1300px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24 lg:mb-32">
          
          {/* ── LEFT COL: CTA & Email ── */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full" style={{ background: 'var(--bg-primary)' }}>
                <Sparkles size={12} style={{ color: 'var(--text-primary)' }} />
              </span>
              <span className="font-body text-[0.6rem] font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--bg-primary)', opacity: 0.7 }}>
                Let's Create Together
              </span>
            </motion.div>

            {/* Giant Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/contact">
                <h2 className="font-display font-black leading-[0.85] tracking-tighter mb-10 transition-opacity hover:opacity-80"
                    style={{ fontSize: 'clamp(4.5rem, 12vw, 9rem)', color: 'var(--bg-primary)', cursor: 'pointer' }}>
                  LET'S<br />
                  <span style={{ WebkitTextStroke: '2px var(--bg-primary)', color: 'transparent' }}>
                    TALK
                  </span>
                </h2>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-[0.8rem] md:text-[0.9rem] leading-relaxed max-w-md mb-10"
              style={{ color: 'var(--bg-primary)', opacity: 0.75 }}
            >
              Ready to disrupt your industry? Drop your email below and we'll get back to you within 24 hours. No sales pitch, just execution.
            </motion.p>

            {/* Email Input */}
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative flex items-center w-full max-w-md p-2 rounded-full transition-colors"
              style={{ background: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.15)' }}
              onSubmit={e => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="hello@yourcompany.com"
                className="flex-1 bg-transparent px-6 py-3 font-body text-sm outline-none"
                style={{ color: 'var(--bg-primary)' }}
              />
              <button
                type="submit"
                className="group w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative overflow-hidden shadow-lg"
                style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Send className="w-5 h-5 ml-1 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </motion.form>
          </div>

          {/* ── RIGHT COL: Links & Socials ── */}
          <div className="w-full lg:w-auto flex flex-col gap-16 lg:min-w-[400px]">
            {/* Direct Email Link */}
            <motion.a
              href="mailto:executiveplans.in@gmail.com"
              initial={{ opacity: 0, x: 20 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group flex flex-col gap-4 pb-8 transition-colors duration-300 relative"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}
            >
              <span className="font-body text-[0.6rem] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--bg-primary)', opacity: 0.5 }}>
                Email Us
              </span>
              <div className="flex items-center justify-between">
                <span className="font-body text-xl md:text-3xl font-bold tracking-tight transition-colors duration-300"
                      style={{ color: 'var(--bg-primary)' }}>
                  executiveplans.in@gmail.com
                </span>
                <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden relative transition-colors duration-300 group-hover:scale-110"
                     style={{ border: '1.5px solid var(--bg-primary)' }}>
                  <ArrowUpRight className="w-5 h-5 absolute group-hover:translate-x-full group-hover:-translate-y-full transition-transform duration-300" />
                  <ArrowUpRight className="w-5 h-5 absolute -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
                </div>
              </div>
            </motion.a>

            {/* Socials Block */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-body text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-4"
                  style={{ color: 'var(--bg-primary)', opacity: 0.5 }}>
                Socials
                <div className="h-px flex-1" style={{ background: 'var(--bg-primary)', opacity: 0.2 }} />
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Instagram', 'Twitter / X', 'LinkedIn', 'Awwwards'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="relative overflow-hidden font-body text-[0.65rem] font-bold uppercase tracking-widest px-6 py-3.5 rounded-full transition-all duration-500 hover:-translate-y-1 hover:shadow-lg group"
                    style={{
                      border: '1px solid rgba(255,255,255,0.15)',
                      background: 'transparent',
                      color: 'var(--bg-primary)',
                    }}
                  >
                    <span className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-[101%] group-hover:translate-y-0" style={{ background: 'var(--bg-primary)' }} />
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-[var(--text-primary)]">
                      {platform}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Internal Links Block */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-body text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-4"
                  style={{ color: 'var(--bg-primary)', opacity: 0.5 }}>
                Sitemap
                <div className="h-px flex-1" style={{ background: 'var(--bg-primary)', opacity: 0.2 }} />
              </h3>
              <div className="flex flex-wrap gap-4 font-display font-bold text-lg">
                {['Home', 'Services', 'Work', 'About'].map((route) => (
                  <Link
                    key={route}
                    to={route === 'Home' ? '/' : `/${route.toLowerCase()}`}
                    className="hover:opacity-70 transition-opacity"
                    style={{ color: 'var(--bg-primary)' }}
                  >
                    {route}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── BOTTOM STRIP ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col lg:flex-row justify-between items-center gap-10 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}
        >
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4 font-body text-[0.65rem] font-bold uppercase tracking-widest" style={{ color: 'var(--bg-primary)', opacity: 0.6 }}>
            <span className="w-10 h-10 rounded-full flex items-center justify-center p-2.5 transition-transform hover:scale-110"
                  style={{ background: 'var(--bg-primary)' }}>
              {/* Invert the logo color dynamically to match the background */}
              <img src={logoImg} alt="Logo" className="w-full h-full object-contain" style={{ filter: 'var(--logo-invert)' }} />
            </span>
            <p>© {new Date().getFullYear()} Executive Plans</p>
          </div>
          
          {/* Status badge */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 px-8 py-4 rounded-full backdrop-blur-md"
               style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
            <p className="flex items-center gap-2 font-body text-[0.65rem] font-bold uppercase tracking-widest" style={{ color: 'var(--bg-primary)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Executive Team
            </p>
            <div className="hidden md:block w-px h-4" style={{ background: 'rgba(255,255,255,0.2)' }} />
            <p className="flex items-center gap-2 font-body text-[0.65rem] font-bold uppercase tracking-widest" style={{ color: 'var(--bg-primary)', opacity: 0.6 }}>
              Developed by Vishesh Nagar
            </p>
          </div>

          <p className="font-body text-[0.65rem] font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--bg-primary)', opacity: 0.6 }}>
            Based in Kota
          </p>
        </motion.div>
      </div>
      
      {/* Dynamic logo invert trick for dark/light modes */}
      <style>{`
        .dark footer { --logo-invert: invert(1); }
        html:not(.dark) footer { --logo-invert: invert(0); }
      `}</style>
    </footer>
  );
}
