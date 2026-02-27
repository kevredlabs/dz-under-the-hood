import {
  AlertTriangle,
  Network,
  Route,
  Cpu,
  Shield,
  Link,
  BookOpen,
} from 'lucide-react'

export interface Chapter {
  id: string
  number: number
  title: string
  subtitle: string
  description: string
  icon: typeof AlertTriangle
  color: string
  path: string
}

export const chapters: Chapter[] = [
  {
    id: 'the-problem',
    number: 1,
    title: 'The Problem',
    subtitle: 'Why the Public Internet Falls Short',
    description:
      'Why inter-validator communication over the public internet hurts consensus — jitter, duplicate shreds, and redundant filtering across 1000+ nodes.',
    icon: AlertTriangle,
    color: 'text-red-400',
    path: '/the-problem',
  },
  {
    id: 'the-network',
    number: 2,
    title: 'The Network',
    subtitle: 'A Decentralized Private Mesh',
    description:
      'Underutilized private fiber stitched into a global mesh network. The architecture, the exchanges, the devices.',
    icon: Network,
    color: 'text-cyan-400',
    path: '/the-network',
  },
  {
    id: 'how-it-works',
    number: 3,
    title: 'How It Works',
    subtitle: 'Following a Block From Leader to Consensus',
    description:
      'Trace a block from leader production through the DZ mesh — shred distribution, edge filtering, and vote propagation.',
    icon: Route,
    color: 'text-green-400',
    path: '/how-it-works',
  },
  {
    id: 'software',
    number: 4,
    title: 'Software & Connectivity',
    subtitle: 'The Stack, the Daemon, and How to Connect',
    description:
      'Controller, Agents, Daemon, IBRL, CYOA, Multicast — the software stack and how validators plug into the network.',
    icon: Cpu,
    color: 'text-violet-400',
    path: '/software',
  },
  {
    id: 'edge-filtering',
    number: 5,
    title: 'Edge Filtering',
    subtitle: 'The Killer Feature',
    description:
      'Hardware-level shred deduplication and noise removal at the network edge. Non-discretionary, shared, and done once for all validators.',
    icon: Shield,
    color: 'text-emerald-400',
    path: '/edge-filtering',
  },
  {
    id: 'onchain',
    number: 6,
    title: 'The Onchain Layer',
    subtitle: 'Network State as a Ledger',
    description:
      'Device registration, link management, telemetry, and fees — all transparent and verifiable onchain.',
    icon: Link,
    color: 'text-blue-400',
    path: '/onchain',
  },
  {
    id: 'glossary',
    number: 7,
    title: 'Glossary',
    subtitle: 'All Terms Defined',
    description:
      'Every DoubleZero-specific term and networking concept, searchable and cross-referenced.',
    icon: BookOpen,
    color: 'text-zinc-400',
    path: '/glossary',
  },
]
