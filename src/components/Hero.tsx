import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import logoImg from '../assets/executive-logo.png';
import Modal from '../components/Modal';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) * 0.1;
      const y = (e.clientY - innerHeight / 2) * 0.1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const sentence1 = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const sentence2 = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.6 },
    },
  };

  const letter = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 md:py-32 transition-colors">
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/20 rounded-full blur-[100px] animate-pulse" 
          style={{ x: smoothX, y: smoothY }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[100px] animate-pulse" 
          style={{ x: smoothX, y: smoothY, animationDelay: '1s' }} 
        />
      </div>

      <div className="z-10 text-center flex flex-col items-center">
        {/* Large Prominent Logo Badge - Guaranteed Perfect Contrast and Visibility for White Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 hover:scale-[1.03] transition-transform duration-300 pointer-events-auto"
        >
          <div className="w-16 h-16 md:w-20 h-20 rounded-full bg-zinc-950 flex items-center justify-center p-3 shadow-xl border border-zinc-800 shadow-black/10">
            <img 
              src={logoImg} 
              alt="Executive Plans Logo" 
              className="w-full h-full object-contain filter brightness-110" 
            />
          </div>
        </motion.div>

        <div className="overflow-hidden mb-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-brand font-body text-sm md:text-base font-semibold tracking-[0.2em] uppercase"
          >
            Digital Agency for New Business
          </motion.div>
        </div>

        <div className="relative w-full flex flex-col items-center">
          <h1 
            className="font-display text-5xl sm:text-7xl md:text-[11vw] xl:text-[140px] leading-[1.0] md:leading-[0.85] uppercase tracking-tighter text-text flex flex-col items-center relative z-10"
            style={{
              WebkitBoxReflect: 'below -2vw linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.3) 100%)'
            }}
          >
            <motion.div 
              className="overflow-hidden flex"
              variants={sentence1}
              initial="hidden"
              animate="visible"
            >
              {"WE BUILD".split('').map((char, index) => (
                <motion.span key={index} variants={letter} className="block whitespace-pre">
                  {char}
                </motion.span>
              ))}
            </motion.div>
            <div className="overflow-hidden flex items-center gap-4 md:gap-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '10vw' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                className="h-[1vw] bg-brand hidden md:block"
              />
              <motion.div 
                className="overflow-hidden flex"
                variants={sentence2}
                initial="hidden"
                animate="visible"
              >
                {"FUTURES".split('').map((char, index) => (
                  <motion.span key={index} variants={letter} className="block whitespace-pre">
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-text-muted max-w-sm text-center font-body text-sm md:text-base leading-relaxed"
        >
          Websites, Apps, and Marketing that don't suck. We translate your chaotic vision into digital reality.
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-text-muted hidden md:flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-[10px] uppercase tracking-widest font-body">Scroll down</span>
        <div className="w-[1px] h-12 bg-border relative overflow-hidden">
          <motion.div
            className="w-full h-full bg-brand"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
