import type { ReactNode } from 'react'
import { Info, AlertTriangle, Zap } from 'lucide-react'

const variants = {
  info: {
    icon: Info,
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
    iconColor: 'text-cyan-400',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/5',
    iconColor: 'text-amber-400',
  },
  key: {
    icon: Zap,
    border: 'border-green-500/20',
    bg: 'bg-green-500/5',
    iconColor: 'text-green-400',
  },
}

interface InfoBoxProps {
  variant?: keyof typeof variants
  title?: string
  children: ReactNode
}

export function InfoBox({ variant = 'info', title, children }: InfoBoxProps) {
  const v = variants[variant]
  const Icon = v.icon

  return (
    <div className={`rounded-lg border ${v.border} ${v.bg} p-5`}>
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${v.iconColor}`} />
        <div>
          {title && <p className="font-semibold mb-1">{title}</p>}
          <div className="text-sm text-zinc-400 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}
