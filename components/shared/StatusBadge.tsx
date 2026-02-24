'use client'

import { DisputeStatus } from '@prisma/client'
import { cn } from '@/lib/styles'

type StatusConfig = {
  label: string
  bg: string
  border: string
  text: string
}

const statusConfig: Record<string, StatusConfig> = {
  WON:            { label: 'Won',           bg: 'var(--won-bg)',        border: 'var(--won-border)',        text: 'var(--won)'        },
  LOST:           { label: 'Lost',          bg: 'var(--lost-bg)',       border: 'var(--lost-border)',       text: 'var(--lost)'       },
  PENDING:        { label: 'Pending',       bg: 'var(--pending-bg)',    border: 'var(--pending-border)',    text: 'var(--pending)'    },
  DRAFT:          { label: 'Draft',         bg: 'var(--draft-bg)',      border: 'var(--draft-border)',      text: 'var(--draft)'      },
  SUBMITTED:      { label: 'Submitted',     bg: 'var(--submitted-bg)',  border: 'var(--submitted-border)',  text: 'var(--submitted)'  },
  DETECTED:       { label: 'Detected',      bg: 'var(--pending-bg)',    border: 'var(--pending-border)',    text: 'var(--pending)'    },
  EXPIRED:        { label: 'Expired',       bg: 'var(--expired-bg)',    border: 'var(--expired-border)',    text: 'var(--expired)'    },
  REVIEW_NEEDED:  { label: 'Review Needed', bg: 'var(--pending-bg)',    border: 'var(--pending-border)',    text: 'var(--pending)'    },
  EVIDENCE_COLLECTING: { label: 'Collecting', bg: 'var(--draft-bg)', border: 'var(--draft-border)', text: 'var(--draft)' },
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.PENDING

  return (
    <span
      className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium', className)}
      style={{
        background: config.bg,
        border: `1px solid ${config.border}`,
        color: config.text,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: config.text }}
      />
      {config.label}
    </span>
  )
}
