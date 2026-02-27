export interface GlossaryTerm {
  term: string
  definition: string
  category: 'infrastructure' | 'software' | 'connectivity' | 'onchain' | 'networking'
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'DZD (DoubleZero Device)',
    definition:
      'The physical network switching hardware (Arista switches) that terminates DoubleZero links and runs the Agent software. DZDs provide routing, packet processing, and user connectivity.',
    category: 'infrastructure',
  },
  {
    term: 'DZX (DoubleZero Exchange)',
    definition:
      'Interconnect points in the mesh network where different contributor links are bridged together. Located in major metros (NYC, LON, TYO). Similar to an Internet Exchange (IX).',
    category: 'infrastructure',
  },
  {
    term: 'WAN Link',
    definition:
      'A Wide Area Network link between two DZDs operated by the same contributor. Provides backbone connectivity within a single contributor\'s infrastructure.',
    category: 'infrastructure',
  },
  {
    term: 'DZX Link',
    definition:
      'A link between DZDs operated by different contributors, established at a DZX. Requires explicit acceptance by both parties.',
    category: 'infrastructure',
  },
  {
    term: 'Edge Device',
    definition:
      'A DZD that provides user connectivity to the DoubleZero network. Edge devices terminate users (validators, RPC operators) and connect them to the network.',
    category: 'infrastructure',
  },
  {
    term: 'Transit Device',
    definition:
      'A DZD that provides backbone connectivity. Transit devices move traffic between DZDs but do not terminate user connections directly.',
    category: 'infrastructure',
  },
  {
    term: 'Hybrid Device',
    definition:
      'A DZD that combines both edge and transit functionality — providing user connectivity and backbone routing.',
    category: 'infrastructure',
  },
  {
    term: 'Controller',
    definition:
      'A service that derives DZD configuration from onchain state on the DoubleZero ledger. The single source of truth for device configuration.',
    category: 'software',
  },
  {
    term: 'Config Agent',
    definition:
      'Software running on DZDs that polls the Controller for configuration changes and applies them to the device.',
    category: 'software',
  },
  {
    term: 'Telemetry Agent',
    definition:
      'Software running on DZDs that collects performance metrics (latency, jitter, packet loss) via TWAMP and submits them to the DoubleZero ledger.',
    category: 'software',
  },
  {
    term: 'doublezerod',
    definition:
      'The DoubleZero daemon service that runs on user servers (validators, RPC nodes). Manages tunnel interfaces, routing tables, and connectivity to DZDs.',
    category: 'software',
  },
  {
    term: 'Activator',
    definition:
      'Service that monitors contract events requiring IP address allocations and manages those changes on behalf of the network.',
    category: 'software',
  },
  {
    term: 'IBRL (Increase Bandwidth Reduce Latency)',
    definition:
      'A connection mode that allows validators to connect to DoubleZero without restarting their blockchain clients. Uses the existing public IP and establishes an overlay tunnel.',
    category: 'connectivity',
  },
  {
    term: 'CYOA (Choose Your Own Adventure)',
    definition:
      'Interface types that allow contributors to register connectivity options for users. Includes DIA, GRE tunnels, and private peering.',
    category: 'connectivity',
  },
  {
    term: 'DIA (Direct Internet Access)',
    definition:
      'Connectivity provided over the public internet. A CYOA interface type where users connect to a DZD over their existing internet connection.',
    category: 'connectivity',
  },
  {
    term: 'Multicast',
    definition:
      'A one-to-many packet delivery method. Has two roles: publisher (sends packets) and subscriber (receives packets). Used for efficient block data distribution.',
    category: 'connectivity',
  },
  {
    term: '2Z Token',
    definition:
      'The native token of the DoubleZero network. Used for paying validator fees and distributed as rewards to infrastructure contributors.',
    category: 'onchain',
  },
  {
    term: 'Service Key',
    definition:
      'A cryptographic keypair used to authenticate CLI operations. Your contributor identity for interacting with the DoubleZero smart contract.',
    category: 'onchain',
  },
  {
    term: 'Metrics Publisher Key',
    definition:
      'A cryptographic keypair used by the Telemetry Agent to sign metric submissions to the blockchain. Separate from the service key for security isolation.',
    category: 'onchain',
  },
  {
    term: 'Onchain',
    definition:
      'Data and operations recorded on the DoubleZero ledger. Device registrations, link configurations, and telemetry are all onchain — transparent and verifiable by all participants.',
    category: 'onchain',
  },
  {
    term: 'VXLAN (Virtual Extensible LAN)',
    definition:
      'An overlay technology that encapsulates Ethernet frames inside UDP packets (port 4789). Identified by a 24-bit VNI supporting up to 16 million virtual networks. DoubleZero uses VXLAN to create shared Layer 2 segments between DZDs across continents.',
    category: 'networking',
  },
  {
    term: 'IS-IS (Intermediate System to Intermediate System)',
    definition:
      'A link-state routing protocol used for fast convergence within the DoubleZero backbone. While BGP handles inter-DZD policy-based routing, IS-IS provides rapid internal path computation.',
    category: 'networking',
  },
  {
    term: 'FPGA (Field Programmable Gate Array)',
    definition:
      'A hardware chip that can be reprogrammed for custom packet processing logic. DZDs use FPGAs for line-rate edge filtering — deduplication, format validation, and rate limiting — with no CPU overhead.',
    category: 'infrastructure',
  },
  {
    term: 'Shred',
    definition:
      'A data fragment of a Solana block. Blocks are split into shreds for distribution via Turbine. Shreds are the primary unit of data that flows through the DoubleZero network between validators.',
    category: 'networking',
  },
  {
    term: 'Turbine',
    definition:
      'Solana\'s block propagation protocol. Distributes shreds in a tree structure across validators. Retransmissions at multiple tree levels can produce duplicate shreds — a key reason DZ edge filtering exists.',
    category: 'networking',
  },
  {
    term: 'BGP (Border Gateway Protocol)',
    definition:
      'The routing protocol used for exchanging routing information between networks on the internet. DoubleZero uses BGP internally with ASN 65342.',
    category: 'networking',
  },
  {
    term: 'GRE (Generic Routing Encapsulation)',
    definition:
      'A tunneling protocol that encapsulates network packets inside IP packets. Used by IBRL and CYOA connections to create overlay tunnels between users and DZDs.',
    category: 'networking',
  },
  {
    term: 'Jitter',
    definition:
      'Variation in packet latency over time. Low jitter is critical for real-time applications like blockchain consensus. The public internet has high jitter; DoubleZero minimizes it.',
    category: 'networking',
  },
  {
    term: 'MTU (Maximum Transmission Unit)',
    definition:
      'The largest packet size (in bytes) that can be transmitted over a network link. DoubleZero WAN links use MTU 9000 (jumbo frames) for efficiency.',
    category: 'networking',
  },
  {
    term: 'TWAMP (Two-Way Active Measurement Protocol)',
    definition:
      'A protocol for measuring network performance metrics like latency, jitter, and packet loss. The Telemetry Agent uses TWAMP to collect metrics between DZDs.',
    category: 'networking',
  },
  {
    term: 'VRF (Virtual Routing and Forwarding)',
    definition:
      'A technology that allows multiple isolated routing tables to exist on the same physical router. Contributors often use a separate management VRF.',
    category: 'networking',
  },
  {
    term: 'Link States',
    definition:
      'Links can be Activated (normal operation, traffic flows), Soft-Drained (traffic discouraged, graceful maintenance), or Hard-Drained (completely removed from service).',
    category: 'infrastructure',
  },
  {
    term: 'DZ Prefix',
    definition:
      'IP address allocations in CIDR format assigned to a DZD for overlay network addressing. Must be globally routable public IPv4 addresses (minimum /29).',
    category: 'networking',
  },
  {
    term: 'Contributor',
    definition:
      'A network infrastructure provider who contributes bandwidth and hardware (fiber links, DZDs) to the DoubleZero network and receives 2Z token incentives.',
    category: 'onchain',
  },
]

export const categoryLabels: Record<GlossaryTerm['category'], string> = {
  infrastructure: 'Infrastructure',
  software: 'Software',
  connectivity: 'Connectivity',
  onchain: 'Onchain',
  networking: 'Networking',
}

export const categoryColors: Record<GlossaryTerm['category'], string> = {
  infrastructure: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  software: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  connectivity: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  onchain: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  networking: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}
