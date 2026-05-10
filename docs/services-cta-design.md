# Services & CTAs — Closing Design (Phase 2)

> Goal: turn oscar-alvarez.dev into a closing tool that produces ≥ USD 15,000 / month
> from two distinct buyer journeys: **consulting** (architects/CTOs) and **investors** (VCs/angels for Arkis).
> Two consulting clients at the USD 7.5k floor = goal met.

This document is the design spec for the service catalog, copy, CTAs, and conversion flow
that should land on the site once Phase 1 (analytics + lead capture) is live and producing data.

---

## 1. Productized service packages

The current `RateCard` shows a generic hourly + retainer rate. That underprices Oscar's
positioning and forces every prospect to do mental math. Replace it with **named tiers**.
Buyers pick a tier, not a number; we negotiate scope inside the tier.

### Tier 1 — Architecture Audit · USD 7,500 (one-shot)

- 2 weeks, fixed scope.
- Deliverables:
  1. Architecture diagram (current + target state) in C4 model.
  2. Top 5 risks ranked by blast radius × probability.
  3. 90-day remediation plan with effort estimates.
  4. 60-min walkthrough call with the engineering leadership.
- Best for: CTOs who suspect their distributed system has hidden risk and want
  an outside Principal-level read before committing to a rebuild.
- **Why this exists:** lowest-friction first engagement. Converts cold leads into
  paying clients in < 30 days. Most audits expand into Tier 2 or Tier 3.

### Tier 2 — Fractional Principal Architect · USD 15,000 / month (3-month minimum)

- 30–40 hours / month of senior-level architecture ownership.
- Deliverables:
  - Architecture decision records (ADRs) for every non-trivial decision.
  - Weekly working session with engineering leadership.
  - Async code review for staff/principal-level PRs.
  - Hiring panel participation for senior+ engineering hires.
  - On-demand Slack/Discord access (24h SLA).
- Best for: Series A/B startups that need Principal-level architecture without
  a USD 350k+/yr full-time hire.
- **Why this exists:** the core revenue engine. **One client = goal met.**
  Designed to feel like hiring a fractional CTO without the equity ask.

### Tier 3 — Project Rescue (Arkis SWAT) · USD 8k / 35k / 80k+ (fixed)

- Re-package the existing Arkis SWAT methodology (RAPID) on the site.
- Three fixed bands; no hourly fees.
- Best for: projects in production crisis (latency, downtime, failed migration).
- **Why this exists:** highest urgency = highest willingness to pay. Comes through
  inbound from referrals; the website's job is to make it findable and credible.

### Tier 4 — Strategic Advisory · USD 5,000 / month (6-month minimum)

- 4 hours / month of advisory time, no implementation.
- Best for: founders/CTOs who need a thinking partner for architecture roadmap.
- **Why this exists:** entry point for buyers who can't yet justify Tier 2.
  Often graduates to Tier 2 after 1–2 quarters.

### Pricing rationale

- Floor (USD 7.5k) anchored to the existing rate card; do not lower it.
- Tier 2 (USD 15k/mo) sits at the "fractional CTO" market band (USD 10–25k/mo for the same seniority).
- Tier 3 inherits Arkis SWAT's existing pricing structure for credibility.
- Public pricing is a **positioning tool**, not a negotiation start. Negotiate scope, not price.

---

## 2. CTA strategy by audience

The site has two buyers with completely different decision processes. Keep them visually separated.

### Consulting buyer (CTO / VP Eng / founder)

- **Primary CTA:** "Book a 30-min architecture call" → Cal.com.
- **Path:** Hero → primary CTA. If they scroll, contact form with `intent=consulting` toggled by default.
- **Friction budget:** very low. Calendar in 1 click; email reply in < 24h.
- **Proof they need:** real numbers (6.2M IoT devices, 23 yrs, 16 products, 0 forks).
- **Objection to defuse:** "is this person actually hands-on?" → GitHub activity widget + ship cadence chart.

### Investor buyer (VC partner / angel)

- **Primary CTA:** "Request the Arkis deck" → email or short form posting `intent=investor`.
- **Path:** Secondary CTA in hero ("For investors") → contact section with `intent=investor` toggle.
- **Friction budget:** medium. Investors expect to fill a brief form; that's their world.
- **Proof they need:** USD 85M+ savings documented, 140+ AI agents in prod, LATAM market thesis.
- **Objection to defuse:** "is Arkis a real holding or a side project?" → dedicated `/arkis` deep link to arkisgroup.co + product catalog as evidence.

### Visual hierarchy

```
Hero CTAs (left to right):
  [● Book a call]  [○ For investors]  [— View products]
   primary action   secondary action   tertiary navigation
```

In the contact section, the **intent toggle** at the top of the form re-skins the
primary CTA card and the budget/ticket dropdown. Same component, different conversion path.

