import { motion } from 'framer-motion'

interface Node {
  x: number
  y: number
  label: string
  type: 'source' | 'hop' | 'dzx' | 'dzd' | 'validator'
}

interface PacketFlowProps {
  variant: 'internet' | 'doublezero'
}

const internetNodes: Node[] = [
  { x: 50, y: 200, label: 'Leader', type: 'source' },
  { x: 160, y: 120, label: 'ISP 1', type: 'hop' },
  { x: 270, y: 260, label: 'IX', type: 'hop' },
  { x: 380, y: 100, label: 'ISP 2', type: 'hop' },
  { x: 480, y: 220, label: 'ISP 3', type: 'hop' },
  { x: 580, y: 140, label: 'ISP 4', type: 'hop' },
  { x: 700, y: 200, label: 'Validator', type: 'validator' },
]

const dzNodes: Node[] = [
  { x: 50, y: 200, label: 'Leader', type: 'source' },
  { x: 200, y: 200, label: 'DZD', type: 'dzd' },
  { x: 400, y: 200, label: 'DZX', type: 'dzx' },
  { x: 580, y: 200, label: 'DZD', type: 'dzd' },
  { x: 700, y: 200, label: 'Validator', type: 'validator' },
]

const nodeColors: Record<Node['type'], string> = {
  source: '#a78bfa',
  hop: '#ef4444',
  dzx: '#22d3ee',
  dzd: '#34d399',
  validator: '#a78bfa',
}

export function PacketFlow({ variant }: PacketFlowProps) {
  const nodes = variant === 'internet' ? internetNodes : dzNodes
  const isInternet = variant === 'internet'

  const pathD = nodes.reduce((acc, node, i) => {
    return acc + (i === 0 ? `M ${node.x} ${node.y}` : ` L ${node.x} ${node.y}`)
  }, '')

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`w-2 h-2 rounded-full ${isInternet ? 'bg-red-400' : 'bg-cyan-400'}`}
        />
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
          {isInternet ? 'Public Internet' : 'DoubleZero Network'}
        </span>
      </div>

      <svg
        viewBox="0 0 750 320"
        className="w-full h-auto"
        style={{ maxHeight: 280 }}
      >
        <defs>
          <filter id={`glow-${variant}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={pathD}
          fill="none"
          stroke={isInternet ? '#3f3f46' : '#164e63'}
          strokeWidth="2"
          strokeDasharray={isInternet ? '6 4' : 'none'}
        />

        <motion.circle
          r="5"
          fill={isInternet ? '#ef4444' : '#22d3ee'}
          filter={`url(#glow-${variant})`}
        >
          <animateMotion
            dur={isInternet ? '4s' : '2s'}
            repeatCount="indefinite"
            path={pathD}
          />
        </motion.circle>

        {nodes.map((node, i) => (
          <g key={i}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.type === 'dzx' ? 18 : 14}
              fill="#18181b"
              stroke={nodeColors[node.type]}
              strokeWidth="2"
            />
            <text
              x={node.x}
              y={node.y + 32}
              textAnchor="middle"
              className="text-xs fill-zinc-500"
              style={{ fontSize: '11px' }}
            >
              {node.label}
            </text>
          </g>
        ))}

        {isInternet && (
          <>
            {[
              { x: 210, y: 170 },
              { x: 320, y: 200 },
              { x: 430, y: 140 },
            ].map((pos, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 2, delay: i * 0.7, repeat: Infinity }}
              >
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  className="fill-red-400/60"
                  style={{ fontSize: '9px', fontFamily: 'monospace' }}
                >
                  {['DUP SHRED', 'JITTER', 'CONGESTION'][i]}
                </text>
              </motion.g>
            ))}
          </>
        )}

        {!isInternet && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <text
              x={300}
              y={170}
              textAnchor="middle"
              className="fill-emerald-400/60"
              style={{ fontSize: '9px', fontFamily: 'monospace' }}
            >
              DEDUPED &bull; DIRECT &bull; LOW JITTER
            </text>
          </motion.g>
        )}
      </svg>
    </div>
  )
}
