'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, ArrowRight, Download, X } from 'lucide-react'
import { btnPrimary, btnSecondary } from '@/lib/styles'

const csvTemplate = `dispute_id,processor,amount,currency,reason_code,reason_category,status,outcome,date_created,transaction_date
CH-001,STRIPE,248.00,USD,4853,PRODUCT_NOT_RECEIVED,WON,won,2025-11-01,2025-10-20
CH-002,XENDIT,180000,IDR,CBN-03,UNAUTHORIZED,LOST,lost,2025-11-03,2025-10-22
CH-003,PAYMONGO,2500,PHP,PRE-ARB-2,PRODUCT_NOT_AS_DESCRIBED,WON,won,2025-11-05,2025-10-25`

type ImportStep = 'upload' | 'preview' | 'importing' | 'done'

const mockPreview = [
  { id: 'CH-001', processor: 'STRIPE', amount: '$248.00', reason: 'PRODUCT_NOT_RECEIVED', status: 'WON', valid: true },
  { id: 'CH-002', processor: 'XENDIT', amount: 'IDR 180,000', reason: 'UNAUTHORIZED', status: 'LOST', valid: true },
  { id: 'CH-003', processor: 'PAYMONGO', amount: '₱2,500', reason: 'PRODUCT_NOT_AS_DESCRIBED', status: 'WON', valid: true },
  { id: 'CH-004', processor: 'MIDTRANS', amount: 'IDR 320,000', reason: 'CREDIT_NOT_PROCESSED', status: 'WON', valid: true },
  { id: 'CH-005', processor: '', amount: '$0', reason: '', status: '', valid: false },
]

const statusColors: Record<string, { bg: string; border: string; color: string }> = {
  WON: { bg: 'var(--won-bg)', border: 'var(--won-border)', color: 'var(--won)' },
  LOST: { bg: 'var(--lost-bg)', border: 'var(--lost-border)', color: 'var(--lost)' },
}

