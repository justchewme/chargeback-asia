'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'
import CountUp from 'react-countup'
import { cn } from '@/lib/styles'

interface StatCardProps {
  label: string
  value: number | string
  prefix?: string
  suffix?: string
  delta?: number
  deltaLabel?: string
  accentColor?: string
  subLabel?: string
  decimals?: number
  isPercentage?: boolean
  className?: string
}

export function StatCard({
  label,
  value,
  prefix = '',
  suffix = '',
  delta,
  deltaLabel,
  accentColor = 'var(--green-500)',
  subLabel,
  decimals = 0,
  isPercentage = false,
  className,
}: StatCardProps) {
  const isPositive = delta !== undefined && delta > 0
  const isNegative = delta !== undefined && delta < 0
  const isNeutral = delta === undefined || delta === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        'relative overflow-hidden rounded-[14px] border p-5 flex flex-col gap-2',
        className
      )}
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
        borderLeft: `4px solid ${accentColor}`,
      }}
    >
      {/* Background glow */}
      <div
        className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-xl pointer-events-none"
        style={{ background: `${accentColor}08` }}
      />

      <p
        className="text-[11px] font-medium uppercase tracking-widest"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </p>

      <div className="flex items-baseline gap-1">
        {prefix && (
          <span className="font-mono text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
            {prefix}
          </span>
        )}
        <span className="font-display font-[800] text-[28px] leading-none" style={{ color: 'var(--text-primary)' }}>
          {typeof value === 'number' ? (
            <CountUp
              end={value}
              duration={1.8}
              decimals={decimals}
              useEasing
              enableScrollSpy
              scrollSpyDelay={200}
            />
          ) : value}
        </span>
        {(suffix || isPercentage) && (
          <span className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
            {suffix || (isPercentage ? '%' : '')}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {delta !== undefined && (
          <span
            className="flex items-center gap-1 text-xs font-medium"
            style={{
              color: isPositive
                ? 'var(--green-500)'
                : isNegative
                ? 'var(--lost)'
                : 'var(--text-muted)',
            }}
          >
            {isPositive && <ArrowUpRight size={12} />}
            {isNegative && <ArrowDownRight size={12} />}
            {isNeutral && <Minus size={12} />}
            {delta !== undefined && `${isPositive ? '+' : ''}${delta}${isPercentage ? 'pts' : '%'}`}
          </span>
        )}
        {(deltaLabel || subLabel) && (
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {deltaLabel || subLabel}
          </span>
        )}
      </div>
    </motion.div>
  )
}
