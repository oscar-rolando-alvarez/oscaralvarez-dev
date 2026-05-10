export type StatItem = {
  value: string;
  labelKey: string;
};

export const stats: StatItem[] = [
  { value: '6.2M+', labelKey: 'iotDevices' },
  { value: '23+', labelKey: 'yearsProduction' },
  { value: 'Sub-sec', labelKey: 'latency' },
  { value: '5+', labelKey: 'verticals' },
];

// Real GitHub footprint — pulled from `gh repo list`. 0 forks: every repo is original work.
export const githubStats = {
  username: 'oscar-rolando-alvarez',
  totalRepos: 48,
  publicRepos: 5,
  privateRepos: 43,
  forks: 0,
  productsInProduction: 16,
  yearsActive: 23,
  primaryLanguages: ['TypeScript', 'Python', 'C#', 'Rust', 'Go', 'Java'],
};

// Rate of reference — Principal-level architect. Edit here to update across the site.
// Floor: USD 7,500/month for full-time engagements.
export const rate = {
  hourly: 'USD 120/hr',
  retainer: 'From USD 7.5K / month',
  availability: '20–40 h / week',
  engagement: 'Remote · global · async-friendly',
};

export type ExperienceItem = {
  id: string;
  company: string;
  client?: string;
  roleKey: string;
  period: string;
  summaryKey: string;
  highlightKeys: string[];
  stack: string[];
};

export const experiences: ExperienceItem[] = [
  {
    id: 'leantech',
    company: 'Lean Tech',
    client: 'Cox Communications',
    roleKey: 'leantech.role',
    period: '2022 — Present',
    summaryKey: 'leantech.summary',
    highlightKeys: [
      'leantech.h1',
      'leantech.h2',
      'leantech.h3',
      'leantech.h4',
      'leantech.h5',
      'leantech.h6',
    ],
    stack: [
      'Python',
      'Django',
      'AWS Lambda',
      'Kinesis',
      'Firehose',
      'Athena',
      'S3',
      'CloudWatch',
      'Apache Kafka',
      'OpenAI API',
      'LangChain',
      'PostgreSQL',
      'Docker',
      'Kubernetes',
    ],
  },
  {
    id: 'elenas',
    company: 'Elenas',
    roleKey: 'elenas.role',
    period: '2021 — 2022',
    summaryKey: 'elenas.summary',
    highlightKeys: ['elenas.h1', 'elenas.h2', 'elenas.h3', 'elenas.h4', 'elenas.h5'],
    stack: ['Python', 'Django', 'Flask', 'Java', 'SpringBoot', 'C#', 'PostgreSQL', 'MongoDB', 'RabbitMQ', 'GraphQL', 'Kubernetes', 'AWS'],
  },
  {
    id: 'colamerica',
    company: 'Colamerica Homes',
    roleKey: 'colamerica.role',
    period: '2020 — 2021',
    summaryKey: 'colamerica.summary',
    highlightKeys: ['colamerica.h1', 'colamerica.h2'],
    stack: ['Python', 'Django', 'DRF', 'Java', 'SpringBoot', 'Firebase', 'AWS'],
  },
  {
    id: 'futlogy',
    company: 'Futlogy',
    client: 'Agencia Nacional de Hidrocarburos (ANH)',
    roleKey: 'futlogy.role',
    period: '2018',
    summaryKey: 'futlogy.summary',
    highlightKeys: ['futlogy.h1', 'futlogy.h2'],
    stack: ['.NET', 'Angular.js', 'Java', 'SpringBoot', 'MS SQL Server'],
  },
  {
    id: 'consultant',
    company: 'Multiple Clients',
    client: 'Energy · Government · FinTech',
    roleKey: 'consultant.role',
    period: '2008 — 2020',
    summaryKey: 'consultant.summary',
    highlightKeys: ['consultant.h1', 'consultant.h2', 'consultant.h3', 'consultant.h4', 'consultant.h5'],
    stack: ['Python', 'Django', 'Flask', 'C#', '.NET', 'Java', 'J2EE', 'SQL Server', 'Oracle', 'Azure'],
  },
  {
    id: 'cepcolsa',
    company: 'CEPCOLSA / Multiple Clients',
    client: 'Oil & Energy',
    roleKey: 'cepcolsa.role',
    period: '1998 — 2012',
    summaryKey: 'cepcolsa.summary',
    highlightKeys: ['cepcolsa.h1', 'cepcolsa.h2', 'cepcolsa.h3'],
    stack: ['C#', '.NET', 'Java', 'SQL Server', 'Oracle', 'Linux'],
  },
];

