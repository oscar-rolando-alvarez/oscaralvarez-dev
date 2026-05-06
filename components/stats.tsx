'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { stats } from '@/lib/data';

export function Stats() {
  const t = useTranslations('stats');

  return (
    <section className="relative -mt-12 px-4 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.labelKey}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.05 * i }}
            className="group relative bg-background/40 p-6 transition hover:bg-background/60 sm:p-8"
          >
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="gradient-text">{stat.value}</span>
            </div>
            <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground sm:text-sm">
              {t(stat.labelKey)}
            </div>
            <div className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-accent-cyan opacity-0 transition group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
