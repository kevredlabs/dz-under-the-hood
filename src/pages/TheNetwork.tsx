import { Network } from 'lucide-react'
import { SectionHero } from '../components/ui/SectionHero'
import { FadeInSection } from '../components/animations/FadeInSection'
import { NetworkTopology } from '../components/animations/NetworkTopology'
import { InfoBox } from '../components/ui/InfoBox'

function VxlanDiagram() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 overflow-x-auto">
      <svg viewBox="0 0 760 220" className="w-full h-auto">
        <defs>
          <marker id="arr-cyan" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#22d3ee" />
          </marker>
        </defs>

        {/* Physical fiber (underlay) */}
        <rect x={10} y={140} width={740} height={50} rx={8} fill="#18181b" stroke="#3f3f46" strokeWidth={1} strokeDasharray="4 3" />
        <text x={380} y={172} textAnchor="middle" fill="#52525b" style={{ fontSize: '10px', fontFamily: 'monospace' }}>
          Physical fiber (underlay) — 10.0.0.0/30
        </text>

        {/* VXLAN overlay */}
        <rect x={50} y={30} width={660} height={70} rx={10} fill="#164e6310" stroke="#22d3ee" strokeWidth={1.5} />
        <text x={380} y={22} textAnchor="middle" fill="#22d3ee" style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 600 }}>
          VXLAN Overlay — VNI 100 — 172.16.0.0/24
        </text>

        {/* DZD NYC */}
        <rect x={80} y={45} width={120} height={42} rx={8} fill="#18181b" stroke="#34d399" strokeWidth={1.5} />
        <text x={140} y={63} textAnchor="middle" fill="#34d399" style={{ fontSize: '10px', fontWeight: 600, fontFamily: 'monospace' }}>DZD NYC</text>
        <text x={140} y={78} textAnchor="middle" fill="#71717a" style={{ fontSize: '8px', fontFamily: 'monospace' }}>172.16.0.1</text>

        {/* DZD LON */}
        <rect x={560} y={45} width={120} height={42} rx={8} fill="#18181b" stroke="#34d399" strokeWidth={1.5} />
        <text x={620} y={63} textAnchor="middle" fill="#34d399" style={{ fontSize: '10px', fontWeight: 600, fontFamily: 'monospace' }}>DZD LON</text>
        <text x={620} y={78} textAnchor="middle" fill="#71717a" style={{ fontSize: '8px', fontFamily: 'monospace' }}>172.16.0.2</text>

        {/* VXLAN tunnel arrow */}
        <line x1={205} y1={65} x2={555} y2={65} stroke="#22d3ee" strokeWidth={1.5} markerEnd="url(#arr-cyan)" />
        <text x={380} y={58} textAnchor="middle" fill="#22d3ee" opacity={0.6} style={{ fontSize: '8px', fontFamily: 'monospace' }}>
          encapsulated L2 frames over UDP:4789
        </text>

        {/* Underlay connections */}
        <line x1={140} y1={87} x2={140} y2={140} stroke="#3f3f46" strokeWidth={1} strokeDasharray="3 2" />
        <text x={140} y={135} textAnchor="middle" fill="#52525b" style={{ fontSize: '8px', fontFamily: 'monospace' }}>10.0.0.1</text>
        <line x1={620} y1={87} x2={620} y2={140} stroke="#3f3f46" strokeWidth={1} strokeDasharray="3 2" />
        <text x={620} y={135} textAnchor="middle" fill="#52525b" style={{ fontSize: '8px', fontFamily: 'monospace' }}>10.0.0.2</text>

        {/* Packet structure */}
        <g transform="translate(220, 100)">
          {[
            { w: 55, label: 'Outer IP', color: '#3f3f46' },
            { w: 55, label: 'UDP:4789', color: '#3f3f46' },
            { w: 50, label: 'VXLAN', color: '#164e63' },
            { w: 55, label: 'Inner ETH', color: '#164e63' },
            { w: 55, label: 'Inner IP', color: '#065f46' },
            { w: 50, label: 'Payload', color: '#065f46' },
          ].reduce<{ els: JSX.Element[], offset: number }>((acc, seg, i) => {
            acc.els.push(
              <g key={i}>
                <rect x={acc.offset} y={0} width={seg.w} height={22} rx={3} fill={seg.color} stroke="#52525b" strokeWidth={0.5} />
                <text x={acc.offset + seg.w / 2} y={14} textAnchor="middle" fill="#a1a1aa" style={{ fontSize: '7px', fontFamily: 'monospace' }}>
                  {seg.label}
                </text>
              </g>
            )
            acc.offset += seg.w + 2
            return acc
          }, { els: [], offset: 0 }).els}
        </g>
      </svg>
    </div>
  )
}

