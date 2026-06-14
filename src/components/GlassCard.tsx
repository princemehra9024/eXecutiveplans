import React from 'react';
import { motion } from 'motion/react';

export interface GlassCardProps {
  label: string;
  tags: string[];
  gradient: string; // optional gradient for accent border
  tooltip?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ label, tags, gradient, tooltip }) => {
  return (
    <motion.div
      className="glass-card relative overflow-hidden"
      style={{ background: gradient || 'var(--color-card-bg)' }}
      whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/40 pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3 className="font-display text-white text-2xl font-black uppercase tracking-tight mb-3 drop-shadow-md">
          {label}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-body font-semibold uppercase tracking-wider bg-black/30 text-white/90 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GlassCard;
