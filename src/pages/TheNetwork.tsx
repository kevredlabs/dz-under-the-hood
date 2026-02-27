import { Network } from 'lucide-react'
import { SectionHero } from '../components/ui/SectionHero'
import { FadeInSection } from '../components/animations/FadeInSection'
import { NetworkTopology } from '../components/animations/NetworkTopology'
import { InfoBox } from '../components/ui/InfoBox'
import { DeepDive } from '../components/ui/DeepDive'
import { CodeBlock } from '../components/ui/CodeBlock'

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

        <FadeInSection>
          <DeepDive title="VXLAN — how the backbone overlay works">
            <p className="text-sm text-zinc-400 leading-relaxed">
              <strong className="text-zinc-200">VXLAN (Virtual Extensible LAN)</strong> is
              an overlay network technology that encapsulates Layer 2 Ethernet frames inside
              UDP packets. This lets DZDs create virtual Layer 2 segments on top of the
              physical fiber — essentially "stretching" a LAN across continents.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Each VXLAN segment is identified by a <strong className="text-zinc-200">VNI
              (VXLAN Network Identifier)</strong> — a 24-bit ID supporting up to 16 million
              virtual networks (vs. only 4096 with traditional VLANs). DZDs at each end of
              a link share a VNI, creating a shared broadcast domain as if they were on the
              same physical switch.
            </p>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
              <p className="font-mono text-xs text-zinc-500 mb-2">VXLAN PACKET STRUCTURE</p>
              <p className="text-xs font-mono text-cyan-400/80 leading-relaxed">
                [Outer Ethernet] [Outer IP] [Outer UDP:4789] [VXLAN Header (VNI)] [Inner Ethernet] [Inner IP] [Payload]
              </p>
              <p className="text-xs text-zinc-500 mt-2">
                ~50 bytes of overhead per packet — which is why DZ uses jumbo frames (MTU 9000) on WAN links.
              </p>
            </div>
            <CodeBlock
              title="Simulating a VXLAN link between two DZDs (Linux)"
              code={`# Create two network namespaces (simulating two DZDs)
sudo ip netns add dzd-nyc
sudo ip netns add dzd-lon

# Connect them with a veth pair (simulating the fiber)
sudo ip link add veth-nyc type veth peer name veth-lon
sudo ip link set veth-nyc netns dzd-nyc
sudo ip link set veth-lon netns dzd-lon

# Assign underlay IPs
sudo ip netns exec dzd-nyc ip addr add 10.0.0.1/30 dev veth-nyc
sudo ip netns exec dzd-nyc ip link set veth-nyc up
sudo ip netns exec dzd-lon ip addr add 10.0.0.2/30 dev veth-lon
sudo ip netns exec dzd-lon ip link set veth-lon up

# Create VXLAN overlay — VNI 100, standard port 4789
sudo ip netns exec dzd-nyc \\
  ip link add vxlan100 type vxlan \\
    id 100 local 10.0.0.1 remote 10.0.0.2 \\
    dstport 4789 dev veth-nyc
sudo ip netns exec dzd-nyc ip addr add 172.16.0.1/24 dev vxlan100
sudo ip netns exec dzd-nyc ip link set vxlan100 up

sudo ip netns exec dzd-lon \\
  ip link add vxlan100 type vxlan \\
    id 100 local 10.0.0.2 remote 10.0.0.1 \\
    dstport 4789 dev veth-lon
sudo ip netns exec dzd-lon ip addr add 172.16.0.2/24 dev vxlan100
sudo ip netns exec dzd-lon ip link set vxlan100 up

# Test — the two DZDs can now talk over the VXLAN overlay
sudo ip netns exec dzd-nyc ping -c 3 172.16.0.2
# 64 bytes from 172.16.0.2: icmp_seq=1 ttl=64 time=0.05ms ✓

# See the encapsulation with tcpdump
sudo ip netns exec dzd-nyc tcpdump -i veth-nyc -c 5 udp port 4789`}
            />
          </DeepDive>
        </FadeInSection>

        <FadeInSection>
          <DeepDive title="BGP — how DZDs exchange routes">
            <p className="text-sm text-zinc-400 leading-relaxed">
              <strong className="text-zinc-200">BGP (Border Gateway Protocol)</strong> is
              the routing protocol that makes the internet work. It lets networks exchange
              reachability information — "I can reach these IP prefixes, here's the path."
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              All DoubleZero devices use <strong className="text-zinc-200">iBGP (internal BGP)
              with ASN 65342</strong> — a private ASN not visible on the public internet.
              When a new validator connects to an Edge DZD, BGP propagates the route across
              the mesh so every DZD knows how to reach it.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Unlike OSPF or IS-IS (which find the shortest path), BGP is <em>policy-based</em> —
              you can prefer certain paths, reject others, and shape traffic. DZ also uses
              IS-IS internally for fast convergence within the backbone.
            </p>
            <CodeBlock
              title="BGP peering between DZDs with FRR"
              code={`# Install Free Range Routing (FRR)
sudo apt install -y frr
sudo sed -i 's/bgpd=no/bgpd=yes/' /etc/frr/daemons
sudo systemctl restart frr

# BGP config for dzd-nyc (via vtysh or frr.conf)
# ─────────────────────────────────────────────
# router bgp 65342
#   bgp router-id 10.255.0.1
#   neighbor 172.16.0.2 remote-as 65342    ← iBGP peer (dzd-lon)
#   address-family ipv4 unicast
#     network 192.168.100.0/30             ← validator subnet
#     network 10.255.0.1/32                ← loopback
#   exit-address-family

# Verify BGP session
sudo ip netns exec dzd-nyc vtysh -c "show bgp summary"
# Neighbor       AS  State/PfxRcd
# 172.16.0.2  65342  2            ← 2 prefixes received ✓

# Show learned routes
sudo ip netns exec dzd-nyc vtysh -c "show ip bgp"
# *> 192.168.100.0/30  0.0.0.0     (local)
# *> 192.168.101.0/30  172.16.0.2  (from dzd-lon) ← now reachable!`}
            />
          </DeepDive>
        </FadeInSection>

        <FadeInSection>
          <DeepDive title="VRF — isolating management from production traffic">
            <p className="text-sm text-zinc-400 leading-relaxed">
              <strong className="text-zinc-200">VRF (Virtual Routing and Forwarding)</strong>{' '}
              creates isolated routing table instances on the same device. Each VRF has its
              own routing table, ARP table, and forwarding rules — traffic in one VRF can't
              leak into another.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              DoubleZero contributors use a separate management VRF to keep switch management
              traffic (SSH, monitoring, config pulls) isolated from production user data. This
              prevents a monitoring spike from affecting validator traffic.
            </p>
            <CodeBlock
              title="Creating VRFs on a DZD (Linux)"
              code={`# Create two VRFs — production and management
sudo ip link add dz-prod type vrf table 100
sudo ip link set dz-prod up

sudo ip link add dz-mgmt type vrf table 200
sudo ip link set dz-mgmt up

# Assign user-facing interfaces to production VRF
sudo ip link set gre-val1 master dz-prod

# Each VRF has its own, isolated routing table:
ip route show vrf dz-prod    # only production routes
ip route show vrf dz-mgmt    # only management routes

# Run commands within a specific VRF
ip vrf exec dz-prod ping 192.168.100.2   # reaches validator
ip vrf exec dz-mgmt ping 10.99.0.1       # reaches monitoring`}
            />
          </DeepDive>
        </FadeInSection>

        <FadeInSection>
          <h2 className="text-2xl font-bold mb-4">Device Types</h2>
          <div className="space-y-4">
            {[
              {
                name: 'Edge Device',
                desc: 'Provides user connectivity. Terminates validators, RPC nodes, and other users via CYOA interfaces. The "on-ramp" to the network.',
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
                desc: 'Both edge and transit. Provides user connectivity and routes traffic through the mesh. Most versatile deployment.',
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
            Users (validators, RPC operators) pay fees to access the network — either in
            SOL or directly in 2Z.
          </InfoBox>
        </FadeInSection>
      </div>
    </div>
  )
}
