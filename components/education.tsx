'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { GraduationCap, Languages } from 'lucide-react';

export function Education() {
  const t = useTranslations('education');

  return (
    <section className="relative px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
        >
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5 text-accent-cyan" />
            {t('eyebrow')}
          </div>
          <h3 className="font-display text-lg font-semibold tracking-tight">{t('degree')}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t('school')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
        >
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <Languages className="h-3.5 w-3.5 text-accent-violet" />
            {t('languagesLabel')}
          </div>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>{t('english')}</li>
            <li>{t('spanish')}</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