function BgpDiagram() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <svg viewBox="0 0 700 200" className="w-full h-auto">
        <defs>
          <marker id="arr-blue" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#3b82f6" />
          </marker>
          <marker id="arr-green" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#34d399" />
          </marker>
        </defs>

        {/* ASN box */}
        <rect x={60} y={15} width={580} height={170} rx={12} fill="none" stroke="#3b82f620" strokeWidth={1.5} strokeDasharray="6 4" />
        <text x={350} y={10} textAnchor="middle" fill="#3b82f6" opacity={0.5} style={{ fontSize: '10px', fontFamily: 'monospace' }}>iBGP — ASN 65342</text>

        {/* DZD NYC */}
        <rect x={90} y={60} width={110} height={55} rx={8} fill="#18181b" stroke="#34d399" strokeWidth={1.5} />
        <text x={145} y={82} textAnchor="middle" fill="#34d399" style={{ fontSize: '10px', fontWeight: 600, fontFamily: 'monospace' }}>DZD NYC</text>
        <text x={145} y={100} textAnchor="middle" fill="#71717a" style={{ fontSize: '8px', fontFamily: 'monospace' }}>10.255.0.1</text>

        {/* DZD LON */}
        <rect x={500} y={60} width={110} height={55} rx={8} fill="#18181b" stroke="#34d399" strokeWidth={1.5} />
        <text x={555} y={82} textAnchor="middle" fill="#34d399" style={{ fontSize: '10px', fontWeight: 600, fontFamily: 'monospace' }}>DZD LON</text>
        <text x={555} y={100} textAnchor="middle" fill="#71717a" style={{ fontSize: '8px', fontFamily: 'monospace' }}>10.255.0.2</text>

        {/* BGP arrows */}
        <line x1={205} y1={78} x2={495} y2={78} stroke="#3b82f6" strokeWidth={1.5} markerEnd="url(#arr-blue)" />
        <line x1={495} y1={95} x2={205} y2={95} stroke="#3b82f6" strokeWidth={1.5} markerEnd="url(#arr-blue)" />

        <text x={350} y={72} textAnchor="middle" fill="#3b82f6" opacity={0.6} style={{ fontSize: '8px', fontFamily: 'monospace' }}>
          "I can reach 192.168.100.0/30"
        </text>
        <text x={350} y={108} textAnchor="middle" fill="#3b82f6" opacity={0.6} style={{ fontSize: '8px', fontFamily: 'monospace' }}>
          "I can reach 192.168.101.0/30"
        </text>

        {/* Validators below */}
        <rect x={105} y={140} width={80} height={30} rx={6} fill="#18181b" stroke="#a78bfa" strokeWidth={1} />
        <text x={145} y={159} textAnchor="middle" fill="#a78bfa" style={{ fontSize: '8px', fontFamily: 'monospace' }}>Validator A</text>
        <line x1={145} y1={115} x2={145} y2={140} stroke="#34d399" strokeWidth={1} markerEnd="url(#arr-green)" />

        <rect x={515} y={140} width={80} height={30} rx={6} fill="#18181b" stroke="#a78bfa" strokeWidth={1} />
        <text x={555} y={159} textAnchor="middle" fill="#a78bfa" style={{ fontSize: '8px', fontFamily: 'monospace' }}>Validator B</text>
        <line x1={555} y1={115} x2={555} y2={140} stroke="#34d399" strokeWidth={1} markerEnd="url(#arr-green)" />
      </svg>
    </div>
  )
}

