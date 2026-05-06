'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { languageYears } from '@/lib/data';
import { cn } from '@/lib/cn';

const accentBg: Record<string, string> = {
  cyan: 'from-accent-cyan/90 to-accent-cyan/40',
  violet: 'from-accent-violet/90 to-accent-violet/40',
  fuchsia: 'from-accent-fuchsia/90 to-accent-fuchsia/40',
  amber: 'from-accent-amber/90 to-accent-amber/40',
  emerald: 'from-emerald-400/90 to-emerald-400/40',
};

export function LanguageBars() {
  const t = useTranslations('charts.languages');
  const max = Math.max(...languageYears.map((l) => l.years));

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
          <span className="gradient-text">{languageYears.length}</span>
          <span className="ml-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            {t('languages')}
          </span>
        </span>
      </div>

      <ul className="space-y-2.5">
        {languageYears.map((lang, i) => {
          const pct = (lang.years / max) * 100;
          return (
            <li key={lang.name} className="grid grid-cols-[110px_1fr_auto] items-center gap-3">
              <span className="truncate font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {lang.name}
              </span>
              <div className="relative h-5 overflow-hidden rounded-md bg-white/[0.04]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'h-full rounded-md bg-gradient-to-r shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]',
                    accentBg[lang.accent],
                  )}
                />
              </div>
              <span className="font-mono text-xs tabular-nums text-foreground">
                {lang.years}
                <span className="ml-0.5 text-muted-foreground/70">y</span>
              </span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
