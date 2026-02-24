'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn, btnPrimary } from '@/lib/styles'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex flex-col items-center justify-center py-20 px-8 text-center',
        className
      )}
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-5 p-4 rounded-2xl"
        style={{ background: 'var(--bg-card)' }}
      >
        <Icon size={40} style={{ color: 'var(--text-muted)' }} />
      </motion.div>
      <h3
        className="text-lg font-semibold mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h3>
      <p
        className="text-sm max-w-sm leading-relaxed mb-6"
        style={{ color: 'var(--text-secondary)' }}
      >
        {description}
      </p>
      {action && (
        <button className={btnPrimary} onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </motion.div>
  )
}
