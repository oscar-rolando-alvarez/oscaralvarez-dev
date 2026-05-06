'use client';

const items = [
  'Languages over Frameworks',
  'Protocols over Abstractions',
  'Production over Prototypes',
  '48 Own Repos · 0 Forks',
  '6.2M+ IoT Devices',
  'Sub-second Latency',
  'Apache Kafka · AWS Kinesis',
  'JavaScript · TypeScript · Rust · Go · Python · Java · C#',
  'HTTP/2 · gRPC · WebSocket · MQTT · Modbus · OPC UA',
  '16 Products in Production',
  '23+ Years · Since 1998',
  'Bogotá · Remote · Global',
  'Founder of Arkis Group',
  'Weekly Ship Cadence',
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
