'use client'

import { AlertCircle, CheckCircle, FileText, Send, XCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const activities = [
  {
    id: '1',
    type: 'won',
    icon: CheckCircle,
    color: 'var(--won)',
    bg: 'var(--won-bg)',
    title: 'Dispute Won',
    detail: 'USD 340 recovered — Stripe',
    time: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: '2',
    type: 'detected',
    icon: AlertCircle,
    color: 'var(--pending)',
    bg: 'var(--pending-bg)',
    title: 'Chargeback Detected',
    detail: 'SGD 89 via Xendit',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: '3',
    type: 'letter',
    icon: FileText,
    color: 'var(--draft)',
    bg: 'var(--draft-bg)',
    title: 'Letter Generated',
    detail: 'PHP 4,500 — PayMongo',
    time: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  {
    id: '4',
    type: 'submitted',
    icon: Send,
    color: 'var(--submitted)',
    bg: 'var(--submitted-bg)',
    title: 'Dispute Submitted',
    detail: 'MYR 230 — iPay88',
    time: new Date(Date.now() - 1000 * 60 * 60 * 7),
  },
  {
    id: '5',
    type: 'won',
    icon: CheckCircle,
    color: 'var(--won)',
    bg: 'var(--won-bg)',
    title: 'Dispute Won',
    detail: 'IDR 850,000 recovered — Midtrans',
    time: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    id: '6',
    type: 'lost',
    icon: XCircle,
    color: 'var(--lost)',
    bg: 'var(--lost-bg)',
    title: 'Dispute Lost',
    detail: 'THB 1,200 — 2C2P',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
]

export function ActivityFeed() {
  return (
    <div
      className="rounded-[14px] border p-5"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-[600] text-[16px]" style={{ color: 'var(--text-primary)' }}>
          Activity
        </h3>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Live</span>
      </div>

      <div className="space-y-0">
        {activities.map((item, i) => {
          const Icon = item.icon
          return (
            <div
              key={item.id}
              className="flex gap-3 items-start py-3"
              style={{
                borderBottom: i < activities.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                background: item.type === 'won' ? 'rgba(0,230,118,0.03)' : 'transparent',
              }}
            >
              <div
                className="p-1.5 rounded-[8px] mt-0.5 shrink-0"
                style={{ background: item.bg, color: item.color }}
              >
                <Icon size={13} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {item.detail}
                </p>
              </div>
              <span className="text-[11px] shrink-0" style={{ color: 'var(--text-muted)' }}>
                {formatDistanceToNow(item.time, { addSuffix: true })}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
