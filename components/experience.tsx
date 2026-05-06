'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { experiences } from '@/lib/data';
import { SectionHeading } from './section-heading';
import { Briefcase } from 'lucide-react';

export function Experience() {
  const t = useTranslations('experience');

  return (
    <section id="experience" className="relative scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

        <div className="relative">
          <div
            aria-hidden
            className="absolute left-3 top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-accent-cyan/60 via-accent-violet/40 to-accent-fuchsia/30 sm:block"
          />
          <ol className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.li
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
                className="relative grid gap-3 sm:grid-cols-[auto_1fr] sm:gap-8"
              >
                <div className="flex items-start sm:flex-col sm:items-center">
                  <div className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 bg-background/80 backdrop-blur">
                    <span className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-cyan/40 via-accent-violet/40 to-accent-fuchsia/40 blur-md" />
                    <Briefcase className="relative h-3 w-3 text-foreground/80" />
                  </div>
                </div>

                <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/[0.05] sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                        {t(`${exp.id}.role`)}
                      </h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        <span className="font-medium text-accent-cyan">{exp.company}</span>
                        {exp.client ? (
                          <>
                            <span className="mx-2 text-muted-foreground/40">·</span>
                            <span>{exp.client}</span>
                          </>
                        ) : null}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>

                  <p className="mt-3 italic text-muted-foreground text-pretty">
                    {t(`${exp.id}.summary`)}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {exp.highlightKeys.map((k) => (
                      <li
                        key={k}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent-violet" />
                        <span className="text-pretty">
                          {t(k.replace(`${exp.id}.`, `${exp.id}.`))}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-mono text-muted-foreground transition group-hover:border-white/20 group-hover:text-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
