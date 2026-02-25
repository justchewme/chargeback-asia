'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, CheckCircle, Phone, Bell, Send, Shield } from 'lucide-react'
import { btnPrimary, btnSecondary, inputBase, labelBase } from '@/lib/styles'

const notificationTypes = [
  { id: 'dispute_detected', label: 'New dispute detected', desc: 'Instant alert when a chargeback is filed', default: true },
  { id: 'letter_ready', label: 'Letter ready for review', desc: 'When AI generates your dispute letter', default: true },
  { id: 'deadline_24h', label: '24-hour deadline warning', desc: 'Before your evidence window closes', default: true },
  { id: 'dispute_won', label: 'Dispute won', desc: 'Celebration message when you win 🎉', default: true },
  { id: 'dispute_lost', label: 'Dispute lost', desc: 'Immediate notification with next steps', default: false },
  { id: 'weekly_summary', label: 'Weekly summary', desc: 'Monday morning performance digest', default: false },
]

const previewMessages = [
  {
    type: 'alert',
    time: '10:24 AM',
    text: '🚨 *New Chargeback Detected*\n\nAmount: USD 248.00\nProcessor: Stripe\nReason: Product Not Received\nDeadline: 7 days\n\n[View & Respond →](https://chargebackasia.com/disputes/CH-0042)',
  },
  {
    type: 'success',
    time: '2:11 PM',
    text: '✅ *Dispute Won!*\n\nDispute CH-0035 has been resolved in your favor.\n\nRecovered: USD 180.00\nTotal recovered this month: USD 12,840\n\n🏆 You\'re in the top 20% of merchants!',
  },
  {
    type: 'warning',
    time: '9:00 AM',
    text: '⚠️ *Deadline in 24 Hours*\n\nDispute CH-0041 (USD 320.00) expires tomorrow.\n\nYour letter is ready — submit now to maximize your chances.\n\n[Submit Now →](https://chargebackasia.com/disputes/CH-0041)',
  },
]

