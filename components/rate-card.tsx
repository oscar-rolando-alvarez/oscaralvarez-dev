'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { rate } from '@/lib/data';
import { Clock, CalendarRange, Zap, Globe2 } from 'lucide-react';

export function RateCard() {
  const t = useTranslations('rate');

  const rows = [
    { icon: Clock, label: t('hourly'), value: rate.hourly, accent: 'from-accent-cyan/30 to-accent-cyan/0' },
    { icon: CalendarRange, label: t('retainer'), value: rate.retainer, accent: 'from-accent-violet/30 to-accent-violet/0' },
    { icon: Zap, label: t('availability'), value: rate.availability, accent: 'from-accent-fuchsia/30 to-accent-fuchsia/0' },
    { icon: Globe2, label: t('engagement'), value: rate.engagement, accent: 'from-accent-amber/30 to-accent-amber/0' },
  ];

  return (
    <section id="rate" className="relative scroll-mt-24 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-6 backdrop-blur-xl sm:p-8"
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t('eyebrow')}
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {t('title')}
              </h3>
            </div>
            <p className="max-w-md text-sm text-muted-foreground text-pretty">{t('note')}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {rows.map((row, i) => {
              const Icon = row.icon;
              return (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div
                    className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${row.accent} opacity-0 transition group-hover:opacity-100`}
                  />
                  <div className="relative mb-2 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <Icon className="h-3.5 w-3.5" />
                    {row.label}
                  </div>
                  <div className="relative font-display text-xl font-bold tracking-tight">
                    {row.value}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
