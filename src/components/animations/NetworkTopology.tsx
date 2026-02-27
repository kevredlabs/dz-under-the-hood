import { motion } from 'framer-motion'
import { useState } from 'react'

interface DZXNode {
  id: string
  label: string
  city: string
  x: number
  y: number
}

interface LinkData {
  from: string
  to: string
  type: 'wan' | 'dzx'
}

const nodes: DZXNode[] = [
  { id: 'nyc', label: 'DZX', city: 'New York', x: 230, y: 160 },
  { id: 'lon', label: 'DZX', city: 'London', x: 430, y: 80 },
  { id: 'fra', label: 'DZX', city: 'Frankfurt', x: 530, y: 170 },
  { id: 'tyo', label: 'DZX', city: 'Tokyo', x: 750, y: 120 },
  { id: 'sgp', label: 'DZX', city: 'Singapore', x: 670, y: 290 },
  { id: 'chi', label: 'DZD', city: 'Chicago', x: 150, y: 80 },
  { id: 'lax', label: 'DZD', city: 'Los Angeles', x: 80, y: 220 },
  { id: 'ams', label: 'DZD', city: 'Amsterdam', x: 380, y: 280 },
  { id: 'syd', label: 'DZD', city: 'Sydney', x: 830, y: 300 },
]

const links: LinkData[] = [
  { from: 'nyc', to: 'lon', type: 'dzx' },
  { from: 'lon', to: 'fra', type: 'dzx' },
  { from: 'fra', to: 'tyo', type: 'dzx' },
  { from: 'tyo', to: 'sgp', type: 'dzx' },
  { from: 'nyc', to: 'chi', type: 'wan' },
  { from: 'nyc', to: 'lax', type: 'wan' },
  { from: 'lon', to: 'ams', type: 'wan' },
  { from: 'sgp', to: 'syd', type: 'wan' },
  { from: 'lax', to: 'tyo', type: 'dzx' },
  { from: 'chi', to: 'lon', type: 'dzx' },
]

export function NetworkTopology() {
  const [hovered, setHovered] = useState<string | null>(null)

  const getNode = (id: string) => nodes.find((n) => n.id === id)!

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="flex items-center gap-4 mb-4 text-xs font-mono text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-cyan-400 inline-block" /> DZX Link
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-3 h-0.5 inline-block"
            style={{ borderTop: '1px dashed #a78bfa' }}
          />{' '}
          WAN Link
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" /> Exchange
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Device
        </span>
      </div>

      <svg viewBox="0 0 920 400" className="w-full h-auto">
        {links.map((link, i) => {
          const from = getNode(link.from)
          const to = getNode(link.to)
          const isHighlighted =
            hovered === link.from || hovered === link.to
          return (
            <motion.line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={link.type === 'dzx' ? '#22d3ee' : '#a78bfa'}
              strokeWidth={isHighlighted ? 2 : 1}
              strokeDasharray={link.type === 'wan' ? '6 4' : 'none'}
              strokeOpacity={hovered ? (isHighlighted ? 0.8 : 0.15) : 0.4}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          )
        })}

        {nodes.map((node) => {
          const isDZX = node.label === 'DZX'
          const isActive = hovered === node.id
          return (
            <g
              key={node.id}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={isDZX ? 16 : 10}
                fill="#18181b"
                stroke={isDZX ? '#22d3ee' : '#34d399'}
                strokeWidth={isActive ? 2.5 : 1.5}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              />
              <text
                x={node.x}
                y={node.y + (isDZX ? 30 : 24)}
                textAnchor="middle"
                className={`${isActive ? 'fill-zinc-300' : 'fill-zinc-600'} transition-colors`}
                style={{ fontSize: '10px', fontFamily: 'monospace' }}
              >
                {node.city}
              </text>
              {isActive && (
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  className="fill-white"
                  style={{ fontSize: '8px', fontWeight: 600, fontFamily: 'monospace' }}
                >
                  {node.label}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
