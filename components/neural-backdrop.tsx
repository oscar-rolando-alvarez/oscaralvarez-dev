'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

const NODES = 26;
const W = 1200;
const H = 700;

// Deterministic pseudo-random so server and client agree on positions.
function rand(seed: number) {
  let x = seed * 2654435761;
  x = (x ^ (x >>> 13)) * 1597334677;
  return ((x ^ (x >>> 16)) >>> 0) / 0xffffffff;
}

type Node = { x: number; y: number; r: number };

function buildGraph() {
  const nodes: Node[] = [];
  for (let i = 0; i < NODES; i++) {
    nodes.push({
      x: 60 + rand(i * 3 + 1) * (W - 120),
      y: 40 + rand(i * 3 + 2) * (H - 80),
      r: 1.5 + rand(i * 3 + 3) * 2.5,
    });
  }

  // Connect each node to its 2 nearest neighbors.
  const edges: Array<[number, number]> = [];
  for (let i = 0; i < nodes.length; i++) {
    const distances = nodes
      .map((n, j) => {
        const dx = n.x - nodes[i].x;
        const dy = n.y - nodes[i].y;
        return { j, d: Math.hypot(dx, dy) };
      })
      .filter((p) => p.j !== i)
      .sort((a, b) => a.d - b.d);
    for (const p of distances.slice(0, 2)) {
      const a = Math.min(i, p.j);
      const b = Math.max(i, p.j);
      if (!edges.find((e) => e[0] === a && e[1] === b)) edges.push([a, b]);
    }
  }
  return { nodes, edges };
}

export function NeuralBackdrop() {
  const { nodes, edges } = useMemo(buildGraph, []);

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#d946ef" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="node-glow">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
        </radialGradient>
      </defs>

      {edges.map(([a, b], i) => {
        const A = nodes[a];
        const B = nodes[b];
        return (
          <motion.line
            key={`e-${i}`}
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            stroke="url(#line-grad)"
            strokeWidth={0.6}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.7, 0.35] }}
            transition={{
              duration: 3,
              delay: 0.05 * i,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {nodes.map((n, i) => (
        <g key={`n-${i}`}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={n.r * 4}
            fill="url(#node-glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.35, 0.1] }}
            transition={{
              duration: 4 + (i % 3),
              delay: i * 0.15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <circle cx={n.x} cy={n.y} r={n.r} fill="#fff" opacity={0.7} />
        </g>
      ))}
    </svg>
  );
}
