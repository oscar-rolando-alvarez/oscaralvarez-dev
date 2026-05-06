'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { useTranslations } from 'next-intl';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('theme');
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t('toggle')}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition hover:text-foreground"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
