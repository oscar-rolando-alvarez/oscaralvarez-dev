'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, ArrowUpRight } from 'lucide-react';
import { contact } from '@/lib/data';
import { SectionHeading } from './section-heading';
import { Magnetic } from './magnetic';

const channels = [
  { icon: Mail, labelKey: 'email', value: contact.email, href: `mailto:${contact.email}` },
  { icon: Phone, labelKey: 'phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s+/g, '')}` },
  { icon: MapPin, labelKey: 'location', value: contact.location, href: undefined },
  { icon: Github, labelKey: 'github', value: 'oscar-rolando-alvarez', href: contact.github },
  { icon: Linkedin, labelKey: 'linkedin', value: 'oscar-rolando-alvarez', href: contact.linkedin },
  { icon: Globe, labelKey: 'arkis', value: 'arkisgroup.co', href: contact.arkis },
];

export function Contact() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="relative scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-8 backdrop-blur-xl sm:p-12 md:p-16">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(60% 60% at 80% 20%, rgba(139,92,246,0.18), transparent 60%), radial-gradient(60% 60% at 20% 80%, rgba(6,182,212,0.18), transparent 60%)',
            }}
          />
          <SectionHeading
            eyebrow={t('eyebrow')}
            title={t.rich('title', {
              highlight: (chunks) => <span className="gradient-text">{chunks}</span>,
            })}
            description={t('subtitle')}
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((c, i) => {
              const Icon = c.icon;
              const inner = (
                <div className="group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/25 hover:bg-white/[0.08]">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent-cyan/20 via-accent-violet/20 to-accent-fuchsia/20 text-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      {t(c.labelKey)}
                    </div>
                    <div className="truncate text-sm font-medium text-foreground">{c.value}</div>
                  </div>
                  {c.href ? (
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  ) : null}
                </div>
              );
              return (
                <motion.div
                  key={c.labelKey}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                >
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <Magnetic>
              <a
                href={`mailto:${contact.email}?subject=Hola%20Oscar`}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)] transition hover:shadow-[0_14px_50px_-10px_rgba(139,92,246,0.6)]"
              >
                <span className="absolute inset-0 -z-10 translate-x-[-110%] bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-fuchsia transition-transform duration-700 group-hover:translate-x-0" />
                <span className="relative transition-colors duration-500 group-hover:text-white">
                  {t('writeMe')}
                </span>
                <ArrowUpRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
