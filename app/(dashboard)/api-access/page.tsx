'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Key, Copy, Eye, EyeOff, Plus, Trash2, CheckCircle, Terminal, Code2, Globe } from 'lucide-react'
import { btnPrimary, btnSecondary } from '@/lib/styles'

const mockKeys = [
  { id: '1', name: 'Production', key: 'cba_live_sk_a1b2c3d4e5f6789012345678', created: '2025-10-15', lastUsed: '2 min ago', requests: 1240 },
  { id: '2', name: 'Staging', key: 'cba_test_sk_z9y8x7w6v5u4321098765432', created: '2025-11-01', lastUsed: '1 day ago', requests: 87 },
]

const endpoints = [
  { method: 'GET', path: '/v1/disputes', desc: 'List all disputes' },
  { method: 'POST', path: '/v1/disputes', desc: 'Create a dispute manually' },
  { method: 'GET', path: '/v1/disputes/:id', desc: 'Get dispute details' },
  { method: 'POST', path: '/v1/disputes/:id/submit', desc: 'Submit a dispute letter' },
  { method: 'GET', path: '/v1/analytics', desc: 'Get aggregated analytics' },
  { method: 'POST', path: '/v1/webhooks', desc: 'Register a webhook endpoint' },
]

const methodColors: Record<string, string> = {
  GET: 'var(--chart-blue)',
  POST: 'var(--won)',
  DELETE: 'var(--lost)',
  PATCH: 'var(--chart-amber)',
}

const codeExample = `curl -X GET https://api.chargebackasia.com/v1/disputes \\
  -H "Authorization: Bearer cba_live_sk_a1b2..." \\
  -H "Content-Type: application/json"

# Response:
{
  "data": [
    {
      "id": "CH-0042",
      "status": "WON",
      "amount": 248.00,
      "currency": "USD",
      "processor": "STRIPE",
      "created_at": "2026-01-28T10:00:00Z"
    }
  ],
  "pagination": { "total": 38, "page": 1, "per_page": 20 }
}`

export default function ApiAccessPage() {
  const [showKey, setShowKey] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')

  const copyKey = async (id: string, key: string) => {
    await navigator.clipboard.writeText(key)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const maskKey = (key: string) => key.slice(0, 18) + '•'.repeat(20)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-[700] text-[24px]" style={{ color: 'var(--text-primary)' }}>API Access</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Integrate ChargeBack.asia directly with your backend
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: 'var(--draft-bg)', border: '1px solid var(--draft-border)', color: 'var(--draft)' }}
        >
          <Code2 size={12} />
          REST API v1
        </div>
      </div>

      {/* API Keys */}
      <div className="rounded-[14px] border p-5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Key size={15} style={{ color: 'var(--chart-amber)' }} />
            <h3 className="font-display font-[600] text-[16px]" style={{ color: 'var(--text-primary)' }}>API Keys</h3>
          </div>
          <button
            onClick={() => setCreating(!creating)}
            className={btnPrimary}
            style={{ fontSize: 12, padding: '6px 12px' }}
          >
            <Plus size={13} className="mr-1" />
            New Key
          </button>
        </div>

        {creating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4 p-3 rounded-[10px] flex gap-2"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          >
            <input
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: 'var(--text-primary)' }}
              placeholder="Key name (e.g. Production)"
              value={newKeyName}
              onChange={e => setNewKeyName(e.target.value)}
            />
            <button className={btnPrimary} style={{ fontSize: 12, padding: '5px 12px' }} onClick={() => setCreating(false)}>
              Create
            </button>
            <button className={btnSecondary} style={{ fontSize: 12, padding: '5px 10px' }} onClick={() => setCreating(false)}>
              Cancel
            </button>
          </motion.div>
        )}

        <div className="space-y-3">
          {mockKeys.map(k => (
            <div
              key={k.id}
              className="rounded-[10px] p-4"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{k.name}</span>
                  <span
                    className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{
                      background: k.name === 'Production' ? 'var(--won-bg)' : 'var(--draft-bg)',
                      border: `1px solid ${k.name === 'Production' ? 'var(--won-border)' : 'var(--draft-border)'}`,
                      color: k.name === 'Production' ? 'var(--won)' : 'var(--draft)',
                    }}
                  >
                    {k.name === 'Production' ? 'live' : 'test'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    {k.requests.toLocaleString()} requests · last used {k.lastUsed}
                  </span>
                  <button onClick={() => setShowKey(showKey === k.id ? null : k.id)} style={{ color: 'var(--text-muted)' }}>
                    {showKey === k.id ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button onClick={() => copyKey(k.id, k.key)} style={{ color: copied === k.id ? 'var(--won)' : 'var(--text-muted)' }}>
                    {copied === k.id ? <CheckCircle size={14} /> : <Copy size={14} />}
                  </button>
                  <button style={{ color: 'var(--lost)' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <code
                className="text-xs font-mono px-2 py-1 rounded-[6px]"
                style={{ background: 'var(--bg-primary)', color: 'var(--text-secondary)' }}
              >
                {showKey === k.id ? k.key : maskKey(k.key)}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* Endpoints Reference */}
      <div className="rounded-[14px] border p-5" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Globe size={15} style={{ color: 'var(--chart-blue)' }} />
          <h3 className="font-display font-[600] text-[16px]" style={{ color: 'var(--text-primary)' }}>Endpoints</h3>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
            https://api.chargebackasia.com
          </span>
        </div>
        <div className="space-y-1.5">
          {endpoints.map((ep, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-3 p-2.5 rounded-[8px]"
              style={{ background: 'var(--bg-secondary)' }}
            >
              <span
                className="text-[11px] font-mono font-bold w-12 text-center shrink-0"
                style={{ color: methodColors[ep.method] || 'var(--text-muted)' }}
              >
                {ep.method}
              </span>
              <code className="text-xs font-mono" style={{ color: 'var(--text-primary)', flex: 1 }}>
                {ep.path}
              </code>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{ep.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Code Example */}
      <div className="rounded-[14px] border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-2">
            <Terminal size={13} style={{ color: 'var(--text-muted)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Quick Start Example</span>
          </div>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(codeExample)
              setCopied('example')
              setTimeout(() => setCopied(null), 2000)
            }}
            className="flex items-center gap-1 text-xs"
            style={{ color: copied === 'example' ? 'var(--won)' : 'var(--text-muted)' }}
          >
            {copied === 'example' ? <CheckCircle size={12} /> : <Copy size={12} />}
            {copied === 'example' ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre
          className="p-4 text-xs font-mono leading-relaxed overflow-x-auto"
          style={{ background: 'var(--bg-primary)', color: 'var(--text-secondary)' }}
        >
          {codeExample}
        </pre>
      </div>
    </div>
  )
}