export default function WhatsAppPage() {
  const [enabled, setEnabled] = useState(false)
  const [phone, setPhone] = useState('')
  const [verified, setVerified] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'phone' | 'otp' | 'done'>('phone')
  const [notifications, setNotifications] = useState<Record<string, boolean>>(
    Object.fromEntries(notificationTypes.map(n => [n.id, n.default]))
  )

  const toggleNotification = (id: string) => setNotifications(p => ({ ...p, [id]: !p[id] }))

  const sendOtp = () => {
    if (!phone) return
    setVerifying(true)
    setTimeout(() => {
      setVerifying(false)
      setStep('otp')
    }, 1200)
  }

  const verifyOtp = () => {
    if (otp.length < 4) return
    setVerifying(true)
    setTimeout(() => {
      setVerifying(false)
      setVerified(true)
      setEnabled(true)
      setStep('done')
    }, 1000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display font-[700] text-[24px]" style={{ color: 'var(--text-primary)' }}>
          WhatsApp Notifications
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Get instant dispute alerts on WhatsApp — perfect for mobile-first SEA merchants
        </p>
      </div>

      {/* Status */}
      <div
        className="flex items-center justify-between p-4 rounded-[12px]"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-[10px] flex items-center justify-center"
            style={{ background: enabled ? 'rgba(37,211,102,0.15)' : 'var(--bg-secondary)' }}
          >
            <MessageCircle size={18} style={{ color: enabled ? '#25D366' : 'var(--text-muted)' }} />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              WhatsApp Alerts
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {enabled ? `Connected: ${phone}` : 'Not connected'}
            </p>
          </div>
        </div>
        <div
          onClick={() => verified && setEnabled(e => !e)}
          className="relative w-11 h-6 rounded-full cursor-pointer transition-colors"
          style={{ background: enabled ? '#25D366' : 'var(--bg-secondary)', border: '1px solid var(--border)' }}
        >
          <motion.div
            className="absolute top-0.5 w-5 h-5 rounded-full"
            style={{ background: 'white', boxShadow: 'var(--shadow-sm)' }}
            animate={{ left: enabled ? 22 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </div>
      </div>

      {/* Setup flow */}
      {!verified && (
        <div className="rounded-[14px] border p-5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <h3 className="font-display font-[600] text-[16px] mb-4" style={{ color: 'var(--text-primary)' }}>
            Connect Your WhatsApp
          </h3>

          {step === 'phone' && (
            <div className="space-y-3">
              <div>
                <label className={labelBase}>WhatsApp Number</label>
                <div className="flex gap-2">
                  <div
                    className="flex items-center px-3 rounded-[10px] text-sm"
                    style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                  >
                    <Phone size={13} className="mr-1" />+
                  </div>
                  <input
                    className={`${inputBase} flex-1`}
                    placeholder="62 812 3456 7890"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    type="tel"
                  />
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  Include country code (e.g. 65 for Singapore, 62 for Indonesia)
                </p>
              </div>
              <button onClick={sendOtp} className={btnPrimary} disabled={!phone || verifying}>
                {verifying ? 'Sending code…' : 'Send Verification Code'}
                <Send size={13} className="ml-1.5" />
              </button>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-3">
              <div
                className="flex items-center gap-2 p-3 rounded-[10px] text-xs"
                style={{ background: 'var(--won-bg)', border: '1px solid var(--won-border)', color: 'var(--won)' }}
              >
                <CheckCircle size={13} />
                Verification code sent to +{phone} via WhatsApp
              </div>
              <div>
                <label className={labelBase}>Enter 6-digit Code</label>
                <input
                  className={inputBase}
                  placeholder="123456"
                  maxLength={6}
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              <div className="flex gap-2">
                <button onClick={verifyOtp} className={btnPrimary} disabled={otp.length < 4 || verifying}>
                  {verifying ? 'Verifying…' : 'Verify'}
                </button>
                <button onClick={() => setStep('phone')} className={btnSecondary}>Back</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Notification Preferences */}
      <div className="rounded-[14px] border p-5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Bell size={15} style={{ color: 'var(--chart-amber)' }} />
          <h3 className="font-display font-[600] text-[16px]" style={{ color: 'var(--text-primary)' }}>
            Notification Preferences
          </h3>
        </div>
        <div className="space-y-3">
          {notificationTypes.map(n => (
            <div
              key={n.id}
              className="flex items-center justify-between p-3 rounded-[10px]"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{n.label}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{n.desc}</p>
              </div>
              <div
                onClick={() => toggleNotification(n.id)}
                className="relative w-9 h-5 rounded-full cursor-pointer transition-colors shrink-0"
                style={{ background: notifications[n.id] ? 'var(--green-500)' : 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <motion.div
                  className="absolute top-0.5 w-4 h-4 rounded-full"
                  style={{ background: 'white', boxShadow: 'var(--shadow-sm)' }}
                  animate={{ left: notifications[n.id] ? 16 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Previews */}
      <div className="rounded-[14px] border p-5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle size={15} style={{ color: '#25D366' }} />
          <h3 className="font-display font-[600] text-[16px]" style={{ color: 'var(--text-primary)' }}>
            Message Previews
          </h3>
        </div>
        <div className="space-y-3">
          {previewMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex justify-end"
            >
              <div
                className="rounded-[12px] rounded-tr-sm p-3 text-xs max-w-[80%]"
                style={{
                  background: '#1A4A2E',
                  border: '1px solid rgba(37,211,102,0.2)',
                  color: 'var(--text-secondary)',
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.6,
                }}
              >
                {msg.text}
                <div className="text-right mt-1" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10 }}>
                  {msg.time} ✓✓
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Privacy note */}
      <div
        className="flex items-start gap-2 p-3 rounded-[10px] text-xs"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
      >
        <Shield size={13} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 1 }} />
        <p style={{ color: 'var(--text-muted)' }}>
          Messages are sent via Twilio's WhatsApp Business API. Your number is never shared with third parties.
          You can disconnect at any time by replying STOP to any message.
        </p>
      </div>
    </div>
  )
}
