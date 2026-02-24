'use client'

import { useState } from 'react'
import { Copy, Gift, Users, TrendingUp, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { btnPrimary, inputBase } from '@/lib/styles'

const REFERRAL_CODE = 'MERCHANT-X72K'
const REFERRAL_URL = `https://chargebackasia.com/signup?ref=${REFERRAL_CODE}`

const mockReferrals = [
  { id: '1', email: 'shop@tokobagus.id', status: 'converted', earnings: 340, date: new Date(Date.now() - 1000*60*60*24*12) },
  { id: '2', email: 'payments@digitalstore.sg', status: 'converted', earnings: 180, date: new Date(Date.now() - 1000*60*60*24*8) },
  { id: '3', email: 'merchant@lazada.ph', status: 'pending', earnings: 0, date: new Date(Date.now() - 1000*60*60*24*3) },
  { id: '4', email: 'billing@techshop.my', status: 'pending', earnings: 0, date: new Date(Date.now() - 1000*60*60*24*1) },
]

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(REFERRAL_URL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const totalEarnings = mockReferrals.reduce((sum, r) => sum + r.earnings, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-[700] text-[24px]" style={{ color: 'var(--text-primary)' }}>
          Referral Program
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          Earn 5% of recovered amounts from merchants you refer — for 12 months
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Earnings', value: totalEarnings, prefix: '$', icon: TrendingUp, color: 'var(--green-500)' },
          { label: 'Referrals', value: mockReferrals.length, prefix: '', icon: Users, color: 'var(--chart-blue)' },
          { label: 'Converted', value: mockReferrals.filter(r => r.status === 'converted').length, prefix: '', icon: CheckCircle, color: 'var(--chart-purple)' },
        ].map(s => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              className="rounded-[14px] border p-5"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon size={16} style={{ color: s.color }} />
                <span className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
              </div>
              <p className="font-mono font-[700] text-[28px]" style={{ color: 'var(--text-primary)' }}>
                {s.prefix}<CountUp end={s.value} duration={1.5} enableScrollSpy />
              </p>
            </div>
          )
        })}
      </div>

      {/* Referral Link */}
      <div
        className="rounded-[14px] border p-6"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--green-500)', boxShadow: 'var(--shadow-green)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Gift size={18} style={{ color: 'var(--green-500)' }} />
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Your Referral Link</h3>
        </div>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          Share this link with merchants. They get 15% off their first month. You earn 5% of their recovered amounts for 12 months.
        </p>
        <div className="flex gap-2">
          <input
            readOnly
            value={REFERRAL_URL}
            className={inputBase}
            style={{ flex: 1 }}
          />
          <button className={btnPrimary} onClick={handleCopy}>
            <Copy size={14} />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* How it works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { step: '1', title: 'Share your link', desc: 'Send it to merchants you know who are dealing with chargebacks' },
          { step: '2', title: 'They sign up', desc: 'They get 15% off their first month\'s fees as a welcome bonus' },
          { step: '3', title: 'You earn 5%', desc: 'Earn 5% of their recovered dispute amounts for 12 full months' },
        ].map(s => (
          <div
            key={s.step}
            className="rounded-[14px] border p-5 text-center"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div
              className="w-8 h-8 rounded-full font-mono font-[700] flex items-center justify-center mx-auto mb-3"
              style={{ background: 'var(--green-glow)', color: 'var(--green-500)', border: '1px solid var(--green-500)' }}
            >
              {s.step}
            </div>
            <h4 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>{s.title}</h4>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Referrals Table */}
      <div className="rounded-[14px] border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Your Referrals</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              {['Email', 'Status', 'Earnings', 'Date'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[11px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockReferrals.map((r, i) => (
              <tr key={r.id} style={{ background: i % 2 === 0 ? 'var(--bg-card)' : 'rgba(15,28,46,0.6)' }}>
                <td className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{r.email}</span>
                </td>
                <td className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: r.status === 'converted' ? 'var(--won-bg)' : 'var(--pending-bg)',
                      color: r.status === 'converted' ? 'var(--won)' : 'var(--pending)',
                      border: `1px solid ${r.status === 'converted' ? 'var(--won-border)' : 'var(--pending-border)'}`,
                    }}
                  >
                    {r.status === 'converted' ? 'Converted' : 'Invited'}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <span className="font-mono text-sm" style={{ color: r.earnings > 0 ? 'var(--green-400)' : 'var(--text-muted)' }}>
                    {r.earnings > 0 ? `$${r.earnings}` : '—'}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {r.date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
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
