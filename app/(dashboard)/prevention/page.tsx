'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, TrendingDown, CheckCircle, Zap, ArrowRight, Info } from 'lucide-react'

const riskPatterns = [
  {
    id: 1,
    pattern: 'High-value orders from new accounts',
    risk: 'HIGH',
    count: 12,
    suggestion: 'Require 3DS authentication for orders over $200 from accounts less than 7 days old.',
    impact: '-34% friendly fraud',
  },
  {
    id: 2,
    pattern: 'Multiple orders same day, different cards',
    risk: 'HIGH',
    count: 8,
    suggestion: 'Flag and manually review orders where 3+ transactions occur within 2 hours from same device.',
    impact: '-28% friendly fraud',
  },
  {
    id: 3,
    pattern: 'Shipping address ≠ billing country',
    risk: 'MEDIUM',
    count: 23,
    suggestion: 'Send order confirmation with explicit delivery address. Collect signed delivery confirmation.',
    impact: '-19% PRODUCT_NOT_RECEIVED disputes',
  },
  {
    id: 4,
    pattern: 'No email engagement post-purchase',
    risk: 'MEDIUM',
    count: 17,
    suggestion: 'Auto-send "Order confirmed" + "Shipped" + "Delivered" emails. Unopened = higher risk.',
    impact: '-15% UNRECOGNIZED_CHARGE disputes',
  },
  {
    id: 5,
    pattern: 'Digital goods delivered instantly',
    risk: 'LOW',
    count: 31,
    suggestion: 'Add download fingerprinting: log IP, device, timestamp on every download. Store for 18 months.',
    impact: '-22% unauthorized claim disputes',
  },
]

const alerts = [
  {
    id: 1,
    type: 'warning',
    title: 'Unusual purchase pattern detected',
    body: 'Customer john.doe@example.com placed 3 orders in 4 hours using 2 different cards. Historical dispute rate: 67%.',
    time: '12 min ago',
    action: 'Pause & review',
  },
  {
    id: 2,
    type: 'warning',
    title: 'High-risk country + high-value order',
    body: 'Order #CH-8821 ($480) ships to PH with card registered in SG. Mismatch flag.',
    time: '1 hr ago',
    action: 'Require 3DS',
  },
  {
    id: 3,
    type: 'info',
    title: 'Seasonal spike pattern',
    body: 'Chargebacks typically rise 34% in the 30 days after 11.11 and 12.12 sales. Pre-collect delivery evidence now.',
    time: '2 hrs ago',
    action: 'Set reminder',
  },
]

const riskColor: Record<string, string> = {
  HIGH: 'var(--lost)',
  MEDIUM: 'var(--pending)',
  LOW: 'var(--chart-blue)',
}

const riskBg: Record<string, string> = {
  HIGH: 'var(--lost-bg)',
  MEDIUM: 'var(--pending-bg)',
  LOW: 'rgba(77,158,255,0.10)',
}

const riskBorder: Record<string, string> = {
  HIGH: 'var(--lost-border)',
  MEDIUM: 'var(--pending-border)',
  LOW: 'rgba(77,158,255,0.25)',
}

export default function PreventionPage() {
  const [dismissed, setDismissed] = useState<number[]>([])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-[700] text-[24px]" style={{ color: 'var(--text-primary)' }}>
            Dispute Prevention AI
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            AI-detected patterns in your order data that correlate with chargebacks
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: 'var(--won-bg)', border: '1px solid var(--won-border)', color: 'var(--won)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: 'var(--won)' }} />
          Live monitoring
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Risk patterns found', value: '5', icon: Shield, color: 'var(--chart-purple)' },
          { label: 'Preventable disputes/mo', value: '~11', icon: TrendingDown, color: 'var(--won)' },
          { label: 'Potential savings/mo', value: '$3,200', icon: Zap, color: 'var(--chart-amber)' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-[14px] border p-5 flex items-center gap-4"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="w-10 h-10 rounded-[10px] flex items-center justify-center" style={{ background: `rgba(0,0,0,0.2)` }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
              <p className="font-mono font-[700] text-[20px]" style={{ color: 'var(--text-primary)' }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Live Alerts */}
      <div className="rounded-[14px] border p-5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={15} style={{ color: 'var(--pending)' }} />
          <h3 className="font-display font-[600] text-[16px]" style={{ color: 'var(--text-primary)' }}>Live Pre-Dispute Alerts</h3>
          <span
            className="text-[11px] px-2 py-0.5 rounded-full font-medium ml-1"
            style={{ background: 'var(--pending-bg)', border: '1px solid var(--pending-border)', color: 'var(--pending)' }}
          >
            {alerts.filter(a => !dismissed.includes(a.id)).length} active
          </span>
        </div>
        <div className="space-y-3">
          {alerts.filter(a => !dismissed.includes(a.id)).map(alert => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-start gap-3 p-4 rounded-[10px]"
              style={{
                background: alert.type === 'warning' ? 'var(--pending-bg)' : 'rgba(77,158,255,0.07)',
                border: `1px solid ${alert.type === 'warning' ? 'var(--pending-border)' : 'rgba(77,158,255,0.2)'}`,
              }}
            >
              {alert.type === 'warning'
                ? <AlertTriangle size={15} style={{ color: 'var(--pending)', flexShrink: 0, marginTop: 2 }} />
                : <Info size={15} style={{ color: 'var(--chart-blue)', flexShrink: 0, marginTop: 2 }} />
              }
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{alert.title}</p>
                  <span className="text-[11px] shrink-0" style={{ color: 'var(--text-muted)' }}>{alert.time}</span>
                </div>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{alert.body}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="text-xs font-medium px-2.5 py-1 rounded-[6px] flex items-center gap-1"
                    style={{ background: 'var(--green-500)', color: 'var(--text-inverse)' }}
                  >
                    {alert.action} <ArrowRight size={10} />
                  </button>
                  <button
                    onClick={() => setDismissed(d => [...d, alert.id])}
                    className="text-xs px-2 py-1 rounded-[6px]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {dismissed.length === alerts.length && (
            <div className="text-center py-6">
              <CheckCircle size={24} style={{ color: 'var(--won)', margin: '0 auto 8px' }} />
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>All alerts cleared</p>
            </div>
          )}
        </div>
      </div>

      {/* Risk Patterns */}
      <div className="rounded-[14px] border p-5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Shield size={15} style={{ color: 'var(--chart-purple)' }} />
          <h3 className="font-display font-[600] text-[16px]" style={{ color: 'var(--text-primary)' }}>
            Detected Risk Patterns
          </h3>
        </div>
        <div className="space-y-3">
          {riskPatterns.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-[10px] p-4"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: riskBg[p.risk],
                        border: `1px solid ${riskBorder[p.risk]}`,
                        color: riskColor[p.risk],
                      }}
                    >
                      {p.risk} RISK
                    </span>
                    <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      {p.count} orders match
                    </span>
                  </div>
                  <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{p.pattern}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p.suggestion}</p>
                </div>
                <div
                  className="text-[11px] font-medium px-2.5 py-1 rounded-full shrink-0"
                  style={{ background: 'var(--won-bg)', border: '1px solid var(--won-border)', color: 'var(--won)' }}
                >
                  {p.impact}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
