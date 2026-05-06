import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/request';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://oscaralvarez.dev';
  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: locale === 'es' ? 1 : 0.9,
  }));
}
