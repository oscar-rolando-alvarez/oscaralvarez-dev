'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  ArrowUpRight,
  CalendarCheck,
  Briefcase,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { contact, conversion } from '@/lib/data';
import { SectionHeading } from './section-heading';
import { track } from './posthog-provider';

const channels = [
  { icon: Mail, labelKey: 'email', value: contact.email, href: `mailto:${contact.email}` },
  { icon: Phone, labelKey: 'phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s+/g, '')}` },
  { icon: MapPin, labelKey: 'location', value: contact.location, href: undefined },
  { icon: Github, labelKey: 'github', value: 'oscar-rolando-alvarez', href: contact.github },
  { icon: Linkedin, labelKey: 'linkedin', value: 'oscar-rolando-alvarez', href: contact.linkedin },
  { icon: Globe, labelKey: 'arkis', value: 'arkisgroup.co', href: contact.arkis },
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

const calHref = conversion.calLink
  ? `https://cal.com/${conversion.calLink}`
  : `mailto:${contact.email}?subject=${encodeURIComponent('Architecture call request')}`;

const investorHref = `mailto:${conversion.investorEmail}?subject=${encodeURIComponent(
  'Investor inquiry — Arkis Group',
)}`;

export function Contact() {
  const t = useTranslations('contact');
  const [intent, setIntent] = useState<'consulting' | 'investor'>('consulting');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set('intent', intent);
    data.set('source', 'oscar-alvarez.dev');

    track('contact_form_submit', {
      intent,
      hasCompany: Boolean(data.get('company')),
      hasBudget: Boolean(data.get('budget')),
    });

    if (!conversion.web3formsKey) {
      const subject =
        intent === 'investor'
          ? 'Investor inquiry — Arkis Group'
          : 'Consulting inquiry — oscar-alvarez.dev';
      const lines = [
        `Name: ${data.get('name') ?? ''}`,
        `Company: ${data.get('company') ?? ''}`,
        `Budget: ${data.get('budget') ?? ''}`,
        `Intent: ${intent}`,
        '',
        String(data.get('message') ?? ''),
      ].join('\n');
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(lines)}`;
      setStatus('success');
      return;
    }

    data.set('access_key', conversion.web3formsKey);
    data.set(
      'subject',
      intent === 'investor'
        ? `Investor inquiry — ${data.get('name') ?? 'unknown'}`
        : `Consulting inquiry — ${data.get('name') ?? 'unknown'}`,
    );

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        form.reset();
        track('contact_form_success', { intent });
      } else {
        setStatus('error');
        setError(json.message ?? 'Submission failed');
        track('contact_form_error', { intent, message: json.message });
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Network error');
      track('contact_form_error', { intent, message: 'network' });
    }
  }

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

          {/* Intent toggle — consulting vs investor */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            <IntentButton
              active={intent === 'consulting'}
              onClick={() => {
                setIntent('consulting');
                track('contact_intent_change', { intent: 'consulting' });
              }}
              icon={<Briefcase className="h-4 w-4" />}
              label={t('intentConsulting')}
            />
            <IntentButton
              active={intent === 'investor'}
              onClick={() => {
                setIntent('investor');
                track('contact_intent_change', { intent: 'investor' });
              }}
              icon={<Globe className="h-4 w-4" />}
              label={t('intentInvestor')}
            />
          </div>

          {/* Primary CTAs (Cal.com + investor brief) */}
          <div className="mb-10 grid gap-3 sm:grid-cols-2">
            {intent === 'consulting' ? (
              <a
                href={calHref}
                target={calHref.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                onClick={() => track('cta_book_call_click', { intent })}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-accent-cyan/30 bg-gradient-to-br from-accent-cyan/[0.08] to-accent-violet/[0.08] p-5 transition hover:border-accent-cyan/60 hover:from-accent-cyan/[0.14] hover:to-accent-violet/[0.14]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent-cyan/15 text-accent-cyan">
                  <CalendarCheck className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">{t('ctaBookCall')}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{t('ctaBookCallSub')}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>
            ) : (
              <a
                href={investorHref}
                onClick={() => track('cta_investor_brief_click', { intent })}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-accent-fuchsia/30 bg-gradient-to-br from-accent-fuchsia/[0.08] to-accent-violet/[0.08] p-5 transition hover:border-accent-fuchsia/60 hover:from-accent-fuchsia/[0.14] hover:to-accent-violet/[0.14]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent-fuchsia/15 text-accent-fuchsia">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">{t('ctaInvestorBrief')}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{t('ctaInvestorBriefSub')}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>
            )}
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('cta_linkedin_click', { intent })}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/25 hover:bg-white/[0.08]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-foreground">
                <Linkedin className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground">{t('ctaLinkedin')}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{t('ctaLinkedinSub')}</div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </a>
          </div>

          {/* Contact form */}
          <form
            onSubmit={onSubmit}
            className="mb-10 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                name="name"
                required
                label={t('formName')}
                placeholder={t('formNamePh')}
                autoComplete="name"
              />
              <Field
                name="email"
                type="email"
                required
                label={t('formEmail')}
                placeholder={t('formEmailPh')}
                autoComplete="email"
              />
              <Field
                name="company"
                label={t('formCompany')}
                placeholder={t('formCompanyPh')}
                autoComplete="organization"
              />
              <SelectField
                name="budget"
                label={intent === 'investor' ? t('formTicket') : t('formBudget')}
                options={
                  intent === 'investor'
                    ? [
                        { value: '', label: t('formSelect') },
                        { value: '<100k', label: '< USD 100k' },
                        { value: '100k-500k', label: 'USD 100k – 500k' },
                        { value: '500k-2m', label: 'USD 500k – 2M' },
                        { value: '>2m', label: '> USD 2M' },
                        { value: 'exploring', label: t('formExploring') },
                      ]
                    : [
                        { value: '', label: t('formSelect') },
                        { value: 'audit', label: 'Architecture Audit (USD 7.5k)' },
                        { value: 'fractional', label: 'Fractional Architect (USD 15k+/mo)' },
                        { value: 'rescue', label: 'Project Rescue (USD 8k–200k)' },
                        { value: 'advisory', label: 'Advisory (USD 5k/mo)' },
                        { value: 'other', label: t('formOther') },
                      ]
                }
              />
            </div>
            <TextareaField
              name="message"
              required
              label={t('formMessage')}
              placeholder={
                intent === 'investor' ? t('formMessageInvestorPh') : t('formMessageConsultingPh')
              }
              rows={4}
            />
            {/* Honeypot for bots */}
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">{t('formPrivacy')}</p>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)] transition hover:shadow-[0_14px_50px_-10px_rgba(139,92,246,0.6)] disabled:opacity-60"
              >
                <span className="absolute inset-0 -z-10 translate-x-[-110%] bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-fuchsia transition-transform duration-700 group-hover:translate-x-0" />
                <span className="relative transition-colors duration-500 group-hover:text-white">
                  {status === 'submitting' ? t('formSending') : t('formSend')}
                </span>
                <Send className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {status === 'success' ? (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                {t('formSuccess')}
              </div>
            ) : null}
            {status === 'error' ? (
              <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">
                <AlertCircle className="h-4 w-4" />
                {error ?? t('formError')}
              </div>
            ) : null}
          </form>

          {/* Channels grid */}
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
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      onClick={() => track('contact_channel_click', { channel: c.labelKey })}
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function IntentButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? 'border-foreground/40 bg-foreground/10 text-foreground'
          : 'border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/25 hover:text-foreground'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Field({
  name,
  label,
  type = 'text',
  required,
  placeholder,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        {label}
        {required ? <span className="text-accent-fuchsia"> *</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-accent-violet/60 focus:bg-white/[0.06]"
      />
    </label>
  );
}

function SelectField({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <select
        name={name}
        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-accent-violet/60 focus:bg-white/[0.06]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-background">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
  name,
  label,
  required,
  placeholder,
  rows = 4,
}: {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        {label}
        {required ? <span className="text-accent-fuchsia"> *</span> : null}
      </span>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-accent-violet/60 focus:bg-white/[0.06]"
      />
    </label>
  );
}