export default function ImportPage() {
  const [step, setStep] = useState<ImportStep>('upload')
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState('')
  const [progress, setProgress] = useState(0)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File | null) => {
    if (!file) return
    setFileName(file.name)
    setStep('preview')
  }

  const handleImport = () => {
    setStep('importing')
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 18
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => setStep('done'), 400)
      }
      setProgress(Math.min(p, 100))
    }, 180)
  }

  const downloadTemplate = () => {
    const blob = new Blob([csvTemplate], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'chargebackasia-import-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display font-[700] text-[24px]" style={{ color: 'var(--text-primary)' }}>
          Import Past Disputes
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Bring your historical chargeback data into ChargeBack.asia to unlock full analytics
        </p>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-3">
        {(['upload', 'preview', 'importing', 'done'] as ImportStep[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
              style={{
                background: step === s ? 'var(--green-500)' : ['upload', 'preview', 'importing', 'done'].indexOf(step) > i ? 'var(--won-bg)' : 'var(--bg-secondary)',
                border: `1px solid ${step === s ? 'var(--green-500)' : 'var(--border)'}`,
                color: step === s ? 'var(--text-inverse)' : 'var(--text-muted)',
              }}
            >
              {(['upload', 'preview', 'importing', 'done'].indexOf(step) > i) ? '✓' : i + 1}
            </div>
            <span className="text-xs capitalize" style={{ color: step === s ? 'var(--text-primary)' : 'var(--text-muted)' }}>
              {s}
            </span>
            {i < 3 && <div className="w-8 h-px" style={{ background: 'var(--border)' }} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 'upload' && (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Drop zone */}
            <div
              className="rounded-[16px] border-2 border-dashed p-12 text-center cursor-pointer transition-all"
              style={{
                borderColor: dragOver ? 'var(--green-500)' : 'var(--border)',
                background: dragOver ? 'var(--won-bg)' : 'var(--bg-card)',
              }}
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => {
                e.preventDefault()
                setDragOver(false)
                handleFile(e.dataTransfer.files[0])
              }}
              onClick={() => fileRef.current?.click()}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'var(--bg-secondary)' }}
              >
                <Upload size={28} style={{ color: 'var(--green-500)' }} />
              </div>
              <p className="font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
                Drop your CSV file here
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                or click to browse · CSV format only
              </p>
              <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={e => handleFile(e.target.files?.[0] ?? null)} />
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button onClick={downloadTemplate} className={btnSecondary} style={{ fontSize: 13 }}>
                <Download size={13} className="mr-1.5" />
                Download CSV Template
              </button>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Required fields: dispute_id, processor, amount, currency, reason_category, status
              </p>
            </div>
          </motion.div>
        )}

        {step === 'preview' && (
          <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div
              className="flex items-center gap-3 p-3 rounded-[10px]"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <FileSpreadsheet size={20} style={{ color: 'var(--chart-blue)' }} />
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{fileName}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {mockPreview.filter(r => r.valid).length} valid rows · {mockPreview.filter(r => !r.valid).length} invalid rows
                </p>
              </div>
              <button onClick={() => setStep('upload')} style={{ color: 'var(--text-muted)' }}>
                <X size={16} />
              </button>
            </div>

            <div className="rounded-[14px] border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)' }}>
                    {['ID', 'Processor', 'Amount', 'Reason', 'Status', 'Valid'].map(h => (
                      <th key={h} className="px-3 py-2.5 text-left font-semibold" style={{ color: 'var(--text-muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockPreview.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-card)' : 'rgba(15,28,46,0.6)', opacity: row.valid ? 1 : 0.5 }}>
                      <td className="px-3 py-2.5 font-mono" style={{ color: 'var(--text-secondary)' }}>{row.id || '—'}</td>
                      <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.processor || '—'}</td>
                      <td className="px-3 py-2.5 font-mono" style={{ color: 'var(--text-primary)' }}>{row.amount}</td>
                      <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.reason || '—'}</td>
                      <td className="px-3 py-2.5">
                        {row.status ? (
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                            style={statusColors[row.status] || { bg: 'transparent', border: 'transparent', color: 'var(--text-muted)' }}
                          >
                            {row.status}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-3 py-2.5">
                        {row.valid
                          ? <CheckCircle size={13} style={{ color: 'var(--won)' }} />
                          : <AlertCircle size={13} style={{ color: 'var(--lost)' }} />
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className="flex items-center gap-2 p-3 rounded-[10px] text-xs"
              style={{ background: 'var(--pending-bg)', border: '1px solid var(--pending-border)', color: 'var(--pending)' }}
            >
              <AlertCircle size={13} />
              1 row has missing required fields and will be skipped during import.
            </div>

            <div className="flex gap-3">
              <button onClick={handleImport} className={btnPrimary}>
                Import {mockPreview.filter(r => r.valid).length} disputes <ArrowRight size={13} className="ml-1" />
              </button>
              <button onClick={() => setStep('upload')} className={btnSecondary}>Cancel</button>
            </div>
          </motion.div>
        )}

        {step === 'importing' && (
          <motion.div key="importing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="rounded-[16px] border p-12 text-center"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--won-bg)' }}>
              <Upload size={28} style={{ color: 'var(--won)' }} className="animate-bounce" />
            </div>
            <p className="font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Importing disputes…</p>
            <div className="h-2 rounded-full mx-auto max-w-xs" style={{ background: 'var(--bg-secondary)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'var(--green-500)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>{Math.round(progress)}%</p>
          </motion.div>
        )}

        {step === 'done' && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            className="rounded-[16px] border p-12 text-center"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--won-bg)' }}>
              <CheckCircle size={32} style={{ color: 'var(--won)' }} />
            </div>
            <p className="font-display font-[700] text-[22px] mb-2" style={{ color: 'var(--text-primary)' }}>Import complete!</p>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              4 disputes imported · 1 row skipped · Analytics updated
            </p>
            <div className="flex gap-3 justify-center">
              <a href="/analytics" className={btnPrimary}>View Analytics</a>
              <button onClick={() => { setStep('upload'); setFileName(''); setProgress(0) }} className={btnSecondary}>
                Import More
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
