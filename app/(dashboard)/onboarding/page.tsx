'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Building2, Plug, Upload, Rocket } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { btnPrimary, btnSecondary, inputBase, labelBase } from '@/lib/styles'
import dynamic from 'next/dynamic'

const ReactConfetti = dynamic(() => import('canvas-confetti').then(m => {
  // We'll trigger it manually
  return { default: () => null }
}), { ssr: false })

const STEPS = [
  { id: 1, label: 'Business Info', icon: Building2 },
  { id: 2, label: 'Connect Processor', icon: Plug },
  { id: 3, label: 'Import Past Disputes', icon: Upload },
  { id: 4, label: 'Ready!', icon: Rocket },
]

const PROCESSORS = ['XENDIT', 'MIDTRANS', 'STRIPE', 'PAYMONGO', 'IPAY88', '2C2P']
const COUNTRIES = ['SG', 'ID', 'MY', 'PH', 'TH', 'VN']

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [businessName, setBusinessName] = useState('')
  const [country, setCountry] = useState('SG')
  const [website, setWebsite] = useState('')
  const [processor, setProcessor] = useState('STRIPE')
  const [confettiFired, setConfettiFired] = useState(false)

  useEffect(() => {
    if (step === 4 && !confettiFired) {
      setConfettiFired(true)
      import('canvas-confetti').then(confetti => {
        confetti.default({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.4 },
          colors: ['#00E676', '#4D9EFF', '#B47EFF', '#FFAA00'],
        })
      })
    }
  }, [step, confettiFired])

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="font-display font-[800] text-[24px]" style={{ color: 'var(--text-primary)' }}>ChargeBack</span>
          <span className="font-display font-[800] text-[24px]" style={{ color: 'var(--green-500)' }}>.asia</span>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            const done = step > s.id
            const active = step === s.id
            return (
              <div key={s.id} className="flex items-center" style={{ flex: 1 }}>
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: done ? 'var(--green-500)' : active ? 'var(--green-glow)' : 'var(--bg-card)',
                      border: `2px solid ${done || active ? 'var(--green-500)' : 'var(--border)'}`,
                      color: done ? 'var(--text-inverse)' : active ? 'var(--green-500)' : 'var(--text-muted)',
                    }}
                  >
                    {done ? <CheckCircle size={14} /> : <Icon size={14} />}
                  </div>
                  <span className="text-[10px] font-medium whitespace-nowrap" style={{ color: active ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="h-px flex-1 mx-1 mb-4 transition-all duration-300"
                    style={{ background: step > s.id ? 'var(--green-500)' : 'var(--border)' }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="rounded-[20px] border p-8"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h2 className="font-display font-[700] text-[22px]" style={{ color: 'var(--text-primary)' }}>
                    Tell us about your business
                  </h2>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                    This helps us tailor dispute letters to your business
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className={labelBase}>Business Name</label>
                    <input
                      className={inputBase}
                      placeholder="Acme Store Pte Ltd"
                      value={businessName}
                      onChange={e => setBusinessName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelBase}>Country</label>
                    <select className={inputBase} value={country} onChange={e => setCountry(e.target.value)}>
                      {[['SG','🇸🇬 Singapore'],['ID','🇮🇩 Indonesia'],['MY','🇲🇾 Malaysia'],['PH','🇵🇭 Philippines'],['TH','🇹🇭 Thailand'],['VN','🇻🇳 Vietnam']].map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelBase}>Website (optional)</label>
                    <input
                      className={inputBase}
                      placeholder="https://yourstore.com"
                      value={website}
                      onChange={e => setWebsite(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  className={btnPrimary}
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setStep(2)}
                  disabled={!businessName}
                >
                  Continue →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="font-display font-[700] text-[22px]" style={{ color: 'var(--text-primary)' }}>
                    Connect a payment processor
                  </h2>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                    We'll automatically detect chargebacks from day one
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {PROCESSORS.map(p => (
                    <button
                      key={p}
                      onClick={() => setProcessor(p)}
                      className="p-3 rounded-[10px] border text-sm font-medium text-left transition-all"
                      style={{
                        background: processor === p ? 'var(--green-glow)' : 'var(--bg-secondary)',
                        borderColor: processor === p ? 'var(--green-500)' : 'var(--border)',
                        color: processor === p ? 'var(--green-500)' : 'var(--text-secondary)',
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button className={btnSecondary} onClick={() => setStep(1)}>Back</button>
                  <button className={btnPrimary} style={{ flex: 1, justifyContent: 'center' }} onClick={() => setStep(3)}>
                    Connect {processor} →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h2 className="font-display font-[700] text-[22px]" style={{ color: 'var(--text-primary)' }}>
                    Import past disputes
                  </h2>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                    We'll check if any are still within the appeal window
                  </p>
                </div>
                <div
                  className="border-2 border-dashed rounded-[14px] p-8 text-center cursor-pointer transition-all"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
                >
                  <Upload size={28} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    Drop your CSV file here
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    Or click to browse · CSV format
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className={btnSecondary} onClick={() => setStep(2)}>Back</button>
                  <button className={btnSecondary} style={{ flex: 1, justifyContent: 'center' }} onClick={() => setStep(4)}>
                    Skip for now
                  </button>
                  <button className={btnPrimary} onClick={() => setStep(4)}>
                    Import
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center space-y-5 py-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                  style={{ background: 'var(--won-bg)', border: '2px solid var(--won)' }}
                >
                  <Rocket size={36} style={{ color: 'var(--won)' }} />
                </motion.div>
                <h2 className="font-display font-[800] text-[26px]" style={{ color: 'var(--text-primary)' }}>
                  You're all set! 🎉
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  ChargeBack.asia is now monitoring your transactions. When chargebacks arrive, we'll fight them automatically.
                </p>
                <div
                  className="rounded-[14px] p-4 text-sm text-left"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--won-border)' }}
                >
                  <p className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>What happens next:</p>
                  {[
                    'Chargebacks are auto-detected via webhook',
                    'AI compiles evidence and writes dispute letter',
                    'Letter submitted automatically (or 1-click)',
                    'You pay 20% only when you win',
                  ].map((item, i) => (
                    <p key={i} className="flex items-center gap-2 mt-1" style={{ color: 'var(--text-secondary)' }}>
                      <CheckCircle size={12} style={{ color: 'var(--green-500)' }} />
                      {item}
                    </p>
                  ))}
                </div>
                <button
                  className={btnPrimary}
                  style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                  onClick={() => router.push('/dashboard')}
                >
                  Go to Dashboard →
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
