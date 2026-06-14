import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function NotFoundPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth physics
  const springConfig = { damping: 50, stiffness: 400, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Parallax mapping
  const rotateX = useTransform(smoothY, [-500, 500], [25, -25]);
  const rotateY = useTransform(smoothX, [-500, 500], [-25, 25]);
  const tunnelX = useTransform(smoothX, [-500, 500], [-50, 50]);
  const tunnelY = useTransform(smoothY, [-500, 500], [-50, 50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX - innerWidth / 2;
      const y = e.clientY - innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate tunnel rings
  const rings = Array.from({ length: 8 });

  // Generate floating debris
  const debris = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 1500,
    y: (Math.random() - 0.5) * 1000,
    z: Math.random() * 800 - 400,
    scale: Math.random() * 1.5 + 0.5,
    rotation: Math.random() * 360,
  }));

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
      style={{ perspective: '1000px' }}
    >
      {/* ── Background Ambient ── */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(200,200,255,0.05) 0%, transparent 60%)' }} />
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* ── Interactive 3D Environment ── */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* Infinite Tunnel Rings */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ x: tunnelX, y: tunnelY, transformStyle: 'preserve-3d' }}
        >
          {rings.map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute rounded-full border border-white/5"
              style={{
                width: '100vw',
                height: '100vw',
                translateZ: `${-1000 + i * 200}px`,
                opacity: 0.1 + (i * 0.05),
              }}
              animate={{ 
                rotateZ: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotateZ: { repeat: Infinity, duration: 60 + i * 10, ease: 'linear' },
                scale: { repeat: Infinity, duration: 8 + i * 2, ease: 'easeInOut' }
              }}
            />
          ))}
        </motion.div>

        {/* Floating Debris / Particles */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          {debris.map(p => (
            <motion.div
              key={p.id}
              className="absolute bg-white/20"
              style={{
                width: p.scale * 2 + 'px',
                height: p.scale * 10 + 'px',
                x: p.x,
                y: p.y,
                translateZ: p.z,
                rotateZ: p.rotation,
              }}
              animate={{ 
                y: [p.y, p.y - 100, p.y],
                rotateZ: [p.rotation, p.rotation + 90, p.rotation + 180],
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{ repeat: Infinity, duration: 10 + p.scale * 5, ease: 'linear' }}
            />
          ))}
        </div>

        {/* ── The "Monolith" (404) ── */}
        <div className="relative flex items-center justify-center" style={{ transformStyle: 'preserve-3d', translateZ: 150 }}>
          {/* Glowing Aura behind monolith */}
          <motion.div 
            className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-40 mix-blend-screen"
            style={{ background: 'var(--brand)', x: smoothX, y: smoothY, translateZ: -50 }}
          />

          {/* Sliced 3D Text Layers */}
          <motion.div 
            className="font-display font-black leading-none tracking-tighter absolute"
            style={{ fontSize: 'clamp(12rem, 35vw, 30rem)', color: 'rgba(255,255,255,0.02)', WebkitTextStroke: '2px rgba(255,255,255,0.1)', translateZ: -20 }}
          >
            404
          </motion.div>

          <motion.div 
            className="font-display font-black leading-none tracking-tighter text-white"
            style={{ fontSize: 'clamp(12rem, 35vw, 30rem)', textShadow: '0 40px 100px rgba(0,0,0,0.9)' }}
          >
            404
          </motion.div>

          <motion.div 
            className="font-display font-black leading-none tracking-tighter absolute"
            style={{ fontSize: 'clamp(12rem, 35vw, 30rem)', color: 'transparent', WebkitTextStroke: '1px var(--brand)', translateZ: 40, clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 30%)' }}
            animate={{ x: [-5, 5, -5], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            404
          </motion.div>
          
          <motion.div 
            className="font-display font-black leading-none tracking-tighter absolute"
            style={{ fontSize: 'clamp(12rem, 35vw, 30rem)', color: 'transparent', WebkitTextStroke: '1px var(--brand)', translateZ: 60, clipPath: 'polygon(0 70%, 100% 70%, 100% 100%, 0 100%)' }}
            animate={{ x: [5, -5, 5], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            404
          </motion.div>
        </div>
      </motion.div>

      {/* ── Foreground UI (Static relative to 3D) ── */}
      <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col items-center justify-end z-20 pointer-events-none">
        
        {/* Abstract Message */}
        <div className="text-center mb-8 max-w-lg">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-[0.6rem] text-white/50 uppercase tracking-[0.4em]">Connection Terminated</span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-body text-sm text-white/40 uppercase tracking-[0.2em] leading-relaxed"
          >
            You have drifted into uncharted digital space. <br/>
            There is no content here, only the void.
          </motion.p>
        </div>

        {/* Return Button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="pointer-events-auto"
        >
          <Link 
            to="/"
            className="group relative flex items-center justify-center w-20 h-20 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl transition-all duration-700 hover:scale-110 hover:border-white/50"
          >
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'var(--brand)', filter: 'blur(20px)' }} />
            <div className="relative flex flex-col items-center gap-1 text-white">
              <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              <span className="text-[0.45rem] font-bold uppercase tracking-[0.2em]">Home</span>
            </div>
            
            {/* Orbital ring */}
            <svg className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] opacity-50 group-hover:animate-[spin_4s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-white/30" />
            </svg>
          </Link>
        </motion.div>
      </div>
      
    </div>
  );
}
