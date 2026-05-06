'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { githubStats } from '@/lib/data';
import { SectionHeading } from './section-heading';
import { Github, GitBranch, Package, Calendar, Code2, FolderGit2 } from 'lucide-react';

export function GitHubActivity() {
  const t = useTranslations('github');

  const cards = [
    {
      icon: FolderGit2,
      label: t('totalRepos'),
      value: githubStats.totalRepos,
      sub: `${githubStats.publicRepos} ${t('publicRepos').toLowerCase()} · ${githubStats.privateRepos} ${t('privateRepos').toLowerCase()}`,
      accent: 'text-accent-cyan',
    },
    {
      icon: GitBranch,
      label: t('forks'),
      value: githubStats.forks,
      sub: '100% original',
      accent: 'text-accent-violet',
    },
    {
      icon: Package,
      label: t('products'),
      value: `${githubStats.productsInProduction}+`,
      sub: 'Arkis Group',
      accent: 'text-accent-fuchsia',
    },
    {
      icon: Calendar,
      label: t('yearsActive'),
      value: `${githubStats.yearsActive}+`,
      sub: '1998 → today',
      accent: 'text-accent-amber',
    },
    {
      icon: Code2,
      label: t('languages'),
      value: githubStats.primaryLanguages.length,
      sub: githubStats.primaryLanguages.join(' · '),
      accent: 'text-emerald-400',
    },
  ];

  return (
    <section id="github" className="relative scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('subtitle')}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition hover:border-white/25"
              >
                <div className="absolute right-3 top-3 opacity-30 transition group-hover:opacity-100">
                  <Icon className={`h-4 w-4 ${c.accent}`} />
                </div>
                <div className="font-display text-3xl font-bold tracking-tight">
                  <span className="gradient-text">{c.value}</span>
                </div>
                <div className="mt-1 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                  {c.label}
                </div>
                <div className="mt-2 truncate text-xs text-muted-foreground/80" title={c.sub}>
                  {c.sub}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={`https://github.com/${githubStats.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition hover:border-white/30 hover:bg-white/10"
          >
            <Github className="h-4 w-4" />
            {t('viewProfile')}
            <span className="text-muted-foreground">/{githubStats.username}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
