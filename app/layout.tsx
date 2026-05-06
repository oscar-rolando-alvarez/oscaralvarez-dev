import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://oscaralvarez.dev'),
  title: {
    default: 'Oscar Alvarez · Principal AI Systems Architect',
    template: '%s · Oscar Alvarez',
  },
  description:
    'Principal AI Systems Architect with 23+ years building distributed real-time platforms and cloud-native AI infrastructure. Founder of Arkis Group.',
  authors: [{ name: 'Oscar Rolando Alvarez Cardenas', url: 'https://oscaralvarez.dev' }],
  creator: 'Oscar Rolando Alvarez Cardenas',
  keywords: [
    'AI Systems Architect',
    'Principal Architect',
    'Distributed Systems',
    'Apache Kafka',
    'AWS Kinesis',
    'LLM Integration',
    'Cloud-Native',
    'Event-Driven Architecture',
    'Arkis Group',
    'IoT Platforms',
    'Real-time Streaming',
    'Bogotá',
    'Colombia',
    'Remote',
  ],
  openGraph: {
    type: 'website',
    title: 'Oscar Alvarez · Principal AI Systems Architect',
    description:
      'Designing distributed real-time platforms processing telemetry from 6.2M+ IoT devices with sub-second latency, and embedding LLM intelligence into enterprise systems.',
    siteName: 'oscaralvarez.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oscar Alvarez · Principal AI Systems Architect',
    description:
      'Distributed systems & cloud-native AI infrastructure. 23+ years. Founder of Arkis Group.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
