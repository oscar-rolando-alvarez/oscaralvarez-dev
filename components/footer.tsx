'use client';

import { useTranslations } from 'next-intl';
import { contact } from '@/lib/data';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-xs text-muted-foreground">
          © {year} Oscar Rolando Alvarez Cardenas — {t('rights')}
        </p>
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground/70 font-mono">
          {t('built')}
        </p>
        <div className="flex items-center gap-3 text-muted-foreground">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${contact.email}`}
            aria-label="Email"
            className="transition hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={contact.arkis}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Arkis Group"
            className="transition hover:text-foreground"
          >
            <Globe className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
