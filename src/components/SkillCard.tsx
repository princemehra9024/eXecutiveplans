// src/components/SkillCard.tsx
import React from 'react';
import { motion } from 'motion/react';

interface SkillCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function SkillCard({ title, description, icon }: SkillCardProps) {
  return (
    <motion.div
      className="glass-card p-6 flex flex-col items-center text-center cursor-pointer"
      whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.97 }}
    >
      {icon && <div className="mb-4 text-4xl text-brand">{icon}</div>}
      <h3 className="text-xl font-display text-text mb-2">{title}</h3>
      {description && <p className="text-sm text-text-muted">{description}</p>}
    </motion.div>
  );
}
