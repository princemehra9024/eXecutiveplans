import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, useScroll } from 'motion/react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import {
  Github,
  Linkedin,
  Cpu,
  Layers,
  Activity,
  Zap,
  Terminal,
  Sparkles,
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';
import WorkflowSlider from '../components/WorkflowSlider';
import SEO from '../components/SEO';

import princeImg from '../assets/prince.png';
import anshuImg from '../assets/ash.jpg';
import visheshImg from '../assets/vishesh.jpeg';

interface Developer {
  name: string;
  role: string;
  badge: string;
  img: string;
  bio: string;
  color: string;
  accent: string;
  tech: string[];
  stats: { label: string; value: string }[];
  socials: { github?: string; linkedin?: string };
}

const DEVELOPERS: Developer[] = [
  {
    name: 'Prince Mehra',
    role: 'UI/UX Developer & Founder',
    badge: 'UI/UX ARCHITECT & FOUNDER',
    img: princeImg,
    bio: 'The founder of Executive Plans. Prince transforms complex conceptual wireframes and creative visions into interactive, award-winning digital experiences. Obsessed with high-fashion typography, motion orchestrations, and interfaces that feel alive.',
    color: 'from-orange-500/20 to-rose-500/20 border-orange-500/30',
    accent: '#FF4500',
    tech: ['Figma', 'Framer Motion', 'TailwindCSS', 'Spline 3D', 'Three.js'],
    stats: [
      { label: 'UI Precision', value: '100%' },
      { label: 'Animation Speed', value: '60fps' },
      { label: 'System Vision', value: 'Infinite' }
    ],
    socials: {
      github: 'https://github.com/princemehra9024',
      linkedin: 'https://www.linkedin.com/in/prince-mehra-562681366/'
    }
  },
  {
    name: 'Anshu Nayak',
    role: 'Backend Developer',
    badge: 'BACKEND GENERAL',
    img: anshuImg,
    bio: 'Anshu architectures high-frequency servers, data structures, and secure server pipelines that withstand massive traffic loads. He translates complex requirements into bulletproof systems.',
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
    accent: '#10B981',
    tech: ['Node.js', 'Go', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    stats: [
      { label: 'API Latency', value: '<45ms' },
      { label: 'Uptime Standard', value: '99.99%' },
      { label: 'Coffee : Code', value: '1 : 1' }
    ],
    socials: {
      github: 'https://github.com/ChaosForCurio'
    }
  },
  {
    name: 'Vishesh Nagar',
    role: 'App Developer',
    badge: 'APP ARCHITECT',
    img: visheshImg,
    bio: 'Vishesh is a multi-disciplinary app developer who bridges the gap between native iOS/Android mobile engineering, responsive frontend web structures, and high-performance server communications.',
    color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30',
    accent: '#E0FF00',
    tech: ['React Native', 'Swift', 'TypeScript', 'Next.js', 'Kotlin'],
    stats: [
      { label: 'Apps Launched', value: '25+' },
      { label: 'React Native', value: 'Expert' },
      { label: 'Delivery speed', value: 'Raw' }
    ],
    socials: {
      github: 'https://github.com/visheshnagar7878',
      linkedin: 'https://www.linkedin.com/in/vishesh-nagar-00595936a/'
    }
  }
];

function DeveloperCard({ dev, variant = 'default' }: { dev: Developer; variant?: 'tall' | 'wide' | 'default' }) {
  const [activeTab, setActiveTab] = useState<'stack' | 'stats'>('stack');
  const [imageLoaded, setImageLoaded] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for 3D rotate - made highly damped & subtle (max 5 degrees)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { damping: 45, stiffness: 80 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { damping: 45, stiffness: 80 });

  // Gloss glare highlight effect - toned down for formal styling
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], ['10%', '90%']), { damping: 45, stiffness: 80 });
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], ['10%', '90%']), { damping: 45, stiffness: 80 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.015, y: -4 }}
      transition={{ type: 'spring', stiffness: 120, damping: 25 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative flex ${variant === 'wide' ? 'flex-col lg:flex-row' : 'flex-col'} w-full h-full glass-card rounded-[32px] overflow-hidden group transition-colors duration-500 hover:border-brand/30 cursor-pointer`}
    >
      {/* Glare Overlay - very subtle opacity */}
      <motion.div
        className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          left: glareX,
          top: glareY,
          transform: 'translate(-50%, -50%)',
          width: '150%',
          height: '150%',
        }}
      />

      {/* Moving Accent Glow Spotlight behind card - extremely soft formal glow */}
      <motion.div
        className="absolute w-[280px] h-[280px] rounded-full blur-[90px] pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-0"
        style={{
          left: useTransform(x, [-0.5, 0.5], ['0%', '80%']),
          top: useTransform(y, [-0.5, 0.5], ['0%', '80%']),
          backgroundColor: dev.accent,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Image & Header */}
      <div className={`relative ${variant === 'wide' ? 'w-full lg:w-[45%] lg:border-r lg:border-b-0 aspect-[5/4] lg:aspect-auto' : variant === 'tall' ? 'w-full flex-1 min-h-[350px] lg:min-h-[500px] border-b' : 'aspect-[5/4] w-full border-b'} overflow-hidden border-border/50 shrink-0`} style={{ transform: 'translateZ(5px)' }}>
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />

        {/* Skeleton/Blur placeholder */}
        <div className={`absolute inset-0 bg-border/20 animate-pulse transition-opacity duration-700 z-0 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />

        <img
          src={dev.img}
          alt={dev.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover filter transition-all duration-700 ease-out will-change-[filter,transform] scale-100 group-hover:scale-[1.02] ${imageLoaded ? 'opacity-100 grayscale group-hover:grayscale-0' : 'opacity-0 blur-md'}`}
          style={{ transform: 'translate3d(0,0,0)' }}
        />

        {/* Glow Ring behind the image */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-12 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{ backgroundColor: dev.accent }}
        />

        {/* Floating Badge */}
        <div className="absolute top-4 left-4 z-20" style={{ transform: 'translateZ(15px)' }}>
          <span className="text-[10px] tracking-widest font-semibold font-body bg-bg/90 border border-border/80 text-text px-3 py-1.5 rounded-full uppercase shadow-sm">
            {dev.badge}
          </span>
        </div>
      </div>

      {/* Profile Details */}
      <div className={`p-6 md:p-8 flex flex-col z-10 ${variant === 'tall' ? 'shrink-0' : 'flex-1'} ${variant === 'wide' ? 'justify-center' : ''}`} style={{ transform: 'translateZ(10px)' }}>
        <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-text mb-1 flex items-center justify-between" style={{ transform: 'translateZ(12px)' }}>
          {dev.name}
          <div className="flex gap-2" style={{ transform: 'translateZ(15px)' }}>
            {dev.socials.github && (
              <a
                href={dev.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-border/60 hover:border-brand hover:text-brand flex items-center justify-center transition-colors text-text-muted"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {dev.socials.linkedin && (
              <a
                href={dev.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-border/60 hover:border-brand hover:text-brand flex items-center justify-center transition-colors text-text-muted"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        </h3>
        <p className="font-body text-text-muted text-xs uppercase tracking-widest font-semibold mb-6 flex items-center gap-1.5" style={{ transform: 'translateZ(8px)' }}>
          <Sparkles className="w-3.5 h-3.5 text-brand" /> {dev.role}
        </p>

        <p className="font-body text-sm text-text-muted/90 leading-relaxed mb-8 flex-1" style={{ transform: 'translateZ(6px)' }}>
          {dev.bio}
        </p>

        {/* Tab Controls */}
        <div className="flex border-b border-border/50 mb-6 font-body text-xs font-semibold uppercase tracking-wider" style={{ transform: 'translateZ(8px)' }}>
          <button
            onClick={() => setActiveTab('stack')}
            className={`pb-3 pr-4 flex items-center gap-1.5 transition-all border-b-2 ${activeTab === 'stack' ? 'border-brand text-brand' : 'border-transparent text-text-muted'}`}
          >
            <Cpu className="w-3.5 h-3.5" /> Stack
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`pb-3 px-4 flex items-center gap-1.5 transition-all border-b-2 ${activeTab === 'stats' ? 'border-brand text-brand' : 'border-transparent text-text-muted'}`}
          >
            <Activity className="w-3.5 h-3.5" /> Stats
          </button>
        </div>

        {/* Tab Content */}
        <div className="relative min-h-[76px] flex flex-col justify-center" style={{ transform: 'translateZ(8px)' }}>
          <AnimatePresence>
            {activeTab === 'stack' ? (
              <motion.div
                key="stack"
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.15 }}
                className="absolute w-full flex flex-wrap gap-2"
              >
                {dev.tech.map((tech) => (
                  <span
                    key={tech}
                    className="font-body text-xs text-text border border-border/50 px-3 py-1.5 rounded-xl bg-text/5 hover:bg-brand/10 hover:border-brand/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.15 }}
                className="absolute w-full grid grid-cols-3 gap-2"
              >
                {dev.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="font-body text-[10px] text-text-muted uppercase tracking-wider">{stat.label}</span>
                    <span className="font-display text-lg md:text-xl uppercase font-bold text-brand mt-0.5">{stat.value}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Engineer section with GSAP stair animation
───────────────────────────────────────────── */
function EngineerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    // Set initial "stacked deck" state
    gsap.set(cards, {
      yPercent: (i) => 60 + i * 15,
      rotation: (i) => (i % 2 === 0 ? -6 + i * 2 : 6 - i * 2),
      scale: 0.88,
      opacity: 0,
      transformOrigin: 'bottom center',
    });

    // ScrollTrigger stair cascade
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(cards, {
          yPercent: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power4.out',
        });
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 mb-16">
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 border-b border-border/60 pb-8 gap-6">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-brand font-body text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-2"
          >
            THE ARCHITECTS
          </motion.p>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-none text-text">
            Meet The<br />Engineers
          </h2>
        </div>

        {/* View All Skills button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to="/skills"
            className="group relative inline-flex items-center gap-2.5 rounded-full font-body font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              fontSize: '0.68rem',
              padding: '0.8rem 1.8rem',
              background: 'var(--color-brand)',
              color: 'var(--color-brand-foreground)',
              boxShadow: '0 0 28px color-mix(in srgb, var(--color-brand) 55%, transparent), 0 4px 16px rgba(0,0,0,0.2)',
              animation: 'skillsGlow 2.6s ease-in-out infinite',
            }}
          >
            {/* Shimmer sweep on hover */}
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)' }}
            />
            <Sparkles className="w-3.5 h-3.5 flex-none" />
            View All Skills
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center flex-none transition-transform duration-300 group-hover:translate-x-1"
              style={{ background: 'rgba(255,255,255,0.18)' }}
            >
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Cards with stair animation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
        {DEVELOPERS.map((dev, i) => (
          <div
            key={dev.name}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="flex will-change-transform"
          >
            <DeveloperCard dev={dev} variant="default" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AboutPage() {
  const sentence = "RAW EXECUTION. STRATEGIC BRILLIANCE.";

  const words = sentence.split(" ");
  const { scrollYProgress } = useScroll();
  const backgroundY1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  const revealVariants = {
    hidden: { y: '100%' },
    visible: (i: number) => ({
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 lg:pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col">
      <SEO 
        title="About Us | Executive Plans" 
        description="We are architects of digital experiences. Meet our engineers and discover our methodology." 
      />
      {/* Mesh gradients for modern background glow */}
      <motion.div
        style={{ y: backgroundY1 }}
        className="absolute top-0 right-0 w-full md:w-[700px] h-[500px] bg-gradient-to-b from-brand/10 to-transparent rounded-full blur-[120px] pointer-events-none z-0"
      />
      <motion.div
        style={{ y: backgroundY2 }}
        className="absolute top-[800px] left-0 w-full md:w-[600px] h-[400px] bg-gradient-to-b from-brand/5 to-transparent rounded-full blur-[100px] pointer-events-none z-0"
      />

      {/* Cinematic Hero */}
      <header className="relative z-10 max-w-5xl mb-24 md:mb-32 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-brand font-body text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-4"
        >
          OUR MANIFESTO
        </motion.div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-[6.5vw] xl:text-[80px] uppercase tracking-tighter leading-[1.0] md:leading-[0.85] text-text flex flex-wrap gap-x-[1.5vw] gap-y-2 relative z-10">
          {words.map((word, i) => (
            <div key={i} className="overflow-hidden inline-block h-auto">
              <motion.span
                custom={i}
                variants={revealVariants}
                initial="hidden"
                animate="visible"
                className={`block ${i % 2 !== 0 ? 'text-stroke' : ''}`}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-text-muted max-w-2xl font-body text-base md:text-lg leading-relaxed"
        >
          At Executive Plans, we don't believe in digital mediocrity. We believe that your website, application, or marketing campaign is the ultimate digital avatar of your brand. We build elite interfaces designed to command attention and drive exponential value.
        </motion.p>
      </header>

      {/* Strategic Pillars Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32"
      >
        <motion.div
          variants={itemVariants}
          className="glass-card p-8 md:p-10 rounded-[32px] group relative"
        >
          <div className="absolute -inset-20 bg-brand/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-8 relative z-10">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl uppercase tracking-tight text-text mb-4">Methodology</h2>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            Zero templates. Zero compromises. Every pixel is customized from scratch to solve your specific strategic bottleneck. We integrate premium micro-interactions to leave a lasting impact.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass-card p-8 md:p-10 rounded-[32px] group relative"
        >
          <div className="absolute -inset-20 bg-brand/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-8 relative z-10">
            <Terminal className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl uppercase tracking-tight text-text mb-4">Obsession</h2>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            We are obsessed with sub-millisecond latencies, flawless fluid accessibility, and 3D visual storytelling that breaks traditional web grids. Code is our art form.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass-card p-8 md:p-10 rounded-[32px] group relative"
        >
          <div className="absolute -inset-20 bg-brand/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-8 relative z-10">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl uppercase tracking-tight text-text mb-4">Impact</h2>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            We partner exclusively with visionaries, ambitious brands, and disruptive startups ready to upgrade their digital identity. We build systems that dominate marketplaces.
          </p>
        </motion.div>
      </motion.section>

      {/* Workflow Process Slider */}
      <WorkflowSlider />

      {/* Developer Grid Section */}
      <EngineerSection />
    </div>
  );
}
