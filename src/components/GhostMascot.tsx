import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MESSAGES = [
  "Your current website is scaring me 👻 Let's fix it.",
  "Stop haunting your users with bad UI! 💀",
  "Apps so smooth they glide like a ghost 👻",
  "Our marketing will literally wake the dead! 🧟‍♂️",
  "We build websites faster than you can say BOO!",
  "Let's make your competitors ghost you 📉👻",
  "Need an app? I know a guy... (it's us) 👀",
  "We break rules, not servers! 💻",
];

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export default function GhostMascot() {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<Position>('bottom-right');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const triggerGhost = () => {
      // Pick random bottom corner to prevent overlapping with Navbar brand and links
      const corners: Position[] = ['bottom-left', 'bottom-right'];
      setPosition(corners[Math.floor(Math.random() * corners.length)]);
      
      // Pick random message
      setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
      
      // Show ghost
      setIsVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Trigger initially after 5 seconds
    const initialTimeout = setTimeout(triggerGhost, 5000);

    // Then trigger every 15 seconds
    const interval = setInterval(triggerGhost, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const getPositionClasses = (pos: Position) => {
    switch (pos) {
      case 'top-left':
        return '-top-4 md:-top-6 left-2 md:left-8 flex-row items-start';
      case 'top-right':
        return '-top-4 md:-top-6 right-2 md:right-8 flex-row-reverse items-start';
      case 'bottom-left':
        return 'bottom-2 md:bottom-4 left-2 md:left-8 flex-row items-end';
      case 'bottom-right':
        return 'bottom-2 md:bottom-4 right-2 md:right-8 flex-row-reverse items-end';
    }
  };

  const isTop = position.startsWith('top');
  const isRight = position.endsWith('right');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: isTop ? -150 : 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: isTop ? -150 : 150, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`fixed z-50 flex gap-2 md:gap-4 pointer-events-none ${getPositionClasses(position)}`}
        >
          {/* Ghost Emoji */}
          <motion.div
            animate={{ 
              rotate: isTop ? [180, 170, 190, 170, 190, 180] : [0, -10, 10, -10, 10, 0],
              y: isTop ? [0, 5, 0] : [0, -5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="text-5xl md:text-8xl drop-shadow-2xl"
            style={{ filter: "drop-shadow(0px 10px 10px rgba(0,0,0,0.2))" }}
          >
            👻
          </motion.div>

          {/* Speech Bubble */}
          <motion.div
            initial={{ scale: 0, opacity: 0, x: isRight ? 20 : -20 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className={`bg-brand text-brand-foreground px-4 py-2 md:px-6 md:py-4 rounded-2xl md:rounded-3xl shadow-2xl font-body border border-brand-foreground/20 relative font-bold whitespace-nowrap
              ${message.length > 30 ? 'text-[10px] md:text-sm' : 'text-xs md:text-lg'}
              ${isTop && isRight ? 'rounded-tr-sm mt-8 md:mt-12' : ''}
              ${isTop && !isRight ? 'rounded-tl-sm mt-8 md:mt-12' : ''}
              ${!isTop && isRight ? 'rounded-br-sm mb-2 md:mb-4' : ''}
              ${!isTop && !isRight ? 'rounded-bl-sm mb-2 md:mb-4' : ''}
            `}
          >
            {message}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
