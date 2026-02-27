import { Cpu } from 'lucide-react'
import { SectionHero } from '../components/ui/SectionHero'
import { FadeInSection } from '../components/animations/FadeInSection'
import { SoftwareStack } from '../components/diagrams/SoftwareStack'
import { CodeBlock } from '../components/ui/CodeBlock'
import { InfoBox } from '../components/ui/InfoBox'
import { DeepDive } from '../components/ui/DeepDive'

export function Software() {
  return (
    <div>
      <SectionHero
        number={4}
        title="Software & Connectivity"
        subtitle="The software stack, the daemon, and how users connect"
        color="text-violet-400"
        icon={Cpu}
      />

      <div className="max-w-4xl mx-auto px-6 space-y-16 pb-24">
        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Architecture Overview</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The DoubleZero software stack bridges onchain state to physical network
            devices. Every device registration, link configuration, and telemetry
            submission is recorded onchain — and the software below translates that
            into real network configuration.
          </p>
          <SoftwareStack />
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Controller</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The Controller is the configuration authority. It reads the canonical network
            state from the DoubleZero ledger — device registrations, link configurations,
            user allocations — and derives the configuration that each DZD should have.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            It doesn't push configuration. Instead, it serves it — Config Agents poll the
            Controller to discover what their device state should be.
          </p>
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Config Agent</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The Config Agent runs directly on each DZD (Arista switch). It periodically
            polls the Controller, computes the diff between the current device state and
            the desired state, and applies changes. This is how onchain events become
            real network configuration.
          </p>
          <CodeBlock
            title="Config Agent lifecycle"
            code={`# Installed as an EOS extension on the Arista switch
# The agent runs as a systemd service

# Check agent status
show extension config-agent

# View agent logs
bash tail -f /var/log/config-agent/agent.log

# The agent loop:
# 1. Poll Controller for latest config
# 2. Compare with current device state
# 3. Compute diff
# 4. Apply changes (interfaces, routes, ACLs)
# 5. Sleep, repeat`}
          />
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Telemetry Agent</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The Telemetry Agent also runs on each DZD. It uses{' '}
            <strong className="text-zinc-200">TWAMP</strong> (Two-Way Active Measurement
            Protocol) to continuously measure latency, jitter, and packet loss between
            DZDs. These metrics are signed with the Metrics Publisher Key and submitted
            onchain.
          </p>

          <InfoBox variant="key" title="Why onchain telemetry matters">
            By recording telemetry onchain, the network quality is transparent and
            verifiable. Anyone can check link performance. Contributors are held
            accountable — poor metrics mean reduced incentives.
          </InfoBox>
        </FadeInSection>

        <FadeInSection>
          <DeepDive title="TWAMP — how link quality is measured">
            <p className="text-sm text-zinc-400 leading-relaxed">
              <strong className="text-zinc-200">TWAMP (Two-Way Active Measurement
              Protocol, RFC 5357)</strong> is a standard for measuring one-way and
              round-trip latency, jitter, and packet loss between two endpoints. The
              Telemetry Agent on each DZD runs TWAMP probes to every peer DZD
              continuously.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Here's how you can replicate the same kind of measurements with standard
              Linux tools:
            </p>
            <CodeBlock
              title="Measuring latency, jitter, and loss (like the Telemetry Agent)"
              code={`# RTT measurement — equivalent to TWAMP round-trip probes
ping -c 100 -i 0.1 172.16.0.2 | tail -1
# rtt min/avg/max/mdev = 0.035/0.042/0.089/0.008 ms

# Jitter calculation — variation between consecutive RTTs
ping -c 50 -i 0.1 172.16.0.2 | \\
  grep "time=" | \\
  awk -F'time=' '{print $2}' | \\
  awk '{
    if (NR > 1) {
      jitter += ($1 > prev) ? $1 - prev : prev - $1;
      count++
    }
    prev = $1
  }
  END { printf "Average jitter: %.3f ms\\n", jitter/count }'

# Bandwidth + loss measurement with iperf3
iperf3 -c 172.16.0.2 -t 10 -u -b 1G
# Shows throughput, jitter, and packet loss percentage

# The Telemetry Agent does this continuously, signs the
# results with the Metrics Publisher Key, and submits
# them as transactions on the DoubleZero ledger.`}
            />
          </DeepDive>
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Activator</h2>
          <p className="text-zinc-400 leading-relaxed">
            The Activator monitors smart contract events that require IP address
            allocations or state changes. When a new user connects or a device is
            registered, the Activator handles the operational mechanics — assigning
            addresses from the DZ prefix pool, updating routing state.
          </p>
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">doublezerod — The User Daemon</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            On the user side (validators, RPC nodes), the{' '}
            <code className="text-cyan-400">doublezerod</code> daemon runs on the server.
            It manages tunnel interfaces, routing tables, and routes. It's what actually
            connects your validator to the DoubleZero network.
          </p>

          <CodeBlock
            title="Daemon commands"
            code={`# Install the DoubleZero CLI and daemon
curl -sSf https://release.doublezero.xyz/install.sh | sh

# Check daemon status
doublezero status

# View connection details
doublezero info

# The daemon manages:
# - GRE tunnel to nearest Edge DZD
# - Kernel routing table entries
# - Automatic reconnection on failure`}
          />
        </FadeInSection>

        <FadeInSection>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-8">
            <h3 className="font-semibold mb-3">The flow in summary</h3>
            <div className="text-sm text-zinc-400 space-y-2 font-mono">
              <p>
                <span className="text-blue-400">Ledger</span>{' '}
                <span className="text-zinc-600">→</span>{' '}
                <span className="text-violet-400">Controller</span>{' '}
                <span className="text-zinc-600">(reads state, derives config)</span>
              </p>
              <p>
                <span className="text-violet-400">Controller</span>{' '}
                <span className="text-zinc-600">→</span>{' '}
                <span className="text-cyan-400">Config Agent</span>{' '}
                <span className="text-zinc-600">(polls, computes diff)</span>
              </p>
              <p>
                <span className="text-cyan-400">Config Agent</span>{' '}
                <span className="text-zinc-600">→</span>{' '}
                <span className="text-amber-400">DZD</span>{' '}
                <span className="text-zinc-600">(applies config to switch)</span>
              </p>
              <p>
                <span className="text-emerald-400">Telemetry Agent</span>{' '}
                <span className="text-zinc-600">→</span>{' '}
                <span className="text-blue-400">Ledger</span>{' '}
                <span className="text-zinc-600">(submits metrics onchain)</span>
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* ── Connecting to the Network ── */}

        <FadeInSection>
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">IBRL — Connect Without Restarting</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            <strong className="text-zinc-200">IBRL (Increase Bandwidth Reduce Latency)</strong>{' '}
            is the primary connection mode for validators. The key advantage: you don't
            need to restart your validator client to connect. Once connected, all
            inter-validator traffic — blocks, shreds, votes — flows through the DZ mesh
            instead of the public internet.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            IBRL uses your existing public IP address and establishes a GRE overlay tunnel
            to the nearest Edge DZD. The daemon handles tunnel creation, routing table
            updates, and automatic reconnection.
          </p>

          <CodeBlock
            title="Connecting in IBRL mode"
            code={`# Step 1: Install the DoubleZero CLI and daemon
curl -sSf https://release.doublezero.xyz/install.sh | sh

# Step 2: Start the daemon
sudo systemctl enable --now doublezerod

# Step 3: Connect using your validator identity
doublezero connect \\
  --mode ibrl \\
  --identity ~/.config/solana/id.json

# Step 4: Verify connection
doublezero status

# Output:
# Status: Connected
# Mode: IBRL
# DZD: dzd-nyc-edge-01
# Tunnel: gre1 (up)
# Latency: 2.3ms`}
          />
        </FadeInSection>

        <FadeInSection>
          <DeepDive title="GRE — how the tunnel works">
            <p className="text-sm text-zinc-400 leading-relaxed">
              <strong className="text-zinc-200">GRE (Generic Routing Encapsulation)</strong>{' '}
              is a tunneling protocol that wraps IP packets inside another IP header. When
              IBRL establishes a connection, <code>doublezerod</code> creates a GRE tunnel
              interface on your server that points to the nearest Edge DZD.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Unlike VXLAN (which encapsulates Layer 2 over UDP), GRE is simpler — it works
              at Layer 3 with only ~24 bytes of overhead. It's point-to-point, which is
              perfect for the validator↔DZD connection.
            </p>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
              <p className="font-mono text-xs text-zinc-500 mb-2">GRE PACKET STRUCTURE</p>
              <p className="text-xs font-mono text-amber-400/80 leading-relaxed">
                [Outer IP (your public IP → DZD IP)] [GRE Header (4-24 bytes)] [Inner IP (original packet)]
              </p>
            </div>
            <CodeBlock
              title="What doublezerod does under the hood (Linux GRE)"
              code={`# This is what the daemon creates on your server:

# 1. Create a GRE tunnel interface pointing to the DZD
sudo ip tunnel add gre1 mode gre \\
  local 203.0.113.10 \\    # your public IP
  remote 198.51.100.1      # nearest Edge DZD IP
sudo ip link set gre1 up
sudo ip addr add 192.168.100.2/30 dev gre1

# 2. Add a route so DZ traffic goes through the tunnel
sudo ip route add 172.16.0.0/12 dev gre1

# 3. The DZD has the matching endpoint:
# ip tunnel add gre-user42 mode gre \\
#   local 198.51.100.1 remote 203.0.113.10

# Verify the tunnel is up
ip tunnel show
# gre1: gre/ip remote 198.51.100.1 local 203.0.113.10

# All traffic to the DZ mesh now flows through this tunnel
# instead of the public internet.`}
            />
          </DeepDive>
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">CYOA — Choose Your Own Adventure</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            CYOA interfaces are the connectivity methods that contributors offer at their
            Edge DZDs. Each DZD can support multiple CYOA types, letting users choose
            what works best for their setup.
          </p>

          <div className="space-y-4">
            {[
              {
                name: 'GRE over DIA',
                desc: 'GRE tunnel over Direct Internet Access. The most common method — works with any internet connection. Used by IBRL mode.',
                color: 'border-amber-500/20 bg-amber-500/5',
                label: 'text-amber-400',
              },
              {
                name: 'GRE over Fabric',
                desc: 'GRE tunnel over a private fabric connection. Lower latency than DIA, requires physical proximity to the DZD.',
                color: 'border-cyan-500/20 bg-cyan-500/5',
                label: 'text-cyan-400',
              },
              {
                name: 'Private Peering',
                desc: 'Direct physical cross-connect to the DZD. Lowest latency, highest bandwidth. Requires colocation in the same data center.',
                color: 'border-green-500/20 bg-green-500/5',
                label: 'text-green-400',
              },
            ].map((cyoa) => (
              <div key={cyoa.name} className={`rounded-lg border ${cyoa.color} p-5`}>
                <p className={`font-mono text-xs ${cyoa.label} mb-2`}>
                  {cyoa.name.toUpperCase()}
                </p>
                <p className="text-sm text-zinc-400">{cyoa.desc}</p>
              </div>
            ))}
          </div>
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Multicast</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Multicast enables one-to-many packet delivery — perfect for distributing
            block data efficiently. It has two roles:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-5">
              <p className="font-mono text-xs text-violet-400 mb-2">PUBLISHER</p>
              <p className="text-sm text-zinc-400">
                Sends packets to a multicast group. Typically a block producer or data
                provider distributing to many subscribers at once.
              </p>
            </div>
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-5">
              <p className="font-mono text-xs text-blue-400 mb-2">SUBSCRIBER</p>
              <p className="text-sm text-zinc-400">
                Receives packets from a multicast group. Validators and RPC nodes
                subscribe to receive block data efficiently.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 mb-6 overflow-x-auto">
            <svg viewBox="0 0 680 260" className="w-full h-auto">
              <defs>
                <marker id="arr-violet" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                  <polygon points="0 0, 7 2.5, 0 5" fill="#a78bfa" />
                </marker>
                <marker id="arr-mcast-blue" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                  <polygon points="0 0, 7 2.5, 0 5" fill="#60a5fa" />
                </marker>
              </defs>

              {/* Publisher (leader) */}
              <rect x={20} y={95} width={120} height={50} rx={8} fill="#18181b" stroke="#a78bfa" strokeWidth={1.5} />
              <text x={80} y={116} textAnchor="middle" fill="#a78bfa" style={{ fontSize: '10px', fontWeight: 600, fontFamily: 'monospace' }}>Block Leader</text>
              <text x={80} y={132} textAnchor="middle" fill="#71717a" style={{ fontSize: '8px', fontFamily: 'monospace' }}>publisher</text>

              {/* Edge DZD */}
              <rect x={220} y={85} width={100} height={70} rx={8} fill="#18181b" stroke="#34d399" strokeWidth={1.5} />
              <text x={270} y={110} textAnchor="middle" fill="#34d399" style={{ fontSize: '10px', fontWeight: 600, fontFamily: 'monospace' }}>Edge DZD</text>
              <text x={270} y={126} textAnchor="middle" fill="#71717a" style={{ fontSize: '8px', fontFamily: 'monospace' }}>dedup +</text>
              <text x={270} y={138} textAnchor="middle" fill="#71717a" style={{ fontSize: '8px', fontFamily: 'monospace' }}>replicate</text>

              {/* Arrow: leader -> DZD */}
              <line x1={140} y1={120} x2={215} y2={120} stroke="#a78bfa" strokeWidth={1.5} markerEnd="url(#arr-violet)" />
              <text x={178} y={112} textAnchor="middle" fill="#a78bfa" opacity={0.6} style={{ fontSize: '7px', fontFamily: 'monospace' }}>shreds</text>

              {/* Fan-out lines from DZD to subscribers */}
              {/* Subscriber 1 - Validator */}
              <rect x={440} y={15} width={120} height={45} rx={8} fill="#18181b" stroke="#60a5fa" strokeWidth={1.5} />
              <text x={500} y={34} textAnchor="middle" fill="#60a5fa" style={{ fontSize: '9px', fontWeight: 600, fontFamily: 'monospace' }}>Validator A</text>
              <text x={500} y={48} textAnchor="middle" fill="#71717a" style={{ fontSize: '7px', fontFamily: 'monospace' }}>subscriber</text>
              <line x1={320} y1={110} x2={435} y2={38} stroke="#60a5fa" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#arr-mcast-blue)" />

              {/* Subscriber 2 - Validator */}
              <rect x={440} y={80} width={120} height={45} rx={8} fill="#18181b" stroke="#60a5fa" strokeWidth={1.5} />
              <text x={500} y={99} textAnchor="middle" fill="#60a5fa" style={{ fontSize: '9px', fontWeight: 600, fontFamily: 'monospace' }}>Validator B</text>
              <text x={500} y={113} textAnchor="middle" fill="#71717a" style={{ fontSize: '7px', fontFamily: 'monospace' }}>subscriber</text>
              <line x1={320} y1={118} x2={435} y2={102} stroke="#60a5fa" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#arr-mcast-blue)" />

              {/* Subscriber 3 - RPC */}
              <rect x={440} y={145} width={120} height={45} rx={8} fill="#18181b" stroke="#22d3ee" strokeWidth={1.5} />
              <text x={500} y={164} textAnchor="middle" fill="#22d3ee" style={{ fontSize: '9px', fontWeight: 600, fontFamily: 'monospace' }}>RPC Node</text>
              <text x={500} y={178} textAnchor="middle" fill="#71717a" style={{ fontSize: '7px', fontFamily: 'monospace' }}>subscriber</text>
              <line x1={320} y1={125} x2={435} y2={167} stroke="#60a5fa" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#arr-mcast-blue)" />

              {/* Subscriber 4 - Validator */}
              <rect x={440} y={210} width={120} height={45} rx={8} fill="#18181b" stroke="#60a5fa" strokeWidth={1.5} />
              <text x={500} y={229} textAnchor="middle" fill="#60a5fa" style={{ fontSize: '9px', fontWeight: 600, fontFamily: 'monospace' }}>Validator C</text>
              <text x={500} y={243} textAnchor="middle" fill="#71717a" style={{ fontSize: '7px', fontFamily: 'monospace' }}>subscriber</text>
              <line x1={320} y1={130} x2={435} y2={232} stroke="#60a5fa" strokeWidth={1} strokeDasharray="4 2" markerEnd="url(#arr-mcast-blue)" />

              {/* Label */}
              <text x={380} y={75} textAnchor="middle" fill="#52525b" style={{ fontSize: '8px', fontFamily: 'monospace' }}>
                one packet in → N copies out
              </text>
            </svg>
          </div>

          <CodeBlock
            title="Multicast connection"
            code={`# Connect as a multicast subscriber
doublezero connect \\
  --mode multicast \\
  --role subscriber \\
  --identity ~/.config/solana/id.json

# Connect as a multicast publisher
doublezero connect \\
  --mode multicast \\
  --role publisher \\
  --identity ~/.config/solana/id.json

# You can run both unicast (IBRL) and multicast simultaneously
doublezero connect \\
  --mode both \\
  --multicast-role subscriber \\
  --identity ~/.config/solana/id.json`}
          />
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Firewall Configuration</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The DoubleZero daemon needs specific firewall rules to establish and maintain
            the GRE tunnel to the DZD.
          </p>

          <CodeBlock
            title="iptables rules for DoubleZero"
            code={`# Allow GRE protocol (IP protocol 47)
sudo iptables -A INPUT -p gre -j ACCEPT
sudo iptables -A OUTPUT -p gre -j ACCEPT

# Allow the daemon control port
sudo iptables -A INPUT -p tcp --dport 8484 -j ACCEPT

# If using UFW instead:
sudo ufw allow proto gre from any
sudo ufw allow 8484/tcp`}
          />

          <div className="mt-4">
            <InfoBox variant="warning" title="Admission control">
              DoubleZero uses admission control — your validator's public key is verified
              against the Solana ledger before you're granted access. This means only
              legitimate validators and RPC operators can connect.
            </InfoBox>
          </div>
        </FadeInSection>
      </div>
    </div>
  )
}
