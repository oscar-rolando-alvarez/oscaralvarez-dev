'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { principles } from '@/lib/data';
import { SectionHeading } from './section-heading';
import { Code2, Network, Rocket, GitCommit, Layers, LineChart } from 'lucide-react';

const icons = [Code2, Network, Rocket, GitCommit, Layers, LineChart];

export function Principles() {
  const t = useTranslations('principles');

  return (
    <section id="principles" className="relative scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('subtitle')}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => {
            const Icon = icons[i] ?? Code2;
            return (
              <motion.article
                key={p.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-white/25"
              >
                <div className="pointer-events-none absolute -top-24 right-0 h-44 w-44 rounded-full bg-gradient-to-br from-accent-cyan/15 via-accent-violet/15 to-accent-fuchsia/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

                <div className="relative mb-4 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent-cyan/20 via-accent-violet/20 to-accent-fuchsia/20 text-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    P/0{i + 1}
                  </span>
                </div>

                <h3 className="relative font-display text-lg font-semibold tracking-tight">
                  {t(p.titleKey.replace('principles.', ''))}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {t(p.bodyKey.replace('principles.', ''))}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
