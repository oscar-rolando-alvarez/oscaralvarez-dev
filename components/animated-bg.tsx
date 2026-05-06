'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-80" />
      <div className="absolute inset-0 grid-bg opacity-70" />

      <motion.div
        className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-accent-violet/30 blur-[140px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[640px] w-[640px] rounded-full bg-accent-cyan/25 blur-[160px]"
        animate={{ x: [0, -80, 0], y: [0, -50, 0], scale: [1, 1.18, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-accent-fuchsia/20 blur-[140px]"
        animate={{ x: [0, -40, 40, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
