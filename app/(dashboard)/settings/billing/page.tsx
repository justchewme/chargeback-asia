'use client'

import { useState } from 'react'
import { CreditCard, Check, Zap, Shield, BarChart3, ArrowUpRight, AlertTriangle } from 'lucide-react'
import { btnPrimary, btnSecondary } from '@/lib/styles'

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    priceUnit: '/mo',
    description: 'For merchants just getting started',
    current: false,
    features: [
      'Up to 10 disputes/month',
      'AI letter generation',
      'CSV export',
      'Email support',
    ],
    cta: 'Downgrade',
    highlight: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 99,
    priceUnit: '/mo',
    description: 'For growing merchants with regular disputes',
    current: true,
    features: [
      'Up to 100 disputes/month',
      'AI letter generation',
      'Auto-submission',
      'Multi-language letters',
      'Benchmarking data',
      'Priority email support',
    ],
    cta: 'Current Plan',
    highlight: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    price: 299,
    priceUnit: '/mo',
    description: 'For high-volume merchants and teams',
    current: false,
    features: [
      'Unlimited disputes',
      'Everything in Growth',
      'Prevention AI',
      'API access',
      'Team seats (up to 10)',
      'Dedicated account manager',
      'WhatsApp alerts',
      'Custom integrations',
    ],
    cta: 'Upgrade',
    highlight: false,
  },
]

const invoices = [
  { id: 'INV-2026-02', date: '2026-02-01', amount: 99, status: 'Paid', period: 'Feb 2026' },
  { id: 'INV-2026-01', date: '2026-01-01', amount: 99, status: 'Paid', period: 'Jan 2026' },
  { id: 'INV-2025-12', date: '2025-12-01', amount: 99, status: 'Paid', period: 'Dec 2025' },
  { id: 'INV-2025-11', date: '2025-11-01', amount: 99, status: 'Paid', period: 'Nov 2025' },
]

export default function BillingPage() {
  const [annual, setAnnual] = useState(false)

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display font-[700] text-[24px]" style={{ color: 'var(--text-primary)' }}>
          Billing & Plan
        </h1>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-[10px] text-sm"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <span style={{ color: annual ? 'var(--text-muted)' : 'var(--text-primary)' }}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className="relative w-10 h-5 rounded-full transition-all duration-200"
            style={{ background: annual ? 'var(--green-500)' : 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          >
            <span
              className="absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200"
              style={{ background: 'white', left: annual ? '22px' : '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
            />
          </button>
          <span style={{ color: annual ? 'var(--text-primary)' : 'var(--text-muted)' }}>
            Annual
            <span
              className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded font-bold"
              style={{ background: 'var(--won-bg)', color: 'var(--won)' }}
            >
              -20%
            </span>
          </span>
        </div>
      </div>

      {/* Current usage */}
      <section
        className="rounded-[14px] border p-5"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Usage This Month</h3>
          <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Resets Mar 1, 2026</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Disputes', used: 47, limit: 100, icon: AlertTriangle },
            { label: 'Letters Generated', used: 43, limit: 100, icon: Zap },
            { label: 'Auto-Submissions', used: 31, limit: 100, icon: Shield },
          ].map(({ label, used, limit, icon: Icon }) => (
            <div key={label}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <Icon size={12} />
                  {label}
                </span>
                <span className="text-[12px] font-medium" style={{ color: 'var(--text-primary)' }}>
                  {used}/{limit}
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(used / limit) * 100}%`,
                    background: used / limit > 0.8 ? 'var(--pending)' : 'var(--green-500)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <div className="grid grid-cols-3 gap-4">
        {plans.map(plan => (
          <div
            key={plan.id}
            className="rounded-[16px] border p-5 flex flex-col"
            style={{
              background: plan.highlight ? 'var(--bg-elevated)' : 'var(--bg-card)',
              borderColor: plan.highlight ? 'var(--green-500)' : 'var(--border)',
              boxShadow: plan.highlight ? 'var(--shadow-green)' : 'none',
            }}
          >
            {plan.highlight && (
              <span
                className="self-start text-[10px] px-2 py-0.5 rounded-full font-bold mb-3"
                style={{ background: 'var(--green-500)', color: 'var(--text-inverse)' }}
              >
                CURRENT PLAN
              </span>
            )}
            <h3 className="font-display font-[700] text-[18px]" style={{ color: 'var(--text-primary)' }}>
              {plan.name}
            </h3>
            <p className="text-[12px] mt-0.5 mb-4" style={{ color: 'var(--text-secondary)' }}>
              {plan.description}
            </p>
            <div className="flex items-baseline gap-1 mb-5">
              <span className="font-display font-[800] text-[32px]" style={{ color: 'var(--text-primary)' }}>
                ${annual ? Math.round(plan.price * 0.8) : plan.price}
              </span>
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>/mo</span>
              {annual && plan.price > 0 && (
                <span className="text-[11px] ml-1" style={{ color: 'var(--green-500)' }}>
                  billed annually
                </span>
              )}
            </div>
            <ul className="space-y-2 flex-1 mb-5">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                  <Check size={13} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--green-500)' }} />
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={plan.highlight ? btnPrimary : btnSecondary}
              style={plan.highlight ? { opacity: 0.7, cursor: 'default', width: '100%', justifyContent: 'center' } : { width: '100%', justifyContent: 'center' }}
              disabled={plan.current}
            >
              {plan.cta}
              {!plan.current && <ArrowUpRight size={14} />}
            </button>
          </div>
        ))}
      </div>

      {/* Payment method */}
      <section
        className="rounded-[14px] border p-5"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
      >
        <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Payment Method</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-7 rounded-[6px] flex items-center justify-center"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
            >
              <CreditCard size={14} style={{ color: 'var(--text-muted)' }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Visa ending in 4242</p>
              <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>Expires 08/2028</p>
            </div>
          </div>
          <button className={btnSecondary}>Update Card</button>
        </div>
      </section>

      {/* Invoices */}
      <section
        className="rounded-[14px] border overflow-hidden"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Invoice History</h3>
          <div className="flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--text-muted)' }}>
            <BarChart3 size={13} />
            Total paid: $396
          </div>
        </div>
        <div>
          {invoices.map((inv, i) => (
            <div
              key={inv.id}
              className="px-5 py-3.5 flex items-center justify-between"
              style={{
                borderBottom: i < invoices.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                background: 'var(--bg-card)',
              }}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-[12px]" style={{ color: 'var(--text-muted)' }}>{inv.id}</span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{inv.period}</span>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className="text-[11px] px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--won-bg)', color: 'var(--won)', border: '1px solid var(--won-border)' }}
                >
                  {inv.status}
                </span>
                <span className="font-mono text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  ${inv.amount}
                </span>
                <button className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Danger zone */}
      <section
        className="rounded-[14px] border p-5"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--lost-border)' }}
      >
        <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--lost)' }}>Danger Zone</h3>
        <p className="text-[13px] mb-4" style={{ color: 'var(--text-muted)' }}>
          Cancelling your subscription will downgrade you to the free Starter plan at the end of your billing period.
        </p>
        <button
          className="text-sm px-4 py-2 rounded-[8px] font-medium transition-all"
          style={{
            background: 'var(--lost-bg)',
            color: 'var(--lost)',
            border: '1px solid var(--lost-border)',
          }}
        >
          Cancel Subscription
        </button>
      </section>
    </div>
  )
}
