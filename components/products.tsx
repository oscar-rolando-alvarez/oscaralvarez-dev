'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { arkisProducts, type Product, type ProductStatus } from '@/lib/products';
import { SectionHeading } from './section-heading';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useRef } from 'react';

const accentClasses: Record<Product['accent'], { gradient: string; text: string; ring: string }> = {
  cyan: {
    gradient: 'from-accent-cyan/30 via-accent-cyan/0 to-accent-cyan/0',
    text: 'text-accent-cyan',
    ring: 'group-hover:border-accent-cyan/50',
  },
  violet: {
    gradient: 'from-accent-violet/30 via-accent-violet/0 to-accent-violet/0',
    text: 'text-accent-violet',
    ring: 'group-hover:border-accent-violet/50',
  },
  fuchsia: {
    gradient: 'from-accent-fuchsia/30 via-accent-fuchsia/0 to-accent-fuchsia/0',
    text: 'text-accent-fuchsia',
    ring: 'group-hover:border-accent-fuchsia/50',
  },
  amber: {
    gradient: 'from-accent-amber/30 via-accent-amber/0 to-accent-amber/0',
    text: 'text-accent-amber',
    ring: 'group-hover:border-accent-amber/50',
  },
  emerald: {
    gradient: 'from-emerald-400/30 via-emerald-400/0 to-emerald-400/0',
    text: 'text-emerald-400',
    ring: 'group-hover:border-emerald-400/50',
  },
  rose: {
    gradient: 'from-rose-400/30 via-rose-400/0 to-rose-400/0',
    text: 'text-rose-400',
    ring: 'group-hover:border-rose-400/50',
  },
};

const statusBadge: Record<ProductStatus, string> = {
  live: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
  beta: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
  soon: 'bg-white/10 text-muted-foreground border-white/20',
};

function TiltCard({ product, index }: { product: Product; index: number }) {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-50, 50], [6, -6]), { stiffness: 220, damping: 22 });
  const ry = useSpring(useTransform(mx, [-50, 50], [-6, 6]), { stiffness: 220, damping: 22 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 100);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 100);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const a = accentClasses[product.accent];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.04 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      className={cn(
        'group relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition will-change-transform',
        a.ring,
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition group-hover:opacity-100',
          a.gradient,
        )}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-bold tracking-tight">{product.name}</h3>
          {product.domain ? (
            <p className="mt-0.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {product.domain}
            </p>
          ) : null}
        </div>
        <span
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest',
            statusBadge[product.status],
          )}
        >
          {product.status === 'live' ? (
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ) : null}
          {t(`products.status.${product.status}`)}
        </span>
      </div>

      <p className={cn('relative mt-4 text-sm font-medium', a.text)}>
        {t(product.taglineKey)}
      </p>
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
        {t(product.descriptionKey)}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {product.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {product.href ? (
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80 transition hover:text-foreground"
        >
          {t('products.visit')}
          <ExternalLink className="h-3 w-3" />
        </a>
      ) : null}
    </motion.div>
  );
}

export function Products() {
  const t = useTranslations('products');

  return (
    <section id="products" className="relative scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t.rich('title', {
            highlight: (chunks) => <span className="gradient-text">{chunks}</span>,
          })}
          description={t('subtitle')}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {arkisProducts.map((p, i) => (
            <TiltCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="https://arkisgroup.co"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition hover:border-white/30 hover:bg-white/10"
          >
            {t('viewAll')}
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
