'use client'

import Link from 'next/link'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ArrowRight } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const mockDisputes = [
  { id: 'cb_01', processorDisputeId: 'DIS-2891', currency: 'USD', amount: 340, processor: 'STRIPE', reasonCategory: 'UNAUTHORIZED', status: 'WON', chargebackDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
  { id: 'cb_02', processorDisputeId: 'XEN-4421', currency: 'SGD', amount: 89, processor: 'XENDIT', reasonCategory: 'PRODUCT_NOT_RECEIVED', status: 'DETECTED', chargebackDate: new Date(Date.now() - 1000 * 60 * 60 * 5) },
  { id: 'cb_03', processorDisputeId: 'PM-9981', currency: 'PHP', amount: 4500, processor: 'PAYMONGO', reasonCategory: 'FRIENDLY_FRAUD', status: 'SUBMITTED', chargebackDate: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: 'cb_04', processorDisputeId: 'MDT-1123', currency: 'IDR', amount: 850000, processor: 'MIDTRANS', reasonCategory: 'UNAUTHORIZED', status: 'WON', chargebackDate: new Date(Date.now() - 1000 * 60 * 60 * 36) },
  { id: 'cb_05', processorDisputeId: 'IP8-7723', currency: 'MYR', amount: 230, processor: 'IPAY88', reasonCategory: 'ITEM_NOT_AS_DESCRIBED', status: 'REVIEW_NEEDED', chargebackDate: new Date(Date.now() - 1000 * 60 * 60 * 48) },
  { id: 'cb_06', processorDisputeId: 'S2P-0028', currency: 'THB', amount: 1200, processor: '2C2P', reasonCategory: 'GENERAL', status: 'LOST', chargebackDate: new Date(Date.now() - 1000 * 60 * 60 * 72) },
]

export function RecentDisputes() {
  return (
    <div
      className="rounded-[14px] border overflow-hidden"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <h3 className="font-display font-[600] text-[16px]" style={{ color: 'var(--text-primary)' }}>
          Recent Disputes
        </h3>
        <Link
          href="/disputes"
          className="text-xs flex items-center gap-1 transition-colors"
          style={{ color: 'var(--text-accent)' }}
        >
          View all <ArrowRight size={11} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ background: 'var(--bg-secondary)' }}>
              {['ID', 'Amount', 'Processor', 'Status', 'Date'].map(h => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-[11px] uppercase tracking-widest font-medium"
                  style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockDisputes.map((d, i) => (
              <tr
                key={d.id}
                className="cursor-pointer transition-all"
                style={{
                  background: i % 2 === 0 ? 'var(--bg-card)' : 'rgba(15,28,46,0.6)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'var(--bg-card)' : 'rgba(15,28,46,0.6)')}
              >
                <td className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    {d.processorDisputeId}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <span className="font-mono text-sm font-medium" style={{ color: 'var(--green-400)' }}>
                    {d.currency} {d.amount.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {d.processor}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <StatusBadge status={d.status} />
                </td>
                <td className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {formatDistanceToNow(d.chargebackDate, { addSuffix: true })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
