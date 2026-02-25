'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { DisputeFilters } from '@/components/disputes/DisputeFilters'
import { EmptyState } from '@/components/shared/EmptyState'
import { AlertCircle, Download, ArrowUpDown, Clock } from 'lucide-react'
import { formatDistanceToNow, differenceInDays, format } from 'date-fns'
import { motion } from 'framer-motion'
import { btnPrimary, btnSecondary } from '@/lib/styles'

const mockDisputes = [
  { id: 'cb_01', processorDisputeId: 'DIS-2891', currency: 'USD', amount: 340, processor: 'STRIPE', reasonCategory: 'UNAUTHORIZED', status: 'WON', country: 'SG', customerEmail: 'john@example.com', chargebackDate: new Date(Date.now() - 1000*60*60*24*2), evidenceDeadline: new Date(Date.now() + 1000*60*60*24*18) },
  { id: 'cb_02', processorDisputeId: 'XEN-4421', currency: 'SGD', amount: 89, processor: 'XENDIT', reasonCategory: 'PRODUCT_NOT_RECEIVED', status: 'DETECTED', country: 'SG', customerEmail: 'maria@test.com', chargebackDate: new Date(Date.now() - 1000*60*60*5), evidenceDeadline: new Date(Date.now() + 1000*60*60*24*25) },
  { id: 'cb_03', processorDisputeId: 'PM-9981', currency: 'PHP', amount: 4500, processor: 'PAYMONGO', reasonCategory: 'FRIENDLY_FRAUD', status: 'SUBMITTED', country: 'PH', customerEmail: 'juan@mail.ph', chargebackDate: new Date(Date.now() - 1000*60*60*24), evidenceDeadline: new Date(Date.now() + 1000*60*60*24*6) },
  { id: 'cb_04', processorDisputeId: 'MDT-1123', currency: 'IDR', amount: 850000, processor: 'MIDTRANS', reasonCategory: 'UNAUTHORIZED', status: 'WON', country: 'ID', customerEmail: 'budi@gmail.com', chargebackDate: new Date(Date.now() - 1000*60*60*36), evidenceDeadline: new Date(Date.now() + 1000*60*60*24*15) },
  { id: 'cb_05', processorDisputeId: 'IP8-7723', currency: 'MYR', amount: 230, processor: 'IPAY88', reasonCategory: 'ITEM_NOT_AS_DESCRIBED', status: 'REVIEW_NEEDED', country: 'MY', customerEmail: 'ali@mail.my', chargebackDate: new Date(Date.now() - 1000*60*60*48), evidenceDeadline: new Date(Date.now() + 1000*60*60*24*2) },
  { id: 'cb_06', processorDisputeId: 'S2P-0028', currency: 'THB', amount: 1200, processor: 'TWOC2P', reasonCategory: 'GENERAL', status: 'LOST', country: 'TH', customerEmail: 'somchai@example.co.th', chargebackDate: new Date(Date.now() - 1000*60*60*72), evidenceDeadline: new Date(Date.now() - 1000*60*60*24*2) },
  { id: 'cb_07', processorDisputeId: 'XEN-5500', currency: 'IDR', amount: 1200000, processor: 'XENDIT', reasonCategory: 'PRODUCT_NOT_RECEIVED', status: 'DRAFT', country: 'ID', customerEmail: 'sari@mail.id', chargebackDate: new Date(Date.now() - 1000*60*60*12), evidenceDeadline: new Date(Date.now() + 1000*60*60*24*10) },
  { id: 'cb_08', processorDisputeId: 'STR-8812', currency: 'USD', amount: 520, processor: 'STRIPE', reasonCategory: 'SUBSCRIPTION_CANCELLED', status: 'SUBMITTED', country: 'SG', customerEmail: 'rachel@company.com', chargebackDate: new Date(Date.now() - 1000*60*60*24*3), evidenceDeadline: new Date(Date.now() + 1000*60*60*24*4) },
]

function DeadlinePill({ deadline }: { deadline: Date }) {
  const days = differenceInDays(deadline, new Date())

  if (days < 0) {
    return (
      <span className="font-mono text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--expired-bg)', color: 'var(--expired)', border: '1px solid var(--expired-border)' }}>
        Expired
      </span>
    )
  }
  if (days < 3) {
    return (
      <span className="font-mono text-xs px-2 py-0.5 rounded-full flex items-center gap-1 w-fit" style={{ background: 'var(--lost-bg)', color: 'var(--lost)', border: '1px solid var(--lost-border)' }}>
        <span className="w-1.5 h-1.5 rounded-full pulse-dot inline-block" style={{ background: 'var(--lost)' }} />
        ⚡ {days}d URGENT
      </span>
    )
  }
  if (days < 7) {
    return (
      <span className="font-mono text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--pending-bg)', color: 'var(--pending)', border: '1px solid var(--pending-border)' }}>
        ⚠️ {days}d
      </span>
    )
  }
  return (
    <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
      {format(deadline, 'MMM d')}
    </span>
  )
}

