'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { LanguageSwitcher } from './language-switcher';
import { ThemeToggle } from './theme-toggle';

const sections = [
  { id: 'about', key: 'about' },
  { id: 'experience', key: 'experience' },
  { id: 'stack', key: 'stack' },
  { id: 'products', key: 'products' },
  { id: 'contact', key: 'contact' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'py-2' : 'py-4',
      )}
    >
      <nav
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 transition-all duration-500',
          scrolled
            ? 'border-white/10 bg-background/70 backdrop-blur-xl shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)]'
            : 'border-transparent bg-transparent',
        )}
      >
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-2 font-display font-bold tracking-tight"
        >
          <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-accent-cyan via-accent-violet to-accent-fuchsia text-sm text-white shadow-[0_0_24px_rgba(139,92,246,0.45)]">
            <span className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />
            OA
          </span>
          <span className="hidden text-sm sm:inline">oscaralvarez.dev</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              >
                {t(s.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-foreground md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-background/90 p-4 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  >
                    {t(s.key)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
              <LanguageSwitcher />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
