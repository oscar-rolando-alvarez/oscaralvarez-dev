'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { productStatusBreakdown } from '@/lib/data';

const total = productStatusBreakdown.live + productStatusBreakdown.beta + productStatusBreakdown.soon;

const segments = [
  { key: 'live', count: productStatusBreakdown.live, color: '#34d399', glow: 'rgba(52,211,153,0.45)' },
  { key: 'beta', count: productStatusBreakdown.beta, color: '#fbbf24', glow: 'rgba(251,191,36,0.45)' },
  { key: 'soon', count: productStatusBreakdown.soon, color: '#a3a3a3', glow: 'rgba(163,163,163,0.30)' },
] as const;

const radius = 70;
const stroke = 22;
const circumference = 2 * Math.PI * radius;

export function ProductsDonut() {
  const t = useTranslations('charts.donut');
  const tStatus = useTranslations('products.status');

  let offset = 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm sm:p-6"
    >
      <div className="mb-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {t('eyebrow')}
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">{t('title')}</h3>
      </div>

      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
        <div className="relative grid h-44 w-44 shrink-0 place-items-center">
          <svg
            viewBox="0 0 200 200"
            width="176"
            height="176"
            className="-rotate-90"
            role="img"
            aria-label={t('title')}
          >
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={stroke}
            />
            {segments.map((seg, i) => {
              const dash = (seg.count / total) * circumference;
              const node = (
                <motion.circle
                  key={seg.key}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={stroke}
                  strokeLinecap="butt"
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={-offset}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
                  style={{ filter: `drop-shadow(0 0 10px ${seg.glow})` }}
                />
              );
              offset += dash;
              return node;
            })}
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-display text-3xl font-bold tracking-tight">
              <span className="gradient-text">{total}</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {t('products')}
            </span>
          </div>
        </div>

        <ul className="w-full space-y-2">
          {segments.map((seg) => {
            const pct = Math.round((seg.count / total) * 100);
            return (
              <li
                key={seg.key}
                className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ background: seg.color, boxShadow: `0 0 12px ${seg.glow}` }}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-foreground">
                    {tStatus(seg.key)}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 font-mono text-xs tabular-nums">
                  <span className="text-foreground">{seg.count}</span>
                  <span className="text-muted-foreground/70">{pct}%</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}
