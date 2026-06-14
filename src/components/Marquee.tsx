import { motion } from 'motion/react';
import React from 'react';

export default function Marquee() {
  const texts = [
    "NO BORING SHIT",
    "WE BREAK RULES",
    "Kota Based",
    "DESIGN MEETS CODE",
    "EXECUTIVE PLANS",
  ];

  return (
    <section className="py-12 md:py-16 bg-text text-brand-foreground overflow-hidden flex items-center transform -skew-y-3 origin-bottom-left relative z-10 transition-colors">
      {/* Flowing River Background Animation - Multiple Smooth Layers */}
      <div className="absolute top-[10%] left-1/2 w-[300vw] md:w-[250vw] aspect-square bg-bg/10 rounded-[46%] animate-[waveFill_15s_linear_infinite] z-0" />
      <div className="absolute top-[15%] left-1/2 w-[290vw] md:w-[240vw] aspect-square bg-bg/20 rounded-[42%] animate-[waveFill_18s_linear_infinite_reverse] z-0" />
      <div className="absolute top-[20%] left-1/2 w-[280vw] md:w-[230vw] aspect-square bg-bg/30 rounded-[38%] animate-[waveFill_22s_linear_infinite] z-0" />
      
      <motion.div 
        className="flex whitespace-nowrap relative z-10"
        animate={{ y: [0, -10, 0, 10, 0] }}
        transition={{
          repeat: Infinity,
          ease: "easeInOut",
          duration: 4,
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-6 md:gap-12 pr-6 md:pr-12"
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20,
            }}
          >
            {texts.map((text, idx) => (
              <React.Fragment key={idx}>
                <span className="font-display text-4xl md:text-6xl tracking-tight uppercase">
                  {text}
                </span>
                <span className="w-3 h-3 md:w-5 md:h-5 bg-brand-foreground rounded-full" />
              </React.Fragment>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
