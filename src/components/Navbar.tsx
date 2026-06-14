import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Magnetic from './Magnetic';
import ThemeToggle from './ThemeToggle';
import logoImg from '../assets/executive-logo.png';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();


  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(element, { 
              duration: 1.5,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [location.hash, location.pathname]);

  const scrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = ['Services', 'Work', 'About', 'Contact'];

  return (
    <>
      <div className="navbar-glow-wrapper">
        <div className="navbar-glow-inner">
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full px-6 py-4 flex justify-between items-center transition-colors bg-bg/80 backdrop-blur-xl rounded-full"
          >
        <Link 
          to="/" 
          onClick={scrollToTop}
          className="font-display text-xl md:text-2xl uppercase tracking-tighter text-text leading-none flex items-center gap-3 hover:scale-[1.01] transition-transform"
        >
          <div className="w-10 h-10 rounded-full bg-zinc-950 flex items-center justify-center p-2 shadow-md shrink-0 border border-zinc-800">
            <img 
              src={logoImg} 
              alt="Executive Plans Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <span className="flex items-center">
            EXECUTIVE<span className="ml-1 text-brand">PLANS</span>
          </span>
        </Link>
        
        <div className="hidden md:flex gap-8 items-center text-sm font-body font-medium uppercase tracking-widest text-text">
          {navLinks.map((item) => (
            <Magnetic key={item}>
              <Link 
                to={['About', 'Skills', 'Contact', 'Work'].includes(item) ? `/${item.toLowerCase()}` : `/#${item.toLowerCase()}`} 
                className="group relative py-1 hover:text-brand transition-colors block"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-brand origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            </Magnetic>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Magnetic>
            <ThemeToggle />
          </Magnetic>
          
          <Magnetic>
            <button 
              className="md:hidden w-10 h-10 rounded-full bg-text/5 flex items-center justify-center backdrop-blur-md border border-text/10 hover:bg-brand hover:text-brand-foreground hover:border-brand transition-colors text-text"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </Magnetic>
        </div>
      </motion.nav>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-3xl flex flex-col items-center justify-center pt-20"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((item) => (
                <Link 
                  key={item} 
                  to={['About', 'Skills', 'Contact', 'Work'].includes(item) ? `/${item.toLowerCase()}` : `/#${item.toLowerCase()}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-4xl uppercase tracking-tighter text-text hover:text-brand transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
