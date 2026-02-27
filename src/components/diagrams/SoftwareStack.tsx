import { motion } from 'framer-motion'
import { useState } from 'react'

interface Component {
  id: string
  label: string
  description: string
  x: number
  y: number
  width: number
  height: number
  color: string
}

const components: Component[] = [
  {
    id: 'ledger',
    label: 'DoubleZero Ledger',
    description: 'Onchain state: device registrations, link configs, telemetry records, fees.',
    x: 300,
    y: 30,
    width: 200,
    height: 44,
    color: '#3b82f6',
  },
  {
    id: 'controller',
    label: 'Controller',
    description: 'Reads onchain state, derives device configuration. Serves config to Agents.',
    x: 180,
    y: 120,
    width: 140,
    height: 44,
    color: '#a78bfa',
  },
  {
    id: 'activator',
    label: 'Activator',
    description: 'Monitors contract events for IP allocations and state changes.',
    x: 480,
    y: 120,
    width: 140,
    height: 44,
    color: '#a78bfa',
  },
  {
    id: 'config-agent',
    label: 'Config Agent',
    description: 'Runs on DZDs. Polls Controller, computes diffs, applies config changes.',
    x: 100,
    y: 230,
    width: 140,
    height: 44,
    color: '#22d3ee',
  },
  {
    id: 'telemetry-agent',
    label: 'Telemetry Agent',
    description: 'Runs on DZDs. Collects TWAMP metrics, submits latency/loss data onchain.',
    x: 300,
    y: 230,
    width: 155,
    height: 44,
    color: '#34d399',
  },
  {
    id: 'dzd',
    label: 'DZD (Switch)',
    description: 'Physical Arista switch. Runs both agents. Handles routing and packet filtering.',
    x: 200,
    y: 320,
    width: 200,
    height: 44,
    color: '#f59e0b',
  },
  {
    id: 'daemon',
    label: 'doublezerod',
    description: 'Daemon on user servers. Manages tunnels, routing tables, and DZD connectivity.',
    x: 520,
    y: 320,
    width: 140,
    height: 44,
    color: '#ef4444',
  },
]

const arrows: { from: string; to: string; label?: string }[] = [
  { from: 'ledger', to: 'controller', label: 'reads state' },
  { from: 'ledger', to: 'activator', label: 'events' },
  { from: 'controller', to: 'config-agent', label: 'serves config' },
  { from: 'telemetry-agent', to: 'ledger', label: 'submits metrics' },
  { from: 'config-agent', to: 'dzd', label: 'applies' },
  { from: 'telemetry-agent', to: 'dzd', label: 'measures' },
  { from: 'daemon', to: 'dzd', label: 'connects' },
]

export function SoftwareStack() {
  const [hovered, setHovered] = useState<string | null>(null)

  const getCenter = (id: string) => {
    const c = components.find((comp) => comp.id === id)!
    return { x: c.x + c.width / 2, y: c.y + c.height / 2 }
  }

  const hoveredComponent = components.find((c) => c.id === hovered)

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="text-xs font-mono text-zinc-500 mb-3">
        Hover over a component to see its role
      </div>

      <svg viewBox="0 0 700 400" className="w-full h-auto">
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#52525b" />
          </marker>
        </defs>

        {arrows.map((arrow, i) => {
          const from = getCenter(arrow.from)
          const to = getCenter(arrow.to)
          const related = hovered === arrow.from || hovered === arrow.to
          return (
            <g key={i}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={related ? '#71717a' : '#3f3f46'}
                strokeWidth={related ? 1.5 : 1}
                markerEnd="url(#arrowhead)"
              />
              {arrow.label && (
                <text
                  x={(from.x + to.x) / 2 + 8}
                  y={(from.y + to.y) / 2 - 6}
                  className="fill-zinc-600"
                  style={{ fontSize: '8px', fontFamily: 'monospace' }}
                >
                  {arrow.label}
                </text>
              )}
            </g>
          )
        })}

        {components.map((comp) => {
          const isActive = hovered === comp.id
          return (
            <motion.g
              key={comp.id}
              onMouseEnter={() => setHovered(comp.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <rect
                x={comp.x}
                y={comp.y}
                width={comp.width}
                height={comp.height}
                rx={8}
                fill={isActive ? comp.color + '22' : '#18181b'}
                stroke={comp.color}
                strokeWidth={isActive ? 2 : 1}
              />
              <text
                x={comp.x + comp.width / 2}
                y={comp.y + comp.height / 2 + 4}
                textAnchor="middle"
                fill={comp.color}
                style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'monospace' }}
              >
                {comp.label}
              </text>
            </motion.g>
          )
        })}
      </svg>

      <div className="h-16 flex items-center justify-center">
        {hoveredComponent ? (
          <motion.p
            key={hoveredComponent.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-zinc-400 text-center max-w-lg"
          >
            <span className="font-semibold text-zinc-200">{hoveredComponent.label}:</span>{' '}
            {hoveredComponent.description}
          </motion.p>
        ) : (
          <p className="text-sm text-zinc-600 text-center">
            Interactive architecture diagram
          </p>
        )}
      </div>
    </div>
  )
}
