'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { coreCompetencies } from '@/lib/data';
import { SectionHeading } from './section-heading';
import { Brain, Cpu, Cloud, Users } from 'lucide-react';
import { cn } from '@/lib/cn';

const iconByTitle: Record<string, React.ComponentType<{ className?: string }>> = {
  'core.ai.title': Brain,
  'core.streaming.title': Cpu,
  'core.cloud.title': Cloud,
  'core.leadership.title': Users,
};

const accentClasses: Record<
  'cyan' | 'violet' | 'fuchsia' | 'amber',
  { ring: string; glow: string; text: string; iconBg: string }
> = {
  cyan: {
    ring: 'hover:border-accent-cyan/40',
    glow: 'group-hover:shadow-[0_0_60px_-10px_rgba(6,182,212,0.45)]',
    text: 'text-accent-cyan',
    iconBg: 'bg-accent-cyan/15',
  },
  violet: {
    ring: 'hover:border-accent-violet/40',
    glow: 'group-hover:shadow-[0_0_60px_-10px_rgba(139,92,246,0.45)]',
    text: 'text-accent-violet',
    iconBg: 'bg-accent-violet/15',
  },
  fuchsia: {
    ring: 'hover:border-accent-fuchsia/40',
    glow: 'group-hover:shadow-[0_0_60px_-10px_rgba(217,70,239,0.45)]',
    text: 'text-accent-fuchsia',
    iconBg: 'bg-accent-fuchsia/15',
  },
  amber: {
    ring: 'hover:border-accent-amber/40',
    glow: 'group-hover:shadow-[0_0_60px_-10px_rgba(245,158,11,0.45)]',
    text: 'text-accent-amber',
    iconBg: 'bg-accent-amber/15',
  },
};

export function About() {
  const t = useTranslations('about');
  const tc = useTranslations('core');

  return (
    <section id="about" className="relative scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t.rich('title', {
            highlight: (chunks) => <span className="gradient-text">{chunks}</span>,
          })}
        />

        <div className="grid gap-10 md:grid-cols-5">
          <div className="space-y-5 md:col-span-3">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty"
            >
              {t('p1')}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty"
            >
              {t('p2')}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty"
            >
              {t.rich('p3', {
                arkis: () => (
                  <a
                    href="https://arkisgroup.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground underline-offset-4 hover:underline"
                  >
                    {t('arkis')}
                  </a>
                ),
              })}
            </motion.p>
          </div>

          <div className="md:col-span-2">
            <div className="sticky top-28 space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70 font-mono">
                {tc('eyebrow')} · {tc('title')}
              </p>
              <ul className="space-y-2">
                {coreCompetencies.map((c, i) => {
                  const Icon = iconByTitle[c.titleKey] ?? Brain;
                  const a = accentClasses[c.accent];
                  return (
                    <motion.li
                      key={c.titleKey}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 * i }}
                      className={cn(
                        'group relative flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition',
                        a.ring,
                        a.glow,
                      )}
                    >
                      <div
                        className={cn(
                          'grid h-9 w-9 shrink-0 place-items-center rounded-xl',
                          a.iconBg,
                          a.text,
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-sm font-semibold tracking-tight">
                          {tc(c.titleKey.replace('core.', '').replace('.title', '.title'))}
                        </h3>
                        <ul className="mt-2 space-y-1">
                          {c.itemKeys.map((k) => (
                            <li
                              key={k}
                              className="flex items-start gap-2 text-[13px] text-muted-foreground"
                            >
                              <span
                                className={cn(
                                  'mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full',
                                  a.text === 'text-accent-cyan' && 'bg-accent-cyan',
                                  a.text === 'text-accent-violet' && 'bg-accent-violet',
                                  a.text === 'text-accent-fuchsia' && 'bg-accent-fuchsia',
                                  a.text === 'text-accent-amber' && 'bg-accent-amber',
                                )}
                              />
                              <span>{tc(k.replace('core.', ''))}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