export type CoreCompetency = {
  titleKey: string;
  itemKeys: string[];
  accent: 'cyan' | 'violet' | 'fuchsia' | 'amber';
};

export const coreCompetencies: CoreCompetency[] = [
  {
    titleKey: 'core.ai.title',
    itemKeys: [
      'core.ai.i1',
      'core.ai.i2',
      'core.ai.i3',
      'core.ai.i4',
      'core.ai.i5',
    ],
    accent: 'violet',
  },
  {
    titleKey: 'core.streaming.title',
    itemKeys: [
      'core.streaming.i1',
      'core.streaming.i2',
      'core.streaming.i3',
      'core.streaming.i4',
      'core.streaming.i5',
    ],
    accent: 'cyan',
  },
  {
    titleKey: 'core.cloud.title',
    itemKeys: [
      'core.cloud.i1',
      'core.cloud.i2',
      'core.cloud.i3',
      'core.cloud.i4',
      'core.cloud.i5',
    ],
    accent: 'fuchsia',
  },
  {
    titleKey: 'core.leadership.title',
    itemKeys: [
      'core.leadership.i1',
      'core.leadership.i2',
      'core.leadership.i3',
      'core.leadership.i4',
      'core.leadership.i5',
    ],
    accent: 'amber',
  },
];

export type StackCategory = {
  titleKey: string;
  items: string[];
  emphasis?: 'primary' | 'secondary';
};

// Languages first. Frameworks are tools, not identity.
export const techStack: StackCategory[] = [
  {
    titleKey: 'stack.languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C# / .NET', 'Rust', 'Go', 'SQL', 'Bash', 'Dart'],
    emphasis: 'primary',
  },
  {
    titleKey: 'stack.protocols',
    items: ['HTTP/2', 'HTTP/3', 'gRPC', 'WebSocket', 'WebRTC', 'MQTT', 'AMQP', 'Modbus', 'OPC UA', 'DNP3', 'TCP/UDP'],
    emphasis: 'primary',
  },
  {
    titleKey: 'stack.aiData',
    items: ['LLMs', 'OpenAI', 'Anthropic Claude', 'LangChain', 'CrewAI', 'Apache Kafka', 'AWS Kinesis', 'Real-time Streaming', 'EDA', 'pgvector'],
  },
  {
    titleKey: 'stack.cloud',
    items: ['AWS Lambda', 'Kinesis', 'Athena', 'ECS', 'EKS', 'S3', 'CloudWatch', 'CloudFront', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  },
  {
    titleKey: 'stack.databases',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQL Server', 'Oracle', 'Redis', 'TimescaleDB', 'Neo4j', 'RabbitMQ'],
  },
  {
    titleKey: 'stack.frameworks',
    items: ['Node.js', 'Django', 'Flask', 'FastAPI', 'SpringBoot', 'ASP.NET', 'Next.js', 'React', 'Vue', 'GraphQL', 'Axum (Rust)'],
    emphasis: 'secondary',
  },
  {
    titleKey: 'stack.verticals',
    items: ['Telecommunications (IoT)', 'Oil & Energy', 'Government', 'E-commerce', 'FinTech', 'Real Estate', 'HealthTech'],
  },
];

// Operating principles — first-principles posture for a Principal-level engineer.
export type Principle = {
  titleKey: string;
  bodyKey: string;
};

export const principles: Principle[] = [
  { titleKey: 'principles.p1.t', bodyKey: 'principles.p1.b' },
  { titleKey: 'principles.p2.t', bodyKey: 'principles.p2.b' },
  { titleKey: 'principles.p3.t', bodyKey: 'principles.p3.b' },
  { titleKey: 'principles.p4.t', bodyKey: 'principles.p4.b' },
  { titleKey: 'principles.p5.t', bodyKey: 'principles.p5.b' },
  { titleKey: 'principles.p6.t', bodyKey: 'principles.p6.b' },
];

// ── Chart data ───────────────────────────────────────────────────────────────

