'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Languages } from 'lucide-react';
import { cn } from '@/lib/cn';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('lang');
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: 'en' | 'es') => {
    if (next === locale) return;
    const segments = pathname.split('/');
    if (segments[1] === 'en' || segments[1] === 'es') {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    const newPath = segments.join('/') || `/${next}`;
    startTransition(() => router.replace(newPath));
  };

  return (
    <div
      className="relative inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur"
      role="group"
      aria-label={t('switch')}
    >
      <Languages className="ml-2 h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      {(['es', 'en'] as const).map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={locale === code}
          disabled={isPending}
          onClick={() => switchTo(code)}
          className={cn(
            'relative rounded-full px-3 py-1 text-xs font-mono uppercase tracking-widest transition',
            locale === code
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
