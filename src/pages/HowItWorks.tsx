import { Route } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHero } from '../components/ui/SectionHero'
import { FadeInSection } from '../components/animations/FadeInSection'
import { BlockPropagation } from '../components/diagrams/BlockPropagation'

const steps = [
  {
    step: 1,
    title: 'Block Leader Produces a Block',
    description:
      'The current slot leader on Solana produces a block and splits it into shreds (data fragments). These shreds need to reach every other validator in the network as fast as possible for consensus to proceed.',
    color: 'border-violet-500/40',
    dot: 'bg-violet-400',
  },
  {
    step: 2,
    title: 'Shreds Enter the DZ Network',
    description:
      'The leader\'s validator is connected to a nearby Edge DZD via a GRE tunnel (IBRL mode). Shreds flow from the validator into the DoubleZero mesh — no ISP hops, no public internet routing.',
    color: 'border-cyan-500/40',
    dot: 'bg-cyan-400',
  },
  {
    step: 3,
    title: 'Edge Filtering & Deduplication',
    description:
      'At the DZD, hardware-level processing kicks in. Duplicate shreds (from Turbine retransmissions) are dropped. Malformed packets are rejected. Only clean, unique data passes through — at line rate, on FPGAs.',
    color: 'border-emerald-500/40',
    dot: 'bg-emerald-400',
  },
  {
    step: 4,
    title: 'Routed Through the Mesh',
    description:
      'Clean shreds are routed across the DoubleZero mesh — through WAN links and DZX exchanges on dedicated fiber. Routing is optimized for speed, not "best effort." Jumbo frames (MTU 9000) maximize throughput.',
    color: 'border-blue-500/40',
    dot: 'bg-blue-400',
  },
  {
    step: 5,
    title: 'Delivered to Voting Validators',
    description:
      'Shreds arrive at destination Edge DZDs and are delivered to each connected validator. Because jitter is minimal, shreds arrive in consistent order — validators can reconstruct the block faster.',
    color: 'border-amber-500/40',
    dot: 'bg-amber-400',
  },
  {
    step: 6,
    title: 'Consensus Votes Propagate Back',
    description:
      'Validators vote on the block (Tower BFT) and their votes flow back through the DZ mesh to the leader and other validators. Low-jitter delivery means the voting window is used efficiently — fewer missed slots, faster finality.',
    color: 'border-green-500/40',
    dot: 'bg-green-400',
  },
]

export function HowItWorks() {
  return (
    <div>
      <SectionHero
        number={3}
        title="How It Works"
        subtitle="Following a block from leader to consensus"
        color="text-green-400"
        icon={Route}
      />

      <div className="max-w-4xl mx-auto px-6 space-y-16 pb-24">
        <FadeInSection>
          <p className="text-zinc-400 leading-relaxed text-lg">
            Let's trace a block as it propagates through the DoubleZero network — from the
            moment a leader produces it to the moment the network reaches consensus. This is
            the critical path that DZ optimizes.
          </p>
        </FadeInSection>

        <FadeInSection>
          <BlockPropagation />
        </FadeInSection>

        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-zinc-800 via-cyan-900/30 to-zinc-800" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-12 pb-12 last:pb-0"
            >
              <div
                className={`absolute left-2.5 top-1 w-4 h-4 rounded-full ${step.dot} ring-4 ring-zinc-950`}
              />

              <div className={`rounded-lg border ${step.color} bg-zinc-900/40 p-6`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-zinc-600">
                    STEP {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <FadeInSection>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-8 text-center">
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xl mx-auto">
              On the public internet, these same shreds and votes would bounce through
              10-15 ISP networks per validator pair — with no deduplication, unpredictable
              jitter, and no guarantee of timely delivery. DoubleZero reduces this to 2-4
              hops on dedicated fiber with hardware-level filtering built in.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Not Just Validators — RPC Nodes Too</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The walkthrough above focuses on consensus, but DoubleZero serves{' '}
            <strong className="text-zinc-200">RPC nodes</strong> just as well. RPC nodes
            are the read/write gateway for wallets, dApps, and indexers — they need the
            same block data validators receive, as fast as possible. A slow RPC means stale
            reads, failed simulations, and laggy UIs.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            By connecting RPC nodes to Edge DZDs, they receive shreds and blocks through
            the same low-jitter fiber mesh — without competing for bandwidth on the public
            internet. They also benefit from the same hardware-level deduplication: no
            duplicate shreds to process, no malformed packets to discard.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            For RPC providers running at scale (Helius, Triton, etc.), this translates
            directly into faster tip-of-chain data, more reliable{' '}
            <code className="text-cyan-400">sendTransaction</code> delivery, and lower
            infrastructure costs from reduced junk traffic.
          </p>
        </FadeInSection>
      </div>
    </div>
  )
}