function VrfDiagram() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <svg viewBox="0 0 600 170" className="w-full h-auto">
        {/* DZD box */}
        <rect x={120} y={10} width={360} height={150} rx={12} fill="#18181b" stroke="#34d399" strokeWidth={1.5} />
        <text x={300} y={30} textAnchor="middle" fill="#34d399" style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'monospace' }}>DZD (single physical switch)</text>

        {/* VRF prod */}
        <rect x={145} y={45} width={145} height={90} rx={8} fill="#06b6d410" stroke="#22d3ee" strokeWidth={1.5} />
        <text x={217} y={65} textAnchor="middle" fill="#22d3ee" style={{ fontSize: '10px', fontWeight: 600, fontFamily: 'monospace' }}>VRF: dz-prod</text>
        <text x={217} y={82} textAnchor="middle" fill="#71717a" style={{ fontSize: '8px', fontFamily: 'monospace' }}>table 100</text>
        <text x={217} y={100} textAnchor="middle" fill="#71717a" style={{ fontSize: '7px', fontFamily: 'monospace' }}>gre-val1, vxlan100</text>
        <text x={217} y={115} textAnchor="middle" fill="#71717a" style={{ fontSize: '7px', fontFamily: 'monospace' }}>validator traffic</text>
        <text x={217} y={128} textAnchor="middle" fill="#22d3ee" opacity={0.5} style={{ fontSize: '7px', fontFamily: 'monospace' }}>blocks, shreds, votes</text>

        {/* VRF mgmt */}
        <rect x={310} y={45} width={145} height={90} rx={8} fill="#f59e0b10" stroke="#f59e0b" strokeWidth={1.5} />
        <text x={382} y={65} textAnchor="middle" fill="#f59e0b" style={{ fontSize: '10px', fontWeight: 600, fontFamily: 'monospace' }}>VRF: dz-mgmt</text>
        <text x={382} y={82} textAnchor="middle" fill="#71717a" style={{ fontSize: '8px', fontFamily: 'monospace' }}>table 200</text>
        <text x={382} y={100} textAnchor="middle" fill="#71717a" style={{ fontSize: '7px', fontFamily: 'monospace' }}>eth0-mgmt</text>
        <text x={382} y={115} textAnchor="middle" fill="#71717a" style={{ fontSize: '7px', fontFamily: 'monospace' }}>SSH, monitoring</text>
        <text x={382} y={128} textAnchor="middle" fill="#f59e0b" opacity={0.5} style={{ fontSize: '7px', fontFamily: 'monospace' }}>config pulls, telemetry</text>

        {/* Isolation wall */}
        <line x1={300} y1={50} x2={300} y2={130} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={300} y={145} textAnchor="middle" fill="#ef4444" opacity={0.5} style={{ fontSize: '7px', fontFamily: 'monospace' }}>isolated</text>

        {/* Labels outside */}
        <text x={60} y={95} textAnchor="middle" fill="#71717a" style={{ fontSize: '9px', fontFamily: 'monospace' }}>validators</text>
        <line x1={90} y1={90} x2={145} y2={90} stroke="#22d3ee" strokeWidth={1} />
        <text x={540} y={95} textAnchor="middle" fill="#71717a" style={{ fontSize: '9px', fontFamily: 'monospace' }}>ops team</text>
        <line x1={455} y1={90} x2={510} y2={90} stroke="#f59e0b" strokeWidth={1} />
      </svg>
    </div>
  )
}

