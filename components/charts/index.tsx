'use client';

import { useTranslations } from 'next-intl';
import { SectionHeading } from '../section-heading';
import { ContributionHeatmap } from './contribution-heatmap';
import { CareerTimeline } from './career-timeline';
import { LanguageBars } from './language-bars';
import { ProductsDonut } from './products-donut';

export function Charts() {
  const t = useTranslations('charts');
  return (
    <section id="charts" className="relative scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('subtitle')}
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <ContributionHeatmap />
          </div>
          <CareerTimeline />
          <ProductsDonut />
          <div className="lg:col-span-2">
            <LanguageBars />
          </div>
        </div>
      </div>
    </section>
  );
}
