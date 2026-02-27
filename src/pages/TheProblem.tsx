import { AlertTriangle } from 'lucide-react'
import { SectionHero } from '../components/ui/SectionHero'
import { FadeInSection } from '../components/animations/FadeInSection'
import { PacketFlow } from '../components/animations/PacketFlow'
import { InfoBox } from '../components/ui/InfoBox'

export function TheProblem() {
  return (
    <div>
      <SectionHero
        number={1}
        title="The Problem"
        subtitle="Why the public internet falls short for blockchains"
        color="text-red-400"
        icon={AlertTriangle}
      />

      <div className="max-w-4xl mx-auto px-6 space-y-16 pb-24">
        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Validators Talk to Each Other — Constantly</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            A blockchain like Solana doesn't just receive transactions from users. Its real
            backbone is the constant, high-frequency communication{' '}
            <strong className="text-zinc-200">between validators</strong>. Block leaders
            produce blocks and broadcast them. Validators exchange votes for consensus
            (Tower BFT). Blocks are split into <strong className="text-zinc-200">shreds</strong>{' '}
            and distributed across the validator set via Turbine.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            All of this traffic — blocks, votes, shreds — travels over the public internet.
            The internet uses <strong className="text-zinc-200">BGP (Border Gateway
            Protocol)</strong> to route packets between networks. BGP optimizes for
            reachability, not speed. A block propagating from one validator to another might
            hop through 10-15 different ISP networks, each with its own congestion and
            priorities.
          </p>
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-6">Block Propagation: Internet vs. DoubleZero</h2>
          <div className="space-y-8">
            <PacketFlow variant="internet" />
            <PacketFlow variant="doublezero" />
          </div>
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Latency and Jitter</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            <strong className="text-zinc-200">Latency</strong> is the time it takes for a
            packet to travel from one validator to another.{' '}
            <strong className="text-zinc-200">Jitter</strong> is the variation in that latency
            over time. For consensus, jitter is often more damaging than raw latency.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            If a block arrives at one validator in 50ms but takes 200ms to reach another,
            voting windows become inconsistent. Shreds arrive out of order. Slots get missed.
            Validators that are further from the leader — or on worse network paths — are
            structurally disadvantaged.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-5">
              <p className="font-mono text-xs text-red-400 mb-2">PUBLIC INTERNET</p>
              <div className="space-y-2 text-sm text-zinc-400">
                <p>Latency: 50-200ms (variable)</p>
                <p>Jitter: high, unpredictable</p>
                <p>Hops: 10-15 networks</p>
                <p>Duplicate shreds: handled per-validator</p>
              </div>
            </div>
            <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-5">
              <p className="font-mono text-xs text-cyan-400 mb-2">DOUBLEZERO</p>
              <div className="space-y-2 text-sm text-zinc-400">
                <p>Latency: optimized, consistent</p>
                <p>Jitter: minimal</p>
                <p>Hops: 2-4 DZDs (direct fiber)</p>
                <p>Dedup + filtering: shared at the edge</p>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">The Redundant Work Problem</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Beyond consensus traffic, validators are also bombarded with duplicate and
            malformed data — duplicate shreds from Turbine retransmissions, spam
            transactions, malformed packets. Without DoubleZero, every single validator
            processes and filters this noise independently. With 1000+ validators on Solana,
            that's the same filtering work done 1000+ times.
          </p>

          <InfoBox variant="key" title="The core insight">
            DoubleZero optimizes the most critical traffic on a blockchain: validator-to-validator
            communication. By filtering duplicates and noise once at the network edge — in
            hardware, before packets reach any validator — compute that was wasted on
            redundant processing is freed for actual consensus and block production.
          </InfoBox>
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">The Bottom Line</h2>
          <p className="text-zinc-400 leading-relaxed">
            The public internet was designed for general-purpose communication. Blockchain
            consensus requires something purpose-built: low jitter between validators,
            direct routing for block propagation, and shared deduplication for the entire
            network. That's the gap DoubleZero fills — not by replacing the internet, but
            by providing an optimized overlay for inter-validator communication.
          </p>
        </FadeInSection>
      </div>
    </div>
  )
}
