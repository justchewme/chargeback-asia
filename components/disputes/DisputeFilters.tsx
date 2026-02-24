'use client'

import { Search, Filter, X } from 'lucide-react'
import { inputBase } from '@/lib/styles'

interface DisputeFiltersProps {
  search: string
  setSearch: (v: string) => void
  status: string
  setStatus: (v: string) => void
  processor: string
  setProcessor: (v: string) => void
}

const statuses = ['ALL', 'DETECTED', 'DRAFT', 'REVIEW_NEEDED', 'SUBMITTED', 'WON', 'LOST', 'EXPIRED']
const processors = ['ALL', 'XENDIT', 'MIDTRANS', 'STRIPE', 'PAYMONGO', 'IPAY88', 'TWOC2P']

export function DisputeFilters({
  search, setSearch, status, setStatus, processor, setProcessor
}: DisputeFiltersProps) {
  const hasFilters = status !== 'ALL' || processor !== 'ALL' || search !== ''

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search disputes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={inputBase}
          style={{ paddingLeft: 36, width: 220 }}
        />
      </div>

      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className={inputBase}
        style={{ width: 'auto' }}
      >
        {statuses.map(s => (
          <option key={s} value={s}>{s === 'ALL' ? 'All Statuses' : s}</option>
        ))}
      </select>

      <select
        value={processor}
        onChange={e => setProcessor(e.target.value)}
        className={inputBase}
        style={{ width: 'auto' }}
      >
        {processors.map(p => (
          <option key={p} value={p}>{p === 'ALL' ? 'All Processors' : p}</option>
        ))}
      </select>

      {hasFilters && (
        <button
          onClick={() => { setSearch(''); setStatus('ALL'); setProcessor('ALL') }}
          className="flex items-center gap-1 text-xs px-3 py-2 rounded-[8px] transition-all"
          style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
        >
          <X size={12} /> Clear
        </button>
      )}
    </div>
  )
}
