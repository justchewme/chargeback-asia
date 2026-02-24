'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Plug, X, ExternalLink, Copy } from 'lucide-react'
import { btnPrimary, btnSecondary, btnDanger, inputBase, labelBase, cardBase } from '@/lib/styles'

const PROCESSORS = [
  {
    id: 'XENDIT',
    name: 'Xendit',
    description: 'Payment gateway for Indonesia, Philippines, Thailand, Vietnam',
    countries: ['🇮🇩', '🇵🇭', '🇹🇭', '🇻🇳'],
    color: '#0066CC',
    connected: true,
    disputeCount: 14,
    docsUrl: 'https://docs.xendit.co',
  },
  {
    id: 'MIDTRANS',
    name: 'Midtrans',
    description: 'Leading payment gateway in Indonesia',
    countries: ['🇮🇩'],
    color: '#0073E6',
    connected: false,
    disputeCount: 0,
    docsUrl: 'https://docs.midtrans.com',
  },
  {
    id: 'STRIPE',
    name: 'Stripe',
    description: 'Global payment processor available across SEA',
    countries: ['🇸🇬', '🇲🇾', '🇵🇭', '🇹🇭'],
    color: '#635BFF',
    connected: true,
    disputeCount: 9,
    docsUrl: 'https://docs.stripe.com',
  },
  {
    id: 'PAYMONGO',
    name: 'PayMongo',
    description: 'Philippine payment gateway',
    countries: ['🇵🇭'],
    color: '#0066FF',
    connected: false,
    disputeCount: 0,
    docsUrl: 'https://developers.paymongo.com',
  },
  {
    id: 'IPAY88',
    name: 'iPay88',
    description: 'Leading payment gateway in Malaysia',
    countries: ['🇲🇾', '🇮🇩', '🇵🇭', '🇹🇭'],
    color: '#E63329',
    connected: false,
    disputeCount: 0,
    docsUrl: 'https://www.ipay88.com',
  },
  {
    id: 'TWOC2P',
    name: '2C2P',
    description: 'Southeast Asia payment infrastructure',
    countries: ['🇹🇭', '🇸🇬', '🇲🇾', '🇮🇩', '🇻🇳'],
    color: '#FF6B00',
    connected: false,
    disputeCount: 0,
    docsUrl: 'https://developer.2c2p.com',
  },
]

interface ConnectModalProps {
  processor: typeof PROCESSORS[0]
  onClose: () => void
}

