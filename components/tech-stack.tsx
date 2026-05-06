'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { techStack } from '@/lib/data';
import { SectionHeading } from './section-heading';
import { cn } from '@/lib/cn';

export function TechStack() {
  const t = useTranslations('stack');
  const primary = techStack.filter((c) => c.emphasis === 'primary');
  const rest = techStack.filter((c) => c.emphasis !== 'primary' && c.emphasis !== 'secondary');
  const secondary = techStack.filter((c) => c.emphasis === 'secondary');

  return (
    <section id="stack" className="relative scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('subtitle')}
        />

        {/* Languages + Protocols — primary emphasis */}
        <div className="grid gap-4 md:grid-cols-2">
          {primary.map((cat, i) => (
            <motion.div
              key={cat.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent p-6 backdrop-blur-sm transition hover:border-white/30 sm:p-7"
            >
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-accent-cyan/15 via-accent-violet/10 to-accent-fuchsia/10 opacity-60 transition group-hover:opacity-100" />

              <div className="relative mb-4 flex items-center justify-between">
                <h3 className="font-display text-base font-bold tracking-tight">
                  {t(cat.titleKey.replace('stack.', ''))}
                </h3>
                <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.25em] text-foreground">
                  {t('primaryBadge')}
                </span>
              </div>

              <div className="relative flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-mono font-medium text-foreground transition hover:-translate-y-0.5 hover:border-white/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mid-tier categories */}
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((cat, i) => (
            <motion.div
              key={cat.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-white/20"
            >
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-accent-cyan/0 via-accent-violet/0 to-accent-fuchsia/0 opacity-0 transition group-hover:from-accent-cyan/10 group-hover:via-accent-violet/10 group-hover:to-accent-fuchsia/10 group-hover:opacity-100" />

              <h3 className="relative mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {t(cat.titleKey.replace('stack.', ''))}
              </h3>
              <div className="relative flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-foreground/80 transition hover:-translate-y-0.5 hover:border-white/25 hover:text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Frameworks — explicitly de-emphasized */}
        <div className="mt-4 grid gap-4">
          {secondary.map((cat, i) => (
            <motion.div
              key={cat.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-dashed border-white/10 bg-transparent p-6 transition hover:border-white/20',
              )}
            >
              <div className="relative mb-4 flex items-center justify-between">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70">
                  {t(cat.titleKey.replace('stack.', ''))}
                </h3>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground/60">
                  {t('secondaryBadge')}
                </span>
              </div>
              <div className="relative flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/5 bg-white/[0.02] px-2.5 py-1 text-xs font-mono text-muted-foreground transition hover:border-white/15 hover:text-foreground/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
