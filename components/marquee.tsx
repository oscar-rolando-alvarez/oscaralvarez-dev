'use client';

const items = [
  'AI Systems Architect',
  '6.2M+ IoT Devices',
  'Sub-second Latency',
  'Apache Kafka',
  'AWS Kinesis',
  'LLM Integration',
  'Event-Driven Architecture',
  'Cloud-Native',
  '23+ Years',
  'Bogotá · Remote · Global',
  'Founder of Arkis Group',
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-5">
      <div className="flex animate-marquee gap-12 whitespace-nowrap will-change-transform">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            ◆ {item}
          </span>
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent"
      />
    </div>
  );
}