export default function DisputesPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('ALL')
  const [processor, setProcessor] = useState('ALL')
  const [selected, setSelected] = useState<string[]>([])

  const filtered = mockDisputes.filter(d => {
    const matchSearch = search === '' || d.processorDisputeId.toLowerCase().includes(search.toLowerCase()) || d.customerEmail?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = status === 'ALL' || d.status === status
    const matchProcessor = processor === 'ALL' || d.processor === processor
    return matchSearch && matchStatus && matchProcessor
  })

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-[700] text-[24px]" style={{ color: 'var(--text-primary)' }}>
            Disputes
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {filtered.length} disputes found
          </p>
        </div>
        <button
          className={btnSecondary}
          onClick={() => window.location.href = '/api/export?format=csv'}
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      <DisputeFilters
        search={search} setSearch={setSearch}
        status={status} setStatus={setStatus}
        processor={processor} setProcessor={setProcessor}
      />

      {/* Bulk action bar */}
      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 rounded-[10px] border"
          style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}
        >
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            {selected.length} selected
          </span>
          <button className={btnPrimary} style={{ padding: '6px 16px', fontSize: 13 }}>Submit Selected</button>
          <button className={btnSecondary} style={{ padding: '6px 16px', fontSize: 13 }}>Export</button>
          <button onClick={() => setSelected([])} className="text-xs" style={{ color: 'var(--text-muted)' }}>Clear</button>
        </motion.div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={AlertCircle}
          title="No disputes found"
          description="That's great news! When chargebacks arrive, we handle them automatically."
        />
      ) : (
        <div
          className="w-full overflow-hidden rounded-[14px] border"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: 'var(--bg-secondary)' }}>
                  <th className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)', width: 40 }}>
                    <input type="checkbox" onChange={e => setSelected(e.target.checked ? filtered.map(d => d.id) : [])} />
                  </th>
                  {['Dispute ID', 'Amount', 'Customer', 'Processor', 'Status', 'Deadline', 'Date'].map(h => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[11px] uppercase tracking-widest font-medium whitespace-nowrap"
                      style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}
                    >
                      <span className="flex items-center gap-1">
                        {h} <ArrowUpDown size={10} />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((d, i) => (
                  <tr
                    key={d.id}
                    className="cursor-pointer transition-all"
                    style={{ background: i % 2 === 0 ? 'var(--bg-card)' : 'rgba(15,28,46,0.6)' }}
                    onClick={() => router.push(`/disputes/${d.id}`)}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'var(--bg-card)' : 'rgba(15,28,46,0.6)')}
                  >
                    <td className="px-4 py-3.5" style={{ borderBottom: '1px solid var(--border-subtle)' }} onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selected.includes(d.id)}
                        onChange={() => toggleSelect(d.id)}
                      />
                    </td>
                    <td className="px-4 py-3.5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        {d.processorDisputeId}
                      </span>
                    </td>
                    <td className="px-4 py-3.5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <span className="font-mono text-sm font-medium" style={{ color: 'var(--green-400)' }}>
                        {d.currency} {d.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3.5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {d.customerEmail}
                      </span>
                    </td>
                    <td className="px-4 py-3.5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                        {d.processor}
                      </span>
                    </td>
                    <td className="px-4 py-3.5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <StatusBadge status={d.status} />
                    </td>
                    <td className="px-4 py-3.5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <DeadlinePill deadline={d.evidenceDeadline} />
                    </td>
                    <td className="px-4 py-3.5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {formatDistanceToNow(d.chargebackDate, { addSuffix: true })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            className="flex items-center justify-between px-4 py-3 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Showing {filtered.length} of {mockDisputes.length} disputes
            </span>
            <div className="flex gap-2">
              {[1, 2, 3].map(p => (
                <button
                  key={p}
                  className="w-7 h-7 rounded-[6px] text-xs font-medium transition-all"
                  style={{
                    background: p === 1 ? 'var(--green-500)' : 'var(--bg-card)',
                    color: p === 1 ? 'var(--text-inverse)' : 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
