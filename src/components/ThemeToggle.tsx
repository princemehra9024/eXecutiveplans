import { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme, isAnimating } = useTheme();
  const isDark = theme === 'dark';
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (isAnimating) return;
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      toggleTheme(x, y);
    } else {
      toggleTheme(window.innerWidth / 2, window.innerHeight / 2);
    }
  };

  return (
    <motion.button
      ref={btnRef}
      onClick={handleClick}
      disabled={isAnimating}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-11 h-11 rounded-full flex items-center justify-center overflow-hidden border border-text/10 bg-text/5 backdrop-blur-md text-text cursor-pointer"
      aria-label="Toggle Theme"
      style={{ isolation: 'isolate' }}
    >
      {/* Rotating ring on hover */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: isDark
            ? 'conic-gradient(from 0deg, #fbbf24, #f59e0b, #fbbf24)'
            : 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #6366f1)',
          opacity: 0,
        }}
        whileHover={{ opacity: 0.15, rotate: 360 }}
        transition={{ rotate: { duration: 3, repeat: Infinity, ease: 'linear' } }}
      />

      {/* Glow pulse when switching */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={isAnimating ? {
          boxShadow: isDark
            ? ['0 0 0px 0px rgba(250,204,21,0)', '0 0 20px 6px rgba(250,204,21,0.5)', '0 0 0px 0px rgba(250,204,21,0)']
            : ['0 0 0px 0px rgba(99,102,241,0)', '0 0 20px 6px rgba(99,102,241,0.5)', '0 0 0px 0px rgba(99,102,241,0)'],
        } : {}}
        transition={{ duration: 0.7 }}
      />

      {/* Icon swap */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
          exit={{ y: 20, opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-500" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
