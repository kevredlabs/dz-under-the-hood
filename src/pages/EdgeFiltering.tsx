import { Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHero } from '../components/ui/SectionHero'
import { FadeInSection } from '../components/animations/FadeInSection'
import { InfoBox } from '../components/ui/InfoBox'
import { DeepDive } from '../components/ui/DeepDive'
import { CodeBlock } from '../components/ui/CodeBlock'

function FilterVisualization() {
  const packets = [
    { type: 'valid', label: 'SHRED', color: 'bg-green-400' },
    { type: 'dup', label: 'DUP', color: 'bg-amber-400' },
    { type: 'valid', label: 'VOTE', color: 'bg-green-400' },
    { type: 'spam', label: 'SPAM', color: 'bg-red-400' },
    { type: 'valid', label: 'SHRED', color: 'bg-green-400' },
    { type: 'dup', label: 'DUP', color: 'bg-amber-400' },
    { type: 'malformed', label: 'BAD', color: 'bg-red-400' },
    { type: 'valid', label: 'SHRED', color: 'bg-green-400' },
    { type: 'spam', label: 'SPAM', color: 'bg-red-400' },
    { type: 'valid', label: 'VOTE', color: 'bg-green-400' },
  ]

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-xs text-zinc-500">INCOMING TRAFFIC</span>
        <span className="font-mono text-xs text-zinc-500">AFTER DZD FILTERING</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 flex flex-wrap gap-2 justify-end">
          {packets.map((pkt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`px-2 py-1 rounded text-[10px] font-mono font-bold ${pkt.color} text-black`}
            >
              {pkt.label}
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-1 px-4">
          <div className="w-12 h-12 rounded-lg border-2 border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-[10px] font-mono text-emerald-400">DZD</span>
        </div>

        <div className="flex-1 flex flex-wrap gap-2">
          {packets
            .filter((p) => p.type === 'valid')
            .map((pkt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="px-2 py-1 rounded text-[10px] font-mono font-bold bg-green-400 text-black"
              >
                {pkt.label}
              </motion.div>
            ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 text-xs text-zinc-600">
        <span>10 packets (2 spam, 2 duplicates, 1 malformed)</span>
        <span className="text-emerald-400">5 clean packets delivered</span>
      </div>
    </div>
  )
}

export function EdgeFiltering() {
  return (
    <div>
      <SectionHero
        number={5}
        title="Edge Filtering"
        subtitle="Hardware-level deduplication and noise removal"
        color="text-emerald-400"
        icon={Shield}
      />

      <div className="max-w-4xl mx-auto px-6 space-y-16 pb-24">
        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">The Noise Problem</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Validators don't just receive clean blocks and votes. They're hit with a flood
            of noise: <strong className="text-zinc-200">duplicate shreds</strong> from
            Turbine retransmissions, spam transactions, and malformed packets. On Solana,
            Turbine distributes shreds in a tree structure — retransmissions at multiple
            levels mean the same shred can arrive several times.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Without DoubleZero, every validator independently deduplicates and filters this
            noise. With 1000+ validators, that's the same work done 1000+ times — compute
            and bandwidth wasted on processing identical data.
          </p>
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-6">Filtering in Action</h2>
          <FilterVisualization />
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            DoubleZero performs edge filtering at the DZD — at the network hardware level,
            using FPGA-based packet processing. This happens <em>before</em> data reaches
            the validator, on the inter-validator traffic that matters most.
          </p>

          <div className="space-y-4">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-5">
              <p className="font-mono text-xs text-emerald-400 mb-2">SHRED DEDUPLICATION</p>
              <p className="text-sm text-zinc-400">
                Duplicate shreds from Turbine retransmissions are detected by their
                signature and dropped. Only the first copy passes through. This alone can
                dramatically reduce the volume of data validators need to process.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-5">
              <p className="font-mono text-xs text-emerald-400 mb-2">FORMAT VALIDATION</p>
              <p className="text-sm text-zinc-400">
                Malformed packets that don't conform to expected formats are rejected at
                the network level. The validator never sees them — no CPU cycles wasted
                parsing invalid data.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-5">
              <p className="font-mono text-xs text-emerald-400 mb-2">RATE LIMITING</p>
              <p className="text-sm text-zinc-400">
                Traffic from individual sources is rate-limited to prevent any single
                entity from flooding the network and disrupting consensus traffic.
              </p>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <DeepDive title="nftables — simulating edge filtering in software">
            <p className="text-sm text-zinc-400 leading-relaxed">
              Real DZDs use <strong className="text-zinc-200">FPGAs</strong> (Field
              Programmable Gate Arrays) for line-rate packet filtering. FPGAs process
              packets in hardware — no CPU overhead, no kernel involvement. But the
              filtering <em>logic</em> is the same as what you can build with{' '}
              <strong className="text-zinc-200">nftables</strong>, the modern Linux packet
              filtering framework.
            </p>
            <CodeBlock
              title="Edge filtering rules with nftables"
              code={`# nftables ruleset simulating DZ edge filtering

sudo nft -f - << 'NFT'
table inet dz_filter {
  # Track source IPs for per-source rate limiting
  set rate_limit {
    type ipv4_addr
    flags dynamic,timeout
    timeout 10s
  }

  chain input {
    type filter hook input priority 0; policy accept;

    # 1. FORMAT VALIDATION — drop invalid/malformed packets
    ct state invalid counter drop comment "malformed"

    # 2. RATE LIMITING — max 1000 pkt/s per source IP
    ip saddr @rate_limit \\
      limit rate over 1000/second burst 200 packets \\
      counter drop comment "rate-limited"

    # Track source IPs
    update @rate_limit { ip saddr }
  }
}
NFT

# Verify the rules
sudo nft list ruleset

# Test: flood packets and watch rate-limiting kick in
ping -f -c 5000 192.168.100.1 2>&1 | tail -1
# ~4% packet loss — the excess was rate-limited

# Check counters to see how many packets were dropped
sudo nft list chain inet dz_filter input
# Shows packet/byte counters per rule`}
            />
            <p className="text-sm text-zinc-400 leading-relaxed">
              The FPGA equivalent does this at 100 Gbps line rate with sub-microsecond
              latency — no CPU cycles consumed. The logic is identical, but the
              implementation is in silicon instead of the Linux kernel.
            </p>
          </DeepDive>
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Not Censorship</h2>
          <InfoBox variant="key" title="Non-discretionary filtering">
            DoubleZero's edge filtering is <strong>non-discretionary</strong>. The rules
            are uniform, transparent, and applied equally to all traffic. No packet is
            dropped based on its content, sender identity, or economic value. The
            filtering only removes packets that are provably invalid or redundant —
            duplicates, malformed data, rate limit violations.
          </InfoBox>
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">The Impact</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-5">
              <p className="font-mono text-xs text-red-400 mb-3">WITHOUT DZ</p>
              <div className="space-y-2 text-sm text-zinc-400">
                <p>Each validator deduplicates independently</p>
                <p>1000x redundant processing of the same shreds</p>
                <p>Compute wasted on noise instead of consensus</p>
                <p>Variable filtering quality across validators</p>
              </div>
            </div>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-5">
              <p className="font-mono text-xs text-emerald-400 mb-3">WITH DZ</p>
              <div className="space-y-2 text-sm text-zinc-400">
                <p>Deduped once at the edge (hardware, FPGA)</p>
                <p>All validators receive only clean data</p>
                <p>Freed compute for block production and voting</p>
                <p>Consistent, hardware-level quality for all</p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  )
}
