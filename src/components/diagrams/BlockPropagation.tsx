import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface StageInfo {
  label: string
  description: string
  color: string
}

const stages: StageInfo[] = [
  { label: 'Block produced', description: 'Leader splits block into shreds', color: '#a78bfa' },
  { label: 'Enters DZ mesh', description: 'Shreds flow via GRE tunnel to Edge DZD', color: '#22d3ee' },
  { label: 'Edge filtering', description: 'Duplicates & malformed packets dropped', color: '#34d399' },
  { label: 'Routed via mesh', description: 'Shreds cross WAN links and DZX exchanges', color: '#3b82f6' },
  { label: 'Delivered', description: 'Validators receive clean shreds', color: '#f59e0b' },
  { label: 'Votes return', description: 'Consensus votes propagate back through mesh', color: '#22c55e' },
]

export function BlockPropagation() {
  const [activeStage, setActiveStage] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const interval = setInterval(() => {
      setActiveStage((s) => (s + 1) % stages.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [playing])

  const stage = stages[activeStage]

  const shredVisible = activeStage >= 1
  const filteredVisible = activeStage >= 2
  const meshVisible = activeStage >= 3
  const deliveredVisible = activeStage >= 4
  const votesVisible = activeStage >= 5

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: stage.color }} />
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
            Block Propagation
          </span>
        </div>
        <button
          onClick={() => setPlaying(!playing)}
          className="px-2.5 py-1 rounded-md border border-zinc-700 text-xs font-mono text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
        >
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>

      <svg viewBox="0 0 800 340" className="w-full h-auto">
        {/* Leader */}
        <g>
          <motion.rect
            x={30} y={130} width={80} height={50} rx={10}
            fill={activeStage === 0 ? '#a78bfa22' : '#18181b'}
            stroke="#a78bfa"
            strokeWidth={activeStage === 0 ? 2.5 : 1.5}
          />
          <text x={70} y={160} textAnchor="middle" fill="#a78bfa" style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'monospace' }}>
            LEADER
          </text>
          <text x={70} y={200} textAnchor="middle" fill="#71717a" style={{ fontSize: '9px', fontFamily: 'monospace' }}>
            Slot Producer
          </text>
        </g>

        {/* Shreds arrow: Leader → DZD-A */}
        <motion.line
          x1={110} y1={155} x2={195} y2={155}
          stroke="#a78bfa" strokeWidth={1.5}
          strokeOpacity={shredVisible ? 0.7 : 0.15}
          markerEnd="url(#arrow-violet)"
        />
        {shredVisible && (
          <motion.circle r={4} fill="#a78bfa"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0], cx: [115, 150, 180, 190], cy: [155, 155, 155, 155] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        {shredVisible && (
          <text x={152} y={143} textAnchor="middle" fill="#a78bfa" opacity={0.5} style={{ fontSize: '8px', fontFamily: 'monospace' }}>
            shreds
          </text>
        )}

        {/* DZD-A (Edge) */}
        <g>
          <motion.rect
            x={200} y={120} width={90} height={70} rx={10}
            fill={activeStage === 1 || activeStage === 2 ? '#22d3ee15' : '#18181b'}
            stroke="#22d3ee"
            strokeWidth={activeStage === 1 || activeStage === 2 ? 2.5 : 1.5}
          />
          <text x={245} y={150} textAnchor="middle" fill="#22d3ee" style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'monospace' }}>
            DZD
          </text>
          <text x={245} y={165} textAnchor="middle" fill="#22d3ee" opacity={0.5} style={{ fontSize: '8px', fontFamily: 'monospace' }}>
            Edge NYC
          </text>
          {/* Filter icon indicator */}
          {filteredVisible && activeStage === 2 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <text x={245} y={180} textAnchor="middle" fill="#34d399" style={{ fontSize: '8px', fontFamily: 'monospace' }}>
                filtering...
              </text>
            </motion.g>
          )}
        </g>

        {/* Dropped packets */}
        {activeStage === 2 && (
          <motion.g initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0, 0.8, 0], y: [0, 25] }} transition={{ duration: 2, repeat: Infinity }}>
            <text x={245} y={210} textAnchor="middle" fill="#ef4444" style={{ fontSize: '8px', fontFamily: 'monospace' }}>
              DUP DUP BAD
            </text>
            <text x={245} y={222} textAnchor="middle" fill="#ef4444" opacity={0.5} style={{ fontSize: '7px', fontFamily: 'monospace' }}>
              dropped
            </text>
          </motion.g>
        )}

        {/* Mesh arrow: DZD-A → DZX */}
        <motion.line
          x1={290} y1={155} x2={385} y2={155}
          stroke="#3b82f6" strokeWidth={1.5}
          strokeOpacity={meshVisible ? 0.7 : 0.15}
          markerEnd="url(#arrow-blue)"
        />
        {meshVisible && (
          <motion.circle r={4} fill="#3b82f6"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0], cx: [295, 330, 365, 380], cy: [155, 155, 155, 155] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}
        {meshVisible && (
          <text x={338} y={143} textAnchor="middle" fill="#3b82f6" opacity={0.5} style={{ fontSize: '8px', fontFamily: 'monospace' }}>
            WAN link
          </text>
        )}

        {/* DZX */}
        <g>
          <motion.circle
            cx={420} cy={155} r={30}
            fill={activeStage === 3 ? '#3b82f615' : '#18181b'}
            stroke="#3b82f6"
            strokeWidth={activeStage === 3 ? 2.5 : 1.5}
          />
          <text x={420} y={152} textAnchor="middle" fill="#3b82f6" style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'monospace' }}>
            DZX
          </text>
          <text x={420} y={164} textAnchor="middle" fill="#3b82f6" opacity={0.5} style={{ fontSize: '7px', fontFamily: 'monospace' }}>
            Exchange
          </text>
        </g>

        {/* Mesh arrow: DZX → DZD-B */}
        <motion.line
          x1={450} y1={155} x2={535} y2={155}
          stroke="#3b82f6" strokeWidth={1.5}
          strokeOpacity={meshVisible ? 0.7 : 0.15}
          markerEnd="url(#arrow-blue)"
        />

        {/* DZD-B (Edge) */}
        <g>
          <motion.rect
            x={540} y={120} width={90} height={70} rx={10}
            fill={activeStage === 4 ? '#f59e0b15' : '#18181b'}
            stroke="#22d3ee"
            strokeWidth={activeStage === 4 ? 2.5 : 1.5}
          />
          <text x={585} y={150} textAnchor="middle" fill="#22d3ee" style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'monospace' }}>
            DZD
          </text>
          <text x={585} y={165} textAnchor="middle" fill="#22d3ee" opacity={0.5} style={{ fontSize: '8px', fontFamily: 'monospace' }}>
            Edge LON
          </text>
        </g>

        {/* Fan-out to validators */}
        <motion.line x1={630} y1={140} x2={700} y2={75} stroke="#f59e0b" strokeWidth={1.5} strokeOpacity={deliveredVisible ? 0.6 : 0.12} markerEnd="url(#arrow-amber)" />
        <motion.line x1={630} y1={155} x2={700} y2={155} stroke="#f59e0b" strokeWidth={1.5} strokeOpacity={deliveredVisible ? 0.6 : 0.12} markerEnd="url(#arrow-amber)" />
        <motion.line x1={630} y1={170} x2={700} y2={235} stroke="#f59e0b" strokeWidth={1.5} strokeOpacity={deliveredVisible ? 0.6 : 0.12} markerEnd="url(#arrow-amber)" />

        {deliveredVisible && (
          <text x={670} y={130} textAnchor="middle" fill="#f59e0b" opacity={0.4} style={{ fontSize: '7px', fontFamily: 'monospace' }}>
            shreds
          </text>
        )}

        {/* Validator A */}
        <motion.rect
          x={705} y={50} width={75} height={46} rx={8}
          fill={deliveredVisible ? '#a78bfa15' : '#18181b'}
          stroke="#a78bfa" strokeWidth={deliveredVisible ? 2 : 1.2}
        />
        <text x={742} y={76} textAnchor="middle" fill="#a78bfa" style={{ fontSize: '9px', fontWeight: 600, fontFamily: 'monospace' }}>
          VAL A
        </text>

        {/* Validator B */}
        <motion.rect
          x={705} y={132} width={75} height={46} rx={8}
          fill={deliveredVisible ? '#a78bfa15' : '#18181b'}
          stroke="#a78bfa" strokeWidth={deliveredVisible ? 2 : 1.2}
        />
        <text x={742} y={158} textAnchor="middle" fill="#a78bfa" style={{ fontSize: '9px', fontWeight: 600, fontFamily: 'monospace' }}>
          VAL B
        </text>

        {/* Validator C */}
        <motion.rect
          x={705} y={214} width={75} height={46} rx={8}
          fill={deliveredVisible ? '#a78bfa15' : '#18181b'}
          stroke="#a78bfa" strokeWidth={deliveredVisible ? 2 : 1.2}
        />
        <text x={742} y={240} textAnchor="middle" fill="#a78bfa" style={{ fontSize: '9px', fontWeight: 600, fontFamily: 'monospace' }}>
          VAL C
        </text>

        {/* Votes return — dashed green lines going back */}
        {votesVisible && (
          <>
            <motion.line x1={705} y1={82} x2={115} y2={168} stroke="#22c55e" strokeWidth={1} strokeDasharray="5 3"
              initial={{ strokeOpacity: 0 }} animate={{ strokeOpacity: [0, 0.5, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.line x1={705} y1={164} x2={115} y2={162} stroke="#22c55e" strokeWidth={1} strokeDasharray="5 3"
              initial={{ strokeOpacity: 0 }} animate={{ strokeOpacity: [0, 0.5, 0.3] }} transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
            />
            <motion.line x1={705} y1={246} x2={115} y2={172} stroke="#22c55e" strokeWidth={1} strokeDasharray="5 3"
              initial={{ strokeOpacity: 0 }} animate={{ strokeOpacity: [0, 0.5, 0.3] }} transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
            />
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 0.7, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }}>
              <text x={400} y={280} textAnchor="middle" fill="#22c55e" style={{ fontSize: '9px', fontFamily: 'monospace' }}>
                ← VOTES (Tower BFT)
              </text>
            </motion.g>
          </>
        )}

        {/* Arrow markers */}
        <defs>
          <marker id="arrow-violet" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#a78bfa" />
          </marker>
          <marker id="arrow-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
          </marker>
          <marker id="arrow-amber" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>

      {/* Stage indicator */}
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex gap-1.5">
          {stages.map((s, i) => (
            <button
              key={i}
              onClick={() => { setActiveStage(i); setPlaying(false) }}
              className="flex-1 h-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === activeStage ? s.color : '#27272a',
                opacity: i <= activeStage ? 1 : 0.4,
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold" style={{ color: stage.color }}>
              {activeStage + 1}. {stage.label}
            </p>
            <p className="text-xs text-zinc-500">{stage.description}</p>
          </div>
          <span className="font-mono text-[10px] text-zinc-600">
            {activeStage + 1}/{stages.length}
          </span>
        </div>
      </div>
    </div>
  )
}
