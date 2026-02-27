import { Link as LinkIcon } from 'lucide-react'
import { SectionHero } from '../components/ui/SectionHero'
import { FadeInSection } from '../components/animations/FadeInSection'
import { CodeBlock } from '../components/ui/CodeBlock'
import { InfoBox } from '../components/ui/InfoBox'

export function Onchain() {
  return (
    <div>
      <SectionHero
        number={6}
        title="The Onchain Layer"
        subtitle="Network state as a transparent, verifiable ledger"
        color="text-blue-400"
        icon={LinkIcon}
      />

      <div className="max-w-4xl mx-auto px-6 space-y-16 pb-24">
        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Why Onchain?</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Traditional networks store device configurations, link states, and telemetry
            in centralized management systems. DoubleZero takes a different approach: the
            canonical state of the entire network lives onchain.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            This means device registrations, link configurations, telemetry data, and
            fee records are all recorded on the DoubleZero ledger — transparent and
            verifiable by every participant.
          </p>
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">What Lives Onchain</h2>
          <div className="space-y-4">
            {[
              {
                label: 'DEVICE REGISTRATION',
                desc: 'Every DZD is registered onchain with its type (edge/transit/hybrid), DZ prefixes, interfaces, and max user capacity.',
                color: 'text-cyan-400',
              },
              {
                label: 'LINK CONFIGURATION',
                desc: 'WAN links and DZX links are recorded with their endpoints, status (activated/drained), and connection parameters.',
                color: 'text-violet-400',
              },
              {
                label: 'TELEMETRY DATA',
                desc: 'Latency, jitter, and packet loss metrics submitted by Telemetry Agents. Signed with Metrics Publisher Keys for authenticity.',
                color: 'text-emerald-400',
              },
              {
                label: 'FEE RECORDS',
                desc: 'User fee payments and contributor reward distributions. Tracks who paid, how much, and where the funds are distributed.',
                color: 'text-amber-400',
              },
              {
                label: 'USER ALLOCATIONS',
                desc: 'IP allocations for connected users, mapping validator identities to DZ network addresses.',
                color: 'text-blue-400',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-5"
              >
                <p className={`font-mono text-xs ${item.color} mb-2`}>{item.label}</p>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Identity & Keys</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            DoubleZero uses two separate keypairs for security isolation:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-5">
              <p className="font-mono text-xs text-violet-400 mb-2">SERVICE KEY</p>
              <p className="text-sm text-zinc-400 mb-3">
                Your contributor identity. Used for all CLI operations — creating devices,
                managing links, administrative tasks.
              </p>
              <p className="text-xs font-mono text-zinc-600">
                ~/.config/solana/id.json
              </p>
            </div>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-5">
              <p className="font-mono text-xs text-emerald-400 mb-2">METRICS PUBLISHER KEY</p>
              <p className="text-sm text-zinc-400 mb-3">
                Used exclusively by the Telemetry Agent to sign metric submissions.
                Separate from the service key so a compromised agent doesn't compromise
                your identity.
              </p>
              <p className="text-xs font-mono text-zinc-600">
                ~/.config/doublezero/metrics-publisher.json
              </p>
            </div>
          </div>

          <CodeBlock
            title="Key management"
            code={`# Generate a new service keypair
doublezero keygen

# Your keypair is stored at:
# ~/.config/solana/id.json

# Generate a metrics publisher keypair
doublezero keygen --type metrics-publisher

# Stored at:
# ~/.config/doublezero/metrics-publisher.json

# Register the metrics publisher onchain
doublezero metrics-publisher register \\
  --keypair ~/.config/doublezero/metrics-publisher.json`}
          />
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">The 2Z Token</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The <strong className="text-zinc-200">2Z token</strong> is the native token
            of the DoubleZero network. It serves two purposes:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-5">
              <p className="font-mono text-xs text-blue-400 mb-2">USER FEES</p>
              <p className="text-sm text-zinc-400">
                Validators and RPC operators pay fees to access the network. Fees can
                be paid in SOL (automatically swapped) or directly in 2Z.
              </p>
            </div>
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-5">
              <p className="font-mono text-xs text-amber-400 mb-2">CONTRIBUTOR REWARDS</p>
              <p className="text-sm text-zinc-400">
                Infrastructure contributors receive 2Z tokens as incentives for
                providing bandwidth and hardware to the network.
              </p>
            </div>
          </div>

          <CodeBlock
            title="Paying fees"
            code={`# Check your fee balance
doublezero fees status

# Pay fees with SOL (auto-swapped to 2Z)
doublezero fees pay --amount 10 --currency sol

# Pay fees directly with 2Z
doublezero fees pay --amount 10 --currency 2z

# Swap SOL to 2Z manually
doublezero swap --from sol --to 2z --amount 5`}
          />
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Device Management</h2>
          <CodeBlock
            title="Onchain device operations"
            code={`# Create a device onchain
doublezero device create \\
  --name "dzd-nyc-edge-01" \\
  --type edge \\
  --dz-prefixes 203.0.113.0/29

# List all devices
doublezero device list

# Update device (e.g., set max users after burn-in)
doublezero device update \\
  --name "dzd-nyc-edge-01" \\
  --max-users 96

# Create a WAN link
doublezero link create \\
  --type wan \\
  --from dzd-nyc-edge-01 \\
  --to dzd-chi-transit-01

# Create a DZX link (requires peer acceptance)
doublezero link create \\
  --type dzx \\
  --from dzd-nyc-edge-01 \\
  --to dzd-lon-edge-01

# List all links
doublezero link list`}
          />
        </FadeInSection>

        <FadeInSection>
          <InfoBox variant="info" title="Transparency as a feature">
            Because everything is onchain, anyone can audit the state of the network.
            Link quality metrics are public. Device registrations are verifiable.
            Fee distributions are transparent. This creates accountability that
            centralized network management systems can't provide.
          </InfoBox>
        </FadeInSection>
      </div>
    </div>
  )
}