---

## 3. New site sections required

Add to the `app/[locale]/page.tsx` composition:

1. **`<Services />`** — between `<RateCard />` and `<Contact />`.
   Replace or augment `<RateCard />` with the four tiered cards above.
   Each card has its own CTA (`Book audit`, `Schedule fractional intro`, etc.) routing
   to Cal.com with the tier pre-tagged in the URL (`?tier=audit`).
2. **`<Proof />`** — case studies. Minimum 3 by end of Phase 2.
   Format: problem · approach · numbers · stack · client logo (anonymized if required).
   Without case studies, the rate card is unsupported.
3. **`/investors`** — separate route, **noindex**, link from hero secondary CTA + email signature.
   Lives outside the public crawl so cold investor outreach can use a private link.

---

## 4. Conversion funnel & instrumentation

Every CTA fires a PostHog event (already wired in Phase 1). Define the funnels in PostHog:

### Consulting funnel

```
1. $pageview (any locale)
2. cta_book_call_click  OR  hero_cta_book_call_click
3. (out-of-band) Cal.com booking confirmed → webhook → posthog.alias() to identified user
4. contact_form_submit { intent: 'consulting' }   ← optional secondary path
5. contact_form_success { intent: 'consulting' }
```

Target conversion rates (industry baselines for Principal-level B2B):

- Pageview → CTA click: **3–6%**.
- CTA click → booking/form: **20–35%** (Cal.com is higher, form is lower).
- Booking → paying client: **15–25%** for warm referral, **5–10%** for cold inbound.

Working backward from USD 15k/month with 1 client at Tier 2:
- Need **1 close every 2 months** to maintain a single Tier 2 retainer.
- At 10% booking → close, that is **10 bookings every 2 months** = **5 bookings / month**.
- At 25% click → booking, that is **20 CTA clicks / month**.
- At 5% pageview → click, that is **400 qualified pageviews / month**.

400 qualified pageviews / month is the **north-star traffic target**. LinkedIn
posts that link to a case study can produce that volume in a single good post.

### Investor funnel

```
1. $pageview
2. cta_investor_brief_click  OR  hero_cta_investor_click
3. contact_form_submit { intent: 'investor' }
4. (out-of-band) deck delivered + intro call booked
```

Volume here is much lower (10s of investors per quarter, not 100s). Optimize for
**signal**, not volume: capture company, ticket size, and vertical so we can
qualify before the call.

---

## 5. Copy patterns that close

### Headline pattern

```
[Specific number] + [Specific outcome] + [In a domain they recognize]
```

Examples used on site:
- ✅ "Telemetry from 6.2M+ IoT devices with sub-second latency."
- ✅ "16 products in production. 0 forks."
- ❌ "I help companies scale." (vague, no signal)

### CTA pattern

```
[Verb] + [Concrete deliverable] + [Implicit time bound]
```

- ✅ "Book a 30-min architecture call"
- ✅ "Request the Arkis deck"
- ❌ "Get in touch" (no commitment, no deliverable)
- ❌ "Let's talk" (current Spanish CTA, vague)

### Objection-handling pattern (for case study pages)

For each case study, address the 3 most likely objections inline:

1. "How do I know this is real?" → link to public repo, deployed URL, or
   client logo with permission.
2. "Will this work in my context?" → list of constraints/anti-patterns where
   the approach does NOT apply.
3. "Why pay you instead of hiring?" → math: USD 15k/mo × 6 months vs USD 350k/yr FTE
   loaded cost (~USD 460k including benefits/equity).

---

## 6. Implementation order (after Phase 1 ships)

1. **Week 1:** ship `<Services />` section with 4 tiered cards. Wire each tier's
   primary CTA to a tagged Cal.com link.
2. **Week 2:** ship first case study (Lean Tech / 6.2M devices) as `/case-studies/leantech`.
   This is the highest-credibility asset and unblocks LinkedIn outbound.
3. **Week 3:** ship `/investors` route + investor-specific copy variant.
4. **Week 4:** review PostHog funnels, identify the lowest-converting step,
   ship one A/B test (likely the form length or the CTA copy).

Once these four weeks ship, the site has everything needed to convert paid
LinkedIn/email outbound traffic. SEO compounding follows over months 2–6.

---

## 7. Open questions to resolve before implementing

- [ ] Cal.com handle / link Oscar wants to use (e.g. `oscar-alvarez/30min`).
- [ ] Web3Forms (or alternative) account + access key for the contact form.
- [ ] Confirm the four tier names and prices above, or override.
- [ ] Decide whether `/investors` is fully private (link-only) or semi-public.
- [ ] Pick the first case study client + confirm what numbers can be public.
- [ ] PostHog account + project key, or pick a different tool (Plausible / Umami).
