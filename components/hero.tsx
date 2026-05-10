'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { ArrowDown, ArrowUpRight, CalendarCheck, Sparkles } from 'lucide-react';
import { AnimatedBackground } from './animated-bg';
import { Magnetic } from './magnetic';
import { conversion, contact } from '@/lib/data';
import { track } from './posthog-provider';

const heroCalHref = conversion.calLink
  ? `https://cal.com/${conversion.calLink}`
  : `mailto:${contact.email}?subject=${encodeURIComponent('Architecture call request')}`;

export function Hero() {
  const t = useTranslations('hero');
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      <AnimatedBackground />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent-cyan" aria-hidden />
          {t('eyebrow')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="block text-foreground/95">{t('name').split(' ').slice(0, 1).join(' ')}</span>
          <span className="block">
            <span className="gradient-text">{t('name').split(' ').slice(1).join(' ')}</span>
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-xl font-medium tracking-tight text-foreground/80 sm:text-2xl"
        >
          <span>{t('title')}</span>
          <span className="hidden h-1 w-1 rounded-full bg-foreground/40 sm:inline-block" />
          <span className="text-muted-foreground">{t('subtitle')}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty"
        >
          {t.rich('tagline', {
            distributed: (chunks) => (
              <span className="font-medium text-foreground">{chunks}</span>
            ),
            iot: (chunks) => (
              <span className="font-mono text-accent-cyan">{chunks}</span>
            ),
            latency: (chunks) => (
              <span className="font-mono text-accent-violet">{chunks}</span>
            ),
            ships: (chunks) => (
              <span className="font-medium text-accent-fuchsia">{chunks}</span>
            ),
            languages: (chunks) => (
              <span className="font-medium text-foreground">{chunks}</span>
            ),
            github: (chunks) => (
              <span className="font-mono text-accent-amber">{chunks}</span>
            ),
          })}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/80"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
            {t('miniStat1')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-violet" />
            {t('miniStat2')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-fuchsia" />
            {t('miniStat3')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-amber" />
            {t('miniStat4')}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <a
              href={heroCalHref}
              target={heroCalHref.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={() => track('hero_cta_book_call_click')}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)] transition hover:shadow-[0_14px_50px_-10px_rgba(139,92,246,0.6)]"
            >
              <span className="absolute inset-0 -z-10 translate-x-[-110%] bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-fuchsia transition-transform duration-700 group-hover:translate-x-0" />
              <CalendarCheck className="relative h-4 w-4" />
              <span className="relative transition-colors duration-500 group-hover:text-white">
                {t('ctaPrimary')}
              </span>
              <ArrowUpRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              onClick={() => track('hero_cta_investor_click')}
              className="inline-flex items-center gap-2 rounded-full border border-accent-fuchsia/30 bg-accent-fuchsia/[0.06] px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition hover:border-accent-fuchsia/60 hover:bg-accent-fuchsia/[0.12]"
            >
              {t('ctaInvestor')}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#products"
              onClick={() => track('hero_cta_products_click')}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition hover:border-white/25 hover:bg-white/10"
            >
              {t('ctaSecondary')}
              <ArrowDown className="h-4 w-4" />
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 md:flex"
        >
          <span>{t('scroll')}</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-9 w-[1px] bg-gradient-to-b from-foreground/60 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
