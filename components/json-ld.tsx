import { contact } from '@/lib/data';

const SITE_URL = 'https://oscar-alvarez.dev';

export function JsonLd() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Oscar Rolando Alvarez Cardenas',
    alternateName: 'Oscar Alvarez',
    url: SITE_URL,
    image: `${SITE_URL}/icon.svg`,
    jobTitle: 'Principal AI Systems Architect',
    description:
      'Principal AI Systems Architect with 23+ years building distributed real-time platforms and cloud-native AI infrastructure. Founder of Arkis Group.',
    email: `mailto:${contact.email}`,
    telephone: contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bogotá',
      addressCountry: 'CO',
    },
    sameAs: [contact.github, contact.linkedin, contact.arkis],
    worksFor: {
      '@type': 'Organization',
      name: 'Arkis Group',
      url: contact.arkis,
    },
    knowsAbout: [
      'Distributed Systems',
      'Apache Kafka',
      'AWS Kinesis',
      'Event-Driven Architecture',
      'LLM Integration',
      'Real-time Streaming',
      'Cloud-Native Architecture',
      'IoT Platforms',
    ],
  };

  const service = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Oscar Alvarez — Principal AI Systems Architecture Consulting',
    url: SITE_URL,
    image: `${SITE_URL}/icon.svg`,
    priceRange: 'USD 7,500 – USD 30,000+ / month',
    description:
      'Architecture audits, fractional principal architect retainers, and AI/distributed systems consulting for enterprise platforms.',
    areaServed: { '@type': 'Place', name: 'Global (Remote)' },
    provider: {
      '@type': 'Person',
      name: 'Oscar Rolando Alvarez Cardenas',
      url: SITE_URL,
    },
    serviceType: [
      'AI Systems Architecture',
      'Distributed Systems Consulting',
      'Cloud-Native Infrastructure',
      'LLM Integration',
      'Event-Driven Architecture',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
    </>
  );
}
