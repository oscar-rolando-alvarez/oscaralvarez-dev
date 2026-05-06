'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { contributionHeatmap } from '@/lib/data';

const cellSize = 12;
const gap = 3;
const weeks = 52;
const days = 7;

const levelFill: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: 'rgba(255,255,255,0.05)',
  1: 'rgba(6,182,212,0.35)',
  2: 'rgba(139,92,246,0.55)',
  3: 'rgba(217,70,239,0.75)',
  4: 'rgba(245,158,11,0.95)',
};

export function ContributionHeatmap() {
  const t = useTranslations('charts.heatmap');
  const totalContributions = contributionHeatmap.filter((c) => c.level > 0).length;
  const longestStreak = (() => {
    let cur = 0;
    let max = 0;
    for (const c of contributionHeatmap) {
      if (c.level > 0) {
        cur += 1;
        if (cur > max) max = cur;
      } else {
        cur = 0;
      }
    }
    return max;
  })();

  const width = weeks * (cellSize + gap);
  const height = days * (cellSize + gap);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm sm:p-6"
    >
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t('eyebrow')}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">{t('title')}</h3>
        </div>
        <div className="flex flex-col items-end gap-0.5 text-right">
          <span className="font-display text-xl font-bold tracking-tight">
            <span className="gradient-text">{totalContributions}</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {t('contributions')}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="block"
          role="img"
          aria-label={t('title')}
        >
          {contributionHeatmap.map((c, i) => (
            <motion.rect
              key={`${c.week}-${c.day}`}
              x={c.week * (cellSize + gap)}
              y={c.day * (cellSize + gap)}
              width={cellSize}
              height={cellSize}
              rx={2.5}
              fill={levelFill[c.level]}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: (i % 364) * 0.0008 }}
            />
          ))}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>{t('less')}</span>
          {[0, 1, 2, 3, 4].map((lv) => (
            <span
              key={lv}
              className="inline-block h-3 w-3 rounded-[3px]"
              style={{ background: levelFill[lv as 0 | 1 | 2 | 3 | 4] }}
            />
          ))}
          <span>{t('more')}</span>
        </div>
        <div className="text-[11px] text-muted-foreground">
          <span className="font-mono text-foreground">{longestStreak} {t('streakDays')}</span>{' '}
          <span className="text-muted-foreground/60">· {t('streak')}</span>
        </div>
      </div>
    </motion.div>
  );
}