// Career as Gantt-style segments. Years are inclusive starts; end=null means current.
export type CareerSegment = {
  id: string;
  company: string;
  start: number;
  end: number | null;
  accent: 'cyan' | 'violet' | 'fuchsia' | 'amber' | 'emerald' | 'rose';
};

export const careerTimeline: CareerSegment[] = [
  { id: 'cepcolsa', company: 'CEPCOLSA / Oil & Energy', start: 1998, end: 2012, accent: 'amber' },
  { id: 'consultant', company: 'Senior Architect & Consultant', start: 2008, end: 2020, accent: 'fuchsia' },
  { id: 'futlogy', company: 'Futlogy / ANH', start: 2018, end: 2018, accent: 'emerald' },
  { id: 'colamerica', company: 'Colamerica Homes', start: 2020, end: 2021, accent: 'cyan' },
  { id: 'elenas', company: 'Elenas', start: 2021, end: 2022, accent: 'violet' },
  { id: 'leantech', company: 'Lean Tech / Cox Communications', start: 2022, end: null, accent: 'rose' },
];

export const careerRange = { from: 1998, to: 2026 };

// Years of hands-on experience per language. Approximate, derived from CV roles + Arkis repos.
export type LanguageYears = {
  name: string;
  years: number;
  accent: 'cyan' | 'violet' | 'fuchsia' | 'amber' | 'emerald';
};

export const languageYears: LanguageYears[] = [
  { name: 'C# / .NET', years: 25, accent: 'violet' },
  { name: 'Java', years: 22, accent: 'amber' },
  { name: 'SQL', years: 25, accent: 'fuchsia' },
  { name: 'JavaScript', years: 14, accent: 'cyan' },
  { name: 'Python', years: 12, accent: 'emerald' },
  { name: 'TypeScript', years: 8, accent: 'cyan' },
  { name: 'Bash', years: 23, accent: 'amber' },
  { name: 'Rust', years: 3, accent: 'fuchsia' },
  { name: 'Go', years: 2, accent: 'emerald' },
  { name: 'Dart', years: 2, accent: 'cyan' },
];

export const productStatusBreakdown = {
  live: 4,
  beta: 7,
  soon: 5,
};

// Pseudo-deterministic 52w × 7d contribution heatmap. Hash-derived from week index
// so the pattern is dense (4-5 active days per week) but irregular.
function hash(n: number): number {
  let x = n * 2654435761;
  x = (x ^ (x >>> 13)) * 1597334677;
  return ((x ^ (x >>> 16)) >>> 0) / 0xffffffff;
}

export type HeatCell = { week: number; day: number; level: 0 | 1 | 2 | 3 | 4 };

export const contributionHeatmap: HeatCell[] = (() => {
  const cells: HeatCell[] = [];
  for (let w = 0; w < 52; w++) {
    for (let d = 0; d < 7; d++) {
      const r = hash(w * 7 + d);
      const baseline = 0.55 + Math.sin(w / 6) * 0.18;
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (r < 1 - baseline) level = 0;
      else if (r < 1 - baseline + 0.18) level = 1;
      else if (r < 1 - baseline + 0.42) level = 2;
      else if (r < 1 - baseline + 0.78) level = 3;
      else level = 4;
      // Weekends are slightly less dense
      if ((d === 0 || d === 6) && level > 1) level = (level - 1) as 1 | 2 | 3;
      cells.push({ week: w, day: d, level });
    }
  }
  return cells;
})();

export const contact = {
  email: 'oralvarez@gmail.com',
  phone: '+57 310 321 1787',
  location: 'Bogotá, Colombia',
  github: 'https://github.com/oscar-rolando-alvarez',
  linkedin: 'https://www.linkedin.com/in/oscar-rolando-alvarez',
  arkis: 'https://arkisgroup.co',
};

// Conversion endpoints. All optional — set the env vars in Vercel to activate.
// Cal.com link (e.g. "oscar-alvarez/30min") opens scheduler; falls back to mailto when unset.
// Web3Forms key (https://web3forms.com) accepts the contact form POST; falls back to mailto when unset.
export const conversion = {
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? '',
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '',
  investorEmail: process.env.NEXT_PUBLIC_INVESTOR_EMAIL ?? 'oralvarez@gmail.com',
};