function ConnectModal({ processor, onClose }: ConnectModalProps) {
  const [step, setStep] = useState<'instructions' | 'credentials' | 'success'>('instructions')
  const [apiKey, setApiKey] = useState('')
  const [webhookSecret, setWebhookSecret] = useState('')
  const webhookUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://chargebackasia.com'}/api/webhooks/${processor.id.toLowerCase()}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md rounded-[20px] p-6 z-10"
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-[8px]" style={{ color: 'var(--text-muted)' }}>
          <X size={16} />
        </button>

        <h2 className="font-display font-[700] text-[20px] mb-1" style={{ color: 'var(--text-primary)' }}>
          Connect {processor.name}
        </h2>
        <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
          {processor.countries.join(' ')} · {processor.description}
        </p>

        {/* Steps indicator */}
        <div className="flex gap-2 mb-6">
          {(['instructions', 'credentials', 'success'] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
                style={{
                  background: step === s ? 'var(--green-500)' : i < ['instructions','credentials','success'].indexOf(step) ? 'var(--won-bg)' : 'var(--bg-card)',
                  color: step === s ? 'var(--text-inverse)' : 'var(--text-muted)',
                  border: `1px solid ${step === s ? 'var(--green-500)' : 'var(--border)'}`,
                }}
              >
                {i < ['instructions','credentials','success'].indexOf(step) ? '✓' : i+1}
              </div>
              {i < 2 && <div className="w-8 h-px" style={{ background: 'var(--border)' }} />}
            </div>
          ))}
        </div>

        {step === 'instructions' && (
          <div className="space-y-4">
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Setup Instructions</p>
            <ol className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li className="flex gap-2">
                <span className="font-mono text-[11px] mt-0.5 shrink-0" style={{ color: 'var(--green-500)' }}>1.</span>
                Log in to your {processor.name} dashboard
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[11px] mt-0.5 shrink-0" style={{ color: 'var(--green-500)' }}>2.</span>
                Go to Settings → API Keys → Generate a new API key with dispute management permissions
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[11px] mt-0.5 shrink-0" style={{ color: 'var(--green-500)' }}>3.</span>
                In Webhooks settings, add this URL:
                <button
                  className="font-mono text-[11px] px-2 py-1 rounded-[6px] flex items-center gap-1"
                  style={{ background: 'var(--bg-card)', color: 'var(--text-accent)', border: '1px solid var(--border)' }}
                  onClick={() => navigator.clipboard.writeText(webhookUrl)}
                >
                  <Copy size={10} /> Copy webhook URL
                </button>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[11px] mt-0.5 shrink-0" style={{ color: 'var(--green-500)' }}>4.</span>
                Copy the webhook secret and paste it below
              </li>
            </ol>
            <a
              href={processor.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs flex items-center gap-1"
              style={{ color: 'var(--text-accent)' }}
            >
              View {processor.name} docs <ExternalLink size={11} />
            </a>
            <button className={btnPrimary} style={{ width: '100%', justifyContent: 'center' }} onClick={() => setStep('credentials')}>
              Continue →
            </button>
          </div>
        )}

        {step === 'credentials' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className={labelBase}>API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder={`${processor.id.toLowerCase()}_sk_...`}
                className={inputBase}
              />
            </div>
            <div className="space-y-1.5">
              <label className={labelBase}>Webhook Secret</label>
              <input
                type="password"
                value={webhookSecret}
                onChange={e => setWebhookSecret(e.target.value)}
                placeholder="whsec_..."
                className={inputBase}
              />
            </div>
            <div className="flex gap-2">
              <button className={btnSecondary} onClick={() => setStep('instructions')}>Back</button>
              <button
                className={btnPrimary}
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => setStep('success')}
                disabled={!apiKey}
              >
                Connect {processor.name}
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-4 space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
              style={{ background: 'var(--won-bg)', border: '2px solid var(--won)' }}
            >
              <CheckCircle size={28} style={{ color: 'var(--won)' }} />
            </motion.div>
            <h3 className="font-display font-[700] text-[18px]" style={{ color: 'var(--text-primary)' }}>
              Connected!
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {processor.name} is now connected. We'll automatically detect chargebacks and start fighting them.
            </p>
            <button className={btnPrimary} style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default function IntegrationsPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const selectedProcessor = PROCESSORS.find(p => p.id === activeModal)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-[700] text-[24px]" style={{ color: 'var(--text-primary)' }}>
          Integrations
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          Connect your payment processors to auto-detect chargebacks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROCESSORS.map(p => (
          <motion.div
            key={p.id}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.15 }}
            className="rounded-[14px] border p-5 flex flex-col gap-4"
            style={{
              background: 'var(--bg-card)',
              borderColor: p.connected ? 'rgba(0,230,118,0.3)' : 'var(--border)',
              boxShadow: p.connected ? 'var(--shadow-green)' : 'none',
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-[10px] flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: p.color }}
                >
                  {p.name.slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{p.name}</h3>
                  <div className="flex gap-0.5 mt-0.5">{p.countries.map((f,i) => <span key={i} className="text-sm">{f}</span>)}</div>
                </div>
              </div>
              {p.connected
                ? <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'var(--won-bg)', color: 'var(--won)', border: '1px solid var(--won-border)' }}>
                    <CheckCircle size={10} /> Connected
                  </span>
                : <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                    Not connected
                  </span>
              }
            </div>

            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {p.description}
            </p>

            {p.connected && p.disputeCount > 0 && (
              <div
                className="flex items-center justify-between text-xs rounded-[8px] px-3 py-2"
                style={{ background: 'var(--bg-secondary)' }}
              >
                <span style={{ color: 'var(--text-muted)' }}>Disputes detected</span>
                <span className="font-mono font-medium" style={{ color: 'var(--green-400)' }}>{p.disputeCount}</span>
              </div>
            )}

            {p.connected
              ? <button className={btnDanger} style={{ width: '100%', justifyContent: 'center', padding: '8px' }}>
                  Disconnect
                </button>
              : <button
                  className={btnPrimary}
                  style={{ width: '100%', justifyContent: 'center', padding: '8px' }}
                  onClick={() => setActiveModal(p.id)}
                >
                  <Plug size={13} /> Connect
                </button>
            }
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProcessor && (
          <ConnectModal
            processor={selectedProcessor}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
