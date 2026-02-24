'use client'

import { useState } from 'react'
import { Save, Bell, Smartphone, Globe, Shield, Key } from 'lucide-react'
import { btnPrimary, inputBase, labelBase } from '@/lib/styles'

export default function SettingsPage() {
  const [autoSubmit, setAutoSubmit] = useState(true)
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(false)
  const [whatsapp, setWhatsapp] = useState('')
  const [businessName, setBusinessName] = useState('Acme Store Pte Ltd')
  const [website, setWebsite] = useState('https://acmestore.sg')
  const [timezone, setTimezone] = useState('Asia/Singapore')

  const ToggleSwitch = ({ on, setOn }: { on: boolean; setOn: (v: boolean) => void }) => (
    <button
      onClick={() => setOn(!on)}
      className="relative w-10 h-5 rounded-full transition-all duration-200"
      style={{ background: on ? 'var(--green-500)' : 'var(--bg-secondary)', border: '1px solid var(--border)' }}
    >
      <span
        className="absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200"
        style={{
          background: 'white',
          left: on ? '22px' : '2px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
        }}
      />
    </button>
  )

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-display font-[700] text-[24px]" style={{ color: 'var(--text-primary)' }}>Settings</h1>

      {/* Business Info */}
      <section className="rounded-[14px] border p-5 space-y-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Globe size={15} style={{ color: 'var(--text-muted)' }} />
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Business Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelBase}>Business Name</label>
            <input className={inputBase} value={businessName} onChange={e => setBusinessName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className={labelBase}>Website</label>
            <input className={inputBase} value={website} onChange={e => setWebsite(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className={labelBase}>Timezone</label>
            <select className={inputBase} value={timezone} onChange={e => setTimezone(e.target.value)}>
              {['Asia/Singapore','Asia/Jakarta','Asia/Manila','Asia/Kuala_Lumpur','Asia/Bangkok','Asia/Ho_Chi_Minh'].map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Dispute Settings */}
      <section className="rounded-[14px] border p-5 space-y-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Shield size={15} style={{ color: 'var(--text-muted)' }} />
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Dispute Settings</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Auto-submit disputes</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Automatically submit AI-generated letters without review</p>
          </div>
          <ToggleSwitch on={autoSubmit} setOn={setAutoSubmit} />
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-[14px] border p-5 space-y-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Bell size={15} style={{ color: 'var(--text-muted)' }} />
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Notifications</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Email notifications</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Chargebacks detected, won/lost results</p>
            </div>
            <ToggleSwitch on={notifyEmail} setOn={setNotifyEmail} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm font-medium flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                  WhatsApp notifications
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: 'var(--pending-bg)', color: 'var(--pending)' }}>SEA</span>
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Instant alerts via WhatsApp</p>
              </div>
            </div>
            <ToggleSwitch on={notifyWhatsapp} setOn={setNotifyWhatsapp} />
          </div>
          {notifyWhatsapp && (
            <div className="space-y-1.5 ml-0">
              <label className={labelBase}>WhatsApp Number</label>
              <input className={inputBase} placeholder="+65 9123 4567" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
            </div>
          )}
        </div>
      </section>

      {/* API Access */}
      <section className="rounded-[14px] border p-5 space-y-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Key size={15} style={{ color: 'var(--text-muted)' }} />
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>API Access</h3>
        </div>
        <div className="space-y-1.5">
          <label className={labelBase}>API Key</label>
          <div className="flex gap-2">
            <input className={inputBase} type="password" value="cba_live_xxxxxxxxxxxxxxxxxxx" readOnly style={{ flex: 1 }} />
            <button className={btnPrimary} style={{ whiteSpace: 'nowrap' }}>Regenerate</button>
          </div>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Use this key to access the ChargeBack.asia REST API. Keep it secret.
        </p>
      </section>

      <button className={btnPrimary}>
        <Save size={14} /> Save Changes
      </button>
    </div>
  )
}
