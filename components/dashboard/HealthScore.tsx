'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const score = 78

function getScoreColor(s: number) {
  if (s >= 70) return 'var(--won)'
  if (s >= 40) return 'var(--pending)'
  return 'var(--lost)'
}

function getScoreLabel(s: number) {
  if (s >= 80) return 'Excellent'
  if (s >= 60) return 'Good'
  if (s >= 40) return 'Needs Attention'
  return 'Critical'
}

const breakdown = [
  { label: 'Win Rate', value: 67, max: 100, color: 'var(--chart-green)' },
  { label: 'Response Time', value: 85, max: 100, color: 'var(--chart-blue)' },
  { label: 'Evidence Quality', value: 72, max: 100, color: 'var(--chart-purple)' },
  { label: 'Dispute Rate', value: 88, max: 100, color: 'var(--chart-amber)' },
]

const circumference = 2 * Math.PI * 45
const dashOffset = circumference - (score / 100) * circumference

export function HealthScore() {
  const [expanded, setExpanded] = useState(false)
  const color = getScoreColor(score)

  return (
    <div
      className="rounded-[14px] border p-5"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-[600] text-[16px]" style={{ color: 'var(--text-primary)' }}>
          Dispute Health Score
        </h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 rounded-[6px]"
          style={{ color: 'var(--text-muted)' }}
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      <div className="flex items-center gap-6">
        {/* Ring */}
        <div className="relative w-28 h-28 shrink-0">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full -rotate-90"
          >
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="var(--border)"
              strokeWidth="8"
            />
            <motion.circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="font-display font-[800] text-[24px] leading-none"
              style={{ color: 'var(--text-primary)' }}
            >
              {score}
            </span>
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>/100</span>
          </div>
        </div>

        <div>
          <p
            className="font-semibold text-base"
            style={{ color }}
          >
            {getScoreLabel(score)}
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Better than 78% of merchants in your region
          </p>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 space-y-3 overflow-hidden"
          >
            {breakdown.map(item => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {item.label}
                  </span>
                  <span className="font-mono text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                    {item.value}%
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full"
                  style={{ background: 'var(--bg-secondary)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