export function TheNetwork() {
  return (
    <div>
      <SectionHero
        number={2}
        title="The Network"
        subtitle="A decentralized private mesh built on underutilized fiber"
        color="text-cyan-400"
        icon={Network}
      />

      <div className="max-w-4xl mx-auto px-6 space-y-16 pb-24">
        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Private Fiber, Shared Network</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Around the world, data centers and infrastructure providers own fiber optic
            links — <strong className="text-zinc-200">wavelength services</strong> — between
            cities. Many of these links are underutilized. DoubleZero lets these providers
            contribute their spare capacity to a shared, decentralized mesh network.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Contributors install <strong className="text-zinc-200">DoubleZero Devices
            (DZDs)</strong> — physical Arista network switches — at each end of their fiber
            links. These devices run the DoubleZero Agent software and become part of the
            global mesh.
          </p>
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-6">Global Network Topology</h2>
          <NetworkTopology />
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Exchanges and Links</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                DZX — DoubleZero Exchange
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                DZXs are the interconnect hubs where different contributors' links meet.
                Think of them like airports in a hub-and-spoke system — major metro
                areas (NYC, London, Tokyo) where fiber paths naturally converge.
                Contributors must cross-connect their links at the nearest DZX.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-5">
                <p className="font-mono text-xs text-violet-400 mb-2">WAN LINK</p>
                <p className="text-sm text-zinc-400">
                  A link between two DZDs operated by the <em>same</em> contributor.
                  Internal backbone connectivity within a single organization's
                  infrastructure.
                </p>
              </div>
              <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-5">
                <p className="font-mono text-xs text-cyan-400 mb-2">DZX LINK</p>
                <p className="text-sm text-zinc-400">
                  A link between DZDs operated by <em>different</em> contributors,
                  established at a DZX. Both parties must explicitly accept the link.
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* ── VXLAN ── */}
        <FadeInSection>
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">VXLAN — The Backbone Overlay</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The physical fiber between DZDs is the <strong className="text-zinc-200">underlay</strong>.
            On top of it, DoubleZero creates virtual Layer 2 segments using{' '}
            <strong className="text-zinc-200">VXLAN (Virtual Extensible LAN)</strong> — an
            overlay technology that encapsulates Ethernet frames inside UDP packets.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Each VXLAN segment is identified by a{' '}
            <strong className="text-zinc-200">VNI (VXLAN Network Identifier)</strong> — a
            24-bit ID supporting up to 16 million virtual networks (vs. only 4096 with
            traditional VLANs). DZDs at each end of a link share a VNI, creating a shared
            broadcast domain as if they were on the same physical switch — even if they're
            on different continents.
          </p>
        </FadeInSection>

        <FadeInSection>
          <VxlanDiagram />
        </FadeInSection>

        <FadeInSection>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The overhead is about 50 bytes per packet (outer headers + VXLAN header). This is
            why DZ uses <strong className="text-zinc-200">jumbo frames (MTU 9000)</strong> on
            WAN links — the 50-byte overhead becomes negligible on a 9000-byte frame.
          </p>

          <InfoBox variant="info" title="Why VXLAN and not just IP routing?">
            VXLAN gives DZDs a shared Layer 2 domain, which enables MAC learning, ARP
            resolution, and multicast between devices — as if they were on the same
            switch. Pure IP routing can't do this. It also decouples the overlay addressing
            from the physical fiber, making it easy to reconfigure without touching hardware.
          </InfoBox>
        </FadeInSection>

        {/* ── BGP ── */}
        <FadeInSection>
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">BGP — How DZDs Exchange Routes</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            <strong className="text-zinc-200">BGP (Border Gateway Protocol)</strong> is the
            routing protocol that makes the internet work. It lets networks exchange
            reachability information — "I can reach these IP prefixes, here's the path."
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            All DoubleZero devices use{' '}
            <strong className="text-zinc-200">iBGP (internal BGP) with ASN 65342</strong> —
            a private ASN not visible on the public internet. When a new validator connects
            to an Edge DZD, BGP automatically propagates the route across the entire mesh
            so every other DZD knows how to reach it.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Unlike OSPF or IS-IS (which find the shortest path), BGP is{' '}
            <em>policy-based</em> — you can prefer certain paths, reject others, and shape
            traffic flow. DZ also uses IS-IS internally for fast convergence within the
            backbone.
          </p>
        </FadeInSection>

        <FadeInSection>
          <BgpDiagram />
        </FadeInSection>

        {/* ── VRF ── */}
        <FadeInSection>
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">VRF — Traffic Isolation on a Single Switch</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            A single DZD handles both validator traffic (blocks, shreds, votes) and
            management traffic (SSH, monitoring, config pulls). These must never interfere
            with each other.{' '}
            <strong className="text-zinc-200">VRF (Virtual Routing and Forwarding)</strong>{' '}
            solves this by creating completely isolated routing tables on the same physical
            device.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Each VRF has its own routing table, ARP table, and forwarding rules. Traffic in
            one VRF is invisible to the other — a monitoring spike in the management VRF
            can't affect validator traffic in the production VRF.
          </p>
        </FadeInSection>

        <FadeInSection>
          <VrfDiagram />
        </FadeInSection>

        {/* ── Device Types ── */}
        <FadeInSection>
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Device Types</h2>
          <div className="space-y-4">
            {[
              {
                name: 'Edge Device',
                desc: 'Provides validator connectivity. Terminates validators and RPC nodes via CYOA interfaces. The "on-ramp" to the network.',
                color: 'border-green-500/20 bg-green-500/5',
                label: 'text-green-400',
              },
              {
                name: 'Transit Device',
                desc: 'Backbone-only. Moves traffic between DZDs across the mesh. Does not terminate user connections — pure routing.',
                color: 'border-amber-500/20 bg-amber-500/5',
                label: 'text-amber-400',
              },
              {
                name: 'Hybrid Device',
                desc: 'Both edge and transit. Provides validator connectivity and routes traffic through the mesh. Most versatile deployment.',
                color: 'border-blue-500/20 bg-blue-500/5',
                label: 'text-blue-400',
              },
            ].map((d) => (
              <div key={d.name} className={`rounded-lg border ${d.color} p-5`}>
                <p className={`font-mono text-xs ${d.label} mb-2`}>{d.name.toUpperCase()}</p>
                <p className="text-sm text-zinc-400">{d.desc}</p>
              </div>
            ))}
          </div>
        </FadeInSection>

        <FadeInSection>
          <InfoBox variant="info" title="The incentive model">
            Contributors receive <strong>2Z tokens</strong> for providing bandwidth and
            hardware to the network. The more capacity you contribute, the more you earn.
            Validators pay fees to access the network — either in SOL or directly in 2Z.
          </InfoBox>
        </FadeInSection>
      </div>
    </div>
  )
}
