'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { techStack } from '@/lib/data';
import { SectionHeading } from './section-heading';

export function TechStack() {
  const t = useTranslations('stack');

  return (
    <section id="stack" className="relative scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {techStack.map((cat, i) => (
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
      </div>
    </section>
  );
}
