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
};

export const techStack: StackCategory[] = [
  {
    titleKey: 'stack.languages',
    items: ['Python', 'Java', 'C# / .NET', 'TypeScript', 'JavaScript', 'Rust', 'Go', 'SQL'],
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
    titleKey: 'stack.frameworks',
    items: ['Django', 'Flask', 'FastAPI', 'SpringBoot', 'ASP.NET', 'Next.js', 'React', 'Vue', 'GraphQL'],
  },
  {
    titleKey: 'stack.databases',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQL Server', 'Oracle', 'Redis', 'TimescaleDB', 'Neo4j', 'RabbitMQ'],
  },
  {
    titleKey: 'stack.verticals',
    items: ['Telecommunications (IoT)', 'Oil & Energy', 'Government', 'E-commerce', 'FinTech', 'Real Estate', 'HealthTech'],
  },
];

export const contact = {
  email: 'oralvarez@gmail.com',
  phone: '+57 310 321 1787',
  location: 'Bogotá, Colombia',
  github: 'https://github.com/oscar-rolando-alvarez',
  linkedin: 'https://www.linkedin.com/in/oscar-rolando-alvarez',
  arkis: 'https://arkisgroup.co',
};
