'use client'

import { useState } from 'react'
import { Bell, Mail, MessageCircle, Smartphone, Save, Zap, AlertTriangle, Trophy, CreditCard } from 'lucide-react'
import { btnPrimary, labelBase, inputBase } from '@/lib/styles'

type NotifChannel = 'email' | 'whatsapp' | 'sms'
type NotifEvent = {
  id: string
  label: string
  description: string
  icon: React.ElementType
  email: boolean
  whatsapp: boolean
  sms: boolean
}

const defaultEvents: NotifEvent[] = [
  {
    id: 'dispute_received',
    label: 'New Dispute Received',
    description: 'Notify when a new chargeback is detected on any connected processor',
    icon: AlertTriangle,
    email: true,
    whatsapp: true,
    sms: false,
  },
  {
    id: 'dispute_won',
    label: 'Dispute Won',
    description: 'Celebrate every win — get notified when a dispute is resolved in your favour',
    icon: Trophy,
    email: true,
    whatsapp: true,
    sms: false,
  },
  {
    id: 'dispute_lost',
    label: 'Dispute Lost',
    description: 'Know immediately when a dispute is decided against you',
    icon: AlertTriangle,
    email: true,
    whatsapp: false,
    sms: false,
  },
  {
    id: 'deadline_warning',
    label: 'Deadline Warning (48h)',
    description: 'Alert when a dispute evidence deadline is within 48 hours',
    icon: Zap,
    email: true,
    whatsapp: true,
    sms: true,
  },
  {
    id: 'deadline_critical',
    label: 'Deadline Critical (6h)',
    description: 'Urgent alert when a deadline is within 6 hours and evidence has not been submitted',
    icon: Zap,
    email: true,
    whatsapp: true,
    sms: true,
  },
  {
    id: 'high_value',
    label: 'High-Value Dispute',
    description: 'Separate alert for disputes above your configured threshold',
    icon: CreditCard,
    email: true,
    whatsapp: true,
    sms: false,
  },
  {
    id: 'weekly_summary',
    label: 'Weekly Summary Report',
    description: 'Every Monday: win rate, disputes handled, revenue recovered last week',
    icon: Bell,
    email: true,
    whatsapp: false,
    sms: false,
  },
  {
    id: 'monthly_report',
    label: 'Monthly Performance Report',
    description: 'Full monthly analytics: trends, benchmarks, recommendations',
    icon: Bell,
    email: true,
    whatsapp: false,
    sms: false,
  },
]

const channels: { id: NotifChannel; label: string; icon: React.ElementType }[] = [
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'sms', label: 'SMS', icon: Smartphone },
]

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="relative w-9 h-5 rounded-full transition-all duration-200 flex-shrink-0"
      style={{ background: on ? 'var(--green-500)' : 'var(--bg-secondary)', border: '1px solid var(--border)' }}
    >
      <span
        className="absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200"
        style={{ background: 'white', left: on ? '19px' : '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
      />
    </button>
  )
}

export default function NotificationsPage() {
  const [events, setEvents] = useState(defaultEvents)
  const [email, setEmail] = useState('admin@acmestore.sg')
  const [whatsapp, setWhatsapp] = useState('+65 9123 4567')
  const [phone, setPhone] = useState('+65 9123 4567')
  const [highValueThreshold, setHighValueThreshold] = useState('500')
  const [saved, setSaved] = useState(false)

  const toggle = (id: string, channel: NotifChannel) => {
    setEvents(prev =>
      prev.map(e => e.id === id ? { ...e, [channel]: !e[channel as keyof NotifEvent] } : e)
    )
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const activeChannels = {
    email: true,
    whatsapp: whatsapp.length > 5,
    sms: phone.length > 5,
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="font-display font-[700] text-[24px]" style={{ color: 'var(--text-primary)' }}>
        Notification Settings
      </h1>

      {/* Channel configuration */}
      <section
        className="rounded-[14px] border p-5 space-y-5"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
      >
        <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Notification Channels</h3>

        {/* Email */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Mail size={14} style={{ color: 'var(--text-muted)' }} />
            <label className={labelBase}>Email Address</label>
          </div>
          <input
            className={inputBase}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </div>

        {/* WhatsApp */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MessageCircle size={14} style={{ color: 'var(--text-muted)' }} />
            <label className={labelBase}>
              WhatsApp Number
              <span
                className="ml-2 text-[10px] px-1.5 py-0.5 rounded font-bold"
                style={{ background: 'var(--pending-bg)', color: 'var(--pending)' }}
              >
                SEA
              </span>
            </label>
          </div>
          <input
            className={inputBase}
            type="tel"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            placeholder="+62 812 345 6789"
          />
          <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
            Supports Indonesia (+62), Philippines (+63), Singapore (+65), Malaysia (+60), Thailand (+66)
          </p>
        </div>

        {/* SMS */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Smartphone size={14} style={{ color: 'var(--text-muted)' }} />
            <label className={labelBase}>SMS Number</label>
          </div>
          <input
            className={inputBase}
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+65 9123 4567"
          />
        </div>

        {/* High value threshold */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CreditCard size={14} style={{ color: 'var(--text-muted)' }} />
            <label className={labelBase}>High-Value Dispute Threshold (USD)</label>
          </div>
          <input
            className={inputBase}
            type="number"
            value={highValueThreshold}
            onChange={e => setHighValueThreshold(e.target.value)}
            placeholder="500"
            style={{ maxWidth: '160px' }}
          />
        </div>
      </section>

      {/* Notification matrix */}
      <section
        className="rounded-[14px] border overflow-hidden"
        style={{ borderColor: 'var(--border)' }}
      >
        {/* Header row */}
        <div
          className="grid px-5 py-3"
          style={{
            gridTemplateColumns: '1fr repeat(3, 80px)',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span className="text-[11px] uppercase tracking-widest font-medium" style={{ color: 'var(--text-muted)' }}>
            Event
          </span>
          {channels.map(ch => (
            <div key={ch.id} className="flex flex-col items-center gap-1">
              <ch.icon size={13} style={{ color: activeChannels[ch.id] ? 'var(--text-secondary)' : 'var(--text-muted)' }} />
              <span
                className="text-[11px] uppercase tracking-widest font-medium"
                style={{ color: activeChannels[ch.id] ? 'var(--text-secondary)' : 'var(--text-muted)' }}
              >
                {ch.label}
              </span>
            </div>
          ))}
        </div>

        {/* Event rows */}
        {events.map((event, i) => {
          const Icon = event.icon
          return (
            <div
              key={event.id}
              className="grid px-5 py-4 items-center"
              style={{
                gridTemplateColumns: '1fr repeat(3, 80px)',
                background: 'var(--bg-card)',
                borderBottom: i < events.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <div className="flex items-start gap-2.5 pr-4">
                <Icon size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{event.label}</p>
                  <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{event.description}</p>
                </div>
              </div>
              {channels.map(ch => (
                <div key={ch.id} className="flex justify-center">
                  <Toggle
                    on={event[ch.id as keyof NotifEvent] as boolean}
                    onChange={() => toggle(event.id, ch.id)}
                  />
                </div>
              ))}
            </div>
          )
        })}
      </section>

      <button
        className={btnPrimary}
        onClick={handleSave}
        style={saved ? { background: 'var(--green-600)' } : {}}
      >
        {saved ? <><span>✓</span> Saved!</> : <><Save size={14} /> Save Notification Settings</>}
      </button>
    </div>
  )
}
