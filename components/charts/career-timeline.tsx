'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { careerTimeline, careerRange } from '@/lib/data';
import { cn } from '@/lib/cn';

const accentBg: Record<string, string> = {
  cyan: 'from-accent-cyan/80 to-accent-cyan/30',
  violet: 'from-accent-violet/80 to-accent-violet/30',
  fuchsia: 'from-accent-fuchsia/80 to-accent-fuchsia/30',
  amber: 'from-accent-amber/80 to-accent-amber/30',
  emerald: 'from-emerald-400/80 to-emerald-400/30',
  rose: 'from-rose-400/80 to-rose-400/30',
};

export function CareerTimeline() {
  const t = useTranslations('charts.timeline');
  const total = careerRange.to - careerRange.from;
  const yearTicks = [1998, 2005, 2010, 2015, 2020, 2026];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm sm:p-6"
    >
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t('eyebrow')}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">{t('title')}</h3>
        </div>
        <span className="font-display text-xl font-bold tracking-tight">
          <span className="gradient-text">{total}+ </span>
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            {t('years')}
          </span>
        </span>
      </div>

      <div className="relative">
        {/* Year ticks */}
        <div className="relative mb-2 h-4">
          {yearTicks.map((y) => {
            const pct = ((y - careerRange.from) / total) * 100;
            return (
              <span
                key={y}
                className="absolute -translate-x-1/2 font-mono text-[10px] text-muted-foreground/70"
                style={{ left: `${pct}%` }}
              >
                {y}
              </span>
            );
          })}
        </div>
        <div
          aria-hidden
          className="absolute left-0 right-0 top-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />

        {/* Bars */}
        <ul className="mt-4 space-y-2.5">
          {careerTimeline.map((seg, i) => {
            const start = ((seg.start - careerRange.from) / total) * 100;
            const end = ((((seg.end ?? careerRange.to) - seg.start) || 0.5) / total) * 100;
            return (
              <li key={seg.id} className="group relative h-7">
                <div
                  aria-hidden
                  className="absolute inset-y-0 left-0 right-0 rounded-md bg-white/[0.02]"
                />
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: `${end}%`, opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  style={{ left: `${start}%` }}
                  className={cn(
                    'absolute inset-y-0 rounded-md bg-gradient-to-r shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]',
                    accentBg[seg.accent],
                  )}
                >
                  <div className="flex h-full items-center justify-between gap-2 px-2.5 text-[11px] font-medium text-foreground/95">
                    <span className="truncate">{seg.company}</span>
                    <span className="hidden font-mono text-[10px] text-foreground/80 sm:inline">
                      {seg.start}–{seg.end ?? t('now')}
                    </span>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}
