'use client';

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { stats } from '@/lib/data';

// Parses a stat value and returns the numeric portion and surrounding decoration.
// "6.2M+" → { num: 6.2, prefix: '', suffix: 'M+' }
function parse(value: string) {
  const match = value.match(/^([^\d-]*)([\d.]+)(.*)$/);
  if (!match) return { num: null, prefix: '', suffix: value };
  return { num: parseFloat(match[2]), prefix: match[1] ?? '', suffix: match[3] ?? '' };
}

function CountUp({ value }: { value: string }) {
  const { num, prefix, suffix } = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 22, mass: 0.8 });
  const display = useTransform(spring, (v) => {
    if (num === null) return value;
    const decimals = String(num).includes('.') ? 1 : 0;
    return v.toFixed(decimals);
  });

  useEffect(() => {
    if (inView && num !== null) motionVal.set(num);
  }, [inView, motionVal, num]);

  if (num === null) {
    return (
      <span ref={ref} className="gradient-text">
        {value}
      </span>
    );
  }
  return (
    <span ref={ref} className="gradient-text tabular-nums">
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

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
              <CountUp value={stat.value} />
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
